"""下载模块:按 posts.json/media.json 下载 sb3 作品和素材 zip。"""
import os
import re

from config import WORKS_DIR, MATERIALS_DIR, CATEGORIES, SITE
from http_util import download_file, head_size, check_disk


def normalize_url(url):
    """规范化 URL:相对路径(/wp-content/...)补全站点 host。"""
    if url and url.startswith("/"):
        return SITE + url
    return url


def safe_name(s, maxlen=80):
    """文件名安全化:去除非法字符,限长。"""
    s = re.sub(r'[\\/:*?"<>|\n\r\t]', "_", s or "").strip()
    return s[:maxlen] if s else "untitled"


def work_path(post):
    """作品的存储路径:works/{slug}/{id}_{title}.sb3。"""
    slug = post["categories"][0] if post["categories"] else "other"
    name = safe_name(post["title"]) or str(post["id"])
    return os.path.join(WORKS_DIR, slug, f"{post['id']}_{name}.sb3")


def material_path(media):
    """素材的存储路径:materials/{ext}/{id}_{title}.{ext}。"""
    url = media["source_url"]
    ext = os.path.splitext(url.split("?")[0])[1].lower() or ".bin"
    name = safe_name(media["title"]) or str(media["id"])
    return os.path.join(MATERIALS_DIR, ext.lstrip("."), f"{media['id']}_{name}{ext}")


def download_works(posts, state, limit=None, save_fn=None):
    """下载全部 sb3 作品。limit 用于试跑。更新 state。返回 (ok, skip, fail)。
    save_fn: 每 10 个文件调一次保存 state(断点续传)。"""
    ok = skip = fail = 0
    targets = [p for p in posts if p["has_sb3"]]
    print(f"[dl] 待下载作品: {len(targets)} 个(has_sb3)")
    if limit:
        targets = targets[:limit]
        print(f"[dl] 试跑模式:仅前 {limit} 个")

    for i, p in enumerate(targets, 1):
        pid = p["id"]
        if str(pid) in state["downloaded"]:
            skip += 1
            continue
        dest = work_path(p)
        url = normalize_url(p["sb3_url"])
        size = head_size(url)
        print(f"  [{i}/{len(targets)}] post {pid} ({(size or 0)/1024/1024:.1f}MB) -> {os.path.basename(dest)}")
        written, success = download_file(url, dest, expected_size=size)
        if success:
            ok += 1
            state["downloaded"][str(pid)] = {"path": dest, "size": written}
        else:
            fail += 1
            state["failed"].append({"id": pid, "url": p["sb3_url"], "type": "work"})
        if save_fn and i % 10 == 0:
            save_fn(state)
    return ok, skip, fail


# media 文件类型过滤:只下真正的素材,跳过帖子预览图(jpg/html)和无关文件
# 保留:zip 素材包、sb3、音频(mp3/wav/wma)、图片素材(png/webp/gif)、视频(mp4/mov)
MEDIA_KEEP_EXTS = {".zip", ".sb3", ".mp3", ".wav", ".wma", ".png", ".webp", ".gif", ".mp4", ".mov", ".pdf", ".docx"}


def filter_materials(media_list):
    """过滤 media:只保留真正的素材文件(跳过 jpg/html 预览图)。"""
    kept = []
    for m in media_list:
        url = m["source_url"].split("?")[0].lower()
        ext = ("." + url.rsplit(".", 1)[-1]) if "." in url else ""
        if ext in MEDIA_KEEP_EXTS:
            kept.append(m)
    return kept


def download_materials(media_list, state, limit=None, save_fn=None):
    """下载全部素材文件(自动过滤预览图)。返回 (ok, skip, fail)。
    save_fn: 每 10 个文件调一次保存 state(断点续传)。"""
    ok = skip = fail = 0
    targets = filter_materials(media_list)
    print(f"[dl] 待下载素材: {len(targets)} 个(已过滤预览图,原始 {len(media_list)})")
    if limit:
        targets = targets[:limit]
        print(f"[dl] 试跑模式:仅前 {limit} 个")

    for i, m in enumerate(targets, 1):
        mid = m["id"]
        key = f"media_{mid}"
        if key in state["downloaded"]:
            skip += 1
            continue
        dest = material_path(m)
        url = normalize_url(m["source_url"])
        # 素材 zip 无 Referer 限制,但用 DOWNLOAD_HEADERS 也无害
        size = head_size(url)
        print(f"  [{i}/{len(targets)}] media {mid} ({(size or 0)/1024/1024:.1f}MB) -> {os.path.basename(dest)}")
        written, success = download_file(url, dest, expected_size=size)
        if success:
            ok += 1
            state["downloaded"][key] = {"path": dest, "size": written}
        else:
            fail += 1
            state["failed"].append({"id": mid, "url": m["source_url"], "type": "media"})
        if save_fn and i % 10 == 0:
            save_fn(state)
    return ok, skip, fail

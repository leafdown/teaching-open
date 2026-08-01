"""下载模块:按 posts.json 下载 TurboWarp 打包 HTML 作品。"""
import os
import re

from config import WORKS_DIR
from http_util import download_file, head_size, check_disk


def safe_name(s, maxlen=80):
    """文件名安全化:去除非法字符,限长。"""
    s = re.sub(r'[\\/:*?"<>|\n\r\t]', "_", s or "").strip()
    return s[:maxlen] if s else "untitled"


def normalize_url(url):
    """规范化 URL(相对路径补 host)。"""
    if url and url.startswith("/"):
        from config import SITE
        return SITE + url
    return url


def work_path(post):
    """作品存储路径:works/{category}/{id}_{title}.html。"""
    slug = post["categories"][0] if post["categories"] else "other"
    name = safe_name(post["title"]) or str(post["id"])
    return os.path.join(WORKS_DIR, slug, f"{post['id']}_{name}.html")


def download_works(posts, state, limit=None, save_fn=None):
    """下载全部打包 HTML 作品。返回 (ok, skip, fail)。
    save_fn: 每 10 个文件调一次保存 state(断点续传)。"""
    ok = skip = fail = 0
    targets = [p for p in posts if p["has_player"]]
    print(f"[dl] 待下载作品: {len(targets)} 个(has_player)")
    if limit:
        targets = targets[:limit]
        print(f"[dl] 试跑模式:仅前 {limit} 个")

    for i, p in enumerate(targets, 1):
        pid = p["id"]
        if str(pid) in state["downloaded"]:
            skip += 1
            continue
        dest = work_path(p)
        url = normalize_url(p["player_url"])
        size = head_size(url)
        print(f"  [{i}/{len(targets)}] post {pid} ({(size or 0)/1024/1024:.1f}MB) -> {os.path.basename(dest)}")
        written, success = download_file(url, dest, expected_size=size)
        if success:
            ok += 1
            state["downloaded"][str(pid)] = {"path": dest, "size": written}
        else:
            fail += 1
            state["failed"].append({"id": pid, "url": url, "type": "work"})
        if save_fn and i % 10 == 0:
            save_fn(state)
    return ok, skip, fail

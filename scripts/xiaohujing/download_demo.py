"""下载 demo 模式作品:抓 /demo-{post_id} 页面提取 TurboWarp 打包 HTML。

流程:
1. GET https://www.xiaohujing.com.cn/demo-{post_id}
2. 正则提取 iframe src 中的 /wp-content/uploads/{date}/{hash}.html
3. 下载打包 HTML(带 Referer),存到 works_demo/{category}/{id}_{title}.html
"""
import os
import re

from config import SITE, HEADERS
from http_util import download_file, head_size
import requests

DEMO_URL_TMPL = f"{SITE}/demo-{{pid}}"

# 从 demo 页面提取打包 HTML URL
PACKED_HTML_PATTERN = re.compile(
    r'(?:src|href)=["\']([^"\']*?/wp-content/uploads/[^"\']*?\.html)["\']'
)


def safe_name(s, maxlen=80):
    s = re.sub(r'[\\/:*?"<>|\n\r\t]', "_", s or "").strip()
    return s[:maxlen] if s else "untitled"


def extract_packed_html(demo_html):
    """从 demo 页面 HTML 提取打包 HTML 的 URL(相对路径)。"""
    m = PACKED_HTML_PATTERN.search(demo_html)
    return m.group(1) if m else None


def fetch_packed_url(post_id):
    """抓 demo-{post_id} 页面,返回打包 HTML 的完整 URL(或 None)。"""
    url = DEMO_URL_TMPL.format(pid=post_id)
    try:
        r = requests.get(url, headers=HEADERS, timeout=30)
        if r.status_code != 200:
            return None
        packed = extract_packed_html(r.text)
        if not packed:
            return None
        if packed.startswith("/"):
            packed = SITE + packed
        return packed
    except requests.RequestException:
        return None


def work_path(post, root):
    """作品存储路径:root/{category}/{id}_{title}.html。"""
    slug = post["categories"][0] if post["categories"] else "other"
    name = safe_name(post["title"]) or str(post["id"])
    return os.path.join(root, slug, f"{post['id']}_{name}.html")


def download_demo_works(posts, state, demo_root, limit=None, save_fn=None):
    """下载 demo 模式作品的打包 HTML。返回 (ok, skip, fail)。"""
    # 作品分类(非素材/赛事)
    WORK_CATS = {"yuanma", "youxi", "jiaoxue", "chuangyi", "dashen",
                 "jieri", "gzs", "ybl", "suanfa"}
    targets = [p for p in posts
               if not p["has_sb3"] and any(c in WORK_CATS for c in p["categories"])]
    print(f"[demo] 待下载 demo 模式作品: {len(targets)} 个")
    if limit:
        targets = targets[:limit]
        print(f"[demo] 试跑模式:仅前 {limit} 个")

    ok = skip = fail = 0
    for i, p in enumerate(targets, 1):
        pid = p["id"]
        key = f"demo_{pid}"
        if key in state["downloaded"]:
            skip += 1
            continue
        # 1. 抓 demo 页面提取打包 HTML URL
        packed_url = fetch_packed_url(pid)
        if not packed_url:
            print(f"  [{i}/{len(targets)}] post {pid}: 无打包 HTML,跳过")
            fail += 1
            state["failed"].append({"id": pid, "type": "demo", "reason": "no packed html"})
            if save_fn and i % 10 == 0:
                save_fn(state)
            continue
        # 2. 下载打包 HTML
        dest = work_path(p, demo_root)
        size = head_size(packed_url)
        print(f"  [{i}/{len(targets)}] post {pid} ({(size or 0)/1024/1024:.1f}MB) -> {os.path.basename(dest)}")
        written, success = download_file(packed_url, dest, expected_size=size)
        if success:
            ok += 1
            state["downloaded"][key] = {"path": dest, "size": written, "packed_url": packed_url}
        else:
            fail += 1
            state["failed"].append({"id": pid, "url": packed_url, "type": "demo"})
        if save_fn and i % 10 == 0:
            save_fn(state)
    return ok, skip, fail

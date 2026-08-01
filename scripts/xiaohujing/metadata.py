"""元数据提取:从 WP REST API 帖子内容中提取 sb3 URL,素材从 media API 获取。"""
import re
import json
import os
from datetime import datetime

from config import (
    POSTS_API, MEDIA_API, PER_PAGE, CATEGORIES, SKIP_CATEGORIES,
    META_DIR, STATE_FILE,
)
from http_util import request_json, head_size

# sb3 URL 提取正则:匹配 iframe src 中 project_url= 参数,或裸 .sb3 链接
SB3_PATTERN = re.compile(r'project_url=(https?://[^\s"&]+\.sb3)')
SB3_FALLBACK_PATTERN = re.compile(r'(https?://[^\s"\'<>]+\.sb3)')


def extract_sb3_url(content_html):
    """从帖子 content.rendered 提取 sb3 URL。返回 URL 或 None。"""
    if not content_html:
        return None
    m = SB3_PATTERN.search(content_html)
    if m:
        return m.group(1)
    m = SB3_FALLBACK_PATTERN.search(content_html)
    return m.group(1) if m else None


def category_slugs(cat_ids):
    """把分类 ID 列表转成 slug 列表(跳过 VIP)。返回 (slugs, is_skipped)。"""
    slugs = [CATEGORIES[c] for c in cat_ids if c in CATEGORIES and c not in SKIP_CATEGORIES]
    is_skipped = any(c in SKIP_CATEGORIES for c in cat_ids)
    return slugs, is_skipped


def fetch_all_posts(on_progress=None):
    """枚举全部公开帖子(跳过 VIP/会员)。返回 post 元数据列表。

    每条:{id, title, link, date, categories(slugs), cat_ids, sb3_url, has_sb3}
    """
    # 先取第一页拿 total/pages
    data, total, pages = request_json(POSTS_API, {"per_page": PER_PAGE, "page": 1})
    print(f"[meta] 帖子总数: {total}, 分页: {pages}")
    all_posts = []
    for page in range(1, pages + 1):
        if page == 1:
            posts = data
        else:
            posts, _, _ = request_json(POSTS_API, {"per_page": PER_PAGE, "page": page})
        for p in posts:
            cat_ids = p.get("categories", [])
            slugs, is_skipped = category_slugs(cat_ids)
            if is_skipped:
                continue  # 跳过 VIP/会员
            content = p.get("content", {}).get("rendered", "")
            sb3_url = extract_sb3_url(content)
            all_posts.append({
                "id": p["id"],
                "title": p.get("title", {}).get("rendered", "").strip(),
                "link": p.get("link", ""),
                "date": p.get("date", ""),
                "cat_ids": cat_ids,
                "categories": slugs,
                "sb3_url": sb3_url,
                "has_sb3": sb3_url is not None,
            })
        if on_progress:
            on_progress(page, pages, len(all_posts))
        print(f"  [meta] 已枚举第 {page}/{pages} 页,累计 {len(all_posts)} 条公开帖子")
    return all_posts


def fetch_all_media(on_progress=None):
    """枚举全部 media(素材 zip 等)。返回 media 元数据列表。

    每条:{id, title, source_url, mime_type, file_size}
    """
    data, total, pages = request_json(MEDIA_API, {"per_page": PER_PAGE, "page": 1})
    print(f"[meta] media 总数: {total}, 分页: {pages}")
    all_media = []
    for page in range(1, pages + 1):
        if page == 1:
            media = data
        else:
            media, _, _ = request_json(MEDIA_API, {"per_page": PER_PAGE, "page": page})
        for m in media:
            url = m.get("source_url", "")
            if not url:
                continue
            all_media.append({
                "id": m["id"],
                "title": m.get("title", {}).get("rendered", "").strip(),
                "source_url": url,
                "mime_type": m.get("mime_type", ""),
                "file_size": (m.get("media_details") or {}).get("filesize") or 0,
            })
        if on_progress:
            on_progress(page, pages, len(all_media))
        print(f"  [meta] 已枚举第 {page}/{pages} 页,累计 {len(all_media)} 个素材")
    return all_media


# === 断点续传状态 ===
def load_state():
    """加载断点续传状态。返回 dict。"""
    if os.path.exists(STATE_FILE):
        with open(STATE_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    return {"downloaded": {}, "failed": [], "updated": ""}


def save_state(state):
    """保存状态(原子写)。"""
    os.makedirs(META_DIR, exist_ok=True)
    state["updated"] = datetime.now().isoformat()
    tmp = STATE_FILE + ".tmp"
    with open(tmp, "w", encoding="utf-8") as f:
        json.dump(state, f, ensure_ascii=False, indent=2)
    os.replace(tmp, STATE_FILE)


def save_json(path, data):
    """原子写 JSON 文件。"""
    os.makedirs(os.path.dirname(path), exist_ok=True)
    tmp = path + ".tmp"
    with open(tmp, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    os.replace(tmp, path)

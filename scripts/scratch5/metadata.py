"""scratch5.com 元数据提取:从 WP 帖子 content 提取 TurboWarp 打包 HTML URL。

content 中 iframe src 模式:
  https://www.scratch5.com/wp-content/uploads/scratch1/{id}.html
或旧帖可能有其他路径(scratch2/ 等),用通用正则匹配 .html。
"""
import re
import json
import os
from datetime import datetime

from config import (
    POSTS_API, PER_PAGE, CATEGORIES, SKIP_CATEGORIES,
    META_DIR, STATE_FILE,
)
from http_util import request_json

# 匹配 wp-content/uploads/ 下的打包 HTML(Scratch 播放器)
PLAYER_PATTERN = re.compile(
    r'(https?://[^\s"\'<>]+/wp-content/uploads/scratch\d+/[^\s"\'<>]+\.html)'
)
# 备用:任意 scratch5 的 .html(排除帖子本身)
HTML_FALLBACK = re.compile(
    r'(https?://(?:www\.)?scratch5\.com/wp-content/uploads/[^\s"\'<>]+\.html)'
)


def extract_player_url(content_html):
    """从帖子 content 提取打包 HTML URL。返回 URL 或 None。"""
    if not content_html:
        return None
    m = PLAYER_PATTERN.search(content_html)
    if m:
        return m.group(1)
    m = HTML_FALLBACK.search(content_html)
    return m.group(1) if m else None


def category_slugs(cat_ids):
    """分类 ID 转 slug(跳过资讯/软件)。返回 (slugs, is_skipped)。"""
    slugs = [CATEGORIES[c] for c in cat_ids
             if c in CATEGORIES and c not in SKIP_CATEGORIES]
    is_skipped = any(c in SKIP_CATEGORIES for c in cat_ids)
    return slugs, is_skipped


def fetch_all_posts(on_progress=None):
    """枚举全部作品帖(跳过资讯/软件分类)。返回 post 元数据列表。

    每条:{id, title, link, date, categories(slugs), cat_ids, player_url, has_player}
    """
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
                continue
            content = p.get("content", {}).get("rendered", "")
            player_url = extract_player_url(content)
            all_posts.append({
                "id": p["id"],
                "title": p.get("title", {}).get("rendered", "").strip(),
                "link": p.get("link", ""),
                "date": p.get("date", ""),
                "cat_ids": cat_ids,
                "categories": slugs,
                "player_url": player_url,
                "has_player": player_url is not None,
            })
        if on_progress:
            on_progress(page, pages, len(all_posts))
        print(f"  [meta] 第 {page}/{pages} 页,累计 {len(all_posts)} 条作品帖")
    return all_posts


# === 断点续传状态 ===
def load_state():
    if os.path.exists(STATE_FILE):
        with open(STATE_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    return {"downloaded": {}, "failed": [], "updated": ""}


def save_state(state):
    os.makedirs(META_DIR, exist_ok=True)
    state["updated"] = datetime.now().isoformat()
    tmp = STATE_FILE + ".tmp"
    with open(tmp, "w", encoding="utf-8") as f:
        json.dump(state, f, ensure_ascii=False, indent=2)
    os.replace(tmp, STATE_FILE)


def save_json(path, data):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    tmp = path + ".tmp"
    with open(tmp, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    os.replace(tmp, path)

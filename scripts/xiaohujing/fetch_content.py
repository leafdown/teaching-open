"""补抓帖子正文 content.rendered,存 posts_content.json。

posts.json 当时只存了元数据,丢弃了 content。正文里有背景故事、如何开始、
操作方式、教学说明等,对作品库/教学有价值。本脚本逐帖取 content 字段,
存为 {id: content_text} 映射,纯文本仅几十 MB。

用法:
  python3 fetch_content.py            # 全量补抓
  python3 fetch_content.py --limit N  # 试跑
环境变量 XHJ_OUT_ROOT / SCRATCH5_OUT_ROOT 同各自 config。
"""
import os
import sys
import re
import json
import argparse

HERE = os.path.dirname(os.path.abspath(__file__))
from config import META_DIR, POSTS_API, PER_PAGE
from http_util import request_json

CONTENT_JSON = os.path.join(META_DIR, "posts_content.json")
LOG_INTERVAL = 50


def strip_html(html):
    """HTML 转纯文本:去标签、解码常见实体、压缩空白。"""
    if not html:
        return ""
    s = re.sub(r'</?(p|div|br|li|h[1-6]|tr)[^>]*>', '\n', html, flags=re.I)
    s = re.sub(r'<[^>]+>', '', s)
    s = (s.replace('&nbsp;', ' ').replace('&amp;', '&')
           .replace('&lt;', '<').replace('&gt;', '>')
           .replace('&#039;', "'").replace('&#8211;', '–').replace('&#8212;', '—')
           .replace('&#8217;', "'").replace('&#8216;', "'")
           .replace('&#8220;', '"').replace('&#8221;', '"')
           .replace('&quot;', '"').replace('&ldquo;', '"').replace('&rdquo;', '"')
           .replace('&#8230;', '…').replace('&hellip;', '…'))
    # 残留数字实体兜底
    s = re.sub(r'&#(\d+);', lambda m: chr(int(m.group(1))), s)
    lines = [l.strip() for l in s.splitlines()]
    lines = [l for l in lines if l]
    return '\n'.join(lines)


def load_existing():
    if os.path.exists(CONTENT_JSON):
        with open(CONTENT_JSON, "r", encoding="utf-8") as f:
            return json.load(f)
    return {}


def save(content_map):
    tmp = CONTENT_JSON + ".tmp"
    with open(tmp, "w", encoding="utf-8") as f:
        json.dump(content_map, f, ensure_ascii=False, indent=2)
    os.replace(tmp, CONTENT_JSON)


def fetch_all_content(limit=None):
    """逐页取 posts(含 content.rendered),提取正文存映射。"""
    _, total, pages = request_json(POSTS_API, {"per_page": PER_PAGE, "page": 1, "_fields": "id"})
    print(f"[content] 帖子总数: {total}, 分页: {pages}")

    content_map = load_existing()
    print(f"[content] 已有正文: {len(content_map)} 条")

    fetched = 0
    skipped = 0
    for page in range(1, pages + 1):
        params = {"per_page": PER_PAGE, "page": page, "_fields": "id,content"}
        try:
            data, _, _ = request_json(POSTS_API, params)
        except RuntimeError as e:
            print(f"  [warn] 第 {page} 页失败: {e}")
            continue
        for p in data:
            pid = p["id"]
            if str(pid) in content_map:
                skipped += 1
                continue
            raw = p.get("content", {}).get("rendered", "") if isinstance(p.get("content"), dict) else ""
            content_map[str(pid)] = strip_html(raw)
            fetched += 1
            if fetched % LOG_INTERVAL == 0:
                print(f"  [content] 已抓 {fetched} (页 {page}/{pages})")
                save(content_map)
            if limit and fetched >= limit:
                save(content_map)
                print(f"[content] 试跑上限 {limit} 达成")
                return fetched, skipped
        save(content_map)
    return fetched, skipped


def main():
    parser = argparse.ArgumentParser(description="补抓帖子正文")
    parser.add_argument("--limit", type=int, help="试跑:仅前 N 条新正文")
    args = parser.parse_args()
    print(f"[content] 存储到: {CONTENT_JSON}")
    fetched, skipped = fetch_all_content(limit=args.limit)
    print(f"\n[content] 完成: 新抓 {fetched}, 跳过 {skipped}")


if __name__ == "__main__":
    main()

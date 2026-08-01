"""下载 xiaohujing media 库中被误过滤的 TurboWarp 打包 HTML,提取 sb3。

之前 download_materials 的 KEEP 扩展名集不含 .html,把 media 库里 1234 个
TurboWarp 打包 HTML 当预览图过滤掉了。这些其实是独立的作品源码(标题如
"星之卡比弹珠台-小虎鲸Scratch资源站"),与已下 demo/sb3 标题几乎不重叠。

流程:遍历 media.json 中所有 .html 媒体 → 下载 → extract_sb3 → 删 HTML。
断点续传:已提取的 media_id 记入 state['sb3_media']。

用法:
  python3 download_media_sb3.py            # 全量
  python3 download_media_sb3.py --limit N  # 试跑
环境变量 XHJ_OUT_ROOT 同 config。
"""
import os
import sys
import json
import argparse

# 复用 xiaohujing 自身的 http_util/metadata/config,以及 scratch5 的 extract_sb3
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)  # 优先 xiaohujing 自身模块(config/http_util/metadata/download)
SCRATCH5_DIR = os.path.join(os.path.dirname(HERE), "scratch5")

import importlib.util
_spec = importlib.util.spec_from_file_location(
    "xhj_extract_sb3", os.path.join(SCRATCH5_DIR, "extract_sb3.py"))
_mod = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(_mod)
extract_sb3_from_html = _mod.extract_sb3_from_html
validate_sb3 = _mod.validate_sb3

from config import META_DIR, OUT_ROOT, SITE  # xiaohujing config
from http_util import download_file, disk_free_gb
from metadata import load_state, save_state
from download import safe_name, normalize_url

MEDIA_JSON = os.path.join(META_DIR, "media.json")
SB3_DIR = os.path.join(OUT_ROOT, "works_media")
TMP_DIR = os.path.join(OUT_ROOT, ".tmp_media")


def load_html_media():
    with open(MEDIA_JSON, "r", encoding="utf-8") as f:
        media = json.load(f)
    return [m for m in media
            if m["source_url"].split("?")[0].lower().endswith(".html")]


def download_media_sb3(media_list, state, limit=None, save_fn=None):
    state.setdefault("sb3_media", {})
    sb3_map = state["sb3_media"]

    targets = media_list
    print(f"[media-sb3] 待处理 HTML 媒体: {len(targets)} 个,已提取 {len(sb3_map)}")
    if limit:
        targets = targets[:limit]
        print(f"[media-sb3] 试跑:仅前 {limit} 个")

    ok = skip = fail = 0
    for i, m in enumerate(targets, 1):
        mid = m["id"]
        if str(mid) in sb3_map:
            skip += 1
            continue

        name = safe_name(m.get("title", "")) or str(mid)
        dest = os.path.join(SB3_DIR, f"{mid}_{name}.sb3")
        if os.path.exists(dest):
            sb3_map[str(mid)] = {"path": dest, "size": os.path.getsize(dest)}
            skip += 1
            if save_fn and i % 10 == 0:
                save_fn(state)
            continue

        url = normalize_url(m["source_url"])
        tmp_html = os.path.join(TMP_DIR, f"{mid}.html")
        try:
            _, success = download_file(url, tmp_html)
            if not success:
                raise RuntimeError("下载 HTML 失败")
            sb3_bytes, size = extract_sb3_from_html(tmp_html)
            if not validate_sb3(sb3_bytes):
                raise ValueError("sb3 无效")
            os.makedirs(os.path.dirname(dest), exist_ok=True)
            with open(dest, "wb") as f:
                f.write(sb3_bytes)
            sb3_map[str(mid)] = {"path": dest, "size": size}
            ok += 1
            print(f"  [{i}/{len(targets)}] media {mid} ({size/1024/1024:.1f}MB) -> {os.path.basename(dest)}")
        except Exception as e:
            fail += 1
            state.setdefault("failed", []).append({"id": mid, "url": url, "type": "media_sb3", "reason": str(e)})
            print(f"  [{i}/{len(targets)}] media {mid} 失败: {e}")
        finally:
            if os.path.exists(tmp_html):
                os.remove(tmp_html)
        if save_fn and i % 10 == 0:
            save_fn(state)
    return ok, skip, fail


def main():
    parser = argparse.ArgumentParser(description="xiaohujing media HTML → sb3")
    parser.add_argument("--limit", type=int, help="试跑:仅前 N 个")
    args = parser.parse_args()

    print(f"[media-sb3] 存储根: {OUT_ROOT}  剩余: {disk_free_gb(OUT_ROOT):.1f}GB")
    media_list = load_html_media()
    print(f"[media-sb3] media.json 中 HTML 媒体: {len(media_list)} 个")
    state = load_state()
    ok, skip, fail = download_media_sb3(media_list, state, limit=args.limit, save_fn=save_state)
    save_state(state)
    print(f"\n[media-sb3] 完成: 成功 {ok}, 跳过 {skip}, 失败 {fail}")
    print(f"[media-sb3] state['sb3_media'] 共 {len(state.get('sb3_media', {}))} 个")


if __name__ == "__main__":
    main()

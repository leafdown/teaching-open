#!/usr/bin/env python3
"""scratch5.com 作品爬取 — 主入口。

用法:
  python3 main.py metadata            # 阶段1:爬元数据(posts.json)
  python3 main.py download --limit N  # 阶段2:下载(试跑前 N 个);不加 --limit 全量
  python3 main.py status              # 查看下载进度

环境变量:
  SCRATCH5_OUT_ROOT=/path  # 指定存储根目录(默认 /Volumes/T7 Share/Scratch5)
"""
import sys
import os
import json
import argparse

from config import META_DIR, WORKS_DIR, OUT_ROOT, MIN_DISK_FREE_GB
from metadata import fetch_all_posts, save_json, load_state, save_state
from download import download_works
from http_util import disk_free_gb, check_disk

POSTS_JSON = os.path.join(META_DIR, "posts.json")


def cmd_metadata(args):
    print(f"[meta] 存储根目录: {OUT_ROOT}")
    print(f"[meta] 磁盘剩余: {disk_free_gb():.1f} GB")
    os.makedirs(META_DIR, exist_ok=True)
    posts = fetch_all_posts()
    save_json(POSTS_JSON, posts)
    has_player = sum(1 for p in posts if p["has_player"])
    print(f"[meta] posts.json 已保存: {len(posts)} 条,其中 {has_player} 条含播放器 HTML")
    print(f"[meta] 下载预估: {has_player} 个 × ~3-5MB ≈ {has_player * 4 / 1024:.1f} GB")


def load_posts():
    if not os.path.exists(POSTS_JSON):
        sys.exit(f"未找到 {POSTS_JSON},请先运行: python3 main.py metadata")
    with open(POSTS_JSON, "r", encoding="utf-8") as f:
        return json.load(f)


def cmd_download(args):
    need_gb = 5 if args.limit else MIN_DISK_FREE_GB
    try:
        free = check_disk(need_gb=need_gb)
        print(f"[dl] 磁盘剩余 {free:.1f} GB,存储到 {OUT_ROOT}")
    except RuntimeError as e:
        sys.exit(f"\n❌ {e}\n")
    state = load_state()
    posts = load_posts()
    ok, skip, fail = download_works(posts, state, limit=args.limit, save_fn=save_state)
    save_state(state)
    print(f"\n[dl] 完成: 成功 {ok}, 跳过 {skip}, 失败 {fail}")
    if state["failed"]:
        print(f"  失败 {len(state['failed'])} 条,可重跑 download 续传")


def cmd_status(args):
    state = load_state()
    dl = state.get("downloaded", {})
    print(f"[status] 存储根目录: {OUT_ROOT}")
    print(f"[status] 已下载: {len(dl)} 个")
    print(f"[status] 失败: {len(state.get('failed', []))} 条")
    print(f"[status] 磁盘剩余: {disk_free_gb():.1f} GB")
    print(f"[status] 更新时间: {state.get('updated', '(空)')}")
    if os.path.exists(POSTS_JSON):
        posts = load_posts()
        has = sum(1 for p in posts if p["has_player"])
        print(f"[status] 元数据: {len(posts)} 帖, {has} 含播放器")


def main():
    parser = argparse.ArgumentParser(description="scratch5.com 作品爬取")
    sub = parser.add_subparsers(dest="cmd", required=True)
    sub.add_parser("metadata", help="阶段1:爬元数据")
    p_dl = sub.add_parser("download", help="阶段2:下载打包 HTML")
    p_dl.add_argument("--limit", type=int, help="试跑:仅前 N 个")
    sub.add_parser("status", help="查看进度")
    args = parser.parse_args()
    {"metadata": cmd_metadata, "download": cmd_download, "status": cmd_status}[args.cmd](args)


if __name__ == "__main__":
    main()

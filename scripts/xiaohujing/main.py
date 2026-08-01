#!/usr/bin/env python3
"""小虎鲸 Scratch 资源爬取 — 主入口。

用法:
  python3 main.py metadata            # 阶段1:爬元数据(posts.json + media.json),几 MB,无需大盘
  python3 main.py download --limit N  # 阶段2:下载(试跑前 N 个);不加 --limit 全量
  python3 main.py download --works    # 仅下载作品 sb3
  python3 main.py download --materials  # 仅下载素材
  python3 main.py status              # 查看下载进度
  python3 main.py parse               # 解析已下载 sb3,生成 works_summary.json

环境变量:
  XHJ_OUT_ROOT=/path/to/external  # 指定外接盘存储根目录(默认本机,大盘数据需改)
"""
import sys
import os
import json
import argparse

from config import META_DIR, WORKS_DIR, MATERIALS_DIR, OUT_ROOT, MIN_DISK_FREE_GB
from metadata import (
    fetch_all_posts, fetch_all_media, save_json,
    load_state, save_state,
)
from download import download_works, download_materials
from download_demo import download_demo_works
from http_util import disk_free_gb, check_disk
from parse_sb3 import scan_works

DEMO_DIR = os.path.join(OUT_ROOT, "works_demo")

POSTS_JSON = os.path.join(META_DIR, "posts.json")
MEDIA_JSON = os.path.join(META_DIR, "media.json")
SUMMARY_JSON = os.path.join(META_DIR, "works_summary.json")


def cmd_metadata(args):
    """阶段1:枚举全部帖子 + media,生成 posts.json / media.json。"""
    print(f"[meta] 存储根目录: {OUT_ROOT}")
    print(f"[meta] 磁盘剩余: {disk_free_gb():.1f} GB(元数据阶段无需大盘)")
    os.makedirs(META_DIR, exist_ok=True)

    posts = fetch_all_posts()
    save_json(POSTS_JSON, posts)
    has_sb3 = sum(1 for p in posts if p["has_sb3"])
    print(f"[meta] posts.json 已保存: {len(posts)} 条公开帖子,其中 {has_sb3} 条含 sb3 URL")

    media = fetch_all_media()
    save_json(MEDIA_JSON, media)
    print(f"[meta] media.json 已保存: {len(media)} 个素材文件")

    # 预估下载总量
    print("\n[meta] 下载预估:")
    print(f"  作品 sb3: {has_sb3} 个(平均 ~20MB,预估 {has_sb3 * 20 / 1024:.1f} GB)")
    print(f"  素材文件: {len(media)} 个")
    print(f"  当前磁盘剩余 {disk_free_gb():.1f} GB,下载需 >{MIN_DISK_FREE_GB} GB")


def load_posts():
    if not os.path.exists(POSTS_JSON):
        sys.exit(f"未找到 {POSTS_JSON},请先运行: python3 main.py metadata")
    with open(POSTS_JSON, "r", encoding="utf-8") as f:
        return json.load(f)


def load_media():
    if not os.path.exists(MEDIA_JSON):
        return []
    with open(MEDIA_JSON, "r", encoding="utf-8") as f:
        return json.load(f)


def cmd_download(args):
    """阶段2:下载 sb3 作品 + 素材。"""
    # 磁盘检查(试跑小批量时放宽)
    need_gb = 5 if args.limit else MIN_DISK_FREE_GB
    try:
        free = check_disk(need_gb=need_gb)
        print(f"[dl] 磁盘剩余 {free:.1f} GB,存储到 {OUT_ROOT}")
    except RuntimeError as e:
        sys.exit(f"\n❌ {e}\n   挂载外接盘后设 XHJ_OUT_ROOT=/path 再运行。\n")

    state = load_state()
    posts = load_posts() if (not args.materials or args.works) else []
    media = load_media() if (not args.works or args.materials) else []

    results = {}
    if not args.materials:  # 默认或 --works
        results["works"] = download_works(posts, state, limit=args.limit, save_fn=save_state)
        save_state(state)
    if not args.works:  # 默认或 --materials
        results["materials"] = download_materials(media, state, limit=args.limit, save_fn=save_state)
        save_state(state)

    print("\n[dl] 完成:")
    for k, (ok, skip, fail) in results.items():
        print(f"  {k}: 成功 {ok}, 跳过 {skip}, 失败 {fail}")
    if state["failed"]:
        print(f"  失败列表见 state.json (共 {len(state['failed'])} 条,可重跑 download 续传)")


def cmd_status(args):
    """查看下载进度。"""
    state = load_state()
    downloaded = state.get("downloaded", {})
    works_dl = sum(1 for k in downloaded if not k.startswith("media_") and not k.startswith("demo_"))
    demo_dl = sum(1 for k in downloaded if k.startswith("demo_"))
    media_dl = sum(1 for k in downloaded if k.startswith("media_"))
    print(f"[status] 存储根目录: {OUT_ROOT}")
    print(f"[status] 已下载 sb3 作品: {works_dl}")
    print(f"[status] 已下载 demo 作品(打包HTML): {demo_dl}")
    print(f"[status] 已下载素材: {media_dl}")
    print(f"[status] 失败: {len(state.get('failed', []))} 条")
    print(f"[status] 磁盘剩余: {disk_free_gb():.1f} GB")
    print(f"[status] 更新时间: {state.get('updated', '(空)')}")
    if os.path.exists(POSTS_JSON):
        posts = load_posts()
        has_sb3 = sum(1 for p in posts if p["has_sb3"])
        print(f"[status] 元数据: {len(posts)} 帖, {has_sb3} 含 sb3")


def cmd_parse(args):
    """解析已下载的 sb3,生成摘要。"""
    if not os.path.isdir(WORKS_DIR):
        sys.exit(f"未找到作品目录 {WORKS_DIR},请先下载。")
    print(f"[parse] 扫描 {WORKS_DIR} ...")
    summaries = scan_works(WORKS_DIR)
    save_json(SUMMARY_JSON, summaries)
    valid = sum(1 for s in summaries if s.get("valid"))
    print(f"[parse] 共 {len(summaries)} 个 sb3,有效 {valid},无效 {len(summaries) - valid}")
    print(f"[parse] 摘要已保存: {SUMMARY_JSON}")


def cmd_download_demo(args):
    """补爬 demo 模式作品(打包 HTML)到 works_demo/。"""
    need_gb = 5 if args.limit else MIN_DISK_FREE_GB
    try:
        free = check_disk(need_gb=need_gb)
        print(f"[demo] 磁盘剩余 {free:.1f} GB,存储到 {DEMO_DIR}")
    except RuntimeError as e:
        sys.exit(f"\n❌ {e}\n")
    state = load_state()
    posts = load_posts()
    ok, skip, fail = download_demo_works(posts, state, DEMO_DIR, limit=args.limit, save_fn=save_state)
    save_state(state)
    print(f"\n[demo] 完成: 成功 {ok}, 跳过 {skip}, 失败 {fail}")
    if state["failed"]:
        print(f"  失败 {len(state['failed'])} 条,可重跑 download-demo 续传")


def main():
    parser = argparse.ArgumentParser(description="小虎鲸 Scratch 资源爬取")
    sub = parser.add_subparsers(dest="cmd", required=True)

    sub.add_parser("metadata", help="阶段1:爬元数据(posts.json + media.json)")

    p_dl = sub.add_parser("download", help="阶段2:下载 sb3 + 素材")
    p_dl.add_argument("--limit", type=int, help="试跑:仅前 N 个")
    p_dl.add_argument("--works", action="store_true", help="仅下载作品 sb3")
    p_dl.add_argument("--materials", action="store_true", help="仅下载素材")

    p_dd = sub.add_parser("download-demo", help="补爬 demo 模式作品(打包 HTML)")
    p_dd.add_argument("--limit", type=int, help="试跑:仅前 N 个")

    sub.add_parser("status", help="查看下载进度")
    sub.add_parser("parse", help="解析已下载 sb3")

    args = parser.parse_args()
    {
        "metadata": cmd_metadata,
        "download": cmd_download,
        "download-demo": cmd_download_demo,
        "status": cmd_status,
        "parse": cmd_parse,
    }[args.cmd](args)


if __name__ == "__main__":
    main()

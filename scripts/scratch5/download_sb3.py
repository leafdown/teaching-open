"""scratch5 流式下载:下载 HTML → 提取 sb3 → 删 HTML,只留 sb3。

相比先全量下 HTML 再提取,本模块每个作品只短暂占用一个 HTML 的临时空间,
磁盘上最终只保留 sb3(比 HTML 小约 23%)。当主盘(T7)剩余低于阈值时自动
溢出到副盘(本机),实现 T7 + 本机分摊存储。

子命令:
  reconcile               扫描 works 下已有 .sb3,登记进 state['sb3']
  reconcile --delete-html 同时删除对应源 HTML
  stream                  流式下载剩余作品:下 HTML→提 sb3→删 HTML
  stream --limit N        试跑前 N 个

环境变量:
  SCRATCH5_OUT_ROOT    主盘根目录(默认 /Volumes/T7 Share/Scratch5)
  SCRATCH5_OUT_ROOT2   副盘根目录(默认 ~/Scratch5_sb3,溢出用)
  SCRATCH5_SWITCH_GB   主盘剩余低于此值切副盘(默认 5)
"""
import os
import sys
import json
import argparse

from config import META_DIR, OUT_ROOT
from http_util import download_file, disk_free_gb
from metadata import load_state, save_state
from download import safe_name, normalize_url
from extract_sb3 import extract_sb3_from_html, validate_sb3

# 副盘:本机溢出盘
OUT_ROOT2 = os.environ.get("SCRATCH5_OUT_ROOT2", os.path.expanduser("~/Scratch5_sb3"))
SWITCH_GB = float(os.environ.get("SCRATCH5_SWITCH_GB", "5"))

SB3_DIR = os.path.join(OUT_ROOT, "works", "scratch")
SB3_DIR2 = os.path.join(OUT_ROOT2, "works", "scratch")
TMP_DIR = os.path.join(OUT_ROOT, ".tmp")


def sb3_dest(post):
    """根据主盘剩余选择 sb3 落盘路径。返回 (dest_path, root_label)。"""
    pid = post["id"]
    name = safe_name(post["title"]) or str(pid)
    fname = f"{pid}_{name}.sb3"
    # 优先主盘,剩余不足则副盘
    try:
        os.makedirs(SB3_DIR, exist_ok=True)
        free = disk_free_gb(SB3_DIR)
    except OSError:
        free = 0.0
    if free > SWITCH_GB:
        return os.path.join(SB3_DIR, fname), "T7"
    os.makedirs(SB3_DIR2, exist_ok=True)
    return os.path.join(SB3_DIR2, fname), "local"


def reconcile(delete_html=False):
    """把 works/scratch 下已有 .sb3 登记进 state['sb3']。可选删源 HTML。"""
    state = load_state()
    state.setdefault("sb3", {})
    sb3_map = state["sb3"]

    found = 0
    registered = 0
    deleted = 0
    for d, label in [(SB3_DIR, "T7"), (SB3_DIR2, "local")]:
        if not os.path.isdir(d):
            continue
        for fn in os.listdir(d):
            if not fn.endswith(".sb3"):
                continue
            found += 1
            pid = fn.split("_", 1)[0]
            path = os.path.join(d, fn)
            if pid not in sb3_map:
                sb3_map[pid] = {"path": path, "size": os.path.getsize(path), "root": label}
                registered += 1
            if delete_html:
                html = os.path.join(d, fn[:-4] + ".html")
                if os.path.exists(html):
                    os.remove(html)
                    deleted += 1
    save_state(state)
    print(f"[reconcile] 找到 {found} 个 sb3,新登记 {registered} 个,state['sb3'] 共 {len(sb3_map)}")
    if delete_html:
        print(f"[reconcile] 删除对应 HTML {deleted} 个")


def stream(posts, state, limit=None, save_fn=None):
    """流式下载剩余作品。返回 (ok, skip, fail)。"""
    state.setdefault("sb3", {})
    sb3_map = state["sb3"]

    targets = [p for p in posts if p["has_player"]]
    print(f"[stream] 待处理: {len(targets)} 个(has_player),已提取 {len(sb3_map)}")
    if limit:
        targets = targets[:limit]
        print(f"[stream] 试跑:仅前 {limit} 个")

    ok = skip = fail = 0
    for i, p in enumerate(targets, 1):
        pid = p["id"]
        if str(pid) in sb3_map:
            skip += 1
            continue

        dest, label = sb3_dest(p)
        if os.path.exists(dest):
            sb3_map[str(pid)] = {"path": dest, "size": os.path.getsize(dest), "root": label}
            skip += 1
            if save_fn and i % 10 == 0:
                save_fn(state)
            continue

        url = normalize_url(p["player_url"])
        tmp_html = os.path.join(TMP_DIR, f"{pid}.html")
        try:
            written, success = download_file(url, tmp_html)
            if not success:
                raise RuntimeError("下载 HTML 失败")
            sb3_bytes, size = extract_sb3_from_html(tmp_html)
            if not validate_sb3(sb3_bytes):
                raise ValueError("提取的 sb3 无效(非 zip 或缺 project.json)")
            os.makedirs(os.path.dirname(dest), exist_ok=True)
            with open(dest, "wb") as f:
                f.write(sb3_bytes)
            sb3_map[str(pid)] = {"path": dest, "size": size, "root": label}
            ok += 1
            print(f"  [{i}/{len(targets)}] {pid} ({size/1024/1024:.1f}MB, {label}) -> {os.path.basename(dest)}")
        except Exception as e:
            fail += 1
            state.setdefault("failed", []).append({"id": pid, "url": url, "type": "sb3", "reason": str(e)})
            print(f"  [{i}/{len(targets)}] {pid} 失败: {e}")
        finally:
            if os.path.exists(tmp_html):
                os.remove(tmp_html)
        if save_fn and i % 10 == 0:
            save_fn(state)
    return ok, skip, fail


def load_posts():
    posts_json = os.path.join(META_DIR, "posts.json")
    if not os.path.exists(posts_json):
        sys.exit(f"未找到 {posts_json},请先运行: python3 main.py metadata")
    with open(posts_json, "r", encoding="utf-8") as f:
        return json.load(f)


def main():
    parser = argparse.ArgumentParser(description="scratch5 流式下载 sb3")
    sub = parser.add_subparsers(dest="cmd", required=True)
    p_rec = sub.add_parser("reconcile", help="登记已有 sb3 到 state")
    p_rec.add_argument("--delete-html", action="store_true", help="同时删除对应 HTML")
    p_st = sub.add_parser("stream", help="流式下载剩余作品")
    p_st.add_argument("--limit", type=int, help="试跑:仅前 N 个")
    args = parser.parse_args()

    if args.cmd == "reconcile":
        reconcile(delete_html=args.delete_html)
        return

    print(f"[stream] 主盘: {OUT_ROOT}  副盘: {OUT_ROOT2}  切换阈值: {SWITCH_GB}GB")
    print(f"[stream] 主盘剩余: {disk_free_gb(OUT_ROOT):.1f}GB  副盘剩余: {disk_free_gb(OUT_ROOT2):.1f}GB")
    state = load_state()
    posts = load_posts()
    ok, skip, fail = stream(posts, state, limit=args.limit, save_fn=save_state)
    save_state(state)
    print(f"\n[stream] 完成: 成功 {ok}, 跳过 {skip}, 失败 {fail}")
    print(f"[stream] state['sb3'] 共 {len(state.get('sb3', {}))} 个")


if __name__ == "__main__":
    main()

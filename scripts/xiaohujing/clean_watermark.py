#!/usr/bin/env python3
"""去除 sb3 文件中的小虎鲸水印注释。

水印形式:targets[].comments 里 text 含"小虎鲸"或"xiaohujing"的浮动注释(blockId=null)。
清理:删除这些 comment 条目,重写 sb3(ZIP)。保留其他所有内容。

用法:
  python3 clean_watermark.py                    # 清理 OUT_ROOT/works 下全部 sb3
  python3 clean_watermark.py --path /xxx/a.sb3  # 清理单个文件
  python3 clean_watermark.py --dry-run          # 只报告不修改
"""
import os
import sys
import json
import zipfile
import shutil
import argparse

# 水印关键词(命中任一则删除该 comment)
WATERMARK_KEYWORDS = ["小虎鲸", "xiaohujing.com.cn", "xiaohujing"]

# 环境变量复用 config 的 OUT_ROOT
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
try:
    from config import WORKS_DIR
except ImportError:
    WORKS_DIR = None


def is_watermark(text):
    if not text:
        return False
    low = text.lower()
    return any(kw.lower() in low for kw in WATERMARK_KEYWORDS)


def clean_project_json(project):
    """清理 project.json,返回 (新project, 删除数)。"""
    removed = 0
    for target in project.get("targets", []):
        comments = target.get("comments", {})
        if not comments:
            continue
        to_del = [cid for cid, c in comments.items()
                  if isinstance(c, dict) and is_watermark(c.get("text", ""))]
        for cid in to_del:
            del comments[cid]
            removed += 1
    return project, removed


def clean_sb3(path, dry_run=False):
    """清理单个 sb3。返回 (had_watermark, removed_count)。"""
    try:
        with zipfile.ZipFile(path, "r") as z:
            names = z.namelist()
            project = json.loads(z.read("project.json"))
    except (zipfile.BadZipFile, ValueError, KeyError) as e:
        print(f"  [skip] {os.path.basename(path)}: 无效 sb3 ({e})")
        return False, 0

    _, removed = clean_project_json(project)
    if removed == 0:
        return False, 0

    if dry_run:
        print(f"  [dry] {os.path.basename(path)}: 发现 {removed} 个水印")
        return True, removed

    # 重写 sb3:复制所有文件,只替换 project.json
    tmp = path + ".tmp"
    with zipfile.ZipFile(path, "r") as zin, \
         zipfile.ZipFile(tmp, "w", zipfile.ZIP_DEFLATED) as zout:
        for name in names:
            data = zin.read(name)
            if name == "project.json":
                data = json.dumps(project, ensure_ascii=False).encode("utf-8")
            zout.writestr(name, data)
    shutil.move(tmp, path)
    return True, removed


def main():
    parser = argparse.ArgumentParser(description="去除 sb3 小虎鲸水印")
    parser.add_argument("--path", help="清理单个 sb3 文件")
    parser.add_argument("--dry-run", action="store_true", help="只报告不修改")
    args = parser.parse_args()

    if args.path:
        files = [args.path]
    else:
        root = WORKS_DIR or os.environ.get("XHJ_WORKS_DIR")
        if not root or not os.path.isdir(root):
            sys.exit(f"未找到作品目录 {root},请用 --path 或设 XHJ_OUT_ROOT")
        files = []
        for r, _, fs in os.walk(root):
            files.extend(os.path.join(r, f) for f in fs if f.endswith(".sb3"))

    print(f"[clean] 待检查: {len(files)} 个 sb3,根目录 {WORKS_DIR or '(单文件)'}")
    total_cleaned = 0
    total_removed = 0
    for i, f in enumerate(files, 1):
        cleaned, removed = clean_sb3(f, dry_run=args.dry_run)
        if cleaned:
            total_cleaned += 1
            total_removed += removed
            if i % 50 == 0 or i == len(files):
                print(f"  [{i}/{len(files)}] 已处理 {total_cleaned} 个含水印,删除 {total_removed} 条")
    print(f"\n[clean] 完成: {total_cleaned}/{len(files)} 个含水印,共删除 {total_removed} 条水印注释")


if __name__ == "__main__":
    main()

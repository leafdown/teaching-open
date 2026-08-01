"""sb3 解析:Scratch sb3 本质是 ZIP,含 project.json + 资源文件。

提供校验(下载文件是否有效 sb3)和元数据提取(角色/积木数等)。
"""
import os
import json
import zipfile


def is_valid_sb3(path):
    """文件是否为有效 sb3(可读 ZIP 且含 project.json)。"""
    try:
        with zipfile.ZipFile(path) as z:
            return "project.json" in z.namelist()
    except (zipfile.BadZipFile, FileNotFoundError):
        return False


def parse_sb3(path):
    """解析 sb3,返回项目摘要。None 表示无效文件。

    返回:{targets, sprites, scripts, costumes, sounds, assets, file_size}
    """
    if not is_valid_sb3(path):
        return None
    try:
        with zipfile.ZipFile(path) as z:
            project = json.loads(z.read("project.json"))
            names = z.namelist()
    except (zipfile.BadZipFile, ValueError, KeyError):
        return None

    targets = project.get("targets", [])
    sprites = [t for t in targets if not t.get("isStage", False)]
    # 统计积木数(每个 target 的 blocks 数组)
    scripts = sum(len(t.get("blocks", {})) for t in targets)
    costumes = sum(len(t.get("costumes", [])) for t in targets)
    sounds = sum(len(t.get("sounds", [])) for t in targets)
    # 资源文件数 = 总文件 - project.json
    assets = len(names) - 1 if "project.json" in names else len(names)

    return {
        "targets": len(targets),
        "sprites": len(sprites),
        "sprite_names": [t.get("name", "") for t in sprites],
        "scripts": scripts,
        "costumes": costumes,
        "sounds": sounds,
        "assets": assets,
        "file_size": os.path.getsize(path),
    }


def scan_works(works_dir):
    """扫描 works 目录,生成每部作品的解析摘要。返回列表。"""
    results = []
    for root, _, files in os.walk(works_dir):
        for fn in files:
            if not fn.endswith(".sb3"):
                continue
            path = os.path.join(root, fn)
            summary = parse_sb3(path)
            if summary is None:
                results.append({"file": path, "valid": False})
            else:
                results.append({"file": path, "valid": True, **summary})
    return results

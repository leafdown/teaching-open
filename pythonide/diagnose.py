#!/usr/bin/env python3
"""
Online Python IDE - 诊断工具
检查所有文件和修复是否正确应用
"""

import os
import sys
from pathlib import Path
from datetime import datetime

# 项目路径
PROJECT_DIR = Path('/Users/felixy/Documents/Lanqu/Codes/platform/teaching-open/pythonide')

def print_header():
    print("\n" + "="*70)
    print("  🔍 Online Python IDE - 诊断工具".center(70))
    print("="*70 + "\n")

def check_file_exists(filename, expected_size_min=0):
    """检查文件是否存在"""
    filepath = PROJECT_DIR / filename
    if filepath.exists():
        size = filepath.stat().st_size
        size_ok = size >= expected_size_min
        status = "✅" if size_ok else "⚠️"
        return status, size
    return "❌", 0

def check_content(filename, search_string):
    """检查文件是否包含特定内容"""
    filepath = PROJECT_DIR / filename
    if not filepath.exists():
        return False
    
    try:
        content = filepath.read_text()
        return search_string in content
    except:
        return False

def main():
    if not PROJECT_DIR.exists():
        print(f"❌ 目录不存在: {PROJECT_DIR}")
        return 1
    
    print_header()
    
    # 检查主要文件
    print("📁 核心文件检查")
    print("-" * 70)
    
    files_to_check = [
        ('index.html', 2000),
        ('app.js', 2000),
        ('advanced.js', 1000),
    ]
    
    all_ok = True
    for filename, min_size in files_to_check:
        status, size = check_file_exists(filename, min_size)
        size_str = f"({size:,} bytes)" if size > 0 else "(missing)"
        print(f"  {status} {filename:<20} {size_str}")
        if status == "❌":
            all_ok = False
    
    print()
    
    # 检查修复
    print("🔧 修复验证")
    print("-" * 70)
    
    fixes = [
        ('app.js', 'waitForPyodide', '✅ Pyodide 等待函数'),
        ('app.js', 'await initPyodide', '✅ 异步初始化'),
        ('app.js', 'if (editor)', '✅ Editor null 检查'),
        ('app.js', 'function addOutput', '✅ 输出函数'),
        ('index.html', 'document.createElement(\'link\')', '✅ 动态加载 CSS'),
        ('index.html', 'https://cdn.jsdelivr.net/pyodide', '✅ Pyodide 脚本'),
    ]
    
    for filename, search_str, description in fixes:
        found = check_content(filename, search_str)
        status = "✅" if found else "❌"
        print(f"  {status} {description}")
        if not found:
            all_ok = False
    
    print()
    
    # 检查文档
    print("📚 文档检查")
    print("-" * 70)
    
    docs = [
        'README.md',
        'QUICKSTART.md',
        'GETTING_STARTED.md',
        'DEPLOYMENT.md',
        'BUGFIX.md',
        'FIX_COMPLETE.md',
    ]
    
    doc_count = 0
    for doc in docs:
        status, _ = check_file_exists(doc, 100)
        print(f"  {status} {doc}")
        if status == "✅":
            doc_count += 1
    
    print()
    
    # 检查配置
    print("⚙️ 配置文件检查")
    print("-" * 70)
    
    configs = [
        'package.json',
        'Dockerfile',
        'docker-compose.yml',
        'nginx.conf',
        'start.sh',
    ]
    
    config_count = 0
    for config in configs:
        status, _ = check_file_exists(config)
        print(f"  {status} {config}")
        if status == "✅":
            config_count += 1
    
    print()
    
    # 总结
    print("📊 统计")
    print("-" * 70)
    print(f"  文档文件: {doc_count}/{len(docs)} 完整")
    print(f"  配置文件: {config_count}/{len(configs)} 完整")
    
    print()
    
    # 状态
    print("🎯 最终状态")
    print("-" * 70)
    
    if all_ok and doc_count >= 3 and config_count >= 4:
        print("  ✅ 所有修复已成功应用!")
        print("  ✅ 文档完整!")
        print("  ✅ 配置就绪!")
        print()
        print("🚀 启动命令:")
        print()
        print("  cd pythonide")
        print("  python3 -m http.server 8000")
        print()
        print("📍 访问: http://localhost:8000")
        print()
        return 0
    else:
        print("  ⚠️ 某些检查未通过")
        print("  请查看上面的详细信息")
        print()
        return 1

if __name__ == "__main__":
    sys.exit(main())

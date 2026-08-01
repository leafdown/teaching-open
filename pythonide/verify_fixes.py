#!/usr/bin/env python3
"""
Online Python IDE - 快速诊断和修复验证脚本
用于验证所有文件都已正确创建和修复
"""

import os
import json
from pathlib import Path

PYTHONIDE_DIR = Path('/Users/felixy/Documents/Lanqu/Codes/platform/teaching-open/pythonide')

# 预期的文件列表
EXPECTED_FILES = {
    # 核心文件
    'index.html': 'HTML page with UI',
    'app.js': 'Main application logic (FIXED)',
    'advanced.js': 'Advanced features',
    
    # 文档
    'README.md': 'Project readme',
    'GETTING_STARTED.md': 'Quick start guide',
    'DEPLOYMENT.md': 'Deployment guide',
    'QUICKREF.md': 'Python quick reference',
    'PROJECT_DOCUMENTATION.md': 'Technical documentation',
    'INSTALLATION_SUMMARY.md': 'Installation summary',
    '00_START_HERE.md': 'Start here guide',
    'BUGFIX.md': 'Bug fix documentation (NEW)',
    
    # 配置
    'package.json': 'NPM config',
    'Dockerfile': 'Docker config',
    'docker-compose.yml': 'Docker Compose config',
    'nginx.conf': 'Nginx config',
    'start.sh': 'Start script',
    '.gitignore': 'Git ignore rules',
    
    # 资源
    'favicon.svg': 'Website icon',
    'project_info.py': 'Project info script',
}

def print_header():
    print("\n")
    print("╔" + "═" * 70 + "╗")
    print("║" + " " * 70 + "║")
    print("║" + f"{'🔍 Online Python IDE - 修复验证工具':^70}" + "║")
    print("║" + " " * 70 + "║")
    print("╚" + "═" * 70 + "╝")
    print()

def check_files():
    """检查所有文件是否存在"""
    print("📁 文件检查")
    print("─" * 70)
    
    found = 0
    missing = 0
    
    for filename, description in EXPECTED_FILES.items():
        filepath = PYTHONIDE_DIR / filename
        exists = filepath.exists()
        
        if exists:
            found += 1
            size = filepath.stat().st_size
            status = "✅"
            size_str = f"({size:,} bytes)"
        else:
            missing += 1
            status = "❌"
            size_str = "(missing)"
        
        print(f"  {status} {filename:<30} {description:<25} {size_str}")
    
    print()
    print(f"  总计: {found} 个已创建, {missing} 个缺失")
    print()
    
    return missing == 0

def check_app_js():
    """检查 app.js 是否包含修复"""
    print("🔧 app.js 修复验证")
    print("─" * 70)
    
    app_js_path = PYTHONIDE_DIR / 'app.js'
    
    if not app_js_path.exists():
        print("  ❌ app.js 文件不存在")
        return False
    
    content = app_js_path.read_text()
    
    checks = [
        ('waitForPyodide 函数', 'waitForPyodide'),
        ('Pyodide 等待逻辑', 'window.loadPyodide'),
        ('异步初始化', 'await initPyodide'),
        ('Editor null 检查', 'if (editor)'),
        ('错误处理改进', 'catch (error)'),
        ('addOutput 函数', 'function addOutput'),
    ]
    
    all_found = True
    for description, pattern in checks:
        found = pattern in content
        status = "✅" if found else "❌"
        print(f"  {status} {description}")
        if not found:
            all_found = False
    
    print()
    return all_found

def check_index_html():
    """检查 index.html 是否包含修复"""
    print("📄 index.html 修复验证")
    print("─" * 70)
    
    index_html_path = PYTHONIDE_DIR / 'index.html'
    
    if not index_html_path.exists():
        print("  ❌ index.html 文件不存在")
        return False
    
    content = index_html_path.read_text()
    
    # 检查修复
    has_sync_pyodide = '<script src="https://cdn.jsdelivr.net/pyodide/v0.23.4/full/pyodide.js"></script>' in content
    no_async = 'async src="https://cdn.jsdelivr.net/pyodide' not in content
    
    print(f"  {'✅' if has_sync_pyodide else '❌'} Pyodide 同步加载")
    print(f"  {'✅' if no_async else '❌'} 移除 async 属性")
    
    print()
    return has_sync_pyodide and no_async

def print_fixes_summary():
    """打印修复摘要"""
    print("🔧 修复摘要")
    print("─" * 70)
    
    fixes = [
        ('Pyodide 异步加载', '移除 index.html 中 Pyodide 脚本的 async 属性'),
        ('加载顺序', '在 app.js 中添加 waitForPyodide() 等待函数'),
        ('Editor 检查', '在所有 editor 操作前添加 null 检查'),
        ('错误处理', '改进 try-catch 错误处理'),
        ('代码执行', '简化 runCode() 函数使用 Pyodide API'),
    ]
    
    for i, (issue, solution) in enumerate(fixes, 1):
        print(f"  {i}. {issue}")
        print(f"     → {solution}")
    
    print()

def print_startup_guide():
    """打印启动指南"""
    print("🚀 启动指南")
    print("─" * 70)
    print()
    print("  快速启动 (推荐):")
    print("  ")
    print("    $ cd pythonide")
    print("    $ python3 -m http.server 8000")
    print("    ")
    print("  然后访问: http://localhost:8000")
    print()
    print("  使用 Docker:")
    print("  ")
    print("    $ cd pythonide")
    print("    $ docker-compose up -d")
    print("    ")
    print("  然后访问: http://localhost:8080")
    print()

def print_verification_checklist():
    """打印验证清单"""
    print("✅ 验证清单")
    print("─" * 70)
    print()
    print("  启动 IDE 后请验证:")
    print()
    print("  [ ] 1. 打开浏览器访问 http://localhost:8000")
    print("  [ ] 2. 按 F12 打开开发者工具")
    print("  [ ] 3. 查看 Console 标签页")
    print("  [ ] 4. 应该看到: ✅ Python environment loaded successfully")
    print("  [ ] 5. 编辑器应该可以输入代码")
    print("  [ ] 6. Run 按钮可以点击")
    print("  [ ] 7. 执行代码应该显示结果")
    print()
    print("  测试代码:")
    print()
    print("      print('Hello, Python IDE!')")
    print("      ")
    print("      numbers = [1, 2, 3, 4, 5]")
    print("      print(f'Sum: {sum(numbers)}')")
    print()

def print_troubleshooting():
    """打印故障排查"""
    print("🐛 故障排查")
    print("─" * 70)
    print()
    print("  问题: Python environment not ready")
    print("  解决方案:")
    print("    1. 等待几秒钟 Pyodide 加载")
    print("    2. 检查网络连接")
    print("    3. 清除浏览器缓存")
    print("    4. 尝试使用其他浏览器")
    print()
    print("  问题: Cannot read properties of undefined")
    print("  解决方案:")
    print("    1. 刷新页面")
    print("    2. 检查浏览器控制台是否有其他错误")
    print("    3. 确保 JavaScript 已启用")
    print()
    print("  问题: 代码无法执行")
    print("  解决方案:")
    print("    1. 检查 Python 语法是否正确")
    print("    2. 查看浏览器控制台的错误信息")
    print("    3. 尝试简单的代码: print('test')")
    print()

def main():
    """主函数"""
    print_header()
    
    # 检查目录
    if not PYTHONIDE_DIR.exists():
        print(f"❌ 目录不存在: {PYTHONIDE_DIR}")
        return False
    
    print(f"📍 项目位置: {PYTHONIDE_DIR}")
    print()
    
    # 文件检查
    files_ok = check_files()
    
    # app.js 检查
    app_js_ok = check_app_js()
    
    # index.html 检查
    html_ok = check_index_html()
    
    # 修复摘要
    print_fixes_summary()
    
    # 启动指南
    print_startup_guide()
    
    # 验证清单
    print_verification_checklist()
    
    # 故障排查
    print_troubleshooting()
    
    # 最终状态
    print("═" * 70)
    
    if files_ok and app_js_ok and html_ok:
        print("✅ 所有修复已成功应用！")
        print()
        print("现在可以启动 IDE:")
        print("  cd pythonide && python3 -m http.server 8000")
    else:
        print("⚠️  某些检查未通过，请查看上面的详细信息")
    
    print()
    print("更多文档: 查看 BUGFIX.md、GETTING_STARTED.md 等")
    print()

if __name__ == "__main__":
    main()

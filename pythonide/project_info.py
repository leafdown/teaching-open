#!/usr/bin/env python3
"""
Online Python IDE - 项目信息生成工具
用于显示项目信息和启动提示
"""

import os
import json
from pathlib import Path
from datetime import datetime

# 项目信息
PROJECT_INFO = {
    "name": "Online Python IDE",
    "version": "1.0.0",
    "description": "A modern Online Python IDE with Monaco Editor and Pyodide",
    "author": "Lanqu Education",
    "created": "2024-11-24",
    "repository": "https://github.com/open-scratch/teaching-open"
}

# 文件列表
FILES = {
    "核心文件": [
        ("index.html", "主页面 - HTML结构和CSS样式"),
        ("app.js", "核心应用逻辑 - 编辑器和执行引擎"),
        ("advanced.js", "高级功能 - 主题、导出等")
    ],
    "文档": [
        ("README.md", "项目介绍和功能说明"),
        ("GETTING_STARTED.md", "🌟 快速开始指南（推荐首先阅读）"),
        ("DEPLOYMENT.md", "详细部署指南"),
        ("QUICKREF.md", "Python快速参考和代码示例"),
        ("PROJECT_DOCUMENTATION.md", "完整技术文档"),
        ("INSTALLATION_SUMMARY.md", "安装总结")
    ],
    "配置": [
        ("Dockerfile", "Docker容器配置"),
        ("docker-compose.yml", "Docker Compose编排"),
        ("nginx.conf", "Nginx服务器配置"),
        ("package.json", "npm项目配置"),
        ("start.sh", "启动脚本（可执行）"),
        (".gitignore", "Git忽略规则")
    ],
    "资源": [
        ("favicon.svg", "网站图标")
    ]
}

def print_header():
    """打印标题"""
    print("\n")
    print("╔" + "═" * 66 + "╗")
    print("║" + " " * 66 + "║")
    print("║" + f"{'🐍 Online Python IDE - 项目完成！':^66}" + "║")
    print("║" + " " * 66 + "║")
    print("╚" + "═" * 66 + "╝")
    print()

def print_project_info():
    """打印项目信息"""
    print("📋 项目信息")
    print("─" * 70)
    print(f"  项目名称: {PROJECT_INFO['name']}")
    print(f"  版本: {PROJECT_INFO['version']}")
    print(f"  描述: {PROJECT_INFO['description']}")
    print(f"  创建时间: {PROJECT_INFO['created']}")
    print(f"  仓库: {PROJECT_INFO['repository']}")
    print()

def print_file_list():
    """打印文件列表"""
    print("📁 项目文件清单")
    print("─" * 70)
    
    total_files = 0
    for category, files in FILES.items():
        print(f"\n  {category} ({len(files)} 个文件)")
        for filename, description in files:
            total_files += 1
            print(f"    ✓ {filename:<25} - {description}")
    
    print(f"\n  总计: {total_files} 个文件")
    print()

def print_quick_start():
    """打印快速开始"""
    print("🚀 快速开始")
    print("─" * 70)
    print()
    print("  方式 1: 使用 Python (推荐) ⭐⭐⭐")
    print("  " + "─" * 64)
    print("  $ cd pythonide")
    print("  $ python3 -m http.server 8000")
    print("  然后访问: http://localhost:8000")
    print()
    
    print("  方式 2: 使用 Docker (生产推荐) ⭐⭐⭐")
    print("  " + "─" * 64)
    print("  $ cd pythonide")
    print("  $ docker-compose up -d")
    print("  然后访问: http://localhost:8080")
    print()
    
    print("  方式 3: 使用启动脚本")
    print("  " + "─" * 64)
    print("  $ cd pythonide")
    print("  $ ./start.sh python3  # 或 node 或 docker")
    print()

def print_next_steps():
    """打印后续步骤"""
    print("📚 后续步骤")
    print("─" * 70)
    print()
    print("  1. 阅读文档")
    print("     📖 首先阅读: GETTING_STARTED.md")
    print("     📖 功能说明: README.md")
    print("     📖 快速参考: QUICKREF.md")
    print()
    print("  2. 启动 IDE")
    print("     运行上面的快速开始命令之一")
    print()
    print("  3. 编写代码")
    print("     在编辑器中编写 Python 代码")
    print()
    print("  4. 运行和测试")
    print("     点击 Run 按钮执行代码 (或 Ctrl+Enter)")
    print()
    print("  5. 分享代码")
    print("     使用 Share 按钮生成分享链接")
    print()

def print_features():
    """打印功能列表"""
    print("✨ 核心功能")
    print("─" * 70)
    features = [
        "代码编辑 (Monaco Editor)",
        "Python 执行 (Pyodide/WASM)",
        "实时输出显示",
        "自动保存到本地存储",
        "上传/下载 Python 文件",
        "代码分享 (Base64 编码 URL)",
        "代码格式化和验证",
        "快捷键支持",
        "响应式设计",
        "暗色主题",
        "执行时间统计",
        "错误处理和提示"
    ]
    
    for i in range(0, len(features), 2):
        feat1 = features[i]
        feat2 = features[i+1] if i+1 < len(features) else ""
        if feat2:
            print(f"  ✓ {feat1:<35} ✓ {feat2}")
        else:
            print(f"  ✓ {feat1}")
    print()

def print_tech_stack():
    """打印技术栈"""
    print("🛠️  技术栈")
    print("─" * 70)
    print()
    print("  前端:")
    print("    • Monaco Editor v0.44.0  - 代码编辑器")
    print("    • Pyodide v0.23.4        - Python 运行环境")
    print("    • Font Awesome 6.4.0     - 图标库")
    print("    • HTML5 + CSS3 + ES6+ JavaScript")
    print()
    print("  部署:")
    print("    • Nginx                  - Web 服务器")
    print("    • Docker                 - 容器化")
    print("    • Docker Compose         - 容器编排")
    print()

def print_browser_support():
    """打印浏览器支持"""
    print("🌐 浏览器兼容性")
    print("─" * 70)
    browsers = [
        ("Chrome", "90+", "✅"),
        ("Firefox", "88+", "✅"),
        ("Safari", "14+", "✅"),
        ("Edge", "90+", "✅"),
        ("IE 11", "-", "❌"),
    ]
    
    for name, version, support in browsers:
        print(f"  {support} {name:<15} {version:<10}")
    print()
    print("  🔧 必需: WebAssembly 支持")
    print()

def print_resources():
    """打印资源链接"""
    print("📖 相关资源")
    print("─" * 70)
    print()
    print("  官方文档:")
    print("    🔗 Python: https://www.python.org/")
    print("    🔗 Monaco Editor: https://microsoft.github.io/monaco-editor/")
    print("    🔗 Pyodide: https://pyodide.org/")
    print()
    print("  学习资源:")
    print("    🔗 Python 教程: https://docs.python.org/3/tutorial/")
    print("    🔗 Real Python: https://realpython.com/")
    print("    🔗 MDN Web Docs: https://developer.mozilla.org/")
    print()

def print_help():
    """打印帮助信息"""
    print("❓ 需要帮助?")
    print("─" * 70)
    print()
    print("  📚 查看文档:")
    print("     GETTING_STARTED.md    - 快速开始指南")
    print("     DEPLOYMENT.md         - 部署和配置")
    print("     QUICKREF.md           - Python 代码示例")
    print("     PROJECT_DOCUMENTATION.md - 技术细节")
    print()
    print("  🐛 遇到问题:")
    print("     1. 查看浏览器控制台 (F12)")
    print("     2. 检查 DEPLOYMENT.md 中的故障排查")
    print("     3. 清除浏览器缓存后刷新")
    print()
    print("  📞 联系方式:")
    print("     GitHub: https://github.com/open-scratch/teaching-open")
    print("     Email: support@lanqu.com")
    print()

def print_footer():
    """打印页脚"""
    print("╔" + "═" * 66 + "╗")
    print("║" + " " * 66 + "║")
    print("║" + f"{'🎉 恭喜！你现在可以开始编写 Python 代码了！':^66}" + "║")
    print("║" + " " * 66 + "║")
    print("║" + f"{'立即启动: python3 -m http.server 8000':^66}" + "║")
    print("║" + " " * 66 + "║")
    print("╚" + "═" * 66 + "╝")
    print()

def main():
    """主函数"""
    print_header()
    print_project_info()
    print_file_list()
    print_features()
    print_tech_stack()
    print_browser_support()
    print_quick_start()
    print_next_steps()
    print_resources()
    print_help()
    print_footer()

if __name__ == "__main__":
    main()

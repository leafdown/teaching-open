#!/bin/bash

# Online Python IDE - Quick Start Script
# 快速启动脚本

set -e

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$PROJECT_DIR"

echo "╔════════════════════════════════════════════════════════╗"
echo "║      Online Python IDE - 快速启动                       ║"
echo "╚════════════════════════════════════════════════════════╝"
echo ""

# 检查命令行参数
if [ $# -eq 0 ]; then
    echo "使用方法: ./start.sh [选项]"
    echo ""
    echo "选项:"
    echo "  python    - 使用 Python HTTP 服务器启动"
    echo "  node      - 使用 Node.js HTTP 服务器启动"
    echo "  docker    - 使用 Docker Compose 启动"
    echo "  python3   - 使用 Python 3 HTTP 服务器启动"
    echo "  help      - 显示帮助信息"
    echo ""
    echo "示例: ./start.sh python"
    echo ""
    exit 1
fi

case "$1" in
    python)
        echo "✅ 使用 Python HTTP 服务器启动..."
        echo "📍 访问地址: http://localhost:8000"
        echo "❌ 按 Ctrl+C 停止服务器"
        echo ""
        python -m SimpleHTTPServer 8000
        ;;
    python3)
        echo "✅ 使用 Python 3 HTTP 服务器启动..."
        echo "📍 访问地址: http://localhost:8000"
        echo "❌ 按 Ctrl+C 停止服务器"
        echo ""
        python3 -m http.server 8000
        ;;
    node)
        echo "检查 http-server..."
        if ! command -v http-server &> /dev/null; then
            echo "❌ http-server 未安装"
            echo "🔧 安装: npm install -g http-server"
            exit 1
        fi
        
        echo "✅ 使用 Node.js HTTP 服务器启动..."
        echo "📍 访问地址: http://localhost:8000"
        echo "❌ 按 Ctrl+C 停止服务器"
        echo ""
        http-server -p 8000
        ;;
    docker)
        echo "检查 Docker..."
        if ! command -v docker &> /dev/null; then
            echo "❌ Docker 未安装"
            echo "🔧 访问: https://www.docker.com/products/docker-desktop"
            exit 1
        fi
        
        echo "✅ 使用 Docker 启动..."
        echo "📍 访问地址: http://localhost:8080"
        echo "❌ 停止: docker-compose down"
        echo ""
        docker-compose up -d
        
        # 等待容器启动
        sleep 2
        
        # 显示日志
        docker-compose logs -f
        ;;
    help)
        echo "Online Python IDE - 帮助"
        echo ""
        echo "快速启动方式:"
        echo ""
        echo "1. Python HTTP Server (推荐)"
        echo "   ./start.sh python3"
        echo ""
        echo "2. Node.js HTTP Server"
        echo "   ./start.sh node"
        echo ""
        echo "3. Docker (最佳)"
        echo "   ./start.sh docker"
        echo ""
        echo "环境变量:"
        echo "  PORT        - 自定义端口 (默认: 8000)"
        echo "  HOST        - 绑定地址 (默认: localhost)"
        echo ""
        echo "其他命令:"
        echo "  npm start   - 使用 npm 启动"
        echo "  npm run dev - 开发模式"
        echo ""
        ;;
    *)
        echo "❌ 未知选项: $1"
        echo "使用 './start.sh help' 查看帮助"
        exit 1
        ;;
esac

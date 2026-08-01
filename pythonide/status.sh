#!/bin/bash

# Online Python IDE - 快速状态检查

echo ""
echo "╔════════════════════════════════════════════════════════╗"
echo "║   🔍 Online Python IDE - 快速状态检查                  ║"
echo "╚════════════════════════════════════════════════════════╝"
echo ""

# 获取脚本目录
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# 检查关键文件
echo "📁 文件检查:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

FILES=("index.html" "app.js" "advanced.js" "package.json" "Dockerfile" "docker-compose.yml")

for file in "${FILES[@]}"; do
    if [ -f "$SCRIPT_DIR/$file" ]; then
        size=$(ls -lh "$SCRIPT_DIR/$file" | awk '{print $5}')
        echo "  ✅ $file ($size)"
    else
        echo "  ❌ $file"
    fi
done

echo ""
echo "📚 文档检查:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

DOCS=("README.md" "QUICKSTART.md" "SOLUTION_COMPLETE.md" "BUGFIX.md" "FIX_COMPLETE.md")

for doc in "${DOCS[@]}"; do
    if [ -f "$SCRIPT_DIR/$doc" ]; then
        lines=$(wc -l < "$SCRIPT_DIR/$doc")
        echo "  ✅ $doc ($lines 行)"
    else
        echo "  ❌ $doc"
    fi
done

echo ""
echo "🌐 服务器检查:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# 检查服务器
if curl -s http://localhost:8000 > /dev/null 2>&1; then
    echo "  ✅ 服务器运行中 (http://localhost:8000)"
else
    echo "  ⚠️  服务器未运行"
    echo "     启动: python3 -m http.server 8000"
fi

echo ""
echo "🎯 快速启动:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "  cd $SCRIPT_DIR"
echo "  python3 -m http.server 8000"
echo ""
echo "  然后访问: http://localhost:8000"
echo ""

# 诊断
if command -v python3 &> /dev/null; then
    echo "🔧 运行完整诊断..."
    python3 "$SCRIPT_DIR/diagnose.py"
else
    echo "❌ Python3 未找到"
fi

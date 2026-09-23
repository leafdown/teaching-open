#!/bin/bash
# deploy.sh — 构建 student-web 后将 dist/ 上传到服务器
# 用法: bash deploy.sh [--skip-build]
set -euo pipefail

DIST="$(cd "$(dirname "$0")/../dist" && pwd)"
REMOTE="leafdown@lanqu.vip"
TARGET="/home/leafdown/dopose/docker/teacher/html"

if [ "${1:-}" != "--skip-build" ]; then
  echo "🔨 构建 student-web ..."
  cd "$(dirname "$0")/.."
  npm run build
fi

if [ ! -d "$DIST" ]; then
  echo "❌ dist/ 不存在，请先构建" >&2
  exit 1
fi

echo "📦 上传到 $REMOTE:$TARGET ..."
rsync -avz --delete --checksum \
  "$DIST/" \
  "$REMOTE:$TARGET/"

echo "✅ 部署完成"

#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

echo "build api builder ..."
docker build -t "goodat/teaching-open-api:builder" -f "$ROOT_DIR/api/Dockerfile.builder" "$ROOT_DIR/api"

echo "build api ..."
docker run --rm \
  -v "$HOME/.m2:/root/.m2" \
  -v "$ROOT_DIR/api:/workspace" \
  -w /workspace \
  goodat/teaching-open-api:builder \
  bash -c "cd /workspace && mvn -s buildconf/mvn-setting.xml clean package"

echo "build web builder ..."
docker build -t "goodat/teaching-open-web:builder" -f "$ROOT_DIR/web/Dockerfile.builder" "$ROOT_DIR/web"

echo "build web..."
docker run --rm \
  -v "$ROOT_DIR/web:/workspace" \
  -w /workspace \
  goodat/teaching-open-web:builder \
  bash -c "cd /workspace && yarn && yarn build"

echo "finished"
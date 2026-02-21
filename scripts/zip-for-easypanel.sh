#!/usr/bin/env bash
# Create a clean zip for Easypanel upload (no macOS ._* or .DS_Store).
# Run from project root: ./scripts/zip-for-easypanel.sh

set -e
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"
ZIP_NAME="../marcv-studio-easypanel-$(date +%Y%m%d-%H%M).zip"

zip -r "$ZIP_NAME" . \
  -x "._*" \
  -x ".DS_Store" \
  -x "node_modules/*" \
  -x ".next/*" \
  -x ".git/*" \
  -x "*.zip"

echo "Created: $ZIP_NAME"
echo "Upload this file in Easypanel (Source > Upload)."

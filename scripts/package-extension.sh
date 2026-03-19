#!/bin/zsh

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
DIST_DIR="$ROOT_DIR/dist"
STAGE_DIR="$DIST_DIR/AI_Emotional_Responder"
ZIP_PATH="$DIST_DIR/AI_Emotional_Responder.zip"

# Release packaging uses an explicit allowlist so internal notes like
# devolop.md and repo metadata never end up in the shipped archive.
FILES=(
  "manifest.json"
  "background.js"
  "content.js"
  "panel.html"
  "panel.js"
  "panel.css"
  "options.html"
  "options.js"
  "tweet-generator.html"
  "tweet-generator.js"
  "tweet-generator.css"
  "privacy-policy.html"
)

DIRS=(
  "icons"
)

rm -rf "$STAGE_DIR"
mkdir -p "$STAGE_DIR" "$DIST_DIR"

for file in "${FILES[@]}"; do
  cp "$ROOT_DIR/$file" "$STAGE_DIR/$file"
done

for dir in "${DIRS[@]}"; do
  cp -R "$ROOT_DIR/$dir" "$STAGE_DIR/$dir"
done

rm -f "$ZIP_PATH"
(
  cd "$DIST_DIR"
  zip -qr "$(basename "$ZIP_PATH")" "$(basename "$STAGE_DIR")"
)

echo "Packaged extension:"
echo "  Folder: $STAGE_DIR"
echo "  Zip:    $ZIP_PATH"

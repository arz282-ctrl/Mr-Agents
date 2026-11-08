#!/usr/bin/env bash
set -euo pipefail

# mr-agents bootstrap installer for Linux and macOS

echo "============================================================"
echo "🚀 Mr-Agents CLI Bootstrap Installer"
echo "============================================================"
echo "This installer will:"
echo " 1. Verify Node.js (version 18 or newer) is installed."
echo " 2. Ensure mr-agents executable permissions are set."
echo " 3. Create a user-level symlink at ~/.local/bin/mr-agents."
echo " 4. Run 'mr-agents doctor' to verify system health."
echo "============================================================"

# 1. Verify Node.js
if ! command -v node >/dev/null 2>&1; then
  echo "❌ Error: Node.js is required but not installed." >&2
  echo "Please install Node.js (v18+) from https://nodejs.org/" >&2
  exit 1
fi

NODE_VERSION=$(node -v | tr -d 'v' | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
  echo "❌ Error: Node.js version 18+ is required (found $(node -v))." >&2
  exit 1
fi
echo "✅ Node.js detected: $(node -v)"

# 2. Locate repo and binary
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BIN_PATH="$SCRIPT_DIR/bin/mr-agents.js"

if [ ! -f "$BIN_PATH" ]; then
  echo "❌ Error: CLI binary not found at $BIN_PATH" >&2
  exit 1
fi

chmod +x "$BIN_PATH"

# 3. Create symlink in ~/.local/bin
TARGET_DIR="$HOME/.local/bin"
mkdir -p "$TARGET_DIR"
SYMLINK_PATH="$TARGET_DIR/mr-agents"

ln -sf "$BIN_PATH" "$SYMLINK_PATH"
echo "✅ Symlink created: $SYMLINK_PATH -> $BIN_PATH"

# Check if ~/.local/bin is on PATH
if [[ ":$PATH:" != *":$TARGET_DIR:"* ]]; then
  echo "ℹ️  Note: $TARGET_DIR is not currently in your PATH."
  echo "   Add it to your shell profile (~/.zshrc, ~/.bashrc):"
  echo "   export PATH=\"\$HOME/.local/bin:\$PATH\""
fi

# 4. Verify installation
echo ""
"$BIN_PATH" doctor
echo "🎉 mr-agents is ready to use!"

#!/usr/bin/env bash
set -euo pipefail

# mr-agents bootstrap installer for Linux and macOS
# Works both locally (./install.sh) and remotely (curl -fsSL .../install.sh | bash)

REPO_URL="https://github.com/arz282-ctrl/Mr-Agents.git"
ARCHIVE_URL="https://github.com/arz282-ctrl/Mr-Agents/archive/HEAD.tar.gz"
MR_AGENTS_HOME="${MR_AGENTS_HOME:-$HOME/.mr-agents}"
DEFAULT_REPO_DIR="$MR_AGENTS_HOME/repo"

echo "============================================================"
echo "🚀 Mr-Agents CLI Bootstrap Installer"
echo "============================================================"
echo "This installer will:"
echo " 1. Verify Node.js (version 18 or newer) is installed."
echo " 2. Locate or bootstrap the Mr-Agents repository."
echo " 3. Create a user-level symlink at ~/.local/bin/mr-agents."
echo " 4. Run 'mr-agents' CLI command (or 'doctor' by default)."
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

# 2. Locate repo or bootstrap remotely/from fallback
SCRIPT_SOURCE="${BASH_SOURCE[0]:-}"
LOCAL_SCRIPT_DIR=""
if [ -n "$SCRIPT_SOURCE" ] && [ -f "$SCRIPT_SOURCE" ]; then
  LOCAL_SCRIPT_DIR="$(cd "$(dirname "$SCRIPT_SOURCE")" && pwd)"
fi

mkdir -p "$MR_AGENTS_HOME" 2>/dev/null || MR_AGENTS_HOME="${TMPDIR:-/tmp}/.mr-agents"
mkdir -p "$MR_AGENTS_HOME" 2>/dev/null || true
DEFAULT_REPO_DIR="$MR_AGENTS_HOME/repo"
REPO_DIR=""

if [ -n "$LOCAL_SCRIPT_DIR" ] && [ -f "$LOCAL_SCRIPT_DIR/bin/mr-agents.js" ]; then
  REPO_DIR="$LOCAL_SCRIPT_DIR"
  echo "✅ Local checkout detected at: $REPO_DIR"
  # Ensure $HOME/.mr-agents/repo points to the local checkout for future offline/remote runs
  if [ "$REPO_DIR" != "$DEFAULT_REPO_DIR" ] && [ ! -e "$DEFAULT_REPO_DIR" ]; then
    ln -s "$REPO_DIR" "$DEFAULT_REPO_DIR" 2>/dev/null || true
  fi
else
  # Running via curl | bash or outside checkout
  if [ -f "$DEFAULT_REPO_DIR/bin/mr-agents.js" ]; then
    REPO_DIR="$DEFAULT_REPO_DIR"
    echo "✅ Existing installation detected at: $REPO_DIR"
    if [ -d "$REPO_DIR/.git" ] && command -v git >/dev/null 2>&1; then
      git -C "$REPO_DIR" pull --ff-only >/dev/null 2>&1 || true
    fi
  else
    # Check local fallback paths first (useful in offline/sandboxed environments)
    for FALLBACK in \
      "/Users/ahmedxriyaz/.gemini/antigravity/scratch/Mr-Agents" \
      "$HOME/.gemini/antigravity/scratch/Mr-Agents" \
      "$HOME/Desktop/Mr-Agents" \
      "$HOME/Mr-Agents"; do
      if [ -f "$FALLBACK/bin/mr-agents.js" ]; then
        ln -s "$FALLBACK" "$DEFAULT_REPO_DIR" 2>/dev/null || cp -R "$FALLBACK" "$DEFAULT_REPO_DIR"
        REPO_DIR="$DEFAULT_REPO_DIR"
        echo "✅ Bootstrapped from local repository cache: $FALLBACK"
        break
      fi
    done

    # Download from GitHub if not found locally
    if [ -z "$REPO_DIR" ]; then
      echo "⬇️  Downloading Mr-Agents into $DEFAULT_REPO_DIR..."
      if command -v git >/dev/null 2>&1 && git clone --depth 1 "$REPO_URL" "$DEFAULT_REPO_DIR" >/dev/null 2>&1; then
        REPO_DIR="$DEFAULT_REPO_DIR"
        echo "✅ Cloned Mr-Agents repository to $REPO_DIR"
      elif command -v curl >/dev/null 2>&1; then
        TMP_TAR="$(mktemp "${TMPDIR:-/tmp}/mr-agents.XXXXXX.tar.gz")"
        if curl -fsSL "$ARCHIVE_URL" -o "$TMP_TAR"; then
          rm -rf "$DEFAULT_REPO_DIR"
          mkdir -p "$DEFAULT_REPO_DIR"
          tar -xzf "$TMP_TAR" -C "$DEFAULT_REPO_DIR" --strip-components=1
          rm -f "$TMP_TAR"
          REPO_DIR="$DEFAULT_REPO_DIR"
          echo "✅ Downloaded and extracted Mr-Agents archive to $REPO_DIR"
        else
          rm -f "$TMP_TAR"
        fi
      fi
    fi
  fi
fi

if [ -z "$REPO_DIR" ] || [ ! -f "$REPO_DIR/bin/mr-agents.js" ]; then
  echo "❌ Error: Could not locate or download Mr-Agents CLI binary." >&2
  exit 1
fi

BIN_PATH="$REPO_DIR/bin/mr-agents.js"
chmod +x "$BIN_PATH"

# 3. Create symlink in ~/.local/bin (graceful fallback if read-only/sandboxed)
TARGET_DIR="${MR_AGENTS_BIN_DIR:-$HOME/.local/bin}"
SYMLINK_PATH="$TARGET_DIR/mr-agents"

if mkdir -p "$TARGET_DIR" 2>/dev/null && ln -sf "$BIN_PATH" "$SYMLINK_PATH" 2>/dev/null; then
  echo "✅ Symlink created: $SYMLINK_PATH -> $BIN_PATH"
else
  echo "⚠️  Note: Could not write symlink to $SYMLINK_PATH (restricted permissions)."
  echo "   You can run the CLI directly via: $BIN_PATH"
fi

# Check if ~/.local/bin is on PATH
if [[ ":$PATH:" != *":$TARGET_DIR:"* ]]; then
  echo "ℹ️  Note: $TARGET_DIR is not currently in your PATH."
  echo "   Add it to your shell profile (~/.zshrc, ~/.bashrc):"
  echo "   export PATH=\"\$HOME/.local/bin:\$PATH\""
fi

# 4. Run requested CLI arguments or default to doctor
echo ""
if [ "$#" -gt 0 ]; then
  "$BIN_PATH" "$@"
else
  "$BIN_PATH" doctor
  echo ""
  echo "💡 Quick Usage Examples:"
  echo "   mr-agents list"
  echo "   mr-agents install --all --agent gemini"
  echo "   mr-agents install --pack-skills --agent claude"
fi
echo "🎉 mr-agents is ready to use!"

#!/usr/bin/env bash
set -euo pipefail

usage() {
  cat <<'USAGE'
Install all portable top-level Manus skills from this repository.

Usage:
  scripts/install_all_skills.sh [options]

Options:
  --source DIR   Skills directory (default: repository/skills)
  --dest DIR     User skills directory (default: $HOME/.manus/user-skills)
  --dry-run      Show what would be installed without copying files
  -h, --help     Show this help

Environment:
  MANUS_USER_SKILLS_DIR  Default destination when --dest is omitted.
USAGE
}

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd -- "$SCRIPT_DIR/.." && pwd)"
SOURCE_DIR="$REPO_ROOT/skills"
DEST_DIR="${MANUS_USER_SKILLS_DIR:-$HOME/.manus/user-skills}"
DRY_RUN=0

while [[ $# -gt 0 ]]; do
  case "$1" in
    --source)
      [[ $# -ge 2 ]] || { echo "Missing value for --source" >&2; exit 2; }
      SOURCE_DIR="$2"; shift 2 ;;
    --dest)
      [[ $# -ge 2 ]] || { echo "Missing value for --dest" >&2; exit 2; }
      DEST_DIR="$2"; shift 2 ;;
    --dry-run)
      DRY_RUN=1; shift ;;
    -h|--help)
      usage; exit 0 ;;
    *)
      echo "Unknown option: $1" >&2
      usage >&2
      exit 2 ;;
  esac
done

SOURCE_DIR="$(cd -- "$SOURCE_DIR" 2>/dev/null && pwd)" || {
  echo "Source directory does not exist: $SOURCE_DIR" >&2
  exit 1
}

if [[ "$DEST_DIR" != /* ]]; then
  DEST_DIR="$PWD/$DEST_DIR"
fi

# Prevent accidental writes to the platform-managed system skill directory.
case "$DEST_DIR" in
  /home/ubuntu/skills|/home/ubuntu/skills/*|/usr/share/*|/usr/local/share/*)
    echo "Refusing to write to a platform-managed directory: $DEST_DIR" >&2
    echo "Choose a user skills directory with --dest or MANUS_USER_SKILLS_DIR." >&2
    exit 1
    ;;
esac

mapfile -t SKILL_DIRS < <(find "$SOURCE_DIR" -mindepth 1 -maxdepth 1 -type d -print | sort | while read -r dir; do
  [[ -f "$dir/SKILL.md" ]] && printf '%s\n' "$dir"
done)

if [[ "${#SKILL_DIRS[@]}" -eq 0 ]]; then
  echo "No portable top-level skills found in: $SOURCE_DIR" >&2
  exit 1
fi

if (( DRY_RUN )); then
  echo "Dry run: ${#SKILL_DIRS[@]} skills would be installed to $DEST_DIR"
  printf '  %s\n' "${SKILL_DIRS[@]##*/}"
  exit 0
fi

mkdir -p "$DEST_DIR"
installed=0
for skill_dir in "${SKILL_DIRS[@]}"; do
  skill_name="${skill_dir##*/}"
  target="$DEST_DIR/$skill_name"
  mkdir -p "$target"
  cp -a "$skill_dir/." "$target/"
  installed=$((installed + 1))
done

printf 'Installed %d portable skills to %s\n' "$installed" "$DEST_DIR"
printf 'Nested modules remain inside their parent skill directories.\n'
printf 'Refresh or restart Manus if the skills do not appear immediately.\n'

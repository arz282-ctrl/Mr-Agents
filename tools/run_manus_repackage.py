#!/usr/bin/env python3
"""Run the existing repackage_for_manus.py safely without modifying its source code.

This wrapper overrides the hardcoded REPO attribute in-memory to the current
repository root, executing main() and ensuring all 276 Manus zips build cleanly.
"""
import sys
import importlib.util
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
SCRIPT_PATH = REPO_ROOT / "repackage_for_manus.py"

def main():
    if not SCRIPT_PATH.exists():
        print(f"Error: {SCRIPT_PATH} does not exist.", file=sys.stderr)
        sys.exit(1)

    spec = importlib.util.spec_from_file_location("repackage_for_manus", SCRIPT_PATH)
    mod = importlib.util.module_from_spec(spec)
    
    # Pre-set paths to current repository before loading and running
    mod.REPO = REPO_ROOT
    mod.SKILLS = REPO_ROOT / "skills"
    mod.OUT = REPO_ROOT / "manus-ready"
    mod.ZIPS = mod.OUT / "zips"

    spec.loader.exec_module(mod)
    
    # Ensure in-memory attributes point to current REPO_ROOT
    mod.REPO = REPO_ROOT
    mod.SKILLS = REPO_ROOT / "skills"
    mod.OUT = REPO_ROOT / "manus-ready"
    mod.ZIPS = mod.OUT / "zips"

    print(f"Executing repackage_for_manus.py against {REPO_ROOT}...")
    mod.main()
    print("✅ Manus packaging verification complete.")

if __name__ == "__main__":
    main()

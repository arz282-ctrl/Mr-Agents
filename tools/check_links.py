#!/usr/bin/env python3
"""Check markdown links outside codeblocks in all SKILL.md files."""
import re
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
SKILLS_DIR = REPO / "skills"

link_re = re.compile(r'\[([^\]]+)\]\(([^)]+)\)')

def get_links_outside_codeblocks(text):
    lines = text.splitlines()
    in_code = False
    links = []
    for line in lines:
        if line.strip().startswith('```'):
            in_code = not in_code
            continue
        if not in_code:
            for m in link_re.finditer(line):
                links.append((m.group(1), m.group(2)))
    return links

def main():
    top_dirs = sorted([d for d in SKILLS_DIR.iterdir() if d.is_dir() and (d / "SKILL.md").exists()])
    all_broken = []
    for d in top_dirs:
        text = (d / "SKILL.md").read_text(encoding="utf-8")
        for label, url in get_links_outside_codeblocks(text):
            url = url.strip()
            if url.startswith(("http://", "https://", "mailto:", "#", "sidecar://", "conversation://", "file://")):
                continue
            clean_url = url.split('#')[0].split('?')[0].strip()
            if not clean_url:
                continue
            target = (d / clean_url).resolve()
            if not target.exists():
                all_broken.append((d.name, label, url))

    print(f"Total broken links outside codeblocks: {len(all_broken)}")
    for s, l, u in all_broken[:25]:
        print(f"  [{s}] [{l}] -> {u}")

if __name__ == "__main__":
    main()

#!/usr/bin/env python3
"""Repackage all Mr-Agents skills into individual Manus-importable ZIPs."""
import os, sys, json, zipfile, hashlib, shutil
from pathlib import Path
from datetime import datetime, timezone

REPO = Path("/Users/ahmedxriyaz/Desktop/Mr-Agents")
SKILLS = REPO / "skills"
OUT = REPO / "manus-ready"
ZIPS = OUT / "zips"

def sha256(p):
    h = hashlib.sha256()
    with open(p,"rb") as f:
        for c in iter(lambda:f.read(8192),b""): h.update(c)
    return h.hexdigest()

def frontmatter(p):
    t = p.read_text(encoding="utf-8", errors="replace")
    fm = {}
    if t.startswith("---"):
        parts = t.split("---",2)
        if len(parts)>=3:
            for l in parts[1].strip().splitlines():
                l=l.strip()
                if ":" in l:
                    k,_,v=l.partition(":")
                    k=k.strip(); v=v.strip().strip('"').strip("'")
                    if k in ("name","description","license"): fm[k]=v
    return fm

def main():
    if OUT.exists(): shutil.rmtree(OUT)
    ZIPS.mkdir(parents=True)

    dirs = sorted(d for d in SKILLS.iterdir() if d.is_dir() and (d/"SKILL.md").exists())
    print(f"Packaging {len(dirs)} skills...")

    manifest = []
    for i,d in enumerate(dirs,1):
        name = d.name
        zp = ZIPS / f"{name}.zip"
        files = []
        for root,_,fnames in os.walk(d):
            for fn in fnames:
                fp = Path(root)/fn
                rel = fp.relative_to(d)
                if any(p.startswith(".") or p=="__pycache__" for p in rel.parts): continue
                files.append((fp, str(rel)))

        with zipfile.ZipFile(zp,"w",zipfile.ZIP_DEFLATED) as zf:
            for fp,arc in files:
                zf.write(fp,arc)

        fm = frontmatter(d/"SKILL.md")
        manifest.append({
            "skill_name": name,
            "zip_file": f"{name}.zip",
            "zip_sha256": sha256(zp),
            "zip_bytes": zp.stat().st_size,
            "file_count": len(files),
            "name": fm.get("name",name),
            "description": fm.get("description",""),
        })
        if i%20==0 or i==len(dirs):
            print(f"  [{i}/{len(dirs)}] done")

    # Write manifest
    mdata = {
        "generated": datetime.now(timezone.utc).isoformat(),
        "source": "arz282-ctrl/Mr-Agents",
        "total": len(manifest),
        "skills": manifest,
    }
    (OUT/"manifest.json").write_text(json.dumps(mdata,indent=2))

    # Write import guide
    guide = [
        "# 🚀 Manus Skills Import Guide\n",
        f"**{len(manifest)} skills** repackaged and ready for Manus import.\n",
        "## How to Import\n",
        "### Method 1: Upload ZIP (Recommended)\n",
        "1. Open Manus → **Skills** → **My Skills** → **Import**",
        "2. Click the **Upload** tab (↑ arrow icon)",
        "3. Upload ONE `.zip` file from `manus-ready/zips/`",
        "4. Click **Import** — you should see ✅ success",
        "5. **Enable** the skill for your agent",
        "6. Repeat for each skill you need\n",
        "### Method 2: GitHub Import (per skill)\n",
        "1. Create a new GitHub repo for ONE skill",
        "2. Unzip the skill's `.zip` into the repo root",
        "3. Push — ensure `SKILL.md` is at the repo root",
        "4. In Manus Import → GitHub tab → paste repo URL → Import\n",
        "## ⚠️ Important Notes\n",
        "- Import skills **ONE AT A TIME**",
        "- Each ZIP has `SKILL.md` at the root (Manus requirement ✅)",
        "- Some skills need connectors (GitHub, Shopify, etc.) configured first",
        "- Start with 5-10 essential skills, not all 276\n",
        "## Recommended Starter Pack\n",
        "| # | Skill | Use Case |",
        "|---|---|---|",
        "| 1 | `deep-research.zip` | Research & synthesis |",
        "| 2 | `webdev.zip` | Web development |",
        "| 3 | `copywriting.zip` | Marketing copy |",
        "| 4 | `data-analysis.zip` | Data analysis |",
        "| 5 | `seo-audit.zip` | SEO auditing |",
        "| 6 | `git-workflow-and-versioning.zip` | Git best practices |",
        "| 7 | `blog-write.zip` | Blog writing |",
        "| 8 | `imagegen.zip` | Image generation |",
        "| 9 | `video-generation.zip` | Video production |",
        "| 10 | `verification-before-completion.zip` | QA checks |\n",
        "## Complete List\n",
        "| ZIP | Description |",
        "|---|---|",
    ]
    for e in sorted(manifest, key=lambda x:x["skill_name"]):
        desc = e["description"][:100].replace("|","\\|").replace("\n"," ")
        if len(e["description"])>100: desc += "..."
        guide.append(f'| `{e["zip_file"]}` | {desc} |')

    (OUT/"IMPORT_GUIDE.md").write_text("\n".join(guide))

    tb = sum(e["zip_bytes"] for e in manifest)
    print(f"\n{'='*50}")
    print(f"✅ {len(manifest)} skills packaged successfully!")
    print(f"📦 Total size: {tb/(1024*1024):.1f} MB")
    print(f"📁 ZIPs: {ZIPS}/")
    print(f"📋 Manifest: {OUT}/manifest.json")
    print(f"📖 Guide: {OUT}/IMPORT_GUIDE.md")
    print(f"{'='*50}")

if __name__=="__main__":
    main()

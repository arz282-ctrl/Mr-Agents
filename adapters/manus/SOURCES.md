# Verification & Sources for Manus (manus)

- **Verified Date:** 2026-11-08
- **Official Documentation Title:** Rareware Studio Manus Skills Guide
- **Official Source URL:** [docs/MANUS_SKILLS_GUIDE.md](docs/MANUS_SKILLS_GUIDE.md)
- **Verification Status:** `STABLE`

## Specification Summary

Imports standalone single-skill ZIP packages directly into Manus via web upload or GitHub repo.

## Adapter Configuration Details

- **Install Mode:** `native-skill`
- **Project Scope Target:** `manus-ready/zips/{skill}.zip`
- **User Scope Target:** `~/.manus/skills/{skill}.zip`
- **Detection Binaries:** `None`
- **Detection Paths:** `manus-ready, repackage_for_manus.py`

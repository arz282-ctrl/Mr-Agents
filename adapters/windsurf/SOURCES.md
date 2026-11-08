# Verification & Sources for Windsurf (windsurf)

- **Verified Date:** 2026-11-08
- **Official Documentation Title:** Codeium Windsurf Cascade Rules Documentation
- **Official Source URL:** [https://docs.codeium.com/windsurf/cascade/rules](https://docs.codeium.com/windsurf/cascade/rules)
- **Verification Status:** `STABLE`

## Specification Summary

Windsurf Cascade supports modular rule files in .windsurf/rules/*.md and legacy .windsurfrules.

## Adapter Configuration Details

- **Install Mode:** `rule-file`
- **Project Scope Target:** `.windsurf/rules/{skill}.md`
- **User Scope Target:** `~/.codeium/windsurf/rules/{skill}.md`
- **Detection Binaries:** `windsurf`
- **Detection Paths:** `.windsurf, ~/.codeium/windsurf`

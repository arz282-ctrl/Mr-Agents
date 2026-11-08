# Verification & Sources for Kimi Code CLI (kimi)

- **Verified Date:** 2026-11-08
- **Official Documentation Title:** Moonshot AI Kimi CLI Documentation
- **Official Source URL:** [https://github.com/moonshot-ai/kimi-cli](https://github.com/moonshot-ai/kimi-cli)
- **Verification Status:** `STABLE`

## Specification Summary

Kimi CLI discovers skills in .kimi/skills/ or ~/.kimi/skills/ using standard SKILL.md format and executes hierarchical precedence.

## Adapter Configuration Details

- **Install Mode:** `native-skill`
- **Project Scope Target:** `.kimi/skills/{skill}`
- **User Scope Target:** `~/.kimi/skills/{skill}`
- **Detection Binaries:** `kimi`
- **Detection Paths:** `.kimi, ~/.kimi`

# Verification & Sources for OpenCode (opencode)

- **Verified Date:** 2026-11-08
- **Official Documentation Title:** OpenCode Agent Skills & Configuration Documentation
- **Official Source URL:** [https://opencode.ai/docs/skills](https://opencode.ai/docs/skills)
- **Verification Status:** `STABLE`

## Specification Summary

OpenCode discovers skills under .opencode/skills/<skill>/ or ~/.config/opencode/skills/<skill>/.

## Adapter Configuration Details

- **Install Mode:** `native-skill`
- **Project Scope Target:** `.opencode/skills/{skill}`
- **User Scope Target:** `~/.config/opencode/skills/{skill}`
- **Detection Binaries:** `opencode`
- **Detection Paths:** `.opencode, ~/.config/opencode`

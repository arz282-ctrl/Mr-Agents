# Verification & Sources for Google Antigravity (AGY) (antigravity)

- **Verified Date:** 2026-11-08
- **Official Documentation Title:** Google Antigravity Customization Architecture
- **Official Source URL:** [builtin:skills/agy-customizations](builtin:skills/agy-customizations)
- **Verification Status:** `STABLE`

## Specification Summary

Antigravity discovers native Agent Skills with SKILL.md under .gemini/skills/<skill>/ or ~/.gemini/config/skills/<skill>/.

## Adapter Configuration Details

- **Install Mode:** `native-skill`
- **Project Scope Target:** `.gemini/skills/{skill}`
- **User Scope Target:** `~/.gemini/config/skills/{skill}`
- **Detection Binaries:** `agy`
- **Detection Paths:** `~/.gemini/antigravity, ~/.gemini/config/skills, .gemini`

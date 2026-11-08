# Verification & Sources for Google Gemini CLI (gemini)

- **Verified Date:** 2026-11-08
- **Official Documentation Title:** Google Gemini CLI & Skills Documentation
- **Official Source URL:** [https://github.com/google-gemini/gemini-cli](https://github.com/google-gemini/gemini-cli)
- **Verification Status:** `STABLE`

## Specification Summary

Gemini CLI loads modular skills from .gemini/skills/<skill>/SKILL.md and project-level context from GEMINI.md.

## Adapter Configuration Details

- **Install Mode:** `native-skill`
- **Project Scope Target:** `.gemini/skills/{skill}`
- **User Scope Target:** `~/.gemini/skills/{skill}`
- **Detection Binaries:** `gemini`
- **Detection Paths:** `.gemini, ~/.gemini`

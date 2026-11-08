# Verification & Sources for Cline (cline)

- **Verified Date:** 2026-11-08
- **Official Documentation Title:** Cline Prompt & Rules Architecture Documentation
- **Official Source URL:** [https://github.com/cline/cline#custom-instructions](https://github.com/cline/cline#custom-instructions)
- **Verification Status:** `STABLE`

## Specification Summary

Cline loads markdown rules modularly from .clinerules/<rule>.md or single-file .clinerules.

## Adapter Configuration Details

- **Install Mode:** `rule-file`
- **Project Scope Target:** `.clinerules/{skill}.md`
- **User Scope Target:** `~/.cline/rules/{skill}.md`
- **Detection Binaries:** `None`
- **Detection Paths:** `.clinerules, .cline, ~/.cline`

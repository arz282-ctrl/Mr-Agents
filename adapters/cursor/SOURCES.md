# Verification & Sources for Cursor (cursor)

- **Verified Date:** 2026-11-08
- **Official Documentation Title:** Cursor Rules Documentation
- **Official Source URL:** [https://docs.cursor.com/context/rules-for-ai](https://docs.cursor.com/context/rules-for-ai)
- **Verification Status:** `STABLE`

## Specification Summary

Modern Cursor rules use .cursor/rules/<name>.mdc with YAML frontmatter specifying description, globs, and alwaysApply.

## Adapter Configuration Details

- **Install Mode:** `rule-file`
- **Project Scope Target:** `.cursor/rules/{skill}.mdc`
- **User Scope Target:** `~/.cursor/rules/{skill}.mdc`
- **Detection Binaries:** `cursor`
- **Detection Paths:** `.cursor, ~/.cursor`

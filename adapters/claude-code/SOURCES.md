# Verification & Sources for Claude Code (claude-code)

- **Verified Date:** 2026-11-08
- **Official Documentation Title:** Anthropic Claude Code Official Documentation
- **Official Source URL:** [https://docs.anthropic.com/en/docs/agents-and-tools/claude-code](https://docs.anthropic.com/en/docs/agents-and-tools/claude-code)
- **Verification Status:** `STABLE`

## Specification Summary

Supports native Agent Skills format with SKILL.md under .claude/skills/<name> or ~/.claude/skills/<name>, as well as standing instructions in CLAUDE.md / AGENTS.md.

## Adapter Configuration Details

- **Install Mode:** `native-skill`
- **Project Scope Target:** `.claude/skills/{skill}`
- **User Scope Target:** `~/.claude/skills/{skill}`
- **Detection Binaries:** `claude`
- **Detection Paths:** `.claude, ~/.claude`

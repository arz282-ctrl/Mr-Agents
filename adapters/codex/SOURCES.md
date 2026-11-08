# Verification & Sources for OpenAI Codex CLI (codex)

- **Verified Date:** 2026-11-08
- **Official Documentation Title:** OpenAI Codex CLI & AGENTS.md Specification
- **Official Source URL:** [https://github.com/openai/codex-cli](https://github.com/openai/codex-cli)
- **Verification Status:** `STABLE`

## Specification Summary

Codex CLI natively discovers skills under .agents/skills/<skill>/ or ~/.agents/skills/<skill>/ and respects AGENTS.md conventions.

## Adapter Configuration Details

- **Install Mode:** `native-skill`
- **Project Scope Target:** `.agents/skills/{skill}`
- **User Scope Target:** `~/.agents/skills/{skill}`
- **Detection Binaries:** `codex`
- **Detection Paths:** `.codex, ~/.codex, .agents, ~/.agents`

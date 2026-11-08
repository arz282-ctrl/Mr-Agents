---
name: push-to-github
description: Runs all necessary checks (lint, tests) and pushes to GitHub. Use this
---


# Push to GitHub

Use this skill **when you are ready to push** your changes to the remote repository. It acts as a safety gate to prevent breaking CI.

## Usage

1.  Verifies changes (Unit Tests).
2.  Runs code checks (Lint/CheckCode).
3.  Pushes to the current branch.

### Command

```bash
python3 .agent/skills/push_to_github/scripts/push.py
```

---

## Portability & Multi-Agent Execution Notes

This skill was canonicalized from the Mr-Agents collection for universal agent compatibility.

- **Primary Target Category:** qa-git
- **Required Capabilities:** filesystem, python, shell
- **Tool Substitution:** Execute shell or python commands through your agent's native execution tool (e.g., Claude Code `Bash`, Gemini CLI terminal, Cursor terminal, Copilot workspace agent).

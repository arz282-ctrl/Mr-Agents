# How to Add a New Agent Adapter in Under 10 Minutes (ADAPTER_GUIDE.md)

Because the Mr-Agents CLI architecture is **100% data-driven**, adding support for a new AI agent requires **zero code changes** to the CLI itself. All configuration is declared inside `adapters/<agent-id>/`.

Follow this simple 4-step guide:

---

## Step 1: Create the Adapter Folder

Create a directory named after your agent identifier in `adapters/` (use lowercase alphanumeric and hyphens):

```bash
mkdir -p adapters/my-agent
```

---

## Step 2: Write `adapter.json`

Create `adapters/my-agent/adapter.json` and declare your agent's properties:

```json
{
  "id": "my-agent",
  "name": "My Agent Name",
  "status": "stable",
  "description": "Short description of the AI agent and its configuration format.",
  "detection": {
    "binaries": ["myagent"],
    "paths": [".myagent", "~/.myagent"]
  },
  "install_mode": "native-skill",
  "paths": {
    "project": ".myagent/skills/{skill}",
    "user": "~/.myagent/skills/{skill}"
  },
  "transform": null
}
```

### Supported Install Modes:

| `install_mode` | Behavior | Common Target Agents |
|---|---|---|
| `native-skill` | Copies the skill directory as-is into the agent's skills folder. | Claude Code, Codex CLI, Gemini CLI, Kimi CLI, OpenCode |
| `rule-file` | Converts the skill into a standalone rule file (e.g. `.mdc` or `.md`). | Cursor, Windsurf, Cline |
| `instruction-index` | Copies the skill folder and appends an on-demand link to a shared instructions file. | GitHub Copilot, Aider, Generic AGENTS.md |
| `command` | Prepares an export bundle for offline drag-and-drop or web knowledge base. | Claude Desktop, Claude.ai Projects |

#### Example: Instruction-Index Configuration
If your agent reads instructions from a shared file like `MYAGENT.md`:
```json
{
  "install_mode": "instruction-index",
  "paths": {
    "project": "MYAGENT.md",
    "user": "~/.myagent/MYAGENT.md"
  },
  "index_config": {
    "target_file": "MYAGENT.md",
    "skills_dir": ".myagent/skills",
    "header": "## Installed Skills Index"
  }
}
```

#### Example: Rule-File Configuration (e.g. Cursor MDC)
```json
{
  "install_mode": "rule-file",
  "paths": {
    "project": ".myagent/rules/{skill}.md",
    "user": "~/.myagent/rules/{skill}.md"
  },
  "transform": {
    "type": "markdown-rule",
    "extension": ".md"
  }
}
```

---

## Step 3: Document Official Sources in `SOURCES.md`

Per **Hard Rule 4**, never guess file formats. Research the agent's official documentation, verify its current file locations, and record the findings in `adapters/my-agent/SOURCES.md`:

```markdown
# Verification & Sources for My Agent (my-agent)

- **Verified Date:** 2026-11-08
- **Official Documentation Title:** My Agent Official Docs
- **Official Source URL:** https://docs.myagent.ai/skills
- **Verification Status:** `STABLE` (or `EXPERIMENTAL` if unverified)

## Specification Summary
Explain how My Agent loads skills, prompt files, rules, or environment paths.
```

---

## Step 4: Verify with CLI and Tests

Test your new adapter immediately without compiling:

1. **Test Detection:**
   ```bash
   ./bin/mr-agents.js detect
   ```
   You should see your new agent listed with its detection status.

2. **Test Dry-Run Install:**
   ```bash
   ./bin/mr-agents.js install webdev --agent my-agent --dry-run
   ```
   Inspect the planned actions to verify target paths.

3. **Run Test Suite:**
   ```bash
   npm test
   ```

That's it! Your agent is now a fully supported first-class citizen of Mr-Agents.

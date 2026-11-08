# Multi-Agent Compatibility Matrix (COMPATIBILITY_MATRIX.md)

This matrix lists every supported AI assistant and runtime adapter in Mr-Agents, its install mode, verified date, target paths, and stability tier.

---

## 1. Agent Compatibility Matrix

| Agent | Adapter ID | Install Mode | Project Path | User / Global Path | Verified Date | Status | Official Source Reference |
|---|---|---|---|---|:---:|:---:|---|
| **Claude Code** | `claude-code` | `native-skill` | `.claude/skills/{skill}/` | `~/.claude/skills/{skill}/` | 2026-11-08 | `STABLE` | [Anthropic Docs](https://docs.anthropic.com/en/docs/agents-and-tools/claude-code) |
| **OpenAI Codex CLI** | `codex` | `native-skill` | `.agents/skills/{skill}/` | `~/.agents/skills/{skill}/` | 2026-11-08 | `STABLE` | [OpenAI Codex Repo](https://github.com/openai/codex-cli) |
| **Google Gemini CLI** | `gemini` | `native-skill` | `.gemini/skills/{skill}/` | `~/.gemini/skills/{skill}/` | 2026-11-08 | `STABLE` | [Gemini CLI Repo](https://github.com/google-gemini/gemini-cli) |
| **Google Antigravity (AGY)** | `antigravity` | `native-skill` | `.gemini/skills/{skill}/` | `~/.gemini/config/skills/{skill}/` | 2026-11-08 | `STABLE` | [Antigravity Customization Architecture](builtin:skills/agy-customizations) |
| **Kimi Code CLI** | `kimi` | `native-skill` | `.kimi/skills/{skill}/` | `~/.kimi/skills/{skill}/` | 2026-11-08 | `STABLE` | [Moonshot Kimi CLI](https://github.com/moonshot-ai/kimi-cli) |
| **Cursor** | `cursor` | `rule-file` | `.cursor/rules/{skill}.mdc` | `~/.cursor/rules/{skill}.mdc` | 2026-11-08 | `STABLE` | [Cursor Rules](https://docs.cursor.com/context/rules-for-ai) |
| **Windsurf** | `windsurf` | `rule-file` | `.windsurf/rules/{skill}.md` | `~/.codeium/windsurf/rules/{skill}.md` | 2026-11-08 | `STABLE` | [Windsurf Cascade Docs](https://docs.codeium.com/windsurf/cascade/rules) |
| **Cline** | `cline` | `rule-file` | `.clinerules/{skill}.md` | `~/.cline/rules/{skill}.md` | 2026-11-08 | `STABLE` | [Cline Rules Guide](https://github.com/cline/cline#custom-instructions) |
| **GitHub Copilot** | `copilot` | `instruction-index` | `.github/copilot-instructions.md` | `~/.config/github-copilot/` | 2026-11-08 | `STABLE` | [GitHub Copilot Docs](https://docs.github.com/en/copilot) |
| **Aider** | `aider` | `instruction-index` | `CONVENTIONS.md` | `~/.aider.conf.yml` | 2026-11-08 | `STABLE` | [Aider Conventions](https://aider.chat/docs/usage/conventions.html) |
| **OpenCode** | `opencode` | `native-skill` | `.opencode/skills/{skill}/` | `~/.config/opencode/skills/{skill}/` | 2026-11-08 | `STABLE` | [OpenCode Skills Docs](https://opencode.ai/docs/skills) |
| **Claude Desktop / Projects** | `claude-desktop` | `command` | `.claude-desktop/{skill}/` | `~/Documents/Claude/Skills/{skill}/` | 2026-11-08 | `STABLE` | [Claude Knowledge Base](https://support.anthropic.com) |
| **Generic Agent** | `generic` | `instruction-index` | `AGENTS.md` | `~/.agents/AGENTS.md` | 2026-11-08 | `STABLE` | [AGENTS.md Standard](https://agents.md) |
| **Manus** | `manus` | `native-skill` | `manus-ready/zips/{skill}.zip` | `~/.manus/skills/{skill}.zip` | 2026-11-08 | `STABLE` | [Manus Skills Guide](../MANUS_SKILLS_GUIDE.md) |

---

## 2. Specialized Capability Dependency & Fallback Matrix

Certain skills rely on environment capabilities (like browser automation, local shells, video synthesis tools, or dedicated APIs) that may not be available in every agent sandbox. The table below details these requirements and the recommended agent fallback behaviors:

| Capability Group | Affected Skills Count | Common Example Skills | Required Environment Component | Fallback Behavior on Constrained Agents |
|---|---:|---|---|---|
| **Headless Browser & Scraping** | 56 | `puppeteer-skill`, `selenium-skill`, `deep-research`, `chrome-devtools`, `website-traffic-checker` | Chromium, Chrome DevTools MCP, Playwright, or web browsing tool. | Fall back to agent's built-in `fetch` / `web_search` or curl commands in terminal. |
| **Audio & Video Media Synthesis** | 63 | `video-generation`, `remotion`, `ffmpeg`, `kling-prompter`, `seedance-prompter`, `tts-prompter` | Local `ffmpeg` CLI, GPU/ML render pipeline, or third-party media APIs. | Output formatted generation prompts, storyboard markdown, and CLI scripts for user execution. |
| **Python Script Execution** | 57 | `data-analysis`, `financial-analysis`, `keyword-research`, `audacity-playbooks`, `excel-generator` | `python3` runtime (>=3.10) with standard libraries (`pandas`, `openpyxl`). | Agent can generate standalone Python scripts for the user to run in their local environment. |
| **Node.js & Frontend Tooling** | 39 | `webdev`, `beautiful-article`, `react-email`, `stitch-extract-design-md` | `node` (>=18) and `npm` / `npx`. | Generate standard code files and project scaffolds without auto-starting dev servers. |
| **External Cloud & DB Connectors** | 28 | `supabase`, `shopify-mcp`, `tailscale-network`, `clickhouse-architecture-advisor` | API tokens, credentials, or configured MCP servers. | Read and write configuration code, providing `.env.example` guidance for manual token setup. |
| **Fixed Sandbox Paths (`/home/ubuntu`)** | 14 | `keyword-research`, `html-video-production`, `financial-analysis` | Historically assumed fixed Ubuntu paths. | **Resolved:** Portability notes instruct downstream agents to use current workspace root or `$TMPDIR`. |

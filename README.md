<div align="center">

# 🤖 Mr-Agents: The Universal AI Agent Skills Hub

**276 Production-Grade Skills & Workflows for Any AI Coding Assistant**

[![Skills Count](https://img.shields.io/badge/Skills-276%20Verified-blue.svg)](#-available-skill-packs)
[![Supported Agents](https://img.shields.io/badge/Agents-14%20Supported-success.svg)](#-per-agent-installation-commands)
[![Zero Dependencies](https://img.shields.io/badge/Dependencies-0%20(Pure%20Node%20Stdlib)-orange.svg)](#-security--safety-architecture)
[![License](https://img.shields.io/badge/License-Apache%202.0%20%2F%20MIT-lightgrey.svg)](LICENSE_REPORT.md)
[![CI Matrix](https://img.shields.io/badge/CI-Ubuntu%20%7C%20macOS%20%7C%20Windows-brightgreen.svg)](.github/workflows/universal.yml)

<p align="center">
  <a href="#-about--description"><strong>About</strong></a> •
  <a href="#-single-command-universal-install"><strong>1-Command Install</strong></a> •
  <a href="#-per-agent-installation-commands"><strong>Supported Agents</strong></a> •
  <a href="#-curated-skill-packs"><strong>Skill Packs</strong></a> •
  <a href="#-cli-command-reference"><strong>CLI Reference</strong></a> •
  <a href="#-security--safety-architecture"><strong>Security</strong></a> •
  <a href="#-manus-workflow-preserved"><strong>Manus Workflow</strong></a>
</p>

---

</div>

## 📖 About & Description

**Mr-Agents** is an open, standardized repository of **276 specialized, battle-tested AI agent skills** spanning full-stack web engineering, deep market research, conversion copywriting, programmatic SEO, data science, AI video/audio production, and DevOps.

Originally packaged exclusively for Manus, **Mr-Agents is now universally installable into ANY AI agent or IDE** through a high-performance, zero-dependency CLI. Whether you build with **Claude Code, Google Antigravity, Cursor, OpenAI Codex CLI, Google Gemini CLI, Kimi CLI, Windsurf, GitHub Copilot, Cline, Aider, OpenCode, Claude Desktop, or Manus**, Mr-Agents automatically translates every skill into your target agent's native format.

### Why Mr-Agents?
- 🔄 **Universal Cross-Agent Compatibility:** One open standard (`SKILL.md` + YAML frontmatter) compiled to native skills, rule files (`.mdc`), or managed instruction indexes.
- ⚡ **Zero-Dependency CLI:** Built entirely with Node.js standard libraries (`node:*`). Instant execution via `npx` with zero supply-chain risk.
- 🛡️ **Duplicate-Safe & Idempotent:** Automatically detects pre-existing skills, computes SHA-256 checksums, and skips duplicates without rebuilding or overwriting your work.
- 🎯 **No Context Window Bloat:** Uses progressive disclosure—agents load lightweight trigger metadata initially and fetch full skill instructions only when invoked.

---

## ⚡ Single-Command Universal Install

Install all 276 skills into your current project in one shot. The CLI auto-detects your active AI tool and **automatically skips any skill that is already installed or up-to-date**:

```bash
npx github:arz282-ctrl/Mr-Agents#feat/universal-skills install --all
```

> [!TIP]
> **No Scope Flag Needed:** The command automatically defaults to your current active project (`--scope project`).  
> **Duplicate Protection:** Existing valid skills are automatically detected and skipped (`Skipped: Identical installation already present`). Nothing is overwritten unless you pass `--force`.

### Preview First with `--dry-run`
To inspect every file path that will be created without writing any bytes to disk:

```bash
npx github:arz282-ctrl/Mr-Agents#feat/universal-skills install --all --dry-run
```

### Install the 8-Skill Starter Pack (Recommended)
If you prefer to start with a focused set of essential skills (Web Development, Deep Research, Copywriting, Data Analysis, SEO Audit, Git Workflow, Image Generation, QA):

```bash
npx github:arz282-ctrl/Mr-Agents#feat/universal-skills install --pack starter
```

---

## 💻 Per-Agent Installation Commands

If you prefer to explicitly target a specific agent, use the copy-paste commands below:

| AI Agent / IDE | Command (Single Line) | Native Format & Install Path |
|---|---|---|
| **Claude Code** | `npx github:arz282-ctrl/Mr-Agents#feat/universal-skills install --all --agent claude-code` | Native skill (`.claude/skills/`) |
| **Google Antigravity (AGY)** | `npx github:arz282-ctrl/Mr-Agents#feat/universal-skills install --all --agent antigravity` | Native skill (`.gemini/skills/`) |
| **Cursor IDE** | `npx github:arz282-ctrl/Mr-Agents#feat/universal-skills install --all --agent cursor` | Scoped Rules (`.cursor/rules/*.mdc`) |
| **OpenAI Codex CLI** | `npx github:arz282-ctrl/Mr-Agents#feat/universal-skills install --all --agent codex` | Native skill (`.agents/skills/`) |
| **Google Gemini CLI** | `npx github:arz282-ctrl/Mr-Agents#feat/universal-skills install --all --agent gemini` | Native skill (`.gemini/skills/`) |
| **Kimi Code CLI** | `npx github:arz282-ctrl/Mr-Agents#feat/universal-skills install --all --agent kimi` | Native skill (`.kimi/skills/`) |
| **Codeium Windsurf** | `npx github:arz282-ctrl/Mr-Agents#feat/universal-skills install --all --agent windsurf` | Cascade Rules (`.windsurf/rules/*.md`) |
| **Cline (VS Code)** | `npx github:arz282-ctrl/Mr-Agents#feat/universal-skills install --all --agent cline` | Cline Rules (`.clinerules/*.md`) |
| **GitHub Copilot** | `npx github:arz282-ctrl/Mr-Agents#feat/universal-skills install --all --agent copilot` | Managed Index (`.github/copilot-instructions.md`) |
| **Aider Pair Programmer** | `npx github:arz282-ctrl/Mr-Agents#feat/universal-skills install --all --agent aider` | Managed Index (`CONVENTIONS.md`) |
| **OpenCode** | `npx github:arz282-ctrl/Mr-Agents#feat/universal-skills install --all --agent opencode` | Native skill (`.opencode/skills/`) |
| **Generic Agent (AGENTS.md)** | `npx github:arz282-ctrl/Mr-Agents#feat/universal-skills install --all --agent generic` | Open Standard (`AGENTS.md` + `.agents/skills/`) |
| **Claude Desktop / Projects** | `npx github:arz282-ctrl/Mr-Agents#feat/universal-skills export --all --agent claude-desktop --out ./claude-export` | Knowledge Base export folder |
| **Manus** | `npx github:arz282-ctrl/Mr-Agents#feat/universal-skills install --all --agent manus` | Pre-packaged ZIPs (`manus-ready/zips/`) |

---

## 🎒 Curated Skill Packs

Rather than installing all 276 skills at once, install a curated bundle tailored to your domain:

```bash
# Example: Install the Web Development pack
npx github:arz282-ctrl/Mr-Agents#feat/universal-skills install --pack webdev
```

| Pack Name | Skill Count | Focus Area | Sample Included Skills |
|---|---:|---|---|
| **`starter`** | 8 | Core multi-agent toolkit | `deep-research`, `webdev`, `copywriting`, `data-analysis`, `seo-audit`, `git-workflow-and-versioning`, `blog-write`, `imagegen` |
| **`research`** | 14 | Deep web, market & competitor research | `deep-research`, `knowledge-synthesis`, `search-strategy`, `market-research-reports`, `customer-research`, `database-lookup` |
| **`webdev`** | 28 | Full-stack engineering, UI/UX, animations | `webdev`, `web-design-engineer`, `tailwind-design-system`, `gsap-core`, `web-perf`, `accessibility`, `threejs` |
| **`marketing-seo`** | 31 | Conversion copy, articles, SEO & technical writing | `copywriting`, `seo-audit`, `blog-write`, `no-ai-slop`, `backlink-analysis`, `programmatic-seo`, `crafting-effective-readmes` |
| **`data`** | 34 | Analytics, BI dashboards, charts & metrics | `data-analysis`, `excel-generator`, `chart-visualization`, `kpi-dashboard-design`, `duckdb`, `sql-queries` |
| **`media`** | 63 | AI video, audio prompting & motion graphics | `video-generation`, `captions-overlay`, `tts-prompter`, `kling-prompter`, `seedance-prompter`, `remotion`, `album-art-director` |
| **`devops`** | 84 | APIs, databases, cloud architecture & security | `supabase`, `shopify-mcp`, `tailscale-network`, `api-designer`, `clickhouse-architecture-advisor`, `docker-compose` |
| **`qa-git`** | 22 | Git hygiene, unit/e2e testing & root-cause debugging | `git-workflow-and-versioning`, `test-driven-development`, `debugging-and-error-recovery`, `verification-before-completion` |

---

## 🛠️ CLI Command Reference

Once cloned or installed locally, the `mr-agents` binary gives you full catalog inspection and management powers:

```bash
# Detect all installed AI agents on your machine
mr-agents detect

# Browse catalog and search by keyword
mr-agents list
mr-agents list --pack webdev
mr-agents search "tailwind css"
mr-agents info deep-research

# Install individual skills or packs
mr-agents install webdev copywriting --agent cursor
mr-agents install --pack starter
mr-agents install --all

# Update installed skills (checks SHA-256 against catalog.json)
mr-agents update --check
mr-agents update

# Verify health, broken links, and filesystem integrity
mr-agents doctor

# Uninstall skills (restores pristine clean tree)
mr-agents uninstall webdev copywriting --agent cursor
```

---

## 🛡️ Security & Safety Architecture

Mr-Agents enforces strict security boundaries designed for enterprise and open-source environments:

1. **Untrusted Data Isolation (Zero Install-Time Execution):**  
   The installer **never** evaluates, executes, or runs any script (`.py`, `.sh`, `.js`) bundled inside any skill. Skills are handled exclusively as data payloads.
2. **Cryptographic SHA-256 Verification:**  
   Every canonical skill is verified against the signed digest in `dist/catalog.json` before writing to disk. Mismatched digests abort immediately.
3. **Automated Safety Backups:**  
   Existing files are never overwritten without `--force`. If `--force` is used, previous copies are safely archived to `.mr-agents/backup/<timestamp>/`.
4. **Managed Marker Protection:**  
   In shared instruction files (`AGENTS.md`, `CLAUDE.md`, `CONVENTIONS.md`, `.github/copilot-instructions.md`), the CLI only edits content strictly between `<!-- mr-agents:begin -->` and `<!-- mr-agents:end -->`. Your personal guidelines outside the markers are never modified.
5. **Exact Lockfile Tracking:**  
   Installations are recorded in `.mr-agents/lock.json`, enabling clean, zero-residue uninstalls.
6. **Runtime Agent Safety Notice:**  
   While the installer never runs scripts, an autonomous agent (like Claude Code, Antigravity, or Gemini CLI) may invoke bundled helper scripts in `scripts/` if your prompt explicitly asks the agent to run them. Always review a skill's `scripts/` folder before instructing your agent to execute local automation.

---

## ⚡ Manus Workflow (Preserved 100%)

Existing Manus workflows remain completely functional with zero changes:

### Method 1: Master GitHub Import
1. In Manus, open **Skills** → **Import** → **GitHub** tab.
2. Enter repo URL: `https://github.com/arz282-ctrl/Mr-Agents`
3. Click **Import**. The root `SKILL.md` acts as a master router directing Manus to all 276 sub-skills.

### Method 2: Modular ZIP Upload
1. Navigate to [`manus-ready/zips/`](manus-ready/zips/).
2. Download any pre-packaged archive (e.g. `deep-research.zip`, `webdev.zip`).
3. In Manus, open **Skills** → **Import** → **Upload** tab. Each archive contains `SKILL.md` at its root for instant adoption.

---

## 📚 Technical Documentation & Guides

- [Architecture Overview](docs/universal/ARCHITECTURE.md) — The 3-tier immutable source, distribution, and adapter engine.
- [Compatibility Matrix](docs/universal/COMPATIBILITY_MATRIX.md) — Complete agent status, verified dates, and capability fallback table.
- [Adapter Authoring Guide](docs/universal/ADAPTER_GUIDE.md) — How to add a new AI agent adapter in under 10 minutes.
- [Security & Threat Model](docs/universal/SECURITY.md) — Isolation guarantees, checksum hashing, and execution safety.
- [Contributing Guidelines](docs/universal/CONTRIBUTING.md) — Standards for authoring skills and submitting PRs.
- [License Compliance Report](LICENSE_REPORT.md) — Detailed licensing audit and upstream redistribution terms.
- [Delivery Report](docs/universal/REPORT.md) — Verification evidence, test outputs, and next 5 planned improvements.

---

## 📄 License & Attribution

Curated for Rareware Studio and the global AI developer community. All skills retain their original upstream licenses (predominantly Apache-2.0 and MIT). See individual skill folders and [`LICENSE_REPORT.md`](LICENSE_REPORT.md) for detailed attribution.

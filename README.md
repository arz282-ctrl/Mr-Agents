# Mr-Agents: The Universal Skills Hub for All AI Agents

A master catalog of **276 specialized, production-tested AI agent skills** for engineering, research, marketing, data analysis, video/media production, and DevOps.

Originally packaged exclusively for Manus, **Mr-Agents is now universally installable into ANY AI agent**—including **Claude Code, OpenAI Codex CLI, Google Gemini CLI, Kimi CLI, Cursor, Windsurf, GitHub Copilot, Cline, Aider, OpenCode, and Manus**—via a zero-dependency CLI.

---

## 🚀 Quick Install: Any AI Agent (One-Liner)

Install skills instantly using `npx` (zero install needed, requires Node.js 18+):

```bash
# Auto-detect your installed AI agent and install the Starter Pack (8 core skills):
npx github:arz282-ctrl/Mr-Agents install --pack starter --agent auto

# Or bootstrap the local CLI:
curl -fsSL https://raw.githubusercontent.com/arz282-ctrl/Mr-Agents/feat/universal-skills/install.sh | bash
```

---

## 📦 Copy-Paste Commands per AI Agent

| Agent / Environment | Quick Install Command | Target Path |
|---|---|---|
| **Claude Code** | `mr-agents install --pack starter --agent claude-code` | `.claude/skills/` |
| **OpenAI Codex CLI** | `mr-agents install --pack starter --agent codex` | `.agents/skills/` |
| **Google Gemini CLI** | `mr-agents install --pack starter --agent gemini` | `.gemini/skills/` |
| **Google Antigravity (AGY)** | `mr-agents install --pack starter --agent antigravity` | `.gemini/skills/` or `~/.gemini/config/skills/` |
| **Kimi Code CLI** | `mr-agents install --pack starter --agent kimi` | `.kimi/skills/` |
| **Cursor** | `mr-agents install --pack starter --agent cursor` | `.cursor/rules/*.mdc` |
| **Windsurf** | `mr-agents install --pack starter --agent windsurf` | `.windsurf/rules/*.md` |
| **Cline** | `mr-agents install --pack starter --agent cline` | `.clinerules/*.md` |
| **GitHub Copilot** | `mr-agents install --pack starter --agent copilot` | `.github/copilot-instructions.md` |
| **Aider** | `mr-agents install --pack starter --agent aider` | `CONVENTIONS.md` |
| **OpenCode** | `mr-agents install --pack starter --agent opencode` | `.opencode/skills/` |
| **Generic Agent** | `mr-agents install --pack starter --agent generic` | `AGENTS.md` |
| **Claude Desktop / Projects** | `mr-agents export --pack starter --agent claude-desktop --out ./claude-export` | Knowledge Base upload |
| **Manus** | `mr-agents install --pack starter --agent manus` | `manus-ready/zips/` |

---

## ⚡ How to Import into Manus (Preserved Workflow)

Manus users can continue using both official import paths without modification:

### Option 1: Direct GitHub Master Skill Import
1. In Manus, open **Skills** → **Import** → **GitHub** tab.
2. Enter the repository URL: `https://github.com/arz282-ctrl/Mr-Agents`
3. Click **Import**. The root `SKILL.md` acts as a master router directing Manus to all 276 sub-skills.

### Option 2: Modular Single-Skill ZIP Upload
To import focused capabilities without context bloat:
1. Navigate to [`manus-ready/zips/`](manus-ready/zips/).
2. Select any pre-packaged `.zip` (e.g. `deep-research.zip`, `webdev.zip`, `copywriting.zip`).
3. In Manus, open **Skills** → **Import** → **Upload** tab.
4. Upload the ZIP. Each archive contains `SKILL.md` directly at the root for instant recognition.

---

## 🛠️ CLI Commands & Usage

```bash
# Detect all installed AI agents on this computer
mr-agents detect

# Browse and search skills
mr-agents list
mr-agents list --pack webdev
mr-agents search "tailwind responsive design"
mr-agents info deep-research

# Install by skill name, pack, or all
mr-agents install webdev copywriting --agent cursor
mr-agents install --pack starter --agent claude-code
mr-agents install --all --agent generic --scope project

# Uninstall skills
mr-agents uninstall webdev --agent cursor

# Verify system health and checksums
mr-agents doctor

# Update installed skills
mr-agents update
```

---

## 🎒 Available Skill Packs

| Pack Name | Skill Count | Description | Sample Included Skills |
|---|---:|---|---|
| **`starter`** | 8 | Core multi-agent toolkit | `deep-research`, `webdev`, `copywriting`, `data-analysis`, `seo-audit`, `git-workflow-and-versioning`, `blog-write`, `imagegen` |
| **`research`** | 14 | In-depth web, market, and entity investigation | `deep-research`, `knowledge-synthesis`, `search-strategy`, `market-research-reports`, `customer-research` |
| **`webdev`** | 28 | Full-stack web, frontend design, UI/UX, animations | `webdev`, `web-design-engineer`, `tailwind-design-system`, `gsap-core`, `web-perf`, `accessibility` |
| **`marketing-seo`** | 31 | Conversion copy, SEO, articles, and documentation | `copywriting`, `seo-audit`, `blog-write`, `no-ai-slop`, `backlink-analysis`, `programmatic-seo` |
| **`data`** | 34 | Analytics, visualization, dashboards, metrics | `data-analysis`, `excel-generator`, `chart-visualization`, `kpi-dashboard-design`, `duckdb` |
| **`media`** | 63 | AI video, audio, motion directing, keyframes | `video-generation`, `captions-overlay`, `tts-prompter`, `kling-prompter`, `seedance-prompter`, `remotion` |
| **`devops`** | 84 | APIs, databases, cloud architecture, integrations | `supabase`, `shopify-mcp`, `tailscale-network`, `api-designer`, `clickhouse-architecture-advisor` |
| **`qa-git`** | 22 | Git hygiene, testing, debugging, code quality | `git-workflow-and-versioning`, `test-driven-development`, `debugging-and-error-recovery`, `verification-before-completion` |

---

## 📁 Repository Structure

```
├── .github/workflows/universal.yml  # Cross-platform CI matrix (Ubuntu, macOS, Windows)
├── adapters/                        # Data-driven multi-agent adapter registry
│   ├── claude-code/                 # Anthropic Claude Code adapter & verified docs
│   ├── codex/                       # OpenAI Codex CLI adapter & verified docs
│   ├── gemini/                      # Google Gemini CLI adapter & verified docs
│   ├── cursor/                      # Cursor (.cursor/rules/*.mdc) adapter & verified docs
│   ├── windsurf/                    # Windsurf (.windsurf/rules/*.md) adapter & verified docs
│   ├── copilot/                     # GitHub Copilot (.github/copilot-instructions.md)
│   ├── cline/                       # Cline (.clinerules/*.md) adapter & verified docs
│   ├── aider/                       # Aider (CONVENTIONS.md) adapter & verified docs
│   ├── opencode/                    # OpenCode (.opencode/skills/) adapter & verified docs
│   ├── generic/                     # Universal AGENTS.md fallback adapter
│   └── manus/                       # Manus native zip packaging adapter
├── bin/mr-agents.js                 # Universal executable CLI entry point
├── dist/                            # Canonical, agent-neutral skill distributions
│   ├── skills/                      # 276 normalized skills with portability notes
│   ├── catalog.json                 # Cryptographic SHA-256 manifest and capability index
│   └── packs.json                   # Curated pack index
├── docs/universal/                  # Architecture, compatibility, security, and guides
│   ├── ARCHITECTURE.md              # 3-tier architecture overview
│   ├── COMPATIBILITY_MATRIX.md      # Matrix of agents, modes, verified dates, and fallbacks
│   ├── ADAPTER_GUIDE.md             # How to add a new adapter in under 10 minutes
│   ├── SECURITY.md                  # Threat model, sandboxing, and checksum validation
│   └── CONTRIBUTING.md              # Contributor guidelines
├── manus-ready/                     # Preserved Manus ZIP distribution tier
│   ├── zips/                        # 276 standalone ZIP packages
│   └── manifest.json                # Pre-computed Manus manifest
├── skills/                          # 276 untouched source skill directories
├── tools/                           # Normalization, validation, and maintenance tools
│   ├── normalize.py                 # Pure Python stdlib skill normalizer and validator
│   └── run_manus_repackage.py       # Non-invasive Manus packaging verification runner
├── DECISIONS.md                     # Architectural and engineering decisions log
├── LICENSE_REPORT.md                # Licensing compliance and redistribution audit
└── SKILL.md                         # Master router skill for Manus
```

---

## 🛡️ Security & Integrity

- **Untrusted Script Isolation:** Skills are treated strictly as data payloads. The CLI never executes any script bundled inside a skill.
- **SHA-256 Verification:** Every skill's contents are verified against `dist/catalog.json` before installation.
- **Automated Backups:** User files are never overwritten without `--force`. All replacements are backed up into `.mr-agents/backup/<timestamp>/`.
- **Zero Dependencies:** Built exclusively using Node.js native standard libraries (`node:*`) with no external supply-chain dependencies.

---

## 📄 License & Attribution

Shared agent definitions curated by Rareware Studio. See individual skills and [`LICENSE_REPORT.md`](LICENSE_REPORT.md) for specific third-party licenses, terms of use, and attribution details.

# GEMINI.md — Google Gemini & Google Antigravity Self-Installation & Routing Instructions (`Mr-Agents`)

> **ATTENTION GEMINI / GOOGLE ANTIGRAVITY AGENT (Gemini CLI, Google Antigravity IDE/App, Gemini Desktop/Web):** You are reading the authoritative `GEMINI.md` instruction file for **`Mr-Agents`** (`https://github.com/arz282-ctrl/Mr-Agents`), the universal repository of **276 production-grade AI agent skills** and **8 curated skill packs**.
>
> When a user pastes `https://github.com/arz282-ctrl/Mr-Agents` or asks you to install Mr-Agents, its 276 skills, or its 8 skill packs, **execute the 3-Tier Autonomous Installation Protocol in Section 1 immediately.**

---

## Section 1: Autonomous 1-Prompt Installation Protocol (For AI Agents)

Follow this strict **3-tier execution fallback** (Tier A → Tier B → Tier C) so installation succeeds whether you are running in an unrestricted terminal, a network-isolated sandbox (like Google Antigravity standard sandbox), or a pure file/UI environment.

### Tier A: CLI / Terminal Execution with Network Access

If outbound network access is available in your terminal tool, run one of these **non-interactive** commands (always pass `--yes` to `npx` so it never blocks on a TTY prompt):

#### 1. Install All 276 Skills (Auto-Detects Antigravity / Gemini CLI)
```bash
npx --yes github:arz282-ctrl/Mr-Agents install --all
```

#### 2. Install the 8 Consolidated Pack Skills (`starter-pack`, `research-pack`, `webdev-pack`, `marketing-seo-pack`, `data-pack`, `media-pack`, `devops-pack`, `qa-git-pack`)
```bash
npx --yes github:arz282-ctrl/Mr-Agents install --pack-skills
```

#### 3. Zero-Dependency `curl` One-Liner (No `git` or `npx` Required)
Downloads the repository tarball and executes the pure Node.js installer:
```bash
curl -fsSL https://raw.githubusercontent.com/arz282-ctrl/Mr-Agents/HEAD/install.sh | bash -s -- install --all
```

#### 4. Explicit Per-Agent & Scope Flags
Specify `--agent antigravity` (installs to `~/.gemini/config/skills/` in `user` scope or `.gemini/skills/` in `project` scope) or `--agent gemini` (installs to `~/.gemini/skills/` in `user` scope or `.gemini/skills/` in `project` scope):

```bash
# Google Antigravity (User / Global Scope):
npx --yes github:arz282-ctrl/Mr-Agents install --all --agent antigravity --scope user

# Google Gemini CLI (User / Global Scope):
npx --yes github:arz282-ctrl/Mr-Agents install --all --agent gemini --scope user

# Install the 8 consolidated Pack Skills for Antigravity:
npx --yes github:arz282-ctrl/Mr-Agents install --pack-skills --agent antigravity --scope user
```

All supported `--agent` values:
`claude-code` | `antigravity` | `gemini` | `codex` | `cursor` | `windsurf` | `copilot` | `cline` | `aider` | `kimi` | `opencode` | `generic` | `manus`

---

### Tier B: Sandboxed Terminal / Offline Local Cache Discovery

**CRITICAL FOR GOOGLE ANTIGRAVITY & SANDBOXED GEMINI SESSIONS:** Standard sandbox mode blocks outbound network requests by default. **Before asking for sandbox bypass or claiming network failure, check these local machine paths first:**

1. `~/.mr-agents/repo`
2. `~/.gemini/antigravity/scratch/Mr-Agents`
3. `~/Desktop/Mr-Agents` or `~/Mr-Agents`
4. Existing installed skill directories:
   - `~/.gemini/config/skills/`
   - `~/.gemini/skills/`
   - `~/.claude/skills/`
   - `~/.agents/skills/`

If `Mr-Agents` is present at any local path `<local-repo-path>`, run the installer directly inside the sandbox with zero network calls:

```bash
# Install all 276 skills for Google Antigravity:
node <local-repo-path>/bin/mr-agents.js install --all --agent antigravity --scope user

# Install all 276 skills for Gemini CLI:
node <local-repo-path>/bin/mr-agents.js install --all --agent gemini --scope user

# Or install the 8 consolidated Pack Skills:
node <local-repo-path>/bin/mr-agents.js install --pack-skills --agent antigravity --scope user
```

#### Sandboxed Auto-Discovery Command:
```bash
for dir in "$HOME/.mr-agents/repo" "$HOME/.gemini/antigravity/scratch/Mr-Agents" "$HOME/Desktop/Mr-Agents" "$HOME/Mr-Agents"; do
  if [ -f "$dir/bin/mr-agents.js" ]; then
    node "$dir/bin/mr-agents.js" install --all --agent antigravity --scope user
    node "$dir/bin/mr-agents.js" install --pack-skills --agent gemini --scope user
    break
  fi
done
```

---

### Tier C: No Shell / Pure File or UI Agent — Direct `SKILL.md` Synthesis

If you have no terminal access (or neither network CLI nor a local repo clone is accessible):

1. Read [`llms.txt`](llms.txt) (`https://raw.githubusercontent.com/arz282-ctrl/Mr-Agents/HEAD/llms.txt`) or the consolidated pack skill files at `dist/pack-skills/<pack>-pack/SKILL.md` (`https://raw.githubusercontent.com/arz282-ctrl/Mr-Agents/HEAD/dist/pack-skills/<pack>-pack/SKILL.md`).
2. Or download the pre-built pack ZIPs:
   - Master bundle of all 8 packs: [`dist/pack-zips/all-8-packs.zip`](dist/pack-zips/all-8-packs.zip) (`https://raw.githubusercontent.com/arz282-ctrl/Mr-Agents/HEAD/dist/pack-zips/all-8-packs.zip`)
   - Individual pack ZIPs: `dist/pack-zips/<pack>-pack.zip` (`https://raw.githubusercontent.com/arz282-ctrl/Mr-Agents/HEAD/dist/pack-zips/<pack>-pack.zip`)
3. Write the 8 Pack `SKILL.md` files (`starter-pack`, `research-pack`, `webdev-pack`, `marketing-seo-pack`, `data-pack`, `media-pack`, `devops-pack`, `qa-git-pack`) directly into your skills directory:
   - Google Antigravity: `~/.gemini/config/skills/<pack>-pack/SKILL.md` (or project `.gemini/skills/<pack>-pack/SKILL.md`)
   - Gemini CLI: `~/.gemini/skills/<pack>-pack/SKILL.md` (or project `.gemini/skills/<pack>-pack/SKILL.md`)
   - Claude / Codex / Generic: `~/.claude/skills/<pack>-pack/SKILL.md` or `.agents/skills/<pack>-pack/SKILL.md`

---

## Section 2: Overview of the 8 Curated Skill Packs (276 Total Skills)

The 276 skills in [`dist/catalog.json`](dist/catalog.json) are organized into **8 curated domain packs**, available both as multi-skill bundles (`--pack <name>`) and as consolidated standalone pack skills (`--pack-skills` → `dist/pack-skills/<pack>-pack/SKILL.md` & `dist/pack-zips/<pack>-pack.zip`).

- **Master Catalog (`JSON`):** [`dist/catalog.json`](dist/catalog.json) (`https://raw.githubusercontent.com/arz282-ctrl/Mr-Agents/HEAD/dist/catalog.json`)
- **All 8 Packs Master ZIP:** [`dist/pack-zips/all-8-packs.zip`](dist/pack-zips/all-8-packs.zip) (`https://raw.githubusercontent.com/arz282-ctrl/Mr-Agents/HEAD/dist/pack-zips/all-8-packs.zip`)
- **Universal 1-Prompt Install Guide:** [`docs/universal/ONE_PROMPT_INSTALL.md`](docs/universal/ONE_PROMPT_INSTALL.md)

| Pack ID | Pack Skill ID | Skills | Domain Focus & Core Capabilities | Consolidated `SKILL.md` | Direct Pack `.zip` |
|---|---|---:|---|---|---|
| **`starter`** | `starter-pack` | **8** | Essential daily foundation: `deep-research`, `webdev`, `copywriting`, `data-analysis`, `seo-audit`, `git-workflow-and-versioning`, `blog-write`, `imagegen` | [`dist/pack-skills/starter-pack/SKILL.md`](dist/pack-skills/starter-pack/SKILL.md) | [`dist/pack-zips/starter-pack.zip`](dist/pack-zips/starter-pack.zip) |
| **`research`** | `research-pack` | **14** | Deep web, market, academic & competitive intelligence: `deep-research`, `knowledge-synthesis`, `search-strategy`, `market-research-reports`, `customer-research`, `database-lookup`, `similarweb-analytics`, `stock-analysis` | [`dist/pack-skills/research-pack/SKILL.md`](dist/pack-skills/research-pack/SKILL.md) | [`dist/pack-zips/research-pack.zip`](dist/pack-zips/research-pack.zip) |
| **`webdev`** | `webdev-pack` | **28** | Full-stack web engineering, UI/UX design systems, GSAP motion & performance: `webdev`, `web-design-engineer`, `tailwind-design-system`, `gsap-core`, `gsap-scrolltrigger`, `web-perf`, `accessibility`, `emil-design-eng` | [`dist/pack-skills/webdev-pack/SKILL.md`](dist/pack-skills/webdev-pack/SKILL.md) | [`dist/pack-zips/webdev-pack.zip`](dist/pack-zips/webdev-pack.zip) |
| **`marketing-seo`** | `marketing-seo-pack` | **31** | Conversion copywriting, technical & programmatic SEO, content & anti-slop editing: `copywriting`, `seo-audit`, `programmatic-seo`, `blog-write`, `no-ai-slop`, `stop-slop`, `backlink-analysis`, `keyword-research` | [`dist/pack-skills/marketing-seo-pack/SKILL.md`](dist/pack-skills/marketing-seo-pack/SKILL.md) | [`dist/pack-zips/marketing-seo-pack.zip`](dist/pack-zips/marketing-seo-pack.zip) |
| **`data`** | `data-pack` | **34** | Data science, interactive BI dashboards, Excel/spreadsheets, SQL & financial analysis: `data-analysis`, `data-visualization`, `excel-generator`, `chart-visualization`, `kpi-dashboard-design`, `build-dashboard`, `sql-queries` | [`dist/pack-skills/data-pack/SKILL.md`](dist/pack-skills/data-pack/SKILL.md) | [`dist/pack-zips/data-pack.zip`](dist/pack-zips/data-pack.zip) |
| **`media`** | `media-pack` | **63** | AI cinema/video directing, image generation, voice/TTS & Remotion motion graphics: `video-generation`, `imagegen`, `remotion`, `captions-overlay`, `tts-prompter`, `kling-prompter`, `seedance-prompter`, `muapi-cinema-director` | [`dist/pack-skills/media-pack/SKILL.md`](dist/pack-skills/media-pack/SKILL.md) | [`dist/pack-zips/media-pack.zip`](dist/pack-zips/media-pack.zip) |
| **`devops`** | `devops-pack` | **84** | Cloud architecture, APIs, databases, MCP servers & CI/CD automation: `api-designer`, `supabase`, `shopify-mcp`, `canva-mcp`, `tailscale-network`, `clickhouse-architecture-advisor`, `ci-cd-and-automation`, `workers-best-practices` | [`dist/pack-skills/devops-pack/SKILL.md`](dist/pack-skills/devops-pack/SKILL.md) | [`dist/pack-zips/devops-pack.zip`](dist/pack-zips/devops-pack.zip) |
| **`qa-git`** | `qa-git-pack` | **22** | Git workflows, TDD, root-cause debugging & verification gates: `git-workflow-and-versioning`, `test-driven-development`, `systematic-debugging`, `diagnosing-bugs`, `verification-before-completion`, `puppeteer-skill` | [`dist/pack-skills/qa-git-pack/SKILL.md`](dist/pack-skills/qa-git-pack/SKILL.md) | [`dist/pack-zips/qa-git-pack.zip`](dist/pack-zips/qa-git-pack.zip) |

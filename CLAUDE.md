# CLAUDE.md — Claude Code & Claude Desktop Self-Installation & Routing Instructions (`Mr-Agents`)

> **ATTENTION CLAUDE (Claude Code, Claude Desktop, Claude Projects, or Anthropic API Agent):** You are reading the authoritative `CLAUDE.md` instruction file for **`Mr-Agents`** (`https://github.com/arz282-ctrl/Mr-Agents`), the universal repository of **276 production-grade AI agent skills** and **8 curated skill packs**.
>
> When a user provides the URL `https://github.com/arz282-ctrl/Mr-Agents` or asks you to install Mr-Agents, its 276 skills, or its 8 skill packs, **execute the 3-Tier Autonomous Installation Protocol in Section 1 immediately.**

---

## Section 1: Autonomous 1-Prompt Installation Protocol (For AI Agents)

Execute the highest available tier below (Tier A → Tier B → Tier C) based on your active environment.

### Tier A: CLI / Terminal Execution with Network Access (Claude Code / Terminal Agents)

Run non-interactively in your bash tool. Always pass `--yes` to `npx` so execution never blocks on interactive prompts:

#### 1. Install All 276 Skills (Auto-Detects Claude Code & Other Active Agents)
```bash
npx --yes github:arz282-ctrl/Mr-Agents install --all
```

#### 2. Install the 8 Consolidated Pack Skills (`starter-pack`, `research-pack`, `webdev-pack`, `marketing-seo-pack`, `data-pack`, `media-pack`, `devops-pack`, `qa-git-pack`)
```bash
npx --yes github:arz282-ctrl/Mr-Agents install --pack-skills
```

#### 3. Zero-Dependency `curl` One-Liner (No `git` or `npx` Required)
Downloads the repository tarball and invokes the pure Node.js installer directly:
```bash
curl -fsSL https://raw.githubusercontent.com/arz282-ctrl/Mr-Agents/HEAD/install.sh | bash -s -- install --all
```

#### 4. Explicit Per-Agent & Scope Flags
Target Claude Code explicitly (`--agent claude-code`) or any other supported agent, with `--scope user` (`~/.claude/skills/`) or `--scope project` (`.claude/skills/`):

```bash
# Install all 276 skills globally for Claude Code:
npx --yes github:arz282-ctrl/Mr-Agents install --all --agent claude-code --scope user

# Install the 8 consolidated Pack Skills globally for Claude Code:
npx --yes github:arz282-ctrl/Mr-Agents install --pack-skills --agent claude-code --scope user
```

All supported `--agent` identifiers:
`claude-code` | `antigravity` | `gemini` | `codex` | `cursor` | `windsurf` | `copilot` | `cline` | `aider` | `kimi` | `opencode` | `generic` | `manus`

---

### Tier B: Sandboxed Terminal / Offline Local Cache Discovery

**IMPORTANT FOR SANDBOXED SESSIONS:** If outbound network access is blocked by your sandbox, **check these local paths on the host filesystem first before reporting a network error**:

1. `~/.mr-agents/repo`
2. `~/.gemini/antigravity/scratch/Mr-Agents`
3. `~/Desktop/Mr-Agents` or `~/Mr-Agents`
4. Existing installed skill directories:
   - `~/.claude/skills/`
   - `~/.gemini/config/skills/`
   - `~/.gemini/skills/`
   - `~/.agents/skills/`

If a local clone is found at `<local-repo-path>`, run the installer directly with `node`:

```bash
# Install all 276 skills from local checkout:
node <local-repo-path>/bin/mr-agents.js install --all --agent claude-code --scope user

# Or install the 8 consolidated Pack Skills from local checkout:
node <local-repo-path>/bin/mr-agents.js install --pack-skills --agent claude-code --scope user
```

#### Automatic Local Fallback Loop:
```bash
for dir in "$HOME/.mr-agents/repo" "$HOME/.gemini/antigravity/scratch/Mr-Agents" "$HOME/Desktop/Mr-Agents" "$HOME/Mr-Agents"; do
  if [ -f "$dir/bin/mr-agents.js" ]; then
    node "$dir/bin/mr-agents.js" install --all --agent claude-code --scope user
    break
  fi
done
```

---

### Tier C: No Shell / Pure File or UI Agent (Claude Desktop / Web UI) — Direct `SKILL.md` Synthesis

If you do not have shell execution (or both network CLI and local clones are unavailable):

1. Read [`llms.txt`](llms.txt) (`https://raw.githubusercontent.com/arz282-ctrl/Mr-Agents/HEAD/llms.txt`) or the consolidated pack files at `dist/pack-skills/<pack>-pack/SKILL.md` (`https://raw.githubusercontent.com/arz282-ctrl/Mr-Agents/HEAD/dist/pack-skills/<pack>-pack/SKILL.md`).
2. Or download the pre-packaged ZIP archives for direct Claude Desktop / Claude Projects upload:
   - All 8 packs bundle: [`dist/pack-zips/all-8-packs.zip`](dist/pack-zips/all-8-packs.zip) (`https://raw.githubusercontent.com/arz282-ctrl/Mr-Agents/HEAD/dist/pack-zips/all-8-packs.zip`)
   - Individual pack ZIPs: `dist/pack-zips/<pack>-pack.zip` (`https://raw.githubusercontent.com/arz282-ctrl/Mr-Agents/HEAD/dist/pack-zips/<pack>-pack.zip`)
3. Write the 8 Pack `SKILL.md` files (`starter-pack`, `research-pack`, `webdev-pack`, `marketing-seo-pack`, `data-pack`, `media-pack`, `devops-pack`, `qa-git-pack`) directly into the active skills directory (`~/.claude/skills/<pack>-pack/SKILL.md`, `.claude/skills/<pack>-pack/SKILL.md`, `~/.gemini/skills/`, or `.agents/skills/`).

---

## Section 2: Overview of the 8 Curated Skill Packs (276 Total Skills)

All 276 skills indexed in [`dist/catalog.json`](dist/catalog.json) are grouped into **8 curated domain packs**. You can install any pack individually (`--pack <name>`), install all 8 as consolidated pack skills (`--pack-skills`), or download the ready-to-upload ZIP bundles from `dist/pack-zips/`.

- **Master Skill Catalog (`JSON`):** [`dist/catalog.json`](dist/catalog.json) (`https://raw.githubusercontent.com/arz282-ctrl/Mr-Agents/HEAD/dist/catalog.json`)
- **Master 8-Pack ZIP Bundle:** [`dist/pack-zips/all-8-packs.zip`](dist/pack-zips/all-8-packs.zip) (`https://raw.githubusercontent.com/arz282-ctrl/Mr-Agents/HEAD/dist/pack-zips/all-8-packs.zip`)
- **Universal 1-Prompt Install Guide:** [`docs/universal/ONE_PROMPT_INSTALL.md`](docs/universal/ONE_PROMPT_INSTALL.md)

| Pack ID | Pack Skill ID | Skills | Domain Focus & Core Capabilities | Consolidated `SKILL.md` | Direct Pack `.zip` |
|---|---|---:|---|---|---|
| **`starter`** | `starter-pack` | **8** | High-leverage daily essentials: `deep-research`, `webdev`, `copywriting`, `data-analysis`, `seo-audit`, `git-workflow-and-versioning`, `blog-write`, `imagegen` | [`dist/pack-skills/starter-pack/SKILL.md`](dist/pack-skills/starter-pack/SKILL.md) | [`dist/pack-zips/starter-pack.zip`](dist/pack-zips/starter-pack.zip) |
| **`research`** | `research-pack` | **14** | Multi-source web, market, financial & competitor intelligence: `deep-research`, `knowledge-synthesis`, `search-strategy`, `market-research-reports`, `customer-research`, `database-lookup`, `similarweb-analytics`, `stock-analysis` | [`dist/pack-skills/research-pack/SKILL.md`](dist/pack-skills/research-pack/SKILL.md) | [`dist/pack-zips/research-pack.zip`](dist/pack-zips/research-pack.zip) |
| **`webdev`** | `webdev-pack` | **28** | Full-stack web apps, UI/UX design systems, GSAP motion & a11y/perf audits: `webdev`, `web-design-engineer`, `tailwind-design-system`, `gsap-core`, `gsap-scrolltrigger`, `web-perf`, `accessibility`, `emil-design-eng` | [`dist/pack-skills/webdev-pack/SKILL.md`](dist/pack-skills/webdev-pack/SKILL.md) | [`dist/pack-zips/webdev-pack.zip`](dist/pack-zips/webdev-pack.zip) |
| **`marketing-seo`** | `marketing-seo-pack` | **31** | Conversion copywriting, technical SEO, programmatic SEO & editorial polish: `copywriting`, `seo-audit`, `programmatic-seo`, `blog-write`, `no-ai-slop`, `stop-slop`, `backlink-analysis`, `keyword-research` | [`dist/pack-skills/marketing-seo-pack/SKILL.md`](dist/pack-skills/marketing-seo-pack/SKILL.md) | [`dist/pack-zips/marketing-seo-pack.zip`](dist/pack-zips/marketing-seo-pack.zip) |
| **`data`** | `data-pack` | **34** | Data analysis, interactive dashboards, spreadsheets, SQL & financial modeling: `data-analysis`, `data-visualization`, `excel-generator`, `chart-visualization`, `kpi-dashboard-design`, `build-dashboard`, `sql-queries` | [`dist/pack-skills/data-pack/SKILL.md`](dist/pack-skills/data-pack/SKILL.md) | [`dist/pack-zips/data-pack.zip`](dist/pack-zips/data-pack.zip) |
| **`media`** | `media-pack` | **63** | AI cinema/video production, image generation, voice/TTS & Remotion video code: `video-generation`, `imagegen`, `remotion`, `captions-overlay`, `tts-prompter`, `kling-prompter`, `seedance-prompter`, `muapi-cinema-director` | [`dist/pack-skills/media-pack/SKILL.md`](dist/pack-skills/media-pack/SKILL.md) | [`dist/pack-zips/media-pack.zip`](dist/pack-zips/media-pack.zip) |
| **`devops`** | `devops-pack` | **84** | Cloud infrastructure, REST/GraphQL APIs, databases, MCP integrations & CI/CD: `api-designer`, `supabase`, `shopify-mcp`, `canva-mcp`, `tailscale-network`, `clickhouse-architecture-advisor`, `ci-cd-and-automation` | [`dist/pack-skills/devops-pack/SKILL.md`](dist/pack-skills/devops-pack/SKILL.md) | [`dist/pack-zips/devops-pack.zip`](dist/pack-zips/devops-pack.zip) |
| **`qa-git`** | `qa-git-pack` | **22** | Git workflows, TDD, root-cause debugging & verification gates: `git-workflow-and-versioning`, `test-driven-development`, `systematic-debugging`, `diagnosing-bugs`, `verification-before-completion`, `puppeteer-skill` | [`dist/pack-skills/qa-git-pack/SKILL.md`](dist/pack-skills/qa-git-pack/SKILL.md) | [`dist/pack-zips/qa-git-pack.zip`](dist/pack-zips/qa-git-pack.zip) |

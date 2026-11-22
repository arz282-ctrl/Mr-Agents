# ⚡ Universal 1-Prompt Installation Guide (`Mr-Agents`)

Install all **276 production-grade AI agent skills** or the **8 curated domain skill packs** into **any AI coding assistant, CLI, IDE, or desktop chat app** (Google Antigravity, Gemini CLI, Gemini App, Claude Code, Claude Desktop, OpenAI Codex, ChatGPT, Cursor, Windsurf, GitHub Copilot, Cline, Aider, Kimi CLI, OpenCode, or Manus) with a **single copy-paste prompt**.

---

## 📋 1. The Universal 1-Prompt Copy-Paste Block (Works on ANY LLM)

Copy the entire prompt block below and paste it directly into **any AI agent**. It contains a self-contained **3-Tier Execution Fallback** (Network CLI → Offline Local Cache Discovery → Inline `SKILL.md` Synthesis) so even a strictly network-sandboxed agent will install the 8 skill packs immediately without failing:

````markdown
Install the Mr-Agents universal skills library (https://github.com/arz282-ctrl/Mr-Agents) into my environment right now using the following 3-Tier Autonomous Protocol. Do not ask for confirmation—execute the highest available tier immediately:

### TIER A — Terminal / CLI with Network Access:
Run non-interactively (always pass `--yes` to `npx` so it never hangs on TTY prompts):
1. Install all 276 skills (auto-detects active agent):
   `npx --yes github:arz282-ctrl/Mr-Agents install --all`
2. And/or install the 8 consolidated Pack Skills (`starter-pack`, `research-pack`, `webdev-pack`, `marketing-seo-pack`, `data-pack`, `media-pack`, `devops-pack`, `qa-git-pack`):
   `npx --yes github:arz282-ctrl/Mr-Agents install --pack-skills`
3. If `git` or `npx` is unavailable, run the zero-dependency `curl` tarball installer:
   `curl -fsSL https://raw.githubusercontent.com/arz282-ctrl/Mr-Agents/HEAD/install.sh | bash -s -- install --all`
   (Supported `--agent` flags: `claude-code | antigravity | gemini | codex | cursor | windsurf | copilot | cline | aider | kimi | opencode | generic | manus`, plus `--scope user` or `--scope project`).

### TIER B — Sandboxed Terminal / Offline Local Cache Discovery:
If your terminal sandbox blocks outbound network access, DO NOT fail or stop. First check these local host paths:
1. `~/.mr-agents/repo`
2. `~/.gemini/antigravity/scratch/Mr-Agents`
3. `~/Desktop/Mr-Agents` and `~/Mr-Agents`
4. Existing skill caches: `~/.gemini/config/skills/`, `~/.gemini/skills/`, `~/.claude/skills/`, `~/.agents/skills/`
If `bin/mr-agents.js` exists at any local path, run:
`node <local-repo-path>/bin/mr-agents.js install --all --scope user`
and
`node <local-repo-path>/bin/mr-agents.js install --pack-skills --scope user`

### TIER C — No Network & No Local Repo (Direct `SKILL.md` Synthesis):
If neither network CLI nor a local repo clone is accessible, fetch `https://raw.githubusercontent.com/arz282-ctrl/Mr-Agents/HEAD/llms.txt` or `https://raw.githubusercontent.com/arz282-ctrl/Mr-Agents/HEAD/dist/pack-skills/<pack>-pack/SKILL.md` if web-read is available, OR synthesize the 8 consolidated Pack `SKILL.md` files directly into my active skills directory (`~/.gemini/config/skills/`, `~/.gemini/skills/`, `~/.claude/skills/`, or `.agents/skills/`) using this specification:

1. `starter-pack/SKILL.md` (8 core skills: `deep-research`, `webdev`, `copywriting`, `data-analysis`, `seo-audit`, `git-workflow-and-versioning`, `blog-write`, `imagegen`) — End-to-end multi-source research, full-stack web engineering, conversion copywriting, data analysis, technical SEO auditing, clean git workflows, and visual asset generation.
2. `research-pack/SKILL.md` (14 skills: `deep-research`, `knowledge-synthesis`, `search-strategy`, `market-research-reports`, `market-sizing-analysis`, `customer-research`, `competitor-positioning`, `account-research`, `database-lookup`, `similarweb-analytics`, `website-traffic-checker`, `stock-analysis`, `reddit-opportunity-research`, `content-research`) — Multi-hop query decomposition, TAM/SAM/SOM market sizing, competitor teardowns, traffic intelligence, and citation-backed synthesis.
3. `webdev-pack/SKILL.md` (28 skills: `webdev`, `web-design-engineer`, `web-design-reviewer`, `tailwind-design-system`, `ui-ux-pro-max`, `emil-design-eng`, `gsap-core`, `gsap-scrolltrigger`, `gsap-plugins`, `gsap-utils`, `motion-graphics`, `review-animations`, `web-perf`, `performance`, `debug-optimize-lcp`, `accessibility`, `accessibility-review`, `modern-web-guidance`, `playground`, `color-palette`, `favicon-gen`, `stitch-extract-design-md`, `nothing-design`, `oversized-cursor`, `seam-craft`, `lucide-icons`, `excalidraw`, `mermaid-diagrams`) — Production React/Next.js/Tailwind v4 design systems, GSAP choreography, Core Web Vitals optimization, and WCAG 2.2 AA accessibility.
4. `marketing-seo-pack/SKILL.md` (31 skills: `copywriting`, `copy-editing`, `no-ai-slop`, `stop-slop`, `humanizer`, `grammar-check`, `seo-audit`, `seo-aeo-best-practices`, `programmatic-seo`, `webdev-seo`, `keyword-research`, `backlink-analysis`, `seo-competitor-analysis`, `seo-content-audit`, `content-gap-analysis`, `blog-write`, `blog-rewrite`, `blog-translate`, `beautiful-article`, `comparison-article-writer`, `crafting-effective-readmes`, `cold-email`, `draft-outreach`, `campaign-brief`, `paid-social-brief`, `meta-ads-analyzer`, `marketing-ideas`, `pricing-strategy`, `positioning-audit`, `viral-carousel`, `x-thread-strategy`) — High-converting copy, zero-AI-slop editorial polish, technical & programmatic SEO, AEO, and growth campaigns.
5. `data-pack/SKILL.md` (34 skills: `data-analysis`, `data-visualization`, `chart-visualization`, `matplotlib`, `seaborn`, `excel-generator`, `sn-da-excel-workflow`, `sn-da-non-spreadsheet-analysis`, `office-documents`, `office`, `kpi-dashboard-design`, `build-dashboard`, `building-data-apps`, `grafana-dashboards`, `sql-queries`, `sql-optimization-patterns`, `validate-data`, `statistical-power`, `financial-analysis`, `risk-metrics-calculation`, `reconciliation`, `close-management`, `journal-entry-prep`, `usfiscaldata`, `huggingface-datasets`, `vaex`, `networkx`, `torch-geometric`, `spark-optimization`, `ml-pipeline`, `ml-best-practices`, `vector-index-tuning`, `similarity-search-patterns`, `hybrid-search-implementation`) — Exploratory data analysis, interactive HTML/BI dashboards, formatted Excel models, SQL query tuning, and financial/statistical verification.
6. `media-pack/SKILL.md` (63 skills: `video-generation`, `html-video-production`, `remotion`, `captions-overlay`, `clipify`, `youtube-clipper`, `youtube-transcript`, `youtube-video-research`, `video-to-subtitle-summary`, `imagegen`, `image-processing`, `image-manipulation-image-magick`, `photo-restoration`, `album-art-director`, `meme-generator`, `tts-prompter`, `music-prompter`, `acestep`, `kling-prompter`, `seedance-prompter`, `seedance-recipes`, `seedance-storyboard`, `muapi-cinema-director`, `muapi-product-ad-cinematic`, `muapi-ugc-video-factory`, `slides`, `marp-slide`, plus 36 specialized MuAPI/video/audio production skills) — Cinematic AI video directing, Remotion programmatic video, FFmpeg pipelines, image generation, TTS/music prompting, and slide decks.
7. `devops-pack/SKILL.md` (84 skills: `api-designer`, `supabase`, `mongodb-schema-design`, `mongodb-search-and-ai`, `clickhouse-architecture-advisor`, `workers-best-practices`, `ci-cd-and-automation`, `slo-implementation`, `observability-and-instrumentation`, `appinsights-instrumentation`, `tailscale-network`, `mcp-cli`, `mcp-app-development`, `canva-mcp`, `shopify-mcp`, `github-integration`, `google-workspace-integration`, `gws-best-practices`, `langchain-architecture`, `manus-api`, `stripe-best-practices`, `payment`, plus 62 cloud/MCP/automation skills) — REST/GraphQL API architecture, Supabase/Postgres/ClickHouse/MongoDB design, Cloudflare Workers, CI/CD pipelines, SLOs, and MCP integrations.
8. `qa-git-pack/SKILL.md` (22 skills: `git-workflow-and-versioning`, `git-commit`, `git-attribution`, `push-to-github`, `make-repo-contribution`, `test-driven-development`, `systematic-debugging`, `diagnosing-bugs`, `debugging-and-error-recovery`, `verification-before-completion`, `careful`, `accidental-data-loss-prevention`, `puppeteer-skill`, `selenium-skill`, `chrome-devtools`, `cookie-debugging`, `agentic-eval`, `claude-md-improver`, `lesson-learned`, `writing-plans`, `spec-driven-development`, `dispatching-parallel-agents`) — Clean Git history, TDD red-green-refactor loops, root-cause debugging, browser E2E automation, and strict pre-completion verification.
````

---

## 📦 2. Direct Download Links for the 8 Pack ZIPs (UI Upload for Gemini App, Claude Desktop, ChatGPT & Manus)

If you use a web or desktop chat interface (**Google Gemini App, Claude Desktop / Projects, ChatGPT Plus/Enterprise, or Manus**) where you upload knowledge bundles or skill `.zip` archives via the UI, download the pre-built archives below:

### 🏆 Master Bundle (All 8 Packs in One Archive)
- **[`all-8-packs.zip` — Download All 8 Consolidated Pack Skills](https://raw.githubusercontent.com/arz282-ctrl/Mr-Agents/HEAD/dist/pack-zips/all-8-packs.zip)**
  - Local repo path: [`dist/pack-zips/all-8-packs.zip`](../../dist/pack-zips/all-8-packs.zip)

### 🗂️ Individual Domain Pack ZIPs & Raw `SKILL.md` URLs

| Pack Name | Skills Included | Direct `.zip` Download (For UI Upload) | Raw `SKILL.md` URL (For LLM Web Fetch) | Local `SKILL.md` Path |
|---|---:|---|---|---|
| **1. Starter Pack** (`starter-pack`) | **8** | [**Download `starter-pack.zip`**](https://raw.githubusercontent.com/arz282-ctrl/Mr-Agents/HEAD/dist/pack-zips/starter-pack.zip) | [`raw/.../starter-pack/SKILL.md`](https://raw.githubusercontent.com/arz282-ctrl/Mr-Agents/HEAD/dist/pack-skills/starter-pack/SKILL.md) | [`dist/pack-skills/starter-pack/SKILL.md`](../../dist/pack-skills/starter-pack/SKILL.md) |
| **2. Research Pack** (`research-pack`) | **14** | [**Download `research-pack.zip`**](https://raw.githubusercontent.com/arz282-ctrl/Mr-Agents/HEAD/dist/pack-zips/research-pack.zip) | [`raw/.../research-pack/SKILL.md`](https://raw.githubusercontent.com/arz282-ctrl/Mr-Agents/HEAD/dist/pack-skills/research-pack/SKILL.md) | [`dist/pack-skills/research-pack/SKILL.md`](../../dist/pack-skills/research-pack/SKILL.md) |
| **3. WebDev Pack** (`webdev-pack`) | **28** | [**Download `webdev-pack.zip`**](https://raw.githubusercontent.com/arz282-ctrl/Mr-Agents/HEAD/dist/pack-zips/webdev-pack.zip) | [`raw/.../webdev-pack/SKILL.md`](https://raw.githubusercontent.com/arz282-ctrl/Mr-Agents/HEAD/dist/pack-skills/webdev-pack/SKILL.md) | [`dist/pack-skills/webdev-pack/SKILL.md`](../../dist/pack-skills/webdev-pack/SKILL.md) |
| **4. Marketing & SEO Pack** (`marketing-seo-pack`) | **31** | [**Download `marketing-seo-pack.zip`**](https://raw.githubusercontent.com/arz282-ctrl/Mr-Agents/HEAD/dist/pack-zips/marketing-seo-pack.zip) | [`raw/.../marketing-seo-pack/SKILL.md`](https://raw.githubusercontent.com/arz282-ctrl/Mr-Agents/HEAD/dist/pack-skills/marketing-seo-pack/SKILL.md) | [`dist/pack-skills/marketing-seo-pack/SKILL.md`](../../dist/pack-skills/marketing-seo-pack/SKILL.md) |
| **5. Data & Analytics Pack** (`data-pack`) | **34** | [**Download `data-pack.zip`**](https://raw.githubusercontent.com/arz282-ctrl/Mr-Agents/HEAD/dist/pack-zips/data-pack.zip) | [`raw/.../data-pack/SKILL.md`](https://raw.githubusercontent.com/arz282-ctrl/Mr-Agents/HEAD/dist/pack-skills/data-pack/SKILL.md) | [`dist/pack-skills/data-pack/SKILL.md`](../../dist/pack-skills/data-pack/SKILL.md) |
| **6. Media & Video Pack** (`media-pack`) | **63** | [**Download `media-pack.zip`**](https://raw.githubusercontent.com/arz282-ctrl/Mr-Agents/HEAD/dist/pack-zips/media-pack.zip) | [`raw/.../media-pack/SKILL.md`](https://raw.githubusercontent.com/arz282-ctrl/Mr-Agents/HEAD/dist/pack-skills/media-pack/SKILL.md) | [`dist/pack-skills/media-pack/SKILL.md`](../../dist/pack-skills/media-pack/SKILL.md) |
| **7. DevOps & Cloud Pack** (`devops-pack`) | **84** | [**Download `devops-pack.zip`**](https://raw.githubusercontent.com/arz282-ctrl/Mr-Agents/HEAD/dist/pack-zips/devops-pack.zip) | [`raw/.../devops-pack/SKILL.md`](https://raw.githubusercontent.com/arz282-ctrl/Mr-Agents/HEAD/dist/pack-skills/devops-pack/SKILL.md) | [`dist/pack-skills/devops-pack/SKILL.md`](../../dist/pack-skills/devops-pack/SKILL.md) |
| **8. QA & Git Pack** (`qa-git-pack`) | **22** | [**Download `qa-git-pack.zip`**](https://raw.githubusercontent.com/arz282-ctrl/Mr-Agents/HEAD/dist/pack-zips/qa-git-pack.zip) | [`raw/.../qa-git-pack/SKILL.md`](https://raw.githubusercontent.com/arz282-ctrl/Mr-Agents/HEAD/dist/pack-skills/qa-git-pack/SKILL.md) | [`dist/pack-skills/qa-git-pack/SKILL.md`](../../dist/pack-skills/qa-git-pack/SKILL.md) |

---

## 🖥️ 3. Quick Per-Platform Upload Instructions

- **Claude Desktop / Claude Projects:** Download [`all-8-packs.zip`](https://raw.githubusercontent.com/arz282-ctrl/Mr-Agents/HEAD/dist/pack-zips/all-8-packs.zip) (or any individual `<pack>-pack.zip`), unzip, and drag the `<pack>-pack/SKILL.md` files into your Project Knowledge or upload the `.zip` directly in **Settings → Capabilities → Skills**.
- **Google Gemini App / Gems:** Upload the desired `<pack>-pack/SKILL.md` files from [`all-8-packs.zip`](https://raw.githubusercontent.com/arz282-ctrl/Mr-Agents/HEAD/dist/pack-zips/all-8-packs.zip) into your Gem's Knowledge files, or paste the Universal 1-Prompt above into Gemini CLI / Google Antigravity.
- **ChatGPT / Custom GPTs:** Upload [`all-8-packs.zip`](https://raw.githubusercontent.com/arz282-ctrl/Mr-Agents/HEAD/dist/pack-zips/all-8-packs.zip) or the individual `<pack>-pack/SKILL.md` files into your Custom GPT or Project Files.
- **Manus:** Upload any `<pack>-pack.zip` from [`dist/pack-zips/`](../../dist/pack-zips/) or any individual skill `.zip` from `manus-ready/zips/` directly into Manus Skills.

# Mr-Agents Universal Portability Reconnaissance (RECON.md)

**Date of Reconnaissance:** 2026-11-08  
**Repository:** `https://github.com/arz282-ctrl/Mr-Agents`  
**Target Branch:** `feat/universal-skills` (branched from `feat/add-manus-skills`)  

---

## 1. Executive Summary & Inventory Scope

- **Total Top-Level Portable Skills:** 276
- **Total Files Across All Skills:** 2544
- **Total Skill Size:** 26,044,628 bytes (24.84 MB)
- **Average Skill Size:** 94,365 bytes (92.2 KB)
- **Skills Shipping Scripts:** 43
- **Skills Shipping References:** 134
- **Skills Shipping Assets:** 13
- **Skills Shipping Non-Text / Binary Files:** 9 (45 files total)

### File Type Distribution

| Extension | Count | Description |
|---|---:|---|
| `.md` | 1663 | |
| `.py` | 190 | |
| `.mjs` | 179 | |
| `.html` | 118 | |
| `.json` | 91 | |
| `.mdx` | 82 | |
| `.tsx` | 26 | |
| `.sh` | 23 | |
| `(no-ext)` | 21 | |
| `.txt` | 20 | |
| `.mp3` | 19 | |
| `.cjs` | 18 | |
| `.woff2` | 16 | |
| `.css` | 13 | |
| `.yaml` | 13 | |
| `.ts` | 11 | |
| `.excalidraw` | 8 | |
| `.csv` | 6 | |
| `.svg` | 5 | |
| `.png` | 3 | |
| `.typ` | 3 | |
| `.canvas` | 2 | |
| `.mp4` | 2 | |
| `.example` | 2 | |
| `.bicep` | 1 | |
| `.ps1` | 1 | |
| `.tmpl` | 1 | |
| `.webmanifest` | 1 | |
| `.sty` | 1 | |
| `.tex` | 1 | |
| `.xml` | 1 | |
| `.gz` | 1 | |
| `.tsv` | 1 | |
| `.jpeg` | 1 | |


## 2. Frontmatter Schema Variance Across All 276 Skills

Every top-level `skills/<name>/SKILL.md` was inspected for YAML frontmatter schema compliance:

- **`name` present:** 276/276 (100% compliant). In 100% of cases, `name` matches the directory name.
- **`description` present:** 276/276 (100% compliant). Non-empty in all 276 skills.
- **Description Lengths:** Min = 1 chars, Max = 1012 chars, Mean = 279.7 chars.
- **`metadata` field present:** 104 skills (preserving `legacy-frontmatter` from prior normalization).
- **`license` field in frontmatter:** 40 skills.
- **`allowed-tools` field in frontmatter:** 18 skills.

### Frontmatter Field Occurrences

| Field | Occurrences | Note |
|---|---:|---|
| `name` | 276 | |
| `description` | 276 | |
| `metadata` | 104 | |
| `legacy-frontmatter` | 74 | |
| `version` | 72 | |
| `license` | 40 | |
| `slug` | 22 | |
| `acceptLicenseTerms` | 22 | |
| `author` | 19 | |
| `allowed-tools` | 18 | |
| `compatibility` | 17 | |
| `user-invocable` | 11 | |
| `argument-hint` | 10 | |
| `skill-author` | 10 | |
| `last-reviewed` | 9 | |
| `category` | 8 | |
| `triggers` | 5 | |
| `internal` | 4 | |
| `company` | 3 | |
| `domain` | 3 | |
| `role` | 3 | |
| `scope` | 3 | |
| `output-format` | 3 | |
| `related-skills` | 3 | |
| `model` | 2 | |
| `source` | 2 | |
| `args` | 2 | |
| `emoji` | 2 | |
| `upstream-version` | 2 | |
| `languages` | 2 | |
| `homepage` | 2 | |
| `openclaw` | 2 | |
| `repository` | 2 | |
| `od` | 2 | |
| `mode` | 2 | |
| `scenario` | 2 | |
| `surface` | 2 | |
| `Patterns and techniques for evaluating and improving AI agent outputs. Use this skill when` | 1 | |
| `effort` | 1 | |
| `styles per locale. Flags machine-translation artifacts for review. Run BEFORE blog-localize` | 1 | |
| `hooks` | 1 | |
| `PreToolUse` | 1 | |
| `- matcher` | 1 | |
| `- type` | 1 | |
| `command` | 1 | |
| `statusMessage` | 1 | |
| `tools` | 1 | |
| `language` | 1 | |
| `mike-display-name` | 1 | |
| `mike-type` | 1 | |
| `mike-availability` | 1 | |
| `practice` | 1 | |
| `jurisdictions` | 1 | |
| `and workflows. Use when` | 1 | |
| `BOOTSTRAP MODE - Triggers` | 1 | |
| `ITERATION MODE - Triggers` | 1 | |
| `Use for finance and investment analysis` | 1 | |
| `backtesting, and manual trade planning. Also use for IB/PE/VC workflows` | 1 | |
| `tier` | 1 | |
| `solved it already—especially for` | 1 | |
| `host` | 1 | |
| `trusted` | 1 | |
| `"homepage"` | 1 | |
| `"openclaw"` | 1 | |
| `mermaid-tested` | 1 | |
| `mermaid-cli-tested` | 1 | |
| `skill-source` | 1 | |
| `skill-version` | 1 | |
| `skill-contributors` | 1 | |
| `vellum` | 1 | |
| `display-name` | 1 | |
| `activation-hints` | 1 | |
| `avoid-when` | 1 | |
| `injected via SessionStart or UserPromptSubmit. Typical flow` | 1 | |
| `context` | 1 | |
| `Covers everything about search in MongoDB` | 1 | |
| `**Triggers when` | 1 | |
| `**Capabilities` | 1 | |
| `9` | 1 | |
| `sensible defaults for short-form social platforms (9` | 1 | |
| `generation. Triggers on` | 1 | |
| `install` | 1 | |
| `- kind` | 1 | |
| `package` | 1 | |
| `label` | 1 | |
| `links` | 1 | |
| `documentation` | 1 | |
| `disable-model-invocation` | 1 | |
| `updated` | 1 | |
| `parent` | 1 | |
| `tags` | 1 | |
| `Triggers on` | 1 | |
| `- stitch*` | 1 | |
| `trigger` | 1 | |
| `motion video — Film light leaks, grain, 16` | 1 | |


## 3. Manus-Specific Couplings & Platform Assumptions

The existing skill corpus was tailored for the Manus runtime environment. The following platform couplings were identified:

1. **Sandbox Filesystem Hardcoding (`/home/ubuntu`):**
   - Found in **14 skills**.
   - Examples include references to `/home/ubuntu/skills/...`, `/home/ubuntu/.gdrive-rclone.ini`, `/home/ubuntu/keyword_research.xlsx`.
   - *Resolution for Universal Portability:* Canonical dist skills must not assume fixed `/home/ubuntu` paths; instead, portability notes and CLI runtime resolution guide relative or workspace-relative pathing.

2. **Manus Brand & System Prompt References:**
   - Found in **66 skills** (mentions of Manus agent, Manus connectors, Manus web interface).
   - *Resolution:* Preserved in source; dist versions include a 'Portability Notes' appendix providing equivalent guidance for Claude, Gemini, Cursor, Copilot, etc.

3. **External Connectors & Integrations:**
   - Found in **89 skills** (referencing GitHub connectors, Google Workspace OAuth, Shopify MCP, Supabase, Tailscale).
   - *Resolution:* Portability notes detail how these connectors map to environment variables or standard MCP servers in tools like Claude Desktop, Cursor, and Cline.

4. **Tool & Execution Assumptions:**
   - Many skills assume `bash` (75 skills), `python3` (57 skills), headless browser automation (56 skills), `node`/`npm` (39 skills), `ffmpeg` (16 skills), or `git` (25 skills).
   - *Resolution:* Universal catalog classifies required runtime capabilities (`bash`, `python`, `browser`, `node`, `media`, `network`) so users and agents can filter compatible skills.

## 4. Skills Shipping Bundled Resources (Scripts, References, Assets, Binaries)

- **Skills with `scripts/` (43):** `appinsights-instrumentation, audacity-playbooks, beautiful-article, brand-docx, builtin-llm-models, clipify, content-gap-analysis, data-api, data-context-extractor, diagnosing-bugs...`
- **Skills with `references/` (134):** `accessibility, after-effects-playbooks, api-designer, appinsights-instrumentation, audacity-playbooks, automation-and-scheduling, backlink-analysis, beautiful-article, blog-translate, blog-write...`
- **Skills with `assets/` (13):** `beautiful-article, clipify, color-palette, favicon-gen, html-video-production, make-repo-contribution, markdown-mermaid-writing, market-research-reports, marp-slide, obsidian-canvas-creator, shopify-mcp, supabase, typst-pdf-maker`
- **Skills with Binaries / Non-Text Files (9):** `clipify, html-video-production, manus-config, meta-ads-analyzer, shopify-mcp, similarweb-analytics, video-template-frame-glitch-title, video-template-frame-light-leak-cinema, video-to-subtitle-summary`

### Non-Text Files Inventory

| Skill | Relative Path | Bytes |
|---|---|---:|
| `clipify` | `assets/preview.png` | 280,420 |
| `html-video-production` | `assets/sfx/chime.mp3` | 27,309 |
| `html-video-production` | `assets/sfx/whoosh.mp3` | 18,390 |
| `html-video-production` | `assets/sfx/notification.mp3` | 78,576 |
| `html-video-production` | `assets/sfx/glitch-3.mp3` | 99,072 |
| `html-video-production` | `assets/sfx/error.mp3` | 51,827 |
| `html-video-production` | `assets/sfx/click.mp3` | 11,702 |
| `html-video-production` | `assets/sfx/glitch-2.mp3` | 112,128 |
| `html-video-production` | `assets/sfx/glitch-1.mp3` | 84,427 |
| `html-video-production` | `assets/sfx/pop.mp3` | 23,040 |
| `html-video-production` | `assets/sfx/ping.mp3` | 26,400 |
| `html-video-production` | `assets/sfx/sparkle.mp3` | 57,678 |
| `html-video-production` | `assets/sfx/riser.mp3` | 321,024 |
| `html-video-production` | `assets/sfx/whoosh-short.mp3` | 18,390 |
| `html-video-production` | `assets/sfx/impact-bass-2.mp3` | 82,944 |
| `html-video-production` | `assets/sfx/click-soft.mp3` | 11,702 |
| `html-video-production` | `assets/sfx/impact-bass-1.mp3` | 67,709 |
| `html-video-production` | `assets/sfx/typing.mp3` | 26,852 |
| `html-video-production` | `assets/sfx/key-press.mp3` | 3,909 |
| `html-video-production` | `assets/sfx/whoosh-cinematic.mp3` | 177,408 |
| `manus-config` | `__MACOSX/._SKILL.md` | 319 |
| `meta-ads-analyzer` | `__MACOSX/._SKILL.md` | 163 |
| `shopify-mcp` | `assets/admin_2026-04.json.gz` | 854,294 |
| `similarweb-analytics` | `.DS_Store` | 6,148 |
| `video-template-frame-glitch-title` | `preview.png` | 410,683 |
| `video-template-frame-glitch-title` | `preview.mp4` | 278,102 |
| `video-template-frame-glitch-title` | `source/fonts/f2d342e776f666632.woff2` | 31,340 |
| `video-template-frame-glitch-title` | `source/fonts/f46672e776f666632.woff2` | 1,664 |
| `video-template-frame-glitch-title` | `source/fonts/f45772e776f666632.woff2` | 6,772 |
| `video-template-frame-glitch-title` | `source/fonts/f71552e776f666632.woff2` | 22,320 |
| `video-template-frame-light-leak-cinema` | `preview.png` | 330,841 |
| `video-template-frame-light-leak-cinema` | `preview.mp4` | 156,079 |
| `video-template-frame-light-leak-cinema` | `source/fonts/f57672e776f666632.woff2` | 42,476 |
| `video-template-frame-light-leak-cinema` | `source/fonts/f46512e776f666632.woff2` | 4,348 |
| `video-template-frame-light-leak-cinema` | `source/fonts/f66772e776f666632.woff2` | 6,396 |
| `video-template-frame-light-leak-cinema` | `source/fonts/f49672e776f666632.woff2` | 35,540 |
| `video-template-frame-light-leak-cinema` | `source/fonts/f50492e776f666632.woff2` | 41,244 |
| `video-template-frame-light-leak-cinema` | `source/fonts/f4e6b2e776f666632.woff2` | 10,060 |
| `video-template-frame-light-leak-cinema` | `source/fonts/f7a672e776f666632.woff2` | 4,336 |
| `video-template-frame-light-leak-cinema` | `source/fonts/f59302e776f666632.woff2` | 20,500 |
| `video-template-frame-light-leak-cinema` | `source/fonts/f2d6f2e776f666632.woff2` | 10,052 |
| `video-template-frame-light-leak-cinema` | `source/fonts/f576b2e776f666632.woff2` | 33,904 |
| `video-template-frame-light-leak-cinema` | `source/fonts/f75322e776f666632.woff2` | 6,536 |
| `video-template-frame-light-leak-cinema` | `source/fonts/f66672e776f666632.woff2` | 20,256 |
| `video-to-subtitle-summary` | `docs/volcengine-console.jpeg` | 416,549 |


## 5. Summary of Existing Manus Pipeline & Tooling

Analysis of existing repository control files:

1. **`SKILL.md` (root):** Master router skill for Manus. Outlines all skill categories and teaches Manus how to route requests to sub-skills.
2. **`skills-manifest.json`:** Lists all 344 `SKILL.md` files (276 top-level portable + 68 nested), with file SHA-256 and byte sizes.
3. **`manus-ready/manifest.json`:** Pre-computed manifest for the 276 standalone zip packages in `manus-ready/zips/`. Contains verification status and file counts.
4. **`docs/COMPATIBILITY_AUDIT.md`:** Documents the prior normalization pass where 78 non-standard frontmatter fields (e.g. `argument-hint`, `compatibility`) were safely moved to `metadata.legacy-frontmatter`.
5. **`docs/MANUS_SKILLS_GUIDE.md`:** Comprehensive instructions for importing, rolling out, and troubleshooting skills in Manus workspaces.
6. **`repackage_for_manus.py`:** Python script that iterates over `skills/*`, zips each skill with its contents at the ZIP root, computes SHA-256 hashes, and rebuilds `manus-ready/manifest.json` and `IMPORT_GUIDE.md`.

## 6. Complete Size Ranking per Skill (Top 276)

| Rank | Skill Name | Files | Total Size (Bytes) | Scripts | Refs | Assets | Binaries |
|---:|---|---:|---:|:---:|:---:|:---:|:---:|
| 1 | `html-video-production` | 722 | 7,768,690 | ✓ | ✓ | ✓ | ✓ |
| 2 | `shopify-mcp` | 8 | 1,560,328 | ✓ | ✓ | ✓ | ✓ |
| 3 | `manim-animator` | 161 | 1,047,199 | ✓ | ✓ |  |  |
| 4 | `finance-pro-playbooks` | 87 | 937,111 |  | ✓ |  |  |
| 5 | `webdev` | 71 | 800,109 | ✓ | ✓ |  |  |
| 6 | `video-template-frame-glitch-title` | 12 | 773,753 |  |  |  | ✓ |
| 7 | `video-template-frame-light-leak-cinema` | 20 | 753,615 |  |  |  | ✓ |
| 8 | `tts-prompter` | 5 | 577,204 | ✓ | ✓ |  |  |
| 9 | `manus-api` | 85 | 547,651 |  |  |  |  |
| 10 | `video-to-subtitle-summary` | 22 | 534,025 | ✓ |  |  | ✓ |
| 11 | `financial-analysis` | 8 | 501,595 | ✓ | ✓ |  |  |
| 12 | `database-lookup` | 83 | 406,610 |  | ✓ |  |  |
| 13 | `clipify` | 10 | 309,497 | ✓ |  | ✓ | ✓ |
| 14 | `markdown-mermaid-writing` | 38 | 294,708 |  | ✓ | ✓ |  |
| 15 | `beautiful-article` | 58 | 276,743 | ✓ | ✓ | ✓ |  |
| 16 | `web-design-engineer` | 39 | 235,579 |  | ✓ |  |  |
| 17 | `game-asset-catalog` | 6 | 229,071 | ✓ | ✓ |  |  |
| 18 | `market-research-reports` | 26 | 193,286 | ✓ | ✓ | ✓ |  |
| 19 | `sn-da-excel-workflow` | 45 | 187,291 |  |  |  |  |
| 20 | `video-generation` | 20 | 184,285 |  | ✓ |  |  |
| 21 | `mongodb-search-and-ai` | 8 | 165,883 | ✓ | ✓ |  |  |
| 22 | `pricing-strategy` | 3 | 161,666 |  | ✓ |  |  |
| 23 | `office-documents` | 7 | 160,558 |  | ✓ |  |  |
| 24 | `legacy-circuit-mockups` | 21 | 149,149 |  | ✓ |  |  |
| 25 | `excalidraw-diagram-generator` | 16 | 144,659 | ✓ | ✓ |  |  |
| 26 | `youtube-clipper` | 24 | 138,826 | ✓ | ✓ |  |  |
| 27 | `research-writing-skill` | 21 | 125,040 |  | ✓ |  |  |
| 28 | `ml-pipeline` | 6 | 123,629 |  | ✓ |  |  |
| 29 | `mongodb-schema-design` | 21 | 121,162 |  | ✓ |  |  |
| 30 | `internet-skill-finder` | 3 | 120,370 | ✓ | ✓ |  |  |
| 31 | `markdown-to-html` | 16 | 115,700 |  | ✓ |  |  |
| 32 | `typst-pdf-maker` | 13 | 111,008 | ✓ | ✓ | ✓ |  |
| 33 | `n8n-node-configuration` | 6 | 110,368 |  |  |  |  |
| 34 | `n8n-mcp-tools-expert` | 6 | 110,056 |  |  |  |  |
| 35 | `prompt-engineer` | 7 | 109,215 |  | ✓ |  |  |
| 36 | `triggers` | 3 | 107,548 |  | ✓ |  |  |
| 37 | `trip` | 6 | 103,548 |  | ✓ |  |  |
| 38 | `n8n-workflow-patterns` | 7 | 103,023 |  |  |  |  |
| 39 | `matplotlib` | 7 | 101,505 | ✓ | ✓ |  |  |
| 40 | `seaborn` | 8 | 94,076 |  | ✓ |  |  |
| 41 | `n8n-validation-expert` | 5 | 93,382 |  |  |  |  |
| 42 | `marp-slide` | 23 | 87,972 |  | ✓ | ✓ |  |
| 43 | `slides` | 4 | 87,099 |  |  |  |  |
| 44 | `react-email` | 7 | 86,976 |  | ✓ |  |  |
| 45 | `motion-graphics` | 12 | 86,107 |  |  |  |  |
| 46 | `torch-geometric` | 8 | 85,806 |  | ✓ |  |  |
| 47 | `mermaid-diagrams` | 9 | 85,640 |  | ✓ |  |  |
| 48 | `networkx` | 7 | 84,237 |  | ✓ |  |  |
| 49 | `sales-enablement` | 8 | 79,934 |  | ✓ |  |  |
| 50 | `writing-prds` | 3 | 73,626 |  | ✓ |  |  |
| 51 | `content-gap-analysis` | 10 | 70,856 | ✓ |  |  |  |
| 52 | `usfiscaldata` | 9 | 70,007 |  | ✓ |  |  |
| 53 | `copywriting` | 5 | 69,322 |  | ✓ |  |  |
| 54 | `brand-docx` | 11 | 67,807 | ✓ |  |  |  |
| 55 | `skill-creator` | 8 | 67,175 | ✓ | ✓ |  |  |
| 56 | `revops` | 7 | 66,604 |  | ✓ |  |  |
| 57 | `stripe-best-practices` | 7 | 66,058 |  | ✓ |  |  |
| 58 | `imagegen` | 5 | 65,219 |  | ✓ |  |  |
| 59 | `favicon-gen` | 9 | 64,367 |  | ✓ | ✓ |  |
| 60 | `api-designer` | 6 | 61,073 |  | ✓ |  |  |
| 61 | `crafting-effective-readmes` | 14 | 60,214 |  | ✓ |  |  |
| 62 | `seo-audit` | 4 | 58,740 | ✓ |  |  |  |
| 63 | `seo-competitor-analysis` | 5 | 58,619 | ✓ | ✓ |  |  |
| 64 | `public-speaking` | 3 | 57,482 |  | ✓ |  |  |
| 65 | `statistical-power` | 6 | 54,821 | ✓ | ✓ |  |  |
| 66 | `selenium-skill` | 12 | 54,738 | ✓ |  |  |  |
| 67 | `vaex` | 8 | 52,425 |  | ✓ |  |  |
| 68 | `penpot-uiux-design` | 5 | 50,615 |  | ✓ |  |  |
| 69 | `copy-editing` | 5 | 47,763 |  | ✓ |  |  |
| 70 | `builtin-llm-models` | 5 | 47,351 | ✓ |  |  |  |
| 71 | `professional-communication` | 6 | 46,380 |  | ✓ |  |  |
| 72 | `youtube-video-research` | 5 | 43,710 |  | ✓ |  |  |
| 73 | `obs-playbooks` | 10 | 42,854 |  | ✓ |  |  |
| 74 | `gemini-api` | 11 | 41,319 |  | ✓ |  |  |
| 75 | `stitch-extract-design-md` | 7 | 40,614 |  | ✓ |  |  |
| 76 | `power-bi-playbooks` | 11 | 39,940 | ✓ | ✓ |  |  |
| 77 | `word-playbooks` | 9 | 39,604 |  | ✓ |  |  |
| 78 | `huggingface-gradio` | 2 | 39,222 |  |  |  |  |
| 79 | `blog-write` | 3 | 38,875 |  | ✓ |  |  |
| 80 | `journal-adapt` | 6 | 38,677 |  |  |  |  |
| 81 | `cold-email` | 7 | 38,262 |  | ✓ |  |  |
| 82 | `manus-config` | 2 | 38,112 |  |  |  | ✓ |
| 83 | `webdev-worklocally` | 1 | 37,419 |  |  |  |  |
| 84 | `obsidian-canvas-creator` | 5 | 36,356 |  | ✓ | ✓ |  |
| 85 | `logic-pro-playbooks` | 8 | 35,943 | ✓ | ✓ |  |  |
| 86 | `sn-da-non-spreadsheet-analysis` | 4 | 35,675 |  |  |  |  |
| 87 | `powerpoint-playbooks` | 9 | 35,184 |  | ✓ |  |  |
| 88 | `album-art-director` | 4 | 35,129 |  |  |  |  |
| 89 | `workflow` | 1 | 34,916 |  |  |  |  |
| 90 | `illustrator-playbooks` | 8 | 34,640 | ✓ | ✓ |  |  |
| 91 | `applying-brand-guidelines` | 4 | 34,285 |  |  |  |  |
| 92 | `marketing-ideas` | 4 | 33,815 |  | ✓ |  |  |
| 93 | `workers-best-practices` | 5 | 33,530 |  | ✓ |  |  |
| 94 | `telegram-playbooks` | 9 | 32,837 |  | ✓ |  |  |
| 95 | `seo-content-audit` | 4 | 31,520 |  | ✓ |  |  |
| 96 | `whatsapp-playbooks` | 7 | 31,472 |  | ✓ |  |  |
| 97 | `market-sizing-analysis` | 4 | 31,426 |  | ✓ |  |  |
| 98 | `persistent-computing` | 5 | 31,134 |  | ✓ |  |  |
| 99 | `lightroom-playbooks` | 10 | 30,776 |  | ✓ |  |  |
| 100 | `photoshop-playbooks` | 7 | 30,620 |  | ✓ |  |  |
| 101 | `data-backup-restoration` | 3 | 30,292 |  | ✓ |  |  |
| 102 | `careful` | 4 | 30,181 |  |  |  |  |
| 103 | `playground` | 7 | 30,087 |  |  |  |  |
| 104 | `programmatic-seo` | 4 | 29,826 |  | ✓ |  |  |
| 105 | `accessibility` | 3 | 29,473 |  | ✓ |  |  |
| 106 | `data-context-extractor` | 6 | 29,112 | ✓ | ✓ |  |  |
| 107 | `systematic-debugging` | 6 | 29,057 |  |  |  |  |
| 108 | `discord-playbooks` | 8 | 28,967 |  | ✓ |  |  |
| 109 | `cut-the-curve` | 2 | 28,929 |  |  |  |  |
| 110 | `clickhouse-architecture-advisor` | 15 | 28,715 |  |  |  |  |
| 111 | `blog-translate` | 3 | 28,330 |  | ✓ |  |  |
| 112 | `emil-design-eng` | 1 | 27,509 |  |  |  |  |
| 113 | `website-traffic-checker` | 3 | 27,118 |  | ✓ |  |  |
| 114 | `hackernews-frontpage` | 5 | 26,967 |  |  |  |  |
| 115 | `remotion` | 3 | 26,925 |  |  |  |  |
| 116 | `read-special-images` | 4 | 26,813 | ✓ |  |  |  |
| 117 | `cowork-plugin-customizer` | 5 | 26,812 |  | ✓ |  |  |
| 118 | `build-dashboard` | 1 | 26,042 |  |  |  |  |
| 119 | `system-settings-playbooks` | 8 | 25,608 |  | ✓ |  |  |
| 120 | `premiere-playbooks` | 7 | 24,742 |  | ✓ |  |  |
| 121 | `performance` | 3 | 24,317 |  | ✓ |  |  |
| 122 | `blog-rewrite` | 1 | 24,214 |  |  |  |  |
| 123 | `supabase` | 4 | 24,146 |  | ✓ | ✓ |  |
| 124 | `web-design-reviewer` | 3 | 24,083 |  | ✓ |  |  |
| 125 | `capcut-playbooks` | 7 | 24,077 |  | ✓ |  |  |
| 126 | `tailwind-design-system` | 3 | 24,059 |  | ✓ |  |  |
| 127 | `content-experimentation-best-practices` | 5 | 23,973 |  | ✓ |  |  |
| 128 | `excel-generator` | 1 | 23,847 |  |  |  |  |
| 129 | `nothing-design` | 4 | 23,454 |  | ✓ |  |  |
| 130 | `hyperframes-keyframes` | 3 | 23,175 |  | ✓ |  |  |
| 131 | `final-cut-pro-playbooks` | 7 | 23,142 | ✓ | ✓ |  |  |
| 132 | `keyword-research` | 3 | 22,826 | ✓ | ✓ |  |  |
| 133 | `muapi-social-media-video` | 2 | 22,790 | ✓ |  |  |  |
| 134 | `puppeteer-skill` | 4 | 22,697 |  |  |  |  |
| 135 | `backlink-analysis` | 2 | 21,671 |  | ✓ |  |  |
| 136 | `gsap-plugins` | 1 | 21,579 |  |  |  |  |
| 137 | `audacity-playbooks` | 9 | 20,597 | ✓ | ✓ |  |  |
| 138 | `kpi-dashboard-design` | 2 | 20,498 |  | ✓ |  |  |
| 139 | `iflytek-text-proofread` | 4 | 20,481 | ✓ |  |  |  |
| 140 | `meta-ads-analyzer` | 11 | 20,421 |  | ✓ |  | ✓ |
| 141 | `color-palette` | 2 | 20,205 |  |  | ✓ |  |
| 142 | `seo-aeo-best-practices` | 5 | 19,659 |  | ✓ |  |  |
| 143 | `langchain-architecture` | 2 | 19,126 |  | ✓ |  |  |
| 144 | `mermaid-visualizer` | 2 | 18,956 |  | ✓ |  |  |
| 145 | `risk-metrics-calculation` | 2 | 18,932 |  | ✓ |  |  |
| 146 | `google-cloud-waf-security` | 2 | 18,864 |  | ✓ |  |  |
| 147 | `stock-analysis` | 2 | 18,576 |  | ✓ |  |  |
| 148 | `comparison-article-writer` | 2 | 18,546 |  | ✓ |  |  |
| 149 | `review-animations` | 2 | 18,495 |  |  |  |  |
| 150 | `excalidraw-diagram` | 2 | 18,398 |  | ✓ |  |  |
| 151 | `excalidraw` | 2 | 18,397 |  |  |  |  |
| 152 | `gsap-scrolltrigger` | 1 | 18,390 |  |  |  |  |
| 153 | `hybrid-search-implementation` | 2 | 18,194 |  | ✓ |  |  |
| 154 | `similarity-search-patterns` | 2 | 18,185 |  | ✓ |  |  |
| 155 | `test-driven-development` | 2 | 17,846 |  |  |  |  |
| 156 | `tailscale-network` | 3 | 17,799 |  | ✓ |  |  |
| 157 | `automation-and-scheduling` | 2 | 16,906 |  | ✓ |  |  |
| 158 | `meme-generator` | 2 | 16,859 | ✓ |  |  |  |
| 159 | `after-effects-playbooks` | 7 | 16,727 |  | ✓ |  |  |
| 160 | `stop-slop` | 7 | 16,344 |  | ✓ |  |  |
| 161 | `lesson-learned` | 4 | 16,207 |  | ✓ |  |  |
| 162 | `workflow-composer` | 1 | 16,186 |  |  |  |  |
| 163 | `claude-md-improver` | 4 | 15,573 |  | ✓ |  |  |
| 164 | `vector-index-tuning` | 2 | 15,486 |  | ✓ |  |  |
| 165 | `validate-data` | 1 | 14,956 |  |  |  |  |
| 166 | `gsap-core` | 1 | 14,792 |  |  |  |  |
| 167 | `payment` | 5 | 14,500 |  | ✓ |  |  |
| 168 | `git-workflow-and-versioning` | 1 | 14,403 |  |  |  |  |
| 169 | `no-ai-slop` | 3 | 14,302 |  |  |  |  |
| 170 | `json-canvas` | 2 | 14,100 |  | ✓ |  |  |
| 171 | `observability-and-instrumentation` | 1 | 13,948 |  |  |  |  |
| 172 | `acestep` | 1 | 13,804 |  |  |  |  |
| 173 | `youtube-transcript` | 1 | 13,729 |  |  |  |  |
| 174 | `manus-tasks` | 1 | 13,178 |  |  |  |  |
| 175 | `spec-driven-development` | 1 | 13,099 |  |  |  |  |
| 176 | `spark-optimization` | 2 | 13,004 |  | ✓ |  |  |
| 177 | `sql-optimization-patterns` | 2 | 12,911 |  | ✓ |  |  |
| 178 | `content-modeling-best-practices` | 5 | 12,779 |  | ✓ |  |  |
| 179 | `google-cloud-waf-cost-optimization` | 2 | 12,717 |  | ✓ |  |  |
| 180 | `legal-risk-assessment` | 1 | 12,581 |  |  |  |  |
| 181 | `data-api` | 4 | 12,157 | ✓ |  |  |  |
| 182 | `gsap-utils` | 1 | 12,093 |  |  |  |  |
| 183 | `music-prompter` | 1 | 11,894 |  |  |  |  |
| 184 | `prompt-translator` | 1 | 11,786 |  |  |  |  |
| 185 | `appinsights-instrumentation` | 8 | 11,755 | ✓ | ✓ |  |  |
| 186 | `ci-cd-and-automation` | 1 | 11,512 |  |  |  |  |
| 187 | `draft-outreach` | 1 | 11,491 |  |  |  |  |
| 188 | `web-perf` | 2 | 11,227 |  | ✓ |  |  |
| 189 | `call-prep` | 1 | 11,197 |  |  |  |  |
| 190 | `sql-queries` | 1 | 11,168 |  |  |  |  |
| 191 | `muapi-youtube-shorts` | 2 | 11,106 | ✓ |  |  |  |
| 192 | `data-visualization` | 1 | 11,093 |  |  |  |  |
| 193 | `debugging-and-error-recovery` | 1 | 10,893 |  |  |  |  |
| 194 | `similarweb-analytics` | 2 | 10,823 |  |  |  | ✓ |
| 195 | `writing-plans` | 1 | 10,335 |  |  |  |  |
| 196 | `close-management` | 1 | 10,318 |  |  |  |  |
| 197 | `customer-research` | 1 | 10,272 |  |  |  |  |
| 198 | `diagnosing-bugs` | 3 | 10,083 | ✓ |  |  |  |
| 199 | `grammar-check` | 1 | 9,673 |  |  |  |  |
| 200 | `reddit-opportunity-research` | 2 | 9,598 |  |  |  |  |
| 201 | `account-research` | 1 | 9,587 |  |  |  |  |
| 202 | `google-cloud-waf-performance-optimization` | 2 | 9,490 |  | ✓ |  |  |
| 203 | `team-composition-analysis` | 2 | 9,396 |  | ✓ |  |  |
| 204 | `meeting-briefing` | 1 | 8,990 |  |  |  |  |
| 205 | `muapi-storyboard-to-cooking-video` | 1 | 8,842 |  |  |  |  |
| 206 | `obsidian-markdown` | 4 | 8,615 |  | ✓ |  |  |
| 207 | `knowledge-synthesis` | 1 | 8,566 |  |  |  |  |
| 208 | `kling-prompter` | 1 | 8,557 |  |  |  |  |
| 209 | `slo-implementation` | 2 | 8,541 |  | ✓ |  |  |
| 210 | `deep-research` | 1 | 8,416 |  |  |  |  |
| 211 | `muapi-ai-fight-scene` | 1 | 8,325 |  |  |  |  |
| 212 | `muapi-award-ceremony-video` | 1 | 8,269 |  |  |  |  |
| 213 | `reconciliation` | 1 | 8,182 |  |  |  |  |
| 214 | `make-repo-contribution` | 3 | 8,097 |  |  | ✓ |  |
| 215 | `grafana-dashboards` | 1 | 7,986 |  |  |  |  |
| 216 | `journal-entry-prep` | 1 | 7,881 |  |  |  |  |
| 217 | `model-selector` | 1 | 7,815 |  |  |  |  |
| 218 | `create-prd` | 1 | 7,301 |  |  |  |  |
| 219 | `gws-best-practices` | 1 | 7,245 |  |  |  |  |
| 220 | `search-strategy` | 1 | 7,238 |  |  |  |  |
| 221 | `webdev-seo` | 1 | 7,122 |  |  |  |  |
| 222 | `image-manipulation-image-magick` | 1 | 7,009 |  |  |  |  |
| 223 | `muapi-cinema-director` | 2 | 6,915 | ✓ |  |  |  |
| 224 | `muapi-ugc-video-factory` | 1 | 6,721 |  |  |  |  |
| 225 | `oversized-cursor` | 1 | 6,625 |  |  |  |  |
| 226 | `canva-mcp` | 1 | 6,270 |  |  |  |  |
| 227 | `commercial-agreement-tabular-review` | 2 | 6,211 |  |  |  |  |
| 228 | `seedance-storyboard` | 1 | 6,207 |  |  |  |  |
| 229 | `seedance-recipes` | 1 | 6,170 |  |  |  |  |
| 230 | `plantuml-ascii` | 1 | 6,096 |  |  |  |  |
| 231 | `dispatching-parallel-agents` | 1 | 6,078 |  |  |  |  |
| 232 | `agentic-eval` | 1 | 5,940 |  |  |  |  |
| 233 | `captions-overlay` | 1 | 5,801 |  |  |  |  |
| 234 | `business-model` | 1 | 5,784 |  |  |  |  |
| 235 | `seedance-prompter` | 1 | 5,725 |  |  |  |  |
| 236 | `git-commit` | 1 | 5,581 |  |  |  |  |
| 237 | `github-integration` | 2 | 5,228 |  | ✓ |  |  |
| 238 | `muapi-ui-design` | 2 | 5,220 | ✓ |  |  |  |
| 239 | `google-workspace-integration` | 2 | 5,163 |  | ✓ |  |  |
| 240 | `muapi-freeze-effect-video` | 1 | 5,051 |  |  |  |  |
| 241 | `chart-visualization` | 1 | 4,972 |  |  |  |  |
| 242 | `seam-craft` | 1 | 4,865 |  |  |  |  |
| 243 | `muapi-cartoon-dance-animation` | 1 | 4,710 |  |  |  |  |
| 244 | `huggingface-datasets` | 1 | 4,671 |  |  |  |  |
| 245 | `muapi-product-campaign` | 1 | 4,603 |  |  |  |  |
| 246 | `muapi-character-story-video` | 1 | 4,567 |  |  |  |  |
| 247 | `accessibility-review` | 1 | 4,318 |  |  |  |  |
| 248 | `prd` | 1 | 4,307 |  |  |  |  |
| 249 | `image-processing` | 1 | 4,292 |  |  |  |  |
| 250 | `github-gem-seeker` | 1 | 4,160 |  |  |  |  |
| 251 | `chrome-devtools` | 1 | 4,145 |  |  |  |  |
| 252 | `memory-recall` | 1 | 3,940 |  |  |  |  |
| 253 | `muapi-ugc-ads-workflow` | 1 | 3,864 |  |  |  |  |
| 254 | `verification-before-completion` | 1 | 3,646 |  |  |  |  |
| 255 | `session-self-config` | 2 | 3,585 |  | ✓ |  |  |
| 256 | `touchpoint-contacts` | 2 | 3,541 |  | ✓ |  |  |
| 257 | `muapi-animal-video-generator` | 1 | 3,462 |  |  |  |  |
| 258 | `muapi-drone-style-video` | 1 | 3,378 |  |  |  |  |
| 259 | `muapi-product-ad-cinematic` | 1 | 3,314 |  |  |  |  |
| 260 | `muapi-jewelry-product-video` | 1 | 3,232 |  |  |  |  |
| 261 | `muapi-giant-product-showcase` | 1 | 3,115 |  |  |  |  |
| 262 | `muapi-product-showcase-video` | 1 | 3,048 |  |  |  |  |
| 263 | `muapi-product-video-ad-maker` | 1 | 2,842 |  |  |  |  |
| 264 | `example-skill` | 1 | 2,765 |  |  |  |  |
| 265 | `muapi-3d-logo-animation` | 1 | 2,724 |  |  |  |  |
| 266 | `muapi-one-shot-video` | 1 | 2,702 |  |  |  |  |
| 267 | `muapi-music-video` | 1 | 2,652 |  |  |  |  |
| 268 | `muapi-talking-baby-video` | 1 | 2,624 |  |  |  |  |
| 269 | `mcp-cli` | 1 | 2,539 |  |  |  |  |
| 270 | `data-analysis` | 1 | 2,367 |  |  |  |  |
| 271 | `photo-restoration` | 1 | 1,998 |  |  |  |  |
| 272 | `push-to-github` | 2 | 1,882 | ✓ |  |  |  |
| 273 | `office` | 1 | 1,772 |  |  |  |  |
| 274 | `support-policy` | 2 | 1,569 |  | ✓ |  |  |
| 275 | `handoff` | 1 | 1,546 |  |  |  |  |
| 276 | `git-attribution` | 2 | 1,350 |  | ✓ |  |  |
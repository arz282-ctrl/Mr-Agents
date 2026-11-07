---
name: mr-agents
description: "Rareware Studio master skills collection and orchestration router for Manus. Provides access to 276 specialized agents and workflows across web development, deep research, SEO, AI video/media production, data analysis, copywriting, devops, and business automation."
---

# Mr-Agents: Master Skills Hub for Manus

This repository serves as the master skill catalog and execution hub for Rareware Studio's collection of 276 specialized Manus agent skills.

## Overview

When imported directly into Manus via GitHub (`https://github.com/arz282-ctrl/Mr-Agents`), this skill acts as a universal router, directing your Manus agent to the appropriate specialized playbooks, tools, and execution strategies bundled in the `skills/` directory.

## Skill Categories & Available Capabilities

### 🌐 Web Development & Design
- `skills/webdev/` — Full-stack web, mobile, and game development (planning, UI, preview, publishing).
- `skills/web-design-engineer/` — Production-grade design engineering, component patterns, and UI audits.
- `skills/web-perf/` — Core Web Vitals, performance profiling, and bundle optimization.
- `skills/tailwind-design-system/` — Tailwind CSS token design and architecture.
- `skills/gsap-core/`, `gsap-scrolltrigger/`, `gsap-plugins/` — High-performance web animations.

### 🔍 Deep Research & Strategy
- `skills/deep-research/` — In-depth multi-source web and document investigation.
- `skills/knowledge-synthesis/` — Multi-domain knowledge aggregation and report synthesis.
- `skills/search-strategy/` — Precision query crafting and source verification.
- `skills/market-research-reports/` — Industry landscape and competitor reporting.
- `skills/customer-research/` — User persona and sentiment extraction.

### 📝 Content Creation & Copywriting
- `skills/copywriting/` — Conversion-focused ad, email, and landing page copy.
- `skills/blog-write/` & `blog-rewrite/` — Long-form publication writing and stylistic enhancement.
- `skills/no-ai-slop/` & `stop-slop/` — Enforces authentic, human, non-generic writing patterns.
- `skills/research-writing-skill/` — Structured technical and scholarly reports.
- `skills/crafting-effective-readmes/` — Professional GitHub repository documentation.

### 🎬 AI Media & Video Production
- `skills/video-generation/` — End-to-end AI video pipelines.
- `skills/captions-overlay/` — Subtitle and typography overlay styling.
- `skills/tts-prompter/` & `music-prompter/` — Speech synthesis and audio generation prompting.
- `skills/kling-prompter/` & `seedance-prompter/` — Advanced AI video motion directing.
- `skills/muapi-*/` (18 workflows) — Specialized short-form, product, and social video playbooks.

### 📊 Data Analysis & Visualization
- `skills/data-analysis/` — Exploratory data analysis, statistics, and business intelligence.
- `skills/excel-generator/` — Automated multi-sheet formatted workbook creation.
- `skills/chart-visualization/`, `matplotlib/`, `seaborn/` — Statistical plots and publications.
- `skills/build-dashboard/` & `kpi-dashboard-design/` — Executive metric dashboards.
- `skills/mermaid-diagrams/` & `excalidraw/` — Architectural and system flowcharts.

### 🛠️ DevOps, Code Quality & QA
- `skills/git-workflow-and-versioning/` — Standardized branching, release, and PR workflows.
- `skills/test-driven-development/` & `spec-driven-development/` — Test and specification rigor.
- `skills/debugging-and-error-recovery/` & `systematic-debugging/` — Root-cause bug resolution.
- `skills/verification-before-completion/` — Mandatory pre-delivery QA checklists.

### 🔧 Cloud, Databases & Integrations
- `skills/supabase/`, `mongodb-schema-design/`, `clickhouse-architecture-advisor/`
- `skills/shopify-mcp/`, `stripe-best-practices/`, `tailscale-network/`
- `skills/google-workspace-integration/`, `google-cloud-waf-*/`

---

## How to Use These Skills in Manus

### Method 1: Master Repo Import (GitHub)
Import the entire repository directly in Manus (**Skills → Import → GitHub**):
`https://github.com/arz282-ctrl/Mr-Agents`
Manus will identify this `SKILL.md` file at the root, making all sub-skills accessible to your agent.

### Method 2: Modular Single-Skill Upload (Recommended for focused agents)
To import individual skills without context bloat:
1. Navigate to the `manus-ready/zips/` folder.
2. Select any individual `.zip` file (e.g. `deep-research.zip`, `webdev.zip`).
3. Upload directly via Manus (**Skills → Import → Upload** tab).
Each ZIP contains its own `SKILL.md` at the root for instant recognition.

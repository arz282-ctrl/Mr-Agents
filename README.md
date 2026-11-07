# 🤖 Mr-Agents: 276 Production Manus AI Skills

> **Rareware Studio Agent Library** — Battle-tested skills for **Manus AI**, normalized and optimized for 1-click import.

[![Manus Compatible](https://img.shields.io/badge/Manus-100%25%20Compatible-blue.svg)](https://manus.im)
[![Skills Count](https://img.shields.io/badge/Portable%20Skills-276-green.svg)](skills-manifest.json)
[![Verified Status](https://img.shields.io/badge/Verification-0%20Failures-brightgreen.svg)](docs/COMPATIBILITY_AUDIT.md)

---

## ⚡ Quick 1-Click Import (Choose Your Skill)

Manus limits each imported skill to **100 files max**. To make importing effortless without triggering limits, the top skills have **dedicated single-skill branches** right here in this repository:

| Capability | Skill | Direct Manus GitHub Import URL | Files |
|---|---|---|:---:|
| 🌐 **Full-Stack WebDev** | `webdev` | `https://github.com/arz282-ctrl/Mr-Agents/tree/skill-webdev` | 71 |
| ✍️ **Conversion Copywriting** | `copywriting` | `https://github.com/arz282-ctrl/Mr-Agents/tree/skill-copywriting` | 5 |
| 🎬 **AI Video Production** | `video-generation` | `https://github.com/arz282-ctrl/Mr-Agents/tree/skill-video-generation` | 20 |
| 🖼️ **AI Image Generation** | `imagegen` | `https://github.com/arz282-ctrl/Mr-Agents/tree/skill-imagegen` | 5 |
| 📈 **SEO & AEO Audit** | `seo-audit` | `https://github.com/arz282-ctrl/Mr-Agents/tree/skill-seo-audit` | 4 |
| 🔍 **Deep Research & Synthesis** | `deep-research` | `https://github.com/arz282-ctrl/Mr-Agents/tree/skill-deep-research` | 1 |

### 🛠️ How to Import into Manus in 10 Seconds:
1. Open your Manus workspace: **[manus.im](https://manus.im)**
2. Go to **Settings** ➔ **Skills** ➔ click **Import**.
3. Select the **GitHub** tab.
4. Copy & paste any branch URL from the table above (e.g. `https://github.com/arz282-ctrl/Mr-Agents/tree/skill-webdev`).
5. Click **Import** — your agent now has that skill active!

---

## 📦 Method 2: Offline / Drag-and-Drop ZIP Upload

If you prefer uploading files without connecting GitHub:

1. Look in the [`manus-ready/zips/`](manus-ready/zips/) folder in this repo.
2. Every one of the **276 skills** has its own `.zip` file with `SKILL.md` directly at the root.
3. In Manus, go to **Skills ➔ Import ➔ Upload tab**.
4. Drag and drop any individual ZIP file (e.g. `deep-research.zip`, `copywriting.zip`).

---

## 🎯 Recommended Skill Bundles by Role

Give your Manus agents targeted superpowers without context bloat:

### 🚀 1. The Full-Stack Engineer Agent
* **`skill-webdev`** — Planning, architecture, components, interactive preview, and production deployment.
* **`web-design-engineer.zip`** — Modern UI/UX patterns (Bento grids, typography, animations, dark mode).
* **`git-workflow-and-versioning.zip`** — Branching strategies, atomic commits, PR templates.
* **`debugging-and-error-recovery.zip`** — Root-cause bug tracing and automated verification.
* **`tailwind-design-system.zip`** — Scalable Tailwind tokens, palettes, and components.

### ✍️ 2. The Content & Copywriting Agent
* **`skill-copywriting`** — High-converting landing page copy, sales frameworks, and CTA optimization.
* **`blog-write.zip`** & **`blog-rewrite.zip`** — Comprehensive articles with citations and narrative flow.
* **`no-ai-slop.zip`** & **`stop-slop.zip`** — Strips out repetitive AI clichés, buzzwords, and fluff.
* **`cold-email.zip`** — High-response B2B outreach sequences and subject lines.
* **`copy-editing.zip`** — Grammar, tone-matching, and sentence cadence.

### 📈 3. The SEO & Growth Hacker Agent
* **`skill-seo-audit`** — Technical SEO checklist, schema markup, and crawlability diagnostics.
* **`seo-aeo-best-practices.zip`** — Answer Engine Optimization (optimizing for Perplexity, ChatGPT, and AI Overviews).
* **`keyword-research.zip`** — Search intent clustering, volume estimation, and difficulty scoring.
* **`backlink-analysis.zip`** — Referring domain authority and link gap profiling.
* **`content-gap-analysis.zip`** — Identifies competitor ranking topics your domain is missing.

### 🎬 4. The AI Creative & Media Producer
* **`skill-video-generation`** — Directing AI video tools (Kling, Runway, Luma, Pika).
* **`skill-imagegen`** — Photorealistic and illustrative diffusion prompting.
* **`captions-overlay.zip`** — Viral short-form subtitle styles and kinetic typography.
* **`tts-prompter.zip`** & **`music-prompter.zip`** — Voiceover inflection and soundtrack generation.
* **`youtube-clipper.zip`** — High-engagement viral hooks from long-form video.

### 🔬 5. The Executive Research & Strategy Agent
* **`skill-deep-research`** — Autonomous multi-source web and document investigation.
* **`market-research-reports.zip`** — TAM/SAM/SOM market sizing and competitor matrices.
* **`customer-research.zip`** — Pain point extraction, user sentiment, and persona profiles.
* **`verification-before-completion.zip`** — Cross-verification of facts, units, and sources before delivery.

---

## ❓ Frequently Asked Questions

### Why does importing `https://github.com/arz282-ctrl/Mr-Agents` directly fail?
Manus has a strict **100-file limit** per skill to prevent overloading agent memory. This entire repository is a master monorepo containing **276 skills and over 2,550 files**! When you import the entire repo, Manus sees 2,550 files and rejects it.

**The Solution:** Use the branch URLs in the table above (e.g. `tree/skill-webdev`), which isolate just that skill's 1–25 files.

### How do I turn any of the other 270 skills into a branch?
Run this one-liner locally:
```bash
python3 repackage_for_manus.py
```
This regenerates and verifies all 276 ZIP archives with zero external dependencies.

---

## 📂 Repository Structure

```text
Mr-Agents/
├── SKILL.md                 # Master catalog router for full-repo context
├── README.md                # 1-Click import guide and documentation
├── skills/                  # Raw definitions for all 276 skills
│   ├── webdev/
│   ├── copywriting/
│   ├── deep-research/
│   └── ... (273 more)
├── manus-ready/
│   ├── zips/                # 276 pre-built standalone ZIP packages
│   ├── IMPORT_GUIDE.md      # Detailed category listings and verification
│   └── manifest.json        # Checksum and verification report
├── repackage_for_manus.py   # Packaging automation utility
└── docs/                    # Architecture and validation audits
```

---

## ⚖️ License & Attribution

Curated and normalized for **Rareware Studio** agents. Upstream skill definitions retain their respective licenses and attributions as noted in each individual `SKILL.md`.

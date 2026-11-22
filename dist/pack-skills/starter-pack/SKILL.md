---
name: starter-pack
description: "Mr-Agents Starter Pack (8 specialized skills). Essential multi-agent foundation: full-stack web dev, deep research, conversion copywriting, data analysis, SEO auditing, Git workflow hygiene, blog writing, and AI image generation. Use when bootstrapping a new AI agent workspace or handling core daily tasks across coding, research, writing, data analysis, SEO, Git versioning, and visual asset creation."
---

# Mr-Agents Starter Pack (`starter-pack`)

> **Pack Overview:** Consolidates **8 production-grade skills** from the `Mr-Agents` universal catalog into a single installable pack skill.
> **Focus Area:** Essential multi-agent foundation: full-stack web dev, deep research, conversion copywriting, data analysis, SEO auditing, Git workflow hygiene, blog writing, and AI image generation.

## When to Activate This Pack

Use when bootstrapping a new AI agent workspace or handling core daily tasks across coding, research, writing, data analysis, SEO, Git versioning, and visual asset creation.

## Core Execution Playbook

1. **Clarify & Route**: Identify which of the 8 core domains matches the user's request (Web/App Dev, Deep Research, Copywriting, Blog Writing, Data Analysis, SEO Audit, Git Workflow, or Image Generation).
2. **Progressive Disclosure**: If full individual skills are installed alongside this pack, load `<skill-name>/SKILL.md` for deep domain references; otherwise follow the embedded playbooks below.
3. **Deliverable Standard**: Produce verified, production-ready outputs (runnable code, cited research reports, conversion-focused copy, clean atomic Git commits, or structured data insights).

## Included Skills Routing Matrix (8 Skills)

| Skill ID | When to Use / Trigger Description | Capabilities |Full Reference Path |
|---|---|---|---|
| `blog-write` | Write a new blog article from scratch for Google rankings and AI citations, then take it through the delivery gates. Generates the full article with template selection, answer-f... | `browser, filesystem, media, network, python, shell` | `dist/skills/blog-write/SKILL.md` |
| `copywriting` | When the user wants to write, rewrite, or improve marketing copy for any page, including homepage, landing pages, pricing pages, feature pages, about pages, or product pages. Al... | `filesystem, media, network` | `dist/skills/copywriting/SKILL.md` |
| `data-analysis` | Analyze structured data or create visualizations from data. Use when the task requires processing data, performing analysis, or creating insightful visualizations or spreadsheets. | `filesystem, python` | `dist/skills/data-analysis/SKILL.md` |
| `deep-research` | MUST read before the first search/fetch. Research a question across multiple sources and synthesize the findings into a clear, readable answer or report. Use whenever answering ... | `browser, filesystem, network` | `dist/skills/deep-research/SKILL.md` |
| `git-workflow-and-versioning` | Structures git workflow practices. Use when making any code change. Use when committing, branching, resolving conflicts, splitting uncommitted work in a messy working tree into ... | `filesystem, network, node, shell` | `dist/skills/git-workflow-and-versioning/SKILL.md` |
| `imagegen` | Use for visual deliverable routing and image generation/editing tasks, including new images, image edits, image upscaling/restoration/enhancement, UI mockups, diagrams, infograp... | `browser, filesystem, media, network, node, python` | `dist/skills/imagegen/SKILL.md` |
| `seo-audit` | Create plain-language, evidence-led SEO audit reports using the structure developed with the user. Use when asked to create, revise, or standardize an SEO audit report, SEO audi... | `browser, filesystem, python, shell` | `dist/skills/seo-audit/SKILL.md` |
| `webdev` | Build and deliver an initialized Manus website, mobile app or game: planning, design, development, Preview, configuration, checkpoints, publishing and saving/connecting code to ... | `browser, filesystem, media, network, node, python, shell` | `dist/skills/webdev/SKILL.md` |

---

## Detailed Skill Playbooks & Directives

When executing a task matching one of the included skills below, apply its specific workflow:

### `blog-write`
- **Trigger & Scope:** Write a new blog article from scratch for Google rankings and AI citations, then take it through the delivery gates. Generates the full article with template selection, answer-first formatting, Key Takeaways box, sourced statistics, licensed images, built-in SVG charts, optional FAQ and internal linking, in MDX, markdown or HTML. Use when the user asks to write a new blog post or article from a topic or brief ("write a blog post", "draft a new article", "/blog write"). Not for editing an existing post (blog-rewrite), and not for a standalone outline, brief or research request.
- **Key Workflow Sections:** Workflow → Phase 0: Surface Targeting (do this BEFORE research) → Phase 1: Topic Understanding → Phase 1.5: Template Selection → Phase 2: Research → Phase 3: Outline Generation
- **Core Directive:** Bundled paths below use host Markdown substitution of `${CLAUDE_SKILL_DIR}`;
- **Canonical Skill Path:** `dist/skills/blog-write/SKILL.md` (or install individually via `npx --yes github:arz282-ctrl/Mr-Agents install blog-write`)

### `copywriting`
- **Trigger & Scope:** When the user wants to write, rewrite, or improve marketing copy for any page, including homepage, landing pages, pricing pages, feature pages, about pages, or product pages. Also use when the user says "write copy for," "improve this copy," "rewrite this page," "marketing copy," "headline help," "CTA copy," "value proposition," "tagline," "hero section copy," "this copy is weak," "this sounds like AI," "AI slop," "make it sound human," or "help me describe my product." Drafts never use AI tells like "it's not X, it's Y" reveals, "no X, no Y, no Z" lists, or sentences that trail into extra comma clauses. For email copy, see emails. For popup copy, see popups. For editing existing copy, see copy-editing. For the offer underneath the copy (bonuses, guarantees, value framing), see offers. Claims must be supportable, and a declined claim names the evidence that would unlock it. Diagnoses the input first (blank brief, real voice, or point edit) and changes only what it calls for.
- **Key Workflow Sections:** Before Writing → 1. Page Purpose → 2. Audience → 3. Product/Offer → 4. Context → Diagnose the Situation First
- **Core Directive:** You are an expert conversion copywriter. Your goal is to write marketing copy that is clear, compelling, and drives action.
- **Canonical Skill Path:** `dist/skills/copywriting/SKILL.md` (or install individually via `npx --yes github:arz282-ctrl/Mr-Agents install copywriting`)

### `data-analysis`
- **Trigger & Scope:** Analyze structured data or create visualizations from data. Use when the task requires processing data, performing analysis, or creating insightful visualizations or spreadsheets.
- **Key Workflow Sections:** When to Use → Data Analysis Best Practices → Delivering Results
- **Core Directive:** - When the task requires processing data, performing analysis, and creating insightful visualizations or spreadsheets
- **Canonical Skill Path:** `dist/skills/data-analysis/SKILL.md` (or install individually via `npx --yes github:arz282-ctrl/Mr-Agents install data-analysis`)

### `deep-research`
- **Trigger & Scope:** MUST read before the first search/fetch. Research a question across multiple sources and synthesize the findings into a clear, readable answer or report. Use whenever answering requires looking up information, not only when the user explicitly asks for in-depth research. Skip it only when no searching is needed.
- **Key Workflow Sections:** When to Use → Deep Research Best Practices → Parallel Processing Best Practices → Writing the Final Answer → Content and Style → Format and References
- **Core Directive:** - When the user requests in-depth or comprehensive research
- **Canonical Skill Path:** `dist/skills/deep-research/SKILL.md` (or install individually via `npx --yes github:arz282-ctrl/Mr-Agents install deep-research`)

### `git-workflow-and-versioning`
- **Trigger & Scope:** Structures git workflow practices. Use when making any code change. Use when committing, branching, resolving conflicts, splitting uncommitted work in a messy working tree into clean atomic commits, opening or reviewing a pull request (PR), pushing to a remote, or when you need to organize work across multiple parallel streams. Use when cutting a release, choosing a semantic version bump, tagging, or writing a changelog. Use when asked to write a commit message or a changelog entry for a change, or to split a change into commits, even when the diff is pasted inline and the message seems easy to write from it.
- **Key Workflow Sections:** Overview → When to Use → Core Principles → Trunk-Based Development (Recommended) → 1. Commit Early, Commit Often → 2. Atomic Commits
- **Core Directive:** Git is your safety net. Treat commits as save points, branches as sandboxes, and history as documentation. With AI agents generating code at high speed, disciplined version control is the mechanism that keeps changes manageable, reviewable,
- **Canonical Skill Path:** `dist/skills/git-workflow-and-versioning/SKILL.md` (or install individually via `npx --yes github:arz282-ctrl/Mr-Agents install git-workflow-and-versioning`)

### `imagegen`
- **Trigger & Scope:** Use for visual deliverable routing and image generation/editing tasks, including new images, image edits, image upscaling/restoration/enhancement, UI mockups, diagrams, infographics, posters, icons, logos, charts, schedules/itineraries/tables delivered as images, visual assets, and ambiguous visual requests. Helps choose between Mermaid, Python plotting, HTML-rendered static layouts, web/app development, and AI image generation/editing.
- **Key Workflow Sections:** Core Principle → Authoritative Routing → Diagram Boundary → Scenario Classification → Cross-Cutting Policies → UI images
- **Core Directive:** Use this skill to decide the correct production route for visual deliverables. A correct visual is not merely attractive; it must fit the user's intended medium, purpose, constraints, hierarchy, and acceptance criteria.
- **Canonical Skill Path:** `dist/skills/imagegen/SKILL.md` (or install individually via `npx --yes github:arz282-ctrl/Mr-Agents install imagegen`)

### `seo-audit`
- **Trigger & Scope:** Create plain-language, evidence-led SEO audit reports using the structure developed with the user. Use when asked to create, revise, or standardize an SEO audit report, SEO audit mockup, organic search audit, backlink-focused SEO audit, business-style report, or sample-modeled audit where the output must rely strictly on report data, avoid hallucinations, use a 150–200 word one-paragraph executive summary, explain organic traffic and market drivers, exclude standalone Content Quality Audit and On-Page SEO sections by default, end with a concise ordered problem/fix prioritization list instead of a roadmap, and use direct insight-and-action language.
- **Key Workflow Sections:** Purpose → Core workflow → Required report structure → Standard chart-generation workflow → Executive summary rules → Section-specific standards
- **Core Directive:** Use this skill to produce a business-style SEO audit report that explains **what the data shows, why it matters, and what action to take**. The report must read like an insight-led executive/practitioner report, not a generic SEO checklist 
- **Canonical Skill Path:** `dist/skills/seo-audit/SKILL.md` (or install individually via `npx --yes github:arz282-ctrl/Mr-Agents install seo-audit`)

### `webdev`
- **Trigger & Scope:** Build and deliver an initialized Manus website, mobile app or game: planning, design, development, Preview, configuration, checkpoints, publishing and saving/connecting code to GitHub. Use for ANY request to build a game, including simple browser/HTML5/canvas games and quick prototypes, unless the user explicitly asks for a different deliverable such as a single HTML file or a Python script. Not for Unity, Unreal Engine or other native-engine games except Godot. Load optional references only for capabilities or recovery the task actually needs.
- **Key Workflow Sections:** Workflow → 1. Plan → 2. ToDo → 3. Implement → 4. Validate before delivery → Webdev tool parallelism
- **Core Directive:** Local Web/Mobile requests follow Work Locally for rediscovery and managed-versus-plain-local choice before entering this Addon workflow.
- **Canonical Skill Path:** `dist/skills/webdev/SKILL.md` (or install individually via `npx --yes github:arz282-ctrl/Mr-Agents install webdev`)

---

## Upgrading to Individual Expanded Skills

To expand this `starter-pack` into all 8 individual skill folders (including bundled `scripts/`, `references/`, and `assets/`), run:

```bash
npx --yes github:arz282-ctrl/Mr-Agents install --pack starter
```

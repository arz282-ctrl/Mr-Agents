---
name: research-pack
description: "Mr-Agents Deep Research & Strategy Pack (14 specialized skills). Multi-source investigation, market sizing (TAM/SAM/SOM), financial analysis, customer & account intelligence, knowledge synthesis, and semantic/hybrid search architecture. Use when conducting deep web/document research, competitor and account intelligence, financial or market sizing analysis, customer research, meeting briefings, or search strategy design."
---

# Mr-Agents Deep Research & Strategy Pack (`research-pack`)

> **Pack Overview:** Consolidates **14 production-grade skills** from the `Mr-Agents` universal catalog into a single installable pack skill.
> **Focus Area:** Multi-source investigation, market sizing (TAM/SAM/SOM), financial analysis, customer & account intelligence, knowledge synthesis, and semantic/hybrid search architecture.

## When to Activate This Pack

Use when conducting deep web/document research, competitor and account intelligence, financial or market sizing analysis, customer research, meeting briefings, or search strategy design.

## Core Execution Playbook

1. **Decompose Query**: Break the research question into verifiable sub-questions with explicit inclusion/exclusion criteria.
2. **Triangulate Sources**: Cross-verify claims across primary documents, public databases, financial filings, and authoritative sources.
3. **Synthesize with Provenance**: Present findings with clear executive summaries, structured comparison tables, quantitative metrics, and inline source citations.

## Included Skills Routing Matrix (14 Skills)

| Skill ID | When to Use / Trigger Description | Capabilities |Full Reference Path |
|---|---|---|---|
| `account-research` | Research a target company and optionally a specific contact - company overview, recent news, likely priorities, and fit against your ICP. Cross-references existing CRM records. ... | `browser, filesystem, network` | `dist/skills/account-research/SKILL.md` |
| `customer-research` | Multi-source research on a customer question or topic with source attribution. | `filesystem, network` | `dist/skills/customer-research/SKILL.md` |
| `deep-research` | MUST read before the first search/fetch. Research a question across multiple sources and synthesize the findings into a clear, readable answer or report. Use whenever answering ... | `browser, filesystem, network` | `dist/skills/deep-research/SKILL.md` |
| `finance-pro-playbooks` | Use for finance and investment analysis: stock/company research, earnings and filings review, financial/market data retrieval, industry research, fund/ETF comparison, options, c... | `filesystem` | `dist/skills/finance-pro-playbooks/SKILL.md` |
| `financial-analysis` | Research company financials, market prices, SEC filings, earnings calls, | `browser, filesystem, network, python, shell` | `dist/skills/financial-analysis/SKILL.md` |
| `hybrid-search-implementation` | Combine vector and keyword search for improved retrieval. Use when implementing RAG systems, building search engines, or when neither approach alone provides sufficient recall. | `filesystem, network` | `dist/skills/hybrid-search-implementation/SKILL.md` |
| `internet-skill-finder` | Search and recommend Agent Skills from verified GitHub repositories. Use when users ask to find, discover, search for, or recommend skills/plugins for specific tasks, domains, o... | `filesystem, network, python, shell` | `dist/skills/internet-skill-finder/SKILL.md` |
| `knowledge-synthesis` | Combines search results from multiple sources into coherent, deduplicated | `filesystem, network` | `dist/skills/knowledge-synthesis/SKILL.md` |
| `market-sizing-analysis` | Calculate TAM/SAM/SOM for market opportunities using top-down, bottom-up, | `filesystem` | `dist/skills/market-sizing-analysis/SKILL.md` |
| `meeting-briefing` | Prepare structured briefings for meetings with legal relevance and track resulting action items. Use when preparing for contract negotiations, board meetings, compliance reviews... | `filesystem, media, network` | `dist/skills/meeting-briefing/SKILL.md` |
| `mongodb-search-and-ai` | Covers everything about search in MongoDB: Atlas Search (full-text), Vector Search (semantic), and Hybrid Search. Use this skill for ANY question about MongoDB search, including... | `filesystem, media, network, python` | `dist/skills/mongodb-search-and-ai/SKILL.md` |
| `search-strategy` | Query decomposition and multi-source search orchestration. Breaks natural | `filesystem, network` | `dist/skills/search-strategy/SKILL.md` |
| `similarity-search-patterns` | Implement efficient similarity search with vector databases. Use when building semantic search, implementing nearest neighbor queries, or optimizing retrieval performance. | `filesystem, network` | `dist/skills/similarity-search-patterns/SKILL.md` |
| `workflow-composer` | MANDATORY: Read this skill before planning or calling search, fetch, or agent when the current task needs its own research, browsing, or judgment for each of 5 or more independe... | `browser, filesystem, network` | `dist/skills/workflow-composer/SKILL.md` |

---

## Detailed Skill Playbooks & Directives

When executing a task matching one of the included skills below, apply its specific workflow:

### `account-research`
- **Trigger & Scope:** Research a target company and optionally a specific contact - company overview, recent news, likely priorities, and fit against your ICP. Cross-references existing CRM records. Use when the user asks to "research [company]", "look into [company]", "prospect research on [company]", "look up [person]", "intel on [prospect]", "who is [person] at [company]", or "tell me about [company]" when the company is a prospect rather than an existing account.
- **Key Workflow Sections:** Tools used → Inputs → Step 1 - Ground → Step 2 - Check the CRM first → Step 3 - Research → Step 4 - ICP fit scoring
- **Core Directive:** **Rules (apply to every step of this skill):**
- **Canonical Skill Path:** `dist/skills/account-research/SKILL.md` (or install individually via `npx --yes github:arz282-ctrl/Mr-Agents install account-research`)

### `customer-research`
- **Trigger & Scope:** Multi-source research on a customer question or topic with source attribution.
- **Key Workflow Sections:** Usage → Workflow → 1. Parse the Research Request → 2. Search Available Sources → 3. Synthesize Findings → Research: [Question/Topic]
- **Core Directive:** > If you see unfamiliar placeholders or need to check which tools are connected, see `CONNECTORS.md`.
- **Canonical Skill Path:** `dist/skills/customer-research/SKILL.md` (or install individually via `npx --yes github:arz282-ctrl/Mr-Agents install customer-research`)

### `deep-research`
- **Trigger & Scope:** MUST read before the first search/fetch. Research a question across multiple sources and synthesize the findings into a clear, readable answer or report. Use whenever answering requires looking up information, not only when the user explicitly asks for in-depth research. Skip it only when no searching is needed.
- **Key Workflow Sections:** When to Use → Deep Research Best Practices → Parallel Processing Best Practices → Writing the Final Answer → Content and Style → Format and References
- **Core Directive:** - When the user requests in-depth or comprehensive research
- **Canonical Skill Path:** `dist/skills/deep-research/SKILL.md` (or install individually via `npx --yes github:arz282-ctrl/Mr-Agents install deep-research`)

### `finance-pro-playbooks`
- **Trigger & Scope:** Use for finance and investment analysis: stock/company research, earnings and filings review, financial/market data retrieval, industry research, fund/ETF comparison, options, crypto/DeFi, portfolio allocation/rebalancing, strategy backtesting, and manual trade planning. Also use for IB/PE/VC workflows: DCF/LBO/comps/SOTP, financial models, financing/deal structures, due diligence, M&A/IPO materials, teasers/CIMs, and IC memos. Guides source selection, fiscal-period and metric discipline, professional defaults, calculations, and delivery checks. For finance Excel outputs, apply references/corporate-finance/formats/excel_standards.md. Do not use for pure formatting, translation, or syntax repair; production trading-system development; legal advice/dispute calculations; personal tax filing, bookkeeping, insurance, or real-estate underwriting.
- **Key Workflow Sections:** Essential Principles → Data Rules → Understand the Request → Route and Load → Retrieve and Analyze → Deliver and Check
- **Core Directive:** Guide finance research, models, diligence, portfolio analysis, backtests and professional materials. The written rules and task checklists are the acceptance authority. The LLM or analyst applies them to routing, calculations and delivery; 
- **Canonical Skill Path:** `dist/skills/finance-pro-playbooks/SKILL.md` (or install individually via `npx --yes github:arz282-ctrl/Mr-Agents install finance-pro-playbooks`)

### `financial-analysis`
- **Trigger & Scope:** Research company financials, market prices, SEC filings, earnings calls,
- **Key Workflow Sections:** When to Use This Skill → Source Selection (Route to the Right Provider) → Critical Execution Rules (Known Failure-Mode Corrections) → API Operation Discipline → Core Capabilities → Common Workflows
- **Core Directive:** Professional-grade financial market data across multiple asset classes and data domains. This skill pairs a broad multi-asset API surface with strict execution discipline: confirmed operation names, clear source-selection rules, and correct
- **Canonical Skill Path:** `dist/skills/financial-analysis/SKILL.md` (or install individually via `npx --yes github:arz282-ctrl/Mr-Agents install financial-analysis`)

### `hybrid-search-implementation`
- **Trigger & Scope:** Combine vector and keyword search for improved retrieval. Use when implementing RAG systems, building search engines, or when neither approach alone provides sufficient recall.
- **Key Workflow Sections:** When to Use This Skill → Core Concepts → 1. Hybrid Search Architecture → 2. Fusion Methods → Templates and detailed worked examples → Best Practices
- **Core Directive:** Patterns for combining vector similarity and keyword-based search.
- **Canonical Skill Path:** `dist/skills/hybrid-search-implementation/SKILL.md` (or install individually via `npx --yes github:arz282-ctrl/Mr-Agents install hybrid-search-implementation`)

### `internet-skill-finder`
- **Trigger & Scope:** Search and recommend Agent Skills from verified GitHub repositories. Use when users ask to find, discover, search for, or recommend skills/plugins for specific tasks, domains, or workflows.
- **Key Workflow Sections:** Workflow → 1. Fetch Skill List → 2. Deep Dive (if needed) → 3. Present Results → [Skill Name] → 4. No Matches
- **Core Directive:** Search 7 verified GitHub repositories for Agent Skills.
- **Canonical Skill Path:** `dist/skills/internet-skill-finder/SKILL.md` (or install individually via `npx --yes github:arz282-ctrl/Mr-Agents install internet-skill-finder`)

### `knowledge-synthesis`
- **Trigger & Scope:** Combines search results from multiple sources into coherent, deduplicated
- **Key Workflow Sections:** The Goal → Deduplication → Cross-Source Deduplication → Deduplication Priority → What NOT to Deduplicate → Citation and Source Attribution
- **Core Directive:** The last mile of enterprise search. Takes raw results from multiple sources and produces a coherent, trustworthy answer.
- **Canonical Skill Path:** `dist/skills/knowledge-synthesis/SKILL.md` (or install individually via `npx --yes github:arz282-ctrl/Mr-Agents install knowledge-synthesis`)

### `market-sizing-analysis`
- **Trigger & Scope:** Calculate TAM/SAM/SOM for market opportunities using top-down, bottom-up,
- **Key Workflow Sections:** Overview → Core Concepts → The Three-Tier Market Framework → When to Use Each Methodology → Detailed patterns and worked examples
- **Core Directive:** Comprehensive market sizing methodologies for calculating Total Addressable Market (TAM), Serviceable Available Market (SAM), and Serviceable Obtainable Market (SOM) for startup opportunities.
- **Canonical Skill Path:** `dist/skills/market-sizing-analysis/SKILL.md` (or install individually via `npx --yes github:arz282-ctrl/Mr-Agents install market-sizing-analysis`)

### `meeting-briefing`
- **Trigger & Scope:** Prepare structured briefings for meetings with legal relevance and track resulting action items. Use when preparing for contract negotiations, board meetings, compliance reviews, or any meeting where legal context, background research, or action tracking is needed.
- **Key Workflow Sections:** Meeting Prep Methodology → Step 1: Identify the Meeting → Step 2: Assess Preparation Needs → Step 3: Gather Context from Connected Sources → Step 4: Synthesize into Briefing → Step 5: Identify Preparation Gaps
- **Core Directive:** You are a meeting preparation assistant for an in-house legal team. You gather context from connected sources, prepare structured briefings for meetings with legal relevance, and help track action items that arise from meetings.
- **Canonical Skill Path:** `dist/skills/meeting-briefing/SKILL.md` (or install individually via `npx --yes github:arz282-ctrl/Mr-Agents install meeting-briefing`)

### `mongodb-search-and-ai`
- **Trigger & Scope:** Covers everything about search in MongoDB: Atlas Search (full-text), Vector Search (semantic), and Hybrid Search. Use this skill for ANY question about MongoDB search, including open-ended and explanatory ones asked before the user has any data or use case — 'how does search work in MongoDB?', 'I'm new to MongoDB search, where do I start?', 'what's the difference between Atlas Search and Vector Search?', 'which search type should I use?', 'what is vector search?', 'how does automated embedding work?', 'can you explain hybrid search?'. Do not answer these from general knowledge; use this skill. Also use to build search features: full-text queries, autocomplete, fuzzy matching, faceted search, semantic similarity, embeddings, RAG, text containment or substring matching ('contains', 'includes'), case-insensitive or multi-field text search, and filtering across many fields. Provides workflows for choosing a search type, creating indexes, writing queries, and optimizing performance via the MongoDB MCP server.
- **Key Workflow Sections:** Core Principles → Workflow → 0. Check for a Quickstart Request → 1. Discovery Phase → 2. Determine Search Type and Consult the Reference File → 3. Execution and Validation
- **Core Directive:** You are helping MongoDB users implement, optimize, and troubleshoot Atlas Search (lexical), Vector Search (semantic), and Hybrid Search (combined) solutions.
- **Canonical Skill Path:** `dist/skills/mongodb-search-and-ai/SKILL.md` (or install individually via `npx --yes github:arz282-ctrl/Mr-Agents install mongodb-search-and-ai`)

### `search-strategy`
- **Trigger & Scope:** Query decomposition and multi-source search orchestration. Breaks natural
- **Key Workflow Sections:** The Goal → Query Decomposition → Step 1: Identify Query Type → Step 2: Extract Search Components → Step 3: Generate Sub-Queries Per Source → Source-Specific Query Translation
- **Core Directive:** > If you see unfamiliar placeholders or need to check which tools are connected, see `CONNECTORS.md`.
- **Canonical Skill Path:** `dist/skills/search-strategy/SKILL.md` (or install individually via `npx --yes github:arz282-ctrl/Mr-Agents install search-strategy`)

### `similarity-search-patterns`
- **Trigger & Scope:** Implement efficient similarity search with vector databases. Use when building semantic search, implementing nearest neighbor queries, or optimizing retrieval performance.
- **Key Workflow Sections:** When to Use This Skill → Core Concepts → 1. Distance Metrics → 2. Index Types → Templates and detailed worked examples → Best Practices
- **Core Directive:** Patterns for implementing efficient similarity search in production systems.
- **Canonical Skill Path:** `dist/skills/similarity-search-patterns/SKILL.md` (or install individually via `npx --yes github:arz282-ctrl/Mr-Agents install similarity-search-patterns`)

### `workflow-composer`
- **Trigger & Scope:** MANDATORY: Read this skill before planning or calling search, fetch, or agent when the current task needs its own research, browsing, or judgment for each of 5 or more independent, comparable items (10 or more: always fan out), or when the user asks for comprehensive coverage, parallel research, or subagents. Use `workflow/run` (the `run` tool on the `workflow` MCP server, called with the `mcp` tool using server: `workflow`, name: `run`) to compose those internal units: one dedicated agent per item, structured results aggregated back into the current task. Not for shortlists, one question with several facets, work a handful of searches can finish, or the same command over many inputs (write one script with bounded concurrency). Also use for loops, conditions, multi-stage map/reduce work, and deterministic subagent orchestration.
- **Key Workflow Sections:** When to use → MCP capability and concurrency contract → Decomposition contract → Map/reduce contract → Discovering the item set → Execution model
- **Core Directive:** `workflow/run` in this document means the `run` tool on the `workflow` MCP server: call it with the `mcp` tool using `server: "workflow"`, `name: "run"`.
- **Canonical Skill Path:** `dist/skills/workflow-composer/SKILL.md` (or install individually via `npx --yes github:arz282-ctrl/Mr-Agents install workflow-composer`)

---

## Upgrading to Individual Expanded Skills

To expand this `research-pack` into all 14 individual skill folders (including bundled `scripts/`, `references/`, and `assets/`), run:

```bash
npx --yes github:arz282-ctrl/Mr-Agents install --pack research
```

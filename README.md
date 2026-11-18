# 🤖 Master Mr. Agents

> **Local Hub-and-Spoke Autonomous Multi-Agent Workspace with "The Eight-Packer" Fleet & Dynamic Skill Registry**

[![Next.js 15](https://img.shields.io/badge/Next.js-15.5-black?style=flat&logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v3.4-blue?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![SQLite](https://img.shields.io/badge/SQLite-Native_Node24-003B57?style=flat&logo=sqlite)](https://nodejs.org/)
[![Status](https://img.shields.io/badge/Architecture-Extensible_Skills-8B5CF6?style=flat)]()

---

## 🌟 Overview

**Master Mr. Agents** is a full-stack, local-first multi-agent AI platform built from scratch. It features:
1. **The Eight-Packer Sidebar**: A sleek, dark-mode sidebar featuring 8 distinct AI personas, each specialized for a distinct software engineering and growth discipline.
2. **Active Persona Workspace**: A main workspace that dynamically updates accent themes, model badges, toolpacks, and quick-prompt suggestions based on the active persona.
3. **Swarm Room (Team Mode)**: An autonomous multi-agent task state machine. When the user submits a "Big Task", **The Orchestrator** evaluates the goal, tags 2–4 relevant personas, and orchestrates an inter-agent conversational debate with tool calls and intermediate JSON handoffs, culminating in a single polished master deliverable.
4. **Plug-and-Play Dynamic Skill Registry**: Zero-restart auto-discovery! Drop any `.json` schema, MCP tool manifest, or executable `.js` file into `/skills`, click "Rescan Registry", and it instantly attaches to personas as a callable tool.
5. **Local Persistent Memory & Queue**: Native SQLite database (`node:sqlite`) logs every conversation, swarm message, and tool execution. Message queue with Redis pub/sub support and local in-memory event bus fallback.

---

---

## ⚡ 1-Prompt Install for Any AI Agent

Paste this into **Claude Code, Codex, Cursor, Windsurf, Gemini CLI, or Manus**:

> Install the Mr-Agents skill catalog from `https://github.com/arz282-ctrl/Mr-Agents` (default branch `feat/add-manus-skills`):
> 1. Inspect the root `SKILL.md` and `skills-manifest.json` to discover all 276 portable skills across the 6 domain packs (`web-ui-design-pack`, `marketing-seo-copy-pack`, `ai-video-media-pack`, `research-data-analytics-pack`, `cloud-devops-integrations-pack`, `qa-git-agent-ops-pack`).
> 2. If your runtime supports local skill folders (`.agents/skills/`, `.claude/skills/`, or `AGENTS.md`), clone the repo and copy or link the `skills/` directory into your active skills path.
> 3. If your platform enforces a per-skill file limit (such as Manus's 100-file cap), import only the specific single-skill branches (`skill-webdev`, `skill-copywriting`, `skill-video-generation`, `skill-imagegen`, `skill-seo-audit`, `skill-deep-research`) or the individual archives under `manus-ready/zips/`.
> 4. Verify the installed `SKILL.md` files are readable and confirm which skills are active.

## 👥 The 8 Personas & Their Skill Packs

| Persona | Baseline Model | Provider | Skill Pack |
| :--- | :--- | :--- | :--- |
| **1. The Orchestrator** | Claude 3.5 Sonnet | Anthropic | `task_delegation`, `json_parsing`, `goal_state_tracking` |
| **2. The UI/UX Architect** | Claude 3.5 Sonnet | Anthropic | `figma_api_read`, `react_tailwind_gen`, `dom_parsing` |
| **3. The Backend Builder** | GPT-4o / GPT-5 | OpenAI / OpenRouter | `db_schema_gen`, `api_route_testing`, `nodejs_execution` |
| **4. The Data Scraper** | Llama-3.3-70b | Groq | `puppeteer_playwright_ctrl`, `html_parsing`, `markdown_conversion` |
| **5. The Multimodal Marketer** | Gemini 1.5 Flash | Google Gemini | `vision_image_analysis`, `seo_keyword_extraction`, `social_platform_formatting` |
| **6. The Sales Closer** | GPT-4o / GPT-5 | OpenAI | `crm_data_reading`, `email_drafting`, `lead_qualification_logic` |
| **7. The DevOps Engineer** | Claude 3.5 Sonnet | Anthropic | `docker_execution`, `log_reading`, `bash_terminal_commands` |
| **8. The QA Tester** | Gemini 1.5 Flash | Google Gemini | `unit_testing`, `error_stack_trace_analysis`, `dependency_checking` |

---

## ⚡ Extensible Dynamic Skill Registry (`/skills`)

New tools can be added at any time without modifying core application code:

### 1. JSON Schema Tool (MCP compatible)
Drop a file into `skills/<category>/<tool_name>.json`:
```json
{
  "name": "notion_workspace_sync",
  "personaId": "orchestrator",
  "category": "External MCP Plugins",
  "description": "Syncs project roadmap and tasks to Notion",
  "parameters": {
    "type": "object",
    "properties": {
      "databaseId": { "type": "string" },
      "pageTitle": { "type": "string" }
    },
    "required": ["databaseId", "pageTitle"]
  }
}
```

### 2. JavaScript Tool
Drop a file into `skills/<category>/<tool_name>.js`:
```js
module.exports = {
  name: "custom_math_tool",
  personaId: "backend",
  description: "Computes formulas",
  parameters: { ... },
  execute: async (args) => {
    return { result: args.x * 2 };
  }
};
```

---

## 🚀 Quickstart

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment (Optional)
```bash
cp .env.example .env.local
```
*(All API keys are optional. If keys are omitted, Master Mr. Agents runs with its high-fidelity domain intelligence engine out-of-the-box!)*

### 3. Run Development Server
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

### 4. Run System Verification Suite
```bash
npx tsx test/verify-system.ts
```

---

## 📁 Repository Structure
```
├── skills/                      # 🔌 Dynamic Skill Registry
│   ├── orchestrator/            # Task delegation & state tracking
│   ├── architect/               # Figma & React component tools
│   ├── backend/                 # Database schema & API testing
│   ├── scraper/                 # Web automation & Markdown tools
│   ├── marketer/                # Vision, SEO & social formats
│   ├── closer/                  # CRM & outreach tools
│   ├── devops/                  # Docker & bash automation
│   ├── qa/                      # Unit testing & verification
│   └── custom-plugins/          # Auto-discovered custom tools
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── chat/route.ts    # Persona chat route
│   │   │   ├── swarm/route.ts   # Swarm orchestration route
│   │   │   └── skills/          # Skills listing, rescan & execution
│   │   ├── globals.css          # Dark obsidian theme styling
│   │   ├── layout.tsx
│   │   └── page.tsx             # Hub-and-Spoke master view
│   ├── components/
│   │   ├── Sidebar.tsx          # "The Eight-Packer"
│   │   ├── ActiveWorkspace.tsx  # Persona workspace & tool cards
│   │   ├── SwarmRoom.tsx        # Multi-agent collaboration view
│   │   ├── SkillsModal.tsx      # Plug-and-Play tool explorer
│   │   └── PersonaIcon.tsx      # Dynamic icons
│   └── lib/
│       ├── personas.ts          # 8 Personas configuration
│       ├── db.ts                # SQLite memory persistence
│       ├── queue.ts             # Redis queue & in-memory event bus
│       ├── skill-registry.ts    # Dynamic skill registry scanner
│       ├── llm-providers.ts     # Multi-model routing engine
│       └── swarm-engine.ts      # Multi-agent state machine
├── data/
│   └── mr_agents.db             # Local SQLite database
└── test/
    └── verify-system.ts         # Automated verification suite
```

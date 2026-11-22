---
name: data-pack
description: "Mr-Agents Data Science, BI Dashboards & Visualization Pack (34 specialized skills). Exploratory data analysis, SQL query optimization, interactive HTML/KPI/Grafana dashboards, Matplotlib/Seaborn/AntV charts, Excel workbook generation, Mermaid/Excalidraw diagrams, and risk metrics. Use when cleaning, querying, validating, analyzing, or visualizing structured datasets, building executive dashboards, writing SQL, generating spreadsheets, or drawing architecture diagrams."
---

# Mr-Agents Data Science, BI Dashboards & Visualization Pack (`data-pack`)

> **Pack Overview:** Consolidates **34 production-grade skills** from the `Mr-Agents` universal catalog into a single installable pack skill.
> **Focus Area:** Exploratory data analysis, SQL query optimization, interactive HTML/KPI/Grafana dashboards, Matplotlib/Seaborn/AntV charts, Excel workbook generation, Mermaid/Excalidraw diagrams, and risk metrics.

## When to Activate This Pack

Use when cleaning, querying, validating, analyzing, or visualizing structured datasets, building executive dashboards, writing SQL, generating spreadsheets, or drawing architecture diagrams.

## Core Execution Playbook

1. **Inspect & Validate Data**: Profile schema, row counts, missing values, outliers, and data types before running aggregations.
2. **Reproducible Computation**: Use deterministic Python (pandas/matplotlib/seaborn) or optimized SQL queries; never fabricate numbers.
3. **Decision-Ready Visuals**: Choose the right chart or diagram type, label axes/units clearly, highlight key takeaways, and validate methodology.

## Included Skills Routing Matrix (34 Skills)

| Skill ID | When to Use / Trigger Description | Capabilities |Full Reference Path |
|---|---|---|---|
| `build-dashboard` | Build an interactive HTML dashboard with charts, filters, and tables. | `browser, filesystem, media, network, node` | `dist/skills/build-dashboard/SKILL.md` |
| `chart-visualization` | 将数据可视化为图表。当用户需要生成柱状图、折线图、饼图、散点图、雷达图、桑基图、思维导图、流程图等图表时调用此技能，通过 curl 工具调用 AntV API 生成图表图片 | `filesystem, network, node, shell` | `dist/skills/chart-visualization/SKILL.md` |
| `commercial-agreement-tabular-review` | Use this workflow to review uploaded documents and extract structured information into the tabular review columns defined in table-columns.yaml. | `filesystem` | `dist/skills/commercial-agreement-tabular-review/SKILL.md` |
| `data-analysis` | Analyze structured data or create visualizations from data. Use when the task requires processing data, performing analysis, or creating insightful visualizations or spreadsheets. | `filesystem, python` | `dist/skills/data-analysis/SKILL.md` |
| `data-api` | Look up external data and generate 3D assets through Manus Data APIs — X/Twitter posts and profiles, LinkedIn people and companies, YouTube videos and captions, TikTok/Instagram... | `filesystem, media, network, node, python, shell` | `dist/skills/data-api/SKILL.md` |
| `data-backup-restoration` | Official guidance for the August 2026 Manus data backup and restoration service change, including websites and mobile apps. Use when users ask whether they are affected, what wi... | `filesystem, network` | `dist/skills/data-backup-restoration/SKILL.md` |
| `data-context-extractor` | Generate or improve a company-specific data analysis skill by extracting tribal knowledge from analysts.  BOOTSTRAP MODE - Triggers: "Create a data context skill", "Set up data ... | `filesystem, python` | `dist/skills/data-context-extractor/SKILL.md` |
| `data-visualization` | Create effective data visualizations with Python (matplotlib, seaborn, | `filesystem, python` | `dist/skills/data-visualization/SKILL.md` |
| `database-lookup` | Queries documented public database APIs with explicit endpoints, filters, pagination, and provenance. Used when a scientific, regulatory, financial, or other database-backed fac... | `browser, filesystem, network, node, python, shell` | `dist/skills/database-lookup/SKILL.md` |
| `excalidraw` | Use when working with *.excalidraw or *.excalidraw.json files, user mentions diagrams/flowcharts, or requests architecture visualization - delegates all Excalidraw operations to... | `filesystem` | `dist/skills/excalidraw/SKILL.md` |
| `excalidraw-diagram` | Generate Excalidraw diagrams from text content. Supports three output modes - Obsidian (.md), Standard (.excalidraw), and Animated (.excalidraw with animation order). Triggers o... | `filesystem, media, network` | `dist/skills/excalidraw-diagram/SKILL.md` |
| `excalidraw-diagram-generator` | Generate Excalidraw diagrams from natural language descriptions. Use when asked to "create a diagram", "make a flowchart", "visualize a process", "draw a system architecture", "... | `filesystem, network, node, python, shell` | `dist/skills/excalidraw-diagram-generator/SKILL.md` |
| `excel-generator` | Professional Excel spreadsheet creation with a focus on aesthetics and data analysis. Use when creating spreadsheets for organizing, analyzing, and presenting structured data in... | `filesystem, network, python` | `dist/skills/excel-generator/SKILL.md` |
| `grafana-dashboards` | Create and manage production Grafana dashboards for real-time visualization of system and application metrics. Use when building monitoring dashboards, visualizing metrics, or c... | `browser, filesystem, network, node` | `dist/skills/grafana-dashboards/SKILL.md` |
| `huggingface-datasets` | Use this skill for Hugging Face Dataset Viewer API workflows that fetch subset/split metadata, paginate rows, search text, apply filters, download parquet URLs, and read size or... | `browser, filesystem, network, node, shell` | `dist/skills/huggingface-datasets/SKILL.md` |
| `kpi-dashboard-design` | Design effective KPI dashboards with metrics selection, visualization best practices, and real-time monitoring patterns. Use this skill when building an executive SaaS metrics d... | `filesystem, network, python` | `dist/skills/kpi-dashboard-design/SKILL.md` |
| `markdown-mermaid-writing` | Writes scientific Markdown documentation and Mermaid diagrams for workflows, | `browser, filesystem, network, node, python, shell` | `dist/skills/markdown-mermaid-writing/SKILL.md` |
| `matplotlib` | Creates and customizes scientific plots with Matplotlib. Used for fine-grained | `filesystem, media, network, python, shell` | `dist/skills/matplotlib/SKILL.md` |
| `mermaid-diagrams` | Comprehensive guide for creating software diagrams using Mermaid syntax. Use when users need to create, visualize, or document software through diagrams including class diagrams... | `filesystem, network, node, shell` | `dist/skills/mermaid-diagrams/SKILL.md` |
| `mermaid-visualizer` | Transform text content into professional Mermaid diagrams for presentations and documentation. Use when users ask to visualize concepts, create flowcharts, or make diagrams from... | `filesystem, network, node` | `dist/skills/mermaid-visualizer/SKILL.md` |
| `motion-graphics` | Kinetic typography, logo animations, and stylized motion design skill.   **Triggers when:**  - User wants text animations or kinetic typography  - Request involves logo reveals ... | `filesystem, media, network, python` | `dist/skills/motion-graphics/SKILL.md` |
| `plantuml-ascii` | Generate ASCII art diagrams using PlantUML text mode. Use when user asks to create ASCII diagrams, text-based diagrams, terminal-friendly diagrams, or mentions plantuml ascii, t... | `filesystem, network, node, shell` | `dist/skills/plantuml-ascii/SKILL.md` |
| `revops` | When the user wants help with revenue operations, lead lifecycle management, or marketing-to-sales handoff processes. Also use when the user mentions 'RevOps,' 'revenue operatio... | `filesystem, network` | `dist/skills/revops/SKILL.md` |
| `risk-metrics-calculation` | Calculate portfolio risk metrics including VaR, CVaR, Sharpe, Sortino, and drawdown analysis. Use when measuring portfolio risk, implementing risk limits, or building risk monit... | `filesystem, network` | `dist/skills/risk-metrics-calculation/SKILL.md` |
| `similarweb-analytics` | Analyze websites and domains using SimilarWeb traffic data. Get traffic metrics, engagement stats, global rankings, traffic sources, and geographic distribution for comprehensiv... | `filesystem, network, python` | `dist/skills/similarweb-analytics/SKILL.md` |
| `sn-da-excel-workflow` | Excel 数据分析多步编排器。覆盖：(1) 读取多 Sheet Excel 文件并统计行数，(2) 大文件检测（≥10k 行自动 Parquet 优化），(3) 数据清洗（缺失值、文本标准化、无效字符），(4) 条件筛选与分类提取，(5) 跨 Sheet 统计聚合，(6) 导出 Excel/CSV 并提供下载链接。覆盖从数据读取到报告生成全流程，按步... | `filesystem, python, shell` | `dist/skills/sn-da-excel-workflow/SKILL.md` |
| `sn-da-non-spreadsheet-analysis` | Word / PDF / PPT 文档解析与数据分析引擎。覆盖三类文件格式的全量提取、表格数值化、图表理解与跨文档汇总分析。**遇到以下任一情况就主动使用本 skill**：①用户上传或指定了 .docx / .doc / .pdf / .pptx / .ppt 文件并要求分析、提取或统计其中内容；②用户出现触发词：Word分析 / PDF解析 / P... | `filesystem, python` | `dist/skills/sn-da-non-spreadsheet-analysis/SKILL.md` |
| `sql-optimization-patterns` | Master SQL query optimization, indexing strategies, and EXPLAIN analysis to dramatically improve database performance and eliminate slow queries. Use when debugging slow queries... | `filesystem, network` | `dist/skills/sql-optimization-patterns/SKILL.md` |
| `sql-queries` | Write correct, performant SQL across all major data warehouse dialects | `filesystem, node` | `dist/skills/sql-queries/SKILL.md` |
| `statistical-power` | Sample-size and statistical power calculations for planning studies. | `filesystem, network, python, shell` | `dist/skills/statistical-power/SKILL.md` |
| `stock-analysis` | Analyze stocks and companies using financial market data. Get company profiles, technical insights, price charts, insider holdings, and SEC filings for comprehensive stock resea... | `filesystem, network` | `dist/skills/stock-analysis/SKILL.md` |
| `torch-geometric` | Supports PyTorch Geometric (PyG) graph neural networks — node/link/graph | `filesystem, network, node, python, shell` | `dist/skills/torch-geometric/SKILL.md` |
| `usfiscaldata` | Queries the U.S. Treasury Fiscal Data REST API for federal financial | `filesystem, network, python, shell` | `dist/skills/usfiscaldata/SKILL.md` |
| `validate-data` | QA an analysis before sharing -- methodology, accuracy, and bias checks. | `filesystem, network, python` | `dist/skills/validate-data/SKILL.md` |

---

## Detailed Skill Playbooks & Directives

When executing a task matching one of the included skills below, apply its specific workflow:

### `build-dashboard`
- **Trigger & Scope:** Build an interactive HTML dashboard with charts, filters, and tables.
- **Key Workflow Sections:** Usage → Workflow → 1. Understand the Dashboard Requirements → 2. Gather the Data → 3. Design the Dashboard Layout → 4. Build the HTML Dashboard
- **Core Directive:** > If you see unfamiliar placeholders or need to check which tools are connected, see `CONNECTORS.md`.
- **Canonical Skill Path:** `dist/skills/build-dashboard/SKILL.md` (or install individually via `npx --yes github:arz282-ctrl/Mr-Agents install build-dashboard`)

### `chart-visualization`
- **Trigger & Scope:** 将数据可视化为图表。当用户需要生成柱状图、折线图、饼图、散点图、雷达图、桑基图、思维导图、流程图等图表时调用此技能，通过 curl 工具调用 AntV API 生成图表图片
- **Key Workflow Sections:** 步骤 → 图表选择指南 → API 接口 → 支持的图表类型 → 通用可选参数 → 各图表 data 格式
- **Core Directive:** 4. 将返回的图片 URL 以 Markdown 图片格式输出
- **Canonical Skill Path:** `dist/skills/chart-visualization/SKILL.md` (or install individually via `npx --yes github:arz282-ctrl/Mr-Agents install chart-visualization`)

### `commercial-agreement-tabular-review`
- **Trigger & Scope:** Use this workflow to review uploaded documents and extract structured information into the tabular review columns defined in table-columns.yaml.
- **Key Workflow Sections:** Purpose → Instructions
- **Core Directive:** Use this workflow to review uploaded documents and extract structured information into the tabular review columns defined in `table-columns.yaml`.
- **Canonical Skill Path:** `dist/skills/commercial-agreement-tabular-review/SKILL.md` (or install individually via `npx --yes github:arz282-ctrl/Mr-Agents install commercial-agreement-tabular-review`)

### `data-analysis`
- **Trigger & Scope:** Analyze structured data or create visualizations from data. Use when the task requires processing data, performing analysis, or creating insightful visualizations or spreadsheets.
- **Key Workflow Sections:** When to Use → Data Analysis Best Practices → Delivering Results
- **Core Directive:** - When the task requires processing data, performing analysis, and creating insightful visualizations or spreadsheets
- **Canonical Skill Path:** `dist/skills/data-analysis/SKILL.md` (or install individually via `npx --yes github:arz282-ctrl/Mr-Agents install data-analysis`)

### `data-api`
- **Trigger & Scope:** Look up external data and generate 3D assets through Manus Data APIs — X/Twitter posts and profiles, LinkedIn people and companies, YouTube videos and captions, TikTok/Instagram/Reddit content, financial market data (prices, technical indicators, company financials), SEC filings and earnings call transcripts, Crunchbase companies and investors, World Bank indicators, Google Trends, App Store rankings, Mobbin app and website UI design references (screens and page sections), Similarweb website traffic, domain-name availability, and 3D models from text or images. Use when the task needs structured data from these sources instead of scraping web pages, or needs a 3D asset generated programmatically.
- **Key Workflow Sections:** Sources → Usage → Source notes
- **Core Directive:** Use the bundled scripts; the API catalog, eligibility rules, pricing, and provider credentials stay on the Manus service.
- **Canonical Skill Path:** `dist/skills/data-api/SKILL.md` (or install individually via `npx --yes github:arz282-ctrl/Mr-Agents install data-api`)

### `data-backup-restoration`
- **Trigger & Scope:** Official guidance for the August 2026 Manus data backup and restoration service change, including websites and mobile apps. Use when users ask whether they are affected, what will happen to their data or services, or how to back up or restore.
- **Key Workflow Sections:** Core guidelines → Website questions → Mobile App questions → Timeline → Determine the impact → Backup
- **Core Directive:** Use this skill to answer questions about the August 2026 Manus service change.
- **Canonical Skill Path:** `dist/skills/data-backup-restoration/SKILL.md` (or install individually via `npx --yes github:arz282-ctrl/Mr-Agents install data-backup-restoration`)

### `data-context-extractor`
- **Trigger & Scope:** Generate or improve a company-specific data analysis skill by extracting tribal knowledge from analysts.  BOOTSTRAP MODE - Triggers: "Create a data context skill", "Set up data analysis for our warehouse", "Help me create a skill for our database", "Generate a data skill for [company]" → Discovers schemas, asks key questions, generates initial skill with reference files  ITERATION MODE - Triggers: "Add context about [domain]", "The skill needs more info about [topic]", "Update the data skill with [metrics/tables/terminology]", "Improve the [domain] reference" → Loads existing skill, asks targeted questions, appends/updates reference files  Use when data analysts want Claude to understand their company's specific data warehouse, terminology, metrics definitions, and common query patterns.
- **Key Workflow Sections:** How It Works → Bootstrap Mode → Phase 1: Database Connection & Discovery → Phase 2: Core Questions (Ask These) → Phase 3: Generate the Skill → Phase 4: Package and Deliver
- **Core Directive:** A meta-skill that extracts company-specific data knowledge from analysts and generates tailored data analysis skills.
- **Canonical Skill Path:** `dist/skills/data-context-extractor/SKILL.md` (or install individually via `npx --yes github:arz282-ctrl/Mr-Agents install data-context-extractor`)

### `data-visualization`
- **Trigger & Scope:** Create effective data visualizations with Python (matplotlib, seaborn,
- **Key Workflow Sections:** Chart Selection Guide → Choose by Data Relationship → When NOT to Use Certain Charts → Python Visualization Code Patterns → Setup and Style → Line Chart (Time Series)
- **Core Directive:** Chart selection guidance, Python visualization code patterns, design principles, and accessibility considerations for creating effective data visualizations.
- **Canonical Skill Path:** `dist/skills/data-visualization/SKILL.md` (or install individually via `npx --yes github:arz282-ctrl/Mr-Agents install data-visualization`)

### `database-lookup`
- **Trigger & Scope:** Queries documented public database APIs with explicit endpoints, filters, pagination, and provenance. Used when a scientific, regulatory, financial, or other database-backed fact must be retrieved reproducibly from a named source rather than inferred from general knowledge.
- **Key Workflow Sections:** Core Workflow → Database Selection Guide → Common Identifier Formats → Identifier Resolution → POST and custom-header requests → API Keys and Access Restrictions
- **Core Directive:** This skill catalogs 80 databases with public, registered, or licensed access patterns. Your job is to turn the user's intent into a reproducible retrieval: select the authoritative database(s), make bounded and rate-limited API calls, verif
- **Canonical Skill Path:** `dist/skills/database-lookup/SKILL.md` (or install individually via `npx --yes github:arz282-ctrl/Mr-Agents install database-lookup`)

### `excalidraw`
- **Trigger & Scope:** Use when working with *.excalidraw or *.excalidraw.json files, user mentions diagrams/flowcharts, or requests architecture visualization - delegates all Excalidraw operations to subagents to prevent context exhaustion from verbose JSON (single files: 4k-22k tokens, can exceed read limits)
- **Key Workflow Sections:** Overview → The Problem → When to Use → Delegation Pattern → Main Agent Responsibilities → Subagent Task Templates
- **Core Directive:** **Core principle:** Main agents NEVER read Excalidraw files directly. Always delegate to subagents to isolate context consumption.
- **Canonical Skill Path:** `dist/skills/excalidraw/SKILL.md` (or install individually via `npx --yes github:arz282-ctrl/Mr-Agents install excalidraw`)

### `excalidraw-diagram`
- **Trigger & Scope:** Generate Excalidraw diagrams from text content. Supports three output modes - Obsidian (.md), Standard (.excalidraw), and Animated (.excalidraw with animation order). Triggers on "Excalidraw", "画图", "流程图", "思维导图", "可视化", "diagram", "标准Excalidraw", "standard excalidraw", "Excalidraw动画", "动画图", "animate".
- **Key Workflow Sections:** Output Modes → Workflow → Output Formats → Mode 1: Obsidian Format (Default) → Text Elements → Drawing
- **Core Directive:** Create Excalidraw diagrams from text content with multiple output formats.
- **Canonical Skill Path:** `dist/skills/excalidraw-diagram/SKILL.md` (or install individually via `npx --yes github:arz282-ctrl/Mr-Agents install excalidraw-diagram`)

### `excalidraw-diagram-generator`
- **Trigger & Scope:** Generate Excalidraw diagrams from natural language descriptions. Use when asked to "create a diagram", "make a flowchart", "visualize a process", "draw a system architecture", "create a mind map", or "generate an Excalidraw file". Supports flowcharts, relationship diagrams, mind maps, and system architecture diagrams. Outputs .excalidraw JSON files that can be opened directly in Excalidraw.
- **Key Workflow Sections:** When to Use This Skill → Prerequisites → Step-by-Step Workflow → Step 1: Understand the Request → Step 2: Choose the Appropriate Diagram Type → Step 3: Extract Structured Information
- **Core Directive:** A skill for generating Excalidraw-format diagrams from natural language descriptions. This skill helps create visual representations of processes, systems, relationships, and ideas without manual drawing.
- **Canonical Skill Path:** `dist/skills/excalidraw-diagram-generator/SKILL.md` (or install individually via `npx --yes github:arz282-ctrl/Mr-Agents install excalidraw-diagram-generator`)

### `excel-generator`
- **Trigger & Scope:** Professional Excel spreadsheet creation with a focus on aesthetics and data analysis. Use when creating spreadsheets for organizing, analyzing, and presenting structured data in a clear and professional format. For finance/valuation/modeling deliverables (DCF, LBO, comps, 3-statement models, DD trackers), defer to finance-pro-playbooks and its formats/excel_standards.md instead — do not apply this skill's aesthetics to those outputs.
- **Key Workflow Sections:** Goal → Core Principle → Part 1: User Needs & Feature Matching → Feature ↔ User Value Pairs → Part 2: Four-Layer Implementation → Layer 1: Structure (How It's Organized)
- **Core Directive:** > **Precedence**: For finance-domain Excel outputs (valuation models, LBO, comps, financial forecasts, DD trackers), `finance-pro-playbooks/formats/excel_standards.md` is the sole formatting authority — read that instead, and do not blend t
- **Canonical Skill Path:** `dist/skills/excel-generator/SKILL.md` (or install individually via `npx --yes github:arz282-ctrl/Mr-Agents install excel-generator`)

### `grafana-dashboards`
- **Trigger & Scope:** Create and manage production Grafana dashboards for real-time visualization of system and application metrics. Use when building monitoring dashboards, visualizing metrics, or creating operational observability interfaces.
- **Key Workflow Sections:** Purpose → When to Use → Dashboard Design Principles → 1. Hierarchy of Information → 2. RED Method (Services) → 3. USE Method (Resources)
- **Core Directive:** Create and manage production-ready Grafana dashboards for comprehensive system observability.
- **Canonical Skill Path:** `dist/skills/grafana-dashboards/SKILL.md` (or install individually via `npx --yes github:arz282-ctrl/Mr-Agents install grafana-dashboards`)

### `huggingface-datasets`
- **Trigger & Scope:** Use this skill for Hugging Face Dataset Viewer API workflows that fetch subset/split metadata, paginate rows, search text, apply filters, download parquet URLs, and read size or statistics.
- **Key Workflow Sections:** Core workflow → Defaults → Dataset Viewer → Creating and Uploading Datasets → Agent Traces
- **Core Directive:** Use this skill to execute read-only Dataset Viewer API calls for dataset exploration and extraction.
- **Canonical Skill Path:** `dist/skills/huggingface-datasets/SKILL.md` (or install individually via `npx --yes github:arz282-ctrl/Mr-Agents install huggingface-datasets`)

### `kpi-dashboard-design`
- **Trigger & Scope:** Design effective KPI dashboards with metrics selection, visualization best practices, and real-time monitoring patterns. Use this skill when building an executive SaaS metrics dashboard tracking MRR, churn, and LTV/CAC ratios; designing an operations center with live service health and request throughput; creating a cohort retention analysis view for a product team; or debugging a dashboard where metrics contradict each other due to inconsistent calculation methodology.
- **Key Workflow Sections:** When to Use This Skill → Core Concepts → 1. KPI Framework → 2. SMART KPIs → 3. Dashboard Hierarchy → Detailed worked examples and patterns
- **Core Directive:** Comprehensive patterns for designing effective Key Performance Indicator (KPI) dashboards that drive business decisions.
- **Canonical Skill Path:** `dist/skills/kpi-dashboard-design/SKILL.md` (or install individually via `npx --yes github:arz282-ctrl/Mr-Agents install kpi-dashboard-design`)

### `markdown-mermaid-writing`
- **Trigger & Scope:** Writes scientific Markdown documentation and Mermaid diagrams for workflows,
- **Key Workflow Sections:** Overview → When to Use This Skill → 🎨 The Source Format Philosophy → Why text-based diagrams win → The three-phase workflow → What Mermaid can express
- **Core Directive:** This skill provides an optional house style for **Markdown documentation with Mermaid
- **Canonical Skill Path:** `dist/skills/markdown-mermaid-writing/SKILL.md` (or install individually via `npx --yes github:arz282-ctrl/Mr-Agents install markdown-mermaid-writing`)

### `matplotlib`
- **Trigger & Scope:** Creates and customizes scientific plots with Matplotlib. Used for fine-grained
- **Key Workflow Sections:** Overview → When to Use This Skill → Setup → Core Concepts → The Matplotlib Hierarchy → Two Interfaces
- **Core Directive:** Matplotlib is Python's foundational visualization library for creating static, animated, and interactive plots. This skill provides guidance on using matplotlib effectively, covering both the pyplot interface (MATLAB-style) and the object-o
- **Canonical Skill Path:** `dist/skills/matplotlib/SKILL.md` (or install individually via `npx --yes github:arz282-ctrl/Mr-Agents install matplotlib`)

### `mermaid-diagrams`
- **Trigger & Scope:** Comprehensive guide for creating software diagrams using Mermaid syntax. Use when users need to create, visualize, or document software through diagrams including class diagrams (domain modeling, object-oriented design), sequence diagrams (application flows, API interactions, code execution), flowcharts (processes, algorithms, user journeys), entity relationship diagrams (database schemas), C4 architecture diagrams (system context, containers, components), state diagrams, git graphs, pie charts, gantt charts, or any other diagram type. Triggers include requests to "diagram", "visualize", "model", "map out", "show the flow", or when explaining system architecture, database design, code structure, or user/application flows.
- **Key Workflow Sections:** Core Syntax Structure → Diagram Type Selection Guide → Quick Start Examples → Class Diagram (Domain Model) → Sequence Diagram (API Flow) → Flowchart (User Journey)
- **Core Directive:** Create professional software diagrams using Mermaid's text-based syntax. Mermaid renders diagrams from simple text definitions, making diagrams version-controllable, easy to update, and maintainable alongside code.
- **Canonical Skill Path:** `dist/skills/mermaid-diagrams/SKILL.md` (or install individually via `npx --yes github:arz282-ctrl/Mr-Agents install mermaid-diagrams`)

### `mermaid-visualizer`
- **Trigger & Scope:** Transform text content into professional Mermaid diagrams for presentations and documentation. Use when users ask to visualize concepts, create flowcharts, or make diagrams from text. Supports process flows, system architectures, comparisons, mindmaps, and more with built-in syntax error prevention.
- **Key Workflow Sections:** Overview → Quick Start → Diagram Types → 1. Process Flow (graph TB/LR) → 2. Circular Flow (graph TD with circular layout) → 3. Comparison Diagram (graph TB with parallel paths)
- **Core Directive:** Convert text content into clean, professional Mermaid diagrams optimized for presentations and documentation. Automatically handles common syntax pitfalls (list syntax conflicts, subgraph naming, spacing issues) to ensure diagrams render co
- **Canonical Skill Path:** `dist/skills/mermaid-visualizer/SKILL.md` (or install individually via `npx --yes github:arz282-ctrl/Mr-Agents install mermaid-visualizer`)

### `motion-graphics`
- **Trigger & Scope:** Kinetic typography, logo animations, and stylized motion design skill.   **Triggers when:**  - User wants text animations or kinetic typography  - Request involves logo reveals or title sequences  - Content focuses on visual impact over education  - User mentions "title", "intro", "logo", "text animation", "kinetic"   **Capabilities:**  - Kinetic typography with dynamic text effects  - Logo reveals and brand animations  - Particle effects and visual flourishes  - Modern motion design patterns  - Attention-grabbing title sequences
- **Key Workflow Sections:** Design Principles → The 4 S's of Motion Graphics → Motion Design Fundamentals → Rules → [rules/kinetic-typography.md](rules/kinetic-typography.md) → [rules/timing-and-easing.md](rules/timing-and-easing.md)
- **Core Directive:** The Motion Graphics skill creates visually striking animations focused on aesthetic impact, perfect for titles, intros, and attention-grabbing content.
- **Canonical Skill Path:** `dist/skills/motion-graphics/SKILL.md` (or install individually via `npx --yes github:arz282-ctrl/Mr-Agents install motion-graphics`)

### `plantuml-ascii`
- **Trigger & Scope:** Generate ASCII art diagrams using PlantUML text mode. Use when user asks to create ASCII diagrams, text-based diagrams, terminal-friendly diagrams, or mentions plantuml ascii, text diagram, ascii art diagram. Supports: Converting PlantUML diagrams to ASCII art, Creating sequence diagrams, class diagrams, flowcharts in ASCII format, Generating Unicode-enhanced ASCII art with -utxt flag
- **Key Workflow Sections:** Overview → What is PlantUML ASCII Art? → Installation → Output Formats → Basic Workflow → 1. Create PlantUML Diagram File
- **Core Directive:** Create text-based ASCII art diagrams using PlantUML. Perfect for documentation in terminal environments, README files, emails, or any scenario where graphical diagrams aren't suitable.
- **Canonical Skill Path:** `dist/skills/plantuml-ascii/SKILL.md` (or install individually via `npx --yes github:arz282-ctrl/Mr-Agents install plantuml-ascii`)

### `revops`
- **Trigger & Scope:** When the user wants help with revenue operations, lead lifecycle management, or marketing-to-sales handoff processes. Also use when the user mentions 'RevOps,' 'revenue operations,' 'lead scoring,' 'outbound pipeline stages,' 'lead routing,' 'MQL,' 'SQL,' 'pipeline stages,' 'deal desk,' 'CRM automation,' 'marketing-to-sales handoff,' 'data hygiene,' 'leads aren't getting to sales,' 'pipeline management,' 'lead qualification,' or 'when should marketing hand off to sales.' Use this for anything involving the systems and processes that connect marketing to revenue. For cold outreach emails, see cold-email. For email drip campaigns, see emails. For pricing decisions, see pricing.
- **Key Workflow Sections:** Before Starting → Core Principles → Single Source of Truth → Define Before Automate → Measure Every Handoff → Revenue Team Alignment
- **Core Directive:** You are an expert in revenue operations. Your goal is to help design and optimize the systems that connect marketing, sales, and customer success into a unified revenue engine.
- **Canonical Skill Path:** `dist/skills/revops/SKILL.md` (or install individually via `npx --yes github:arz282-ctrl/Mr-Agents install revops`)

### `risk-metrics-calculation`
- **Trigger & Scope:** Calculate portfolio risk metrics including VaR, CVaR, Sharpe, Sortino, and drawdown analysis. Use when measuring portfolio risk, implementing risk limits, or building risk monitoring systems.
- **Key Workflow Sections:** When to Use This Skill → Core Concepts → 1. Risk Metric Categories → 2. Time Horizons → Detailed patterns and worked examples → Best Practices
- **Core Directive:** Comprehensive risk measurement toolkit for portfolio management, including Value at Risk, Expected Shortfall, and drawdown analysis.
- **Canonical Skill Path:** `dist/skills/risk-metrics-calculation/SKILL.md` (or install individually via `npx --yes github:arz282-ctrl/Mr-Agents install risk-metrics-calculation`)

### `similarweb-analytics`
- **Trigger & Scope:** Analyze websites and domains using SimilarWeb traffic data. Get traffic metrics, engagement stats, global rankings, traffic sources, and geographic distribution for comprehensive website research.
- **Key Workflow Sections:** Core Capabilities → API Usage → Get Global Rank → Get Website Visits Total → Get Unique Visit → Get Bounce Rate
- **Core Directive:** Comprehensive website and domain analysis using SimilarWeb traffic data.
- **Canonical Skill Path:** `dist/skills/similarweb-analytics/SKILL.md` (or install individually via `npx --yes github:arz282-ctrl/Mr-Agents install similarweb-analytics`)

### `sn-da-excel-workflow`
- **Trigger & Scope:** Excel 数据分析多步编排器。覆盖：(1) 读取多 Sheet Excel 文件并统计行数，(2) 大文件检测（≥10k 行自动 Parquet 优化），(3) 数据清洗（缺失值、文本标准化、无效字符），(4) 条件筛选与分类提取，(5) 跨 Sheet 统计聚合，(6) 导出 Excel/CSV 并提供下载链接。覆盖从数据读取到报告生成全流程，按步骤编排 capability 子 skill。**遇到以下任一情况就主动使用本 skill，不要自行写几行 pandas 就回答**：①用户出现触发词：Excel 分析 / 表格分析 / 数据分析 / 数据清洗 / 数据统计 / 数据筛选 / 数据可视化 / 数据导出 / 汇总统计 / 透视表 / 分组统计 / 交叉分析 / 趋势分析 / 对比分析 / 异常值检测 / 去重 / 缺失值处理 / Excel 报告 / 生成报表 / analyze Excel / data analysis / data cleaning / pivot table；②用户上传或指定了 .xlsx / .xls / .csv 文件并要求分析、清洗、统计或可视化；③任务涉及多 Sheet 读取、条件筛选、分类汇总、图表生成中的任意一项；④用户要求导出带格式的 Excel 报告或下载链接。仅不用于：不涉及表格数据的纯文本处理、图片分析（使用 sn-da-image-caption）、单个公式计算的简单问答。
- **Key Workflow Sections:** Workflow → Step 1 — Count rows across all sheets (lightweight, no full load) → Step 2 — Large file gate (CRITICAL — choose strategy by row count) → Step 3 — Inspect schema & data types → Step 4 — Data cleaning → Step 5 — Filter & extract
- **Core Directive:** End-to-end workflow for structured Excel analysis. Each step maps to a
- **Canonical Skill Path:** `dist/skills/sn-da-excel-workflow/SKILL.md` (or install individually via `npx --yes github:arz282-ctrl/Mr-Agents install sn-da-excel-workflow`)

### `sn-da-non-spreadsheet-analysis`
- **Trigger & Scope:** Word / PDF / PPT 文档解析与数据分析引擎。覆盖三类文件格式的全量提取、表格数值化、图表理解与跨文档汇总分析。**遇到以下任一情况就主动使用本 skill**：①用户上传或指定了 .docx / .doc / .pdf / .pptx / .ppt 文件并要求分析、提取或统计其中内容；②用户出现触发词：Word分析 / PDF解析 / PPT提取 / 文档分析 / 报告解析 / 幻灯片分析 / 发票提取 / 合同分析 / 文档统计 / 错别字 / 语病 / 字号检查 / 简历分析 / 多文档对比；③任务涉及从文档中提取表格、数值、图表、格式（颜色/高亮/字号）、组织架构、时间线等结构化信息。仅不用于：Excel/CSV 数据分析（使用 sn-da-excel-workflow）、纯图片分析（使用 sn-da-image-caption）。
- **Key Workflow Sections:** Workflow → Step 0 — Identify file type and input scope → Step 1 — Load sub-skill by format → Step 2 — Parse and extract → Step 3 — Answer with verification → Universal Rules
- **Core Directive:** End-to-end workflow for Word, PDF, and PPT document parsing. Each format has
- **Canonical Skill Path:** `dist/skills/sn-da-non-spreadsheet-analysis/SKILL.md` (or install individually via `npx --yes github:arz282-ctrl/Mr-Agents install sn-da-non-spreadsheet-analysis`)

### `sql-optimization-patterns`
- **Trigger & Scope:** Master SQL query optimization, indexing strategies, and EXPLAIN analysis to dramatically improve database performance and eliminate slow queries. Use when debugging slow queries, designing database schemas, or optimizing application performance.
- **Key Workflow Sections:** When to Use This Skill → Core Concepts → 1. Query Execution Plans (EXPLAIN) → 2. Index Strategies → 3. Query Optimization Patterns → Detailed patterns and worked examples
- **Core Directive:** Transform slow database queries into lightning-fast operations through systematic optimization, proper indexing, and query plan analysis.
- **Canonical Skill Path:** `dist/skills/sql-optimization-patterns/SKILL.md` (or install individually via `npx --yes github:arz282-ctrl/Mr-Agents install sql-optimization-patterns`)

### `sql-queries`
- **Trigger & Scope:** Write correct, performant SQL across all major data warehouse dialects
- **Key Workflow Sections:** Dialect-Specific Reference → PostgreSQL (including Aurora, RDS, Supabase, Neon) → Snowflake → BigQuery (Google Cloud) → Redshift (Amazon) → Databricks SQL
- **Core Directive:** Write correct, performant, readable SQL across all major data warehouse dialects.
- **Canonical Skill Path:** `dist/skills/sql-queries/SKILL.md` (or install individually via `npx --yes github:arz282-ctrl/Mr-Agents install sql-queries`)

### `statistical-power`
- **Trigger & Scope:** Sample-size and statistical power calculations for planning studies.
- **Key Workflow Sections:** Overview → When to Use This Skill → Installation → The one decision that drives everything: the effect size → Quick recipes (closed-form) → When there is no formula: simulate
- **Core Directive:** Power analysis answers one of the most consequential questions in study planning: **how large a sample do you need to reliably detect an effect of a given size, and what could you detect with the sample you can afford?** An underpowered stu
- **Canonical Skill Path:** `dist/skills/statistical-power/SKILL.md` (or install individually via `npx --yes github:arz282-ctrl/Mr-Agents install statistical-power`)

### `stock-analysis`
- **Trigger & Scope:** Analyze stocks and companies using financial market data. Get company profiles, technical insights, price charts, insider holdings, and SEC filings for comprehensive stock research.
- **Key Workflow Sections:** Core Capabilities → Available APIs → Company Information → Trading & Market Data → Ownership & Compliance → Common Workflows
- **Core Directive:** Comprehensive stock and company analysis using with real-time market data.
- **Canonical Skill Path:** `dist/skills/stock-analysis/SKILL.md` (or install individually via `npx --yes github:arz282-ctrl/Mr-Agents install stock-analysis`)

### `torch-geometric`
- **Trigger & Scope:** Supports PyTorch Geometric (PyG) graph neural networks — node/link/graph
- **Key Workflow Sections:** Installation → Core Concepts → Graph Data: `Data` and `HeteroData` → Datasets → Transforms → Building GNN Models
- **Core Directive:** PyG is the standard library for Graph Neural Networks built on PyTorch. It provides data structures for graphs, 60+ GNN layer implementations, scalable mini-batch training, and support for heterogeneous graphs.
- **Canonical Skill Path:** `dist/skills/torch-geometric/SKILL.md` (or install individually via `npx --yes github:arz282-ctrl/Mr-Agents install torch-geometric`)

### `usfiscaldata`
- **Trigger & Scope:** Queries the U.S. Treasury Fiscal Data REST API for federal financial
- **Key Workflow Sections:** Installation → Quick Start → Authentication → Core Parameters → Key Datasets & Endpoints → Debt
- **Core Directive:** Free, open REST API from the U.S. Department of the Treasury for federal financial data. No API key or registration required.
- **Canonical Skill Path:** `dist/skills/usfiscaldata/SKILL.md` (or install individually via `npx --yes github:arz282-ctrl/Mr-Agents install usfiscaldata`)

### `validate-data`
- **Trigger & Scope:** QA an analysis before sharing -- methodology, accuracy, and bias checks.
- **Key Workflow Sections:** Usage → Workflow → 1. Review Methodology and Assumptions → 2. Run the Pre-Delivery QA Checklist → 3. Check for Common Analytical Pitfalls → 4. Verify Calculations and Aggregations
- **Core Directive:** > If you see unfamiliar placeholders or need to check which tools are connected, see `CONNECTORS.md`.
- **Canonical Skill Path:** `dist/skills/validate-data/SKILL.md` (or install individually via `npx --yes github:arz282-ctrl/Mr-Agents install validate-data`)

---

## Upgrading to Individual Expanded Skills

To expand this `data-pack` into all 34 individual skill folders (including bundled `scripts/`, `references/`, and `assets/`), run:

```bash
npx --yes github:arz282-ctrl/Mr-Agents install --pack data
```

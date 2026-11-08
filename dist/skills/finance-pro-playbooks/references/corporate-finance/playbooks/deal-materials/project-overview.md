# Project Overview

> **Sections**: Ask First · Workflow · Defaults (apply silently, disclose at delivery) · Rules & Pitfalls · Pre-Delivery Checks · Scope Boundaries
> **Must not skip**: Rules & Pitfalls · Pre-Delivery Checks · Scope Boundaries — return here before delivery.

> Task `project-overview` in group `deal-materials`. Read [`_overview.md`](_overview.md) first for group-level scope, shared defaults, and format dependencies.

**Use when**: A project is opened and a deal-team-facing overview must be auto-generated from uploaded project materials | **Deliverable**: HTML dashboard (transaction headline + key financials/metrics + risks & highlights, with per-figure source citations)

## Ask First
1. Has the full deal materials package (CIM, model, legal documents, etc.) been uploaded to this project? Coverage quality is capped by what is in the data room.
2. Should the default template be customized for this deal type (e.g., credit, growth equity, M&A)? If yes, confirm which sections and metrics to emphasize before generating.

## Workflow
1. **Ingest all project-uploaded materials** — read every document in the project's data room to build a ground-truth understanding of the transaction (do not query external networks or public sources).
2. **Identify the transaction headline** — extract deal type, parties, size, and structure from the source documents.
3. **Extract key financials and metrics** — pull the figures most relevant to the deal type; tag each figure with its source document and page reference at time of extraction (source attribution must be embedded at extraction, not retrofitted).
4. **Surface risks and highlights** — actively identify items the deal team needs to be alerted to: customer/revenue concentration, anomalous trends, open items, covenant thresholds, integration risk, or ARR/retention irregularities, depending on deal type. Do not merely list financials; flag what requires attention.
5. **Assemble the HTML dashboard** — structure output as three skimmable panels: (a) Transaction Summary, (b) Key Financials / Metrics, (c) Risks & Highlights. Apply the built-in dashboard design specification for layout and styling; do not override it.
6. **Verify every figure has a live source citation** — before delivery, confirm each number in the dashboard links back to the originating document so reviewers can trace and verify.

### Deal-Type Customization: Recommended Section Emphasis

| Deal Type | Emphasize |
|---|---|
| Credit / Leveraged Finance | Leverage multiples, interest coverage, covenant package, debt schedule |
| Growth Equity | ARR, net revenue retention, growth rate, burn / runway |
| M&A | Synergy estimates, integration risks, purchase price vs. precedent, open diligence items |
| Default (fallback) | Revenue, EBITDA, net debt, key operational KPIs, material risk factors |

## Defaults (apply silently, disclose at delivery)
| Parameter | Default | Rationale |
|---|---|---|
| Data source | Project-uploaded files only (no external web or market data) | Ensures the dashboard reflects the actual data room; prevents unverifiable external data from entering deal-team views |
| Source citation | Every figure cited to originating document | Traceability is the feature that distinguishes this from a generic summary |
| Output format | HTML dashboard | Interactive, skimmable; layout governed by built-in design specification |
| Dashboard density | Skimmable pre-meeting alignment, not exhaustive report | Deal teams need fast orientation, not document duplication |
| Template | Default fallback skeleton; customizable per project | Project-level edits override the global default without affecting other projects |

## Rules & Pitfalls

**Never:**
- Use uploaded project materials as the default evidence scope. Follow an explicit user instruction to add external sources, with those figures separately identified by source/date/basis; never silently mix them with data-room figures or present estimates as uploaded facts.
- Never omit source citations on any figure — a dashboard number without a traceable document reference is indistinguishable from a fabrication; traceability is the core feature.
- Never treat the default template as final for a specialized deal type — the default is a fallback skeleton, and deploying it unchanged on a credit or growth deal will surface irrelevant metrics and miss deal-critical ones.

**Conditional:**
- If uploaded materials are incomplete or thin, flag the coverage gap explicitly in the dashboard before delivery — the overview is only as good as what has been uploaded, and a silent gap is more dangerous than a disclosed one.
- If deal type is identified as credit/leveraged finance, add a dedicated Leverage & Covenants panel and promote those metrics above general financials.
- If deal type is identified as growth equity, replace or supplement EBITDA-centric metrics with ARR, net revenue retention, and runway.
- If deal type is identified as M&A, include a Synergies & Integration Risks panel and flag any open diligence items prominently.

**Judgment:**
- Calibrate dashboard density to "team alignment before a meeting" — surface only what a deal professional needs to orient quickly; omit detail that belongs in the full model or memo rather than the overview.
- Actively surface risks and anomalies rather than waiting for them to be noticed — the overview's value to the deal team lies precisely in proactive flagging of concentration risk, unusual trends, and unresolved items that could affect deal execution.
- Prefer project-level template customization over post-generation editing — configuring the right sections and metrics upfront (via the project's Edit Generation settings) produces consistently on-format overviews and reduces manual cleanup.

## Pre-Delivery Checks
- Confirm every figure displayed has a citation linking it to the source document and page.
- Confirm no figure originates from outside the project's uploaded materials.
- Confirm the Risks & Highlights panel contains at least one actively surfaced risk or anomaly, not only positive metrics.
- Confirm the three core panels are present: Transaction Summary, Key Financials / Metrics, Risks & Highlights.
- If the project is a specialized deal type (credit, growth equity, M&A), confirm deal-type-specific metrics are present and prominently placed per the customization table above.
- Confirm layout and styling comply with the built-in dashboard design specification (no ad-hoc formatting overrides).
- If any section of the dashboard is limited by incomplete uploads, confirm a coverage-gap disclosure is visible to the reader.

## Scope Boundaries
Dashboard (standalone request) handles user-initiated dashboards that may draw on broader data sources beyond the project data room. PIB / IC memo playbooks handle formal narrative deliverables in PDF/Word format requiring synthesis and written analysis. This playbook governs only the automatic project-level overview generated from project-uploaded materials.


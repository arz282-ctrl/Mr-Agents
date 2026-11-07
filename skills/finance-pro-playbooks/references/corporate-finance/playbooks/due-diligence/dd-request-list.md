# DD Request List (DRL)

> **Sections**: Ask First · Workflow · Defaults · Rules & Pitfalls · Pre-Delivery Checks · Scope Boundaries
> **Must not skip**: Defaults · Rules & Pitfalls · Pre-Delivery Checks · Scope Boundaries — return here before delivery.
> **Formats**: excel_standards.md

> Task `dd-request-list` in group `due-diligence`. Read [`_overview.md`](_overview.md) first for group-level scope, shared operating principles, and format dependencies.

**Use when**: User requests a due diligence request list (DRL) for an M&A or PE transaction | **Deliverable**: Excel workbook (.xlsx) — 13-column standalone DRL with conditional formatting, AutoFilter, and ≥200 pre-populated rows (or structured request rows when called by the DD Tracker playbook)

---

## Ask First

Confirm the six intake choices from available user instructions and working context. **At minimum, depth and focus areas must be known before generating.** Resolve the remaining choices for a complete build; when DD Tracker already supplies them, use those values without repeating the questions.

1. **Depth** — IOI / pre-LOI stage (~10–15 requests) or second-round full diligence (25–100 requests)?
2. **Industry** — What sector or sub-vertical is the target in?
3. **Focus areas** — Which workstreams or risk themes should be prioritised (e.g., customer concentration, unit economics, management, capex)?
4. **Time horizon** — How many historical years are in scope? *(Default: 3 years — confirm or override.)*
5. **Existing template** — Has the buyer or their counsel provided a DRL template with defined columns, tabs, or dropdowns?
6. **Existing materials** — Are any materials available (CIM, VDR index, prior DRL, management presentation)? If yes, attach before generation begins.

> **Note on uploaded materials**: Do not infer the user's investment priorities from a CIM. Use priorities/focus already supplied in the conversation or intake; ask only for material unresolved choices rather than repeating Q1/Q3 automatically.

---

## Workflow

1. **Determine invocation mode** *(establishes the entire output path)*
   - Called by DD Tracker → skip all intake questions; consume the passed workstream list, depth, and available materials; return structured request rows (Mode A).
   - Called directly by user → complete all six intake questions before proceeding.

2. **Read all uploaded materials in full before generating a single request** *(prevents duplication and sets the scope baseline)*
   - Review every file, including spreadsheet hidden tabs — file names are not reliable indicators of content.
   - Build an inventory of what has already been provided or is visible in the VDR index.
   - Identify: (a) value drivers, (b) unexplained material trends (accelerating growth, margin inflections, forecast step-changes, deterioration), (c) segmentation structure, and (d) concentration or risk flags (customer, supplier, cycle, moat).

3. **Generate requests** *(apply depth guidance, mandatory items, industry-specific metrics, and sensitivity handling simultaneously)*
   - Each identified risk theme → 1–3 requests.
   - Each unexplained material trend → at minimum 1 request.
   - Each mandatory item not already in hand → include; each item already provided → exclude with a disclosure note at delivery.
   - Apply industry-specific metrics for the confirmed sector (see table below).
   - Flag sensitive requests with anonymisation / blinding language where direct identification is not required.
   - Do not pad: include only requests with genuine analytical value.

4. **Select output mode and build the Excel file**
   - **Mode A (DD Tracker call):** Return request rows with columns: Workstream, Description, Priority, Status, Notes. Leave date columns blank for the Tracker to populate.
   - **Mode B (user-supplied template):** Mirror the template's columns, tab names, dropdowns, and formatting exactly. Do not impose any alternative schema.
   - **Mode C (default standalone):** Build the 13-column workbook per the schema below.

5. **Run pre-delivery sanity checks** *(see Pre-Delivery Checks section)*

6. **Deliver with a written disclosure note** explaining: (a) any mandatory item not requested and the specific reason (e.g., "Historical P&L not requested — available at VDR index 4.2.1"), and (b) any open requests on an uploaded DRL that can be closed based on reviewed materials, pending user confirmation.

---

### Mode C Default Schema (13 columns)

| Column | Content / Formula |
|---|---|
| Request # | Auto-incrementing formula |
| Workstream | Category label (primary sort key) |
| Description | Full, specific, prescriptive request text |
| Priority | Dropdown: High / Medium / Low |
| Status | Dropdown: Open / Partial / Received / Closed |
| Third Party | Counterparty or provider responsible |
| Date Requested | Date field |
| Last Response Date | Date field |
| Buyer Comments | Free text |
| Seller Comments | Free text |
| VDR Reference | Document path or index reference |
| Days Outstanding | Calculated formula |
| Notes | Assumptions, gap descriptions, anonymisation flags |

**Formatting rules for Mode C:**
- Conditional formatting: High = red fill, Medium = orange fill, Low = yellow fill
- AutoFilter enabled on all columns
- Print area set
- Text wrap enabled
- Pre-populate ≥200 rows
- Schema must remain compatible with the DD Tracker workbook structure

---

### Mandatory Items (include unless already provided)

| Item | Specification |
|---|---|
| Historical financials | Quarterly, 3 years minimum, split by core segment |
| Forward projections | 5+ years |
| Cash flow / capex / NWC | Full detail including maintenance vs. growth capex split |
| Management & organisation | Org chart, bios, retention, succession |
| Top-10 customers + concentration | Revenue by customer, trend, contract terms |
| Cap table | Fully diluted, option schedule, any preference stack |
| Employee census | Blinded (role, level, comp band, tenure) |

---

### Industry-Specific Request Additions

| Sector | Key Additional Metrics |
|---|---|
| SaaS / Software | NRR, gross and net churn, CAC, CAC payback, ARR bridge |
| Retail / Consumer | Same-store sales, individual store P&L, traffic vs. ticket split |
| Healthcare | Payor mix, reimbursement rates by payor, prior-auth denial rates |
| Industrial / Manufacturing | Capacity utilisation, maintenance vs. growth capex, backlog aging |
| Distribution / Logistics | Inventory turnover, supplier concentration, freight cost per unit |

---

## Defaults

| Parameter | Default / override |
|---|---|
| Historical period | 3 years |
| High-priority share of total requests | ≤50% of total request count |
| Output format | .xlsx (Mode C 13-column workbook) |
| Depth at IOI / pre-LOI stage | ~10–15 requests |
| Depth at second-round / full diligence | 25–100 requests |
| Assumptions | Noted in the Notes column, not stated as facts |
| Anonymisation on sensitive items | Flagged as "blinded acceptable" where direct identification is not required |

---

## Rules & Pitfalls

**Never:**
- **Use the user-requested deliverable format**; otherwise default to an editable request-list workbook. Preserve request identifiers, ownership, status and source traceability in the chosen medium.
- **Never fabricate company-specific information**
- **Never repeat a request for materials already in hand**
- **Never silently modify existing requests on an uploaded DRL**
- **Never auto-close open requests on an uploaded DRL** even when reviewed VDR documents appear to satisfy them
- **Never include out-of-scope workstreams (tax, legal IP, insurance, HR/employment, regulatory/ESG, financing) without explicit user instruction**
- **Never pad the list with low-value requests to inflate length**
- **Never surface investment thesis language, deal opinions, or risk conclusions in the request text**

**Conditional:**
- **If the user has supplied an existing template (Mode B):** mirror its columns, tab names, dropdowns, and formatting exactly; do not introduce additional columns or restructure the schema even if the Mode C schema would be more complete.
- **If a mandatory item is already present in the provided materials:** exclude it from the DRL and document the reason in the post-delivery disclosure note (e.g., "Historical P&L not requested — provided at VDR index 4.2.1").
- **If a request item is partially answered in available materials:** set Status = Partial and describe the gap precisely in the Notes column (e.g., "Top-10 customer names provided; quarterly revenue by customer absent").
- **If a sensitive item (customer identities, compensation data, equity ownership) is required:** include the request and annotate Notes with "blinded / anonymised format acceptable" where direct identification is not analytically necessary.
- **If a workstream explicitly listed in a DD Tracker call falls into an out-of-scope category (tax, legal IP, HR, etc.):** skip it entirely unless the user has separately and explicitly requested its inclusion, in which case include it and label each such request "Note: outside standard business diligence scope."
- **If the user uploads an existing DRL alongside a VDR index:** flag which open requests appear closable based on the VDR documents, but do not close them — list them for user confirmation only.

**Judgment:**
- **Calibrate request specificity to be prescriptive, not generic** — "Top-10 customers by quarterly revenue for the past 3 years, segmented by product line" is acceptable; "top customer detail" is not. Every request must specify quantity, time period, and granularity.
- **Map requests to identified value drivers and risk themes, not to exhaustive checklists** — each identified concentration risk, moat question, or cyclicality concern warrants 1–3 requests; each unexplained material trend (margin inflection, growth acceleration, forecast step-change) warrants at least 1 request. Mechanical checklist generation without material-driven rationale produces noise.
- **Maintain professional, M&A-process-appropriate language throughout** — the DRL will be transmitted directly to the sell-side or target management; informal phrasing, leading questions, or adversarial tone create friction and may prejudice the diligence relationship.
- **Sort output by workstream first, then by priority within each workstream** — this is how deal teams navigate and assign the document; priority-only sorting obscures workstream ownership.
- **Prefer depth on fewer, higher-conviction requests over breadth across many workstreams** — at IOI stage especially, a tight, well-prioritised list signals diligence sophistication more effectively than a long undifferentiated one.

---
## Pre-Delivery Checks

- Output format is .xlsx; reject any plain-text or Word output path before delivery.
- High-priority requests constitute ≤50% of the total request count; redistribute to Medium or Low if over threshold.
- Every request contains a specified quantity, time period, and level of granularity — flag and revise any generic descriptions.
- Cross-check every request against all uploaded materials (including hidden spreadsheet tabs); remove any item already fully satisfied by provided documents.
- All partially satisfied items carry Status = Partial with a specific gap description in Notes.
- All sensitive requests (customer names, salary data, equity detail) include an anonymisation / blinding note in Notes where applicable.
- No request text contains investment thesis language, valuation opinions, or risk conclusions visible to the counterparty.
- All out-of-scope items (tax, legal IP, insurance, HR, regulatory/ESG, financing) are absent unless the user explicitly requested inclusion, in which case each is labelled out-of-scope.
- The post-delivery disclosure note lists every mandatory item excluded and the specific reason for each exclusion.
- For Mode C: confirm conditional formatting is applied (High = red, Medium = orange, Low = yellow), AutoFilter is enabled, print area is set, text wrap is on, and the workbook contains ≥200 pre-populated rows.
- For Mode B: confirm the output schema matches the user-supplied template exactly — no additional columns, no schema changes.
- For Mode A: confirm date columns are left blank and the row structure is compatible with the DD Tracker schema.
- Requests are sorted by workstream (primary) and priority (secondary within workstream).
---

## Scope Boundaries
This task creates business-diligence document requests. Process tracking, VDR mapping, and individual interview guides are adjacent tasks. Specialist tax, legal IP, insurance, HR/employment, regulatory/ESG, and financing work is excluded unless explicitly requested.

---

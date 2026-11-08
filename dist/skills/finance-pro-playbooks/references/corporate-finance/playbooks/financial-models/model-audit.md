# Model Audit

> **Sections**: Ask First · Workflow · Defaults (apply silently, disclose at delivery) · Rules & Pitfalls · Pre-Delivery Checks · Scope Boundaries · Task-specific verification
> **Must not skip**: Rules & Pitfalls · Pre-Delivery Checks · Scope Boundaries — return here before delivery.
> **Formats**: excel_standards.md

> Task `model-audit` in group `financial-models`. Read [`_overview.md`](_overview.md) first for group-level scope and format dependencies.

**Use when**: A financial model (Excel workbook, PDF, or oral description) requires independent diagnosis before a transaction, IC presentation, or internal review | **Deliverable**: Structured audit report comprising a one-line summary, Model Map, Critical Findings table, Analytical Red Flags table, and Assumption Dashboard (with charts for top 3–5 drivers)

---

## Ask First
1. What model type is this — 3-statement, LBO, DCF, M&A, comps, credit, or operating model?
2. Which scenario/case is currently active in the model (base, upside, downside, or other)?
3. Is this a sell-side or management-prepared model, or an internal model?
4. Audit scope: full workbook audit, or a specific section (e.g., returns, debt schedule, operating assumptions only)?

---

## Workflow

**Phase 1 — Understand (always first; never skip to findings)**

1. Map the entire workbook before diagnosing anything: tab layout, data-flow direction, model type, version markers, and any anomalies (external links, hard-coded values pasted over formulas, inconsistent formatting, named ranges pointing to `#REF!`, mixed-author comments/TODOs). *(Rationale: a user cannot interpret "IS!D14 ≠ Assumptions!B5" without first knowing what D14 represents.)*
2. Identify the analytical narrative in one sentence — e.g., *"2.3x MOIC / 18% IRR driven primarily by 400 bps margin expansion and 2.5 turns of deleveraging; growth contributes minimally — this is a margin-and-leverage story, not a growth story."*
3. Identify and document the currently active case/scenario switch. Audit the active case; compare other cases at the output-level delta only (unless a full cross-case audit is requested).
4. Open and inspect all hidden rows, columns, and tabs. *(Rationale: deal models routinely conceal old deal structures, deleted scenarios, and counterparty assumptions that continue feeding visible outputs. Skipping hidden content is an explicit error.)*
5. Document version anomalies as background flags: external links, formulas replaced with hard-coded values, formatting inconsistencies, multi-author comments, hidden content. These signal how many hands have touched the model.

**Phase 2 — Formula-Level Audit**

6. Where the subject model contains a balance sheet, check its balance (Assets = Liabilities + Equity) for every applicable period; otherwise record not_applicable with a model-map reason. If it does not foot, flag as Critical before proceeding — all downstream outputs are unreliable until resolved.
7. Scan every tab for formula errors: `#REF!`, `#DIV/0!`, `#VALUE!`, `#NAME?`, and similar. Flag each instance immediately as Critical.
8. Create a ten-item applicability matrix from the actual model map. Self-calculate only applicable tie-outs; record not_applicable plus reason for absent/non-applicable schedules (do not rely on internal check rows):

   | Tie-Out Check | Pass / Fail Threshold |
   |---|---|
   | Balance sheet balance (each period) | Non-zero variance = Critical |
   | Cash flow tie-out | Non-zero variance = Critical |
   | Retained earnings rollforward | Non-zero variance = Critical |
   | Segment / cube roll-up to consolidated | Non-zero variance = Critical |
   | Working capital schedule | Non-zero variance = Critical |
   | D&A schedule (vs. PP&E roll) | Non-zero variance = Critical |
   | Interest expense (vs. debt schedule) | Non-zero variance = Critical |
   | Sources & uses balance | Non-zero variance = Critical |
   | Debt balance by tranche (each period) | Non-zero variance = Critical |
   | EBITDA definition reconciliation | Non-zero variance = Critical |

9. Audit formula consistency across each row/column:
   - Hardcoded values embedded inside formulas
   - Inconsistent formulas across a row or column (may be intentional override — flag and investigate before concluding)
   - Absolute vs. relative reference misuse
   - Off-by-one period errors
   - Paste-over overwrites (formula replaced by static value without notation)
   - Circular references (may be intentional — check for iteration settings and flags before flagging as error)
   - Broken cross-sheet links
   - Unit mismatches (e.g., thousands vs. millions in the same calculation)
   - Period misalignment (e.g., beginning-of-period vs. end-of-period inconsistency)
   - VLOOKUP/INDEX-MATCH fragility (lookups that break on sort or column insertion)

**Phase 3 — Analytical Reasonableness**

10. Review all analytical red flags (functioning formulas that produce analytically suspicious outputs):
    - Revenue growth hockey-stick with no identified catalyst
    - Margin expansion >500 bps in a single year without a corresponding cost action in the model
    - Terminal value >75% of total EV
    - Growth rates >50% with no catalyst
    - Working capital improvement that is aggressive or inflects sharply
    - Cash conversion rate step-changes
    - Scenario spread that is implausibly narrow or wide
    - Leverage multiples inconsistent with deal structure
    - EBITDA definition that adds back items inconsistently or aggressively

11. Build the Assumption Dashboard:
    - Separate operating assumptions from transaction assumptions
    - Present as a time-series table with each value hyperlinked back to its source cell
    - Include a CAGR column
    - Produce charts for the top 3–5 most critical drivers, showing projected values against historical actuals, so deviations are visible at a glance

**Output Assembly**

12. Compile the four-section deliverable in this order:

### Output Structure

**One-Line Summary**
> `Model Type [X] — Overall Assessment [Clean / Minor Issues / Major Issues] — [N] Critical, [N] Warning, [N] Info`

**Section 1 — Model Map** *(from Phase 1)*
Tab inventory, data-flow diagram, active case, version anomaly flags, narrative summary.

**Section 2 — Critical Findings** *(from Phase 2)*
Formula and structural errors only. Finding table format:

| # | Sheet | Cell (hyperlink) | Severity | Category | Issue | Quantified Impact | Recommended Fix |
|---|---|---|---|---|---|---|---|

Sort by severity descending. Group as **Formula / Structural Errors**.

All Critical findings must include a quantified impact statement — not *"formula error in cell X"* but *"overstates EBITDA by $3M → inflates EV by ~$25M at current multiple."* If precise quantification is impossible, state directional impact (e.g., *"overstates FCF — magnitude indeterminate without corrected depreciation schedule"*).

**Section 3 — Analytical Red Flags** *(from Phase 3)*
Analytically suspicious assumptions that are functionally correct. Same table format as Section 2. Group as **Analytical Reasonableness Flags**.

**Section 4 — Assumption Dashboard** *(from Phase 11)*
Time-series table + CAGR column + source-cell hyperlinks + charts for top 3–5 drivers.

---

## Defaults (apply silently, disclose at delivery)

| Parameter | Default | Rationale |
|---|---|---|
| Phase execution order | Phase 1 → Phase 2 → Phase 3 always | Understanding before diagnosis prevents misidentified findings |
| Scope of hidden content | Expand and inspect all hidden rows, columns, and tabs | Hidden content frequently feeds visible outputs in deal models |
| Scenario audit scope | Audit active case only; cross-case comparison at output-level delta | Full cross-case audit only if explicitly requested |
| Tie-out method | Self-calculated for all 10 tie-out checks; do not rely on model's internal check rows | Internal checks may themselves be broken |
| Non-zero tie-out variance threshold | Any non-zero variance = Critical | No materiality threshold applies to structural integrity checks |
| Terminal value flag threshold | >75% of total EV = Red Flag | Industry norm is 50–70%; beyond 75% the story is driven by terminal assumptions, not the forecast |
| Margin expansion flag threshold | >500 bps single-year improvement without a corresponding cost action = Red Flag | Sell-side inflation pattern |
| Revenue growth flag threshold | >50% growth without an identified catalyst = Red Flag | Hockey-stick pattern common in optimistic sell-side models |
| Sell-side / management model skepticism | Elevated scrutiny on hockey-stick growth, working capital improvements, and cash conversion rate inflections | These are the three most common seller inflation vectors |
| Reporting tone | Second-year analyst reporting to VP | Precise, direct, no editorial inflation of severity |
| Severity: Critical | Output is incorrect, process must stop | Balance sheet imbalance, #REF!/#DIV/0!, any tie-out failure, formula error with material impact |
| Severity: Warning | Output is fragile or assumption is suspicious but model functions | VLOOKUP fragility, aggressive but internally consistent assumptions |
| Severity: Info | Style, documentation, or hygiene observation | Inconsistent formatting, unlabeled hardcodes, missing source citations |
| Assumption dashboard split | Operating assumptions and transaction assumptions in separate sections | Conflation obscures what is a deal-structure choice vs. a business forecast choice |
| Charts in dashboard | Top 3–5 most critical drivers | Sufficient for one-glance deviation identification without over-engineering |

---

## Rules & Pitfalls

**Never:**
- **Never edit any cell in the model** — this is an audit, not an editing engagement. Any cell change requires an explicit instruction from the user and must be handed off to the modeling/editing workflow. Editing during an audit contaminates the audit trail and removes your objectivity.
- **Never assume the model is wrong before reading it** — manual overrides, circular references, and scenario switches may be intentional design decisions. Pre-judging before completing Phase 1 produces false positives that destroy credibility with reviewers.
- **Never skip hidden content** — hidden rows, columns, and tabs in deal models routinely contain old deal structures, deleted scenarios, and counterparty assumptions that continue feeding visible outputs. Skipping them is an explicit audit failure.
- **Never file a finding without a specific cell reference and hyperlink** — *"revenue looks high"* is not a finding. A finding must cite the exact cell (formatted as a `HYPERLINK("#'SheetName'!CellRef","Label")`) so the user can navigate directly to it.
- **Never report a Critical finding without quantifying its impact on the bottom-line conclusion** — if exact quantification is impossible, state the directional impact (e.g., *"overstates FCF — magnitude indeterminate"*). An unquantified Critical is not actionable.
- **Never escalate a formatting or style issue to Critical severity** — doing so trains reviewers to ignore Critical flags and is the fastest way to lose credibility with a VP or MD.
- **Never reference a tab or cell in a finding that does not exist in the model** — all citations must be verified against the actual workbook.

**Conditional:**
- **If a circular reference is present**, check for iteration settings, a dedicated circuit-breaker switch, or a comment/notation (e.g., *"Manual override per MD"*) before classifying it as an error. Flag it as *"Circular reference — appears intentional; confirm iteration settings are correct"* rather than auto-Critical.
- **If an inconsistent formula is found across a row or column**, check whether it represents an intentional override before filing it as an error. The majority pattern is not necessarily correct; the deviation may be the intentional one.
- **If the model is sell-side or management-prepared**, apply elevated skepticism to: hockey-stick revenue growth, aggressive working capital improvement, cash conversion rate step-changes, and terminal value as a share of EV. These are the canonical sell-side inflation vectors.
- **If the balance sheet does not balance in any period**, flag as Critical immediately and note that all downstream outputs (returns, coverage ratios, cash flows) are unreliable until resolved. Do not proceed to deeper Phase 2 or Phase 3 analysis on outputs that depend on the broken period.
- **If a detailed reasonableness check is required for a specific model type** (DCF, LBO, M&A, 3-statement), defer that model-type-specific analysis to the corresponding specialist playbook. This playbook performs universal flags only.
- **If the user requests a cross-case full audit**, expand Phase 2 and Phase 3 to cover all scenarios, not just the active case.

**Judgment:**
- **Separate "broken" from "I disagree"** — Critical findings are things that are structurally or computationally wrong. Analytical Red Flags are things that function correctly but are analytically suspicious. Conflating the two signals analytical inexperience and will be challenged by any MD or IC reviewer.
- **Flag overrides and anomalies as background context, not automatic bugs** — a comment reading *"Manual override per MD"* is context, not a defect. Your job is to surface it so the user understands what they are looking at.
- **Treat version anomalies as diagnostic signals** — external links, formulas replaced with hard-coded values, mixed-author comments, and hidden content collectively indicate how many contributors have touched the model and how much structural drift may have accumulated.
- **Calibrate the one-sentence narrative before writing findings** — knowing whether the model is fundamentally a *margin story*, a *leverage story*, or a *growth story* allows you to prioritize which assumptions and findings are material to the investment thesis and which are peripheral.

---

## Pre-Delivery Checks
- Confirm every Critical finding is genuinely material — verify no formatting or style issue has been elevated to Critical severity
- Confirm every finding references a tab and cell that actually exists in the model — no phantom citations
- Confirm the Phase 1 Model Map describes what is actually in the workbook, not what should theoretically be there for this model type
- Confirm the Assumption Dashboard reflects actual current values — historical actuals vs. real historical data, projections vs. the active case (not a non-active scenario)
- Confirm finding count in Section 2 and Section 3 tables matches the count stated in the one-line summary exactly
- Confirm every Critical finding includes a quantified or directional impact on the bottom-line conclusion
- Confirm all balance sheet periods have been checked for Assets = Liabilities + Equity; any non-zero variance is Critical
- Confirm all 10 categories are recorded as applicable Pass/Fail or not_applicable with model-map reason; every applicable non-zero identity variance is Critical
- Confirm all hidden rows, columns, and tabs have been expanded and inspected
- Confirm the active scenario is correctly identified and stated in the Model Map
- Confirm terminal value as a percentage of EV is calculated and flagged if >75%
- Confirm sell-side / management models have been reviewed specifically for hockey-stick growth, working capital inflection, and cash conversion rate step-changes
- Confirm cell hyperlinks follow `HYPERLINK("#'SheetName'!CellRef","Label")` format and are navigable

---

## Scope Boundaries
This playbook covers universal audit logic applicable to all financial model types. Model-type-specific analytical reasonableness checks (e.g., mid-year convention in DCF, returns waterfall in LBO, purchase price allocation in M&A) are handled by the corresponding DCF, LBO, M&A, or 3-statement specialist playbook — defer detailed model-type reasonableness review there. Any cell-level corrections, formula rewrites, or structural rebuilds identified during the audit are out of scope here and must be handed off to the Excel Editing / Modeling playbook.

---

## Task-specific verification

Phase-1 model map defines an applicability matrix: applicable/pass/fail/not_applicable plus worksheet locator and reason. Only applicable nonzero identities are Critical. A debt-free operating model or unlevered DCF does not require acquisition S&U or nonexistent debt schedules.


# Synergy Analysis

> **Sections**: Ask First · Workflow · Defaults (apply silently, disclose at delivery) · Rules & Pitfalls · Pre-Delivery Checks · Scope Boundaries
> **Must not skip**: Rules & Pitfalls · Pre-Delivery Checks · Scope Boundaries — return here before delivery.
> **Formats**: excel_standards.md · metric_disambiguation.md

> Task `synergy-analysis` in group `financial-models`. Read [`_overview.md`](_overview.md) first for group-level scope and format dependencies.

**Use when**: Building a post-merger synergy quantification for a deal | **Deliverable**: Excel workbook (Bridge + supporting detail tabs); PowerPoint deck optional and built only on request

---

## Ask First
1. What materials are available? (employee census, P&L by department, vendor/supplier schedules, facilities data, revenue breakdown by product/geography, org chart)
2. What is the deal type and target's Adjusted EBITDA? (sole hard-coded anchor in the bridge)
3. Are revenue synergies required? (underwriting decision — do not assume yes)
4. Are dis-synergies required? (underwriting decision — do not assume yes)

---

## Workflow

1. **Intake — inventory available inputs** (determines which tabs to build; omit any tab for which no input exists rather than fabricating data)
2. **Open workbook, create tab structure**: Bridge | Headcount | Non-Headcount | Revenue Synergies *(omit if not requested)* | Dis-Synergies *(omit if not requested)* | Costs to Achieve | Assumptions
3. **Build Assumptions tab first** — define all parameters by name (Target Adj. EBITDA, Target EBITDA Margin, headcount multipliers, scenario flags); all other tabs reference parameter names, never raw cell addresses, so the tab order can be rearranged without broken links
4. **Build Headcount tab** — choose method based on available data:
   - *Bottom-up* (census available): one row per eliminated role; run-rate savings = salary × 1.25 (fully-loaded); severance = salary × 1.0 (cash only) → feeds Costs to Achieve tab
   - *Top-down* (P&L only): apply departmental redundancy rates (G&A 20%, Ops 5%, R&D 0%, Sales 0%) + Executive overlay; **before applying the 20% G&A rate, strip C-suite/senior-EVP compensation out of the G&A salary base** to prevent double-counting with the Executive overlay row
5. **Build Non-Headcount tab** — apply category defaults (see Defaults table); use blue #0000FF hardcode font on white fill for any cell where spend base is unknown and insert label `"Enter estimated annual spend"` — do not invent a number
6. **Build Revenue Synergies tab** *(only if user explicitly requested)*; apply margin treatment by sub-type (see Rules & Pitfalls — Conditional)
7. **Build Dis-Synergies tab** *(only if user explicitly requested)*; store all dis-synergy values as negatives and roll them into the signed Bridge total — do not apply a second negative sign and do not subtract them in a separate line
8. **Build Costs to Achieve tab** — one-time items only; visually and structurally separated from the run-rate bridge; retention bonuses default off unless requested
9. **Build Bridge tab last** (all cell values trace to supporting tabs; the only hard-coded value is Target Adj. EBITDA)
   - Add a Scenario dropdown (Conservative / Base / Upside) to every synergy row
   - Use SUMPRODUCT to aggregate the bridge by scenario; the same row can carry different values across scenarios (e.g., public-company costs $1.5M Conservative / $3.0M Upside)
   - Conservative/Base/Upside are outcome scenarios: cost/revenue synergies increase and dis-synergies become less negative toward Upside. Use a separate integration-stress dimension if disruption increases; never label a lower total EBITDA outcome pure Upside.
   - Add Time to Realize columns (Y1 %, Y2 %) and a **Year-1 Realized** row; auto-flag in Bridge Notes with a formula any row where Y1% ≤ 50%
   - Display zeros as dashes; use $000s for values < $1M, $MM otherwise; summary rows at top, detail below
10. **Deliver Excel** → ask whether a PowerPoint deck is also needed
11. *(If PPT requested)* Build a concise slide summary with the three-scenario bridge table + Notes column; one slide is the default only when legible. Follow the user's requested page count or template, and paginate when needed. Include a headcount-by-scenario summary row if the headcount method was used; **omit Costs to Achieve from the slide by default**

### Bridge Layout (tab-level row order)
| Row | Notes |
|---|---|
| Target Adj. EBITDA | Blue fill; only hard-coded value |
| Headcount synergies — itemized | From Headcount tab |
| Non-headcount synergies — itemized | From Non-Headcount tab |
| **Total Cost Synergies** | Sum of above |
| **Pro Forma EBITDA (Run-Rate)** | Target Adj. EBITDA + Total Cost Synergies |
| Revenue synergies — itemized *(if requested)* | From Revenue Synergies tab |
| Dis-synergies — itemized *(if requested)* | Stored as negatives; from Dis-Synergies tab |
| **Total Synergy-Adjusted Pro Forma EBITDA** | Full adjusted total |
| Costs to Achieve (One-Time) *(separate block)* | Visually separated; does not affect run-rate rows above |

---

## Defaults (apply silently, disclose at delivery)
| Parameter | Default | Rationale |
|---|---|---|
| Revenue synergies | **OFF** (entire tab + bridge section omitted; no zero rows) | Underwriting decision, not an assumption; including without user direction inflates deal value |
| Dis-synergies | **OFF** (entire tab + bridge section omitted; no zero rows) | Same underwriting discipline |
| Retention bonuses | **OFF** | Activate only on explicit user instruction |
| Run-rate headcount savings multiplier | **1.25× base salary** (covers bonus, equity comp, employer taxes, benefits) | Fully-loaded cost is the true P&L impact of eliminating a role |
| Severance (Costs to Achieve) multiplier | **1.0× base salary, cash only** | Severance is a cash outlay, not a fully-loaded obligation |
| Executive scope | **True C-suite and senior EVP only** | Functional managers/directors/analysts with "senior" in title belong in their functional department |
| G&A headcount redundancy rate | **20%** (applied only after stripping C-suite from G&A base) | Industry standard for corporate function overlap |
| R&D headcount redundancy rate | **0% floor** | Do not cut without explicit user direction |
| Sales headcount redundancy rate | **0% floor** | Same; revenue-generating roles require explicit rationale |
| Ops headcount redundancy rate | **5%** | Conservative default for operational overlap |
| Insurance savings | **6–8% of spend** | Standard market benchmark |
| Public-company costs | **$1.5M–$3.0M** | D&O, SEC filings, board fees, audit premium |
| Software/SaaS savings | **15–20% of spend** | License consolidation typical range |
| Professional services savings | **10–15% of spend** | Outside counsel, accounting, consulting overlap |
| Facilities savings | **10–15% of spend, or $28/sqft** | Use whichever has better data support |
| Procurement savings | **User input required; no default** | Highly deal-specific; do not fabricate |
| G&A non-headcount catch-all | **5% of G&A non-headcount spend** | Used only when zero line-item breakdown is available |
| Scenario default classification | Conservative: C-suite redundancy, public-company costs, insurance, clear software overlap; Base: G&A headcount, professional services, facilities; Upside: facilities consolidation, procurement, revenue synergies, ops headcount | Reflects increasing confidence/execution risk |
| Payback period denominator | **Year-1 Realized synergies** (not run-rate) | Using run-rate overstates payback speed |
| Assumption cell formatting | **Yellow highlight + comment** | Flags every editable assumption for reviewer |
| Number format threshold | **$000s if < $1M; $MM if ≥ $1M** | Readability |

---

## Rules & Pitfalls

**Never:**
- Never hard-code any synergy value directly in the Bridge — every line must trace to a supporting tab; the only permissible hard-coded value is Target Adj. EBITDA, because breaking traceability makes the model unauditable and kills reviewer confidence
- Never populate revenue synergies or dis-synergies without explicit user input — both are underwriting decisions, not modeling assumptions; filling them in speculatively inflates the deal thesis and misrepresents what has been diligenced
- Never apply the 1.25× fully-loaded multiplier to severance — severance is a cash payment equal to 1.0× base salary; conflating the two overstates one-time costs and understates run-rate savings
- Never let Costs to Achieve flow into or reduce the run-rate EBITDA bridge — one-time costs are not run-rate improvements; mixing them causes the Pro Forma EBITDA line to be wrong on both a run-rate and transaction basis
- Never apply the 20% G&A redundancy rate to a salary base that still includes C-suite compensation when an Executive overlay row is also present — this double-counts the C-suite reduction and overstates headcount synergies
- Never cut Sales or R&D headcount beyond the 0% floor without an explicit user instruction and rationale — zero is the floor, not a placeholder
- Never invent a spend base — if category spend is unknown, insert a blue-font, white-fill placeholder cell with a source comment with the label `"Enter estimated annual spend"` and leave the synergy value blank
- Never back-solve revenue or EBITDA margin to imply a revenue figure — leave the cell blank with a source comment rather than plugging an implied number
- Never count the same synergy in more than one line or category — each dollar of synergy lives in exactly one row
- Never mix periods (different fiscal years or quarters) in the same bridge column — maintain apples-to-apples comparability across all inputs
- Never place dis-synergy values as positives and then subtract them separately — store as negatives and include in the signed total so the arithmetic is self-evident

**Conditional:**
- If the user provides an IC memo, CIM, or management presentation, those stated figures override every default — user-supplied documents take unconditional precedence
- If only a top-down P&L is available (no census), apply departmental redundancy rates; if a census is available, switch to bottom-up and build one row per eliminated role
- If a synergy row has Y1 realization ≤ 50%, automatically insert a formula-driven flag in the Bridge Notes column — no separate phasing schedule is needed, but the timing risk must be visible
- If the payback period calculates to < 1.0 year using Year-1 Realized synergies, flag the result explicitly — this almost always means run-rate is being used inadvertently or the Costs to Achieve are understated
- If the user requests revenue synergies, apply margin by sub-type: pricing synergies at 100% margin (pure flow-through; note the assumption of zero volume loss or churn); cross-sell, geographic expansion, and volume at the target's existing EBITDA margin (from the Assumptions tab Target EBITDA Margin parameter); new product or other categories require user-supplied margin input
- If the user explicitly confirms high confidence in a synergy category, reclassify it upward (e.g., Conservative → Base) — document the rationale in the Assumptions tab

**Judgment:**
- Prefer bottom-up headcount analysis whenever a census exists — it is more defensible in diligence and IC review than top-down rates, because each eliminated role can be named and explained
- Flag every row where Y2 realization is assumed (i.e., Y1% < 100%) with a note in Bridge Notes — reviewers will ask about phasing risk and the model should surface it proactively rather than burying it
- When classification of a role is ambiguous (e.g., a "Senior Director of Finance" who reports to the CFO), default to the functional department (Finance/G&A), not Executive — the Executive tier should be narrow enough to defend to a skeptical IC
- Scenario boundaries are cumulative: every item in Conservative must also appear in Base and Upside; do not allow a line to exist in Base but not Upside, as this implies higher confidence assumptions are excluded from the optimistic case — which is internally inconsistent

---

## Pre-Delivery Checks
- Confirm every Bridge row traces to a cell in a supporting tab; verify no synergy value is hard-coded in the Bridge except Target Adj. EBITDA
- Confirm Conservative ≤ Base ≤ Upside for total synergy-adjusted EBITDA; any integration-stress exception is separately labeled and explained.
- Confirm Costs to Achieve rows are in a visually separated block and do not affect any run-rate EBITDA line above them
- Confirm severance uses 1.0× base salary (cash) and run-rate headcount savings use 1.25× fully-loaded — verify these are not swapped
- Confirm Revenue Synergies and Dis-Synergies tabs and bridge sections are entirely absent (no zero rows, no section headers) if the user did not request them
- Confirm dis-synergy values are stored as negatives and not double-negated anywhere in the bridge
- Confirm the Executive overlay and G&A 20% redundancy rate are applied to mutually exclusive salary bases — no C-suite compensation appears in both
- Confirm all assumption hardcodes use blue #0000FF font, white fill, and source comments and no spend base has been fabricated (all unknowns show the placeholder label)
- Confirm the Payback Period calculation uses Year-1 Realized synergies as the denominator, not run-rate; flag if result < 1.0 year
- Confirm all period data is consistent (same fiscal year or LTM period) across Target Adj. EBITDA, margin parameters, and headcount cost inputs
- Confirm SUMPRODUCT scenario logic is correct: changing a row's Scenario dropdown updates the Bridge total without manual intervention
- Confirm no formula errors (#REF!, #DIV/0!, #VALUE!) exist in any tab
- Confirm number formatting: values < $1M displayed in $000s; values ≥ $1M displayed in $MM; zeros displayed as dashes

---

## Scope Boundaries
The **Merger Model** playbook consumes synergy outputs as a single input line within a full accretion/dilution or merger consequence analysis — build the synergy bridge here, then hand off the total to that model. The **Bolt-On / LBO** playbook handles synergy phase-in scheduling within a roll-up or leveraged buyout context. The **Quality of Earnings** playbook owns historical EBITDA normalization and one-time addback analysis — do not re-adjust the Target Adj. EBITDA anchor here; take it as given from QoE output or user input.

---


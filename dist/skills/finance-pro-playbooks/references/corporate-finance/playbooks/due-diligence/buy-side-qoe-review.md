# Buy-Side QoE Review

> **Sections**: Ask First · Workflow · Defaults · Rules & Pitfalls · Pre-Delivery Checks · Scope Boundaries
> **Must not skip**: Defaults · Rules & Pitfalls · Pre-Delivery Checks · Scope Boundaries — return here before delivery.
> **Formats**: excel_standards.md · metric_disambiguation.md

> Task `buy-side-qoe-review` in group `due-diligence`. Read [`_overview.md`](_overview.md) first for group-level scope, shared operating principles, and format dependencies.

**Use when**: A sell-side QoE report is available and the buyer needs an independent underwrite of true go-forward EBITDA | **Deliverable**: Excel workbook (Buyside tab + Source tabs) with optional PowerPoint stoplight deck

---

## Ask First
1. **Output scope** — Excel only, or Excel + PPT stoplight?
2. **Participation mode** — (a) full build: populate accept/reject/partial decisions directly; (b) guided review: walk through each item and provide recommendations for user to decide; or (c) blank framework only: build the shell without populating decisions?
3. **Conservatism stance** — 1 through 5 (1 = most conservative, 5 = most aggressive)?
4. **Buyer adjustments** — Has the buyer identified any under-burdened cost items or buyer-specific synergies to include in the Buyer Adjustments section at the bottom?

---

## Workflow

1. **Ingest source material** — If an Excel file is provided, fully verify calculations, flag inconsistencies, and identify missing adjustments. If PDF only, extract line items from each section of the sell-side QoE, and flag any cross-section conflicts or contradictions. *(PDF requires manual extraction before any build step; resolve conflicts before populating decisions.)*

2. **Map sell-side adjustments** — List every sell-side addback and pro-forma adjustment exactly as presented in the report. Do not alter lookback periods; use the report's stated LTM and/or fiscal year periods as-is.

3. **Apply conservatism stance item by item** — Evaluate each adjustment against the governing question: *Does this item normalize the business to its true go-forward earnings?* Apply the stance consistently across all items (see Rules & Pitfalls). Flag any unfamiliar adjustment types to the user before deciding.

4. **Identify missed adjustments** — Flag items the sell-side could have adjusted but did not, in either direction. *(Sell-side reports can under-adjust as well as over-adjust; surface both.)*

5. **Build the Excel workbook** *(dependency: steps 2–4 must be complete before building)*
   - Place the **Buyside tab first**, formatted in a distinct color scheme
   - Place all source data tabs **after a "Source >>" divider tab**
   - Link every Buyside value to the source tab via formula — hard-code **no pre-existing values**
   - For each adjustment, apply IF logic: Accept → link to sell-side value; Reject → 0; Partial → custom placeholder
   - Maintain a **single hard-coded selection source**: Accept / Reject / Partial decisions live in exactly one tab; all other references pull from it
   - Add a **Buyer View dropdown** per line with conditional formatting: green = Accept, yellow = Partial, red = Reject
   - Add a **Buyer Commentary column** for each item
   - Any period where a decision is neither full Accept nor full Reject must be marked Partial
   - Add a **Buyer Adjustments section** at the bottom (separate from the QoE bridge) for buyer-identified synergies or under-burdened costs — never commingle with the sell-side adjustment items
   - Format for print: one page wide, repeat headers on each printed page

6. **Build PPT stoplight** *(if requested; dependency: Excel must be final)*

   #### PPT Stoplight Layout

   **Slide 1 — Executive Summary**
   - Sell-side → buyer-side adjusted EBITDA bridge
   - Key drivers of the difference
   - Critical diligence questions requiring follow-up
   - Summary count and dollar value of Accepted / Partial / Rejected items

   **Slide 2+ — Stoplight Page(s)**
   - *Left two-thirds*: table running from reported EBITDA to fully adjusted EBITDA; columns: sell-side periods (2–4 columns) + buyer-side periods (2–4 columns) + optional variance column; each row has a numbered color block on the left (green / yellow / red)
   - *Right one-third*: numbered commentary keyed to the color blocks — each entry: bolded and underlined adjustment name, description, buyer view, and rationale in sufficient detail that a reader without the Excel can form a judgment
   - Include a color legend
   - Slide title must **not** reference the conservatism stance (do not write "conservative" or "aggressive" in any title)
   - If content does not fit on one slide, paginate as (1/N), (2/N), etc.
   - All figures must tie exactly to the Excel

7. **Run pre-delivery checks** *(see section below)*

---

## Defaults

| Parameter | Default / override |
|---|---|
| Conservatism stance | 3 (balanced) if user does not specify |
| Lookback period | Use report's stated LTM / FY periods unchanged |
| Participation mode | Guided review (mode b) if user does not specify |
| Hardcode source for Accept / Reject / Partial | Single tab only |
| Sell-side view | Replicated exactly as reported |
| Revenue pro-forma without corresponding cost | Partially reverse; record at segment gross margin rate |
| SBC threshold for accept consideration | < 3–5% of revenue |
| Owner / related-party compensation | Adjust to market rate; do not zero out |
| M&A transaction fees — serial acquirer | Conservative default: treat as recurring |
| Sponsor management fee | Accept addback unless fee continues post-close |
| Capitalized software development costs | Do not accept addback; treat as recurring |

---

## Rules & Pitfalls

**Never:**
- **Never accept the sell-side's adjusted EBITDA at face value**
- **Never hard-code a pre-existing value in the Buyside tab**
- **Never place Accept / Reject / Partial decisions in more than one tab**
- **Never include buyer synergies inside the QoE adjustment bridge** — buyer synergies belong in a separate Buyer Adjustments section; including them in the QoE bridge overstates normalized standalone EBITDA and conflates two economically distinct concepts
- **Never accept a "one-time" item that appears in two or more periods**
- **Never add back revenue pro-forma without the corresponding COGS / expenses required to deliver it** — doing so overstates margins and distorts the go-forward EBITDA; at minimum, apply a partial reversal at the relevant segment gross margin rate
- **Never accept capitalized software development costs as an addback**

**Conditional:**
- **If an earnout is structured as retention compensation rather than true contingent consideration**, reject the addback — it is a recurring labor cost dressed as a deal cost
- **If a legal, consulting, or restructuring cost is industry-endemic** (e.g., regulatory legal fees in healthcare or insurance), treat as recurring and reject; accept only if the item is demonstrably isolated and non-recurring relative to that industry's norms
- **If a pro-forma revenue item lacks a signed contract or committed ramp**, reject under stance 1–2; at stance 4–5, partial acceptance requires documented support
- **If a price increase pro-forma is presented**, at minimum apply a partial reversal — price increases carry volume risk and cannot be accepted at face value without demand elasticity support
- **If the sell-side Excel is provided**, verify all arithmetic before populating decisions; flag calculation errors and cross-adjustment contradictions before proceeding
- **If stance is 1–2 (conservative)**, accept only items that are: (a) documented one-time events, or (b) signed / already-implemented pro-formas; reject speculative, unsigned, synergy-dependent, or recurring-in-disguise items
- **If stance is 4–5 (aggressive)**, accept items a reasonable person could view as valid run-rate adjustments with supporting evidence; apply partial for items with 3+ periods of recurrence rather than outright rejection
- **If any adjustment type is unfamiliar or ambiguous**, flag it to the user before assigning a decision — do not default to accept or reject without disclosure
- **If the buyer view or stance is changed post-build**, verify that all subtotals and the adjusted EBITDA total update dynamically through the formula chain; no subtotal should require manual override

**Judgment:**
- **Owner / related-party compensation at well-below-market rates signals under-burdening** — a CEO compensated at $200K is a classic example; the correct treatment is to adjust upward to market rate, not to accept the addback as presented, because the go-forward business will bear the market rate
- **High-growth software companies with large SBC are structurally different from mature businesses** — in high-growth software, SBC is a core recurring compensation mechanism, not a non-cash anomaly; do not accept the addback even if the dollar amount appears modest relative to size
- **Treat method transparency as non-negotiable for all pro-forma and run-rate items** — regardless of whether you accept or reject, document the methodology and flag it in the Buyer Commentary column so diligence can verify
- **Look for missed adjustments actively, not passively** — the sell-side may have left legitimate buyer-favorable normalizations on the table; surfacing these builds credibility with the IC and produces a more accurate go-forward EBITDA
- **Prefer substance over label when categorizing items** — an item labeled "restructuring" that recurs annually is an operating cost; an item labeled "operating" that is genuinely isolated may qualify for acceptance; apply the governing test (*does this normalize to true go-forward earnings?*) rather than relying on the sell-side's category heading

---
## Pre-Delivery Checks
- The sell-side view in the model **ties exactly** to every figure in the sell-side QoE report — no rounding, no reclassification
- Reported EBITDA + sum of all adjustments = sell-side adjusted EBITDA (the bridge must foot and tie out)
- Scan all adjustment items for **double-counting** (two items capturing the same economic event) and **contradictory logic** (an item accepted in one period and rejected in another without explanation)
- Every figure in the PPT stoplight ties exactly to the corresponding cell in the Excel workbook, especially the final buyer-side adjusted EBITDA
- That changing the Buyer View dropdown on any line item causes the buyer subtotal and adjusted EBITDA total to update automatically — no static values downstream
- There is **exactly one hard-coded selection source** for Accept / Reject / Partial across the entire workbook
- All Buyside tab cells link to the source tab and no pre-existing numerical values are hard-coded
- Row alignment between source tab and Buyside tab — verify cell references are not offset by inserted or deleted rows
- Any adjustment appearing in **2 or more periods without a full-Accept rationale** is marked Partial or Reject
- The Buyer Adjustments section is physically separated from the QoE bridge and contains no sell-side adjustment items
---

## Scope Boundaries
Only an independent buyer-side review of an existing sell-side QoE is in scope. Building a sell-side QoE from raw financials and using its output in a broader screening checklist are separate workflows.

---


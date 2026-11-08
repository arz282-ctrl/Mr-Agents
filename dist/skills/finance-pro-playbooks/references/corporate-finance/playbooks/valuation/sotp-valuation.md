# SOTP Valuation

> **Sections**: Ask First · Workflow · Defaults · Rules & Pitfalls · Pre-Delivery Checks · SOTP Summary Table Structure · Scope Boundaries · Task-specific verification
> **Must not skip**: Defaults · Rules & Pitfalls · Pre-Delivery Checks · Scope Boundaries — return here before delivery.
> **Formats**: excel_standards.md · metric_disambiguation.md

> Task `sotp-valuation` in group `valuation`. Read [`_overview.md`](_overview.md) first for group-level scope, shared defaults, and format dependencies.

**Use when**: A multi-segment company requires segment-level valuation with distinct growth, margin, or risk profiles | **Deliverable**: Excel workbook with SOTP summary table, explicit equity bridge block, and sensitivity tables; supporting segment comp sheets

---

## Ask First
1. Which business segments should be valued — use the company's self-reported segment disclosures (10-K/10-Q/earnings supplements) as the authoritative starting point; confirm if any segments should be combined or split differently.
2. What is the valuation purpose — conglomerate discount analysis, spin-off / RemainCo sizing, activist break-up thesis, or internal portfolio review? (Drives which optional modules to build.)
3. Are broker SOTP reports available for this company? If yes, obtain them before building — use as a reference baseline and document any departures.
4. Is a spin-off scenario required? If yes, confirm availability of separation cost estimates, dis-synergy assumptions, and intended debt allocation.

---

## Workflow

1. **Identify segments and extract financials from self-reported disclosures** (10-K/10-Q/earnings supplement segment footnotes). Reconcile inter-segment revenue eliminations so that segment revenues sum to consolidated revenue. This anchors every subsequent step to audited, company-defined figures rather than top-down estimates.

2. **Classify each segment by nature and assign a valuation method** (determines peer universe in Step 3):
   - Mature / profitable → EV/EBITDA comps
   - Unprofitable / high-growth → EV/Revenue comps
   - Real estate / heavy asset → NAV
   - Biotech pipeline → probability-weighted DCF (rNPV)

3. **Build a dedicated peer group for each segment**; pull LTM (default) trading multiples. Flag any outlier peer trading at >2× the median — present two versions of the range, with and without that peer. Derive a low/high multiple range per segment using 25th/75th percentile as boundary defaults.

4. **Apply normalized (adjusted) EBITDA or the appropriate metric to each segment** before applying multiples. Strip one-time items before this step; never apply multiples to unadjusted figures containing one-time charges.

- Present methods as mutually exclusive selected valuation and cross-check; one included value per segment.

6. **Capitalize corporate overhead as a standalone negative EV line**. Do not bury it in any segment, do not ignore it, and do not deduct it in both a segment and the overhead line (double-count is the most common mechanical error here).

7. **Build the equity bridge using the consolidated balance sheet** (not segment-level balance sheets). Include, on separate signed lines: + Cash / + Equity investments / + NOL value / − Total debt / − Preferred equity / − Non-controlling interests (NCI) / − Unfunded pension obligations → **Implied Equity Value** → Diluted shares (treasury stock method, TSM) → **Implied Share Price (bold)** → Current price → Premium / (Discount).

8. **Compute % of Total Combined EV per segment** and flag any segment exceeding 80% of Combined EV — at that threshold the marginal benefit of SOTP over a single-entity valuation is minimal and must be disclosed.

9. **Build sensitivity tables**: primary segment multiple × secondary segment multiple as a two-way table; if DCF is used, discount rate × terminal growth rate; optionally, conglomerate discount % × implied share price. Place the base case at the center cell of each table.

10. **Run spin-off scenario (if requested)**: model separation costs, dis-synergies, tax leakage, debt allocation to each entity, and post-separation stand-alone values. A spin-off scenario that omits dis-synergies or a debt allocation assumption is incomplete.

11. **Perform all pre-delivery sanity checks** (see Pre-Delivery Checks below) before sharing output.

---

## Defaults

**Apply defaults only where the caller has not selected a format or supplied a required assumption; disclose them at delivery.**

| Parameter | Default / override |
|---|---|
| Earnings metric period | LTM; explicitly flag NTM segment use |
| Multiple range boundaries | 25th / 75th percentile of peer set |
| Outlier peer | >2x peer median; present with and without |
| Precedent multiples | Separate reference row only; never merge with comps range |
| Corporate overhead | Standalone negative EV line |
| Equity bridge balance sheet | Consolidated, not segment-level |
| Share count for implied price | TSM diluted shares |
| Conglomerate discount sensitivity | 0–20% |
| Flags | Single segment >80% of Combined EV; segment multiple >30% from peer median |

## Rules & Pitfalls

**Never:**
- **Never apply a single blended multiple to consolidated financials** — it masks value in premium segments and inflates value in weaker ones, destroying the entire analytical rationale for SOTP.
- **Never estimate segment financials via top-down ratios when self-reported segment disclosures exist** — actual disclosures are audited and defensible; constructed estimates introduce unverifiable assumptions that reviewers will immediately challenge.
- **Never bury corporate overhead inside a segment or omit it** — either approach misattributes the overhead drag and produces an inflated Combined EV that cannot be reconciled to reality.
- **Reconcile the consolidated equity bridge once** — use sourced segment-level assets/debt/claims where genuinely attributable and appropriate to the selected method, then reconcile allocations and shared claims to the consolidated balance sheet. Do not double-count cash, debt, NCI, pensions or tax assets across segments and the final bridge.
- **Never use basic share count for implied share price** — it overstates per-share value and is an immediate credibility failure with any sophisticated reviewer.
- **Never apply NTM multiples to LTM financial metrics within the same segment** — mixing periods produces a mathematically inconsistent implied value; flag any cross-period use explicitly.
- **Never merge precedent transaction multiples into the trading comps range** — transactions embed a control premium; blending them inflates the high end of the range without disclosure.
- **Never count NOL value twice** — if NOL is modeled inside a segment DCF (as a tax shield), do not add it again as a positive item in the equity bridge; and conversely, if it is in the bridge, ensure it is absent from segment DCFs.
- **Never apply multiples to unadjusted EBITDA containing one-time items** — normalize (strip non-recurring charges) before applying any multiple.

**Conditional:**
- If a single segment exceeds 80% of Combined EV, flag that the SOTP structure provides limited incremental insight over single-entity valuation, and disclose this to the reader before presenting conclusions.
- If broker SOTP reports exist for the company, use them as the reference starting point; document and explain every material departure from their segment definitions, peer choices, or methodology.
- If LTM and NTM metrics are mixed across segments (unavoidable in some cases), flag every mixed-period cell in the SOTP table — do not leave mixed periods unmarked.
- If a spin-off scenario is built, it must include separation costs, dis-synergies, tax leakage, debt allocation to each resulting entity, and a post-separation stand-alone value comparison; omitting any of these four elements makes the scenario analytically incomplete.
- If a segment peer is flagged as an outlier (>2× median), present the multiple range in two versions — including and excluding the outlier — and let the user choose which to carry forward.
- If conglomerate discount is a key output, build a two-way sensitivity table with discount assumption (0–20%) against implied share price.

**Judgment:**
- Match valuation method to segment economics, not to convenience — forcing EV/EBITDA onto an unprofitable growth segment or a real-estate-heavy segment produces a meaningless implied value; choose EV/Revenue, NAV, or rNPV where those are the industry standard.
- Prefer company self-reported segment definitions over analyst-constructed reclassifications — internal definitions reflect how management allocates capital and how peers report, making comparisons cleaner.
- When a segment multiple deviates more than 30% from the peer median, provide a written rationale (higher growth, structurally different margin profile, different capital intensity) rather than silently accepting the deviation — silence reads as an error to reviewers.
- A conglomerate discount showing SOTP value above market price is an expected and analytically valid output; treat it as a key finding, not a model error, and stress-test the discount assumption in the sensitivity table.

---

## Pre-Delivery Checks

- Segment revenue net of eliminations and segment EBITDA plus overhead reconcile to consolidated results.
- Combined EV, adjusted Combined EV, and the explicit signed equity bridge foot exactly.
- Implied blended multiple is reasonable against sector trading/transaction ranges; >80% segment concentration and >30% multiple deviations are disclosed and justified.
- NOL appears once; precedent multiples remain reference-only; one-time items are stripped; TSM shares are used.
- Each two-way sensitivity has base case centered; spin-off requirements pass when applicable.

## SOTP Summary Table Structure

### Main Table Layout

| Column | Content |
|---|---|
| Segment | Segment name (per self-reported disclosure) |
| Metric | Applicable financial metric (e.g., EBITDA, Revenue, NAV) |
| Low Multiple | 25th percentile of peer range |
| High Multiple | 75th percentile of peer range |
| Implied EV — Low | Metric × Low Multiple |
| Implied EV — High | Metric × High Multiple |
| % of Total EV | Segment midpoint EV ÷ Combined EV midpoint |

**Row order:**
1. Each operating segment (comps range rows)
2. Segment DCF range row (if applicable — labeled clearly as DCF, not merged with comps)
3. Blended range row (if any hybrid is presented — labeled and explained)
4. **Combined EV** (sum of all segment rows)
5. **(−) Corporate Overhead** (capitalized negative EV, shown as a deduction)
6. **Adjusted Combined EV**

### Equity Bridge Block (below main table — every item on its own signed line with source notation)

```
Adjusted Combined EV (Low / High)
  + Cash and cash equivalents                [Consolidated B/S]
  + Equity investments / minority stakes     [Consolidated B/S]
  + NOL value                                [Tax footnote — only if not in segment DCF]
  − Total debt (gross)                       [Consolidated B/S]
  − Preferred equity                         [Consolidated B/S]
  − Non-controlling interests (NCI)          [Consolidated B/S]
  − Unfunded pension obligations             [Pension footnote]
  ─────────────────────────────────────────
  = Implied Equity Value (Low / High)
  ÷ Diluted shares outstanding (TSM)
  ─────────────────────────────────────────
  = **Implied Share Price (Low / High)**
    Current share price
    Premium / (Discount) to current price
```

### Sensitivity Tables

- **Table 1 — Primary segment multiple × Secondary segment multiple** (two-way; base case at center)
- **Table 2 — Discount rate × Terminal growth rate** (if DCF used in any segment; base case at center)
- **Table 3 (optional) — Conglomerate discount % × Implied share price** (0–20% range; base case at center)

---

## Scope Boundaries

DCF handles single-entity discounted cash flow modeling and provides segment-level DCF inputs where needed; it does not produce segment-aggregated equity bridge output. Public Comps handles universe screening, multiple calculation, and trading comparable analysis at the whole-company level. The 3-Statement Model provides the integrated financial forecast from which segment operating metrics are sourced when management guidance is required.

---

## Task-specific verification

Exactly one selected value per segment enters Combined EV. A DCF/comps cross-check is displayed but excluded from the sum. Blends require explicit weights closing to one: comps100/DCF120 at 50/50 gives110, never220. Carry selected_method, selected_value, cross_check_value and inclusion_flag.


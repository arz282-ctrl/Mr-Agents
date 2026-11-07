# DCF Model

> **Sections**: Ask First · Workflow · Defaults · Rules & Pitfalls · Pre-Delivery Checks · Scope Boundaries
> **Must not skip**: Defaults · Rules & Pitfalls · Pre-Delivery Checks · Scope Boundaries — return here before delivery.
> **Formats**: excel_standards.md · metric_disambiguation.md

> Task `dcf-model` in group `valuation`. Read [`_overview.md`](_overview.md) first for group-level scope, shared defaults, and format dependencies.

**Use when**: Building a standalone discounted cash flow valuation for a company | **Deliverable**: Excel workbook (DCF tab + WACC tab) formatted for direct PPT screenshot extraction

## Ask First
1. Which capital structure to use when relevering beta — target company's own structure, the comparable-company average, or a user-specified optimal structure?
2. Is a management-case forecast available, or should the model rely on consensus estimates / broker research / internally constructed assumptions?
3. What is the valuation date (default: most recent fiscal year-end)?
4. Are public bonds outstanding for the cost-of-debt calculation, or must interest expense / average debt be used?

## Workflow

1. **DCF Tab — Key Assumptions cell block** — Lock in valuation date, marginal tax rate, diluted share count (TSM), cash, debt, and terminal value method selection. *(Define all inputs before writing any formula; later row changes require dependency mapping and reference validation.)*
2. **DCF Tab — Free Cash Flow build and discounting** — Construct the Revenue → UFCF schedule and compute the NPV of each year's cash flow using mid-year convention. *(Revenue drives everything below it; complete the full FCF structure before introducing discount factors.)*
3. **DCF Tab — Terminal value, equity bridge, and sensitivity table** — Calculate both terminal value methods in parallel (perpetuity-growth left, exit-multiple right), run the equity bridge under each, and generate sensitivity tables dynamically. *(Terminal value sizing must be confirmed before the equity bridge can foot.)*
4. **WACC Tab — Key Assumptions cell block** — Enter risk-free rate, equity risk premium, cost of debt, and size premium. *(Build WACC after the DCF shell exists so tax rate and capital structure can be linked in rather than re-entered.)*
5. **WACC Tab — Comparable-company beta analysis** — Unlever each comp's raw beta, summarize the distribution, and select the relevered beta using the capital structure confirmed in Ask First Q1.
6. **WACC Tab — CAPM and WACC calculation** — Compute cost of equity via CAPM, then blend to WACC using the target capital structure.
7. **Link WACC back into DCF discount factors** — Make the model fully dynamic so any assumption change propagates end-to-end; then run the full sanity-check suite before delivery.

### Deliverable Layout (PPT-ready format)
Structure each tab so any analyst can screenshot a region directly into a slide deck without reformatting:

- **Top of DCF tab**: Revenue → EBITDA → UFCF schedule with annual columns
- **Below FCF schedule**: Terminal value block (perpetuity-growth | exit-multiple side by side), NPV summary, equity bridge, implied share price — both methods in parallel columns
- **Bottom of DCF tab**: D&A, capex, and NWC detail tables *(these are working paper rows; do not surface them in PPT by default)*
- **Sensitivity tables**: WACC vs. perpetuity-growth rate; WACC vs. exit multiple — right-aligned beside their respective terminal value blocks

### Dual Terminal Value Display
Present both methods simultaneously — never a dropdown toggle:

| Column group | Perpetuity Growth (left) | Exit Multiple (right) |
|---|---|---|
| Terminal value formula | FCF_{n+1} / (WACC − g) | Multiple × EBITDA_{reference year} |
| Equity bridge | ✓ | ✓ |
| Implied share price | ✓ | ✓ |
| Cross-validation output | Implied exit multiple | Implied growth rate |

### Sensitivity Table Construction
- Center value: blue hard-input cell equal to the DCF base-case result
- All axis values: formula-driven as `center ± offset` (no hard-coded axis labels)
- Output cells: data-table formula referencing WACC and the relevant terminal value driver
- Entire table regenerates automatically when the center cell changes

## Defaults

**Apply defaults only where the caller has not selected a format or supplied a required assumption; disclose them at delivery.**

> **Timeliness statement (market-sensitive parameters):** Values marked `[market-sensitive]` are 2026-06 fallback benchmarks only. Obtain current authoritative values (Kroll/Duff & Phelps, current government-bond yields, and the target jurisdiction’s tax regime) where available. If a fallback is used, record its parameter, value, and `unverified current value` flag in the assumption record.

| Parameter | Default / override |
|---|---|
| Forecast period | 5 years |
| Discounting convention | Mid-year: 0.5, 1.5, 2.5, 3.5, 4.5 |
| Valuation date | Most recent fiscal year-end |
| Tax rate | Federal + state for HQ jurisdiction; 25% if unavailable `[market-sensitive]` |
| Perpetuity growth rate | 2.5% `[market-sensitive]` |
| Exit multiple metric | LTM EBITDA based on current trading / comparable-company / precedent levels |
| Equity risk premium | Latest Duff & Phelps publication; 5.5% if unavailable `[market-sensitive]` |
| Size premium | Kroll decile corresponding to market cap |
| Cost of debt | Public-bond YTM → interest expense / average debt → risk-free rate + credit spread |
| Forecast inputs | Consensus → broker research → internal assumptions; taper revenue growth to long-run industry rate and hold margins stable |

## Rules & Pitfalls

**Never:**
- **Use the appropriate point-in-time valuation denominator** — start with outstanding shares and reconcile applicable options, warrants, awards and convertibles using their actual settlement terms. TSM is not the method for every instrument; if no incremental dilution applies, diluted shares may equal basic shares. Match numerator cash/debt treatment to the denominator.
- **Never hard-code values inside formulas** — the entire value of a DCF is the live, interactive model that MDs and IC members stress-test in real time. A buried constant silently breaks that contract and will be caught.
- **Map dependencies before changing rows** — preserve the requested structure; after insertion or deletion, verify formulas, named ranges, tables, charts and cross-sheet links with the actual editing tool. Define the initial row structure before entering formulas when building a new workbook.
- **Use a sourced cash-tax forecast for FCFF** — reconcile marginal rates, NOLs and temporary differences explicitly; a book effective rate is not automatically a cash-tax rate. WACC uses the applicable marginal tax shield. A different forecast cash rate is valid when the tax bridge explains it.
- **Normalize terminal reinvestment to the assumed growth** — exclude transient capex/NWC spikes but include the recurring maintenance and growth investment needed to sustain terminal g. A positive-growth perpetuity cannot assume away the reinvestment required to produce that growth; reconcile the terminal cash flow and return assumptions.
- **Never silently swallow model errors** — flag every #REF!, #DIV/0!, and any anomalous output to the user rather than masking or ignoring it.

**Conditional:**
- **If terminal value as a percentage of EV falls outside ~50–70%**, flag this explicitly to the user. A terminal value below 50% suggests an overly pessimistic long-run view; above 90% indicates the explicit forecast period is doing almost no work — both signal unbalanced assumptions requiring review.
- **If using an NTM exit multiple**, apply it to the EBITDA of the year *after* the terminal year (year n+1). If using an LTM exit multiple, apply it to the terminal year's EBITDA. Mismatching vintage to multiple is a common hidden error.
- **If implied share price deviates more than ±30–50% from the current market price**, flag the gap with a note that it may reflect a genuine market mispricing, but do not automatically adjust assumptions to close it — the deviation is information, not a bug.
- **If the company has net cash (cash exceeds gross debt)**, net debt is negative; the equity bridge must add back this net cash position, increasing implied equity value. Confirm the sign convention is correct before delivery.
- **If a public bond is unavailable and the company carries no debt**, estimate cost of debt as the risk-free rate plus an appropriate credit spread consistent with the company's implied rating.

**Judgment:**
- **Run a reverse DCF (market-implied analysis) as a reality check** — back-solve the growth rate and/or exit multiple that the current share price implies. If the implied growth rate exceeds ~5% or the implied multiple is materially above the comparable-company range, your forward assumptions may be too aggressive or too conservative; investigate before finalising.
- **When selecting comparable companies for beta**, prefer relevance (business model, geography, end-market) over size. A closer business analogue with a noisier beta is more defensible than a large-cap with a cleaner beta but a different risk profile.
- **D&A and capex should converge in the terminal year** — a sustained D&A >> capex gap implies the asset base is shrinking, which is inconsistent with a going-concern perpetuity assumption.

## Pre-Delivery Checks

- PGR does not exceed risk-free rate; WACC sits in the appropriate 7–9% / 9–12% / 12–15% band at ≈4% risk-free, adjusted and noted if the current 10-year Treasury differs materially.
- Every unverified `[market-sensitive]` fallback is flagged in the assumption record.
- `NPV(FCFs) + NPV(TV) = EV`; discount factors decline monotonically; net-debt sign is correct.
- TSM shares, terminal normalization, D&A/capex convergence, sensitivity centers, and NTM/LTM exit-multiple vintage pass.
- No `#REF!`, `#DIV/0!`, or unintentional circular errors remain; an implied-price deviation outside ±30–50% from spot is flagged.

## Scope Boundaries
Comparable company analysis (trading comps) and precedent transaction analysis are handled by their respective playbooks; the beta comp table built here feeds the WACC but does not replace a full trading-comps deliverable. Capital structure optimisation and LBO entry/exit analysis are out of scope and require separate models. Merger-consequence analysis (accretion/dilution, contribution analysis) is handled by the M&A model playbook.

---


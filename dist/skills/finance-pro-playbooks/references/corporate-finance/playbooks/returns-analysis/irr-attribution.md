# IRR Attribution

> **Sections**: Ask First · Workflow · Defaults (apply silently, disclose at delivery) · Rules & Pitfalls · Pre-Delivery Checks · Scope Boundaries
> **Must not skip**: Rules & Pitfalls · Pre-Delivery Checks · Scope Boundaries — return here before delivery.
> **Formats**: excel_standards.md · metric_disambiguation.md

> Task `irr-attribution` in group `returns-analysis`. Read [`_overview.md`](_overview.md) first for group-level scope, shared defaults, and format dependencies.

**Use when**: Attributing sources of LBO equity IRR to operating, inorganic, structural, and leverage components | **Deliverable**: IRR Decomposition panel embedded in the LBO returns/output page, integrated with the LBO model — 4-column waterfall table with live tie-out flag

---

## Ask First
1. What is the entry multiple basis — LTM or NTM EBITDA? (Determines whether the LTM→NTM step-up rolls into Base Unlevered Yield or is isolated downstream.)
2. Are there any inorganic levers (cost synergies, sale-leaseback, tax shield, De Novo, tuck-in M&A, transformational M&A) to include, and are any financed with a Delayed Draw Term Loan (DDTL)?
3. Does the base case include any cash sweep below 100% on the unlevered side? (Triggers a standalone Balance Sheet Cash Drag line.)
4. What are the target exit years for hold-period sensitivity? (Minimum: Year 3 and Year 5; flag if any are non-integer years requiring XIRR.)

---

## Workflow

Build the panel as a **13-step toggle waterfall**: activate one toggle at a time, recalculate the cumulative IRR at each step, and record the delta as that lever's attributed contribution. The fixed sequence is non-negotiable because IRR compounds — changing order changes every line-item delta without changing the total.

**Default build sequence (organic → sponsor-led inorganic → deal structure → capital structure):**

1. **Base Unlevered Yield** — recurring trailing UFCF only; zero growth; flat exit multiple applied to fully-loaded entry TEV; 100% equity; 100% dividend sweep. This is the most underwritable, de-risked anchor: it is grounded in historical cash, not forward projections. All other levers are isolated downstream from this base.
2. **Organic revenue growth** — hold margins flat; isolate pure volume/price contribution.
3. **Organic margin improvement** — strip out discrete cost saves (those belong in Step 4); capture structural efficiency gains only.
4. **Inorganic levers** — activate individually in inside-out order to reflect rising execution dependency:
   - (4a) Cost synergies *(require one-time unlock costs — keep separate from organic margin improvement)*
   - (4b) Sale-leaseback
   - (4c) Tax shield
   - (4d) De Novo
   - (4e) Tuck-in M&A
   - (4f) Transformational M&A
5. **Exit multiple expansion/contraction** — compare against flat fully-loaded exit TEV (like-for-like: fully-loaded entry vs. fully-loaded exit); this step captures pure multiple movement only. Place this step **after** all levers that affect run-rate EBITDA (Steps 2–4) to avoid double-counting.
6. **Transaction fees & balance sheet cash drag** — switch from fully-loaded exit TEV to actual headline exit multiple; let fees and cash drag flow through here. *(Clean isolation: fees and cash drag are not mislabeled as multiple contraction.)*
7. **One-time costs** — restructuring charges, integration costs, and other non-recurring items.
8. **Other special items** — use only after three-gate check (see Rules & Pitfalls).
9. **MIP (Management Incentive Plan)** — final step of the unlevered bridge. Compare dated cash-flow XIRRs with and without the actual earned payout, keeping other inputs fixed. The delta is nonpositive for conventional cash flows with a unique IRR; no payout gives zero. Investigate undefined/multiple-root IRRs rather than forcing a sign. **Cumulative IRR at this step = Unlevered IRR.**
10. **Entry debt** — restore sweep from 100% to actual contractual sweep at this step; the cash-retention timing drag is thereby attributed to leverage, not operations.
11. **Entry preferred equity**
12. **Dividend recapitalization**

    **→ Cumulative IRR at Step 12 = Levered IRR; must tie out to Live IRR.**

### Panel Structure

| Column | Content |
|---|---|
| Component Label | Descriptive name of the lever (transaction-specific where possible) |
| Toggle | Linked to master toggle on the Assumptions page — never hardcoded 1/0 in the panel |
| Cumulative IRR | Running IRR after this toggle is activated |
| Decomp Delta | Marginal contribution of this step (= cumulative IRR this step − cumulative IRR prior step) |

- **Top of panel**: Live IRR (pulled directly from the LBO model output)
- **Bottom of panel**: Tie-out flag (Levered IRR = Live IRR: PASS / FAIL)

### Hold-Period Sensitivity Table

Run the decomposition across at least Year 3 and Year 5 exits; add Year 6–8 for slow-compounding assets. Present as a matrix: exit year × IRR component. Note in the table header that short holds amplify multiple expansion and Entry Debt contributions; long holds amplify organic growth and margin improvement contributions. For non-integer exit dates, use XIRR with actual calendar dates.

---

## Defaults (apply silently, disclose at delivery)

| Parameter | Default |
|---|---|
| Base Unlevered Yield cash flow basis | Recurring trailing UFCF (LTM) |
| Growth assumption in Base Unlevered Yield | Zero |
| Exit multiple in Base Unlevered Yield | Flat — fully-loaded entry TEV multiple |
| Equity structure in Base Unlevered Yield | 100% equity financing |
| Dividend sweep in unlevered steps (Steps 1–9) | 100% |
| Dividend sweep in levered steps (Steps 10–12) | Actual contractual sweep |
| Entry multiple basis | Fully-Loaded TEV (= headline TEV + non-financing transaction fees + balance-sheet cash) |
| Inorganic lever ordering | Inside-out: cost saves → sale-leaseback → tax shield → De Novo → tuck-in → transformational M&A |
| Exit multiple step position | After all EBITDA-affecting levers (Step 5) |
| MIP position | Final step of unlevered bridge (Step 9) |
| DDTL-financed M&A attribution | Financing proceeds → leverage segment; M&A line reflects operational and valuation impact only |
| Metric polarity | Metric must be positive at both entry and exit |
| Toggle source | Master toggles on Assumptions page |
| "Other" bucket usage | Off by default |

---

## Rules & Pitfalls

**Never:**
- **Never deliver an IRR figure without the decomposition.** IRR magnitude alone cannot answer whether returns were earned through operational improvement or manufactured through leverage and multiple expansion — the decomposition is the quality signal that IC requires to assess replicability and risk concentration.
- **Never use headline TEV as the flat entry multiple in Base Unlevered Yield.** Using headline TEV instead of fully-loaded TEV pushes transaction fees and balance sheet cash drag into the multiple expansion/contraction line, misattributing a structural cost as a valuation outcome.
- **Declare a sequential attribution order and avoid overlapping cash flows** — the default places multiple movement after EBITDA levers. A different consistent order changes attribution of interactions, not total return; validate every incremental delta and the final live-IRR tie-out rather than calling a different order inherently double-counting.
- **Never bridge across different metrics within the same decomposition.** If entry metric is Revenue and exit metric is EBITDA, the multiple steps are not comparable. Mixing metrics produces a misleading bridge.
- **Never hardcode toggle values (1/0) directly in the panel.** Hard-coding breaks auditability and corrupts formula linkage when scenarios are rerun. All toggles must reference master switches on the Assumptions page.
- **Reconcile MIP amounts separately from IRR deltas.** Monetary effect is minus actual payout (zero allowed); with a unique conventional IRR, a pure payout deduction cannot improve return. An apparent positive delta requires checking cash flows, toggles and root selection; do not clamp the result or require a negative delta when payout is zero. See [shared attribution rules](../../../metric-dictionary.md#model-reconciliation-and-attribution).
- **Never drop Base Unlevered Yield if it is negative without investigating.** A negative Base Unlevered Yield is almost always a model error (wrong FCF basis, wrong sweep assumption, or LTM cash flow not recurring). Investigate before proceeding.

**Conditional:**
- **If** the unlevered base case has no cash sweep (i.e., base case does not distribute 100% of FCF), **then** create a standalone **"Balance Sheet Cash Drag"** line item rather than embedding the drag in Base Unlevered Yield — it must not contaminate the operational baseline.
- **If** tuck-in or transformational M&A is financed with a DDTL, **then** attribute DDTL financing proceeds to the leverage segment (Step 10 or a dedicated sub-step); the M&A inorganic line (Step 4e/4f) reflects only the operational and valuation impact with the DDTL toggle off.
- **If** the entry EBITDA metric is negative at entry and positive at exit (e.g., early-stage or turnaround asset), **then** switch the bridging metric to Revenue or ARR for both entry and exit multiples; do not bridge across a sign change in the denominator.
- **If** using NTM as the entry multiple basis, **then** embed the LTM→NTM period step-up inside Base Unlevered Yield and start the organic revenue growth lever (Step 2) from Year 2 onward — the initial ramp-up is already captured in the base.
- **If** any exit year is a non-integer (e.g., 4.5 years), **then** use XIRR with actual calendar dates rather than period-end IRR convention.
- **If** the cumulative IRR at the bottom of the panel does not equal the Live IRR, **then** halt delivery and resolve the tie-out discrepancy — a stale panel is worse than no panel.

**Judgment:**
- **Default inorganic lever ordering (inside-out) reflects execution dependency, not IRR magnitude.** Resist the temptation to reorder by contribution size for presentation purposes — reordering changes every line-item delta and destroys comparability across deals.
- **Flag any single component exceeding 50% of Levered IRR as a concentration risk**, particularly multiple expansion and transformational M&A. Note the flag explicitly in the IC materials; it signals that returns depend heavily on a single lever that may be out of management's control.
- **Flag any positive exit multiple expansion ≥ 0.5x and treat it as a risk disclosure, not a return driver.** Relying on multiple expansion above 0.5x means underwriting a bet that the next buyer pays more — build a flat or compressed multiple sensitivity and present it alongside the base case in IC.
- **Prefer extending standard component labels over using the "Other" bucket.** The "Other" bucket passes only if the item (a) demonstrably does not fit any existing standard line, (b) contributes more than 50 bps to Levered IRR, and (c) is renamed with a transaction-specific label. Anything below 50 bps that does not fit should be absorbed into the nearest logical component with a footnote.
- **Rerun the full panel after any assumption change that affects IRR.** The waterfall is only valid as of the model state at time of calculation; a stale panel with updated Live IRR is misleading.

---

## Pre-Delivery Checks

- Levered IRR at the panel bottom = Live IRR.
- Steps 1–9 with leverage off = Unlevered IRR.
- Organic revenue-growth plus margin-improvement delta approximately reconciles to implied unlevered EBITDA CAGR.
- Step 5 delta = zero when fully-loaded entry and exit TEV multiples are equal.
- MIP delta ≤ 0; zero is valid when no payout is earned. The value bridge MIP deduction equals the actual waterfall payout; IRR delta is the change between dated cashflow XIRRs, not a currency payout.
- For a standard profitable LBO with debt cost below after-tax return, Entry Debt delta is positive.
- Flag any component delta > **50% of Levered IRR**.
- For positive exit-multiple expansion **≥ 0.5x**, include flat/compressed sensitivity.
- Entry and exit use the same positive metric.
- Rerun the panel after every IRR-affecting assumption change.

---

## Scope Boundaries

The IRR Decomposition panel attributes **IRR (%)** by source; it does not decompose MOIC or dollar equity value — use the **Value Creation Bridge** playbook for MOIC and equity value waterfall analysis. Full model construction, debt schedule, and returns page architecture are governed by the **LBO Model** playbook, which is the parent model this panel attaches to.

---


# Dividend Recap Modeling

> **Sections**: Ask First · Workflow · Defaults (apply silently, disclose at delivery) · Rules & Pitfalls · Pre-Delivery Checks · Scope Boundaries
> **Must not skip**: Rules & Pitfalls · Pre-Delivery Checks · Scope Boundaries — return here before delivery.
> **Formats**: excel_standards.md · metric_disambiguation.md

> Task `dividend-recap-modeling` in group `lbo-structuring`. Read [`_overview.md`](_overview.md) first for group-level scope, shared defaults, and format dependencies.

**Use when**: A PE-backed portfolio company raises new debt and distributes proceeds as a special dividend, enabling sponsor early liquidity | **Deliverable**: Excel workbook with tabs covering Sources & Uses, Dividend Recap assumptions, pro forma cap table, debt schedule, cash flows, credit metrics, and returns comparison

---

## Ask First
1. What is the recap date (or target date range), and should it be modelled as a toggle?
2. Is there an existing LBO model to overlay — or must the operating model be built from scratch?
3. What is the new debt quantum or target leverage multiple (× LTM EBITDA at recap date), and what are the instrument terms (type, rate, tenor, amortization, call protection, OID, fees)?
4. What are the exit assumptions (year range, exit multiple) and the sponsor's equity % at recap date — and do management co-investors participate in the recap distribution pari passu, or is MIP exit-only?

---

## Workflow

1. **Collect all inputs before opening a single cell** (recap date toggle, new debt amount or target leverage × LTM EBITDA at recap date, instrument type / rate / tenor / amortization schedule / call protection, OID and financing fees, existing debt at recap date, post-recap cash balance target, equity and returns inputs; if no existing model, collect full operating inputs). The only exception: extract inputs from an uploaded LBO model first, then gap-fill.

2. **Determine build mode** — if an LBO model is available, overlay the recap as an incremental financing event on the existing file; if not, build a standalone operating tab. Never rebuild operating projections when overlaying. (Preserves the strict separation between financing event and operating performance.)

3. **Build Sources & Uses at recap date** — new debt proceeds as source; special dividend (gross), financing fees, and OID as uses; cash from balance sheet as source only if explicitly instructed (default: $0 cash contribution). Display gross dividend and fees as separate line items; never net them.

4. **Build Dividend Recap tab** with three sections: (a) assumptions (date toggle, leverage multiple, instrument terms, OID, fees, existing debt, equity ownership % at recap date), (b) Sources & Uses grid, (c) pro forma cap table in three columns: Pre-Recap | Recap Adjustment | Post-Recap — line items: revolver, each tranche, new debt, total debt, cash, EBITDA, net debt, total leverage, net leverage, sponsor equity.

5. **Update debt schedule** — roll all instruments (existing + new) forward from recap date to exit, applying contractual amortization and cash sweep each period. Never use the original recap debt quantum as the exit debt figure; exit debt is the period-end balance after amortization and sweep.

6. **Update cash flows** — unlevered free cash flow is unchanged (financing event only); update levered cash flow for incremental interest on new debt and revised sweep. For a mid-year recap, accrue only the partial-period interest for the stub — do not charge a full year's interest in the recap year.

7. **Calculate financing fees and OID treatment** — Apply the [shared financing-cost rules](../../../metric-dictionary.md#model-reconciliation-and-attribution) under the confirmed reporting standard and instrument terms. Distinguish debt discount/OID from qualifying issuance costs; reconcile face principal, cash proceeds and carrying value. Use the required interest/effective-interest method; use straight-line only where permitted and after any required materiality test, with the approximation disclosed. Separate cash interest, non-cash amortization and covenant-defined interest. Assess modification/extinguishment costs separately when existing debt is changed.

8. **Build lender coverage and credit metrics** — total leverage, net leverage, interest coverage (cash interest only), fixed charge coverage. Apply conditional formatting: covenant headroom < 0.5× → yellow; headroom < 0.0× (breach) → red. Flag any repricing triggers, amendment fees, change-of-control clauses, or call protection on existing facilities triggered by the recap. Update revolver availability if springing covenants are linked to revolver utilization — new leverage may trigger the covenant even if the term loan has no maintenance covenant.

9. **Build returns — with vs. without recap, side by side** — for each exit year:
   - **Scenario A (no recap)**: standard sponsor IRR/MoIC using entry and exit cash flows.
   - **Scenario B (with recap)**: cash flow timeline — entry (−equity outlay) → recap date (+special dividend received) → exit (+net exit equity). Use actual calendar dates for IRR; the recap date is a distinct mid-hold cash inflow. Exit equity in Scenario B equals exit EV minus post-recap net debt — holding operating EV constant, reconcile the exit-equity difference to actual incremental net debt and fees/taxes; do not force the same sign in all years after refinancing or cash accumulation. The special dividend is a separate cash inflow; do not also deduct it from exit equity. Build a returns bridge showing IRR/MoIC delta (Scenario B − Scenario A) for each exit year.
   - **Directional note**: an earlier dividend can improve IRR, while fees, tax, interest and reduced exit proceeds can offset it. Compute both near- and far-term exits; neither accretion nor dilution is guaranteed by timing alone.

10. **Build Sponsor Cash Flow Timeline** — a visual, auditable sequence: entry outlay → recap dividend inflow (dated) → exit proceeds, mirroring exactly the IRR cash flow inputs.

11. **Run sanity checks** (see Pre-Delivery Checks) and confirm all cross-tab links are dynamic — no hardcoded values outside explicit user-input cells.

---

### Pro Forma Cap Table Structure (three-column layout)

| Line Item | Pre-Recap | Recap Adjustment | Post-Recap |
|---|---|---|---|
| Revolver | | | |
| Term Loan A / B / C (each tranche) | | | |
| New Recap Debt | — | +new debt | |
| Total Debt | | | |
| Cash | | | |
| EBITDA (LTM at recap date) | | | |
| Net Debt | | | |
| Total Leverage (×) | | | |
| Net Leverage (×) | | | |
| Sponsor Equity | | | |

### Returns Bridge Layout

| Exit Year | IRR — No Recap | IRR — With Recap | Delta | MoIC — No Recap | MoIC — With Recap | Delta |
|---|---|---|---|---|---|---|
| Year 3 | | | | | | |
| Year 4 | | | | | | |
| Year 5 | | | | | | |

---

## Defaults (apply silently, disclose at delivery)

| Parameter | Default | Rationale |
|---|---|---|
| Cash contribution to recap Sources & Uses | $0 | Recaps are debt-funded; equity cash is not typically deployed |
| Leverage anchor | LTM EBITDA at recap date | Reflects lender underwriting at the moment of the transaction; entry or stale EBITDA is a hard error |
| OID and financing fee treatment | Applicable instrument/accounting rules and interest method; qualified straight-line approximation only | A credit agreement does not determine financial-reporting recognition |
| Coverage ratio interest base | Label analytical cash-interest coverage separately; contractual coverage follows its covenant definition | Non-cash amortization is not a cash payment, but some earnings/coverage measures include it |
| Dividend allocation base | Sponsor equity % at recap date | Ownership may have shifted since entry; entry-date % is stale |
| MIP participation in recap | No (exit-only) | Most MIP structures vest and pay only at exit unless explicitly documented otherwise |
| Recap date modelling | Toggle-driven discrete event | Ensures pre/post capital structures are cleanly separated at the correct date boundary |
| Covenant headroom warning threshold | < 0.5× → yellow; < 0.0× → red | Standard credit monitoring convention |
| Existing debt instruments in Scenario B | All retained and rolled forward | No existing facility is dropped in the recap scenario |

---

## Rules & Pitfalls

**Never:**
- **Never use entry EBITDA or a prior-period EBITDA to set recap leverage** — leverage multiples must be anchored to LTM EBITDA at the recap transaction date; using stale EBITDA is a hard model error that misstates debt capacity.
- **Never double-count the special dividend** — the dividend is a standalone mid-hold cash inflow in the IRR timeline; exit equity in Scenario B is independently determined by exit EV minus post-recap net debt. Do not deduct the dividend from exit equity a second time.
- **Use actual rolled exit net debt** — include draws, amortization, sweep, PIK and cash changes as applicable. A stale recap balance overstates debt and understates equity after net repayment; after net borrowing/accretion the error can reverse. Do not assume its direction.
- **Never charge a full year of interest in the recap stub period** — if the recap occurs mid-year, accrue only the partial-period interest; a full-year charge overstates the debt burden in the recap year.
- **Do not equate OID with an upfront operating expense** — reconcile discount to debt carrying value and interest under the applicable rules; separately assess issuance, modification and extinguishment costs instead of applying one treatment to every fee.
- **Never net financing fees against the gross dividend** — display gross dividend and fees as separate line items in Sources & Uses; netting obscures fee quantum and fails review.

**Conditional:**
- **If an existing LBO model is uploaded**, extract all operating inputs directly from it and overlay the recap as an additive financing layer — do not rebuild the operating projection or alter existing debt schedules prior to the recap date.
- **If existing credit facilities include call protection, repricing triggers, change-of-control clauses, or amendment fees**, flag each triggered provision explicitly in the model before finalizing the new debt sizing.
- **If the existing credit agreement contains springing covenants tied to revolver utilization**, recalculate revolver availability under the post-recap capital structure — new leverage levels may trigger the springing covenant even where the term loan carries no maintenance covenant.
- **If management co-investors are present**, confirm at the Ask First stage whether they participate pari passu in the recap distribution or are exit-only (MIP default); apply the correct participation flag to the dividend allocation calculation.
- **If Scenario B exit equity differs from Scenario A**, reconcile the difference to actual incremental net debt and other actual proceeds adjustments. Equal/higher exit equity is not by itself an error after refinancing, cash generation or repayment; investigate the underlying schedules.

**Judgment:**
- **Show both near-term and far-term exits in the returns bridge** — explain the calculated dividend-timing benefit and financing-cost/exit-equity effects for each; do not force recap IRR accretion for early exits.
- **Confirm sponsor equity % at recap date rather than defaulting to entry %** — in situations where equity has been partially sold down or rolled, using the entry-date percentage mismeasures the dividend received and corrupts the IRR timeline.
- **Treat the recap as a discrete, date-stamped event in the model** — pre-recap periods use the original capital structure; post-recap periods use the new one. Blending the two across periods introduces rate and balance errors that are difficult to detect in review.

---

## Pre-Delivery Checks

- Sources = Uses; post-recap debt equals pre-recap debt plus new debt, subject to explicit paydown.
- Sponsor dividend = gross dividend × sponsor equity % at recap date.
- Incremental Year-1 interest approximates new principal × rate, stub-adjusted; recap-year interest is stub-only.
- Scenario B minus Scenario A exit equity reconciles to actual incremental net debt and other proceeds adjustments; retained tranches roll forward and any refinancing/payoff is explicit.
- Fee/OID opening-to-closing carrying values and interest-method amortization reconcile; cash-interest coverage excludes non-cash amortization and contractual coverage follows the covenant.
- No formula errors or broken links; both near- and far-term exits are shown.

---

## Scope Boundaries

Use **LBO Model** for ground-up operating/entry model construction and **Sources & Uses** for a standalone initial-acquisition grid. This playbook addresses the incremental recap financing event, its debt effects, and with/without return comparison.

---


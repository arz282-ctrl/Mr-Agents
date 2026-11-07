# Earnout Modeling

> **Sections**: Ask First · Workflow · Defaults (apply silently, disclose at delivery) · Rules & Pitfalls · Pre-Delivery Checks · Scope Boundaries
> **Must not skip**: Rules & Pitfalls · Pre-Delivery Checks · Scope Boundaries — return here before delivery.
> **Formats**: excel_standards.md · metric_disambiguation.md

> Task `earnout-modeling` in group `lbo-structuring`. Read [`_overview.md`](_overview.md) first for group-level scope, shared defaults, and format dependencies.

**Use when**: An M&A transaction includes contingent seller consideration payable upon post-close performance | **Deliverable**: Earnout overlay module (assumption block + payment calculation block + integrations) layered on top of an existing LBO / M&A / DCF base model

---

## Ask First

1. **Performance metric** — Which KPI governs payment? (Default: EBITDA; confirm whether the purchase agreement specifies pro-forma, adjusted, or synergy-adjusted EBITDA — never assume headline EBITDA)
2. **Payment mechanism & structure** — Binary, Sliding Scale, Tiered/ratchet, Milestone (probability-weighted), Multi-Year (with catch-up), Exit/MOIC-triggered, or Reverse/Clawback?
3. **Key economic terms** — Thresholds, measurement period, confirmed cap or expressly uncapped terms, change-of-control provisions, funding, timing and tax treatment. Ask only for material unresolved contractual terms; do not impose a typical cap when the contract is uncapped.
4. **Employment linkage** — Is the earnout conditioned on continued employment of the seller/founder? (Determines whether it must be reclassified as compensation expense)

---

## Workflow

1. **Build the standalone base model first** (operating model + transaction model, with no earnout present) — earnout is a pure overlay; the base must be complete and locked before the earnout layer is added, so that performance forecasts cannot be reverse-engineered to hit earnout targets.

2. **Confirm all earnout structure inputs in one pass** (use the Ask First questions above); capture: performance metric and its exact contractual definition, payment mechanism type, target amount(s), measurement period, cap, CoC acceleration treatment, funding source, payment timing, and tax deductibility.

3. **Build the Earnout Assumption Block**
   - Hard-code only contractual terms (targets, cap, mechanism type)
   - Include an **Earnout Switch (0/1 toggle)** — mandatory; used for scenario/sensitivity toggling
   - Label the confirmed cap or uncapped term explicitly; resolve material ambiguity rather than assuming a cap.

4. **Build the Payment Calculation Block (formula-driven)**
   - Pull the performance metric via `INDEX/MATCH` or `XLOOKUP` from the operating model — never hard-code the achievement value
   - Apply mechanism logic:
     - *Binary*: `IF(metric ≥ target, max_earnout, 0)`
     - *Sliding Scale*: linear interpolation between floor and cap; apply `MAX(0, MIN(cap, formula))`
     - *Tiered/Ratchet*: nested `IF` or lookup table with `MAX`/`MIN` guards at each tier boundary
     - *Milestone*: probability-weight each event; use 0% / 50% / 100% scenario structure for biotech/venture
     - *Multi-Year with catch-up*: calculate cumulative achievement against cumulative target; include catch-up true-up row
     - *Exit/MOIC-triggered*: split into three rows — **pre-earnout MOIC (used for threshold test) → earnout payment → post-earnout MOIC (true return)**; flag manually if threshold boundary is within ±0.1x
     - *Reverse/Clawback*: model as **negative contingent consideration** (buyer cash inflow); if there is an escrow holdback, record as a Day-1 Use and release based on outcome
   - Apply the Earnout Switch: multiply all payment outputs by the switch cell so that Switch = 0 zeroes every downstream line simultaneously

5. **Integrate into the base model — four connection points**

   **a. Free Cash Flow**
   - Place earnout outflow **below EBITDA → below capex → below ΔNWC** (it is a financing/consideration cash flow, not an operating cost)
   - Record cash outflow only in the payment year
   - If funding source is revolver or acquisition debt (only when covenants permit), model the draw in the debt schedule; do **not** assume new debt funds the earnout unless explicitly specified
   - If earnout exceeds available FCF, apply the following waterfall: FCF → revolver/acquisition debt (covenant-permitting) → sponsor equity top-up → escrow
   - **Flag** if annual earnout outflow exceeds 10% of leveraged FCF for that year (potential restricted-payment covenant breach)

   **b. Tax Schedule**
   - Apply a tax deduction only for the confirmed eligible amount and period under the applicable jurisdiction and tax basis; contractual wording alone does not establish deductibility.
   - If employment-linked, assess compensation classification under the applicable accounting rules; compensation classification alone does not establish tax deductibility or timing.
   - Until tax treatment is confirmed, assume no tax shield and disclose the limitation. A user-supplied deductible scenario is labeled an assumption, not a verified tax position.

   **c. Sources & Uses / Entry Multiples**
   - Separate funded closing-cash S&U from acquisition consideration/PPA: unfunded future earnout is not a Day-1 cash Use, but an actual escrow/holdback funded at closing is included once
   - Strip the earnout out of any seller-quoted headline TEV (sellers commonly include maximum earnout in the headline to inflate perceived value); use **firm consideration only** for entry multiples and S&U
   - For strategic M&A: follow ASC 805 — recognize Day-1 contingent consideration fair value in the liability/equity and consideration-to-goodwill/PPA bridge; liability-classified subsequent fair-value remeasurement generally flows through P&L as non-cash; equity-classified consideration is not remeasured under that rule; this does **not** affect the FCF model

   **d. Exit & Returns (IRR / MOIC)**
   - Earnout payments made before exit: already captured in FCF; do **not** also deduct from exit proceeds (double-count trap #1)
   - Earnout still alive at exit: deduct **remaining liability** from exit equity proceeds; CoC clause will trigger automatic payment at maximum regardless of actual performance
   - If FCF is built up from net income and the earnout has already been expensed in the P&L (as compensation or fair-value remeasurement): **add back the expense first, then deduct the earnout as a separate cash outflow** — otherwise cash is reduced twice (double-count trap #2)

   **e. Debt Covenants**
   - Flag any year where earnout outflow could breach restricted-payment or leverage covenants
   - Any compensation add-back in Adjusted/Covenant EBITDA must follow the disclosed metric or actual credit-agreement definition; reconcile the resulting leverage ratios, exit multiples and covenant tests.

6. **Run all sanity checks** (see Pre-Delivery Checks)

### Earnout Assumption Block — Suggested Layout

| Row | Label | Notes |
|---|---|---|
| 1 | Earnout Switch | 0 = off, 1 = on |
| 2 | Performance Metric | e.g., Adjusted EBITDA — per purchase agreement definition |
| 3 | Target (Year N) | Contractual; one row per measurement year |
| 4 | Cap | Hard maximum; default = user-specified % of TEV |
| 5 | Mechanism Type | Binary / Sliding / Tiered / Milestone / Multi-Year / Exit / Clawback |
| 6 | CoC Acceleration | Yes → pay at max upon exit |
| 7 | Funding Source | FCF / Revolver / Escrow |
| 8 | Payment Year | Measurement year (default) or measurement year + 1 (precision mode) |
| 9 | Tax Deductible? | Confirmed Yes / No / Unconfirmed; eligible amount and period |
| 10 | Employment-Linked? | Yes → reclassify as compensation |

### Scenario Coverage by Deal Type

| Deal Type | Typical Earnout Size | Default Mechanism | Key Adjustment |
|---|---|---|---|
| Strategic M&A | 5–25% TEV | Binary or Sliding | ASC 805 Day-1 consideration/PPA recognition; non-cash P&L remeasurement |
| Founder / Roll-up | 20–40% TEV | Sliding or Tiered | Assess employment-linked compensation; confirm any EBITDA add-back separately |
| Venture / Biotech | Variable | Milestone | Probability-weight at 0% / 50% / 100% |
| Minority / Growth | Valuation ratchet | Ratchet | Cash exit: deduct from proceeds; share-adjustment only: adjust effective entry multiple, no FCF impact |
| Carve-out / Turnaround | Avoid | — | Baseline unclear; performance driven by sponsor — earnout mechanism is unreliable |

---

## Defaults (apply silently, disclose at delivery)

| Parameter | Default | Rationale |
|---|---|---|
| Performance metric | EBITDA | Most common contractual KPI; override if purchase agreement specifies pro-forma or adjusted definition |
| Payment mechanism | Binary | Simplest and most conservative starting point |
| Measurement period | Single year | Most common; extend to multi-year only if specified |
| Cap | Must confirm with user before proceeding | Typical observed range: 5–25% of TEV |
| Change-of-Control acceleration | Yes — pay at maximum | Standard market practice; CoC triggers full payment regardless of actual performance |
| Funding source | FCF | Default cash source; revolver or new debt requires explicit covenant clearance |
| Payment timing | Same year as measurement period ends | Moves to following year (FYE + 60–120 days) when precision is required or mid-hold exit is modeled |
| Tax treatment | Unconfirmed: no tax shield | Confirm deductible amount and tax period; retain user-specified scenarios with explicit assumption labels |
| Earnout in funded closing-cash S&U | Future unfunded payment excluded; funded escrow included once | Day-1 fair value still enters consideration/PPA and liability/equity classification |
| Earnout in headline TEV / entry multiples | Excluded (firm consideration only) | Seller CIM figures often include maximum earnout; strip it out before computing entry multiples |
| EBITDA impact | Zero | Earnout is a financing/consideration cash flow; EBITDA margin is unchanged unless explicitly reclassified as compensation |

---

## Rules & Pitfalls

**Never:**
- **Separate firm closing cash price, maximum contingent payment and Day-1 fair-value consideration** — label which entry multiple is being shown. Fair-value contingent consideration belongs in acquisition accounting where required, while unpaid future earnout is not automatically a Day-1 cash use. Do not forbid a disclosed fair-value or maximum-consideration comparison.
- **Never include earnout at maximum in Day-1 Sources & Uses** — it overstates Day-1 equity contribution and implied entry leverage; this is a classic LBO model credibility error.
- **Separate purchase consideration from compensation** — consideration cash payments are not operating expenses. Compensation expense affects operating profit/EBITDA; any Adjusted or Covenant EBITDA add-back must follow the disclosed metric or actual credit-agreement definition, not an automatic earnout add-back.
- **Never assume new debt funds the earnout** unless the user has explicitly confirmed this and covenant headroom has been validated.
- **Never apply an unconfirmed tax shield or a deduction in the wrong tax period** — keep deduction amount/timing distinct from accounting expense and cash payment timing.

**Conditional:**
- **If the seller has quoted a TEV that includes the maximum earnout**, back out the earnout to isolate firm consideration before calculating entry multiples and Day-1 S&U.
- **If continued employment affects the earnout**, assess compensation versus consideration under the applicable accounting rules. Apply the separate tax and EBITDA-basis checks in Step 5; do not infer deductibility or an EBITDA add-back from the employment condition.
- **If the deal is strategic (ASC 805)**, recognize Day-1 fair value in consideration and liability/equity, including the goodwill/PPA bridge; liability-classified subsequent fair-value remeasurement generally flows through P&L as non-cash; equity-classified consideration is not remeasured under that rule and does not affect the FCF model.
- **If FCF is built up from net income and the earnout has already been expensed in the P&L** (as compensation or fair-value remeasurement), add back the expense before deducting the earnout as a separate cash outflow — failure to do so reduces cash twice (double-count trap #2).
- **If the same earnout is paid before exit and also deducted from exit proceeds**, eliminate one deduction — determine whether the payment occurs pre-close or is assumed by the buyer and deducted from the purchase price; it can only reduce returns once (double-count trap #1).
- **If an earnout is outstanding at exit**, reconcile the actual assumed/settled claim once in proceeds under the contract. Apply change-of-control acceleration only if triggered, using its specified amount and performance rules; do not automatically pay the maximum.
- **If the earnout mechanism is MOIC-triggered**, split into three rows — pre-earnout MOIC (threshold test) → earnout payment → post-earnout MOIC (true return) — to avoid circular references; flag for manual review if the threshold boundary is within ±0.1x.
- **If funding the earnout requires drawing the revolver or acquisition debt**, confirm covenant permission (restricted-payment and leverage tests) before modeling the draw.
- **If the deal is a carve-out or turnaround**, flag that earnout mechanics are unreliable because the performance baseline is ambiguous and post-close results are sponsor-driven; recommend avoiding earnout structures in the term sheet.
- **If the seller holds both rollover equity and a large earnout**, flag management-alignment and retention risk — the seller is doubly tied to post-close performance, which concentrates key-person dependency.
- **If the earnout is a Reverse/Clawback structure** (seller refunds below a performance floor), model it as negative contingent consideration (buyer cash inflow); if there is an escrow holdback, record it as a Day-1 Use and release conditionally based on performance.
- **If payment timing precision is required or a mid-hold exit is being modeled**, shift the payment from the measurement year to the following fiscal year (FYE + 60–120 days, to reflect standard audit completion timelines).
- **If the deal is minority/growth equity with a valuation ratchet**, adjust the effective entry multiple and implied ownership percentage; record no FCF impact unless the ratchet triggers a cash payment upon exit.

**Judgment:**
- **When the earnout target is at or below LTM / entry-level performance**, treat payment as near-certain and flag to the deal team that it should be included in the headline price — a below-market target is economically equivalent to deferred fixed consideration.
- **Prefer the purchase agreement's specific EBITDA definition over any other** — pro-forma, synergy-adjusted, and as-reported EBITDA can diverge materially; using the wrong definition misstates the achievement test; tax deductibility is a separate assessment.
- **When annual earnout outflow exceeds 10% of leveraged FCF for that year**, proactively flag potential restricted-payment covenant exposure before the model is presented — do not wait for the covenant check to surface it.
- **For venture/biotech milestone earnouts**, use the 0% / 50% / 100% three-scenario structure as the default probability framework rather than a single point estimate, because milestone achievement is binary in nature and a single probability-weighted figure obscures the distribution.

---

## Pre-Delivery Checks

- Achievement is lookup-driven; payment is `0 ≤ payment ≤ cap`, with sliding-scale floor/cap boundaries correct.
- Cash payments occur in the payment years and reconcile to the contract; tax deductions follow separately confirmed eligible amounts and periods, with no assumed shield while unconfirmed.
- Switch = 0 clears every downstream impact; Switch = 1 lowers returns for positive payments; reverse/clawback recoveries increase returns. Reconcile payment signs, taxes and remaining exit liability once.
- Exit-year liability is deducted exactly once; payment year is not before measurement year and the measurement year is in the hold period.
- Flag cap > 25% of TEV, target ≤ LTM/entry performance, and MOIC threshold within ±0.1x.

---

## Scope Boundaries

This module covers seller contingent consideration on an existing LBO, M&A, or DCF base. Management carry/options/incentives belong to **Management Incentive Plan**; investor-class liquidation preferences and waterfalls belong to **Term-Sheet Waterfall**.

---


Recognition reference: [FASB Topic 805 acquisition-date consideration](https://storage.fasb.org/0904S1S1.pdf). Verify the currently applicable ASC/reporting standard and contractual classification for each real model.

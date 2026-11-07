# Retention & Cohort Analysis

> **Sections**: Ask First · Workflow · Defaults · Rules & Pitfalls · Pre-Delivery Checks · Scope Boundaries
> **Must not skip**: Defaults · Rules & Pitfalls · Pre-Delivery Checks · Scope Boundaries — return here before delivery.
> **Formats**: excel_standards.md

> Task `retention-cohort-analysis` in group `due-diligence`. Read [`_overview.md`](_overview.md) first for group-level scope, shared operating principles, and format dependencies.

**Use when**: Customer-level revenue data is available and the goal is to quantify retention, churn, upsell/downsell, and cohort decay | **Deliverable**: Excel workbook with 4 tabs — Retention, Cohorts, Raw Data (untouched), Calculations

---

## Ask First

1. **Periodicity** — annual, quarterly, or monthly? (Must be ≥ the granularity of the underlying data.)
2. **Period-over-period vs. rolling LTM** — which view is required? (Skip for annual data; LTM is not applicable.)
3. **Re-engagement treatment** — when a customer drops to $0 then returns, classify as: (a) churn + re-engaged, (b) upsell/downsell, or (c) new? Departure and return must be symmetric — confirm the business model (subscription → option a; project/transactional → option b).
4. **Data quality issues present** — duplicate or near-duplicate customer names? Negative revenue rows? Partial/stub periods (annualise, exclude, or label as partial)? Segment cuts required?

---

## Workflow

1. **Preserve raw data** — paste source data into the Raw Data tab without any modification; all analysis runs in separate columns and tabs. (This is the foundation of auditability — never touch the source.)

2. **Build the Calculations tab — customer × period classification matrix** — for each customer, each period, assign one and only one label from: `new | existing | upsell | downsell | churn | re-engaged`. Store these as intermediate columns before any aggregation. (This order is mandatory: classification must exist before summarisation so every roll-up cell can be traced back to a single customer row.)

3. **Apply sign convention throughout** — new and upsell carry positive values; churn and downsell carry negative values. NRR and all waterfall formulas depend on this convention being consistent.

4. **Assign cohort membership** — use the customer's explicit start date if available; otherwise use the first period with recorded revenue. If no start date exists, label the first cohort **"[Period 1] and prior"** to avoid misattributing all legacy customers to a single vintage. For customers whose first period is a partial month, confirm treatment (annualise / use as-is / assign to first full period) with the user.

5. **Build the Retention tab** — present sections in this order within the tab, separated by bold colour-bar dividers:
   - ① $ retention waterfall
   - ② $ retention KPIs
   - ③ Count retention waterfall
   - ④ Count retention KPIs
   - ⑤ Supplemental KPIs (revenue per customer, revenue per new customer, YoY growth)

   Display churn and downsell lines as **black negative numbers**; period-end balance = the arithmetic sum of its components. Attach a definitions footnote to the waterfall tab.

6. **Build the Cohort tab** — construct a cohort decay table indexed to Period 0 = 100%. At the bottom of the percentage table, include both a **simple average row** and a **size-weighted average row**, computed using only cohorts that have data for each respective period. Apply a red-amber-green heat map. Do **not** add a sum/total row to the percentage table. Do not produce charts by default; flag the option to the user if >20 cohorts are present.

7. **Run balance and tie-out checks** (see Pre-Delivery Checks).

---

## Defaults

| Parameter | Default / override |
|---|---|
| Retention KPI denominator | Beginning-of-period balance |
| New customer treatment in NRR | Excluded from net retention entirely |
| Count basis when revenue is absent | Count-only; flag that revenue basis is unavailable |
| Gross retention — fully burdened | Includes downsell (not churn-only) |
| Cohort percentage base | Period 0 revenue or count for that cohort |
| Charts | Not produced by default |
| Formula style | All dynamic, zero hard-coded values |
| Stub/partial periods | Ask user — do not silently annualise or drop |

---

## Rules & Pitfalls

**Never:**
- **Never modify the raw data tab**
- **Never hard-code any value anywhere in the model**
- **Never use opaque aggregation formulas (e.g. SUMPRODUCT across multiple criteria arrays) without exposed intermediate steps** — reviewers who are not Excel experts will lose confidence the moment a cell formula is unreadable; intermediate classification columns in Calculations make every number traceable to a single customer.
- **Never include new customers in the NRR calculation**
- **Never use period-end balance or average balance as the retention denominator**
- **Never fabricate revenue figures**
- **Never add a sum/total row to a cohort percentage table**

**Conditional:**
- **If no customer start date is provided**, use first revenue period as the cohort anchor, and label the earliest cohort "[Period 1] and prior" — failing to do so incorrectly assigns the entire existing customer stock to one vintage, distorting all cohort decay curves.
- Reconcile NRR with cohort-derived NRR only when the starting population, period endpoints, revenue measure, weighting and reactivation convention match exactly. Older-cohort lifetime decay is a diagnostic comparison, not proof of an arithmetic bug.
- **If revenue data contains negative values**, confirm treatment with the user before classifying — negative revenue may represent credits, refunds, or data errors, each requiring different handling.
- **If duplicate or near-duplicate customer names are detected**, flag them and ask the user how to consolidate — do not make silent judgement calls on entity identity; for minor issues, apply best judgement and add a footnote.
- **If the data is substantially dirty**, run the Data Cube Cleanup workflow upstream before beginning this analysis.
- **If re-engagement is treated as churn + re-engaged**, the departure event must be classified as churn and the return event must be classified as re-engaged — asymmetric treatment (e.g. departure = churn, return = upsell) will cause customer counts to fail to foot and will distort churn rate, NRR, and cohort decay curves simultaneously.
- **If >20 cohorts are present**, ask the user whether a chart view is wanted before building one.
- **If period-over-period vs. rolling LTM is ambiguous**, ask — except for annual data where rolling LTM is not applicable.

**Judgment:**
- **Re-engagement classification should follow the business model**: subscription businesses typically use churn + re-engaged (the customer relationship lapsed and restarted); project/transactional businesses typically use upsell/downsell (revenue fluctuation is a normal operating pattern, not a relationship event). Confirm with the user regardless.
- **Distinguish clearly among multiple gross retention variants**: (a) churn-only gross retention, (b) fully-burdened gross retention (including downsell), and (c) net retention. Conflating any two of these is a common credibility error with sophisticated reviewers.
- **Supplemental KPIs — revenue per customer, revenue per new customer, and YoY growth** — add explanatory power but are subordinate to the waterfall and should always be presented after, not instead of, the primary KPIs.

---
## Pre-Delivery Checks

- **Foot the retention waterfall**: for every period, verify that (beginning balance + new + upsell + downsell + churn + signed re-engaged) = ending balance, for both $ and count bases; check cell must equal zero.
- **Tie each period's ending balance to the sum of individual customer revenues for that period**: roll-up total must equal the customer-by-customer sum; check cell must equal zero.
- **Tie each new cohort's Period 0 size to the new customer count and new customer revenue on the Retention tab**: mismatch indicates a cohort assignment or classification error.
- **Tie cohort period totals to the corresponding retention tab period-end balances**: cohort table and retention waterfall are built from the same underlying data and must reconcile at every period.
- Same-population/same-window NRR must reconcile; otherwise disclose the difference in population and tenure without treating it as a definitive failure.
- **Confirm new customers are fully excluded from the NRR denominator and numerator**.
- **Confirm all formulas are dynamic**: search for hard-coded constants in all formula cells before delivery.
- **Confirm Raw Data tab is byte-for-byte identical to the source file**.
- **Confirm sign convention is consistent throughout**: new/upsell positive, churn/downsell negative in every formula that feeds NRR or the waterfall.
- **Confirm re-engagement is treated symmetrically**: whichever label is used for departure, the paired label for return must be the logical complement, and customer counts must foot.
- **Confirm cohort percentage rows have no sum/total row**.
- **Confirm both simple average and size-weighted average rows in the cohort percentage table use only cohorts with data for each respective period** (do not include zero-data cohorts in the denominator).
---

## Scope Boundaries
This task supplies the dedicated retention and cohort method. Full customer-analytics drill-downs and upstream dirty-data normalization are separate workflows.

---


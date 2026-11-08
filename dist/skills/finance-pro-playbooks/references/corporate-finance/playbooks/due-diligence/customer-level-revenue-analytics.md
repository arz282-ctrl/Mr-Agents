# Customer-Level Revenue Analytics

> **Sections**: Ask First · Workflow · Defaults · Rules & Pitfalls · Pre-Delivery Checks · Scope Boundaries
> **Must not skip**: Defaults · Rules & Pitfalls · Pre-Delivery Checks · Scope Boundaries — return here before delivery.
> **Formats**: excel_standards.md

> Task `customer-level-revenue-analytics` in group `due-diligence`. Read [`_overview.md`](_overview.md) first for group-level scope, shared operating principles, and format dependencies.

**Use when**: Raw customer-level revenue data ("customer cube") is available and the engagement requires NRR, cohort, concentration, and churn/new/expansion drill-downs | **Deliverable**: Excel workbook with 8+ tabs: Master → Retention → Cohorts → Top Customers → Churn Drill-Down → New Customers Drill-Down → Largest Movers Drill-Down → Raw Data

---

## Ask First

1. **Resurrected customers**: If a customer churned to $0 and later returned — but had revenue in earlier periods — classify as "Churn then New" or "Downsell then Upsell"? *(This directly changes NRR, churn count, and new logos; never assume.)*
2. **Segmentation cuts**: Should Retention and Cohorts be replicated by region, size band, end market, and/or product? If yes, specify which dimensions.
3. **Revenue size banding**: Should customers be segmented by revenue tier? If yes, confirm thresholds (e.g., $0–$100K = Small, $100K–$1M = Mid, $1M+ = Large).
4. **Display counts and negative revenue handling**: How many customers to show in Top Customers / Churn / New / Largest Movers (top 10 / 20 / 30)? And for negative revenue (refunds, credits): zero-floor with footnote, retain as-is, or reclassify to a returns line?

---

## Workflow

1. **Ingest Raw Data → Raw Data tab** *(first, to establish the immutable source of truth before any transformation)*
   - Paste the user's file verbatim into the Raw Data tab. Zero modifications. This tab is read-only for all downstream steps.

2. **Build Master tab** *(all analysis columns are added here, never in Raw Data)*
   - Link every cell back to Raw Data; do not re-key values.
   - Sort rows chronologically: earliest period → latest period.
   - Add computed columns in this order:
     - `Cohort (Month)` and `Cohort (Year)` — derived from start date or earliest period with revenue; leave `Cohort (Month)` blank for annual data with no explicit start date.
     - `Current Status` — period-end snapshot: `Active` when revenue is positive; `Churn` when a previously active customer has zero revenue. A returning customer becomes Active. Keep a separate historical churn flag/date; pre-start and missing observations are not churn. Apply the confirmed negative-revenue treatment.
     - `Size Band` — IF formula against confirmed thresholds (conditional on Ask First Q3).
     - `Change in Revenue ($)` — period-over-period delta.
     - `Revenue Growth %` — wrapped in `IFERROR(..., NA())` to suppress divide-by-zero.
     - `In-Year Status` — `New / Upsell / Flat / Downsell / Churn` using IF formulas only; never hard-code.
     - `Total` row at the bottom.
   - Convert any error values in raw revenue fields to `"NM"` — not zero, not left as errors — so they cannot propagate into retention calculations.
   - Flag any negative revenue cells and surface them to the user before proceeding (see Rules & Pitfalls).

3. **Build Retention tab** *(depends on Master being complete and validated)*
   - Apply retention-cohort methodology (see Scope Boundaries for the underlying method).
   - Sign convention: Downsell and Churn stored as **negative values**; all NRR formulas use addition throughout.

4. **Build Cohorts tab** *(depends on Retention tab logic being confirmed)*
   - Add two sub-tables:
     - **Revenue by cohort table** — dollar revenue for each cohort across periods.
     - **NRR by cohort table** — net revenue retention % for each cohort across periods, formatted with red-yellow-green heat map (yellow midpoint = 90% unless user specifies otherwise).

5. **Build Top Customers tab** *(depends on Master; requires understanding of two distinct views — do not merge them)*
   - **Top Customer Revenue table**: Rank customers by the most recent complete period (static ranking — never re-rank by historical year). Map each ranked customer's revenue back across all historical periods.
   - **Concentration Over Time table**: Each year, independently rank that year's largest customers (no anchor to the latest period). This is a separate view from the static ranking above.

6. **Build Churn Drill-Down tab** *(depends on Master `In-Year Status` labels being finalized)*
   - Columns: Rank | Customer ID | Starting Cohort | Churn Date | Starting Revenue | Peak Revenue | $ Lost

7. **Build New Customers Drill-Down tab** *(depends on Master; resurrected-customer classification from Ask First Q1 must be confirmed)*
   - Columns: Rank | all dimension tags | Cohort | $ New Revenue

8. **Build Largest Movers Drill-Down tab** *(depends on Master)*
   - Produce two tables per year: **Largest Upsells** and **Largest Downsells**.
   - Columns for each: Customer ID | YoY Revenue Change ($) | relevant tags.

9. **If segmentation cuts were requested (Ask First Q2): replicate all output tabs for each dimension** *(final step; all upstream tabs must be stable before replication)*

10. **Insert cross-tab check cells throughout** *(embed throughout build, validate at the end)*
    - For every metric that appears in more than one tab (total revenue, NRR, growth rates, customer counts, gross and net retention), add a `check` cell: formula returns `TRUE` if values match, `FALSE` if not. Resolve all `FALSE` and `#REF!` / `#DIV/0!` before delivery.

### Double-Click Tab Column Structures

| Tab | Columns |
|---|---|
| Churn Drill-Down | Rank · Customer ID · Starting Cohort · Churn Date · Starting Revenue · Peak Revenue · $ Lost |
| New Customers Drill-Down | Rank · All dimension tags · Cohort · $ New Revenue |
| Largest Movers Drill-Down | (Two tables per year) Customer ID · YoY Revenue Change ($) · Relevant tags |

---

## Defaults

| Parameter | Default / override |
|---|---|
| All formulas | Fully dynamic; zero hard-coded values |
| Raw Data tab | Included verbatim in deliverable, unmodified |
| Error values in revenue fields | Converted to `"NM"` in Master |
| In-Year Status labels | Assigned via IF formulas only |
| NRR sign convention | Downsell and Churn stored as negative; NRR formulas use addition |
| Heat map midpoint (NRR cohort table) | 90% = yellow |
| Cohort (Month) for annual data with no start date | Left blank |
| Current vs historical churn | Current Status is a period snapshot; returning positive revenue is Active. Historical churn flag/date persists separately; period churn events are not the current inactive count |

---

## Rules & Pitfalls

**Never:**
- **Never hard-code any value in the workbook**
- **Never modify the Raw Data tab**
- **Never leave error values (`#REF!`, `#DIV/0!`, etc.) in the workbook** — convert revenue errors to `"NM"` in Master and resolve all formula errors before delivery.
- **Never silently zero-floor or reclassify negative revenue** — flag it and ask the user, because the treatment (zero-floor, retain, or reclassify to returns) changes reported churn and NRR.
- **Never conflate the two Top Customer views**
- **Never mix retention definitions**

**Conditional:**
- **If a customer's revenue dropped to $0 in a prior period and is now positive again**, classify per Ask First Q1 before labeling In-Year Status — this decision directly changes NRR, churn count, and new logo count, and there is no safe default.
- **If segmentation cuts are requested**, replicate the full set of output tabs (Retention, Cohorts, Top Customers, all drill-downs) once per segment dimension; partial replication produces an internally inconsistent workbook.
- **If source data contains gaps, duplicate customer IDs, or onboarding fade patterns**, run the Data Cube Cleanup playbook on the raw file before beginning this workflow — building on dirty data produces NRR and cohort figures that will not survive diligence scrutiny.
- **If the user confirms annual data with no start date field**, leave `Cohort (Month)` blank; do not impute or estimate.

**Judgment:**
- **Treat the "resurrected customer" classification as a material definition question, not a formatting choice** — the answer can shift reported NRR by several points and new logo counts materially; raise it explicitly even if the user has not flagged it, because most data owners have not thought through the implication.
- **Build cross-tab check cells as you go, not at the end** — catching a mismatch after all tabs are built is significantly more expensive to debug than catching it at the tab-level during construction.
- **Validate snapshot counts separately from movement events before delivery**:
  - *(a)* `# New + # Upsell + # Flat + # Downsell = Active customer count`, when these are mutually exclusive period labels for all positive-revenue customers, including returns under the confirmed classification.
  - *(b)* `Active snapshot + currently inactive previously active customers = cumulative ever-active customers tracked`. The cumulative count cannot decrease when the population is unchanged. Do not substitute newly churned events or historical churn flags for the inactive snapshot; disclose missing/negative observations separately.
- **Prefer explicit confirmation over inference on all definition questions** — in PE diligence, the cost of reworking a model due to a misclassification is far higher than one additional scoping question.

---
## Pre-Delivery Checks

- Raw Data tab is identical to the user's original file — zero additions, deletions, or reformatting.
- Zero hard-coded values exist anywhere in Master or downstream tabs.
- All revenue error values have been converted to `"NM"` in Master; none remain as `#VALUE!` or `#N/A`.
- All negative revenue cells have been flagged to the user and a handling decision has been received.
- `In-Year Status` column uses IF formulas exclusively; spot-check at least five rows manually.
- Sign convention: all Downsell and Churn values are negative; all New and Upsell values are positive.
- NRR heat map yellow midpoint is set to 90% (or user-specified threshold if overridden).
- Reconcile movement labels to Active snapshots for every period; explicitly include returned customers under the confirmed treatment.
- Reconcile Active plus currently inactive snapshots to cumulative ever-active customers; separately review new churn events and historical flags.
- All cross-tab check cells return `TRUE`; no `FALSE`, `#REF!`, or `#DIV/0!` anywhere in the workbook.
- Top Customer Revenue tab ranking is anchored to the most recent complete period (static) and does not re-sort by historical years.
- Concentration Over Time tab re-ranks customers independently for each year (not anchored to latest period).
- If segmentation cuts were requested, confirm all output tabs are replicated once per segment dimension with consistent totals.
- `Cohort (Month)` is blank for any annual data series where no start date field exists.
- The deliverable package includes the Raw Data tab.
---

## Scope Boundaries
This task builds the full customer-analytics suite. Retention/cohort methodology is a component; dirty data requires the cleanup workflow first. Unit economics, LTV/CAC, and ARR bridges are outside scope.

---


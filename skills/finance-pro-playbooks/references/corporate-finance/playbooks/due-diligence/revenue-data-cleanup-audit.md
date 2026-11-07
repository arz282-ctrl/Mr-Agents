# Revenue Data Cleanup & Audit

> **Sections**: Ask First · Workflow · Defaults · Rules & Pitfalls · Pre-Delivery Checks · Scope Boundaries
> **Must not skip**: Defaults · Rules & Pitfalls · Pre-Delivery Checks · Scope Boundaries — return here before delivery.
> **Formats**: excel_standards.md

> Task `revenue-data-cleanup-audit` in group `due-diligence`. Read [`_overview.md`](_overview.md) first for group-level scope, shared operating principles, and format dependencies.

**Use when**: MRR/customer-level time-series data requires quality audit before analysis | **Deliverable**: Highlighted Excel workbook with Cleaned Data tab + audit log + dollar-impact bridge memo

## Ask First
1. What is the sheet name, data range, and header row structure (date columns, customer label columns)?
2. What is the start date of the time series (required if no column headers are present)?
3. Should the default 6-month lookback window for gap vs. churn classification be kept, or adjusted?
4. Is the spike/fade sensitivity appropriate for this business (e.g., highly seasonal or volatile revenue may warrant higher thresholds to reduce false positives)?

## Workflow

**Phase 1 — Data Mapping & Summary**

1. Confirm sheet scope, data range, date column headers, and customer label columns before touching any data (mapping errors compound everything downstream).
2. Run fuzzy deduplication on customer names (≥80% confidence required); classify each match as either *delete duplicate* or *sum rows into parent* — do not default to deletion without determining whether the second row is a subsidiary.
3. Strip pseudo-header rows (rows with no monthly numeric data).
4. Produce the **Anomaly Summary Table + Bridge** and deliver it to the user *before* making any workbook changes. The bridge must show dollar impact by anomaly category from raw to cleaned state.

**Phase 2 — Technical Detection (5 Rules, Color-Coded)**

5. Run all five detection rules simultaneously across the cleaned row set, applying MIN\_THRESH first to suppress immaterial flags:

| Rule | Highlight Color | Trigger | Default Action |
|---|---|---|---|
| Rule 1 — Gap | Yellow | Revenue on both sides of a zero/blank span | Auto-backfill with prior month value **only after user approval** |
| Rule 2 — Spike-Revert / Double-Count | Orange | Month-over-month jump followed by revert, or value ≈ 2× neighbor average | Flag only |
| Rule 3 — Sustained Abnormal Spike | Light Green | >3× prior level and does not revert | Flag only; treat as possible expansion event pending manual review |
| Rule 4 — Onboarding Fade | Lavender | Mean of first 6 months >2× mean of subsequent 6 months | Flag only; raise the standing due-diligence question: *"Is all revenue in this file genuinely recurring?"* |
| Rule 5 — Text / Symbol in Numeric Field | Red | Cells containing `"-"`, text-formatted numbers, or text-formatted dates (invisible to EOMONTH) | Flag with exact fix instruction |

6. Attach to every flag: specific cell reference, customer name, anomaly value, and surrounding context (prior month, following month).
7. Translate every flag into a dollar impact statement (e.g., *"This double-count overstates January MRR by $45k"*).

**Phase 3 — Threshold Review & Output Assembly**

8. Apply or adjust sensitivity thresholds (see Defaults); for large files (15+ months or thousands of rows), sort findings by dollar materiality before presenting.
9. Assemble final deliverables:
   - **Validation Summary**: total MRR/ARR overstatement and understatement in dollars
   - **Findings Table**: one row per flag with cell ref, rule, raw value, cleaned value (or "flag — no change"), dollar impact
   - **Cleaned Data tab**: Original sheet untouched; Cleaned Data tab contains side-by-side "Original Value" and "Cleaned Value" columns for every modified cell; flagged-but-unchanged cells are also marked for user review
   - **Highlighted Workbook**: color coding per the five-rule scheme above
   - **Threshold Recommendation Note**: document which thresholds were used and suggest alternatives if rerun is warranted
10. Hand off the completed Cleaned Data workbook explicitly to the Customer Cube Analytics workflow for retention/cohort/top-customer analysis — do not re-run detection inside the analytics workflow.

### Audit Log Self-Consistency Check
The audit log must satisfy: **churned customer rows + active customer rows = total observed rows**. No hardcoded counts. Every figure in the bridge must be fully traceable to a source cell.

### Delta Report (Threshold Reruns)
If thresholds are changed and the detection is rerun, produce a **delta report** showing which flags were added and which were removed versus the prior run — do not simply overwrite the prior findings table.

---

## Defaults

| Parameter | Default / override |
|---|---|
| MIN\_THRESH | <1st percentile of customer MRR ignored |
| SPIKE\_UP | 1.5× prior month |
| REVERT\_TOL | 40% |
| FADE\_RATIO | 2.0× |
| LOOKBACK | 6 months |
| Fuzzy dedup confidence | ≥80% |
| Tone / reporting register | Second-year analyst briefing a VP |

---

## Rules & Pitfalls

**Never:**
- Never overwrite, delete, or modify the original source sheet
- Never present modifications before delivering the Anomaly Summary and Bridge
- Never auto-correct anything other than a Rule 1 Gap without explicit user approval
- Never zero out negative revenue or refund entries silently
- Never flag immaterial anomalies below MIN\_THRESH
- Never hardcode row counts or dollar totals in the audit log

**Conditional:**
- If a customer's revenue drops to zero and *stays at zero*, classify as **Churn (legitimate business event)** — do not flag as a Gap; the Gap rule applies only when revenue resumes on the other side of the zero span.
- If a month-over-month spike exceeds 3× and does *not* revert, classify as **potential expansion event (Rule 3, light green)** — do not classify as a billing error; route for manual business verification.
- If the first 6 months of a customer's revenue are materially higher than subsequent months (FADE\_RATIO ≥ 2.0×), flag as **Onboarding Fade** and raise the standing question: *"Is all revenue in this file genuinely recurring?"* — because implementation or setup fees misclassified as MRR will overstate ARR and mislead valuation.
- If the file has no column headers, ask the user for the series start date before proceeding — EOMONTH-based date detection will fail silently on text-formatted date fields.
- If the business is highly seasonal or exhibits known revenue volatility, raise SPIKE\_UP and FADE\_RATIO thresholds before running detection to reduce false-positive flags.
- If a Rule 1 Gap backfill is approved, record both the original value and the filled value in side-by-side columns in the Cleaned Data tab; never overwrite in place.
- If two customer name variants are matched at ≥80% fuzzy confidence, determine whether to *delete the duplicate* or *sum the rows* based on whether the second record represents the same entity or a distinct subsidiary being rolled up to a parent.

**Judgment:**
- Treat the Gap / Churn boundary, Spike-Revert / Expansion boundary, and Onboarding Fade as classification decisions requiring analyst judgment — the five rules are triggers for investigation, not automatic corrections.
- Sort findings by dollar materiality on large files (15+ months, thousands of rows) — leading with the highest-impact issues ensures the findings table is actionable rather than exhaustive.
- When Onboarding Fade is flagged, use it as an entry point for the broader due-diligence question about revenue quality — this is the moment to surface whether the MRR schedule has been constructed correctly, not after cohort analysis has already been run on inflated figures.

---
## Pre-Delivery Checks
- The Anomaly Summary and Bridge were delivered and acknowledged by the user *before* the Cleaned Data tab was built.
- Original source sheet is entirely unmodified (no cell values, formats, or formulas altered).
- The Cleaned Data tab contains "Original Value" and "Cleaned Value" columns for every touched cell, including cells that were flagged but not changed.
- Every flag cites: specific cell reference, customer name, raw anomaly value, and prior/subsequent month context.
- Every flag has an associated dollar impact statement (MRR/ARR overstatement or understatement).
- The audit log satisfies: churned rows + active rows = total observed rows, with no hardcoded values.
- MIN\_THRESH was applied and no sub-1st-percentile MRR customers generated flags.
- The 6-month lookback threshold was disclosed to the user before the audit began and user either confirmed or adjusted it.
- Negative revenue/refund entries were listed as pending user confirmation — not silently zeroed.
- If a threshold rerun was performed, confirm a delta report (flags added / flags removed) was produced rather than an overwritten findings table.
- The Onboarding Fade section includes the recurring-revenue quality question if Rule 4 was triggered.
- The handoff note explicitly directs the Cleaned Data workbook to Customer Cube Analytics — detection logic is not to be re-run in the downstream workflow.
---

## Scope Boundaries
This task audits data quality only. Retention, cohorts, logo churn, NRR, and concentration analysis are outside scope.

---


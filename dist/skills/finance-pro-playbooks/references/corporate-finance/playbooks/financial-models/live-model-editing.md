# Live Model Editing

> **Sections**: Ask First · Workflow · Defaults (apply silently, disclose at delivery) · Rules & Pitfalls · Pre-Delivery Checks · Scope Boundaries
> **Must not skip**: Rules & Pitfalls · Pre-Delivery Checks · Scope Boundaries — return here before delivery.
> **Formats**: excel_standards.md

> Task `live-model-editing` in group `financial-models`. Read [`_overview.md`](_overview.md) first for group-level scope and format dependencies.

**Use when**: User supplies an existing Excel file with a specific change request | **Deliverable**: Modified Excel workbook with a written change summary listing every affected tab and any cell-level changes beyond the explicitly requested additions/deletions

## Ask First

1. Which tab(s) should the change apply to, or should it propagate across all relevant year-tabs (IS / BS / CF / Debt Schedule)?
2. For assumption changes, are assumptions centralised in one tab or hard-coded in multiple locations?
3. For a new year, what drives the new column, or should the prior year roll forward?
4. For deletion, which rows/columns are in scope for dependency mapping before deletion?

## Workflow

1. Read the entire workbook: sheets, formulas, formatting, historical/forecast distinctions, and driver inputs.
2. Map period headers, forecast columns, driver inputs, and cross-sheet dependencies.
3. Perform only the explicit change using the applicable default procedure.
4. Audit cross-sheet references after editing for period or tab misreferences.
5. Deliver the workbook and change summary: affected tabs, changes beyond requested additions/deletions, and any flags.

### Default Handling by Operation Type

| Operation | Default Procedure |
|---|---|
| **Add a year** | Insert right of the final forecast column; label as prior year + 1; copy all adjacent formatting; extend all year-tabs (IS / BS / CF / Debt Schedule) unless limited; roll forward prior-column assumptions. |
| **Delete data** | Map dependencies; add a **Removed Links** section in Assumptions; hard-code deleted values there; relink dependencies; then delete the source with no `#REF!` errors. |
| **Add a tab** | Place as specified; otherwise name it **New Tab**; replicate existing formatting. For a modeled schedule, use the relevant modeling playbook for content. |
| **Change an assumption** | Map all dependencies. If centralised, change one cell. If scattered, ask the user to choose: (A) update each instance or (B) create one assumption cell and relink. |

## Defaults (apply silently, disclose at delivery)

| Parameter | Default |
|---|---|
| New-year assumption | Roll forward last forecast column assumptions |
| New-year propagation scope | All year-tabs (IS / BS / CF / Debt Schedule) |
| New tab name | `New Tab` |
| Deleted-data handling | Use a **Removed Links** section before deletion |
| Scattered hard-coded assumptions | Present options A/B; do not choose unilaterally |
| Driver inputs in new columns | Link to assumptions row; never hard-code into formula |

## Rules & Pitfalls

**Never:**
- Make unrequested reformatting, restructuring, renaming, or row/column reordering.
- Hard-code growth, margin, or interest-rate drivers into formulas.
- Delete data before dependency mapping and clean relinking.
- Leave affected cross-tab dependencies unreviewed. If the user limits changes to one tab, honor that scope and report dependent adjustments that require a separate change.

**Conditional:**
- If assumptions are scattered, present options A/B; the user chooses the structural approach.
- If a new tab is a modeled schedule, invoke its playbook for content; this task controls placement and formatting.
- If the reference audit pulls a historical value into a forecast period, flag it in the change summary; do not silently correct it.

**Judgment:**
- Treat the change summary and statement of untouched content as part of the deliverable.
- If year-tab scope is ambiguous and propagation changes user scope, clarify before extending additional tabs. Preserve all unaffected tabs.

## Pre-Delivery Checks

- Formatting is consistent within each changed tab.
- No unrequested tabs were created; tab order changed only as requested.
- Row/column count change equals the explicit additions/deletions.
- No new formula errors: `#REF!`, `#DIV/0!`, `#VALUE!`, `#NAME?`, or equivalent.
- No cross-sheet reference places historical data in a forecast column.
- New-column drivers link to assumption rows, not hardcodes.
- For deletion, **Removed Links** exists and all dependents relink cleanly.

## Scope Boundaries

New model structure belongs to the relevant modeling playbook. Model review, error identification, and assumption critique belong to Model Audit. When an added tab requires schedule-specific content, its modeling playbook owns content while this task owns placement, formatting, and the change summary.


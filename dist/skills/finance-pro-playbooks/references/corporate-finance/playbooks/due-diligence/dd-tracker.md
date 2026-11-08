# DD Tracker

> **Sections**: Ask First · Workflow · Defaults · Rules & Pitfalls · Pre-Delivery Checks · Scope Boundaries · Task-specific verification
> **Must not skip**: Defaults · Rules & Pitfalls · Pre-Delivery Checks · Scope Boundaries — return here before delivery.
> **Formats**: excel_standards.md

> Task `dd-tracker` in group `due-diligence`. Read [`_overview.md`](_overview.md) first for group-level scope, shared operating principles, and format dependencies.

**Use when**: Building an M&A or PE due diligence tracking workbook from scratch | **Deliverable**: Excel workbook with 4 tabs — Summary Dashboard, DRL, Working Group Roster, Gantt Deal Calendar

## Ask First
1. What is the deal name / code name?
2. Use the 13 default workstreams, or add / remove custom ones?
3. Single consolidated DRL tab, or split high-volume workstreams into dedicated tabs?
4. Are there existing requests to import, or should the DRL be generated from scratch via DD Question Creator?
5. Who are the confirmed deal team members and advisors (buy-side only) to populate the Working Group Roster?
6. What are the known key milestone dates (IOI, LOI, IC, signing, close)?
7. What is the timeline start date and total duration? *(Default: the most recent past Monday, 12 weeks.)*
8. Will this file be shared externally with sell-side bankers or other outside parties?

## Workflow

1. **Confirm all 8 intake answers before building any tab.** Use placeholders for any unanswered items — do not infer or fabricate. *(Front-loading prevents rework caused by workstream naming inconsistencies across tabs.)*

2. **Build Tab 2 — DRL first.** Lay out all 14 columns (including Row Type), assign actual column letters, pre-populate ≥200 rows with formatting, dropdowns, and row-level formulas. Blank pre-formatted rows are not requests. *(The Summary Dashboard is entirely dependent on DRL column letters.)*

3. **Record the real column letters for each DRL field before writing a single Summary formula.** Do not assume workstream = column B or status = column F. Read back the actual layout after construction. *(Hardcoding wrong column letters is the most common cause of the dashboard showing all zeros.)*

4. **Populate DRL rows.** If the user supplies requests, map them to the 13-column schema. If no requests exist, invoke DD Question Creator — pass the exact workstream name, available materials, desired depth, and focus areas; instruct it to skip its own intake. Map the returned questions into the DRL using the confirmed column letters, then apply dropdowns, conditional formatting, and row-level formulas.

5. **Do not invent requests.** A workstream with no live request may have zero DRL rows. If a visual placeholder is useful, set Row Type = `placeholder`, Status = `N/A`, Description = `[Placeholder — no live request]`; never mark it Closed. Exclude placeholders and blank formatted rows from every dashboard count and rate.

6. **If any workstream is split into its own dedicated tab, exclude it from the main DRL entirely — no duplicate rows.** The Summary must aggregate across the main DRL tab and all split tabs simultaneously.

7. **Build Tab 1 — Summary Dashboard.** One row per workstream. COUNTIFS/SUMIFS formulas reference verified DRL column letters and `Row Type="live_request"` across the main and split tabs. Totals row uses weighted completion (total live Closed ÷ total live requests), not a row-average. Return `N/A` when the denominator is zero; never turn zero live requests into 0% or 100%. Link the Key Upcoming Dates table to Tab 4 calendar.

8. **Build Tab 3 — Working Group Roster.** Populate only with names, firms, and contact details the user has explicitly provided. Fill all other cells with `[To Be Updated]`. *(See Never rules below — this tab is a common source of serious errors.)*

9. **Build Tab 4 — Gantt Deal Calendar.** Set start date to the confirmed timeline anchor (default: most recent past Monday). Apply weekly columns for timelines ≤12 weeks; switch to bi-weekly columns for longer timelines. Freeze the workstream name column at column B. Apply professional color scheme per milestone type. Explicitly test that single-day milestones (Start = End) highlight exactly one cell. For any date the user has not provided, leave the milestone row blank or mark `[TBD]`.

10. **Run all Pre-Delivery Checks** before handing off.

### Tab Specifications

**Tab 1 — Summary Dashboard**

| Column | Content |
|---|---|
| Workstream | Matches DRL/Roster/Calendar exactly (case, spacing, spelling) |
| Total Requests | `COUNTIFS(DRL[Workstream], name, DRL[Row Type], "live_request")` |
| Complete | `COUNTIFS(…, Row Type, "live_request", Status, "Closed")` |
| Partial | `COUNTIFS(…, Row Type, "live_request", Status, "Partial")` |
| Open | `COUNTIFS(…, Row Type, "live_request", Status, "Open")` |
| % Complete | `IF(Total=0, "N/A", Complete/Total)` — conditional format numeric values only |
| High-Priority Open | `COUNTIFS(…, Row Type, "live_request", Priority, "High", Status, "Open")` |
| Completed Items | Mirror of Complete column |
| **Totals row** | Weighted %: `IF(SUM(Total column)=0, "N/A", SUM(Complete column)/SUM(Total column))` |

- Key Upcoming Dates table linked to Tab 4 calendar
- **If file is going external: remove the Key Upcoming Dates table entirely** (deal timeline is confidential)

**Tab 2 — DRL (14 columns)**

| # | Field | Notes |
|---|---|---|
| 1 | Request No. | Formula-generated |
| 2 | Workstream | Must match Summary/Roster/Calendar exactly |
| 3 | Description | Free text; wrap if >60 chars |
| 4 | Priority | Dropdown: High / Medium / Low; conditional format Red / Orange / Yellow |
| 5 | Status | Live requests: Open / Partial / Closed; placeholders: N/A |
| 6 | Third Party | Advisor or counterparty |
| 7 | Date Requested | Manual entry |
| 8 | Last Response | Manual entry |
| 9 | Buy-Side Comments | Free text |
| 10 | Sell-Side Comments | Free text |
| 11 | VDR Reference | Folder/document path |
| 12 | Days Outstanding | Formula: `=IFERROR(IF(Status="Closed","",TODAY()-DateRequested),"")` |
| 13 | Notes | Free text |
| 14 | Row Type | `live_request` / `placeholder`; blank pre-formatted rows are neither |

- AutoFilter on header row
- Pre-populated ≥200 rows with formulas and formatting; users can add rows without manually extending formulas
- Print area set; text wrap enabled

**Tab 3 — Working Group Roster (12 columns)**

| # | Field |
|---|---|
| 1 | Category (must match a workstream name OR "Deal Team") |
| 2 | Firm |
| 3 | Name |
| 4 | Title |
| 5 | Email |
| 6 | Phone |
| 7 | Primary Contact (Y/N) |
| 8 | EA / Assistant Name |
| 9 | EA Email |
| 10 | EA Phone |
| 11 | Role on Deal |
| 12 | Notes |

**Tab 4 — Gantt Deal Calendar**

| Milestone Type | Color |
|---|---|
| In Progress | Steel Blue |
| IOI / LOI | Slate Grey |
| IC Presentation | Gold |
| Signing | Teal |
| Close | Dark Green |

- Column width: 1 week per column (≤12-week timeline); 2 weeks per column (>12 weeks)
- Workstream name column frozen at column B
- Formula-driven fill: `=IF(AND(periodStart<=milestoneEnd, periodEnd>=milestoneStart), 1, 0)` drives conditional format
- Single-day milestones: Start = End; verify exactly one cell is highlighted after build

## Defaults

| Parameter | Default / override |
|---|---|
| Timeline start | Most recent past Monday |
| Timeline duration | 12 weeks |
| Column width per Gantt period | 1 week (≤12 wks) / 2 weeks (>12 wks) |
| DRL pre-populated rows | ≥200 |
| Workstreams | 13 defaults: Business, Commercial/Markets, Financial DD, Tax, Legal/IP, Technology/IT, Operations, Product/Engineering, HR, Regulatory/Environmental/ESG, Insurance, Management/Key Personnel, Financing |
| Placeholder text | `[To Be Updated]` / `[TBD]` / `[Placeholder]` |
| Formulas | Native Excel (COUNTIFS, SUMIFS, IF) — preserve formulas rather than hardcoding externally calculated values |
| % Complete formula | `IF(total=0, "N/A", complete/total)`; live requests only |

## Rules & Pitfalls

**Never:**
- **Never write Summary Dashboard formulas before verifying the real DRL column letters**
- **Never populate the Working Group Roster with names, firms, or contact details sourced from the CIM, management presentation, or any sell-side document**
- **Never fabricate dates, names, or contact information**
- **Never use a row-average of workstream-level percentages for the Summary totals row**
- **Never count placeholder or blank pre-formatted rows as requests, or mark a placeholder Closed**
- **Never use hardcoded static values in formula cells**
- **Never include the Key Upcoming Dates / deal timeline table in any version of the file distributed to sell-side bankers or other external parties**

**Conditional:**
- If a workstream is split into its own dedicated tab, remove all its rows from the main DRL tab (no duplication), and update every Summary formula to aggregate across both the main DRL tab and all split tabs.
- If DD Question Creator returns no requests for a workstream, leave it empty or use a `placeholder` row with Status `N/A`; display an explicit no-live-requests note, never a completed request.
- If the file is to be shared externally with sell-side advisors or bankers, remove the Key Upcoming Dates table from Tab 1 before distribution.
- If a user-supplied workstream name differs in case, spacing, or spelling from the name used in any other tab, halt and reconcile before proceeding — silent COUNTIF/VLOOKUP failures will make the dashboard appear broken.
- If the timeline exceeds 12 weeks, switch Gantt column granularity from weekly to bi-weekly to maintain readability.

**Judgment:**
- Confirm workstream naming convention (exact string) once at the DRL build stage, then copy-paste — never retype — into Summary, Roster, and Calendar tabs to guarantee character-level consistency.
- When invoking DD Question Creator, pass the exact workstream name string (matching the DRL), the available source materials, desired question depth, and focus areas; instruct it to skip its own intake to avoid redundant scope questions.
- Pre-populating ≥200 DRL rows with formulas and formatting is preferable to building only the rows needed today — diligence request lists always grow, and users should never need to manually extend formula ranges.
- Flag to the user at delivery any tab where all values remain placeholder — it signals a data gap, not a formula error.
## Pre-Delivery Checks

- Summary total request count equals the count of `live_request` rows across main and split tabs — numbers must foot exactly.
- Complete + Partial + Open = Total for every workstream row and the totals row.
- % Complete = `IF(Total=0, "N/A", Complete/Total)`; zero-live-request workstreams and a zero total must show `N/A`.
- Test 6 placeholders plus 1 live Open: dashboard Total=1, Complete=0, %=0%; placeholders only: Total=0, %=`N/A`.
- Check progress from exported DRL rows using the stated weighting and status basis; compare per-workstream and weighted totals with workbook formulas before delivery.
- Zero formula errors (`#REF!`, `#VALUE!`, `#DIV/0!`, `#NAME?`) across all tabs.
- Workstream names are character-for-character identical across Tab 1, Tab 2, Tab 3, and Tab 4 (case, spacing, spelling).
- Every live request has Row Type `live_request`; workstreams without requests may have zero DRL rows.
- Every workstream has ≥1 row in the Working Group Roster (placeholder acceptable).
- Re-read actual DRL column letters and verify each Summary COUNTIFS/SUMIFS references Row Type and Workstream correctly; placeholders must never inflate totals.
- The Working Group Roster contains zero names, firms, or contact details sourced from the CIM or any sell-side document.
- Single-day Gantt milestones (Start = End) highlight exactly one cell — test at least two milestone rows explicitly.
- The highlighted cells equal the count of inclusive overlapping periods, with periodEnd=periodStart+6 or +13; test mid-period one-day and two-period boundary cases.
- AutoFilter is active on the DRL header row.
- Print area is set and text wrap is enabled on all columns wider than 60 characters.
- Conditional formatting is applied to Priority (Red/Orange/Yellow) and % Complete columns.
- The Gantt workstream name column is frozen at column B.
- If file is flagged for external distribution, confirm the Key Upcoming Dates table has been removed from Tab 1.
## Scope Boundaries
This task builds the diligence tracker. Request generation, VDR gap mapping, roster population, deal economics, and valuation are outside scope.

---

## Task-specific verification

Gantt inclusive overlap formula: AND(periodStart<=milestoneEnd, periodEnd>=milestoneStart); periodEnd=periodStart+6 for weekly and +13 for bi-weekly columns. External profile removes dates/timeline, email/phone/EA fields, internal comments and strategy; use role aliases and a genuine record of the required distribution approval.

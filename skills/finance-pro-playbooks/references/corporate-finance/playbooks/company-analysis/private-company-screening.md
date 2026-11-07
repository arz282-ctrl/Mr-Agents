# Private Company Screening

> **Sections**: Ask First · Workflow · Defaults (apply silently, disclose at delivery) · Rules & Pitfalls · Pre-Delivery Checks · Scope Boundaries · Task-specific verification
> **Must not skip**: Rules & Pitfalls · Pre-Delivery Checks · Scope Boundaries — return here before delivery.
> **Formats**: excel_standards.md

> Task `private-company-screening` in group `company-analysis`. Read [`_overview.md`](_overview.md) first for group-level scope, shared defaults, and format dependencies.

**Use when**: Building a sourced, data-attributed target list of private companies for M&A origination, sector coverage, or mandate preparation | **Deliverable**: Single-tab Excel workbook (Screen tab) with 13 standard columns + industry-specific columns, every cell annotated with source, vintage, and confidence rating

---

## Ask First
1. **Screen mode** — criteria-based (define parameters from scratch) or similarity-based (match against a reference company)?
2. **Business type** — state as narrowly as possible (e.g., "hospital revenue cycle management software," not "healthcare IT"; "specialty chemicals distribution," not "specialty chemicals")
3. **Geography** — target headquarters region(s); note if divisional/subsidiary coverage is required
4. **Revenue range and ownership filter** — confirm revenue band and whether to include PE-backed, founder-owned, corporate subsidiaries, or carve-outs in scope

---

## Workflow

**Step 0 — Confirm mode and parameters**
Lock screen mode (criteria / similarity), business type, geography, revenue range, ownership filter (default: private), and explicit exclusions before sourcing.

**Step 1 — Build the company universe**
Cast wide; include edge cases. Calibrate inclusion threshold to universe size (see Rules & Pitfalls — Judgment: count thresholds). Multi-segment companies with a relevant division qualify; include them and annotate which division applies. Exclude companies that have been fully acquired and integrated into a buyer with no independent operation; include carve-outs that now operate independently.

**Step 2 — Populate the Screen tab**

Build all four column groups in order (overview → scale → ownership & deal history → notes) before sourcing financials.

### Column Structure (13 standard columns + industry-specific)

| Group | Column | Notes |
|---|---|---|
| **① Company Overview** | Company Name | — |
| | Website | — |
| | HQ | — |
| | Founded Year | Point-in-time event; no stale flag needed |
| | Description | ≤30 words; specific and differentiating; no marketing language; no ownership info (ownership has its own column) |
| | CEO | — |
| **② Scale** | Revenue | Require ≥2 independent sources; annotate each cell |
| | Employees | Require ≥2 independent sources; annotate each cell |
| | EBITDA & Margin | Annotate; mark stale if >2 years old |
| **③ Ownership & Deal History** | Ownership | Default: Private; verify per company — do not trust database defaults |
| | Most Recent Valuation | Flag as rumored/estimated if not confirmed; include round, source, and date |
| | Most Recent Financing | Must be internally consistent with Ownership column |
| **④ Flags** | Notes / Flags | Active processes, stale data, acquisition status, material issues |

**Industry-specific columns (add; revise or remove a base column only within the user's confirmed scope and header mapping):** Record the requested names, omissions and order, then review the final saved workbook under [calculations and model checks](../../../completion-evidence.md#calculations-and-models). Preserve the 13 base columns when the user has not requested or authorized a change.
- SaaS → ARR
- Multi-unit → Unit Count / AUV
- Asset management → AUM

**Step 3 — Source and annotate every data point**

Apply the cell comment format to every external fact/estimate/NA data cell, including Company Overview and Notes/Flags; headers are exempt and formulas identify their derivation:

```
Source: [Source Name], [Year] | Confidence: [H/M/L] | [URL]
```

Confidence tiers:
- **H** — company disclosure or regulatory filing
- **M** — institutional database (PitchBook, CapIQ) or corroborated by multiple sources
- **L** — single secondary source or derived estimate

Source name must match the URL domain. If a data aggregator surfaces a primary source, cite both the primary source and the discovery channel.

**Step 4 — Sort and flag**
Sort by revenue descending; use midpoint for range estimates. Place NA rows at the bottom. Apply "(stale)" tag inline where required. Flag active processes in Notes/Flags.

**Step 5 — Run pre-delivery checks** (see Pre-Delivery Checks section)

---

## Defaults (apply silently, disclose at delivery)

| Parameter | Default |
|---|---|
| Ownership filter | Private only; override for in-scope divisions/subsidiaries |
| Universe approach | Include all qualifying companies; no fixed count |
| Sort order | Revenue descending; range midpoint; NA rows at bottom |
| Stale threshold | Revenue, EBITDA, and employee data >2 years old: “(stale)” + as-of date |
| Currency | One currency; footnote cross-border FX conversion |
| Missing data | “NA”; do not estimate or leave blank |
| Valuation treatment | Label rumored/estimated valuation with round, source, date, and basis; never confirm it |
| Derived estimate sourcing | Derived/benchmark estimate is one source; still find a direct revenue citation |
| Source concentration cap | If one secondary source is sole citation for >40% of rows, corroborate each affected row |
| Derived values in structure | Put derivation, benchmarks, and assumptions in the supported cell comment, never a standalone column |

---

## Rules & Pitfalls

**Never:**
- **Never fabricate or estimate without explicit disclosure** — private company data is scarce and tempting to fill; unverifiable data points must be "NA," and any estimate must be labeled and sourced in the cell comment. This is the single most credibility-destroying failure in a private screen.
- **Never treat a rumored or derived valuation as a confirmed value** — label every valuation with round, source, date, and basis (e.g., "Most recent round post-money, per PitchBook, Series D, Mar 2024"). Conflating rumor with fact misleads every downstream user.
- **Never trust ownership classifications from databases without verification** — PitchBook, Crunchbase, and CapIQ ownership data goes stale; each PE-backed designation requires a verifiable sponsor name and acquisition year in the cell comment, confirmed by press release, sponsor portfolio page, or news. If unverifiable, write "Ownership Unknown" or "PE-Backed (sponsor NA)" — never guess.
- **Never include a fully integrated acquired company** — once absorbed with no independent operations, it is no longer a target. Carve-outs that now operate independently are included.
- **Never let derived estimates, benchmarks, or assumptions appear as standalone columns** — they belong in cell comments only; each column must be a company-specific data point.
- **Never use crowdsourced or algorithmic sources (Reddit, Statista, Owler, ZoomInfo, listicles) as the basis for financial estimates** — these sources are acceptable for company discovery and directional context only; they do not count toward the ≥2 independent source requirement unless corroborated by a primary source.
- **Never exclude public companies from the universe silently** — they must be actively excluded (or explicitly included if the ownership filter covers divisions/subsidiaries) so the screen is mode-consistent.

**Conditional:**
- **If revenue or employee data has only one source:** find a second independent source before finalizing the row. A derived estimate (e.g., store count × per-unit benchmark) counts as one source only; a direct revenue citation must still be found.
- **If two sources report different revenue figures:** present a range, exclude the outlier with a note, and disclose the discrepancy in the cell comment.
- **If a source provides a revenue range rather than a point estimate:** use the midpoint and disclose the range and source in the cell comment.
- **If a single secondary source would be the sole citation for >40% of rows:** find at least one additional corroborating source per affected row before delivery.
- **If a company is multi-segment with only one relevant division:** include the company, note in the description and Notes/Flags which division qualifies, and source financials for that division only where possible.
- **If a process is active (for sale, LOI signed, exclusivity, confidential S-1 filed):** flag prominently in the Notes/Flags column — do not omit or bury.
- **If count falls below 5 companies:** flag the shortfall and recommend parameter relaxation before delivering.
- **If count exceeds 100 companies:** tighten criteria and disclose the narrowing rationale at delivery.
- **If sourcing European companies:** prioritize local registries (UK Companies House, Irish CRO, French Infogreffe, German Bundesanzeiger, Nordic registries) over third-party estimates — these are primary sources and supersede database estimates.
- **If ownership and most recent financing entries are inconsistent** (e.g., sponsor named in financing but not in ownership): reconcile before delivery — both fields must reflect the same sponsor.

**Judgment:**
- **Define business type as narrowly as the mandate allows** — "hospital revenue cycle management software" is a screen anchor; "healthcare IT" produces an unworkable universe. Narrow definitions catch relevant targets; broad definitions generate noise.
- **Calibrate universe inclusion loosely at Step 1** — a company the user never sees cannot be evaluated. Long lists with good flagging are preferable to short lists with silent exclusions.
- **Prefer local regulatory filings over third-party databases for financial data** — a Companies House filing is H-confidence; a PitchBook estimate of the same number is M at best.
- **Revenue vs. employee count is a built-in sanity signal** — a 50-person company claiming $500M revenue warrants a flag and re-verification before the screen is finalized.
- **Descriptions should differentiate, not describe** — "cloud-based prior authorization software for specialty pharmacy" is useful; "leading provider of healthcare solutions" is noise. Cap at 30 words; strip all marketing language and ownership information.

---

## Pre-Delivery Checks

- Confirm every row meets all stated screening criteria with no exceptions
- Confirm no duplicate companies appear in any row
- Confirm every financial estimate cell comment includes source name, vintage year, confidence tier (H/M/L), and URL; source name matches URL domain
- Confirm revenue and employee count each have ≥2 independent sources per row; flag any row where only one source exists
- Confirm every PE-backed designation has a verifiable sponsor name and acquisition year in the cell comment; rows sourced from database alone are corroborated by press release, portfolio page, or news; unverifiable ownership is labeled "Ownership Unknown" or "PE-Backed (sponsor NA)"
- Confirm all revenue, EBITDA, and employee data older than 2 years is tagged "(stale)" with an as-of date inline; confirm valuation, financing date, and founding year are NOT stale-tagged (they are point-in-time events)
- Confirm all valuations carry round label, source, date, and basis; none are presented as confirmed without primary-source support
- Confirm companies that have been fully acquired and integrated are excluded; carve-outs operating independently are included
- Confirm active processes (for sale, LOI, exclusivity, confidential S-1) are visible in Notes/Flags
- Confirm revenue vs. employee count is directionally coherent for every row; flag any outlier for re-verification
- Confirm ownership column and most recent financing column are internally consistent — same sponsor appears in both where applicable
- Confirm descriptions are ≤30 words, free of marketing language, and contain no ownership information
- Confirm industry-specific columns are present and populated where relevant; confirm irrelevant default columns are removed
- Confirm all figures are in a single currency with FX conversion footnoted for cross-border entries
- Confirm "NA" is used for all genuinely missing data — no blank cells, no fabricated proxies
- Confirm no single secondary source is the sole citation for >40% of rows; if so, additional corroboration has been added
- Confirm sort order is revenue descending, range midpoints used for sort key, NA rows at bottom
- If row count <5: flag and recommend parameter relaxation before delivery; if row count >100: confirm criteria were tightened and disclose narrowing rationale

---

## Scope Boundaries

Market Map playbook handles visual landscape mapping of the same universe. Buyer List playbook covers acquirer identification and payment capacity analysis. Public Comps playbook handles publicly traded trading multiples. This playbook produces only the private company target list with attributed data; hand off to those playbooks for adjacent outputs.

---

## Task-specific verification

There are exactly 13 base columns. Every external fact, estimate and NA data cell (including Company Overview and Notes/Flags) needs source name, vintage, confidence, URL and page/table locator; NA includes a reason. Headers are exempt; formulas record their derivation and input lineage. Validate actual workbook headers/comments, not only a declared receipt.

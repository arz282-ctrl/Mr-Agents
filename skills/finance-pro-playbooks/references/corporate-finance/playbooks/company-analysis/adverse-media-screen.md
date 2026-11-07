# Adverse Media Screen

> **Sections**: Ask First · Workflow · Defaults · Rules & Pitfalls · Pre-Delivery Checks · Scope Boundaries · Task-specific verification
> **Must not skip**: Defaults · Rules & Pitfalls · Pre-Delivery Checks · Scope Boundaries — return here before delivery.

> Task `adverse-media-screen` in group `company-analysis`. Read [`_overview.md`](_overview.md) first for group-level scope, shared defaults, and format dependencies.

**Use when**: A PE/VC/credit diligence engagement requires an adverse-media and reputational risk screen of a target company and its key principals | **Deliverable**: Stacked-event-block screening report delivered as both an in-chat summary and a .docx file

---

## Ask First
1. What is the target entity — company name, ticker, URL, or uploaded CIM/data-room documents?
2. Which five risk categories are in scope, or should all five defaults apply?
3. Are there specific key principals (executives, founders, board members) the client has already identified, or should entity identification proceed from defaults below?
4. Is there a known lookback threshold for recency classification, or should the standard four-tier default apply?

---

## Workflow
1. **Identify entities** — List the target and top 5–7 executives, founders, owners, key managers, and current board members. Use CIM/data-room materials as a seed, or outside-in research for a name, ticker, or URL; flag departed high-profile C-suite figures. Sponsor professionals, General Counsel, CRO, and CHRO may be added.
2. **Search and log** — Search every entity across all five risk categories. Log each query verbatim, in quotation marks and sequence, by entity and category.
3. **Build the incident list** — Include only items whose source explicitly names the target or principal. Assign:
   - **Category**: one of the five standard categories
   - **Recency**: Real-Time / Very Recent / Recent / Not Recent, anchored to the most recent substantive event or resolution
   - **Severity**: Minor / Moderate / Major, calibrated to company size and reputational materiality
4. **Rate categories** — Combine incident Severity and Recency into Low / Moderate / High category risk. List every category; use Low + “no incidents identified” where applicable. Select the 3–5 critical incidents for the Summary.
5. **Assemble** Sections 1–3 and the Search Log in the order below.

### Report Structure

**Section 1 — Summary**
- Header: *Report as of MM/DD/YYYY* (report generation date, not event date)
- Two-column table: five risk categories × Low / Moderate / High rating
- 3–5 most critical incidents listed by recency (one line each: category, approximate date, one-sentence description)

**Section 2 — Identified Negative News**
- One **stacked event block** per incident, sorted Severity (Major → Moderate → Minor), then Recency (most recent first):
  - **Bold numbered headline** with *alleged / charged / settled / convicted* status
  - `Date | Category | Severity [color-coded] | Recency`
  - Full-width paragraph with a verbatim quotation naming the target
  - Clickable source link or a precise data-room/paywalled-document path
- Do not use wide tables with narrow narrative columns. Put materially significant incidents older than five years in a labeled ~5–15-year appendix.

**Section 3 — Methodology**
- Two-column entity table: Name | Role/Description
- Entity-selection rationale by input mode
- Collection, categorisation, Recency, Severity, and source-method narrative

**Search Log**
- Numbered, quoted, exhaustive list of every query run, organized by entity then by category

---

## Defaults

**Apply defaults only where the caller has not selected a format or supplied a required assumption; disclose them at delivery.**

| Parameter | Default |
|---|---|
| Dual delivery format | In-chat summary + .docx |
| Principals screened | Top 5–7 executives / founders / owners / key managers / current directors |
| Departed C-suite inclusion | Flag high-profile former C-suite even if absent from CIM |
| Risk categories | Financial Crime / Legal & Regulatory / Governance / ESG / Operational |
| Recency tiers | Recent / Intermediate / Aged / Historical; use the latest substantive event or resolution and the versioned thresholds below |
| Severity tiers | Minor / Moderate / Major; scale to company size |
| Category risk rating | Low / Moderate / High; separate from incident Severity |
| Empty categories | “No incidents identified” + Low |
| Non-traditional sources | X / Reddit / Glassdoor / G2 are lower reliability |
| Historical appendix | ~5–15 years for materially significant incidents |
| Source links | Clickable in Word; confirm live in any PDF rendering |

---

## Rules & Pitfalls

**Never:**
- Never flag an incident without a direct naming citation.
- Never use a wide table with a narrow description column; use stacked event blocks.
- Never conflate incident Severity (Minor/Moderate/Major) and category Risk (Low/Moderate/High).
- Never omit a searched category with no findings; state “no incidents identified” and Low.
- Never anchor Recency to the original event when a later substantive resolution exists.

**Conditional:**
- CIM/data-room input: supplement the seeded entity list with outside-in research; name/ticker/URL input: identify principals outside-in first.
- Label X, Reddit, Glassdoor, or G2 as lower reliability; do not use it as stand-alone evidence.
- Replace an unavailable stable URL with a precise document path.
- For incidents older than five years, omit minor resolved matters; append significant or ongoing matters.
- For large employers, assess whether employee disputes exceed a normal range before assigning Moderate or higher Severity.

**Judgment:**
- Prefer precise, directly evidenced incidents to weak flags.
- Apply an investor/banker reputational lens; insider-trading and child-labor claims are inherently Major, while routine disputes at a large employer may be Minor.
- Put allegation status (*alleged / charged / settled / convicted*) in every headline.
- State the company-size rationale where materiality is not self-evident (e.g., a $1M fine differs at $2M versus $500M EBITDA).
- Log queries as run, not retrospectively.

---

## Pre-Delivery Checks
- Every incident has a direct naming quotation; no inference-only item remains.
- Severity and category Risk use their separate scales; all five categories appear, including Low / “no incidents identified.”
- Links are live in the in-chat summary and .docx (and any PDF rendering), or a precise path replaces an unavailable URL.
- Section 2 is sorted Major → Minor, then most-recent first; Recency reflects the latest substantive event or resolution.
- Header uses today’s *Report as of MM/DD/YYYY* date; every headline has its status tag.
- Search Log is numbered, quoted, and exhaustive by entity × category.
- Minor resolved >5-year matters are omitted; significant or ongoing matters are in the historical appendix.
- Severity reflects company size and the investor/banker lens.
- Every event block is stacked: headline, classification bar, full-width paragraph, source.

---

## Scope Boundaries
The PIB Builder handles aggregation of publicly available company profile materials into a compiled PDF — it is the source of factual background, not reputational screening. The VDR Review & Gaps playbook covers data-room document inventory and completeness analysis. The Earnings Update playbook handles financial results synthesis. This playbook covers only adverse-media and reputational risk screening; financial model or valuation work is out of scope here.

---

## Task-specific verification

Default recency relative to report as-of: ≤365 days Recent; 366–1095 Intermediate; 1096–1825 Aged; >1825 Historical. Ongoing matters take precedence. Category risk matrix (columns Recent/Ongoing, Intermediate, Aged, Historical): Major = High/Moderate/Low/Low; Moderate = Moderate/Moderate/Low/Low; Minor = Moderate/Low/Low/Low. Keep incident Severity distinct from category Risk. No incidents = Low. Any firm-specific override needs caller approval, threshold/version and source.


# VDR Gap Analysis

> **Sections**: Ask First · Workflow · Defaults · Rules & Pitfalls · Pre-Delivery Checks · Scope Boundaries
> **Must not skip**: Defaults · Rules & Pitfalls · Pre-Delivery Checks · Scope Boundaries — return here before delivery.
> **Formats**: document_standards.md

> Task `vdr-gap-analysis` in group `due-diligence`. Read [`_overview.md`](_overview.md) first for group-level scope, shared operating principles, and format dependencies.

**Use when**: A buy-side investment team has received a data room and needs to map its contents to standard diligence questions, assess coverage, and identify gaps | **Deliverable**: Q&A memo rendered in full in chat + saved as .docx Word file

---

## Ask First
1. What is the target company name? (Resolve all `[COMPANY_NAME]` placeholders — never print brackets.)
2. Which files and documents are present in the data room? Upload all available materials.
3. Has the team prepared a VDR request list? If yes, provide it — dual-mapping will be applied.
4. Are there specific diligence sections (of the seven standard segments) that require deeper focus or that the team has already covered independently?

---

## Workflow

1. **Inventory the data room** — log every file by type and skim what diligence questions each document addresses. This orientation step determines what is actually present before any claims of coverage are made. (Do not skip: coverage statements made without this step will be fabricated.)

2. **Build the 7-segment Q&A table** — structure a two-column table across all seven segments in dependency order:
   - ① Company Overview & Management
   - ② Products, Services & Operations
   - ③ Sales, Marketing & Customers
   - ④ Market & Competitive Landscape
   - ⑤ Financial Performance
   - ⑥ Growth Strategy & M&A
   - ⑦ Legal, Regulatory & Risk

   Column headers: **Key Diligence Question** | **Relevant Data Room Files**

   Right-column format per entry: **File name → page / slide / section → one-line description of what it addresses**. For Excel files: cite tab and cell range.

   Number questions consecutively across all seven segments (Q1, Q2, Q3… never reset per segment) so question numbers tie directly to the completeness checklist and gap list.

3. **If the user provided a VDR request list**: add a third column mapping each question simultaneously to (a) the user's request list items and (b) the standard seven-segment map (dual-mapping).

4. **Build the Completeness Checklist** — four columns: **Section / Key Question / Status / Coverage Notes**
   - Status symbols: ✓ Complete / Δ Partial / ✗ Not Addressed
   - For every Δ entry: state both what was provided and what is still missing
   - Display section name only in the first row of each section group (do not repeat per row)

5. **Write the Summary Assessment** — one sentence containing: (a) qualitative rating (Strong / Adequate / Weak) and (b) quantitative count in the form "[X] of [Y] questions fully addressed, [Z] partial." Follow with gap bullets referencing specific Q-numbers. The rating, counts, and gap list must be internally consistent with the checklist.

6. **Draft Follow-Up Requests** — one action item per specific gap, written as direct imperatives ("Request…", "Provide…", "Clarify…"). If only minor gaps remain, append one standing request for the most recent LTM operating KPIs.

7. **Deliver** — render the full memo in chat and save as .docx. These are defaults only when the user has not selected a format; honor the requested format and length.

### Financial Performance Segment — Additional Build Notes

- Treat this segment as a comprehensive index of every financial file in the room.
- Distinguish explicitly between underlying source data present in the room (audit files, working financial model) versus financial information that has been summarized or excerpted in a CIM or management presentation only.
- Multiple EBITDA versions are expected (seller-reported, seller-side Quality of Earnings). Index every version to its source document; do not collapse them.

---

## Defaults

| Parameter | Default / override |
|---|---|
| Delivery format | Chat full render + .docx on every output |
| Question numbering | Continuous across all 7 segments, never reset |
| Right-column citation depth | File name + page/slide/section + one-line description; Excel → tab + cell range |
| Status vocabulary | ✓ Complete / Δ Partial / ✗ Not Addressed only |
| Summary assessment format | One sentence: qualitative rating + "[X]/[Y] full, [Z] partial" + gap bullets with Q-numbers |
| Follow-up request style | Direct imperatives ("Request…", "Provide…", "Clarify…"), one per gap |
| Placeholder resolution | `[COMPANY_NAME]` and equivalent placeholders resolved to true name; never printed as brackets |

---

## Rules & Pitfalls

**Never:**
- **Never fabricate a file name, page number, slide number, section reference, tab name, or cell range**
- **Never write "see the CIM" or any similarly vague pointer**
- **Never repeat or paraphrase seller marketing language as fact**
- **Never assess investment merit in the Q&A table or completeness checklist**
- **Never apply a Strong rating or inflate ✓ counts to make a data room appear more complete than it is**

**Conditional:**
- **If the user provides a VDR request list**: apply dual-mapping — add a third column that maps each question to both the user's request list items and the standard seven-segment framework simultaneously.
- **If a document is cited across multiple questions**: list it in full under each relevant question; one file legitimately appears under several segments and should not be artificially consolidated.
- **If a segment has thin coverage**: do not invent questions to pad it — flag the weakness explicitly and note that the DD Question Creator playbook should be used to generate additional targeted questions for that segment.
- **If a gap exists in the Financial Performance segment**: distinguish whether the gap is (a) a content gap (data never provided), (b) a time gap (e.g., only one year provided where three years are needed), or (c) a basis gap (M&A-inclusive figures cited elsewhere but no organic/standalone numbers present) — all three gap types must be labelled distinctly.
- **If M&A activity is referenced anywhere in the data room**: check whether organic/standalone figures exist for revenue, EBITDA margin, and customer metrics. Absence of organic/standalone data when an acquisition is referenced is a basis gap and must be flagged ✗ or Δ — buy-side underwriting requires organic performance.

**Judgment:**
- **Treat Partial and Not Addressed items as the primary deliverable** — a data room with strong coverage is easy to navigate; the memo earns its value by surfacing what is missing before the team commits diligence resources.
- **Evaluate financial files for substance, not presence** — a file being present does not mean the underlying data is available; a CIM that summarises financials is not a substitute for audit financials or a working model. Flag the distinction explicitly in the Financial Performance segment.
- **Gap dimensions are multi-axis** — assess gaps across content (topic not addressed), time (insufficient historical or forward period), and basis (organic vs. acquired, or different consolidation scope); a data room can pass a content check and still carry significant time and basis gaps.

---
## Pre-Delivery Checks

- Question numbers run consecutively from Q1 through the final question across all seven segments with no resets and no duplicate numbers.
- Every right-column bullet contains a real file name, a specific location (page / slide / section; tab + cell for Excel), and a one-line description — flag and remove any entry that cannot satisfy all three elements.
- No file name, page, slide, section, tab, or cell range was inferred or generated rather than directly observed in the uploaded data room materials.
- The Summary Assessment qualitative rating (Strong / Adequate / Weak) is consistent with the distribution of ✓ / Δ / ✗ statuses in the checklist.
- The quantitative count ("[X]/[Y] full, [Z] partial") in the Summary Assessment exactly matches the ✓ and Δ counts in the checklist — foot the numbers.
- Every gap bullet in the Summary Assessment references a specific Q-number that exists in the Q&A table.
- The Financial Performance segment indexes all EBITDA versions present in the room as separate line items.
- The Financial Performance segment distinguishes source data files (audit, model) from summary presentations.
- Each Follow-Up Request targets exactly one specific gap and is written as a direct imperative ready to send to the seller.
- Both chat full-text render and .docx file are produced before closing the deliverable.
---

## Scope Boundaries
This task maps received data-room materials to diligence gaps. Fresh request-list generation, tracker management, and interview agendas are separate workflows.

---


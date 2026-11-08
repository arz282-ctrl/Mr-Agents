# Public Information Book (PIB)

> **Sections**: Ask First · Workflow · Defaults · Rules & Pitfalls · Pre-Delivery Checks · Scope Boundaries
> **Must not skip**: Defaults · Rules & Pitfalls · Pre-Delivery Checks · Scope Boundaries — return here before delivery.
> **Formats**: document_standards.md

> Task `public-information-book` in group `company-analysis`. Read [`_overview.md`](_overview.md) first for group-level scope, shared defaults, and format dependencies.

**Use when**: A compiled reference of all public materials on a target company is needed for deal preparation, coverage initiation, or diligence | **Deliverable**: Single merged PDF with cover page, clickable table of contents, section divider pages, and up to 5 content sections

---

## Ask First
1. **Time window** — How many days back should the news, press releases, and non-core research reach? *(Default: 90 days)*
2. **Section selection & order** — Which of the 5 standard sections are needed, and in what order? *(Default: I Earnings Releases → II Investor Presentations → III Transcripts → IV News Run → V Sell-Side Research)*
3. **Rating agency reports** — Are authorized Moody's/S&P/Fitch reports available through connected sources or user files? Inspect access before requesting uploads; a paywall is not proof that all authorized retrieval is unavailable.
4. **SEC filings** — Include 10-K / 10-Q? *(If the company had an IPO within the last 2 years, also ask: include S-1?)*

---

## Workflow

1. **Confirm scope** — Resolve all four Ask First items before retrieving content. Lock section list, order, and time window.

2. **Pull Section I — Earnings Releases** — Retrieve the single most recent full earnings release document in its entirety. This item is time-window-exempt; always include regardless of the window set in step 1.

3. **Pull Section II — Investor Presentations** — Retrieve the single most recent full investor / earnings presentation deck in its entirety. Time-window-exempt; always include.

4. **Pull Section III — Transcripts** — Retrieve the 2 most recent transcripts (earnings calls, investor days, or conferences). These 2 are time-window-exempt; always include. Add further transcripts only if they fall within the confirmed time window.

5. **Pull Section IV — News Run** — Retrieve full-text news articles and press releases within the confirmed time window. Apply the news filtering rules (see Rules & Pitfalls) to arrive at ≤10 articles. Sort newest-to-oldest within the section.

6. **Pull Section V — Sell-Side Research** — Default to the 3 most recent accessible relevant notes plus up to 2 initiation reports when within scope. Verify authorized access and reproduction rights; retain required disclaimers, disclosures and analyst certification/attribution. If permission or access is missing, use the permitted linked/excerpt substitute and disclose the gap.

7. **Pull optional Section VI — Rating Agency Reports** — Include only if the user has uploaded the files; retrieve nothing independently.

8. **Pull optional Section VII — SEC Filings** — If elected, include 10-K, 10-Q, and S-1 (IPO within 2 years only). Place this section after sell-side research and rating agency reports.

9. **Apply 12-month extended window for major transaction materials** — For any presentation, transcript, or press release directly related to M&A, capital markets transactions (debt issuance, equity follow-on, IPO), or a significant refinancing: extend the retrieval window to 12 months regardless of the window confirmed in step 1. Flag to the user any relevant items older than 12 months but do not include them.

10. **Clean all PDFs before assembly** — Test-render each document. For embedded ads, full-page images, or broken layout, extract headline, date, source, and full body text into a clean Word document; convert to PDF and retain the source URL at top.

11. **Assemble merged PDF in confirmed section order**:
    - **Cover page**: company name, company logo (high-quality; transparent background preferred), date of compilation
    - **Table of contents**: one entry per section, each entry hyperlinked to its corresponding section divider page
    - **Section divider page** (portrait): section number and title
    - **Section content**: documents sorted newest-to-oldest within each section
    - Repeat divider → content block for each included section

12. **Run Pre-Delivery Checks** (see checklist below) before releasing the PDF.

### Summary Table Structure — Fallback for Sell-Side Research

If no sell-side research is accessible and the user cannot supply documents, replace Section V with a single-page summary table:

| Field | Source |
|---|---|
| Latest closing price | Market data |
| Market capitalisation | Market data |
| Enterprise value | Market data / latest filing |
| 52-week high / low | Market data |
| LTM revenue multiple | Calculated |
| NTM revenue multiple | Consensus estimates |

---

## Defaults

**Apply defaults only where the caller has not selected a format or supplied a required assumption; disclose them at delivery.**

| Parameter | Default |
|---|---|
| Time window | 90 days |
| Number of sections | 5 (I–V as listed in Workflow) |
| Section content sort order | Newest-to-oldest within each section |
| Earnings release | Most recent full release; time-window-exempt |
| Investor presentation | Most recent full deck; time-window-exempt |
| Transcripts | 2 most recent; time-window-exempt |
| Initiation-of-coverage research | Always include regardless of time window |
| Sell-side research pull | 3 most recent top-tier notes + 2 most recent initiations |
| Major transaction extended window | 12 months |
| News article cap | ≤10 total |
| Same-topic article cap | ≤2 per topic; retain the 2 most authoritative/complete |
| Same-day article cap | ≤2 per calendar day |
| Page numbers | None |
| Cover / TOC / divider orientation | Portrait |
| Presentation orientation | Native (do not rotate) |
| Logo quality | High-resolution; transparent background preferred |
| Research disclaimer / disclosure pages | Preserve required notices; apply actual license and user-authorized scope, never strip automatically |

---

## Rules & Pitfalls

**Never:**
- **Distinguish original documents from substitutes** — default to authorized original source documents for a PIB. If only a permitted excerpt, link or summary is available/requested, label that form clearly and state the gap; never present rewritten text as an original source document.
- **Do not present a headline as a complete article** — include the authorized full source when permitted; otherwise use a cited link or permitted excerpt and identify the missing full text. A PIB format does not authorize reproducing third-party articles.
- **Never add page numbers** — the PDF uses internal hyperlinks for navigation; page numbers create a false pagination that breaks when documents are later updated or reordered.
- **Preserve required source notices and attribution** — retain investment content and applicable disclosures according to the actual license/permission; do not remove disclosures by default. If full reproduction is unauthorized, provide permitted excerpts, links or a clearly labeled substitute with the gap disclosed.
- **Never rotate a landscape presentation to portrait** — preserve native orientation; a sideways-rotated presentation is unusable and signals poor production quality.
- **Never fabricate content** — if a document cannot be retrieved, flag the gap explicitly and fall back to the approved substitute (e.g., summary table for missing research). No placeholders, no synthesised text presented as source material.

**Conditional:**
- **If a PDF conversion produces embedded ads, full-page images, or broken layout**: fall back to extracting title, date, source name, and full body text into a clean Word document, convert that to PDF, and preserve the original source URL at the top of the page.
- **If the user has no access to sell-side research and cannot upload documents**: replace Section V with the fallback summary table (latest close, market cap, EV, 52-week high/low, LTM and NTM revenue multiples).
- **If rating agency reports are required:** inspect authorized connected/library access first; if unavailable, request the source files and disclose the gap. Never bypass access controls or claim retrieval without the actual document.
- **If a presentation, transcript, or press release is related to M&A, a capital markets transaction, or a significant refinancing**: apply a 12-month retrieval window to that item regardless of the time window confirmed with the user; flag any relevant items older than 12 months to the user but do not include them.
- **If the company IPO'd within the last 2 years**: ask whether to include the S-1 before building; do not assume inclusion or exclusion.
- **If the user requests fewer than 5 sections**: include only the elected sections; never pad the book with unrequested content.
- **If more than 2 articles cover the same topic**: retain only the 2 most authoritative or information-complete articles and discard the rest — do not include all of them on the grounds that they fall within the time window.

**Judgment:**
- **Prioritise relevance over volume in the news run** — focus on M&A activity, capital markets transactions, management / board changes, new product launches, partnerships and joint ventures, and litigation. Exclude industry overview articles that merely mention the company in passing, because they add noise and dilute the signal for a reader looking for company-specific developments.
- **Select "most authoritative / most information-complete" when deduplicating same-topic articles** — a wire service original typically outranks a secondary aggregator republication; a longer article with named sources outranks a brief item.
- **When the company logo is unavailable in high resolution**: source the highest-quality available version and flag the limitation at delivery rather than omitting the logo — a missing logo is a listed quality failure and must be disclosed.

---

## Pre-Delivery Checks

- Verify cover page logo is present, high-quality, and correctly identifies the target company
- Verify every section listed in the table of contents has a corresponding section divider page in the body of the PDF
- Verify every section divider page in the body of the PDF appears in the table of contents (no orphaned sections)
- Verify every table of contents hyperlink resolves correctly to its corresponding section divider page (internal links only; no external URLs in the TOC)
- Verify each section divider is immediately followed by the correct section's content
- Verify the most recent earnings release is included in full and is the latest publicly available version
- Verify the most recent investor presentation is included in full and is the latest publicly available version
- Verify the 2 most recent transcripts are present
- Verify all time-window-constrained content (news, non-initiation research, non-latest presentations) falls within the confirmed window
- Verify no content has been fabricated, paraphrased, or substituted without explicit disclosure
- Verify all embedded PDFs render cleanly — no blank pages, corrupted pages, missing pages, or blurred text
- Verify all presentation pages display in their native orientation (no sideways / rotated pages)
- Verify no page numbers appear anywhere in the assembled PDF
- Verify all portrait-orientation requirements are met for cover, table of contents, and section divider pages
- Verify source notices, disclosures, attribution and analyst certifications are retained where required, and reproduction/sharing follows the actual permission and audience.
- Verify total news article count is ≤10, same-topic count is ≤2, and same-day count is ≤2
- Verify each news item is an authorized complete source or a clearly identified permitted excerpt/link; identify missing full text without inventing it.

---

## Scope Boundaries

The PIB is a compilation of original source documents and performs no analysis or summarisation — analytical work on the same materials (e.g., screening for negative press, synthesising earnings results) is handled by the Negative News Screener and Earnings Update playbooks respectively. SEC filing diligence beyond simple inclusion in a PIB section (e.g., covenant analysis, footnote extraction) falls outside this playbook's scope.

---


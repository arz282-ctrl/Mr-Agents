# Earnings Update

> **Sections**: Ask First · Workflow · Defaults (apply silently, disclose at delivery) · Rules & Pitfalls · Pre-Delivery Checks · Scope Boundaries · Task-specific verification
> **Must not skip**: Rules & Pitfalls · Pre-Delivery Checks · Scope Boundaries — return here before delivery.

> Task `earnings-update` in group `company-analysis`. Read [`_overview.md`](_overview.md) first for group-level scope, shared defaults, and format dependencies.

**Use when**: A listed company has reported earnings and requires a structured update covering actuals vs. consensus/guidance, price reaction, call highlights, and revised outlook | **Deliverable**: Email, Word memo, or PowerPoint deck per the user's requested format and length

## Ask First
1. What is the output format — email, Word memo, or PowerPoint deck? (If the user supplies a template, that template governs all layout choices.)
2. Which company and which reporting period? (Confirm fiscal year type — calendar vs. non-standard — before labeling any quarter.)
3. Is this a quarterly update, a full-year (Q4) update, or both?
4. Are there any recent M&A transactions that require organic vs. acquisition-driven separation?

## Workflow

1. **Source and validate inputs** — Collect the latest earnings release, press release, call transcript, investor presentation, and supplemental filings; confirm they are within three months. Establish the fiscal-year convention before labeling quarters. Use broker research/news only for consensus and context; verify cited figures against official filings.

2. **Build financial and operating analysis** — Extract P&L, balance-sheet, cash-flow, and segment KPIs. Strip one-time items, align GAAP/adjusted measures to the company’s disclosure, reconcile broker non-GAAP definitions to it, and separate organic from recent-M&A growth.

3. **Define consensus** — Calculate the arithmetic mean of current pre-announcement broker estimates; remove outliers and footnote the count and reason. Flag metrics with <5 covering brokers and footnote source, estimate count, and broker list.

4. **Determine beat/miss** — For higher-is-better metrics, actual > consensus = beat; for costs, expenses, and cash outflows, actual < consensus = beat. Use green for beat and red for miss.

5. **Analyze price reaction** — Use same-day return for pre-market/intraday releases and next-day return for after-market releases. Benchmark to a geographically and sector-appropriate index; explain counterintuitive moves with whisper-number and management-tone analysis.

6. **Analyze the call** — Identify confident/cautious/defensive management tone, extract key Q&A, separate prepared remarks from Q&A, and tag themes as quarterly or full-year.

7. **Draft strategic insights** — Present history before outlook, limit sections to 3–5 bullets, and attach a comparator to every number. Note multi-quarter beat/miss streaks and compare top KPIs with recently reporting direct competitors.

8. **Build the financial table(s)** — Follow the mandatory column order and footnote conventions described in the [Financial Table Structure](#financial-table-structure) subsection below.

9. **Assemble** the selected deck, email, or PIB handoff using the applicable layout below.

10. **Run pre-delivery checks** — Complete every item in Pre-Delivery Checks before releasing.

---

### Financial Table Structure

**Quarterly table — mandatory column order (left to right):**

| Column | Content |
|---|---|
| 1 | Actual — labeled `Q# 'YY` |
| 2 | Consensus estimate |
| 3 | Beat/Miss — integer-metric variances in %; percentage-point metrics in bps; green = beat, red = miss |
| 4 | Prior-year same period |
| 5 | YoY change |
| 6 | Prior guidance (include whenever the company has previously issued guidance for that KPI and period) |

- KPIs follow P&L line order; underlying/segment KPIs appear *above* their corresponding P&L line.
- Table footnote must state: consensus source, number of estimates included, broker names or identifiers used.
- Annotate each row that has a corresponding commentary bullet with a circled number (e.g., ②); the same circled number appears in the bullet — the two must stay in sync.

**Annual / full-year table (Q4 update):**
- Remove the consensus estimate and Beat/Miss columns.
- Retain the vs. Prior Guidance column.
- Provide both a quarterly table *and* a full-year table when reporting a fiscal year-end quarter.

---

### Deliverable Layouts

**Deck (suggested concise structure; typically 3–4 slides when no page count or template is specified):**

| Slide | Content |
|---|---|
| 1 | Quarterly overview — financial table + price reaction; *must function as a standalone executive summary for the entire deck* |
| 2 | Annual overview (include for Q4 / full-year reports) |
| 3 | Outlook & guidance — guidance table with prior-guidance comparison column, revised-guidance color coding (green / red / neutral), qualitative characterization |
| 4 | Key themes & Q&A summary |

- Combine, split, add, or omit slides as needed to follow the user's instruction or template and to preserve readability and material content. Do not create empty slides merely to reach the suggested range.
- Apply the company's own brand color palette.

**Email:**
- Opening: 2–3 sentences covering beat/miss verdict, price reaction and its explanation, and the analyst's view.
- Body: detailed bullet points by topic.
- Attachment or inline: financial table.
- Closing section: guidance update and analyst focus points.

**PIB handoff:** If a full Public Information Book is required, invoke the PIB Builder playbook (standard 3–5 broker reports) as a separate deliverable.

---

## Defaults (apply silently, disclose at delivery)

| Parameter | Default |
|---|---|
| Reporting period | Most recent completed quarter |
| Consensus definition | Arithmetic mean of the most recent pre-announcement broker estimates, outliers removed |
| Outlier removal | Remove extreme deviations; note count and rationale in footnote |
| Low-coverage flag threshold | < 5 covering brokers |
| One-time items vs. guidance/consensus | Strip true one-time items by default |
| Beat/Miss display | Integer metrics: percentage variance; percentage-point metrics: bps variance |
| Guidance characterization threshold | Midpoint vs. consensus median ±10% = more aggressive / more conservative |
| Guidance range display | Show full range; where one bound changes, state which and by how much |
| Price reaction window | Same-day for pre-market/intraday; next-day for after-market releases |
| Price reaction benchmark | Geographically and sector-matched index |
| Deck color scheme | Company’s brand palette |

---

## Rules & Pitfalls

**Never:**
- **Use the requested source basis and qualify its evidence** — official filings/releases are the default for reported results. If the user explicitly requests a broker or media series, retain that series with source/date/definition labels; distinguish it from verified issuer actuals and show material conflicts under the source policy.
- **Never apply annual commentary to a standalone quarterly result, or quarterly commentary to a full-year result** — management at Q4 calls routinely discusses full-year themes; mislabeling the scope of a comment is a factual error, not a style issue.
- **Never mix GAAP and non-GAAP figures within the same comparison or row** — always label each metric as GAAP or adjusted; never compare a GAAP actual to a non-GAAP consensus estimate (or vice versa) unless you have explicitly reconciled the two on a like-for-like basis.
- **Never collapse a guidance range to its midpoint** — doing so discards information about which end of the range management is more confident about and strips the reader of the ability to assess scenario outcomes.
- **Never apply a beat/miss direction without first determining whether the metric is "higher-is-better" or "lower-is-better"** — classifying a cost line as a miss because it came in below consensus is among the most common and most damaging errors in an earnings update.
- **Adapt a private-company earnings update to available evidence** — use authorized company statements, user files or public debt/other filings. Omit inapplicable share-price/consensus sections and disclose gaps. Private status alone does not make financial reporting unavailable; do not fabricate missing audited statements.

**Conditional:**
- If the company completed a material acquisition recently, disaggregate reported growth into organic and acquisition-driven components before presenting any revenue or volume KPI; do not present blended growth without disclosure.
- If the company has a non-calendar fiscal year (e.g., fiscal year ending in May, September, or another non-December month), resolve the fiscal quarter label *before* building any table or writing any commentary — mislabeled quarter tags propagate errors throughout the entire document.
- If a competitor in the same sector has reported in the same earnings season, include a relative comparison on the most important headline KPIs at the top of the analysis.
- If the company has previously issued guidance for a specific KPI and period, always include a "Prior Guidance" column for that KPI — omitting it when it exists conceals a meaningful reference point.
- If non-GAAP definitions differ across brokers contributing to the consensus, reconcile all broker estimates to the company's own disclosed non-GAAP definition before computing the consensus mean.
- If actual results deviate from consensus or guidance by more than ±10% on any metric, flag the variance explicitly, confirm whether it is attributable to a one-time item, and verify that the non-GAAP/GAAP scope is correctly aligned before finalizing the beat/miss assessment.
- If the stock price reaction is counterintuitive relative to the reported beat/miss (e.g., beat on revenue and earnings yet the stock declines), apply whisper-number analysis (buy-side expectations that diverged from published consensus) and management-tone assessment to provide a substantive explanation; do not leave an anomalous price move unexplained.

**Judgment:**
- Treat management tone (confident / cautious / defensive) as an independent qualitative data point that frequently explains more of the share price move than the quantitative results alone — give it a dedicated section or clearly labeled bullet rather than burying it in the call summary.
- When consensus coverage is thin (5–8 brokers) but above the flag threshold, note the limited sample in the footnote even without a formal flag; readers should be aware of reduced statistical reliability.
- When characterizing a guidance revision as positive or negative, specify *which* KPI was revised, *which* end of the range moved, and *by how much* — qualitative labels alone ("positive revision") are insufficient for an institutional audience.
- When a company has beaten consensus for multiple consecutive quarters, note the streak and assess whether the current result continues or breaks the pattern; this context shapes how the market is likely to interpret the update.
- Prefer the company's own disclosed adjusted metric over a broker-constructed adjusted metric when both are available; the company's definition is the one management uses internally and the one investors ultimately hold them accountable to.

---

## Pre-Delivery Checks
- Confirm every financial figure traces directly to an official filing, earnings release, or call transcript — not to a news article or broker note used as a primary source.
- Verify that every number in the commentary bullets carries at least one comparator (vs. prior year, vs. consensus, or vs. prior guidance); standalone numbers with no context must be revised before delivery.
- Confirm beat/miss direction is determined by metric nature ("higher-is-better" vs. "lower-is-better") — spot-check at least one cost or cash-outflow line explicitly.
- Verify beat/miss color coding: green = beat, red = miss; confirm cost/expense lines are coded on the inverse logic.
- Confirm GAAP and non-GAAP figures are not mixed in any single comparison row; every metric is labeled with its accounting basis.
- Confirm that non-GAAP broker estimates used in consensus are reconciled to the company's own non-GAAP definition.
- Confirm true one-time items have been stripped from actuals when comparing to guidance or adjusted consensus.
- Verify the fiscal year type is correctly identified and all quarter labels are accurate.
- Confirm quarterly commentary and annual commentary are scoped separately; for a Q4/year-end update, verify both a quarterly table and a full-year table are present.
- Verify any actuals vs. consensus/guidance variance exceeding ±10% has been flagged and the cause (one-time item, non-GAAP mismatch, or genuine operating surprise) is documented.
- Confirm consensus footnote is present on the quarterly table, including: source, number of estimates, broker identifiers, and any outliers removed.
- Flag and note in the document if consensus coverage is fewer than 5 brokers.
- Confirm the guidance table includes a "Prior Guidance" column for every KPI for which prior guidance has been issued.
- Confirm guidance ranges are displayed in full; verify no range has been collapsed to a midpoint.
- Where only one bound of a guidance range changed, confirm the document specifies which bound moved and by how much.
- Confirm guidance characterization (aggressive / in-line / conservative) is based on midpoint vs. consensus median with the ±10% threshold applied.
- Verify price reaction uses the correct window: same-day for pre-market/intraday releases, next-day for after-market releases.
- Confirm the price reaction benchmark is geographically and sector-matched to the subject company.
- Where a counterintuitive price move exists, confirm a whisper-number and/or management-tone explanation is present.
- If a recent acquisition exists, confirm organic and acquisition-driven growth are disaggregated in all relevant KPIs.
- Verify circled-number cross-references are consistent: every circled number in a commentary bullet has a matching circled number on the corresponding table row, and no orphaned references exist in either direction.
- Confirm all units are consistent within each table (currency, millions/billions, %, bps).
- Confirm the deck's first slide can serve as a standalone executive summary.
- Confirm the deck follows the user's requested format, length, and template; when none is specified, use the suggested concise structure, preserve material content and readability, and include no empty slides.
- Confirm the company's brand color palette is applied to the deck.
- If the subject company is private, stop and flag — do not deliver.

---

## Scope Boundaries
The PIB Builder playbook handles compilation and formatting of public information books from multiple broker reports and is invoked as a separate deliverable when a full PIB is required alongside this update. The Broker Research Digest playbook handles aggregation and summarization of broker viewpoints and is the correct tool when the primary output is an analysis of analyst opinions rather than company-reported results. This playbook covers only listed companies reporting earnings from official disclosed documents.

---

## Task-specific verification

Compare matching GAAP/adjusted basis and fiscal period. Variance=(actual−consensus)/abs(consensus); a zero denominator is N/M and equality is in-line. Favorable direction is metric-specific. FCF=CFO−nonnegative capex outflow. Preserve full guidance ranges. Price windows: pre-market prior close→same-day close; after-market announcement close→next close; intra-day specified pre-announcement VWAP/mid→specified post window. Use the same benchmark window and exchange timezone.


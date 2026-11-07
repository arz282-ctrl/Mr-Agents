# Public Comps

> **Sections**: Ask First · Workflow · Defaults (apply silently, disclose at delivery) · Rules & Pitfalls · Pre-Delivery Checks · Scope Boundaries · Task-specific verification
> **Must not skip**: Rules & Pitfalls · Pre-Delivery Checks · Scope Boundaries — return here before delivery.
> **Formats**: excel_standards.md · metric_disambiguation.md

> Task `public-comps` in group `valuation`. Read [`_overview.md`](_overview.md) first for group-level scope, shared defaults, and format dependencies.

**Use when**: Valuing a company using current market pricing of publicly traded peers | **Deliverable**: Excel workbook with a single "Comps Sheet" tab containing peer groupings, market and operating statistics, valuation multiples, historical trading context, and summary statistics

## Ask First
1. Which company is the subject, and what is the pricing date (default: most recent trading day)?
2. What is the target universe — industry, geography, and any anchor peers the client has already identified?
3. What reporting currency should the table use (default: USD)?
4. Is the target company public or private? (If private: confirm the user will supply financials; market-data columns will be omitted with a footnote citing the non-public source.)

## Workflow

**Step 0 — Confirm inputs**
Lock pricing date, currency, subject company identity, and any seed peer list before touching data.

**Step 1 — Define the comp set**
1. Start with the subject company's self-reported peer group from its most recent proxy statement or 10-K.
2. Refine the list by business model similarity, then scale, growth profile, and margin profile — in that priority order.
3. Segment into **Core (6–10 peers)** and **Secondary (6–10 peers)**; document the rationale for each inclusion/exclusion.
4. Flag and remove any peer with **fewer than 2 quarters of public trading history** unless it is uniquely relevant, in which case add a footnote.
5. Flag peers affected by transformative M&A, spin-offs, carve-outs, restatements, segment reclassifications, or short listing history — these impair comparability and must be footnoted.

**Step 2 — Build the table (11-column group structure)**

Construct columns in the following dependency order (later columns require earlier ones to be locked):

| Column Group | Contents |
|---|---|
| **Company info** | Name, ticker, group label (Core / Secondary / Target) |
| **Market data** (all as-of same pricing date) | Share price, fully diluted shares outstanding (TSM), market cap, TEV, % of 52-week high |
| **Capital structure bridge** | Gross debt (excl. operating lease liabilities), cash, preferred equity, minority interest → TEV reconciliation |
| **LTM operating statistics** | Revenue, Adj EBITDA, Adj EBITDA margin, capex, Adj net income |
| **NTM estimates** | Revenue, Adj EBITDA, EPS (consensus median, direct — do not derive from NI ÷ FDSO) |
| **LTM multiples** | TEV/Revenue, TEV/EBITDA, P/E |
| **NTM multiples** | TEV/Revenue, TEV/EBITDA, P/E |
| **Historical trading context** | L5YA TEV/NTM EBITDA (monthly-end observations, 60 data points; mark NM if insufficient history; disclose observation frequency) |
| **Summary statistics** (per group + All Comps) | Mean, 25th percentile, Median, 75th percentile |

Build the target company row last: highlight it distinctly, populate it on an identical line-item basis, and **exclude it from all summary statistics**.

**Step 3 — Apply industry adjustments**
Replace or supplement standard TEV-based columns based on sector:

| Sector | Use instead of / in addition to standard multiples |
|---|---|
| Banks | P/TBV, P/E, NIM; drop TEV-based columns |
| REITs | FFO, AFFO, NAV multiples |
| SaaS / software | ARR, NRR multiples |
| Insurance | P/BV, combined ratio |
| E&P | EV/EBITDAX |

Remove columns that are not applicable to the sector; do not leave blank columns in the deliverable.

**Step 4 — Populate summary statistics and run sanity checks**
Build live formula-based summary statistics; run all Pre-Delivery Checks before delivery.

### Summary Statistics — Excel Mechanics

- Use `PERCENTILE(range, 0.25)`, `PERCENTILE(range, 0.75)`, `MEDIAN(range)`, and `AVERAGE(range)` exclusively.
- Use `IFERROR(formula, "")` to suppress errors; apply a number format that displays zero as a dash — do **not** hard-code the string `"-"`.
- For the **All Comps** row that spans groups separated by header/spacer rows: build hidden helper columns that collect each group's values into a contiguous range, then point the summary formulas at those helper columns.
- Display negative numbers in parentheses; place units in column headers only — cells must contain pure numbers to remain sortable.

---

## Defaults (apply silently, disclose at delivery)

| Parameter | Default / override |
|---|---|
| Pricing date | Most recent trading day |
| Reporting currency | USD; convert non-USD peers at as-of spot FX and disclose rate/source |
| SBC treatment | Expense, not add-back, uniformly across the comp set |
| TEV construction | `Market cap + gross debt (excl. operating lease liabilities) + preferred equity + minority interest − cash` |
| Diluted share count | TSM for equity-value and per-share metrics |
| Forward estimates / EPS | Sell-side consensus median; direct EPS, not net income ÷ FDSO |
| Adj EBITDA | Company-reported; otherwise GAAP with one consistent SBC convention and footnoted analyst adjustment |
| Historical context | L5YA TEV/NTM EBITDA, monthly-end, ~60 observations |
| Peer selection / size | Relevance (business model, growth, margin) over size; Core 6–10 + Secondary 6–10 |
| `NM` | Zero, negative, missing, or inapplicable denominator |
| Outlier review | TEV/Revenue >30x, TEV/EBITDA >50x, or P/E >75x |

## Rules & Pitfalls

**Never:**
- **Never use a mixed pricing date across peers** — even a one-day lag on share price corrupts the comparability of all market-derived columns and is immediately visible to any reviewer.
- **Never add back SBC for a subset of peers** — partial add-back makes multiples incomparable across the set; SBC treatment must be identical for every row in the table.
- **Never silently substitute unadjusted GAAP EBITDA for Adj EBITDA** — the resulting multiple is not comparable to company-reported or consensus Adj EBITDA multiples and will misstate the valuation reference range.
- **Never approximate percentiles using `SMALL` / `LARGE` with a hand-picked array** — results differ from true PERCENTILE interpolation and are not reproducible; use `PERCENTILE()` exclusively.
- **Never use the `@` implicit intersection operator in array formulas** — it silently breaks array functions without producing a visible error, causing summary statistics to compute on a single cell rather than the intended range.
- **Never include the target company row in summary statistics** — including it creates circular logic; the comp set exists to benchmark the target, not to be contaminated by it.
- **Never mix calendar-year and fiscal-year periods in the same LTM or NTM column** — peers with non-December fiscal year-ends must be calendarised; if calendarisation is not performed, disclose the fiscal year-end dates in a footnote.
- **Distinguish quoted market cap from diluted valuation equity value** — current price × actual outstanding shares gives quoted market cap. If using a fully diluted convention, label it and reconcile option proceeds/conversion/debt consistently across peers; do not silently relabel it as the quoted cap.

**Conditional:**
- **If a peer follows IFRS 16 (or ASC 842) and has capitalised its operating leases**, flag the accounting standard difference; IFRS 16 capitalisation inflates reported EBITDA relative to US GAAP peers and impairs comparability of TEV/EBITDA multiples — quantify the impact or exclude the lease-adjusted figures with a footnote.
- **If a peer has multiple share classes or a dual primary listing**, include all share classes that participate in common equity when computing market cap; use the primary-listing share price and share count, convert to reporting currency at as-of spot FX rate, and disclose the FX rate and listing choice in a footnote.
- **If fewer than 3 sell-side analysts cover a peer's NTM estimates**, flag the low coverage count in a footnote; exclude that peer's NTM multiples from NTM summary statistics and mark the cells NM.
- **If a peer's LTM financials include a material acquisition**, present pro-forma LTM revenue, EBITDA, and margins as if the combined entity existed for the full period; footnote the source and nature of pro-forma adjustments.
- **If analyst-calculated adjustments to EBITDA deviate materially from the company's self-reported figure**, footnote the methodology and flag unusually aggressive adjustments for senior review before locking the model.
- **If an outlier multiple is triggered** (TEV/Revenue > 30×, TEV/EBITDA > 50×, P/E > 75×), verify source data first; if the data is correct and the peer is structurally different, consider reporting a "Mean (ex. outliers)" row for multiples exceeding 100× — note that median and percentile statistics are naturally robust to outliers.

**Judgment:**
- **Prefer business-model relevance over market-cap size when selecting comps** — a smaller but structurally identical peer produces a more defensible multiple than the largest-cap name in a broadly defined sector.
- **Use the subject company's proxy/10-K self-reported peer group as the starting point, not the endpoint** — self-reported peers reflect management's own framing but may be aspirational or stale; refine by business model fit, growth, and margin profile.
- **When Adj EBITDA adjustments appear abnormally large relative to GAAP EBITDA**, flag for senior review before using — the multiple implied by an aggressively adjusted denominator may not be credible to a counterparty or fairness opinion reviewer.
- **For private targets, omit all market-data columns rather than leaving them blank** — blank market columns on a private target invite misreading; footnote the non-public financial data source.

---

## Pre-Delivery Checks

- Pricing date, reporting currency/FX, `market cap = price × TSM FDSO`, and the TEV bridge are consistent across peers.
- LTM/NTM calendarization, consensus-median estimates, direct EPS, uniform SBC treatment, and lease treatment pass.
- `NM` does not distort statistics; formulas use only required `PERCENTILE`, `MEDIAN`, and `AVERAGE` functions without `@` or `SMALL`/`LARGE`.
- Target is highlighted and excluded; All Comps helper-range result matches manual combination; values are numeric with prescribed number formats.
- Flag required coverage, outlier, and historical-observation disclosures.

## Scope Boundaries

**Precedent Transaction Comps** handles deal-implied multiples from historical M&A transactions (which embed control premiums) rather than current market trading multiples — use that playbook when the valuation context is a change-of-control transaction.
**DCF** handles intrinsic valuation from projected free cash flows — use that playbook when the engagement requires an independent view of fundamental value rather than a market-derived reference range.
**Peer Identification** handles the research and screening process for candidate peers without building the comp table — use that playbook when the comp set itself is under debate and requires a stand-alone deliverable.

---

## Task-specific verification

Choose one common lease basis: post-rent earnings with EV excluding lease debt, or lease-financing adjusted EV including lease debt and a consistent pre-rent EBITDA/EBITDAR reconciliation. IFRS16 EBITDA cannot be combined with EV excluding leases without a rent adjustment. Record lease_basis, rent, lease_debt, EV inclusion and EBITDA reconciliation per peer.


Valuation basis reference: [Damodaran operating-lease adjustments](https://pages.stern.nyu.edu/adamodar/pdfiles/papers/newlease.pdf). Reconcile numerator and denominator under a common lease basis.

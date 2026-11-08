# Cross-Holder Analysis

> **Sections**: Ask First · Workflow · Defaults (apply silently, disclose at delivery) · Rules & Pitfalls · Pre-Delivery Checks · Scope Boundaries · Task-specific verification
> **Must not skip**: Rules & Pitfalls · Pre-Delivery Checks · Scope Boundaries — return here before delivery.

> Task `cross-holder-analysis` in group `deal-materials`. Read [`_overview.md`](_overview.md) first for group-level scope, shared defaults, and format dependencies.

**Use when**: Identifying actionable institutional investors for an equity offering (follow-on or IPO) by mapping cross-ownership across a peer set | **Deliverable**: PowerPoint summary (`.pptx` + `.pdf`) and Excel workbook with 5 tabs containing live formulas

## Ask First
Use supplied entity/listing/source instructions first. Otherwise inspect an available authorized entity lookup; ask only if the listing status or intended IPO/follow-on mode remains unresolved. `companyLookup` is an example capability, not a required installed tool.

## Workflow
1. **Resolve mode.** Confirmed listed target → Mode A (follow-on); confirmed pre-IPO/private target → Mode B (IPO). A failed lookup is missing evidence, not proof of private status; retain the gap and resolve it before applying mode-specific holdings columns.
2. **Lock 6–7 peers** using the same GICS sub-industry and a ±3× market-cap screen before pulling holdings.
3. **Retrieve holdings on the selected source basis.** Honor the user-selected authorized source and inspect its actual coverage. CapIQ is a default capability example, not mandatory. Retain investor/security identity, ownership %, market value, period and filing/publication dates. Retrieve all pages needed for the requested universe; top-40 or six-month pulls are partial unless completeness is established. Do not treat a short API summary as the full dataset.
4. **Filter and normalize.** Identify retained LO/HF manager categories from source definitions and evidence; blank/null type is unknown until reviewed. Normalize names with stable investor IDs; do not merge distinct entities solely because suffix stripping makes their display names equal.
5. **Build and sort the matrix.** Qualify investors with **≥$1mm aggregate peer holdings** and holdings in **≥2 peers**, total peer positions, and sort descending. Paginate/appendix rather than silently omit qualified rows.
6. **Apply Mode A OW/UW.** `%Diff` = actual target ownership % minus peer-average ownership %. Positive/overweight is **red**; negative/underweight is **green**.
7. **Assemble and export** the PPTX, PDF, and live-formula XLSX; subtitle `[N]` equals rendered rows.

### Slide Layout

- Put real target/peer logos in a band above the table; each logo is ≤90% of allocated cell width and adjacent logos must not overlap.
- Use navigation-blue table headers. Apply OW/UW colors only to Mode A `%Diff`.
- Without a template, use 13.33 × 7.5 inches and ~18 rows/slide; state total qualified count if paginated/capped. Delegate title/subtitle/footer styling to an active branding skill, while retaining analysis, column structure, header, and semantic colors.

### Excel Workbook Structure (5 tabs — live formulas required)

| Tab | Contents |
|---|---|
| Summary | Matrix using `SUMIFS`/`AVERAGEIFS` from Raw Holdings; formula-driven OW/UW conditional formatting |
| All Qualified | Complete ≥$1mm / ≥2-peer universe, regardless of slide display |
| Peer Set | Names, tickers, source identifiers, market caps and their share-count basis |
| Methodology | Filter rules, thresholds, and data sources |
| Raw Holdings | Actual source fields mapped to investor/security IDs, investor type, reporting period, filing/publication date, shares, market value and ownership %, with gaps retained rather than fabricated |

### Mode A vs. Mode B Columns


### Investor Screening Detail

The active-manager screen is a qualification control, not a display preference. Retain LO, HF, and blank/null only after reviewing investor identity; a broker/bank parent is excluded even where the name resembles a retained asset-management affiliate. The minimum **$1mm** applies to aggregate **peer** holdings only. For Mode A, retain a holder's complete target position even below that threshold so the target ownership picture remains intact.

Sort the qualified universe before any slide cap or pagination. The All Qualified tab is the full auditable universe; a PowerPoint subtitle identifies displayed rows and total qualified accounts. Do not let the approximate 18-row density change investor qualification or the ranking order.


The raw pull preserves source-available identifiers and dates, including filing accessions where applicable. Record unavailable fields and their impact instead of inventing them. Summary formulas reference the normalized full extract and refresh with it; user-selected non-workbook outputs may show the same reproducible calculation without creating an extra workbook.

| Column | Mode A — Follow-On | Mode B — IPO |
|---|---|---|
| Target holdings, % outstanding, % Peer Avg, OW/UW + `%Diff`, target logo | Include | Remove entirely |
| Sort | Aggregate peer holdings descending | Aggregate peer holdings descending |

## Defaults (apply silently, disclose at delivery)

| Parameter | Default |
|---|---|
| Peers | 6–7 |
| Qualification | ≥$1mm aggregate peer holdings and ≥2 peer companies |
| Ranking / display | Aggregate peer holdings descending; ~18 rows/slide |
| Overflow | Paginate, appendix, or user-requested top-N cap |
| Lookback / filings | Default most recent 6 months, with actual period/filing dates; provider-specific latest flags only when available and their meaning is verified |
| Ambiguous target | Unresolved; failed lookup does not establish IPO/private status |

## Rules & Pitfalls

**Never:** silently replace the user-selected source; filter from a truncated response while claiming complete coverage; apply the peer-holdings threshold to target holdings; hard-code derived Summary values; or reverse declared OW/UW semantics. If an official logo cannot be retrieved, use a typeset name and disclose the omission.

**Conditional:**
- Scan the top 25 LO-labelled investors for known hedge-fund misclassifications and disclose any override.
- Exclude broker-dealer/bank parents and ETF arms, but retain distinct active asset-management arms.
- Retry a failed logo fetch before accepting failure.
- Use a provider or filing-based dataset with sufficient fields, dates and coverage for the requested analysis. Preserve an exclusive-source request; if that source or a necessary field is unavailable, report a partial result/gap rather than silently substituting or claiming complete holdings.
- Mode B removes every target-specific table column and target logo; do not leave empty placeholders or zero-filled target fields.

**Judgment:** Prefer business-model/GICS relevance over a perfect size match. Review unknown investor types before assigning LO; retain unresolved types as unknown instead of automatically classifying them as active long-only.


- **Investor-type review:** The active list excludes index/passive managers (including Vanguard, BlackRock, State Street, Geode), market-makers/HFT (Jane Street, Susquehanna, Virtu), systematic quant funds (Two Sigma), sovereign wealth, family offices, government/corporate pensions, VC/PE firms, and insurers.
- **LO exception review:** CapIQ can label hedge funds as LO. The top 25 LO names require a reasonableness scan; known examples include Renaissance Technologies, D.E. Shaw, Marshall Wace, Lone Pine, Tiger, Coatue, and Viking Global. The list is illustrative, not exhaustive.
- **Logo control:** Real logos are required. If adjacent-logo overlap occurs, reduce padding and re-render; do not accept a placeholder.

## Pre-Delivery Checks
- Complete requested-source holdings extract loaded (all necessary pages/files); actual date/version fields and duplicate investor/security/filing records reviewed. Any coverage truncation is labeled partial, not a complete investor universe.
- Final types are LO, HF, or blank only; passive, market-maker/HFT, quant, broker parent, sovereign, family-office, pension, VC/PE, and insurer exclusions are complete.
- Mode columns, total/rendered counts, logo band, and positive-red/negative-green `%Diff` semantics are correct.
- $1mm threshold applies only to peers; Raw Holdings includes all specified fields; Summary uses live `SUMIFS`/`AVERAGEIFS` and formula-driven formatting.
- `.pptx`, `.pdf`, and `.xlsx` are delivered.
- Top-25 LO exception review and broker-parent/active-arm disambiguation are complete.
- No qualified investor is silently omitted: All Qualified remains complete even if PowerPoint is paginated or user-capped.
- Mode A target positions remain complete regardless of size; peer totals and peer-average calculations alone use the stated qualification threshold.
- Slide headers are navigation-blue, OW/UW color appears only in `%Diff`, and each logo is above—not in—the data table.

## Scope Boundaries
This is an ECM investor-targeting tool, not general ownership analysis, valuation comp selection, a financial model, equity bridge/share-count work, or offering-size sizing.

## Task-specific verification

OW/UW compares one common holding period-end and identical ownership denominator. Mixed dates must remain provisional with no OW/UW colors. Raw Holdings includes period-end/filing period, denominator and source; peer averages and %Diff are live linked formulas.


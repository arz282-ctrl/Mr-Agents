# Data Sources and Calculation Conventions Policy

Read this file when a task reads external data, user files, market data, financial statements, option chains, on-chain data, or user-provided historical transaction records.

## Table of Contents

1. [Core Principles](#core-principles)
2. [Operational Source Selection](#operational-source-selection-authoritative-for-choosing-a-source)
3. [Capability-Class Routing](#capability-class-routing)
4. [Evidence Authority](#evidence-authority)
5. [Yahoo Finance via Manus Data API](#yahoo-finance-via-manus-data-api)
6. [Data Manifest](#data-manifest)
7. [Time and Freshness](#time-and-freshness)
8. [Standardization Rules](#standardization-rules)
9. [Cross-Cutting Data Traps](#cross-cutting-data-traps)
10. [Asset-Specific Requirements](#asset-specific-requirements)
11. [Cross-Validation and Conflicts](#cross-validation-and-conflicts)
12. [Missing Data, Estimation, and Failures](#missing-data-estimation-and-failures)

## Core Principles

1. Define the decision timestamp first, then select data available at that time to avoid look-ahead bias.
2. When the user has not chosen a source, prefer primary, structured, and traceable sources; use search summaries, secondary reports, and anonymous posts only to surface leads. A user-chosen source remains the requested analytical basis, not an automatic proof of correctness.
3. Record source, fetch time, observation time, currency, unit, frequency, adjustment, and estimation status for key fields.
4. Use different freshness standards for research conclusions, simulations, and concrete manual-plan parameters; never treat any source as authorization or infrastructure for a transaction, and do not use stale data for a manual plan.
5. Do not change the user's question or calculation conventions solely because data are available.

## Operational Source Selection (authoritative for choosing a source)

Use this workflow to choose **which source or provider to query**. Operational priority is distinct from the evidence-authority hierarchy below: a connected database may be the fastest structured entry point, while a valuation-critical fact may still need to be upgraded to an original filing before it is authoritative.

1. **Inventory once per session.** Before the first data pull, check in parallel: the user's stated source preference; project or prior-context preferences; attached connectors, MCPs and APIs; and built-in financial data capabilities. Do not claim that a data class is unavailable until this inventory is complete.
2. **Honor explicit source preferences.** If the requested source or user-supplied dataset is available, use it as the requested basis and read its usage instructions. Cross-checks do not silently replace that basis. If it is unavailable, explain the limitation and offer the connection/fix step; an explicitly exclusive or source-only request must not switch providers without the user's authorization. For a non-exclusive preference, a clearly labeled alternative may be used when it does not materially change the requested conclusion; otherwise ask. Record durable preferences when project or task notes support them.
3. **Choose silently when no preference exists.** Select in this operational order: **connected professional source > built-in structured source > public fallback**. Do not burden the user with connector narration when the choice does not alter the requested basis.
4. **Route by capability class, grain and time axis.** Prices use market-data endpoints, full statements use fundamentals, individual reported metrics use metric-series endpoints, and forward metrics remain separate from trailing metrics. Adjusted, covenant, pro-forma and company-specific KPIs used as validated analytical inputs must be rebuilt from original disclosures rather than accepted from standardized endpoints. If the user asks specifically for a vendor's reported field, show that field with the vendor's own label and date as a single-source quote; do not silently replace it with a reconstructed value or claim that the vendor number has been verified against original disclosures.
5. **Apply the domain gate.** User portfolio, balance and transaction data remain user-provided or authorized read-only inputs under the privacy rules; market and company data follow this source-selection workflow. Never upgrade read access into transaction authority.

When a selected structured source does not cover the required field, use this operational degradation chain:

```text
structured endpoint → earnings transcript / IR document → primary filing → open web
```

This sequence is for efficient retrieval, not a reversal of evidence authority. Guidance, non-GAAP metrics, company KPIs and segment commentary often appear first in transcripts or IR material. Officers, compensation, transaction terms, share counts at a point in time and formal financial statements require the applicable filing, regulator, exchange or issuer document **before they are presented as independently verified facts**; when the user asks for a named provider's value, retain that provider's value as the requested basis and show any discrepancy instead of replacing it. For a value obtained from the open web, state its as-of date, prefer the original source behind the page and cross-check any decision-relevant figure against a second independent source.

## Capability-Class Routing

Named providers are recognition anchors, not availability claims. Treat an attached provider of the same capability class under the same rules, and verify actual authorization and returned fields before use.

| Capability class | Connected professional source | Built-in structured source | Public fallback |
|---|---|---|---|
| Market data: price, OHLCV, market cap, dividends, splits, short interest | Bloomberg, FactSet, S&P Capital IQ or equivalent | Approved market-data APIs; approved Yahoo chart operation when available | Exchange or venue public data |
| Options: chains, contracts and flow | Options specialist, Bloomberg, FactSet or equivalent | Approved options contract and OHLCV APIs; do not imply unsupported flow or Greeks | OCC and exchange statistics; label inference |
| Full financial statements | S&P Capital IQ, FactSet, FMP, Daloopa or equivalent | Approved fundamentals APIs | SEC EDGAR or local regulator; parse the original filing |
| Reported metrics and ratio time series | Daloopa, Fiscal.ai, FMP or equivalent | Approved ratio and statement-line APIs | Compute from statements and state the basis |
| Segment data | S&P Capital IQ, FactSet, Daloopa or equivalent | Use only if the returned endpoint demonstrably contains segment data | Annual-report or 10-K segment note |
| Filings search and retrieval | AlphaSense, Bloomberg or equivalent | Approved filing indexes and IR-document APIs; Yahoo filing lookup is discovery only | EDGAR, local regulator or company IR |
| Earnings calls and corporate events | FactSet/CallStreet, S&P Capital IQ or equivalent | Approved transcript, event, slide and report APIs | Company IR webcast; verify republished transcripts |
| Ownership, holders and insider activity | Bloomberg, FactSet, S&P Capital IQ or equivalent | Approved holders, float and short-interest APIs | 13F, Form 4 or local regulatory filings |
| Consensus estimates and sell-side views | S&P Global/Visible Alpha, Morningstar, Bloomberg, FactSet or equivalent | Approved analyst-insight APIs, labeled as single-provider unless the sample proves consensus | Publicly reported analyst views, labeled second-hand |
| Private-company, VC and fund data | PitchBook, Crunchbase, Preqin, Forge or equivalent | Approved private-market APIs, if available | Company site, releases and reputable media, cross-verified and labeled as estimates |
| News and sentiment | Bloomberg, AlphaSense or equivalent | Approved news APIs with source metadata | Reputable media with date filters |
| Screening and ranking | Bloomberg EQS, Capital IQ, FactSet or equivalent | Approved ratio-screening APIs | Multi-list intersection followed by company-level verification |
| Event and macro probabilities | Specialist market source when connected | Approved probability API, if available | Public prediction-market API; present as market-implied probability with liquidity, never as a forecast |
| Macro, FX and crypto | Bloomberg, FactSet or equivalent | Approved macro, FX and crypto APIs | World Bank, central banks, statistics offices and authoritative venues |

Provider basis must remain explicit. Do not mix consensus series with different analyst samples; do not mix reported actuals with adjusted consensus; do not present pre-IPO secondary-market marks as fund NAV; and do not call a single-provider analyst view "consensus." Attribute licensed data when its terms require attribution, and never name a source that was not actually used.

Defend against schema drift: trust the fields, units, timestamps and adjustment basis actually returned, not an assumed or documented schema. Inspect real headers before calculation. A provider-name match does not establish that an endpoint has the required grain, period basis or coverage.

## Evidence Authority

| Priority | Source | Applicable Content |
|---|---|---|
| 1 | Regulatory filings, exchange and clearinghouse public records, issuer official documents, fund legal documents, protocol official contracts and governance records | Financials, terms, contract specs, NAV, indices, on-chain contracts and public market rules |
| 2 | Verified professional data vendors or direct APIs | Standardized financials, historical prices, real-time quotes, option chains, macro and on-chain metrics |
| 3 | Company websites, investor relations materials, audit reports, official press releases and call transcripts | Management guidance, guidance, business descriptions and events |
| 4 | Editorially responsible financial media, research institutions and industry databases | Background, controversies and cross-checks |
| 5 | Search summaries, aggregator sites, communities, social media and anonymous information | Use only as leads; do not rely solely to support key facts or trading conclusions |
| U | User-provided files or data | Treat as user-specified input; still record date, version and reliability, and do not automatically treat as factual truth |

If sources conflict and the user did not specify a basis, default to the higher-authority source and retain the conflict. If the user explicitly chose a lower-priority source, preserve its value as the requested-basis result, show the conflicting higher-authority value and differences in date or definition, and qualify confidence; do not call the disputed lower-priority value independently verified. If the user needs a single factual conclusion that cannot be supported on that basis, withhold or qualify the conclusion rather than silently replacing the source. If high-priority sources conflict with each other, do not silently choose one.

Search results and snippets are discovery tools, not final evidence. Upgrade claims to the original disclosure whenever one is available, trace apparently independent secondary reports to their common origin to avoid circular corroboration, and apply extra scrutiny to AI-generated content.

## Yahoo Finance via Manus Data API

Use available approved read-only Yahoo Finance data capabilities; the Manus operation names below are capability examples, not availability guarantees. Inspect the actual API instructions and returned fields before use. Do not scrape undocumented endpoints. Preserve source/query context and verify the scope, dates and adjustment basis of every field used.

| Adapter Operation | Confirmed API Operation | Approved Use | Evidence Boundary |
|---|---|---|---|
| `chart` | `YahooFinance/get_stock_chart` | Historical or delayed OHLCV, adjusted close, chart metadata, research-level price context and non-execution backtests | Tier 2 market data; not an executable quote, order receipt, official exchange record or guaranteed total-return series |
| `profile` | `YahooFinance/get_stock_profile` | Company identity, sector, industry, business summary and market snapshot | Secondary structured data; verify valuation-critical facts, capital structure and official descriptions against filings or issuer materials |
| `holders` | `YahooFinance/get_stock_holders` | Ownership screening and holder trend context | Secondary data; do not treat as a complete, current ownership register |
| `insights` | `YahooFinance/get_stock_insights` | Provider analytics, technical context and idea generation | Tier 4 analytical content; label provider-derived views and do not use them as sole support for recommendations |
| `filings` | `YahooFinance/get_stock_sec_filing` | Discovering filing references and dates | Discovery only; retrieve and cite the SEC, regulator or issuer filing itself before using filing facts as Tier 1 evidence |

The listed Manus operations cover equities when available. `chart` also supports ETF, index, crypto, forex and futures symbols when Yahoo Finance recognizes the instrument. Profile, holder, insight and filing operations are equity-only. The listed operations do not provide option chains, fund legal documents, official NAV, intraday order books, executable bid/ask, broker receipts, exchange-confirmed status or point-in-time constituent history.

Extract only task-relevant fields from the actual response. Avoid retaining or delivering raw provider responses containing unnecessary personal data or licensed content. Omit unnecessary personal names/contact fields from holder/profile records and full third-party report text from insights. Inspect unexpected fields before use and apply the privacy and license rules.

For concrete manual-plan parameters, compliance, official filings and fund due diligence, use public or read-only primary venue, exchange, regulator, issuer or fund sources. Never access an account, order-management endpoint, wallet signer or transaction endpoint, and never use a broker connection to place, modify, cancel or monitor an order. For crypto, cross-check Yahoo Finance prices with at least one independent venue or authoritative provider. For backtests, disclose survivorship, delisting, corporate-action and point-in-time limitations; do not infer that a returned adjusted-close series is total return unless the response and methodology establish that basis.

For Yahoo-supported claims, retain actual source, retrieval/observation dates, symbol, operation, query parameters, currency, interval and adjustment basis where applicable. Cite the provider page or actual API source used; a local extract is supporting evidence, not a publisher URL. No prescribed source-artifact object is required.

If the Manus data API runtime is unavailable, the provider returns an error, or the response has no usable result, record the failure and its data gap. Apply the exclusive/non-exclusive source preference rules before using an alternative; otherwise qualify or withhold the affected conclusion. Never substitute remembered values, scrape an undocumented endpoint or silently relabel another provider as Yahoo Finance.

## Data Manifest

Each task must maintain the following minimum `data_manifest`:

```yaml
- field: revenue
  value: 123.4
  unit: USD_million
  observation_time: YYYY-MM-DD
  publication_time: YYYY-MM-DDTHH:MM:SSZ
  retrieval_time: YYYY-MM-DDTHH:MM:SSZ
  source_name: string
  source_url_or_file: string
  source_tier: 1 | 2 | 3 | 4 | 5 | U
  period: FY2025
  currency: USD
  frequency: annual
  adjustment: reported | adjusted | split_adjusted | total_return | none
  status: verified | single_source | estimated | stale | conflicted
  notes: string
```

For substantive work, retain the relevant field records in working notes, tables, workbook source comments or a suitable data extract. The example above lists useful metadata; it is not a required YAML/JSON file. Material conclusions must trace to actual inputs, formulas and locators. For user files, use filename/version and page, sheet/cell, table or paragraph locations. Direct answers need only the actual figure, unit/date and citation used. Keep internal source records out of the user delivery unless requested; do not create an extra manifest file solely for this Skill.

## Time and Freshness

| Use Case | Default Maximum Age | Rules |
|---|---:|---|
| Concrete manual-plan or simulated price inputs | 60 seconds | Include bid/ask, venue and timestamp when available; label them non-executable, and when markets are closed generate only conditional manual plans |
| Intraday signals and order flow | 1 analysis period | If current-period data are missing, degrade; do not extrapolate |
| Daily technical analysis | Most recent completed trading day | Do not mix intraday incomplete candlesticks with historical closing series |
| Crypto spot/perpetual analysis | 5 minutes | When venues are fragmented verify at least two sources |
| Option chains | 5 minutes or user-specified | Must include quotes, OI/trade volume dates and underlying price time |
| Portfolio valuation | Most recent available close or user-specified snapshot | Multi-market portfolios may use asynchronous closes but must be flagged |
| Financial statements | Most recent formally disclosed period | Also annotate fiscal year, quarter, publication date and whether restated |
| Fund holdings | Issuer's most recent disclosure period | Do not treat lagged holdings as a real-time portfolio |
| Macro data | Most recently formally published value | Record vintage; backtests must use versions published at the time |
| Institutional trading documents | User-specified version | File version takes precedence over retrieval time |

When users request historical point-in-time analysis, limit all data to information publicly available before that point; subsequent revised data must not replace the version available at the time.

Resolve vague timing such as "latest," "current" or "now" to an explicit date, timestamp or fiscal period at retrieval time. Default to the runtime's actual current date rather than the model's training cutoff, map the reference date through the Entity Card's fiscal year-end month, and carry the resolved basis into the deliverable.

## Standardization Rules

### Identifiers and Entities

Maintain mappings for security codes, exchanges, ISIN/contract codes, company entities, fund share classes, crypto networks and contract addresses. When codes are reused, renumbered, merged, delisted or tokens cross-chain, do not assemble sequences using only display names.

### Currencies and Units

Retain original currency, then convert to the report currency using the exchange rate at the same timestamp. Use period-average rates for flows and period-end rates for balance sheets, and document which is used. Do not mix units like RMB, thousands, millions, or per-share and aggregate amounts.

### Financial Periods

Align by fiscal year rather than calendar year; distinguish quarter, year-to-date, LTM and NTM. Any non-GAAP/adjusted metrics must be columnized by reported statement basis and retain reconciliation items.

### Prices and Corporate Actions

Mark price series as raw, split-adjusted or total-return basis. In backtests handle splits and reverse splits, cash/stock dividends, rights issues, spinoffs, mergers, delistings, halts and code changes; do not improve results by deleting problem dates.

### Time Zones and Trading Days

Preserve original time zone and convert to task-specified time zone; specify daylight saving rules. For cross-market portfolios use each market's trading calendar and explain holiday and asynchronous close handling.

### Missing Values

Do not forward-fill prices, yields, volumes, financial fields, option Greeks or user-provided historical transaction states by default. Fill only when economically meaningful and the method is predefined, and mark in the manifest as `estimated`.

## Cross-Cutting Data Traps

Check these risks regardless of provider:

1. **Survivorship bias.** Current screeners and constituent lists exclude delisted and failed entities; flag this when a historical universe supports the conclusion.
2. **Pre-earnings staleness.** "Latest reported" financials may be more than a quarter old immediately before the next release; state the reporting lag when the analysis is time-sensitive.
3. **Constituent lag.** Index, ETF and portfolio composition disclosures may lag rebalances by 30–90 days; date the composition snapshot instead of presenting it as live.
4. **Adjusted versus unadjusted prices.** Confirm the basis before comparing historical prices, targets or event returns across dividends, splits or other corporate actions.
5. **Correlation regime shifts.** Label the estimation window and warn that calm-period correlations can understate stress-period co-movement.
6. **Recurring thresholds after corporate actions.** Compute alerts from freshly adjusted percentage returns rather than fixed price levels that can generate false triggers after splits.

For lightweight historical evaluation inside a research task, insert a censor gap of at least one trading day between the information cutoff and the evaluation window, add the applicable publication lag for financial data, and compute returns strictly after the censored decision point. Never build a historical portfolio or signal with future prices, earnings or estimate revisions. If the censor window or point-in-time availability cannot be verified, stop and disclose the limitation rather than produce a leaky backtest.

## Asset-Specific Requirements

| Domain | Minimum Required Data |
|---|---|
| Equity research | Official financial statements, publication dates, business segments, fully diluted share count, net debt, prices and comparable data on a consistent basis |
| Fund/ETF | Share classes, index, fees, replication method, AUM, NAV, dividends, trading currency, holdings disclosure dates and legal documents |
| Options | Underlying quotes, expiries, strikes, bid/ask, multiplier, style, IV, Greeks, OI, trade volume, interest rates, dividends and event calendar |
| Crypto | Network/contract, trading pairs, venue, spot/perpetual type, funding rate, OI, basis, on-chain block height or timestamp |
| Portfolio | Holdings snapshot, price time, quantity, cost, cash, liabilities, currency and benchmark; account identifiers not required |
| Backtest | Constituents at each point in time, delisting sample, corporate actions, tradability, fees, slippage, calendar and fields available at decision time |
| Manual trade planning | Current or delayed bid/ask with timestamp and non-executable label, observable liquidity, contract specs, trading sessions, fees and user-stated constraints; no account, order, receipt, signer or transaction identifiers |
| Trading materials | Filename, version, date, authority level, page/paragraph locator and confidentiality status |

## Cross-Validation and Conflicts

Mark a key fact as `verified` only if it meets either of the following conditions: from an authoritative primary source; or from two independent sources whose methods can be explained and whose timestamps are consistent. With no user-specified source, prices, net asset values, option chains and funding rates default to the corresponding venue or authoritative data. A requested alternative source may be reported as its own dated basis without being mislabeled as an independently verified venue quote. Historical transaction status may be discussed only from user-provided read-only records and must not imply platform access.

Conflict resolution steps:

1. Check that entity, period, currency, unit, adjustment, time zone and publication date are consistent.
2. Check for mixing of reported vs. adjusted, initial vs. revised values, and real-time vs. delayed data.
3. Preserve each candidate value and source; do not overwrite original records.
4. When resolvable, record selection rules; when unresolvable, mark `conflicted` and perform scenario analysis or withhold related conclusions.

## Missing Data, Estimation, and Failures

| Status | Action |
|---|---|
| Single source | Mark `single_source`, avoid high-confidence statements |
| Missing critical fields | List fields and impact on conclusions; do not fabricate precise values |
| Stale data | Mark `stale`; do not use for concrete manual-plan parameters or short-term signals |
| Estimated values | Record proxy variables, formulas, assumptions and sensitivity |
| API/web failure | If the source was user-specified, honor the exclusive/non-exclusive distinction above before trying an alternative; never fill with numbers recalled from memory |
| User data conflicting with public data | Show both and the differences in conventions; retain the already chosen user-data basis with a conflict label, and seek a choice only when no basis was chosen or the unresolved difference materially changes the conclusion |
| Unable to verify high-risk claims | Output `unverified`, do not rephrase as facts |

Use credentials only via secure environment variables or authorized connections; do not write them into the data manifest, scripts, logs, reports, or Reference.

# Fund and ETF Module

Read this file when the user requests comparing funds or ETFs, finding lower-cost alternatives, reviewing product structure, or evaluating whether to add to a fund position.

## Sole Primary Responsibility

Responsible for peer product comparison, structural risk review, and product-level decisions for funds and ETFs. Must not substitute for single-equity valuation, nor unilaterally decide final capital allocation for multi-asset portfolios.


## Input Contract

| Field | Requirement | Description |
|---|---|---|
| `funds` | Conditionally required | Specify comparison targets; if only an asset class is given, construct a candidate set first |
| `target_exposure` | Conditionally required | Index, sector, factor, region or asset class to be tracked |
| `jurisdiction` | Optional | Listing, tax or regulatory constraints; only for filtering, not personal tax advice |
| `currency` | Optional | Currency to normalize comparisons |
| `horizon` | Optional | Holding horizon |
| `user_context` | Optional and sensitive | Existing holdings, cash proportion and constraints; use only for suitability judgment |
| `as_of` | Optional | Data cut-off date |

## Yahoo Finance Use

Use an available approved Yahoo Finance chart operation for historical or delayed exchange-traded ETF price and volume context under [data-source-policy.md](data-source-policy.md); inspect fields and retain source/query records. Do not use Yahoo Finance as the authoritative source for official NAV, TER, legal structure, benchmark methodology, holdings, distributions, registration status, creation/redemption terms or tax treatment; obtain those from the fund sponsor, prospectus, index provider, exchange or regulator. A Yahoo adjusted-close series is not presumed to be total return without evidence of the adjustment basis.

## Workflow

1. Define the comparison domain. Confirm target exposure, market, currency, domicile, dividend treatment and tradability. Do not directly rank products with different economic exposures.
2. Construct the candidate set. Include at minimum the user-specified products, direct peers, low-cost candidates and alternatives feasible under user constraints. If no reasonable alternative exists, state explicitly.
3. Collect structural data. Obtain index, replication method, total expense, size, liquidity, spreads, tracking performance, securities lending, dividend treatment, currency hedging, registration structure and concentration. Yahoo Finance chart data may supplement exchange-traded price and volume history, but must not replace sponsor, prospectus, index-provider or exchange evidence for product structure.
4. Perform a structural risk review. Identify synthetic replication, leveraged/inverse, maturity or path dependence, concentrated holdings, liquidity mismatch, cross-border tax frictions and custody risk. Describe only general tax implications; do not provide personal tax conclusions.
5. Compare realized returns. Present both price return and total return including dividends, normalize currency, time window and frequency; do not annualize or make misleading comparisons for incomplete-cycle data.
6. Form layered conclusions. Separately present overall optimal, cost-optimal, structurally most robust and applicability constraints. Output an overall score only when scoring anchors are complete.
7. Assess operational decisions. For requests to increase position / average down / open new position / wait, first check investment logic, valuation or exposure, portfolio concentration, alternatives and failure conditions; if precise sizing is required, hand off to the portfolio module.

## Minimum Comparison Fields

| Category | Fields |
|---|---|
| Exposure | Index, region, sector/factor, position concentration |
| Cost | TER/expense ratio, trading spread, tracking difference, estimated tax frictions |
| Structure | Replication method, domicile, currency hedging, dividend treatment, leverage/inverse |
| Trading | AUM, turnover, spreads, market making and creation/redemption mechanism |
| Performance | Price return, total return, volatility, max drawdown, tracking error |
| Risk | Concentration, liquidity, counterparty, path dependence, closure or merger risk |

## Handoff Rules

| Request Extension | Call Chain |
|---|---|
| Configure selected ETFs into an existing portfolio | `fund-etf` → `portfolio-management` |
| Analyze the investment value of companies heavily held by a fund | `equity-research` |
| Backtest ETF rotation or regular investment strategies | `quant-backtesting` |
| Generate a specific manual order plan, including a prohibited request to execute a buy or sell | `fund-etf` → `trade-planning`; the user must transact independently |
| Analyze digital asset fundamentals | `crypto-analysis` |

## Delivery Requirements

Present the product comparison, return basis, costs, structural risks and applicability constraints relevant to the request.

Preserve the user-selected source, metric basis, scope and output. Follow [output-contracts.md](output-contracts.md) for delivery and [completion-evidence.md](completion-evidence.md) for the actual applicable checks. Keep material facts, units, dates, assumptions, risks and gaps traceable without forcing headings or an internal object into the response.

# Portfolio Management Module

Read this file when the user requests diagnosis of an entire portfolio, benchmark comparison, allocation of new funds, rebalancing, maintenance of multi-platform holdings, or consolidation of multiple research conclusions.

## Primary responsibility

Responsible for portfolio-level risk-return diagnosis, capital allocation, rebalancing, position governance and research consolidation. Do not regenerate single-asset fundamental conclusions, fund product research, strategy backtests or real orders.


## Input contract

| Field | Requirement | Description |
|---|---|---|
| `portfolio_holdings` | Required and sensitive | Securities, quantity, cost, currency; account number not required |
| `cash` | Optional and sensitive | Deployable cash and reserve buffer |
| `benchmark` | Optional | Custom benchmark or investment policy benchmark |
| `objectives` | Required | Return targets, time horizon, liquidity and drawdown tolerances |
| `constraints` | Optional | Single-name/sector/asset caps, prohibitions, tax or account restrictions |
| `research_inputs` | Optional | Validated intermediate outputs from equity, ETF, options or crypto research |
| `transactions` | Optional and sensitive | Date, direction, quantity, price and fees |
| `as_of` | Optional | Portfolio snapshot date |

## Yahoo Finance Use

Use validated `chart` artifacts as secondary historical or delayed price inputs for recognized public instruments when applying [`data-source-policy.md`](data-source-policy.md). Yahoo Finance must not receive account identifiers, cost basis, quantities, transaction history or other user-private portfolio fields, and it does not replace broker statements, custody records, official cash balances, executable quotes or confirmed corporate actions. Record per-symbol cutoff, currency, interval and adjustment basis; disclose stale or missing instruments before calculating allocations.

## Workflow

1. Standardize the portfolio snapshot. Standardize identifiers, currency, price timestamps, asset classification and derivative exposures; verify cash reconciles with total assets. If Yahoo Finance chart data is used, send only public symbols and market-data parameters, validate each source artifact and keep private portfolio fields local.
2. Construct the risk-return profile. Calculate concentration, asset/sector/region/currency exposures, volatility, drawdown, correlations, liquidity and benchmark drift. Do not output pseudo-robust statistics when insufficient historical data exists.
3. Compare objectives and constraints. Compare the current portfolio against user objectives, risk budgets and hard constraints item by item; distinguish violations, near-threshold and compliant states.
4. Ingest upstream research. Summarize only validated research; do not redo single-asset or product analysis. When conclusions conflict, record evidence level, timestamp and invalidation conditions.
5. Generate candidate actions. Provide candidates such as continue holding, reduce, exit, increase, substitute, hedge or retain cash; address hard constraints and tail risks first, then optimize expected returns.
6. Allocate capital. Use transparent rules and explainable constraints to produce a base case, conservative case and aggressive case. Ensure any precise amounts are consistent with deployable cash, minimum trading units and fees.
7. Assess post-implementation portfolio state. Recompute exposures, risks, concentration and expected improvements for each scenario; do not provide only buy/sell lists without showing post-portfolio results.
8. Produce next steps. Output the primary plan, alternative plans, actions not to take, execution sequencing, monitoring items and reassessment trigger conditions.

## Portfolio-layer boundaries

| Input request | Handling |
|---|---|
| Whether a particular stock is worth buying | Call `equity-research` first |
| Which ETF is better | Call `fund-etf` first |
| Whether a strategy worked in the past | Call `quant-backtesting` |
| Structural risk of an options position | Call `options-strategy` first, then aggregate into the portfolio |
| Specific orders or real trades | After the portfolio module outputs target weights, hand off to `trade-planning` |

## Quality gates

| Gate | Pass criteria | Failure handling |
|---|---|---|
| Reconciliation complete | Market value, cash, liabilities and total assets reconcile | List discrepancies and suspend precise allocations |
| Price consistency | Same cutoff time or differences explained | Flag stale prices and estimates |
| Risk statistics valid | Data frequency, window and benchmark sufficient | Degrade to exposures-only analysis |
| Constraints executable | Caps, minimum units and liquidity factored in | Adjust scenarios and re-evaluate |
| Post-portfolio review | Recalculate post-scenario metrics | Do not deliver weights based solely on intuition |

## Delivery Requirements

Present the diagnosis, allocation/constraint basis, scenarios, risks and monitoring plan relevant to the request.

Preserve the user-selected source, metric basis, scope and output. Follow [output-contracts.md](output-contracts.md) for delivery and [completion-evidence.md](completion-evidence.md) for the actual applicable checks. Keep material facts, units, dates, assumptions, risks and gaps traceable without forcing headings or an internal object into the response.

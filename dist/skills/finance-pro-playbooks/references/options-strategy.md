# Options Strategy Module

Read this file when the user requests selection of option structures, strikes, expiries, income strategies, Roll plans, volatility or Greeks analysis.

## Primary Responsibility

Responsible for option structure selection and parameter optimization, and for providing interpretable candidate strategies based on the underlying view, volatility environment, and risk constraints. Must not substitute for underlying equity fundamental research and must never place, modify, cancel, exercise, assign, roll, or otherwise execute an option transaction.


## Input Contract

| Field | Requirement | Description |
|---|---|---|
| `underlying` | Required | Underlying symbol and market |
| `objective` | Required | Income enhancement, low-cost acquisition, protection, directional, volatility, or Roll |
| `underlying_view` | Conditionally required | Direction, target range, time horizon and failure conditions; may come from `equity-research` |
| `option_chain` | Conditionally required | Quote timestamp, expiries, strikes, bid/ask, IV, Greeks, volume and OI |
| `holding_context` | Optional and sensitive | Existing option/equity positions, cost basis, quantities and tax constraints |
| `risk_constraints` | Required | Max loss, margin limits, acceptable exercised/assigned status |
| `event_calendar` | Optional | Earnings, dividends, macro events and expiry scheduling |

If the latest option chain is missing, output only structural-level recommendations and required fields; do not provide trade-level strike prices.

## Yahoo Finance Use

An available approved Yahoo Finance data operation may provide historical or delayed underlying price context through `chart`, and equity descriptors through `profile`, subject to [`data-source-policy.md`](data-source-policy.md). It does not provide an approved option-chain operation and must not supply expiries, strikes, bid/ask, IV, Greeks, volume, OI, margin or executable prices. Inspect underlying fields and retain source/query records; obtain trade-level option data from an authorized read-only broker, exchange or option-data source.

## Workflow

1. Confirm objectives and constraints. Distinguish income, protection, directional and volatility objectives; clarify whether naked selling, margin, early assignment and unlimited-risk structures are permitted.
2. Confirm the underlying view. If the request depends on fundamental or valuation analysis but a credible view is not provided, call `equity-research`; the options module must not reperform a full equity research independently. Yahoo Finance may supplement underlying price history but never substitutes for the required option chain.
3. Diagnose the volatility environment. Use the public metrics dictionary to calculate IV, IV Rank/Percentile, term structure and skew; timestamp and source the data.
4. Filter candidate structures. Retain only strategies that meet risk constraints and liquidity gates. By default, prioritize structures with defined maximum loss; require explicit user permission and risk-tolerance information for naked selling.
5. Optimize parameters. Trade off among expiry, delta, strikes, net premium, breakeven, max P&L, capital usage and event exposure. Do not rank solely by highest premium.
6. Execute scenario analysis. Cover at least pessimistic, baseline, optimistic and volatility-change scenarios; consider early assignment risk for American options.
7. Form recommendations. Provide preferred and alternative strategies, applicability conditions, failure conditions, management rules, Roll conditions and no-trade conditions.
8. Handover to manual planning. When the user asks to design/recommend/propose specific legs (strike/expiry), or requests any transaction, pass the analytical strategy parameters to `trade-planning` for an unsubmitted manual plan. The SKILL must stop at that plan; the user remains free to verify, change, implement, or ignore it independently outside the SKILL.

## Quality Gates

| Gate | Minimum Requirement | Failure Handling |
|---|---|---|
| Quote freshness | Include timestamp, bid/ask rather than only last | Degrade to educational analysis |
| Liquidity | Check spread, volume and OI | Flag as non-tradable or increase uncertainty |
| Risk boundaries | Max loss and margin calculable | Do not recommend the structure |
| Event risk | Earnings, ex-dividend and expiry dates verified | Explicitly list as unresolved risk |
| Conventions consistent | Contract multiplier, currency, direction and per-share/per-contract units consistent | Recalculate after correction |

## Handover Rules

| Request Extension | Call Chain |
|---|---|
| Analyze the underlying first, then design strategy | `equity-research` → `options-strategy` |
| Incorporate options risk into the overall portfolio | `options-strategy` → `portfolio-management` |
| Backtest options rules historically | `quant-backtesting`; must state data and matching/fill limitations |
| Generate a manual multi-leg order or roll plan, including a prohibited request to place, exercise, modify, cancel, or roll a real position | `options-strategy` → `trade-planning`; stop before any platform interaction |
| Crypto asset options | `crypto-analysis` provide asset assumptions; call this module if chain structure is compatible |

## Delivery Requirements

Present the underlying view, instrument terms, candidate structures, scenarios/payoffs, capital or margin basis and risks relevant to the request. Use a pricing tool suited to the actual expiries and assumptions.

Preserve the user-selected source, metric basis, scope and output. Follow [output-contracts.md](output-contracts.md) for delivery and [completion-evidence.md](completion-evidence.md) for the actual applicable checks. Keep material facts, units, dates, assumptions, risks and gaps traceable without forcing headings or an internal object into the response.

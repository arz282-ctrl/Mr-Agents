# Crypto Asset Analysis Module

Read this file when a user requests analysis of crypto asset prices, market structure, SMC, on-chain and derivatives signals, DeFi liquidity pools, or verification of crypto high-risk topics.

## Primary Responsibility

Be responsible for market structure, trading mechanics, on-chain and DeFi analysis specific to crypto assets. General strategy backtesting is owned by `quant-backtesting`; concrete transaction requests route to `trade-planning` for a user-executed manual plan only. No module may sign, broadcast, approve, transfer, place, modify, or cancel a transaction.


## Input Contract

| Field | Requirement | Description |
|---|---|---|
| `assets` | Required | Asset symbols, trading pair, network, and quote currency |
| `analysis_type` | Required | Market analysis, SMC, derivatives, on-chain, LP, or fact verification |
| `venues` | Optional | Spot/perpetual/futures/DEX venues |
| `timeframes` | Optional | Default to cover at least high, medium, and low timeframes |
| `market_data` | Conditionally required | OHLCV, order book, funding rates, OI, basis, or on-chain data |
| `user_positions` | Optional and sensitive | Positions, cost basis, leverage, margin, and liquidation information |
| `lp_context` | Conditionally required | Protocol, pool, fee tier, price range, capital and duration |
| `as_of` | Optional | Data timestamp |

## Yahoo Finance Use

Use an available approved Yahoo Finance chart operation only as a secondary historical or delayed price series for a recognized crypto symbol; inspect actual fields and retain source/query records. Yahoo Finance does not identify the authoritative exchange venue, order book, funding rate, open interest, liquidation stream, on-chain state, pool data or executable price. Always cross-check its price series with at least one independent venue or authoritative provider and disclose symbol, quote currency, interval and venue limitations.

## Workflow

1. Confirm assets and venues. Distinguish networks, contract addresses, spot, perpetuals and futures; avoid confusion from same-named tokens and price differences across exchanges.
2. Establish market context. Check trend, volatility, liquidity, BTC/ETH dominance, funding rates, open interest, basis, and material events. Yahoo Finance chart data may supplement price history only after checking returned fields and independently cross-checking prices. Indicate timestamps for each data source.
3. Perform multi-timeframe structure analysis. Identify trend, swing highs/lows, liquidity clusters, supply/demand zones, order blocks and imbalance areas; separate objective structure from subjective SMC labels.
4. Examine derivatives and order flow. Cross-validate using funding rates, open interest, liquidations, CVD and basis signals; do not escalate an anomaly at a single venue to a market-wide conclusion.
5. Handle existing leveraged positions. First verify direction, notional value, margin model and liquidation price before discussing any additional risk. Do not recommend adding to positions when critical fields are missing.
6. Analyze DeFi LPs. Verify protocol and contracts, fee tier, historical price distribution, range coverage, fees, impermanent loss, rebalancing costs and smart contract risk. Do not present nominal APR only.
7. Verify high-risk topics. Apply pessimistic-first verification for exchange yields, token issuances, airdrops, regulatory or security events; output "Unable to verify" when unable to confirm from primary or independent sources.
8. Formulate strategy candidates. Provide direction, conditions, key zones, invalidation conditions and risks; hand off to `quant-backtesting` for historical testing and to `trade-planning` only for an unsubmitted manual plan the user may independently implement.

## Quality Gates

| Gate | Passing Criteria | Failure Handling |
|---|---|---|
| Unique identification | Network, contract, or trading pair unambiguous | Pause and clarify |
| Cross-source price verification | At least two independent sources or document single-source limitations | Lower confidence |
| Venue consistency | Spot/perpetual, quote currency and timezone consistent | Standardize before computing |
| Leverage completeness | Direction, position, margin, leverage and liquidation rules available | Do not provide add-to-position recommendations |
| LP reproducibility | Range, fee tier, price path and cost assumptions visible | Do not output expected yield |

## Handoff Rules

| Request Expansion | Call Chain |
|---|---|
| Backtest grid, trend, or funding-rate strategies | `crypto-analysis` → `quant-backtesting` |
| Generate a manual order or DeFi action plan, including a prohibited request to execute, sign, broadcast, approve, or transfer | `crypto-analysis` → `trade-planning`; stop before any platform interaction |
| Include crypto assets in multi-asset portfolio | `crypto-analysis` → `portfolio-management` |
| Traditional equity or ETF analysis | `equity-research` or `fund-etf` |

## Delivery Requirements

Present the relevant assets, venue/time context, structure, derivatives/on-chain signals, positions or LP analysis, fact checks and limitations.

Preserve the user-selected source, metric basis, scope and output. Follow [output-contracts.md](output-contracts.md) for delivery and [completion-evidence.md](completion-evidence.md) for the actual applicable checks. Keep material facts, units, dates, assumptions, risks and gaps traceable without forcing headings or an internal object into the response.

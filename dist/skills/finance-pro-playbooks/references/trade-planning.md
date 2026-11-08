# Trade Planning Module

Read this document when a user requests a trade signal, short-term setup, paper simulation, manual order plan, or instructions for placing, modifying, replacing, or cancelling an order themselves.

## Single Primary Responsibility

Convert validated research, strategy rules, or portfolio targets into analysis, hypothetical simulations, and a **manual plan that the user may independently use, change, or ignore outside this SKILL**. Do not substitute for equity research, options structure design, crypto market assumptions, portfolio construction, or historical backtesting.

This module and any tools or agents it controls must never access or operate a broker, exchange, trading venue, custody system, or wallet for a transactional action. It must never place, route, transmit, submit, sign, modify, replace, or cancel an order or transaction; transfer assets; approve a smart-contract or DeFi action; obtain a transactional receipt; or claim that a transaction occurred. User confirmation cannot expand this module's capabilities beyond that boundary. The boundary does not restrict the user's independent decisions or activity outside the SKILL.


## Permitted Modes

| Mode | Description | Financial Transaction Side Effect |
|---|---|---|
| `analysis` | Produce market observations, signal cards, conditions, and candidate setups | Prohibited |
| `paper` | Produce a clearly hypothetical simulation using stated assumptions | Prohibited |
| `manual_plan` | Produce a proposed, unsubmitted order plan and checklist that the user may choose to use outside this SKILL | Prohibited for this SKILL |

Default to analysis when no simulation or concrete manual plan is requested. Live transactions remain outside the Skill's capability regardless of labels or user confirmation. Redirect a transaction request to a proposed, unsubmitted manual plan.

## Absolute Transaction Boundary

The module may explain what the user could independently enter on an external platform, but the module and its tools must not open or operate the platform's transaction interface, call a write-capable API, use a wallet signing flow, request order-placement credentials, or perform a browser action that creates, changes, signs, submits, or cancels a transaction. The user remains free to decide and act independently outside the SKILL.

Read-only market or account context may be analyzed when the user authorizes access and the privacy policy permits it. The SKILL's read access must never be upgraded to transaction authority. When the user supplies an existing order, treat it as immutable input and return only a proposed replacement or cancellation plan that the user may choose to carry out independently outside the SKILL.

## Yahoo Finance Boundary

Yahoo Finance data obtained through an available approved read-only data operation may be used only as secondary historical or delayed context. It is not an executable quote, broker state, trading-session guarantee, halt check, available-balance check, or confirmation of a transaction. Every manual plan must state that, if the user chooses to act outside the SKILL, they should independently re-check current price, spread, session status, contract terms, fees, balances, and platform support.

## Input Contract

| Field | Requirement | Description |
|---|---|---|
| `instrument` | Required | Security, product, market, contract month, or trading pair |
| `objective` | Required | Analyze, simulate, create a plan, revise a plan, or prepare cancellation instructions |
| `mode` | Required | `analysis`, `paper`, or `manual_plan` |
| `transaction_requested` | Required | Whether the user asked the system to transact; this never authorizes a transaction |
| `strategy_source` | Conditionally required | Upstream research, backtest, portfolio target, or explicit user rules |
| `side`, `order_type` | Required for an order plan | Proposed direction and order type for the user to review |
| `quantity` or `risk_budget` | Required for an order plan | Proposed quantity or inputs for a transparent sizing calculation |
| `entry`, `stop`, `target` | Conditionally required | Proposed price, range, or trigger conditions |
| `time_in_force`, `expiry` | Conditionally required | Proposed validity settings, subject to platform support |
| `market_context` | Required for an actionable plan | Timestamped prices, spread/liquidity context, events, and known data limitations |

Do not request or accept passwords, API secrets, private keys, seed phrases, transaction-signing permissions, or other credentials for a financial transaction. Do not include account aliases, broker order IDs, client order IDs, transaction hashes, or signing payloads in the manual plan.

## Workflow

1. **Confirm responsibility.** If the request requires fundamental research, options structuring, crypto assumptions, portfolio construction, or backtesting, call the corresponding upstream module first and consume only its structured conclusions.
2. **Redirect transaction requests.** If the user asks the system to place, change, cancel, sign, or submit a transaction, begin with one brief statement that the SKILL cannot perform the action and that the user may act independently outside it. When sufficient information is available, continue with the useful proposed, unsubmitted manual plan rather than ending at a bare refusal. Treat any later user confirmation as review of the plan only, never as transaction authority.
3. **Validate analytical context.** Check instrument identity, timezone, data timestamp, session conventions, contract specifications, corporate actions, events, and source limitations. Do not characterize delayed or incomplete data as executable.
4. **Generate a signal card.** State direction or `WAIT`, entry conditions, invalidation conditions, stop logic, target logic, reward-to-risk, confidence, and supporting evidence. Downgrade order-flow claims when the required data is unavailable.
5. **Build a final manual order plan.** Normalize and restate the proposed side, quantity, order type, price logic, time in force, expiry, notional, risk budget, estimated costs, and maximum modeled loss. Keep assumptions and formulas visible and label the plan proposed and unsubmitted even when the user says that the plan is confirmed or asks the agent to proceed.
6. **Run plan checks.** Check internal consistency, duplicate-plan risk, portfolio conflicts, concentration, gap/slippage scenarios, expiry, liquidity, and event risk using available data. Convert unavailable platform facts—such as buying power, margin approval, current spread, venue support, and trading halts—into explicit user verification steps rather than attempting to inspect or change the platform.
7. **Provide user-controlled self-execution guidance.** After the brief boundary statement and final manual plan, state that, if the user independently chooses to act outside the SKILL, they may open the relevant platform themselves, verify the current instrument and market state, compare every proposed field, assess suitability, enter the order manually, and review the platform's final confirmation screen. Present this guidance as the practical continuation of the response rather than as a substitute for the plan. These steps describe user-controlled activity and must never become an execution workflow for the SKILL.
8. **Stop at the plan and guidance.** Do not request confirmation for the system to proceed, do not submit anything, do not poll for status, and do not produce fills, receipts, transaction IDs, or reconciliation claims. If the user repeats the execution request or says the plan is confirmed, briefly restate the boundary, keep the plan proposed and unsubmitted, refresh only data-dependent verification items when needed, and return the final manual plan plus user-controlled steps. If the user later supplies a completed transaction record, it may be analyzed as read-only historical data by the appropriate module.

## Specialized Analyses

| Scenario | Required Data | Handling When Missing |
|---|---|---|
| Gold order-flow analysis | Heatmap, Footprint, CVD, and contract specifications | Downgrade to standard technical analysis |
| Index-futures open plan | Intraday levels, overnight range, timezone, and event calendar | Output observation conditions or `WAIT` |
| Commodity-futures monitoring | Continuous-contract rules, expiry, spot, and fundamental data | Flag rollovers and limited-support status |
| Equity short-term plan | Pre-market or post-market events, liquidity, and session conventions | Output conditional levels rather than executable claims |
| Copy-trade simulation | Complete history, de-identified data, fee assumptions, and latency | Simulate only; do not infer replicable returns or automate copying |

## Handover Rules

| Request Extension | Call Chain |
|---|---|
| Equity fundamental conclusions | `equity-research` → `trade-planning` |
| Options structure selection | `options-strategy` → `trade-planning` |
| Crypto market assumptions | `crypto-analysis` → `trade-planning` |
| Strategy historical validation | `quant-backtesting` → `trade-planning` |
| Portfolio target weights to manual order plans | `portfolio-management` → `trade-planning` |

## Delivery Requirements

Present only analytical context, clearly hypothetical simulations, signal conditions and a proposed, unsubmitted manual plan as applicable. Preserve user-controlled verification steps and the Skill transaction boundary. Do not include platform connections, account/order identifiers, submitted states, fills, signing payloads or broker-import files as outputs of the Skill. User instructions describe independent user activity and must not delegate a transaction to an agent or tool.

Preserve the user-selected source, metric basis, scope and output. Follow [output-contracts.md](output-contracts.md) for delivery and [completion-evidence.md](completion-evidence.md) for the actual applicable checks. Keep material facts, units, dates, assumptions, risks and gaps traceable without forcing headings or an internal object into the response.

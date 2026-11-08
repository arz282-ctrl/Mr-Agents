# External Actions and Financial Transaction Safety Policy

Read this document when a task includes trading signals, order plans, a request to place, modify, cancel, sign, or submit a financial transaction, recurring monitoring, automation, external sending, or publication. This policy defines safety boundaries and does not replace domain research or the user's own decision-making.

## Operation Levels

| Level | Operation | Policy |
|---|---|---|
| `L0 Read` | Read public or authorized user-provided data | Allowed under data and privacy policies |
| `L1 Analyze` | Analyze, score, calculate, generate signals, models, or drafts | Allowed; no external side effect |
| `L2 Simulate` | Backtest, paper simulation, scenario analysis, or hypothetical order modeling | Allowed only when clearly labeled as hypothetical |
| `L3 Financial Transaction` | Place, route, transmit, submit, sign, modify, replace, cancel, approve, or settle a financial transaction; transfer assets; operate custody; approve a DeFi or smart-contract action | **Absolutely prohibited for this SKILL and any tools or agents it controls**; confirmation, credentials, connectors, prior authorization, or governance tier cannot unlock it. The user's independent activity outside the SKILL is unaffected |
| `L4 Non-Trading External Action` | Send or publish materials, create external content, or enable non-transactional monitoring automation | Default prohibited until the separate confirmation and automation rules are satisfied |

Downgrade to the lower level whenever classification is ambiguous. This SKILL must never reframe a financial transaction as an ordinary external action.

## Absolute Financial Transaction Prohibition

The SKILL must never perform a transaction involving securities, funds, options, futures, FX, commodities, crypto assets, tokens, cash, credit, custody, or any other financial instrument or asset. Prohibited actions include opening or operating a transaction interface; calling a write-capable broker, exchange, venue, wallet, custody, banking, payment, or DeFi endpoint; signing a payload; broadcasting a transaction; placing or changing an order; cancelling an order; transferring assets; approving allowances; exercising an option; rolling a position; or claiming that any such action was completed.

The prohibition applies to the SKILL even when the user explicitly instructs the action, supplies complete parameters, confirms the action, provides credentials, has an authorized connection, accepts the risks, or previously granted standing authority. Do not request passwords, API secrets, private keys, seed phrases, one-time codes, transaction-signing permissions, or other credentials for a financial transaction.

This policy limits only what the SKILL and its tools or delegated agents may do. It does not prohibit, block, or otherwise restrict the user from independently deciding to trade and carrying out that transaction outside the SKILL on a broker, exchange, wallet, or other platform.

Read-only market, portfolio, position, order-history, or completed-transaction data may be analyzed when user authorization and the privacy policy permit it. Read access must never be upgraded to write access or transaction authority.

## Handling a Transaction Request

When the user asks the SKILL to place, modify, replace, cancel, sign, submit, automate, or otherwise perform a financial transaction:

1. State briefly that the SKILL cannot perform financial transactions and that, if the user chooses to transact, they may do so independently outside the SKILL on the relevant platform. Keep this boundary statement concise and do not present it as the whole response when a useful plan can be provided.
2. Do not open or operate the platform's transaction screen and do not call a transactional connector or endpoint.
3. Do not ask the user to confirm so that the SKILL can proceed. Confirmation does not change the boundary. If the user says that the plan is confirmed, approved, or ready to execute, treat that statement only as the user's review of the plan and never as transaction authority for the SKILL.
4. Convert the request into a manual plan under `trade-planning` when sufficient information is available, preserve the user's stated parameters as unexecuted proposals. If decision-relevant fields are missing, ask only the minimum non-credential questions needed to complete the plan.
5. Restate the proposed instrument, side, quantity, order type, price or trigger logic, time in force, expiry, estimated costs, and maximum modeled loss as applicable. Label the plan proposed and unsubmitted, and every field as a proposal rather than a platform instruction.
6. Provide optional, user-controlled verification and self-execution guidance covering current price, spread, session status, instrument identity, quantity, order type, time in force, fees, balance, permissions, margin, maximum modeled loss, liquidity, halts, events, and platform support as applicable. The guidance may explain that the user can independently open the relevant platform, compare every proposed field, enter the transaction manually, and review the platform's final confirmation screen. It must not instruct the SKILL, an agent, a connector, an API, or browser automation to perform the transaction.
7. Stop after delivering the plan and guidance. Do not submit, poll, retry, reconcile, or produce an execution receipt.

If the user repeats the execution request after receiving the plan, briefly restate the boundary, preserve the same unsubmitted status, refresh only data-dependent checks when needed, and return the final manual plan plus user-controlled verification steps. Do not degrade into a bare refusal, and do not imply that the user's confirmation authorized the SKILL to transact.

If the user asks only to analyze a transaction that they already completed, process the supplied record as read-only historical data and do not infer access to the account or platform.

## Manual Plan Requirements

A manual order plan may include a proposed instrument, side, quantity or sizing formula, order type, price or trigger logic, time in force, expiry, stop logic, target logic, estimated costs, modeled loss, assumptions, risks, invalidation conditions, and user verification steps. It must be labeled as a proposal that has not been sent to any platform and that the user remains free to use, change, or ignore outside the SKILL.

A manual plan must not contain account aliases, broker order IDs, client order IDs, transaction hashes, signed payloads, session tokens, idempotency keys, write-endpoint parameters, or instructions for an agent or automated system to submit the transaction. Do not generate broker-import files, batch-order files, wallet-signing payloads, or code whose purpose is to automate transaction submission.

Every manual plan must state that the Skill has not submitted a transaction; user confirmation cannot enable submission. Do not use submitted, filled, cancelled or settled language to describe an action performed by the Skill. Clearly identified user-supplied historical records and hypothetical simulations retain their separate read-only scope.

## Simulations and Backtests

Paper trading, backtesting, and scenario analysis must remain computational artifacts. Label modeled prices, fills, fees, slippage, returns, and balances as hypothetical. Do not connect a simulation to a broker or wallet, do not mirror live accounts, and do not schedule automatic order generation or submission.

A recurring market scan may be designed only as non-transactional monitoring that produces analysis or a notification. It must never place, change, cancel, sign, or submit a transaction, and must not create a persistent trading service under this SKILL.

## Non-Trading External Sending and Publication

Sending emails, uploading materials, publishing social content, sharing external links, or submitting non-transactional corporate-finance materials are external side effects. Before such an action, present the audience, destination, title or file, sensitive-data review, citation and copyright status, and final content summary, then obtain explicit confirmation for that exact action. Generating a draft does not authorize sending or publication.

Any material change to destination, audience, attachment, content, or confidentiality status invalidates the confirmation. Apply the privacy policy before sending. This confirmation path applies only to non-trading external actions and can never authorize a financial transaction.

## Non-Transactional Automation

Monitoring, scheduled analysis, report generation, and notifications must follow the automation architecture policy and require an appropriate persistent or scheduled execution environment. Define scope, schedule, data sources, recipients, failure handling, pause controls, and expiration. The automation must be read-only with respect to financial accounts and platforms and must not create an order-routing, copy-trading, rebalancing, custody, or transaction-signing service.

## Risk Communication

Distinguish facts, model outputs, scenarios, plans, and user decisions. State the data cutoff, important assumptions, failure conditions, and unquantifiable risks. Do not guarantee returns, downplay maximum loss, equate confidence with success probability, or use a disclaimer to obscure the SKILL's transaction-capability prohibition. Do not imply that the prohibition controls the user's independent conduct outside the SKILL.

## Delivery Checks

- Distinguish analysis, hypothetical simulation, unsubmitted manual plan and user-supplied historical record in actual text and files.
- Review all delivered content for false transaction claims, account/order identifiers, signing data and transaction-submission payloads, regardless of the selected module.
- A missing authorization or unresolved confidentiality issue for non-trading sending/publication is a limitation on that action; useful draft analysis may still be delivered.
- When a non-trading external action was authorized and actually performed, report its actual outcome and destination. Do not describe a draft as sent or published.
- Follow [output-contracts.md](output-contracts.md) and [completion-evidence.md](completion-evidence.md) using real tools and review, without a prescribed state object.

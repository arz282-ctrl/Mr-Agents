# Evidence and Verification Responsibilities

Use for substantive analysis, models, backtests and professional deliverables. Narrow concept answers use [direct-answer.md](direct-answer.md). The LLM or analyst checks actual evidence against the written rules. No program-based acceptance, validation command, fixed receipt format or universal independent-approval file is required. Available tools support data retrieval, arithmetic, file viewing and recalculation; their outputs are assessed against the text rather than treated as universal pass/fail authority.

## Division of Work

| Responsibility | Performed by | Evidence to retain when relevant |
|---|---|---|
| Interpret user scope and apply Skill standards | LLM or analyst | Original request, relevant choices and latest corrections |
| Retrieve and check sources | Authorized retrieval tools plus analyst review | Actual source, date/version, locator and selected field basis |
| Calculate and reconcile | Calculation/spreadsheet tools produce outputs; LLM or analyst applies the written checks | Inputs, formula, parameters, outputs and reconciliation |
| Check a delivered file | LLM or analyst inspects the final file using available viewing/recalculation tools | Final saved file and checks actually performed |
| Judge complex financial semantics or authorize distribution | Genuine qualified or independent reviewer, when required | Review scope, final material/version, decision and unresolved issues |

An agent cannot invent another reviewer's approval. A file hash can identify bytes when version binding is useful; it does not prove source authority, economic correctness or authorization. Assess whether independent review is required by the task, audience or risk; do not invent an approval workflow for a simple answer.

## Source Traceability

Apply [data-source-policy.md](data-source-policy.md). Material facts and hard-coded inputs must trace to the actual issuer/provider/user file, date, field or page/cell locator, unit, currency, period and adjustment basis. Retain the requested input version and distinguish observation, publication and retrieval times. A provider label or self-declared verified status is insufficient.

Use available primary sources or genuine independent corroboration for factual verification. Preserve user-selected data as its requested basis even when conflicting evidence exists; show the discrepancy and qualification. If a raw input, source snapshot or data revision changes, refresh affected calculations and review conclusions. Old run logs or results do not prove a run on new data.

## Calculations and Models

Use [metric-dictionary.md](metric-dictionary.md) for defaults and the selected Playbook's applicable checks. Preserve user formulas, windows, benchmarks and annualization. Map material outputs to actual inputs and formulas in working notes or the model. Check units and economic meaning as well as arithmetic: equity value is not per-share price, and option quantity is not cash capital.

Reconcile accounting identities, cash/debt/equity bridges, periods, sensitivity tables and extreme cases relevant to the model. Inspect simple formulas or use a genuine recalculation engine for complex workbooks, circular models and unsupported functions. Cached values alone do not prove recalculation. If editing an existing workbook, preserve unrelated sheets, formulas, charts and metadata and check the final saved result. Recalculate after material edits.

Complex accounting/tax applicability, assumption selection, instrument terms and financial interpretation require judgment; involve a genuine reviewer when required. If a requested custom calculation cannot be checked, disclose that specific limitation. Do not replace it with a supported default or describe the whole requested output as validated.

## Domain-Specific Checks

- **Equity valuation:** trace valuation-critical facts to appropriate disclosures; reconcile valuation method, scenarios, equity bridge and per-share denominator. Apply the user's chosen scenario/sensitivity scope and disclose any narrower verification.
- **Funds:** distinguish price return from verified total return/wealth indices, and align dates, currency, distributions, frequency and adjustments.
- **Portfolio analysis:** verify sourced exposures, constraints, cash/net/gross allocations, risk assumptions and before/after scenarios.
- **Options and DeFi:** verify instrument/pool identity, multiplier, monetary units, expiry, capital/margin and cash/fee/payoff basis. A terminal intrinsic-payoff calculation does not price remaining time value, IV changes or multi-expiry paths; use a suitable reviewed pricing method or qualify the result.
- **Backtests:** execute the actual strategy using identified data versions; retain sufficient code or tool settings, inputs, run record, trade log and results to reproduce it. Recompute returns/costs and assess point-in-time availability, corporate actions, survivorship and the selected out-of-sample/parameter/regime/cost checks. Clearly label hypothetical results. Generated code or a proposed run is not an executed backtest.
- **Corporate finance:** read the selected [task checks](corporate-finance/task-checks.md) and Playbook. Supplied existing models or reviewed equivalent inputs may satisfy dependencies; assess their scope, date and conventions before using them. Missing prerequisites do not justify silently adding unrequested deliverables.

## Final File and Content Review

Inspect the actual final user-visible response and file, not only an internal model. If financial content is rewritten or the file changes, refresh the affected content and file checks. Verify that requested tables, conclusions, assumptions and material limitations occur in the delivered version.

View the final file with tools appropriate to its format and assess it against the written delivery checklist. A file header or readable prefix does not prove a complete valid file. Inspect active content when relevant, including Office macros/external links and HTML/SVG scripts and event handlers; do not execute untrusted embedded content during review. Report only the checks actually performed.

Apply [privacy-security.md](privacy-security.md) to hidden content, metadata, comments, filenames and embeds as well as visible text. Blind/named mode, distribution scope, legal notices and release decisions require their actual applicable sources and authorization. Keep any unresolved confidentiality or format check explicit.

## Transaction and Publication Checks

Apply [execution-safety.md](execution-safety.md) to every relevant module and every delivered text/file. An unsubmitted manual plan remains a proposal; do not claim a financial transaction was executed or create transaction-submission payloads. Historical records and clearly labeled simulations may be analyzed within their actual scope.

For non-trading publication or sending, confirm authorization for the actual destination, audience and final content. Respect existing authorization; obtain only missing approval. Draft creation is not publication authority.

## Reporting Verification

State which material checks actually ran, what they covered and what remains unresolved using the user's requested structure. Do not claim all checks passed from labels, template completion or source/file existence alone. Retain only task-relevant working evidence, and do not add unsolicited proof files or reports to the user's delivery.

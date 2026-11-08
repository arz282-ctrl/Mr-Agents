# LBO & Deal Structuring

Apply [request and delivery priority](../../../output-contracts.md#request-priority) and the [source policy](../../../data-source-policy.md) before task defaults. Provider names, section/page counts, output media, modeling layouts and intake questions in a Playbook are defaults: preserve explicit user choices and answers already supplied. Do not turn a failed lookup into an entity classification or an unsupported estimate into a required number. Accounting identities, truthful evidence, confidentiality and transaction boundaries still apply. For linked models and returns, use the [shared reconciliation rules](../../../metric-dictionary.md#model-reconciliation-and-attribution).

Playbooks for leveraged buyouts and private-market deal structures: core LBO, debt schedules, sources & uses, structured equity, earnouts, roll-ups, recaps, and sale-leasebacks. Always load `formats/excel_standards.md` and `formats/metric_disambiguation.md` alongside this file when producing Excel output.

## Contents

| Task | File | Use when |
|---|---|---|
| LBO Model | [`lbo-model.md`](lbo-model.md) | Building a full leveraged buyout model from deal mechanics through returns and IC presentation |
| Debt Schedule (LBO) | [`lbo-debt-schedule.md`](lbo-debt-schedule.md) | Building a standalone LBO debt schedule covering tranche roll-forwards, CFADS, optional repayment waterfall, and credit metrics |
| Sources & Uses (S&U) | [`sources-and-uses.md`](sources-and-uses.md) | The S&U table itself is the standalone deliverable or is being independently audited |
| Structured Equity Modeling | [`structured-equity-modeling.md`](structured-equity-modeling.md) | Adding a preferred equity sleeve to an existing LBO to model instrument-specific exit waterfalls, year-by-year conversion/redemption decisions, and separate IRR & MOIC for preferred, common, and blended cohorts |
| Earnout Modeling | [`earnout-modeling.md`](earnout-modeling.md) | An M&A transaction includes contingent seller consideration payable upon post-close performance |
| Bolt-On Acquisition Modeling | [`bolt-on-acquisition-modeling.md`](bolt-on-acquisition-modeling.md) | Modeling a buy-and-build or roll-up strategy where a platform company executes multiple tuck-in acquisitions over the forecast period |
| Dividend Recap Modeling | [`dividend-recap-modeling.md`](dividend-recap-modeling.md) | A PE-backed portfolio company raises new debt and distributes proceeds as a special dividend, enabling sponsor early liquidity |
| Sale-Leaseback Modeling | [`sale-leaseback-modeling.md`](sale-leaseback-modeling.md) | Modeling a sale-leaseback (SLB) transaction overlay on an existing LBO, DCF, or 3-statement model to assess accretion/dilution, cash flow impact, and equity value creation |

## Group-Wide Scope and Operating Discipline

- **Build order and linkage.** Establish the relevant host model or standalone baseline, its assumptions, and its core tie-outs before layering a financing, consideration, or asset-monetization module onto it. Put user inputs in a clearly identified input block; derived values and inter-tab pulls must be formula-linked. A module must feed the host model rather than duplicate its operating, debt, or returns calculations.
- **Cash-flow integrity.** Record each economic item exactly once in the appropriate timing row. Distinguish cash interest, principal, and other cash movements from non-cash items such as PIK accrual, OID, and financing-fee amortization. For mid-period events, use an explicit stub convention consistently across the affected cash-flow, interest, and return calculations.
- **Financing mechanics.** Apply the [shared financing-cost and reconciliation rules](../../../metric-dictionary.md#model-reconciliation-and-attribution). Separate face principal, carrying value, OID and issuance costs under the applicable instrument/accounting basis; use the required interest method. Distinguish non-cash amortization/PIK from cash interest; contractual CFADS and covenant metrics follow the agreement. Debt schedules, cash flows, S&U and exit equity use the same capital structure and roll-forwards.
- **Transaction accounting.** Keep advisory/transaction fees separate from financing fees/OID. Preserve task-specific accounting classification and tax treatment; do not net gross consideration, fees, debt, or equity movements where separate disclosure is required.
- **Control checks.** Where applicable, foot Sources = Uses, balance the relevant balance-sheet bridge, keep debt balances within contractual bounds, and test that switches restore the stated baseline. A return or sensitivity output must trace to the same dated sponsor cash-flow and capital structure used by the underlying model.

## Common Pitfalls

- Do not introduce an overlay before its host model ties out, or use an overlay to reverse-engineer the operating case.
- Do not hard-code a value that should be driven by an assumption or another module; retain only explicit input cells as hard-codes.
- Do not double-count a cash movement in both an operating/FCF row and a financing, exit, or valuation bridge. Task playbooks specify the required treatment for their particular transaction item.
- Preserve each task's metric definition, accounting semantics, thresholds, formulae, Ask First gates, and scope boundaries; this overview supplies shared discipline, not overrides.

For substantive work, read the selected [task checks](../../task-checks.md) and shared [evidence guidance](../../../completion-evidence.md). Apply task-relevant intake, source, calculation, file and semantic checks using actual tools or reviewers. Explain missing evidence or required review without inventing a passed label. User-requested scope and formats override suggested deliverables.

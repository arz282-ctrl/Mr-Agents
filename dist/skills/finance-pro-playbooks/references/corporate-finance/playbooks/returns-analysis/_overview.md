# Returns & Exit Analysis

Apply [request and delivery priority](../../../output-contracts.md#request-priority) and the [source policy](../../../data-source-policy.md) before task defaults. Provider names, section/page counts, output media, modeling layouts and intake questions in a Playbook are defaults: preserve explicit user choices and answers already supplied. Do not turn a failed lookup into an entity classification or an unsupported estimate into a required number. Accounting identities, truthful evidence, confidentiality and transaction boundaries still apply. For linked models and returns, use the [shared reconciliation rules](../../../metric-dictionary.md#model-reconciliation-and-attribution).

Playbooks for explaining where returns come from and how exit proceeds are shared: IRR decomposition, value creation bridges, liquidation waterfalls, and management incentive plans. Load `formats/excel_standards.md` when producing Excel output.

## Contents

| Task | File | Use when |
|---|---|---|
| IRR Attribution | [`irr-attribution.md`](irr-attribution.md) | Attributing sources of LBO equity IRR to operating, inorganic, structural, and leverage components |
| Value Creation Bridge | [`value-creation-bridge.md`](value-creation-bridge.md) | An LBO model is complete and the sponsor needs equity value change from entry to exit decomposed by dollar contribution and MOIC attribution |
| Liquidation Waterfall | [`liquidation-waterfall.md`](liquidation-waterfall.md) | A term sheet, LLCA, or operating agreement requires translation into a scenario-based distribution model |
| MIP Modeling | [`mip-modeling.md`](mip-modeling.md) | Modelling management incentive economics inside an LBO exit waterfall |

## Group-Wide Operating Rules

### Scope and dependencies

These playbooks explain **returns, value creation, or distribution economics**; they do not replace the underlying operating forecast, debt schedule, or governing legal documents. Start from the authoritative linked LBO/exit-waterfall output or confirmed contractual terms. Hardcode only confirmed inputs, and drive scenario- and time-dependent calculations from linked input cells.

### Basis, timing, and scenario discipline

- State and preserve the relevant basis: **TEV versus equity value**, **gross versus net common equity**, and **IRR versus MOIC versus dollars** are not interchangeable.
- Keep enterprise-value creation, capital-structure effects, and equity-distribution/dilution effects in separate lines. Do not double-count cash, debt, preferences, fees, or incentive payouts.
- Recalculate all time-dependent returns and distributions for each modeled exit date/year. A non-integer IRR holding period uses actual dates and XIRR where the task requires it.
- Exact legal or deal-specific terms override defaults. Surface ambiguity for confirmation rather than resolving it by convention.

### MIP treatment in return outputs

Treat management incentive payout as a separately identified dilution/cost. Sponsor returns use **post-MIP net common equity**, while management co-invest remains a separate pari passu ownership return. The applicable task governs payout mechanics, hurdles, tiers, and waterfall position.

### Reconciliation and delivery

Every scenario must reconcile to the authoritative exit proceeds, exit-waterfall equity value, or live returns output before delivery. Keep task-level checks as concise assertions; their stated formulas, tolerances, and flags control. Refresh the analysis after an input or assumption that affects the result changes. Present the decision-relevant inflection points and risk concentrations alongside the model output.

For substantive work, read the selected [task checks](../../task-checks.md) and shared [evidence guidance](../../../completion-evidence.md). Apply task-relevant intake, source, calculation, file and semantic checks using actual tools or reviewers. Explain missing evidence or required review without inventing a passed label. User-requested scope and formats override suggested deliverables.

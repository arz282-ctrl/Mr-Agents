# Valuation

Apply [request and delivery priority](../../../output-contracts.md#request-priority) and the [source policy](../../../data-source-policy.md) before task defaults. Provider names, section/page counts, output media, modeling layouts and intake questions in a Playbook are defaults: preserve explicit user choices and answers already supplied. Do not turn a failed lookup into an entity classification or an unsupported estimate into a required number. Accounting identities, truthful evidence, confidentiality and transaction boundaries still apply. For linked models and returns, use the [shared reconciliation rules](../../../metric-dictionary.md#model-reconciliation-and-attribution).

Playbooks for answering “what is this company worth”: intrinsic (DCF), market-based (trading comps and precedent transactions), segment-based (SOTP), and share-count mechanics. Always load `formats/excel_standards.md` and `formats/metric_disambiguation.md` with this file for Excel output.

> The authoritative cross-module valuation discipline—primary-method declaration, cross-checks, bear/base/bull framework, sensitivity analyses, and parameter constraints—is [`references/metric-dictionary.md §General Valuation Discipline`](../../../metric-dictionary.md#general-valuation-discipline). This group adds only task-level engineering and defaults.

## Group-Wide Valuation Mechanics

- **Date, period, and currency:** State the valuation/pricing date, financial-period cut-off, reporting currency, and any FX basis. Keep actual, LTM, NTM, and transaction-date metrics distinct; task-specific period rules control where stricter.
- **Claim convention:** Label enterprise value (EV/TEV) and equity value separately. Use a single, internally consistent bridge and as-of date for cash, debt, preferred equity, minority interests/NCI, and other non-operating claims; do not mix EV and equity-value multiples.
- **Fully diluted shares:** Use treasury-stock-method (TSM) FDSO for market cap and every per-share valuation. Do not substitute GAAP diluted weighted-average shares. The `fully-diluted-share-count` task owns tranche formulas and convertible treatment.
- **Comparability and audit trail:** Use one stated definition for a metric across a comparable set, normalize material accounting differences as required by the task, and attach a source annotation to each hardcoded table input. Mark unavailable or non-meaningful values as the relevant task prescribes rather than imputing them.
- **Cross-method use:** Name the primary valuation method. Treat other methods as labeled cross-checks or reference rows; do not blend methodologies, periods, or control-premium conventions without an explicit rationale.

## Contents

| Task | File | Use when |
|---|---|---|
| DCF Model | [`dcf-model.md`](dcf-model.md) | Building a standalone discounted cash flow valuation for a company |
| Public Comps | [`public-comps.md`](public-comps.md) | Valuing a company using current market pricing of publicly traded peers |
| Precedent Transactions | [`precedent-transactions.md`](precedent-transactions.md) | Valuing a target using actual M&A transaction multiples paid by acquirers |
| SOTP Valuation | [`sotp-valuation.md`](sotp-valuation.md) | A multi-segment company requires segment-level valuation with distinct growth, margin, or risk profiles |
| Fully Diluted Share Count | [`fully-diluted-share-count.md`](fully-diluted-share-count.md) | Calculating fully diluted shares outstanding (FDSO) for market cap, per-share value, EPS, or valuation inputs |

For substantive work, read the selected [task checks](../../task-checks.md) and shared [evidence guidance](../../../completion-evidence.md). Apply task-relevant intake, source, calculation, file and semantic checks using actual tools or reviewers. Explain missing evidence or required review without inventing a passed label. User-requested scope and formats override suggested deliverables.

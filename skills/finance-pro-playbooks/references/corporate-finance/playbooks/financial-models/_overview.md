# Financial Models

Apply [request and delivery priority](../../../output-contracts.md#request-priority) and the [source policy](../../../data-source-policy.md) before task defaults. Provider names, section/page counts, output media, modeling layouts and intake questions in a Playbook are defaults: preserve explicit user choices and answers already supplied. Do not turn a failed lookup into an entity classification or an unsupported estimate into a required number. Accounting identities, truthful evidence, confidentiality and transaction boundaries still apply. For linked models and returns, use the [shared reconciliation rules](../../../metric-dictionary.md#model-reconciliation-and-attribution).

Playbooks for building and maintaining operating and transaction models: 3-statement forecasts, merger math, synergies, IPO models, and auditing/editing existing workbooks. For Excel output, load `formats/excel_standards.md` and, where metrics or valuation terms are used, `formats/metric_disambiguation.md`.

## Contents

| Task | File | Use when |
|---|---|---|
| 3-Statement Model | [`three-statement-model.md`](three-statement-model.md) | Building a fully integrated income statement, balance sheet, and cash flow statement for a company |
| Merger Model (Accretion/Dilution) | [`merger-model.md`](merger-model.md) | Sizing EPS accretion/dilution impact of a proposed acquisition for buy-side analysis, pitch book, or fairness opinion |
| Synergy Analysis | [`synergy-analysis.md`](synergy-analysis.md) | Building a post-merger synergy quantification for a deal |
| IPO Model | [`ipo-model.md`](ipo-model.md) | Building a full IPO pricing and issuance model for a company going public |
| Model Audit | [`model-audit.md`](model-audit.md) | A financial model (Excel workbook, PDF, or oral description) requires independent diagnosis before a transaction, IC presentation, or internal review |
| Live Model Editing | [`live-model-editing.md`](live-model-editing.md) | User supplies an existing Excel file with a specific change request |

## Shared Calculation-Model Controls

These controls apply to calculation-model tasks (3-Statement, Merger, Synergy, and IPO) unless the applicable task defines a narrower treatment or an explicit exception:

- Establish a clearly identified input/assumptions area before dependent outputs. Keep formulas live and traceable to the designated inputs or supporting schedules; task-specific permitted hardcodes remain the only exceptions.
- Keep period labels, fiscal-period basis, units, and sign conventions consistent across linked inputs. Surface a mismatch rather than silently converting or combining incompatible data.
- Keep recurring/run-rate results separate from one-time items, and preserve separately modeled drivers where the task calls for them. Do not hide a material adjustment by netting it into another line.
- Make sensitivities and scenario outputs formula-driven. Use task-specific scenario definitions, switches, and calculation logic rather than pasted results.
- Before delivery, recalculate the workbook, resolve formula errors, and complete the task-specific tie-outs and flags. The task file is authoritative for its accounting semantics, formulas, thresholds, and required checks.

## Task Boundaries and Handoffs

- **3-Statement Model** is the upstream operating forecast for valuation and transaction work. It does not perform DCF or comparable-company valuation.
- **Synergy Analysis** produces the supportable synergy bridge; **Merger Model** consumes its output within accretion/dilution analysis.
- **IPO Model** consumes, but does not rewrite, the operating forecast. Sponsor exit work stays in its dedicated module.
- **Model Audit** diagnoses and reports; it does not alter cells. **Live Model Editing** implements an explicitly scoped workbook change; it does not independently critique or rebuild a model.

Read the selected task file for its Ask First gates, task-specific workflow, defaults, rules, checks, and scope boundaries.

For substantive work, read the selected [task checks](../../task-checks.md) and shared [evidence guidance](../../../completion-evidence.md). Apply task-relevant intake, source, calculation, file and semantic checks using actual tools or reviewers. Explain missing evidence or required review without inventing a passed label. User-requested scope and formats override suggested deliverables.

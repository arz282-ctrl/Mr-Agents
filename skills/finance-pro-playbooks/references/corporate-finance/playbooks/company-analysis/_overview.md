# Company Analysis & Screening

Apply [request and delivery priority](../../../output-contracts.md#request-priority) and the [source policy](../../../data-source-policy.md) before task defaults. Provider names, section/page counts, output media, modeling layouts and intake questions in a Playbook are defaults: preserve explicit user choices and answers already supplied. Do not turn a failed lookup into an entity classification or an unsupported estimate into a required number. Accounting identities, truthful evidence, confidentiality and transaction boundaries still apply. For linked models and returns, use the [shared reconciliation rules](../../../metric-dictionary.md#model-reconciliation-and-attribution).

Playbooks for understanding and finding companies: earnings analysis, public info compilation, red-flag screening, company profiles, target screening, and thematic risk scoring.

## Shared Working Conventions

- **Frame the coverage.** State the company, relevant period or as-of date, selected scope, and any material information gap or access constraint.
- **Separate evidence from judgment.** Keep sourced facts, task-specific analysis or scores, and unresolved gaps distinct; never present an inference or unavailable material as sourced fact.
- **Make evidence re-findable.** Preserve the source, document path, or other locator required by the selected task so a reviewer can trace a material item.
- **Be precise about coverage.** Use the task's required language for an empty result or fallback; do not imply that an omitted area was reviewed.
- **Apply the selected task's delivery mechanics.** The task file controls its required artifact, coverage limits, and task-specific checks.

## Contents

| Task | File | Use when |
|---|---|---|
| Earnings Update | [`earnings-update.md`](earnings-update.md) | A listed company has reported earnings and requires a structured update covering actuals vs. consensus/guidance, price reaction, call highlights, and revised outlook |
| Public Information Book (PIB) | [`public-information-book.md`](public-information-book.md) | A compiled reference of all public materials on a target company is needed for deal preparation, coverage initiation, or diligence |
| Adverse Media Screen | [`adverse-media-screen.md`](adverse-media-screen.md) | A PE/VC/credit diligence engagement requires an adverse-media and reputational risk screen of a target company and its key principals |
| Private Company Screening | [`private-company-screening.md`](private-company-screening.md) | Building a sourced, data-attributed target list of private companies for M&A origination, sector coverage, or mandate preparation |
| AI Disruption Assessment | [`ai-disruption-assessment.md`](ai-disruption-assessment.md) | Structuring an investment judgment on whether AI will disrupt a target company into a scoreable, IC-ready framework |

For substantive work, read the selected [task checks](../../task-checks.md) and shared [evidence guidance](../../../completion-evidence.md). Apply task-relevant intake, source, calculation, file and semantic checks using actual tools or reviewers. Explain missing evidence or required review without inventing a passed label. User-requested scope and formats override suggested deliverables.

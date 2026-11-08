# Due Diligence

Apply [request and delivery priority](../../../output-contracts.md#request-priority) and the [source policy](../../../data-source-policy.md) before task defaults. Provider names, section/page counts, output media, modeling layouts and intake questions in a Playbook are defaults: preserve explicit user choices and answers already supplied. Do not turn a failed lookup into an entity classification or an unsupported estimate into a required number. Accounting identities, truthful evidence, confidentiality and transaction boundaries still apply. For linked models and returns, use the [shared reconciliation rules](../../../metric-dictionary.md#model-reconciliation-and-attribution).

Playbooks for buy-side diligence: request lists and trackers, data-room gap reviews, quality of earnings, customer-revenue analysis, interview guides, and credit-document summaries. Read the selected task file as the task-specific authority. For Excel trackers or analytics, load `formats/excel_standards.md`; for memos and guides, load `formats/document_standards.md`.

## Shared Operating Principles

Apply these group rules unless a task supplies a stricter, task-specific treatment.

- **DD-01 — Evidence before conclusion.** Base company-specific statements, figures, citations, and status labels on the supplied materials or facts verified during the current task. Identify a missing, ambiguous, or unsupported item as a gap; do not complete it by inference.
- **DD-02 — Preserve an auditable source layer.** When a task consumes a workbook or data extract, leave the original source intact and perform transformations in an identified working layer. Retain the link or cell-level trace needed for a reviewer to follow a conclusion back to its source.
- **DD-03 — Keep classifications distinct.** Do not blur a sourced fact, a seller or management claim, an open question, and an analyst judgment. Use the task's prescribed labels, bridge, or evidence field to make the distinction reviewable.
- **DD-04 — Make gaps actionable.** Prioritise material diligence gaps and translate each into the next specific request, decision, or escalation. Do not manufacture low-value items merely to make a list, tracker, or memo appear comprehensive.

## Shared Dependencies and Handoffs

Use the workstream sequence that fits the engagement rather than duplicating an adjacent task:

- **Request and process management:** `dd-request-list` creates request rows; `dd-tracker` manages ownership, status, and milestones; `vdr-gap-analysis` maps received materials and produces targeted follow-ups.
- **Customer-revenue work:** `revenue-data-cleanup-audit` resolves structural data-quality issues first; `customer-level-revenue-analytics` builds the full suite; `retention-cohort-analysis` supplies the dedicated retention/cohort method.
- **Diligence discussions:** `management-meeting-questions` is for target management; `expert-call-guide` is for third-party experts; `meeting-minutes` records existing discussions.
- **Review outputs:** `buy-side-qoe-review` independently challenges an existing sell-side QoE; `credit-agreement-summary` distils executed credit documents; `pre-ic-consistency-review` reconciles supplied deal materials before IC.

Task files retain their task-specific Ask First gates, formulas, thresholds, accounting treatment, deliverable requirements, and final assertions. Use a named task's Scope Boundaries when deciding whether to hand work to an adjacent playbook.

## Contents

| Task | File | Use when |
|---|---|---|
| DD Request List (DRL) | [`dd-request-list.md`](dd-request-list.md) | User requests a due diligence request list (DRL) for an M&A or PE transaction |
| DD Tracker | [`dd-tracker.md`](dd-tracker.md) | Building an M&A or PE due diligence tracking workbook from scratch |
| VDR Gap Analysis | [`vdr-gap-analysis.md`](vdr-gap-analysis.md) | A buy-side investment team has received a data room and needs to map its contents to standard diligence questions, assess coverage, and identify gaps |
| Buy-Side QoE Review | [`buy-side-qoe-review.md`](buy-side-qoe-review.md) | A sell-side QoE report is available and the buyer needs an independent underwrite of true go-forward EBITDA |
| Revenue Data Cleanup & Audit | [`revenue-data-cleanup-audit.md`](revenue-data-cleanup-audit.md) | MRR/customer-level time-series data requires quality audit before analysis |
| Customer-Level Revenue Analytics | [`customer-level-revenue-analytics.md`](customer-level-revenue-analytics.md) | Raw customer-level revenue data ("customer cube") is available and the engagement requires NRR, cohort, concentration, and churn/new/expansion drill-downs |
| Retention & Cohort Analysis | [`retention-cohort-analysis.md`](retention-cohort-analysis.md) | Customer-level revenue data is available and the goal is to quantify retention, churn, upsell/downsell, and cohort decay |
| Management Meeting Questions | [`management-meeting-questions.md`](management-meeting-questions.md) | Preparing qualitative discussion questions for a live management meeting in an M&A or PE due diligence context |
| Expert Call Guide | [`expert-call-guide.md`](expert-call-guide.md) | A scheduled expert-network call (GLG, Third Bridge, Tegus, AlphaSights, or equivalent) requires a structured discussion guide |
| Credit Agreement Summary | [`credit-agreement-summary.md`](credit-agreement-summary.md) | A credit agreement requires distillation for a partner-level audience before a client call |
| Pre-IC Consistency Review | [`pre-ic-consistency-review.md`](pre-ic-consistency-review.md) | Multiple existing deal documents need consistency and term review before an investment committee (audience-adaptive) |
| Meeting & Roadshow Minutes | [`meeting-minutes.md`](meeting-minutes.md) | A meeting, roadshow, or call recording/transcript needs structuring into minutes with verified quotes (audience-adaptive; full specialist governance) |

For substantive work, read the selected [task checks](../../task-checks.md) and shared [evidence guidance](../../../completion-evidence.md). Apply task-relevant intake, source, calculation, file and semantic checks using actual tools or reviewers. Explain missing evidence or required review without inventing a passed label. User-requested scope and formats override suggested deliverables.

# Market & Industry Research

Apply [request and delivery priority](../../../output-contracts.md#request-priority) and the [source policy](../../../data-source-policy.md) before task defaults. Provider names, section/page counts, output media, modeling layouts and intake questions in a Playbook are defaults: preserve explicit user choices and answers already supplied. Do not turn a failed lookup into an entity classification or an unsupported estimate into a required number. Accounting identities, truthful evidence, confidentiality and transaction boundaries still apply. For linked models and returns, use the [shared reconciliation rules](../../../metric-dictionary.md#model-reconciliation-and-attribution).

Playbooks for understanding markets: industry primers, market sizing (TAM/SAM/SOM), competitive landscape mapping, and sector news tracking. These produce research reports (Markdown primary); load `formats/excel_standards.md` only if the user wants an Excel sizing model.

## Shared Research Protocol

Unless a task specifies a stricter rule:

- Establish the product/service scope, buyer universe, geography, and applicable as-of date before building. Apply each task's gates, and rebuild when a material boundary changes.
- Date and trace material external claims, figures, and assumptions. Use the task-specific citation, source-log, confidence, and freshness requirements; disclose material uncertainty rather than implying unsupported precision.
- Identify public versus private entities where relevant. Do not infer unverified data; each task's explicit `NA`, range, or other treatment controls.
- The selected task defines its required deliverable structure and any format dependency.

## Contents

| Task | File | Use when |
|---|---|---|
| Industry Primer | [`industry-primer.md`](industry-primer.md) | A user needs a trends-driven synthesis of a sector or sub-sector, drawing on recent broker research, thematic reports, and earnings commentary |
| Top-Down TAM Sizing | [`tam-top-down.md`](tam-top-down.md) | The buyer universe is too broad to enumerate individually, or the engagement requires a defensible TAM/SAM/SOM for an IC memo, sell-side pitch, CIM industry section, S-1 opportunity page, board/fundraising deck, investment screen, or commercial due diligence. |
| Bottom-Up TAM Sizing | [`tam-bottom-up.md`](tam-bottom-up.md) | You need a defensible, auditable TAM/SAM/SOM build for a SaaS or tech-services business where the buyer universe can be enumerated |
| Market Map | [`market-map.md`](market-map.md) | A client or internal team needs a structured visual map of all meaningful players in a defined market, organized by a single analytical axis |

For substantive work, read the selected [task checks](../../task-checks.md) and shared [evidence guidance](../../../completion-evidence.md). Apply task-relevant intake, source, calculation, file and semantic checks using actual tools or reviewers. Explain missing evidence or required review without inventing a passed label. User-requested scope and formats override suggested deliverables.

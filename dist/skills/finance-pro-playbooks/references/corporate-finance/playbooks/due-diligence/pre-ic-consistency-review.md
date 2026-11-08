# Pre-IC Consistency Review

> **Sections**: Audience Adaptation · Input Contract · Workflow · Pre-Delivery Checks · Handoffs
> **Must not skip**: Pre-Delivery Checks — return here before delivery.
> **Formats**: document_standards.md

> Task `pre-ic-consistency-review` in group `due-diligence`. Read [`_overview.md`](_overview.md) first for group-level scope and shared operating principles.

**Use when**: Existing deal documents require a cross-document terms and consistency review before Investment Committee submission.  
**Deliverable**: An audience-adaptive discrepancies table and review comments with source evidence and severity-ranked corrections.

## Audience Adaptation

Use a brief review for a quick internal check; use the full version table and evidence discipline for formal IC materials.

## Input Contract

| Field | Requirement | Description |
|---|---|---|
| `subject` | Required | Project or transaction name |
| `source_files` | Required | IC documents, term lists, models, and presentations under review |
| `as_of` | Optional | Document cut-off date |

## Workflow

1. Inventory files, versions, dates, and their authority hierarchy.
2. Extract key parameters and terms; align entities and definitions using [`metric-dictionary.md`](../../../metric-dictionary.md).
3. Identify conflicts in figures, definitions, timing, parties, rights, obligations, and classifications; retain page or paragraph evidence.
4. Apply SPPI or comparable classification checks where relevant without substituting for legal or accounting advice.
5. Report severity-ranked discrepancies, impacts, and recommended corrections; leave unresolved conflicts as queries rather than selecting a version silently.

## Pre-Delivery Checks

- Every source document has a name, date, and version in the inventory.
- Each discrepancy has a precise evidence location; unsupported issues are labelled as queries.
- Terms and figures use a consistent entity, period, and definition.
- The review does not substitute for legal or accounting opinions.
## Handoffs

- Escalate substantive information gaps to `vdr-gap-analysis` or `dd-request-list`.
- Send model fixes to the financial-models `model-audit` workflow.


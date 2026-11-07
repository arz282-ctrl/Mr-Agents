# Deal Screening Scorecard

> **Sections**: Audience Adaptation · Input Covenant · Workflow · Quality Gates · Pre-Delivery Checks · Handoffs
> **Must not skip**: Pre-Delivery Checks — return here before delivery.
> **Formats**: document_standards.md

> Task `deal-screening-scorecard` in group `deal-materials`. Read [`_overview.md`](_overview.md) first for group-level scope, shared defaults, and format dependencies.

**Use when**: Screening user-provided equity, debt, M&A, or LP opportunity materials for an initial pass/hold/reject assessment | **Deliverable**: Evidence-bound screening report, red-flag checklist, and next-step diligence questions

This task evaluates existing deal documents, pitch decks, and opportunity lists. It does not create unverified underlying financial conclusions.

## Audience Adaptation

Adapt depth and presentation to the user's audience and requested detail. Individual LP, family-office and founder requests may use a concise scorecard. Apply relevant source, scoring, confidentiality and delivery checks from SKILL.md and the selected written checklist.

## Input Covenant

| Field | Requirement | Notes |
|---|---|---|
| `subject` | Required | Company, asset, or project name |
| `source_files` | Required; may be sensitive | Deal documents, pitch decks, opportunity lists; when `confidential_material` triggers, load [`privacy-security.md`](../../../privacy-security.md) |
| `screening_criteria` | Required | Thresholds, weights, vetoes, evidence requirements; if missing, use [`scoring-standard.md`](../../../scoring-standard.md) and record the assumption |
| `as_of` | Optional | Data/file cutoff date |

## Workflow
1. Extract overview, asset type, amount, stage, key terms, and decision deadlines.
2. Apply [`scoring-standard.md`](../../../scoring-standard.md): hard vetoes first, then weighted scoring.
3. Bind every score to an evidence location and distinguish fact, management statement, and analytical assumption.
4. Produce pass/hold/reject, red flags, gaps, and next-step diligence questions.

## Quality Gates

| Gate | Pass criterion | Failure handling |
|---|---|---|
| Source Traceable | Key facts locate to document/public source | Flag unverified; exclude from conclusion |
| Versioning Clear | Documents have name, date, version | Build version table first |
| Scoring Explainable | Weights, thresholds, evidence, and vetoes complete | Do not give final rating |

## Pre-Delivery Checks
- Every conclusion has traceable evidence or an explicit unverified/gap status.
- Hard vetoes are evaluated before weighted scores; criteria, weights, and assumptions are visible.
- Each source document has a version record, and the report states pass/hold/reject with red flags and next steps.

## Handoffs

- After a passed initial screen: `dd-request-list` → `vdr-gap-analysis`.
- For a business-quality deep assessment: `business-quality-scorecard`.
- Identify this work as `deal-screening-scorecard` in task notes and follow [corporate-finance.md](../../../corporate-finance.md); no serialized task record is required.

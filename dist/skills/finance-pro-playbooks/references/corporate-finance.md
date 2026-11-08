# Corporate Finance Specialty Plugin

Read this file for industry research, company deliverables, valuation and financial models, LBO and returns work, transaction due diligence, or IB/PE/VC/CorpDev materials. The shared Skill references define routing, data, privacy, transaction boundaries and delivery checks.

## Responsibility and Dependencies

Own the final corporate-finance work product. Do not take over fund selection, personal portfolio construction, options, crypto, formal backtesting, or transaction execution. Use the paths resolved by [`module-catalog.json`](module-catalog.json) and [`corporate-finance/task-catalog.json`](corporate-finance/task-catalog.json); load each dependency once. Shared references override task Playbooks for data, metrics, privacy, execution safety, and output contracts.

## Startup Workflow

1. Create and reuse an Entity Card for each named company or fund.
2. Select valid `task_id` values from the task catalog; never invent task IDs.
3. Ask only when missing scope, assumptions, confidentiality, or audience would materially change the work.
4. Set reference date, fiscal periods, currency, units, and accounting basis.
5. Load only each selected task's group `_overview.md`, task Playbook, and requested-format standards.
6. Execute tasks in dependency order and run every task's Pre-Delivery Checks.
7. Produce only authorized deliverables, identify their final saved versions and check actual files.
8. Apply the global delivery and evidence standards in `SKILL.md` using appropriate tools and reviewers.

## Entity Card

Record the relevant Entity Card fields below before the first entity-specific data pull; this is a working-note example, not a mandatory serialized form. Known legal name and currency are required for complete entity-specific specialist work; leave optional unknown fields null. The aliases array contains common names; industry stores the classification, valuation_date the reference date, and currency the reporting currency. Do not manufacture required inputs; unresolved required identity/currency means the corporate result is provisional or insufficient_data. Standalone `market-research` tasks need a defined market, geography and period scope, but do not require an invented company legal name; record that scope in the working notes and relevant task content. Any named-company analysis still resolves that entity.

```yaml
legal_name: string | null  # required for entity-specific tasks; null is valid for standalone market research
aliases: []
ticker: null
exchange: null
country: null
industry: null
currency: string | null  # null requires provisional/insufficient_data
fiscal_year_end: null
fiscal_year_end_month: null
listing_status: public | private | delisted | pre_ipo | null
reporting_unit: null
reporting_standard: GAAP | IFRS | local | mixed | unknown
period_basis: FY | LTM | NTM | quarterly | mixed | unknown
valuation_date: null
transaction_context: null
```

The Entity Card anchors identity and periods; it does not replace source records, facts or assumption notes. Verify IPO, S-1, F-1, and listing-status claims in regulatory filings.

## Task Groups

| Group | Typical work | Overview |
|---|---|---|
| `market-research` | Industry primer, TAM, market map | [`corporate-finance/playbooks/market-research/_overview.md`](corporate-finance/playbooks/market-research/_overview.md) |
| `company-analysis` | Earnings, PIB, adverse media, screening, AI disruption | [`corporate-finance/playbooks/company-analysis/_overview.md`](corporate-finance/playbooks/company-analysis/_overview.md) |
| `valuation` | DCF, public comps, precedents, SOTP, FDSO | [`corporate-finance/playbooks/valuation/_overview.md`](corporate-finance/playbooks/valuation/_overview.md) |
| `financial-models` | Three-statement, merger, synergies, IPO, model audit/edit | [`corporate-finance/playbooks/financial-models/_overview.md`](corporate-finance/playbooks/financial-models/_overview.md) |
| `lbo-structuring` | LBO, debt, S&U, structured equity, earnout, bolt-on, recap, sale-leaseback | [`corporate-finance/playbooks/lbo-structuring/_overview.md`](corporate-finance/playbooks/lbo-structuring/_overview.md) |
| `returns-analysis` | IRR attribution, value creation, waterfall, MIP | [`corporate-finance/playbooks/returns-analysis/_overview.md`](corporate-finance/playbooks/returns-analysis/_overview.md) |
| `due-diligence` | DRL, tracker, VDR, QoE, revenue/customer, interviews, credit, Pre-IC, minutes | [`corporate-finance/playbooks/due-diligence/_overview.md`](corporate-finance/playbooks/due-diligence/_overview.md) |
| `deal-materials` | Teaser, CIM, buyer/cross-holder lists, coverage, scorecards, ECM/research packs | [`corporate-finance/playbooks/deal-materials/_overview.md`](corporate-finance/playbooks/deal-materials/_overview.md) |

The task catalog is the complete authority for labels, patterns, Playbook paths, format dependencies, and attachment types. For multiple tasks, deduplicate files and never load an entire group.

## Format Resources

Load only when needed:

- Excel workbooks: [`corporate-finance/formats/excel_standards.md`](corporate-finance/formats/excel_standards.md)
- Word, PPT, Teaser, CIM, and structured documents: [`corporate-finance/formats/document_standards.md`](corporate-finance/formats/document_standards.md)
- Corporate-finance endpoint naming traps: [`corporate-finance/formats/metric_disambiguation.md`](corporate-finance/formats/metric_disambiguation.md)

[`metric-dictionary.md`](metric-dictionary.md) remains the Skill's sole **default** formula and convention authority; explicit user definitions take precedence with clear user-defined labeling and reproducible inputs. The disambiguation appendix only explains source-field pitfalls. Rebuild Adjusted, Covenant, and Pro Forma metrics from original disclosures when using them as validated model inputs; a specifically requested vendor field may instead be quoted as vendor-defined and unverified against the reconciliation.

## Multi-Task Orchestration

List task IDs first, then execute in data-dependency order:

```text
Entity Card
  → market/company research
  → financial model
  → valuation
  → transaction structure / returns
  → diligence synthesis
  → deal or IC materials
```

Each task owns only its outputs. Downstream tasks may reference upstream facts, assumptions, and artifacts but must not silently change them. Version any changed assumption and state its impact.

## Corporate-Finance-Specific Rules

Apply global Data Rules from `SKILL.md` and the full [`data-source-policy.md`](data-source-policy.md), plus these increments:

- Map every pull to the Entity Card's reference date and fiscal year end.
- State the quarter underlying LTM; deal-comparable LTM must predate announcement.
- Rebuild Adjusted EBITDA, OIBDA, covenant metrics, and company KPIs from original disclosures before they enter a model as independently validated financial facts; preserve and label a user-requested vendor field or user-supplied scenario separately.
- Use Yahoo Finance only through available approved read-only operations as a secondary source; never as authority for statements, capital structure, transaction terms, adjusted metrics, legal conclusions, or diligence evidence.
- Keep historical screens point-in-time; hand formal strategy backtesting to `quant-backtesting`.
- Keep every hard-coded model input and material attachment value traceable to a source.

## Assumptions and Defaults

Apply a Playbook default silently only where the user has not supplied the relevant source, metric basis, parameter or method and the default does not change task boundaries; record it in the assumption record. Ask first only for an **unresolved** choice that changes valuation or returns, transaction/capital structure, buyer universe, confidentiality/anonymization, publication scope, or a user-provided model base; do not re-ask a choice the user already made.

## Delivery Requirements

Identify the selected tasks and their outputs, relevant entity or market scope, model checks, review scope and limitations. Material facts, metrics, assumptions and risks stay traceable across research, models and materials. Follow [output-contracts.md](output-contracts.md); check real delivered files and retain only task-relevant working records. Do not force a Markdown companion or Playbook layout when the user selects another format.

## Quality Gates

- Every task ID exists in the catalog and every selected task has a result.
- Entity, period, currency, unit, and accounting bases are unambiguous.
- Hard-coded facts and values trace to declared sources.
- Formulas, links, identities, sensitivities, and task-specific checks pass.
- Confidentiality, anonymization, filenames, metadata, and publication authorization are correct.
- Applied defaults appear in the assumption record.
- Applicable analytical and file checks were actually performed; every delivered file exists and opens in the requested format.

## Scope Boundary

Do not handle real transaction execution, private banking, personal tax, bookkeeping, insurance, legal disputes, or real-estate underwriting. Retain support for valid corporate-finance portions of mixed requests and route other portions to the appropriate module without expanding this plugin's authority.

For a pure concept explanation requested as a file, answer the concept and check that actual file. Do not invent a company, financial model task or model checks when the user requested none.

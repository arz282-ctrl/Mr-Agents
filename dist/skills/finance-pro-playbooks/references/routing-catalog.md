# Finance Request Routing Guide

Read this file only when module selection is ambiguous or a multi-module chain is needed. [`module-catalog.json`](module-catalog.json) and [`corporate-finance/task-catalog.json`](corporate-finance/task-catalog.json) define the directory paths, default priorities and dependencies. Read the full request to select tasks; catalog patterns are non-exhaustive discovery hints. Keep the summary below consistent with those catalogs when updating the Skill.

## Catalog-Derived Module Summary

| Module | Final-owner priority | Domain guide | Required shared references |
|---|---:|---|---|
| `equity-research` | 8 | [`references/equity-research.md`](../references/equity-research.md) | output-contracts.md |
| `fund-etf` | 7 | [`references/fund-etf.md`](../references/fund-etf.md) | output-contracts.md |
| `crypto-analysis` | 6 | [`references/crypto-analysis.md`](../references/crypto-analysis.md) | output-contracts.md |
| `options-strategy` | 4 | [`references/options-strategy.md`](../references/options-strategy.md) | output-contracts.md |
| `corporate-finance` | 5 | [`references/corporate-finance.md`](../references/corporate-finance.md) | output-contracts.md |
| `quant-backtesting` | 3 | [`references/quant-backtesting.md`](../references/quant-backtesting.md) | output-contracts.md |
| `portfolio-management` | 2 | [`references/portfolio-management.md`](../references/portfolio-management.md) | output-contracts.md |
| `trade-planning` | 1 | [`references/trade-planning.md`](../references/trade-planning.md) | output-contracts.md |

## Catalog-Derived Corporate-Finance Groups

| Group | Tasks | Overview |
|---|---:|---|
| `company-analysis` | 5 | [`corporate-finance/playbooks/company-analysis/_overview.md`](corporate-finance/playbooks/company-analysis/_overview.md) |
| `deal-materials` | 10 | [`corporate-finance/playbooks/deal-materials/_overview.md`](corporate-finance/playbooks/deal-materials/_overview.md) |
| `due-diligence` | 12 | [`corporate-finance/playbooks/due-diligence/_overview.md`](corporate-finance/playbooks/due-diligence/_overview.md) |
| `financial-models` | 6 | [`corporate-finance/playbooks/financial-models/_overview.md`](corporate-finance/playbooks/financial-models/_overview.md) |
| `lbo-structuring` | 8 | [`corporate-finance/playbooks/lbo-structuring/_overview.md`](corporate-finance/playbooks/lbo-structuring/_overview.md) |
| `market-research` | 4 | [`corporate-finance/playbooks/market-research/_overview.md`](corporate-finance/playbooks/market-research/_overview.md) |
| `returns-analysis` | 4 | [`corporate-finance/playbooks/returns-analysis/_overview.md`](corporate-finance/playbooks/returns-analysis/_overview.md) |
| `valuation` | 5 | [`corporate-finance/playbooks/valuation/_overview.md`](corporate-finance/playbooks/valuation/_overview.md) |


## Routing Output

Identify the responsible final module, needed upstream work, selected corporate-finance tasks, reference paths, material risks, missing inputs and assumptions in working notes. No routing output object is required. Dependencies support the final deliverable without becoming additional deliverables by default.

## High-Frequency Ambiguities

| User request | Determination rule |
|---|---|
| Analyze a stock and tell me how much to buy | `equity-research → portfolio-management`; portfolio management owns the final sizing decision |
| Compare ETFs and add one to my portfolio | `fund-etf → portfolio-management` |
| How should I buy a stock now? | Research-only valuation goes to `equity-research`; concrete entry/order planning goes to `trade-planning`; ask only if the desired output is unclear |
| Do a valuation for a company | Investment range: `equity-research`; specialist DCF/Comps/SOTP model or workbook: `corporate-finance` |
| Create a company presentation | New institutional material: `corporate-finance`; add research upstream when new conclusions are required; existing-material review uses the matching materials-review task |
| Draft an IC memo | `corporate-finance`; complete required research, valuation, diligence, and structure tasks upstream |
| Evaluate a project | Public security: `equity-research`; institutional deal screening/modeling/diligence: `corporate-finance`; real estate is out of scope |
| Analyze whether to roll an option | `options-strategy`; add `trade-planning` only for a concrete manual roll plan |
| Backtest my portfolio | `quant-backtesting`; add `portfolio-management` only for current portfolio diagnostics |
| Create and send a Teaser | Creation: `corporate-finance`; sending is a non-trading external action requiring confirmation |
| Analyze latest earnings | Ordinary investment interpretation: `equity-research`; institutional quick note/memo/PPT: corporate-finance task `earnings-update` |
| Prepare an expert call guide | Corporate-finance task `expert-call-guide`; company research remains upstream |
| Bare “call”, “options”, or “portfolio” in non-finance context | Do not activate finance modules without explicit derivative, investment, or security context |

## Corporate-Finance Task Selection

After `corporate-finance` is selected, match task patterns from the task catalog. Select multiple tasks only when the requested deliverable genuinely requires them; otherwise keep incidental matches as upstream analysis. Follow each task's `final_owner`, `requires_research_upstream`, `playbook`, `playbook_overview`, and format fields.

Use this dependency order:

```text
Entity Card
  → market/company research
  → financial models
  → valuation
  → LBO structure / returns
  → due diligence
  → deal or IC materials
```

Transaction redirection always takes precedence over another task's final owner.

## Limited-Support Assets

FX, futures, and commodities have no dedicated analysis module. Follow `module-catalog.json#limited_support`:

- backtest or optimization → `quant-backtesting`;
- concrete trade/order request → `trade-planning` manual plan only;
- multi-asset allocation → `portfolio-management`;
- pure analysis → limited-support result, explicit limitation, confidence no higher than medium.

## Clarifications

Ask only when an answer changes the primary module, safety path, valuation basis, capital structure, TAM boundary, buyer criteria, confidentiality/anonymization, or final deliverable. Never ask whether the user wants this SKILL to execute a transaction; it cannot.

## Applicability and Delivery

Assess the requested action before matching financial nouns. Return not_applicable for mechanical-only/non-finance work; partial for separable mixed requests. Negated actions do not trigger a module or excluded-capability exit. Patterns are hints; assess positive and negative actions, subject roles and compound requests from their full meaning.

Select direct for narrow lookups/concepts, analysis for substantive finance work, and artifact only for requested/necessary files. Never let task defaults choose an extra medium. Identify actual format, audience, privacy and external intent; use module-catalog.json.review_scope to choose proportionate checks. Order upstream work by actual dependencies and catalog guidance, with the final owner downstream. Assess prerequisites using selected tasks or usable existing inputs, without adding unrequested work.

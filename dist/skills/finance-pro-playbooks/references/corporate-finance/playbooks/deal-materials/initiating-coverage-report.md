# Initiating Coverage Report

> **Sections**: Ask First · Workflow · Defaults (apply silently, disclose at delivery) · Rules & Pitfalls · Pre-Delivery Checks · Scope Boundaries
> **Must not skip**: Rules & Pitfalls · Pre-Delivery Checks · Scope Boundaries — return here before delivery.
> **Formats**: document_standards.md

> Task `initiating-coverage-report` in group `deal-materials`. Read [`_overview.md`](_overview.md) first for group-level scope, shared defaults, and format dependencies.

**Use when**: Drafting a sell-side initiation-of-coverage report on a new ticker | **Deliverable**: Scaffold document (docx / pdf / pptx) with 14 fixed sections; analyst supplies rating, price target, and investment thesis. Follow any user-specified page count or precedent template; otherwise size the report to the selected depth and available evidence rather than a fixed page range.

---

## Ask First
1. Is there a precedent initiation report to mirror for layout and tone?
2. Which depth: **launch note**, **standard** (default), **comprehensive**, or a user-defined scope? Follow any supplied page count or template; otherwise size the report to the evidence and required depth rather than a fixed page range.
3. Is a financial model being uploaded? (If yes, all figures pull from the model; none are self-generated.)
4. What is the analyst's preliminary rating, 12-month price target, and core thesis points? (Leave as flagged placeholders if not yet confirmed — never fabricate.)

---

## Workflow

1. **Confirm intake** — lock format, precedent template, and model availability before building any section. (Order matters: formatting choices govern all subsequent layout decisions.)

2. **Build the cover / executive summary** — populate one-sentence lede in the form: `[Company], [Ticker] | [Rating] | 12-month PT: $[X] ([Method]) | Current: $[Y] | [±Z%]`. Place numbered thesis bullets directly on cover; cover must be self-contained (rating, PT, thesis, key reasoning — all readable without turning a page).

3. **Draft the Investment Thesis section** — state the primary variant view in ≤3 numbered points; these exact points must recur verbatim in the cover and the Investment Positives section (three-point consistency check).

4. **Build Investment Positives (deep-dives)** — each positive must add at least one of: new data, new chart, deeper causal mechanism, or competitor / historical comparison. Never restate thesis language without incremental substance.

5. **Draft Key Debates section** — source from recent earnings Q&A, short-seller reports, and 10-K risk factors. Format each debate as: *question-style header → 1–2 sentence bear case → 2–3 sentence data-backed rebuttal*. Every bear argument must be directly confronted, not sidestepped.

6. **Write Company Overview and Industry & TAM** — cite every external data point (TAM size, market share, regulatory facts, competitor multiples) with source name and as-of date. Tier-1 sources (10-K, regulatory filings, CapIQ / FactSet / Bloomberg) take priority; Tier-2 sources acceptable only if named and dated.

7. **Build Competitive Positioning** — use competitor sell-side notes for bear-case context only; never cite or quote them as sources.

8. **Construct Financial Forecasts** — decompose revenue growth into volume × price × mix (or segment-by-segment); never use a single blended growth rate. All assumptions must be named and explicit; no hard-coded growth rates embedded in formulas. Flag any figure pulled from an uploaded model as pending analyst verification.

9. **Build House vs. Consensus table** — compare your estimates to consensus on all key line items; flag meaningful divergences as thesis drivers.

10. **Build Valuation section** — select one primary method to anchor the PT, supported by secondary methods as cross-checks. State explicitly: *"PT anchored to [Year]E [Metric] at [X]x, validated by DCF and precedent transactions."* Produce a **football field** chart showing all methods. If primary and secondary methods diverge by >~30%, write a reconciliation paragraph.

11. **Build Bull / Base / Bear scenarios** — differentiate each scenario by operating assumptions (revenue growth, margin, industry KPI), not by terminal value multiples alone. Each scenario must include one sentence stating *"what the investor is betting on."* Confirm that **cover PT = base-case PT**; if they diverge, re-anchor before delivery.

12. **Write Catalysts section** — list only externally visible events with a named expected date (e.g., "Q3 earnings release, est. [Month Year]"). This section answers: *"When will the market know?"*

13. **Write Risks section** — quantify each risk (downside PT, sensitivity range, or threshold). Map bear-scenario outcomes to specifically named High-Impact risks. Include 2–3 explicit data points that would trigger a rating downgrade ("What would change our view").

14. **Draft Management & Governance section** — include real biographical detail and at least one concrete, named performance achievement per executive (flag any generic language for analyst replacement). Assess compensation alignment: flag any mismatch between incentive structure and thesis driver (e.g., comp tied to revenue when thesis depends on margin expansion). Flag board independence issues, chairman structure, and any governance red flags.

15. **Build Appendix** — include comp table (labeled NTM or LTM, never mixed), detailed model outputs, source list.

16. **Run sanity checks** (see Pre-Delivery Checks below).

---

### Section Map (14 Fixed Sections — order is invariant)

| # | Section |
|---|---------|
| 1 | Cover / Executive Summary |
| 2 | Investment Thesis |
| 3 | Investment Positives |
| 4 | Key Debates |
| 5 | Company Overview |
| 6 | Industry & TAM |
| 7 | Competitive Positioning |
| 8 | Financial Forecasts |
| 9 | House vs. Consensus |
| 10 | Valuation |
| 11 | Bull / Base / Bear Scenarios |
| 12 | Catalysts |
| 13 | Risks |
| 14 | Management & Governance |
| + | Appendix |

### Forecast, Valuation, and Scenario Control

Treat the report as an **analyst-owned scaffold**, not a substitute for the signed rating, price target, or variant view. Where the analyst has not supplied a judgment, retain a flagged placeholder rather than inferring an opinion. The cover must then make the analytical chain readable in one place: current price, stated rating, 12-month PT, method, implied return, the numbered thesis, and the key conditions required for that thesis.

Build forecasts from the operating mechanisms that matter to the company. The required volume × price × mix bridge may be expressed by segment when that is how the company reports, but it may not be replaced with an unexplained consolidated growth plug. Link each driver to a disclosed historical actual, management guidance, explicit analyst assumption, or uploaded-model reference. Distinguish actual, estimate, and forecast periods consistently; a forecast must not silently overwrite a reported period or an explicit management-model output.

The valuation section needs an explicit hierarchy. Select a single primary method that determines the PT and state the valuation year, metric, and multiple; use DCF, precedent transactions, and other appropriate methods as cross-checks rather than blending outputs without accountability. A football field communicates range, not a rationale: explain a >~30% gap between the primary and secondary methods, identify whether the disagreement comes from the earnings base, multiple, discount rate, or terminal assumptions, and make the cover/base-case PT tie exactly.

Scenarios change operating evidence before they change valuation. For each Bull/Base/Bear case, state the revenue driver, margin or cash-conversion assumption, and relevant industry KPI, then specify what the investor is betting on. The Bear case must connect to named High-Impact risks and its downside PT/sensitivity; the Base case is the cover case. Milestones are internal operating objectives, while Catalysts are external, dated events that allow the market to observe a change in view. Keep them separate.

Accounting and multiple definitions are controlled across the full report. Disclose the EBITDA basis on first use and apply the same definition—including the treatment of adjustments and SBC where relevant—on the cover, financials, valuation, and comps. Label comp periods NTM or LTM without mixing them within a comparison. For unprofitable companies, make P/E and EV/EBITDA `NM`, choose sector-appropriate alternatives, and surface the earnings inflection year and cumulative cash consumption instead of obscuring them in the appendix.

---

## Defaults (apply silently, disclose at delivery)

| Parameter | Default | Rationale |
|-----------|---------|-----------|
| Price target horizon | 12 months | Sell-side convention; 3- or 5-year only if analyst explicitly requests |
| Report depth | Standard, with no fixed page count | Balance depth and readability; user instructions and precedent templates govern length |
| Primary valuation method | One explicit anchor method + secondary cross-checks | Prevents blended PT that obscures analytical view |
| Scenario differentiation | Operating assumptions (growth, margin, KPI) | Price-only differentiation is not analytically meaningful |
| Forecasts | Named, explicit assumptions only | Hard-coded rates are unauditable and uncreditable |
| Revenue decomposition | Volume × price × mix (or by segment) | Single blended rate masks the thesis driver |
| External data citation | Source name + as-of date on every data point | Enables verification; absence is a compliance and credibility risk |
| Tone | Analytical, not promotional | Sell-side credibility depends on objectivity signaling |
| EBITDA definition | Company-reported figures (before adjustment) | Consistency across cover, financials, multiples, and comp table is required; definition must be disclosed |
| WACC | Derived from capital structure; never hard-coded | Hard-coded WACC is unauditable; flag any result <6% or >14% |
| Terminal growth rate cap | ≤3% (GDP ceiling) unless explicit rationale provided | Growth above long-run GDP is not sustainable by definition |
| Comp table multiples | As-of date labeled; NTM and LTM never mixed | Mixing conventions produces meaningless cross-company comparisons |
| Price staleness threshold | Re-pull any price >7 days old | Stale prices corrupt implied upside/downside and rating consistency |
| Consensus update cadence | Refreshed every quarter and after each earnings event | Consensus drift is the single most common source of House vs. Consensus error |
| Unprofitable company multiples | P/E and EV/EBITDA labeled NM; industry-appropriate substitute multiples added | Presenting NM without substitutes leaves valuation section incomplete |
| Missing data | Flagged placeholder inserted | Never fabricate; analyst fills all judgment-dependent gaps |

---

## Rules & Pitfalls

**Never:**
- **Never fabricate a rating, price target, thesis point, or data point** — these are the analyst's signed professional judgments; AI-generated opinions breach the fundamental integrity of research authorship.
- **Never present a blended price target without identifying the primary anchor method** — blending obscures the analytical view and prevents reviewers from stress-testing the key assumption.
- **Never use a single blended growth rate in forecasts** — it hides the volume/price/mix driver that is typically the core of the variant thesis.
- **Never mix NTM and LTM multiples in the same comp table or football field** — the comparison becomes arithmetically meaningless and is immediately spotted by institutional readers.
- **Never use unquantified superlatives** ("best-in-class," "industry-leading," "transformational") — replace with the specific metric and data point, or delete; unsupported superlatives are the fastest credibility signal that a report is promotional rather than analytical.
- **Never use a price more than 7 days old** without re-pulling — stale prices corrupt implied return calculations and can misstate the rating's implied upside.
- **Never hard-code WACC** — derive it from the actual capital structure; flag outputs below 6% or above 14% for analyst review.
- **Never cite a competitor's sell-side research note as a source** — use it only to understand the bear case; quoting it creates attribution, independence, and compliance issues.
- **Never let cover PT diverge from base-case scenario PT** — the disconnect signals an internal inconsistency that will surface immediately in client Q&A.

**Conditional:**
- **If primary and secondary valuation methods diverge by more than ~30%, write a reconciliation paragraph** before delivery — do not let the football field carry an unexplained gap.
- **If the company is unprofitable**, label P/E and EV/EBITDA as NM, add sector-appropriate substitute multiples (SaaS: EV/ARR, EV/Revenue; early-stage: EV/Gross Profit; biotech: rNPV or pipeline sum), and surface the earnings inflection year and cumulative cash consumption in the cover summary and forecast section — do not bury them in the body.
- **If compensation structure is misaligned with the thesis driver** (e.g., executive pay indexed to revenue while the thesis depends on margin expansion), flag the mismatch explicitly in the Management section — do not omit.
- **If any governance red flag is present** (board independence deficit, combined chairman/CEO without explanation, related-party transactions), flag it in the Management section — do not sanitize.
- **If an uploaded financial model is provided**, pull all figures from the model and flag each as pending analyst verification — never self-generate figures that conflict with or bypass the model.
- **If a Tier-2 external data source is used** (industry reports, company presentations, press releases), it is acceptable only if the source is named and dated; Tier-1 sources (10-K, regulatory filings, CapIQ / FactSet / Bloomberg) must be exhausted first.
- **If a terminal growth rate above 3% is used**, provide explicit written justification — GDP-ceiling exceptions require a named structural reason (e.g., secular category expansion with documented precedent).

**Judgment:**
- **Treat this document as a scaffold for the analyst to edit, not a finished product** — the analyst owns every judgment call; the scaffold enforces structure, completeness, and internal consistency.
- **Distinguish Milestones from Catalysts rigorously**: Milestones are internal company KPIs ("maintain NRR >120%") answering *"what must the company achieve"*; Catalysts are externally dated events ("Q3 earnings release") answering *"when will the market know."* They belong in different sections and must never be conflated — conflation is a common tell of less-experienced research.
- **"Optionality" is not a standalone thesis point** — balance sheet strength, M&A capacity, or strategic flexibility must be bound to a specific executable action (named acquisition target, named capacity investment, explicit capital return program) or converted to that action; free-floating optionality language should be cut.
- **Each Investment Positive deep-dive must add incremental substance** — new data, new chart, a deeper causal mechanism, or a competitor/historical comparison. Restating the thesis bullet with different wording fails the institutional standard.
- **Prefer EBITDA definition consistency over convenience** — disclose the definition (reported vs. adjusted; SBC treatment) on first use and apply it identically across the cover, financial tables, multiples, and comp table throughout the document.
- **Apply sector-specific KPIs as the primary operating metrics** — SaaS: ARR, NRR, Rule of 40; Banks: NII, NIM, efficiency ratio (do not apply EBITDA to banks); REITs: FFO, AFFO, NAV; Consumer: same-store sales, AUV, four-wall EBITDA. Using generic metrics in a sector-specific context signals analytical unfamiliarity.

---

## Pre-Delivery Checks

- **Verify** any user-specified page count or precedent template is followed; otherwise confirm the report is sized to the selected depth and available evidence, with no empty, duplicative, or padded sections.
- **Verify** cover implied return = (PT − current price) / current price; confirm sign and magnitude are correct.
- **Verify** rating language is consistent with implied return (Buy conventionally implies >10% upside; adjust or flag any mismatch).
- **Verify** cover PT equals base-case scenario PT exactly; if not, re-anchor before delivery.
- **Verify** primary and secondary valuation methods do not diverge by more than ~30%; if they do, confirm reconciliation paragraph is present and complete.
- **Verify** bull and bear scenarios are differentiated by operating assumptions (growth rate, margin, industry KPI) — not only by terminal value multiple.
- **Verify** bear scenario outcomes map to specifically named High-Impact risks in the Risks section.
- **Verify** every numbered thesis point appears with consistent wording in three locations: cover, Investment Thesis section, and Investment Positives section.
- **Verify** every external data claim (TAM, market share, competitor multiple, regulatory fact) carries a named source and as-of date, or a flagged placeholder.
- **Verify** historical actuals match the most recent 10-K / 10-Q filing.
- **Verify** all comp table multiples are labeled NTM or LTM and that NTM and LTM multiples are never mixed in the same column or comparison.
- **Verify** all stock prices and consensus estimates are no older than 7 days; re-pull if stale.
- **Verify** all Catalysts entries carry a named expected date.
- **Verify** each Management entry includes tenure and at least one specific, named performance achievement; flag any generic biographical language for analyst replacement.
- **Verify** all 14 canonical sections are present; flag any missing section before delivery.
- **Verify** any company with material working capital has DSO / DPO / DIO table present; flag if absent.
- **Verify** EBITDA definition is disclosed and applied identically across cover, financials, multiples table, and comp table.
- **Verify** WACC is derived from capital structure; flag if output is below 6% or above 14%.
- **Verify** terminal growth rate is ≤3% or carries written justification.
- **Verify** unprofitable company sections label P/E and EV/EBITDA as NM and include sector-appropriate substitute multiples.
- **Verify** earnings inflection year and cumulative cash consumption appear in the cover summary and forecast section (for unprofitable companies), not only in body text.
- **Verify** milestone descriptions in scenario narratives are numerically consistent with the corresponding model outputs for that scenario.
- **Verify** all figures sourced from an uploaded model are flagged as pending analyst verification.

---

## Scope Boundaries

**Initiation Report Analysis** handles reading and summarizing a third party's existing initiation — use that playbook when the task is to extract, critique, or reformat someone else's research rather than author original coverage.
**Earnings Update** handles the quarterly results flash note — use that playbook for post-print estimate revisions, EPS beat/miss commentary, and guidance changes on a ticker already under coverage.
Valuation sub-tasks (comps build, DCF build, precedent transactions) are constructed inline as part of this workflow's Valuation section; if a standalone valuation deliverable is required independently of an initiation, use the dedicated Comps, DCF, or Precedent Transactions playbooks.

---


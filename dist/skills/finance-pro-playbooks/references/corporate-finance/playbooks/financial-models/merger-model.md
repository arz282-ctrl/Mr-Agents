# Merger Model (Accretion/Dilution)

> **Sections**: Ask First · Workflow · Defaults (apply silently, disclose at delivery) · Rules & Pitfalls · Pre-Delivery Checks · Scope Boundaries
> **Must not skip**: Rules & Pitfalls · Pre-Delivery Checks · Scope Boundaries — return here before delivery.
> **Formats**: excel_standards.md · metric_disambiguation.md

> Task `merger-model` in group `financial-models`. Read [`_overview.md`](_overview.md) first for shared calculation-model controls and format dependencies.

**Use when**: Sizing EPS accretion/dilution impact of a proposed acquisition for buy-side analysis, pitch book, or fairness opinion | **Deliverable**: Excel workbook with 9 tabs (Cover, Assumptions, Sources & Uses, PPA, Standalone Financials, Pro Forma IS, Accretion/Dilution Summary, Sensitivity, Checks)

---

## Ask First
1. **Entity type**: Is the acquirer public or private? Is the target public or private? (Defaults: both public)
2. **Consideration mix**: What is the cash/stock split? (Default: 50% debt-funded cash / 50% stock)
3. **Synergies**: What are the cost and revenue synergy assumptions? (Default: 5% cost synergies / 2% revenue synergies)
4. **Scope flags**: Is this a pitch or a live deal? Asset deal or stock deal? Full synergy scenario analysis required? (Defaults: stock deal, pitch, full synergy analysis included)

---

## Workflow

1. **Build the Cover tab** — title, transaction summary, key output metrics (GAAP and Cash EPS accretion/dilution, implied multiples, breakeven synergies); no live formulas yet, populated last.

2. **Build the Assumptions tab** — enter all deal inputs here and only here: offer price, premium, consideration mix toggle (with sum-to-100% validation cell), synergy amounts and phase-in schedule, tax rate, forecast period (default: 3 years), earnings basis (default: NTM primary, LTM reference), cost-to-achieve, transaction fees. Every downstream tab pulls from this single source; hard-code nothing elsewhere.

3. **Build Sources & Uses (S&U)** — Reconcile cash funding (new debt proceeds and acquirer cash) to cash consideration, actual debt repayment/refinancing, fees and any closing cash requirement. Show stock consideration and retained/assumed debt separately as non-cash consideration/capital-structure items; do not treat retained debt as a cash payoff or new cash source. Reconcile cash Sources − Uses = 0 and the full consideration/EV bridge before anchoring PPA.

4. **Build the PPA tab** *(Purchase Price Allocation)* — derive the equity purchase price from the S&U; add assumed net debt to get implied EV. Allocate premium over book net assets:
   - Identify PP&E write-up and intangible write-up as separate line items.
   - Compute **DTL = taxable temporary differences on write-ups × applicable tax rate**, where recognition is required. A matching tax-basis step-up may eliminate these differences. Record DTL as a liability: it reduces identifiable net assets and therefore increases goodwill.
   - **Goodwill = Equity purchase price − Book net equity − PP&E write-up − Intangible write-up + DTL** (GAAP: not amortized).
   - Derive annual D&A step-up from intangible and PP&E write-ups using assumed useful lives — this feeds directly into the Pro Forma IS as the primary driver of GAAP EPS dilution.

5. **Build Standalone Financials** — input or link acquirer and target income statements (NTM basis) independently. Show: revenue, EBITDA, D&A, EBIT, interest expense, pre-tax income, taxes, net income, diluted share count, diluted EPS. Keep the two companies in separate column blocks; do not combine here.

6. **Build the Pro Forma IS** — combine acquirer and target, then apply each adjustment as a **separate signed line item** (never net multiple adjustments into one line):
   - Add: target revenue and EBITDA.
   - Add: synergies (phased per schedule, pre-tax in this IS and tax-effected once in the tax provision; gross synergies and cost-to-achieve shown separately — never netted at the assumption level).
   - Deduct: D&A step-up from PPA (intangibles + PP&E write-up amortization).
   - Deduct: **foregone interest income** in the pre-tax IS = pre-tax yield × cash used. Apply tax once in the tax provision. The separate after-tax EPS bridge uses this amount × (1 − tax rate), with no second tax effect.
   - Reconcile the interest starting point: if starting from EBIT/EBITDA, deduct acquirer interest, retained target-debt interest and new-debt interest once each. If starting from combined pre-tax income, keep the embedded retained-debt charge, remove only interest on debt actually repaid/refinanced, and add replacement/new interest once. Include applicable fair-value/discount amortization under the confirmed accounting basis.
   - Deduct: noncapitalizable advisory/acquisition costs in the period incurred; separately include debt issuance-cost amortization in interest expense over the debt term. Do not repeat closing cash fees as recurring expenses.
   - Compute pro forma pre-tax income → apply blended tax rate → pro forma GAAP net income.
   - **Pro forma diluted share count = Acquirer existing diluted shares + New shares issued for stock consideration only.** Never include target shares in the denominator.
   - Compute **GAAP diluted EPS** and **Cash EPS** (GAAP net income + PPA amortization after tax, divided by same pro forma share count) in clearly separated rows.

7. **Build the Accretion/Dilution Summary tab** — display:
   - Year 1 / Year 2 / Year 3 GAAP EPS accretion/(dilution) in $ and %.
   - Year 1 / Year 2 / Year 3 Cash EPS accretion/(dilution) in $ and %.
   - Implied acquisition P/E vs. acquirer P/E (relative P/E comparison — see Rules).
   - Contribution analysis: acquirer and target % contribution to combined revenue, EBITDA, and net income vs. implied pro forma ownership split.
   - Breakeven synergy required for Year 1 EPS neutrality, expressed both in $ and as % of target EBITDA.
   - Pro forma net debt / EBITDA leverage ratio with threshold flags.

8. **Build the Sensitivity tab** — use native Excel Data Tables (not static paste) so tables update dynamically when inputs change. Recommended axes:
   - GAAP EPS accretion/(dilution) vs. (offer premium × synergy amount).
   - Cash EPS accretion/(dilution) vs. stock-consideration share × debt-funded share of the cash consideration. Each axis is independent; total cash + stock consideration remains 100%.
   - Breakeven synergy vs. offer premium.

9. **Build the Checks tab** — see Pre-Delivery Checks. All checks resolve before the Cover is finalized.

---

### Synergy Phase-In Schedule (default)

| Year | Cost Synergies | Revenue Synergies |
|------|---------------|-------------------|
| 1 | 25% | 25% |
| 2 | 75% | 75% |
| 3 | 100% | 100% |

Apply after-tax at the acquirer's marginal tax rate. Revenue synergies receive a **50% confidence haircut** relative to cost synergies in the base case (lower conviction; show gross and haircut-adjusted as separate rows in assumptions).

Year 1 net synergy contribution is frequently negative once cost-to-achieve and transaction fees are included — model this explicitly; do not smooth it away.

---

### Pro Forma EPS Bridge (display structure)

| Line | Treatment |
|------|-----------|
| Acquirer standalone EPS | Starting point |
| + Target net income contribution | Separate line |
| − D&A step-up (PPA, after-tax) | Separate line |
| − Foregone interest income (after-tax) | Separate line |
| +/− Incremental interest on new debt (after-tax) | Separate line |
| − Transaction fees (Year 1 only, after-tax) | Separate line |
| + Net synergies (after-tax, phased) | Separate line |
| = Pro forma net income | Subtotal |
| ÷ Pro forma diluted shares | New shares only added |
| = Pro forma GAAP EPS | Bolded |
| + PPA amortization add-back (after-tax) | Separate line |
| = Pro forma Cash EPS | Bolded |

---

## Defaults (apply silently, disclose at delivery)

| Parameter | Default |
|-----------|---------|
| Consideration mix | 50% debt-funded cash / 50% stock |
| Forecast period | 3 years |
| Earnings basis | NTM primary, LTM as reference |
| Cost synergy assumption | 5% of target cost base |
| Revenue synergy assumption | 2% of combined revenue |
| Revenue synergy confidence haircut | 50% applied in base case |
| Synergy phase-in | 25% / 75% / 100% over Years 1–3 |
| PPA | Always included |
| Deal structure | Stock acquisition |
| Acquirer/target status | Both public |
| Foregone interest pre-tax yield | Match to prevailing short-term rate or acquirer return assumption |
| Leverage flag thresholds | Yellow ≥ 5.0× net debt/EBITDA; Red ≥ 7.0× |
---

## Rules & Pitfalls

**Never:**
- **Never mix GAAP EPS and Cash EPS into a single reported figure** — PPA amortization depresses GAAP net income while Cash EPS may be accretive; conflating them produces a number that is neither and misleads the IC on the true economic return.
- **Never omit an applicable DTL from the PPA** — with consideration and other net assets held constant, omitting DTL understates goodwill by that amount. Confirm book/tax basis and recognition rather than applying write-ups × tax rate to every deal.
- **Never include target shares in the pro forma diluted share count** — target shareholders receive cash or acquirer shares; their original shares are retired. Adding them to the denominator deflates pro forma EPS and produces a nonsensical blended share count.
- **Distinguish transaction and issuance costs** — noncapitalizable advisory/acquisition costs are expensed when incurred, rather than recurring forecast costs. Qualifying debt issuance costs are amortized into interest expense over the debt term (see the LBO group overview); equity issuance costs follow the applicable equity accounting. Keep closing cash uses separate from the timing of P&L recognition.
- **Distinguish retained debt from extinguished debt** — assumption does not extinguish the target interest obligation. Trace each tranche from closing S&U to the debt schedule and pro forma interest, retaining or replacing its charge exactly once; see the [shared reconciliation rules](../../../metric-dictionary.md#model-reconciliation-and-attribution).
- **Never apply the offer premium to EV** — the premium is computed relative to the target's equity value (market cap); EV is separately derived as equity purchase price plus assumed net debt.
- **Never net gross synergies against cost-to-achieve at the assumption level** — keep them as separate signed rows so reviewers can stress each independently; netting hides execution risk.
- **Never hardcode values in downstream tabs** — all assumptions cascade from the Assumptions tab; hardcoded constants break when inputs change and create version-control failures.

**Conditional:**
- **If the deal is an asset transaction (not a stock acquisition), flag immediately and do not proceed with defaults** — asset deals generate a tax basis step-up that materially alters after-tax cash returns and PPA mechanics; model must be rebuilt under asset-deal logic.
- **If GAAP EPS is accretive but Cash EPS is dilutive (or vice versa), add an explanatory annotation on the Accretion/Dilution Summary tab** — the divergence signals that PPA amortization is the dominant driver and must be surfaced explicitly for the deal team.
- **Use relative P/E as a pure-stock screening intuition only** — compare matching earnings periods/bases and account for PPA and costs. Cash/debt-funded accretion depends on financing cost, foregone cash yield, tax and synergies; a P/E ordering alone cannot establish dilution.
- **If new shares issued exceed 20% of acquirer's existing share count, flag for disclosure** — most jurisdictions require shareholder approval above this threshold; the deal timeline and vote risk must be noted.
- **If the source reports only equity value for the target, rebuild EV via the bridge** (equity purchase price + net debt assumed + preferred + minority interest) before computing implied EV/EBITDA multiples.
- **If target debt is being assumed rather than refinanced, confirm whether change-of-control provisions are triggered** — failure to flag this can invalidate the S&U structure.

**Judgment:**
- **Label the relative P/E comparison's assumptions** — in a simple all-stock exchange on matching earnings bases, higher acquirer P/E can favor accretion before other adjustments. For mixed/cash/debt consideration, rely on the full pro forma EPS calculation rather than claiming automatic accretion.
- **Express breakeven synergies in both $ and as % of target EBITDA** — the dollar figure conveys magnitude; the EBITDA percentage conveys feasibility relative to the target's earnings base and is the metric deal teams argue over.
- **In the base case, haircut revenue synergies by 50% relative to cost synergies** — revenue synergies depend on customer behavior, competitive response, and cross-sell execution that cost synergies do not; the discount reflects the asymmetry in conviction, not excessive conservatism.
- **Prefer NTM as the primary earnings basis for accretion analysis** — the market prices the deal on forward earnings; LTM is useful as a sanity check anchor but should not drive the headline accretion number.
- **Build the consideration mix as a live toggle that simultaneously updates new shares issued, new debt drawn, foregone interest income, and incremental interest expense** — a toggle that only updates one variable creates silent model errors that are extremely difficult to trace.

---

## Pre-Delivery Checks

- **Verify cash S&U balances to zero** and non-cash stock/debt assumptions reconcile separately. Trace retained, repaid and replacement tranches to pro forma interest; no retained interest disappears and no refinanced charge is duplicated.
- **Verify PPA goodwill ties out**: Equity purchase price − Book net equity − PP&E write-up − Intangible write-up + DTL = Goodwill as modeled; a mismatch indicates DTL was omitted or write-ups are inconsistent with S&U.
- **Verify pro forma diluted share denominator** = Acquirer existing diluted shares + New shares issued for stock consideration only; confirm target shares are absent.
- **Verify consideration mix sums to exactly 100%**; flag any toggle state that does not sum to 100% as a hard model error.
- **Verify the pro forma IS net income ties back to the EPS bridge** — the bridge must foot/tie out line-for-line to the IS; unexplained differences indicate a hidden hardcode or double-counted adjustment.
- **Verify synergy phase-in percentages flow correctly through all three years** and that each year's synergy is tax-effected at the acquirer's marginal rate before reaching net income.
- **Verify sensitivity tables are live Data Tables** (not pasted values) by changing an input and confirming automatic recalculation.
- **Flag (non-blocking) if offer premium > 50%** — document rationale.
- **Flag (non-blocking) if Year 1 phase-in > 50%** — aggressive ramp requires explicit support.
- **Flag (non-blocking) if implied EV/EBITDA > 20×** — note in output with comparable context.
- **Flag (non-blocking) if Year 1 EPS dilution > 15%** — note recovery timeline.
- **Flag (non-blocking) if pro forma net debt/EBITDA ≥ 5.0× (yellow) or ≥ 7.0× (red)** — include risk notation in the Accretion/Dilution Summary.
- **Flag (non-blocking) if breakeven synergy exceeds 10% of target EBITDA** — signals deal is economically marginal without aggressive execution.
- **Flag (non-blocking) if GAAP and Cash EPS diverge in direction** (one accretive, the other dilutive) — add annotation explaining the PPA amortization effect.
- **Flag (non-blocking) if acquirer P/E < implied acquisition P/E and synergies are minimal** — label as "structurally dilutive; synergy-dependent."
- **Flag (non-blocking) if new shares issued > 20% of acquirer share count** — note potential shareholder approval requirement.
- **Flag (non-blocking) if blended tax rate < 10% or > 40%** — verify inputs; unusual rates should be documented.

---

## Scope Boundaries

Bolt-On M&A (LBO context): tuck-in acquisitions within a leveraged buyout, including cohort triangles and IRR roll-up mechanics, are handled by the Bolt-On M&A playbook — not this one.
Standalone Sources & Uses: when a client needs only a formatted S&U table without a full pro forma income statement or PPA, use the Sources & Uses playbook.
This playbook covers public-to-public and public/private acquisitions with full accretion/dilution output; it does not cover merger-of-equals exchange ratio analysis or fairness opinion valuation ranges, which require dedicated playbooks.

---


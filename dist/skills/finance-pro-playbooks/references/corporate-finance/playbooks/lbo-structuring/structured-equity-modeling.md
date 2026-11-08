# Structured Equity Modeling

> **Sections**: Ask First · Workflow · Defaults (apply silently, disclose at delivery) · Rules & Pitfalls · Pre-Delivery Checks · Scope Boundaries
> **Must not skip**: Rules & Pitfalls · Pre-Delivery Checks · Scope Boundaries — return here before delivery.
> **Formats**: excel_standards.md · metric_disambiguation.md

> Task `structured-equity-modeling` in group `lbo-structuring`. Read [`_overview.md`](_overview.md) first for group-level scope, shared defaults, and format dependencies.

**Use when**: Adding a preferred equity sleeve to an existing LBO to model instrument-specific exit waterfalls, year-by-year conversion/redemption decisions, and separate IRR & MOIC for preferred, common, and blended cohorts | **Deliverable**: Excel workbook with 4 tabs (Assumptions / S&U / LBO Model / Sensitivities)

---

## Ask First

1. **Instrument type** — Which of the four instruments applies: convertible preferred, participating preferred, redeemable + warrant, or pure PIK? If the instrument combines features (e.g., convertible with a hard liquidation preference), confirm the full feature set before proceeding.
2. **Key terms** — Face amount, coupon rate (cash vs. PIK split), liquidation preference multiple, conversion price, participation cap (if any), warrant coverage (if applicable), and any redemption schedule.
3. **Waterfall priority** — Does the credit agreement require the optional debt sweep to rank above cash preferred dividends, or does preferred rank above the sweep (confirm against actual covenants)?
4. **Cohort ownership** — Is the preferred held by the sponsor or a third party? (Determines which cohort results to foreground in delivery.)

> **Hard stop**: If the deal involves multiple preferred series with differing terms (VC-style stacked rounds, anti-dilution, MFN, or drag-along provisions), stop and inform the user — this playbook covers a single-sponsor preferred sleeve only.

---

## Workflow

1. **Build and foot the common-only baseline LBO first** *(never introduce the preferred sleeve into a model that has not yet tied out; debugging conversion logic on top of a floating baseline is the primary source of cascading errors).*

2. **Nail down the instrument type** — Confirm which of the four instruments applies and map its exit waterfall logic before touching any formula:
   - *Convertible*: derive the permitted preference/redemption and conversion alternatives from the term sheet; the illustrative greater-of case is MAX(accreted balance, preference multiple × face, as-converted value), bounded by legally available proceeds and seniority. Do not replace an additive or differently defined entitlement with that shortcut.
   - *Participating*: distribute the contractual preference and residual participation, applying the confirmed cap basis (total proceeds including preference, or participation slice only) and any conversion election. Do not infer cap basis from the instrument name.
   - *Redeemable + warrant*: redemption value + warrant value; set the `detachable` flag to determine accounting treatment
   - *Pure PIK*: roll the contractual accretion and redemption claim; reporting classification as debt, equity or another category depends on the actual instrument and accounting basis, not the PIK label alone.

3. **Capture all terms into the Assumptions tab** — Record face value, coupon rate (split-coupon legs separately, e.g., 8% cash + 4% PIK as two distinct line items), liquidation preference multiple, conversion price, participation cap, warrant coverage, and redemption schedule.

4. **Build S&U and cap table with three blocks; list preferred as a standalone line** *(never roll preferred into debt or common equity)*:
   - Transaction Details panel
   - Two-column Sources & Uses (preferred on its own row)
   - Pro Forma Financing Structure table
   - For convertibles: show maximum dilution on full conversion
   - For participating preferred: show preferred ownership % AND participation % as two distinct figures

5. **Integrate preferred into the three financial statements** — Apply `Pref Switch (0/1)` as a gate on every preferred-related formula:
   - **Income statement**: equity-classified preferred distributions reduce income available to common below net income. A debt/liability-classified instrument may require interest/accretion accounting; confirm book and tax treatment separately instead of treating every preferred coupon as non-deductible equity dividends.
   - **Balance sheet**: track face principal, accrued PIK, cash coupon and principal/redemption separately. Cash coupons do not automatically reduce principal; subtract only actual principal/redemption amounts or capitalized amounts settled, under the confirmed terms and accounting basis.
   - **Cash flow**: PIK accrual is non-cash — add back only when starting from "net income attributable to common" (i.e., already net of preferred); cash coupon payments are real outflows

6. **Position cash preferred payments in the cash waterfall** — Default sequence: mandatory debt service → **cash preferred dividends** → optional debt sweep/cash sweep. Flag that most credit agreements treat cash preferred dividends as restricted payments; confirm covenant language. Note that preferred and sweep compete for the same dollar pool; preferred-above-sweep is the default but is configurable.

7. **Build the preferred PIK roll and annual exit waterfall on the LBO Model tab** (vertical stack order: IS → FCF → debt schedule → preferred PIK roll → cash waterfall → annual exit waterfall → conversion decision → cohort returns → local restatement).

8. **Build the conversion decision as a three-way MAX with no circular reference**:
   - Compute contractual preferred entitlement from the confirmed alternatives (the illustrative greater-of case uses MAX). Allocate actual cash payout subject to available distributable proceeds and seniority; show any unpaid claim explicitly, never create a negative common payout to fund a preference.
   - `Total Equity Pre-Pref = Exit EV − transaction fees + cash − senior debt` — this figure is independent of the conversion flag, which is what eliminates the circular reference
   - Wire the conversion flag to reference `Total Equity Pre-Pref` directly; never reference a downstream cell that already depends on the flag
   - Run the decision for **every projection year**, not only the scheduled exit year; the breakeven year itself carries analytical signal (early years: floor binding, preferred takes kicker; Year 3+: typically converts)
   - Flip diluted share count only in years where conversion = "Y"; a static share count breaks per-share math

9. **Build three cohort sensitivity tables on the Sensitivities tab** (common / preferred / blended), with axes of exit multiple × exit year:
   - Preferred table behavior: cumulative PIK floor → IRR approximately flat across years; fixed liquidation preference dollar floor → IRR declines year-over-year (label which constraint is binding in each cell)
   - Each cell contains one number; no merged cells
- When proceeds ≤ 0, annualized IRR is N/M; show MOIC and cash recovery. Positive MOIC^(1/t)−1 is only an endpoint cross-check; actual dated interim cashflows use XIRR.

10. **Run all pre-delivery sanity checks** (see section below).

---

## Defaults (apply silently, disclose at delivery)

| Parameter | Default | Rationale |
|---|---|---|
| PIK accrual | Cumulative, annual compounding | Market standard for sponsor preferred |
| Preferred dividend type | PIK / cumulative | Most conservative baseline |
| Conversion price | Entry price (1:1 share conversion) | Standard unless term sheet specifies otherwise |
| Liquidation preference structure | Greater-of (downside protection, not additive) | More common than stacked/additive; flag and confirm against term sheet |
| Preferred accounting / tax | Confirm legal and reporting classification and tax jurisdiction separately | Equity dividends and debt/liability interest do not share a universal treatment |
| Primary return metric | XIRR | Handles interim cash flows (cash coupons, PIK-toggle, partial redemptions, recaps); `MOIC^(1/t)−1` is reserved for single-in / single-out sensitivity bodies |
| Cash preferred position in waterfall | Preferred-above-sweep | Conservative default; configurable; flag against covenant language |
| Instrument waterfall | Convertible preferred default (three-way MAX) | Most common sponsor structure; overridden once instrument is confirmed |
| Pref Switch | 0/1 binary applied to every preferred formula | Switch = 0 must exactly restore the common-only baseline |
| Cohort reporting | All three cohorts (preferred / common / blended) | Blended alone masks cohort-level results |

---

## Rules & Pitfalls

**Never:**
- **Never use the wrong exit waterfall for the instrument type** — convertible, participating, redeemable + warrant, and pure PIK have fundamentally different exit logic; using the wrong waterfall is the single most common and most credibility-destroying error in this product.
- **Distinguish equity dividends from liability/debt interest** — do not deduct an equity distribution as an operating/interest expense or assume tax deductibility. Assess liability-classified preferred/PIK instruments under their actual book and tax rules.
- **Never add back PIK accrual to cash flow starting from net income before the preferred deduction** — PIK is non-cash but is a distribution to preferred holders; the add-back is only valid when the starting cash flow line is already net of preferred.
- **Never use a static (non-toggling) diluted share count** — include preferred-converted shares in diluted count only in years where conversion = "Y"; a static count produces wrong per-share values in every non-conversion year.
- **Never use `MOIC^(1/t)−1` as the primary IRR when interim cash flows exist** — cash coupons, PIK-toggle switches, partial redemptions, and recaps all invalidate this shortcut; use XIRR.
- **Separate original face and accrued balance** — the conversion base (face only or face plus eligible accrued amounts) follows the contract. Keep it distinct from redemption/preference claims; do not assume that PIK always converts or never converts.
- **Apply the contractual cap basis exactly** — some terms cap total preference-plus-participation proceeds; others cap only a residual slice. Record which, any excluded dividends and the conversion alternative. An ambiguous cap requires clarification, not a universal default.
- **Never introduce the preferred sleeve before the baseline LBO ties out** — doing so forces simultaneous debugging of circular conversion logic and baseline errors.
- **Do not impose a three-way MAX on combined-feature instruments** — derive additive, participating, redemption and conversion alternatives from the confirmed terms, then apply seniority and proceeds constraints.

**Conditional:**
- **If the instrument combines features** (e.g., convertible with a hard liquidation preference, or participating with a PIK toggle), confirm the complete feature set before building the waterfall — hybrid instruments require explicit mapping of which feature governs in each exit scenario.
- **If the coupon is split** (e.g., 8% cash + 4% PIK), capture each leg as a separate line item in the model; a blended rate loses the cash/non-cash distinction needed for the waterfall and cash flow statement.
- **If the credit agreement imposes a mandatory sweep covenant**, override the preferred-above-sweep default and set sweep-above-preferred; flag the change in the model header.
- **If preferred is held by a third party** (not the sponsor), report all three cohorts but foreground the common-only cohort — that is what the sponsor cares about.
- **If `Pref Switch = 0` does not exactly restore the common-only baseline**, a preferred leak exists somewhere in the model; locate and fix before proceeding to conversion logic.
- **If the liquidation preference structure is additive** (stacked, mini-participating) rather than greater-of, override the default and flag it explicitly — additive structures are less common and materially change downside payoffs.
- **If exit proceeds are insufficient to cover the liquidation preference**, preferred IRR is still calculable (partial recovery); flag the impairment scenario explicitly in the sensitivity table.

**Judgment:**
- **Confirm greater-of vs. additive liquidation preference against the actual term sheet** — the default (greater-of) is more prevalent but getting it wrong overstates or understates downside protection materially.
- **Report the conversion breakpoint year as an analytical output, not just a flag** — the year in which conversion becomes optimal is itself informative: early floor-binding years signal downside protection is active; later conversion years signal equity upside is driving preferred value.
- **Run sensitivities on all three cohorts on shared axes** — a blended-only sensitivity table is acceptable for internal speed but masks the preferred/common split that LPs and co-investors will interrogate.
- **Prefer XIRR even when a deal appears to have no interim cash flows** — PIK-toggle provisions can be exercised mid-hold; building XIRR in from the start avoids a retroactive model rebuild.
- **Flag pref-vs-sweep ordering prominently at delivery** — most credit agreements classify cash preferred dividends as restricted payments; the ordering assumption has real compliance implications and reviewers will ask.

---

## Pre-Delivery Checks

- Compare the preferred coupon with senior-debt rates as a risk/pricing observation, not a mathematical acceptance condition; ownership on each applicable converted/nonconverted basis sums to 100%.
- `Pref Switch = 0` restores the stated baseline. Closing claim = opening claim + contractual PIK/accretion − principal/redemption or accrued-claim settlement; paid cash coupons are not automatically principal reductions.
- In conversion years, the actual conversion entitlement satisfies the confirmed contractual election test; any accrued claim included in conversion and any surrendered preference are reconciled. Conversion flags have no dependency cycle.
- Recompute preferred/common dated cash-flow returns independently; conversion does not imply equal IRRs when entry cost, timing, cash coupons or other terms differ. Do not force an IRR ordering.
- Cash preferred reduces cash available for sweep, without separate exit-bridge deduction; S&U does not double-count existing debt.
- When proceeds ≤ 0, annualized IRR is N/M; show MOIC and cash recovery. Positive MOIC^(1/t)−1 is only an endpoint cross-check; actual dated interim cashflows use XIRR.

---

## Scope Boundaries

This covers one single-sponsor preferred sleeve with one term set. Use **Term-Sheet Waterfall** for a liquidation analysis without operating model and **MIP** for management pools. Multi-series stacks, anti-dilution, MFN, or drag-along terms are out of scope and require escalation.

---


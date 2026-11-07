# Sale-Leaseback Modeling

> **Sections**: Ask First · Workflow · Defaults (apply silently, disclose at delivery) · Rules & Pitfalls · Pre-Delivery Checks · Scope Boundaries · Task-specific verification
> **Must not skip**: Rules & Pitfalls · Pre-Delivery Checks · Scope Boundaries — return here before delivery.
> **Formats**: excel_standards.md · metric_disambiguation.md

> Task `sale-leaseback-modeling` in group `lbo-structuring`. Read [`_overview.md`](_overview.md) first for group-level scope, shared defaults, and format dependencies.

**Use when**: Modeling a sale-leaseback (SLB) transaction overlay on an existing LBO, DCF, or 3-statement model to assess accretion/dilution, cash flow impact, and equity value creation | **Deliverable**: SLB transaction module (Excel) integrated into the host model, covering accretion test, layered rent schedule, proceeds waterfall, post-SLB valuation, and value creation bridge contribution

---

## Ask First

1. **Proceeds or cap rate**: Is the SLB sized by a given gross proceeds figure or by a target cap rate? If the latter, confirm Year 1 base rent to back into proceeds.
2. **Tax basis and net proceeds**: Is the proceeds input already net of transaction fees and taxes? If gross only, provide tax basis (or confirm zero basis), applicable tax rate, and fees so the after-tax net can be derived.
3. **Lease terms**: Confirm annual rent escalator (default 2%), lease duration (default 15 years), lease type (NNN default), and mid-year closing adjustment if applicable (e.g., close on 7/1 → 0.5 × Year 1 rent in the closing year).
4. **Use-of-proceeds waterfall**: Confirm mandatory prepayment covenant (default 100% of net proceeds to mandatory debt repayment first), then priority order for any remainder: optional debt repayment → dividend / recap → M&A → cash on balance sheet. If no debt exists, skip debt questions entirely.

---

## Workflow

1. **Run the accretion test (Step 0 — do this first before building anything else)**
   Compute the implied real estate multiple = gross property sale price ÷ Year 1 base rent (= 1 ÷ cap rate). Compare to the reference business multiple (LBO exit multiple, DCF terminal multiple, or forward comps multiple in use). Spread > 0 → accretive (asset sold at a higher multiple than the business is valued — cap rate arbitrage creates value). Spread < 0 → dilutive (generates cash but destroys business value). Flag spread < 0 to the user and require explicit confirmation before proceeding. Note: this test is static — it does not capture the compounding drag of annual rent escalations and is not the final answer on value creation.

2. **Build the layered rent schedule in the operating model (Step 1)**
   Insert a dedicated rent line in the income statement below pre-SLB EBITDA. Structure the display as three clearly labeled rows: Pre-SLB EBITDA / (SLB Rent Expense) / Post-SLB EBITDA. Escalate rent at the confirmed rate (default 2% per year) for the full lease term. For partial-year closings, apply a pro-rata factor to the closing-year rent (e.g., close on 7/1 → 0.5 × Year 1 rent). Use the confirmed contractual escalator, including zero for a genuinely flat lease; keep rent separate from organic EBITDA trends.

3. **Run SLB proceeds through the cash flow statement (Step 2)**
   Book the asset-sale cash proceeds and applicable transaction fees once in closing-year investing cash flow. Bridge attributable cash taxes separately under the confirmed GAAP/IFRS cash-flow policy; use net after-tax proceeds for the financing/returns waterfall, without silently netting all taxes into investing cash flow. Do not amortize the proceeds across periods. Under US GAAP operating classification, cash rent already included in CFO must not be duplicated. Under IFRS/finance classification, separately bridge interest and principal cash payments to the lease liability and applicable cash-flow classification.

4. **Build the use-of-proceeds waterfall (Step 3)**
   Allocate net proceeds in priority order: mandatory debt repayment → optional debt repayment → dividend/recap → M&A → residual cash. The waterfall must foot to net SLB proceeds — verify this tie-out. Apply the cascade effect: each dollar of debt repaid lowers the ending balance, which reduces subsequent interest expense in all downstream periods (iterative). For mid-year closes, pro-rate the Year 1 interest saving. Flag any residual cash left idle — undeployed proceeds generate no return and should be surfaced explicitly.

5. **Normalize valuation and credit metrics (Step 4)**
   Default to a post-rent operating EBITDA and matching EV/multiple basis. For lease-as-financing analysis, reconcile rent add-backs and lease debt consistently under the metric dictionary. A DCF terminal multiple uses a matching metric; a perpetuity terminal value uses normalized cash flow, not an automatic EBITDA multiple. Contractual leverage/coverage follows the covenant definition. For lease-heavy sectors, show a reconciled lease-adjusted comparison where useful; never mix pre-rent EBITDA with an unadjusted post-rent multiple/EV.

6. **Populate the value creation bridge (Step 5, if bridge is in scope)**
   Apply the [shared once-only attribution rule](../../../metric-dictionary.md#model-reconciliation-and-attribution):
   - On a normalized post-rent operating basis, isolate the valuation-year rent effect in TEV: signed EBITDA change × matching exit/terminal multiple. Do not also include that rent in organic growth.
   - Net cash proceeds are not EBITDA. Attribute them once through debt repayment/residual cash in net debt, an actual dated sponsor distribution, or the investment use and its resulting value.
   - A combined SLB row may present rent effect plus an assigned proceeds effect only if the same cash effect is removed from net-debt/distribution/other rows; document the reclassification.

   Subsequent interest savings enter actual after-tax cash flows and cash/debt once. Reconcile the complete bridge and dated sponsor returns; debt repayment, dividends and M&A do not guarantee positive MOIC/IRR after rent, fees and tax.

---

## Defaults (apply silently, disclose at delivery)

| Parameter | Default | Rationale |
|---|---|---|
| Annual rent escalator | 2% per year | Market-standard NNN escalator; flat-lining understates long-run EBITDA drag |
| Lease duration | 15 years | Institutional SLB market norm |
| Transaction fee | 1% of gross proceeds | Standard sell-side advisory fee for RE monetization |
| Lease type | NNN (triple-net) | Seller retains opex items (property tax, insurance, maintenance) in existing opex lines |
| Proceeds input | After-tax net | Avoids the need to build a tax basis and rate schedule separately |
| Proceeds timing | One-time inflow in SLB closing year | Reflects single asset-sale event; never amortized |
| Mandatory prepayment | 100% of net proceeds applied to mandatory debt first | Typical term loan / credit agreement covenant default |
| Implied RE multiple denominator | Year 1 (initial) base rent | Cap rate is always defined on the starting rent, not an escalated rent |
| Valuation multiple applied to | Normalized post-rent EBITDA by default; matched lease-financing basis where selected | Numerator, denominator and lease obligations must reconcile |
| Exit/terminal multiple | Unchanged pre- vs. post-SLB (carry host model multiple) | Unless user explicitly specifies a re-rating |

---

## Rules & Pitfalls

**Never:**
- Never mix a post-rent multiple/EV convention with pre-rent EBITDA. A pre-rent/lease-financing basis is valid only after a consistent rent, lease-debt and cash-flow reconciliation.
- Never amortize SLB proceeds across multiple years — it misrepresents the timing of the cash inflow and corrupts the waterfall and IRR calculations.
- Never duplicate operating cash rent. A finance/IFRS lease requires explicit principal/interest cash-flow reconciliation; expense is not automatically the cash payment.
- Never count SLB proceeds twice: proceeds enter once via the waterfall (debt repayment or other use) and must not reappear as an incremental item at exit.
- Never record interest savings from SLB-driven debt repayment as a standalone SLB bridge row — route it through the leverage bridge to preserve clean attribution.
- Do not omit contractual rent escalators. A flat schedule is valid when the confirmed lease has no escalation; separately identify rent from organic EBITDA trends.
- Never treat a PropCo/OpCo structural separation as an SLB — there is no arm's-length cash sale in that structure; flag it and treat it as out of scope.

**Conditional:**
- If gross proceeds are provided instead of after-tax net proceeds, compute cash tax on the gain: Cash Tax = MAX(Gross Proceeds − Tax Basis, 0) × Tax Rate. Flag a zero tax basis explicitly — a fully depreciated property generates maximum taxable gain and produces the largest tax leakage.
- If the lease type is gross (not NNN), use a higher rent figure reflecting the landlord's assumption of opex, and simultaneously remove property tax, insurance, and maintenance costs from the opex lines in pre-SLB EBITDA — failing to do so double-counts those costs.
- If the SLB closes mid-year, pro-rate both the Year 1 rent (e.g., close on 7/1 → 0.5 × annual rent) and the Year 1 interest saving from debt repayment.
- If the transaction involves multiple tranches (partial or phased SLB), model each tranche independently and run a separate accretion test for each — do not aggregate tranches before testing.
- If no debt exists on the balance sheet, skip all mandatory/optional prepayment questions and route proceeds directly to the remaining waterfall steps.
- If the business operates in a lease-heavy sector (restaurant, retail, healthcare), present EV/EBITDAR and a lease-adjusted EV alongside the standard EV/EBITDA — post-SLB EV/EBITDA rises mechanically (lower denominator) even when no value is created, and the unadjusted multiple will mislead reviewers.
- If the accretion test yields a spread < 0 (implied RE multiple < reference business multiple), flag dilution to the user and require explicit sign-off before proceeding.

**Judgment:**
- The accretion test is a first-pass gate, not the final verdict on value creation: it is static and ignores the compounding drag of annual rent escalations over the lease term. Present both the accretion test and the full value creation bridge to give a complete picture.
- When idle cash appears as a residual in the waterfall, flag it proactively — undeployed proceeds earn minimal return and will attract scrutiny from sponsors and credit committees.
- Return attribution framing matters for the audience: debt repayment is the MOIC story; dividend/recap is the IRR story. Frame accordingly depending on whether the sponsor audience is focused on fund-level cash yield or total return.
- Cap rate arbitrage (selling real estate at a higher gross-price/rent multiple than the business multiple) is the value thesis; ensure the narrative explicitly identifies the spread as the source of value, not "generating liquidity" alone.

---

## Pre-Delivery Checks

- Visible, signed-off accretion test uses Year-1 base rent and labels the directional spread.
- Rent has dedicated expense and cash-payment bridges under the confirmed lease classification; never duplicate a payment.
- Proceeds appear once in closing-year investing cash flow; waterfall foots to after-tax net proceeds.
- Valuation numerator/denominator and rent/lease liabilities use a consistent basis; covenant metrics follow their actual definitions. Rent valuation effects and net proceeds reconcile once across TEV, net debt, distributions and investment use. Interest savings flow through actual cash/debt without a second add-on.
- Flag rent/revenue > 8%, post-SLB margin decline > 500 bps, and implied RE multiple > 30× (cap rate < 3.3%) or < 10× (cap rate > 10%).
- NNN opex remains in operating expenses; for gross leases remove corresponding opex; flag zero tax basis.

---

## Scope Boundaries

This overlay consumes host-model EBITDA and exit/terminal assumptions. PropCo/OpCo analysis is out of scope; **Value Creation Bridge** owns the complete bridge, while this module provides only SLB-specific inputs.

## Task-specific verification

Cap-rate multiple=gross property sale price/Year-1 base rent, never net after-tax proceeds/rent. Net proceeds=gross−fees−tax on taxable gain. Ask reporting standard and lease classification; bridge ROU/lease liability, interest, principal and actual cash payment under applicable GAAP/IFRS/covenant definitions. Only an explicit operating-lease case avoids a separate duplicate rent cash line.


Lease accounting reference: [IFRS 16 effects analysis](https://www.ifrs.org/-/media/project/leases/ifrs/published-documents/ifrs16-effects-analysis.pdf). Principal lease repayments are financing cash flows; current interest classification and covenant treatment follow the applicable reporting policy.

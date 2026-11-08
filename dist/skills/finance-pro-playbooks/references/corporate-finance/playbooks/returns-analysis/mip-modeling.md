# MIP Modeling

> **Sections**: Ask First · Workflow · Defaults (apply silently, disclose at delivery) · Rules & Pitfalls · Pre-Delivery Checks · Scope Boundaries · Task-specific verification
> **Must not skip**: Rules & Pitfalls · Pre-Delivery Checks · Scope Boundaries — return here before delivery.
> **Formats**: excel_standards.md · metric_disambiguation.md

> Task `mip-modeling` in group `returns-analysis`. Read [`_overview.md`](_overview.md) first for group-level scope, shared defaults, and format dependencies.

**Use when**: Modelling management incentive economics inside an LBO exit waterfall | **Deliverable**: MIP schedule in the requested medium, with actual payout, ownership and sponsor-return reconciliation; bridge effect is nonpositive and may be zero

---

## Ask First
1. **Plan type** — option pool, % of proceeds, sweet equity, profits interests, SAR, or exit bonus/phantom? (Default: option pool)
2. **Vesting / granting status** — fully vested and granted, or are specific vesting schedules / granting percentages provided?
3. **Multiple tranches** — are there separate hurdle tiers that vest independently? If yes, obtain strike / hurdle and size for each tranche.
4. **Performance hurdle** — is there a pre-MIP MOIC or proceeds hurdle that must be cleared before any payout triggers, and should it reference pre-MIP or post-MIP metrics?

---

## Workflow

1. **Confirm scope** — lock answers to the four "Ask First" questions before touching the model. (Prevents rebuilding the payout formula after the waterfall is wired.)

2. **Establish the entry equity value baseline** — calculate entry common equity value (not TEV) for use as the option strike reference and, for sweet equity, as the management co-investment entry value. (Strike is per-share and equity-based; using TEV here is the most common input error.)

3. **Build the plan-type payout module** — construct a separate block for each plan type present; sum tranches at the end rather than blending them upfront. Build all plan types as described below, keeping each mechanically distinct:

   - **Option pool**: Determine grants from the confirmed pool denominator. For N eligible cash-settled or exercised option shares with common equity pool V, basic common B and common strike K, solve the settlement consistently: for the simple all-in-money exercised case, share value = (V + N*K)/(B + N), and option payout = N*MAX(share value−K,0); equivalently solve payout and residual common proceeds together for cash settlement. Include other instruments through their own terms. Do not divide V by fully diluted shares without accounting for exercise proceeds/strike economics; zero payout depends on intrinsic value, not sponsor MOIC alone.
   - **% of proceeds**: Apply the percentage to *cumulative total proceeds*, not to gross exit equity value. Define:
     `Cumulative total proceeds = MAX(cumulative distributions − |cumulative equity invested|, 0)`. Include interim dividends in cumulative distributions and all equity injections in cumulative invested.
   - **Sweet equity** *(most complex — seven sub-steps)*:
     1. Model the **institutional strip** — split between preferred (PIK-style compounding) and common.
     2. Accrue preferred at the contractual PIK / compounding rate through each potential exit year.
     3. Determine each investor's (sponsor, management co-invest, sweet equity) proportionate share of the common equity tranche.
     4. Calculate management's *theoretical* common equity value assuming the same blended MOIC as all investors — this is the co-invest return baseline.
     5. Calculate **MIP payout = management's actual equity value − theoretical co-invest value; floor at zero**. This isolates the *incremental* upside slice above the overall return; it is not management's total equity value.
     6. At each exit year, **tie out**: sum of all investor values = total institutional strip exit value. If this does not foot, diagnose before proceeding.
     7. Confirm: at entry MOIC = 1×, sweet equity increment = 0.
   - **Profits interests (LLC)**: Set participation threshold = entry common equity value (default). Confirm with user if tiered. MIP payout = management's share of appreciation above threshold.
   - **SAR (cash-settled)**: Compute payout as value appreciation × number of units. SARs are cash-settled — do **not** issue shares and do **not** dilute the share count.
   - **Exit bonus / phantom equity**: Default — compute gross bonus on *gross* equity value to avoid circularity. If net-of-bonus treatment is required, flag to user and use goal-seek; confirm whether MOIC hurdle is measured pre- or post-bonus.

4. **Handle multi-tranche hurdles** — build each tranche as an independent block with its own hurdle and size. Do not require all hurdles to be reached before any tranche pays; each tranche vests when its own hurdle is cleared. Reference pre-MIP MOIC / proceeds in every hurdle test.

5. **Apply vesting / granting rules** — if the user provides a vesting schedule or granted percentage, calculate MIP only on vested and granted shares / units. If no schedule is provided, apply the 100% default silently.

6. **Extend across all potential exit years** — replicate the full MIP calculation for every modelled exit year (typically years 3–7). Use the same mechanism in each year; do not copy-paste a single-year result.

7. **Insert MIP into the exit waterfall at the correct position**:

   ```
   Exit TEV
   − Debt repayment
   − Preferred equity (accrued)
   = Gross common equity value
   − MIP payout                  ← insert here
   = Net common equity value
     → Sponsor share (per ownership %)
     → Management co-invest share (per ownership %, pari passu)
   ```

8. **Separate management co-invest from MIP in the waterfall** — co-invest receives its pro-rata share of net common equity on the same terms as the sponsor (pari passu). MIP is the incremental incentive layer on top. Never allocate 100% of net common equity to the sponsor while ignoring management's co-invest proportion.

9. **Wire actual MIP into the value bridge** — show minus the payout attributable to the sponsor on the same ownership basis: negative when paid, zero when nothing is earned. Compute sponsor returns from the actual post-MIP dated proceeds; do not substitute a monetary payout for an IRR percentage delta.

10. **Run all sanity checks** — see Pre-Delivery Checks before sharing output.

### Sweet Equity — Detailed Sub-Build Reference

| Sub-step | Action | Key mechanic |
|---|---|---|
| 1 | Model institutional strip | Preferred + common split per term sheet |
| 2 | Accrue preferred | PIK-style compounding each exit year |
| 3 | Allocate common proportions | Sponsor / mgmt co-invest / sweet equity slices |
| 4 | Compute co-invest theoretical value | Management proportion × total common at blended MOIC |
| 5 | Compute MIP increment | Actual mgmt value − theoretical; floor = 0 |
| 6 | Tie out each exit year | ΣAll investor values = strip total exit value |
| 7 | Confirm zero-increment at 1× | Sweet equity payout = 0 when MOIC = 1× at entry |

---

## Defaults (apply silently, disclose at delivery)

| Parameter | Default |
|---|---|
| Plan type | Option pool |
| Vesting / granting | 100% vested and granted |
| Waterfall position | Debt → Preferred → Gross common → **deduct MIP** → Net common |
| Option strike basis | Entry common equity value (not TEV) |
| Strike level | 1× entry common equity value per share |
| Option payout floor | MAX(MIP share value − strike, 0) |
| Hurdle reference | Pre-MIP MOIC / proceeds |
| Exit bonus computation | Gross equity basis |
| SAR settlement | Cash-settled; no share issuance |
| Profits interests participation threshold | Entry common equity value |
| Exit years modelled | All potential exit years in LBO (typically years 3–7) |
| Tranche vesting | Each tranche vests independently at its own hurdle |

---

## Rules & Pitfalls

**Never:**
- **Model MIP dynamically from confirmed plan terms** — a fixed bonus or flat percentage is permissible when expressly specified; otherwise model the strike, hurdles, vesting and tiers. Do not use a manually calibrated payout in place of the contractual schedule.
- **Declare the pool denominator** — for a post-grant pool that includes only basic and option shares, grants = basic × pool%/(1−pool%). If other dilutive instruments are also included in that same pool denominator, grants = (basic + other included dilution) × pool%/(1−pool%). A pre-grant pool uses its specified base. Reconcile the actual fully diluted percentage; do not use one formula for every pool definition.
- **Never set the option strike based on TEV** — the strike is per-share and references *common equity value* at entry. Using TEV inflates the strike and understates MIP cost to the sponsor.
- **Never place the MIP deduction after the sponsor/co-invest common equity split** — MIP must be deducted from gross common equity *before* allocating net common equity to any investor. Placing it after is a waterfall sequencing error that overstates sponsor proceeds.
- **Never apply the % proceeds MIP to gross exit equity value** — it applies to cumulative *proceeds* (cumulative distributions minus cumulative equity invested, floored at zero). Ignoring this floor overstates MIP when the sponsor has not yet recovered its cost.
- **Never let MIP go negative** — a negative MIP payout is mechanically impossible; floor all outputs at zero.
- **Never assign 100% of net common equity to the sponsor while ignoring management co-invest** — co-invest participates pari passu; its proportionate share of net common equity must be allocated separately from MIP.
- **Never use MIP payout = management's total equity value in a sweet equity structure** — the correct MIP is the *incremental* value above what management would have received at the blended MOIC (i.e., the pure co-invest return). Conflating the two overstates incentive cost and misrepresents the payout to both management and the sponsor.
- **Never mix management co-invest returns with MIP incentive economics** — co-invest and MIP are legally and economically distinct. Do not net them together or report a single "management total" without decomposing the two components.
- **Never model only the final exit year** — MIP must be calculated independently for every potential exit year, because payout changes with holding period, preferred accrual, and MOIC.

**Conditional:**
- **If the user provides explicit vesting schedules or granted percentages**, use only vested and granted shares / units in the MIP calculation — do not revert to the 100% default.
- **If exit bonus net-of-bonus treatment is required** (i.e., MOIC hurdle references post-bonus equity), rebuild using goal-seek and confirm with the user whether the MOIC threshold is pre- or post-bonus before proceeding.
- **If the user specifies multiple tranches**, build each tranche as a fully independent block (separate hurdle test, separate size, separate payout formula) and sum at the waterfall deduction line — do not aggregate inputs before running the hurdle logic.
- **If SAR settlement is structured as equity-settled in a specific deal**, override the cash-settled default, issue shares, and include in the fully diluted share count — but confirm explicitly; default remains cash-settled.
- **If profits interests are tiered**, confirm each participation threshold with the user before building; do not assume all tiers reference entry common equity value.
- **If the sponsor MOIC bridge is prepared**, ensure the MIP row in the bridge is exactly equal to the MIP deduction in the waterfall — any discrepancy is a model integrity error.

**Judgment:**
- **Treat MIP as an economic cost to the sponsor from the first draft** — sponsors who see MIP disclosed only at closing as a surprise dilution item lose confidence in the model. Build it in from the outset even if terms are indicative.
- **Prefer the gross equity basis for exit bonus calculations unless the deal team explicitly requests net** — net treatment adds model complexity (goal-seek) and is more prone to error under scenario analysis.
- **Flag sweet equity payout > 20% of common equity value and common equity > 25% of total capitalisation** — both are structural signals that the capital structure or MIP terms may be outside typical PE ranges and warrant senior review.
- **Test the confirmed plan hurdle, not a universal 1× rule** — zero payout depends on option intrinsic value, proceeds hurdles, bonus or sweet-equity terms. A payout below 1× may merit a warning but is not automatically an error if the plan provides it; keep contractual economics explicit.
- **Label the MIP bridge effect explicitly** — negative for a payout, zero for no earned payout, and consistent with the same investor's waterfall deduction.

---

## Pre-Delivery Checks

- Every exit year: net common equity = gross common equity − MIP.
- Zero payout depends on plan type: option intrinsic value, pre-MIP cumulative proceeds for % proceeds, or the confirmed sweet-equity/bonus hurdle; MIP must remain nonnegative.
- Flag MIP > **10% of gross common equity** and any MIP > 0 where pre-MIP MOIC < **1×**.
- Sponsor IRR/MOIC use post-MIP net common equity.
- Value-bridge MIP row = minus the actual payout on the same investor basis; it is nonpositive and zero is valid. Divide by actual contributions for MOIC attribution, not for IRR attribution.
- Option shares reconcile to the confirmed pre/post-grant pool denominator, including other dilution where the plan includes it; strike is a per-share contractual amount, not TEV.
- % proceeds MIP uses `cumulative distributions − |cumulative equity invested|`, floored at zero, including interim dividends.
- Sweet equity: investor values = institutional-strip exit value each year; preferred accrues contractually; management entry value = co-invest amount; increment = 0 at 1×.
- Flag sweet-equity MIP > **20% of common equity** and common equity > **25% of total capitalisation**.
- Management co-invest is separate from MIP; each multi-tranche hurdle is independently tested on pre-MIP MOIC/proceeds.

---

## Scope Boundaries

MIP covers incentive economics for **portfolio company management** in an LBO context only — option pools, % proceeds, sweet equity, profits interests, SARs, and exit/phantom bonuses tied to a PE exit event. Public company equity compensation (RSUs, public stock options, broad-based ESOP) and GP carry / promote structures are handled by separate playbooks. The LBO Model playbook owns the core returns model, debt schedule, and operating forecast into which this MIP schedule is plugged; the Liquidation Waterfall playbook handles term-sheet and LLCA-level liquidation preference analysis distinct from LBO exit modelling.

## Task-specific verification

Option shares follow the confirmed pool denominator; for a post-grant pool including other dilution, use (basic+included other dilution)×pool_pct/(1−pool_pct). Reconcile the resulting pool percentage and avoid counting already-issued shares twice. Option payout uses per-share intrinsic value. % proceeds uses pre-MIP cumulative distributions less total invested and confirmed hurdle, floored at zero, including interim dividends. Unsupported profits-interest/sweet-equity terms require an approved legal payoff model and remain provisional until independently reconciled.


For % proceeds, reconcile cumulative earned incentive, prior actual MIP payments and current exit payment separately. Exit payment cannot exceed the available exit pool; show any unfunded entitlement as a liability/gap, never negative common proceeds. Prior MIP payments enter their actual dated cashflows and are not deducted again at exit.

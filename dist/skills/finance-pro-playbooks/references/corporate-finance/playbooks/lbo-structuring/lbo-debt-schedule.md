# Debt Schedule (LBO)

> **Sections**: Ask First · Workflow · Defaults · Rules & Pitfalls · Pre-Delivery Checks · Scope Boundaries · Task-specific verification
> **Must not skip**: Defaults · Rules & Pitfalls · Pre-Delivery Checks · Scope Boundaries — return here before delivery.
> **Formats**: excel_standards.md · metric_disambiguation.md

> Task `lbo-debt-schedule` in group `lbo-structuring`. Read [`_overview.md`](_overview.md) first for group-level scope, shared defaults, and format dependencies.

**Use when**: Building a standalone LBO debt schedule covering tranche roll-forwards, CFADS, optional repayment waterfall, and credit metrics | **Deliverable**: Excel workbook — capital structure & assumptions block, CFADS bridge, debt waterfall, per-tranche roll-forwards, interest & PIK mechanics (with circularity switch), credit metrics dashboard, and validation block

---

## Ask First
1. What is the entry date, and what is the forecast horizon? *(default: 5 years)*
2. Which tranches are in scope? *(default: Revolver + TLA + TLB; confirm whether mezz, notes, or PIK toggle is required)*
3. What are the base rate inputs — provide SOFR forward curve values for manual hard-coding? *(real-time feeds are not used; see Defaults)*
4. What is the optional repayment waterfall order, minimum cash balance, call premium schedule, and PIK compounding frequency (annual / semi-annual / quarterly)?

---

## Workflow

1. **Lock the assumptions block** — Enter entry EBITDA, leverage multiples, tranche sizes, spreads, mandatory amortization rates, sweep %, minimum cash balance, PIK toggle details, call premium schedule, and SOFR forward curve values as blue hard-coded inputs linked to all downstream driver rows. *(Do this first so every formula below references a single source of truth; no rates are embedded in formulas.)*

2. **Build the CFADS bridge** — Choose one option and apply consistently:
   - **Option 1 (from net income):** OCF = Net Income + D&A + non-cash items (SBC, PIK accrual) ± ΔNWC → FCF = OCF − Capex → CFADS = FCF − mandatory amortization
   - **Option 2 (from EBITDA):** OCF = EBITDA − cash taxes − cash interest ± ΔNWC → FCF = OCF − Capex → CFADS = FCF − mandatory amortization
   - List minimum cash balance as a standalone assumption row; it is the floor that triggers revolver draws.

3. **Build the optional repayment waterfall** — Apply in this sequence each period:
   1. Repay revolver to zero (revolver must be fully repaid before any optional prepayment of term debt)
   2. Apply remaining CFADS above minimum cash to optional prepayments, following the configured tranche order
   - **Cash outflow for any tranche with a call premium = principal × (1 + premium %)**; deduct actual cash spent (principal + premium) from remaining CFADS, not principal alone.
   - Verify that total optional repayments ≤ CFADS for the period.

4. **Build per-tranche roll-forwards** — For each tranche, apply:

   ```
   Opening Balance + Draws − Mandatory Amortization − Optional Prepayment + PIK Accrual = Closing Balance
   ```

   - Repayments and prepayments are **positive quantities** inside the roll-forward (reducing the balance); they appear as **negative (financing cash outflows)** on the cash flow statement. Maintain both sign conventions explicitly.
   - On the maturity date, set mandatory amortization = opening balance (bullet repayment).
   - For the revolver: draws and repayments are driven solely by the minimum cash maintenance logic (Step 5 below); the closing balance must remain within [0, commitment amount].

5. **Build the revolver liquidity mechanism** — The revolver is a **liquidity tool, not a repayment tranche**:
   - Draw revolver when projected cash (before revolver) falls below minimum cash balance; draw only enough to restore minimum cash.
   - Repay revolver when excess cash is available, before any other optional prepayment.
   - Never draw the revolver to fund optional prepayments of other tranches.
   - If the revolver is fully drawn and cash is still below minimum, raise a high-priority flag immediately (see Rules & Pitfalls).

6. **Build interest and PIK mechanics with the circularity switch** — Place the `Circ` toggle cell in the top-left of the sheet:
   - `Circ = 1` → interest calculated on **average balance** = (opening + closing) / 2 *(requires Excel iterative calculation to be enabled — enable before setting Circ = 1)*
   - `Circ = 0` → interest calculated on opening balance *(safe fallback during build)*
   - Formula pattern: `IF(Circ=1, average balance × rate, opening balance × rate)`
   - **Cash interest** flows through CFADS and the income statement.
   - **PIK interest** capitalises into the loan balance (non-cash): add to closing balance via the roll-forward formula; add back as a non-cash item in the cash flow statement; do **not** deduct from CFADS.
   - **Financing fee amortisation** increases book interest expense on the income statement but is non-cash; exclude it from cash interest and from CFADS.
   - PIK compounding formula must match the compounding frequency assumption (annual / semi-annual / quarterly) — link to the compounding assumption cell.

7. **Build the credit metrics block** — Calculate per period:
   - Total Debt / EBITDA; Net Debt / EBITDA; Senior Debt / EBITDA
   - EBITDA / Cash Interest (interest coverage)
   - (EBITDA − Capex) / Cash Interest (fixed charge coverage)
   - DSCR (Debt Service Coverage Ratio)
   - FCCR (Fixed Charge Coverage Ratio)
   - Equity Cushion
   - If covenant thresholds are provided, add compliance check rows and flag any breach in red.

8. **Build the validation block** — Run every check each period; highlight failures in red:

   #### Validation Checks (Per Period)
   | Check | Test |
   |---|---|
   | Cash continuity | Opening cash = prior period closing cash |
   | Revolver bounds | Revolver balance ∈ [0, commitment amount] |
   | Revolver gross-flow reconciliation | Draws and repayments may both occur within a period when supported by dated activity; exclude unexplained circular gross-up and reconcile to closing balance |
   | Waterfall discipline | Total optional repayments ≤ CFADS for the period |
   | Tranche continuity | Each tranche opening balance = prior period closing balance |
   | No negative balances | All tranche balances ≥ 0 |
   | PIK treatment integrity | PIK accrual added back in CFS; PIK not deducted from CFADS |
   | Cash floor | Closing cash ≥ 0 in every period |

---

## Defaults

**Apply defaults only where the caller has not selected a format or supplied a required assumption; disclose them at delivery.**

| Parameter | Default | Rationale |
|---|---|---|
| Forecast horizon | 5 years | Standard LBO holding period |
| Tranches modelled | Revolver + TLA + TLB | Minimum representative capital structure; add mezz/PIK/notes if confirmed |
| Base rate | SOFR forward curve, manually hard-coded as blue inputs | Eliminates live-feed dependency; reviewer can audit every cell |
| Cash sweep % | 100% of excess cash above minimum | Maximises debt paydown; adjust only if credit agreement restricts |
| Call premium | 0% | Conservative base case; override with actual call schedule if provided |
| Optional repayment order | Mezz → Notes → TLB → TLA *(highest spread first)* | Minimises total interest cost; follows market convention |
| PIK tax deductibility | Deductible (treated as accrued interest expense) | Standard treatment; confirm local tax position if jurisdiction is unusual |
| Circularity switch default | Circ = 0 during build; flip to Circ = 1 at completion after enabling iterative calculation | Prevents #REF errors during construction |
| Revolver spread | Linked to TLA spread — not independently hard-coded | Preserves single-source-of-truth for pricing; consistent with typical credit agreement mechanics |

---

## Rules & Pitfalls

**Never:**
- **Never enable Circ = 1 before turning on Excel iterative calculation** — the sheet will immediately return a #REF or circular-reference error and every balance will zero out; this is the single most common debt schedule failure in reviews.
- **Never calculate interest on closing balance only** — using closing balance instead of average balance (Circ = 1) understates interest expense in paydown-heavy periods and overstates it in draw periods, producing a model that does not reflect actual accrual mechanics.
- **Never deduct cash interest twice in the waterfall** — CFADS under Option 2 is already net of cash interest (EBITDA − cash taxes − cash interest); deducting it again in the waterfall double-counts the cash drain and understates repayment capacity.
- **Never deduct PIK interest from CFADS** — PIK is non-cash; deducting it from CFADS understates available cash for debt service and produces an artificially tight liquidity picture.
- **Never draw the revolver to fund optional prepayments of other tranches** — the revolver exists solely to maintain minimum cash; drawing it for prepayments conflates two distinct mechanics, misrepresents liquidity, and violates typical credit agreement restrictions.
- **Never allow closing cash below the confirmed minimum** — a negative cash balance signals a model error; resolve by reducing optional prepayments or drawing the revolver (subject to its commitment limit), then flag if neither is sufficient.
- **Never include financing fee amortisation in cash interest or CFADS** — fee amortisation increases book interest expense on the income statement but consumes no cash; including it overstates cash interest and understates CFADS.

**Conditional:**
- **If the revolver is fully drawn and cash remains below the minimum balance,** do not silently default to a negative cash position — raise a high-priority flag to the user that the model is incomplete and additional equity, a larger revolver, or revised operating assumptions are required.
- **If optional prepayments include a call premium,** the cash outflow equals principal × (1 + premium %); the full cash cost (not just principal) must be deducted from remaining CFADS in the waterfall to avoid overstating subsequent repayment capacity.
- **If a tranche reaches its maturity date,** set mandatory amortisation for that period equal to the full opening balance (bullet repayment); do not carry a residual balance forward.
- **If covenant thresholds are provided by the user,** add per-period compliance check rows beneath each relevant credit metric and apply conditional red formatting on any breach — do not omit covenant tracking when the data is available.
- **If PIK compounding is sub-annual (semi-annual or quarterly),** ensure the PIK accrual formula matches the specified compounding frequency and links to the compounding assumption cell; annual-only formulas applied to quarterly PIK will understate accrued principal.
- **If this schedule is embedded in a full LBO model,** link cash interest and PIK accrual rows directly to the host income statement and cash flow statement rather than duplicating figures — the debt schedule is the single source of truth for all debt-side cash flows.

**Judgment:**
- **Prefer Option 2 (EBITDA-based CFADS) when the operating model is owned separately** — it requires fewer cross-model links and makes the cash interest deduction explicit and auditable.
- **Prefer Option 1 (net income-based CFADS) when building a fully integrated model** — it naturally ties the income statement, working capital, and capex assumptions without rebuilding the tax and interest bridge.
- **Set minimum cash balance as a named assumption cell, not an embedded constant** — reviewers will immediately test whether the floor is realistic, and a named cell makes sensitivity testing straightforward.
- **Default to high-spread-first repayment order (mezz → notes → TLB → TLA) in the absence of a specific credit agreement** — this minimises total interest cost over the hold period and is the convention most PE sponsors and credit teams expect to see.

---

## Pre-Delivery Checks

- Iterative calculation is enabled before `Circ = 1`; test interest response to a closing-balance change.
- Every tranche roll-forward foots; openings equal prior closings and balances are non-negative.
- Cash continuity, cash ≥ 0, revolver bounds, and no simultaneous revolver draw/repayment hold each period.
- Optional repayment ≤ CFADS; callable debt cash flow includes premium.
- PIK is a CFS add-back and absent from CFADS; cash interest is not double-counted.
- Rates/spreads trace to inputs and revolver spread to TLA; fee amortization is excluded from cash interest/CFADS.
- Review directional credit metrics: leverage normally declines and coverage improves under normal CFADS.

---

## Scope Boundaries

This is debt-side mechanics for a standalone or host LBO. **LBO Model** covers the operating build and return analysis; **Dividend Recap** adds mid-hold re-levering. Detailed credit-agreement monitoring beyond the included flag rows is outside scope.

---

## Task-specific verification

Every period must satisfy ending cash≥minimum cash. A fully drawn revolver with cash below the minimum is an unfinanced gap, so the model cannot be complete/ready. Nonnegative cash alone is insufficient.


# Liquidation Waterfall

> **Sections**: Ask First · Workflow · Defaults (apply silently, disclose at delivery) · Rules & Pitfalls · Pre-Delivery Checks · Scope Boundaries · Task-specific verification
> **Must not skip**: Rules & Pitfalls · Pre-Delivery Checks · Scope Boundaries — return here before delivery.
> **Formats**: excel_standards.md · metric_disambiguation.md

> Task `liquidation-waterfall` in group `returns-analysis`. Read [`_overview.md`](_overview.md) first for group-level scope, shared defaults, and format dependencies.

**Use when**: A term sheet, LLCA, or operating agreement requires translation into a scenario-based distribution model | **Deliverable**: Excel workbook containing a terms summary tab (pending confirmation), EV-sensitivity waterfall tab, two distribution line charts, tie-out validation tab, and a 3-sentence executive summary

---

## Ask First
1. **EV range and check size** — What is the investment amount (check size) and the intended EV scenario range? Never assume either.
2. **Pre-money vs. post-money** — Which basis governs ownership percentages? This determines the equity % denominator; confirm before building any ownership column.
3. **Accumulated preference: PIK or cash-pay?** — PIK (non-cash) compounds into the liquidation preference over time; cash-pay does not. If PIK, confirm the investment date, expected exit date, compounding frequency, and exact formula (e.g., `Cost × (1 + rate/4)^(days/365 × 4)`).
4. **Seniority among preferred tranches** — For multi-tranche cap tables, confirm whether tranches rank pari passu or sequentially (senior first); if sequential, list the order.

---

## Workflow

**Phase 1 — Parse the legal document and obtain user sign-off before building**

1. Read the term sheet / LLCA / operating agreement verbatim. Extract: structure type (identify from the 7 types below), liquidation preference multiple, cumulative/PIK vs. cash-pay mechanics, participation rights, cap (if any), anti-dilution provisions, and any MOIC-threshold options or performance warrants.
2. Classify the structure into one of the **7 types**:
   - ① Simple convertible — payout = *greater of Xx liquidation preference or as-converted value*
   - ② Cumulative preferred — preference accrues over time (clarify PIK vs. cash-pay)
   - ③ Step-up multiple — preference multiple increases at defined time thresholds
   - ④ Participating preferred (uncapped) — investor receives preference *plus* pro-rata share of residual
   - ⑤ Participating preferred with cap — participation terminates once investor reaches a specified return cap
   - ⑥ SAFE — apply conversion mechanics per the specific instrument terms
   - ⑦ Hybrid — e.g., participating preferred with an additional dividend layer; flag and apply judgment

   For **edge cases** (anti-dilution adjustments, MOIC-gated options, performance warrants, multi-tranche preferred with mixed seniority) — request additional documentation before proceeding.

3. Present the parsed parameters in a structured summary to the user: structure type, multiples, cumulative terms, cap, seniority order. **Do not write a single formula until the user explicitly confirms the interpretation is correct.**

**Phase 2 — Build the model in tab sequence**

4. **Input tab**: hardcode only confirmed parameters — check size, investment date, exit date (linked to a single `Exit Year` input cell; never hardcode), PIK rate and compounding formula, preference multiple, cap level, fully diluted share count breakdown (preferred / common / options / warrants).
5. **Confirmed scenario header**: label exit TEV or distributable equity proceeds explicitly. Use only the user-confirmed driver and range; derive equity proceeds before applying any recipient payout.
6. **Liquidation preference ladder**: compute the accrued preference for each scenario column using the confirmed PIK/cash-pay formula and the linked exit date. For PIK, calculate day-count precisely from investment date to exit date.
7. **Distribution engine — apply layers strictly in order**:
   - Layer 1 — Liquidation preference (senior preferred first if tranches are ranked; pari passu split if equal rank)
   - Layer 2 — Participation (pro-rata share of residual proceeds after preference is satisfied; do not re-count preference dollars here)
   - Layer 3 — Common stock residual (including option pool, modeled as a separate third category)
   - At each layer, apply the `MIN()` / `MAX()` logic that mirrors the exact legal language; cite the specific clause in a cell comment.
8. **As-converted check**: compute the as-converted payout using fully diluted share count (preferred + common + options + warrants). Where structure type ① applies, output `MIN(available equity pool, MAX(preference, as-converted))`.
9. **Management option pool**: model as a distinct third tranche with its dilutive effect on common residual; display separately in charts.
10. **Low-EV scenario logic**: when distributable equity proceeds < total liquidation preference, allocate 100% to preferred (preference is impaired pro-rata); common receives $0.

**Phase 3 — Tie-out validation layer (build before any output is shown)**

11. For every EV scenario column, calculate and display two check rows:
    - `Sum of ALL enabled recipient proceeds − distributable equity proceeds = 0`
    - `Sum of ALL enabled recipient percentages − 100% = 0; N/M if pool is zero`
12. Flag any non-zero result in red. **Do not deliver the workbook until all checks pass.** Debug before proceeding.

**Phase 3 — Analysis and executive summary**

13. Identify and label the following inflection points across the scenario range:
    - **Dead zone**: EV range where investor is indifferent to performance (pinned at preference floor or participation cap)
    - **Conversion point**: EV at which investor should convert to common (as-converted > preference + participation)
    - **Common stock floor**: minimum EV at which common shareholders receive their first dollar
    - **Double-dip quantification**: incremental dilution to common from participating vs. simple convertible structure at each EV
    - **Ineffective cap**: if the participation cap is set so high it is never reached within the confirmed scenario range, flag it as *de facto uncapped*
    - **Exit-timing sensitivity**: for cumulative/step-up structures, calculate the change in common proceeds from a one-year delay in exit

14. Write the 3-sentence executive summary (place immediately to the right of the assumptions block, not in cell comments):
    - **Sentence 1 — Investor floor**: minimum investor proceeds in a downside scenario and the EV at which that floor applies.
    - **Sentence 2 — Conversion / cap point**: the EV at which payout logic switches (investor converts to common, or participation cap is reached).
    - **Sentence 3 — Common stock threshold**: the EV required before common shareholders see any proceeds.

### Deliverable Tab Map

| Tab | Contents |
|---|---|
| `0_Terms_Summary` | Parsed parameters pending user confirmation; source clause citations |
| `1_Waterfall` | Confirmed TEV/equity/MOIC driver header with explicit denominator and equity bridge, distribution engine, tie-out check rows |
| `2_Charts` | Chart A: $ distribution — investor vs. common (vs. option pool if applicable); Chart B: % distribution — same split; axes must not overlap |
| `3_Validation` | Tie-out results for all scenarios, color-coded |
| `4_Exec_Summary` | 3-sentence summary; inflection point table |

---

## Defaults (apply silently, disclose at delivery)

| Parameter | Default |
|---|---|
| Scenario driver/range | Mandatory caller-confirmed exit TEV / equity proceeds / investor MOIC with explicit denominator |
| EV column increments | Caller-confirmed rounding step; never round inside the economic engine |
| Fully diluted share count basis | All preferred (as-converted) + common + vested/unvested options + warrants |
| Exit Year | Linked input cell, not hardcoded |
| PIK compounding | Use only confirmed legal compounding/day-count; quarterly formula is an example, never an assumed term |
| Day-count for PIK | Actual days from investment date to exit date |
| Option pool | Modeled as third tranche, separate from common |
| Cell comments (clause citations) | Embedded but hidden by default |

---

## Rules & Pitfalls

**Never:**
- **Never build formulas before the user confirms the parsed parameter summary** — a misread of "3x capped participating" vs. "3x non-participating" produces entirely different economics; correcting post-build wastes time and erodes trust.
- **Never override explicit legal language with financial convention** — if the LLCA specifies an unusual calculation, model it verbatim and cite the clause; "this is how it's typically done" is not a valid justification.
- **Never deliver a waterfall with a failing tie-out** — sum of all recipient payouts ≠ distributable equity proceeds signals a mathematical error in the distribution engine; reviewers will catch it instantly and it invalidates the entire analysis.
- **Never use basic share count for the as-converted calculation** — it overstates per-share value and is the fastest credibility-killer with legal and finance reviewers.
- **Never hardcode the exit year** — all time-dependent calculations (PIK accrual, step-up multiples) must link to a single input cell to enable exit-timing sensitivity.
- **Never allow investor proceeds to double-count the preference amount in the participation layer** — the participation layer distributes residual proceeds *after* preference is satisfied; the preference dollars must not re-enter the participation calculation.

**Conditional:**
- **If the term sheet is silent, internally contradictory, or ambiguous on any parameter** — explicitly flag it as an unconfirmed assumption in `0_Terms_Summary`, isolate it so the user can approve or correct it, and do not resolve it by convention.
- **If accumulation is PIK** — increase the liquidation preference balance over time using the confirmed formula and precise day-count; do not treat it as a fixed multiple of original cost.
- **If accumulation is cash-pay** — do not roll cash dividends into the liquidation preference; they are a separate cash flow and do not compound into the preference balance.
- **If multiple preferred tranches exist** — confirm pari passu vs. ranked seniority before building; if ranked, apply senior tranches first and exhaust each before allocating to the next.
- **If distributable equity proceeds < total liquidation preference** — allocate 100% of proceeds to preferred (pro-rata by preference balance if pari passu, senior-first if ranked); common receives exactly $0.
- **If the participation cap is never triggered within the confirmed EV range** — flag the cap as ineffective and note that the structure is economically equivalent to uncapped participating preferred within the modeled range.
- **If edge cases are present** (anti-dilution, MOIC-gated options, performance warrants) — request additional documentation and do not model these features under assumed mechanics.
- **If source reports equity value only** — rebuild EV via the equity bridge (equity value + net debt + preferred + minority interest) before using as the waterfall EV input.

**Judgment:**
- **Express results in decision language, not raw numbers** — "Investor converts to common at EV $240M; below that, investor holds the 2.0x preference floor" conveys the economic inflection far more usefully than a table of dollar amounts.
- **Prefer legal fidelity over analytical elegance** — a model that mirrors the exact contractual mechanics (even if unusual) is more valuable than a cleaner model that silently deviates from the LLCA.
- **Flag hybrid structures explicitly rather than silently resolving them** — a participating preferred with an additional dividend layer (type ⑦) has multiple plausible interpretations; surface the ambiguity and agree on the treatment before building.
- **Treat the dead zone as a key negotiating insight** — a wide dead zone means investor incentives are misaligned with company performance over a meaningful EV range; this is often the most actionable finding for management and boards.

---

## Pre-Delivery Checks

- Every scenario: sum ALL enabled preferred/common/options/warrants/management/escrow recipient payouts = distributable equity proceeds = exit TEV + cash − gross debt − fees − other senior claims ($0 residual).
- Every scenario: all enabled recipient percentages sum to 100% of distributable equity proceeds; when equity proceeds = 0, percentages are N/M.
- PIK uses actual investment-to-exit days; Exit Year is one linked input feeding PIK and step-ups.
- As-converted ownership uses fully diluted preferred + common + options + warrants.
- Type ① payout = `MIN(available equity pool, MAX(preference, as-converted value))`.
- Participation excludes Layer 1 preference dollars.
- Below total preference, common proceeds = $0.
- Scenario driver must be user-confirmed: exit_tev, exit_equity_proceeds, or investor_moic with an explicit investment denominator. Never infer EV from an investor MOIC or override the confirmed range.
- Charts show $ and % distributions without overlapping axes.
- Three-sentence summary is right of assumptions; clause citations are cell comments.
- `0_Terms_Summary` contains user-approved, not analyst-assumed, parameters.

---

## Scope Boundaries

The **Management Incentive Plan** playbook handles management-side exit waterfall modeling (carried interest, hurdle rates, ratchet mechanisms, and incentive equity vesting economics) — hand off when the primary question is how management equity participates rather than how investor preferences are satisfied.

The **LBO Model** playbook handles the returns waterfall in a leveraged buyout context (debt repayment sequencing, sponsor equity returns, and IRR/MOIC to fund) — hand off when the capital structure is debt-driven rather than preferred-equity-driven.

---

## Task-specific verification

For every TEV scenario first calculate distributable_equity_proceeds=max(0,TEV+cash−gross debt−fees−other senior claims). Feed only this equity pool to legal preference/participation/common/options layers; independently verify clause-specific allocations and conservation across ALL recipients. EV=100, debt=80, other items=0 distributes 20. Driver/range, check size, pre/post money and legal terms require caller confirmation.


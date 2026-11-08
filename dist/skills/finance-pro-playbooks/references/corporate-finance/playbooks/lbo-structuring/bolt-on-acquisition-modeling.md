# Bolt-On Acquisition Modeling

> **Sections**: Ask First · Workflow · Defaults · Rules & Pitfalls · Pre-Delivery Checks · Scope Boundaries
> **Must not skip**: Defaults · Rules & Pitfalls · Pre-Delivery Checks · Scope Boundaries — return here before delivery.
> **Formats**: excel_standards.md · metric_disambiguation.md

> Task `bolt-on-acquisition-modeling` in group `lbo-structuring`. Read [`_overview.md`](_overview.md) first for group-level scope, shared defaults, and format dependencies.

**Use when**: Modeling a buy-and-build or roll-up strategy where a platform company executes multiple tuck-in acquisitions over the forecast period | **Deliverable**: Standalone M&A tab (sections A–H) bolt-on to an existing LBO workbook, plus a "With M&A vs. Without M&A" return-comparison summary

---

## Ask First
1. Is the primary acquisition input **EBITDA at acquisition** or **revenue at acquisition**?
2. Should margin expansion be modeled as **post-synergy target margin with a linear phase-in schedule**, or as **annual basis-point expansion**?
3. What is the acquisition debt instrument and structure (e.g., DDTL, revolving credit, term loan)?
4. What are the **acquisition multiple**, **organic growth rate**, and **synergy targets** for the platform?

---

## Workflow

1. **Confirm key assumptions** (primary input type, margin convention, debt instrument, acquisition multiple, organic growth rate, number of acquisitions per year) — do not build until these are locked.

2. **Build the M&A Assumptions Block** — centralize all cohort-level inputs (acquisition EBITDA or revenue, entry multiple, synergy target, phase-in periods, organic growth rate, margin at acquisition, post-synergy margin) in a single input zone at the top of the M&A tab.

3. **Section A — M&A Summary** — aggregate-level acquisition schedule: acquisition year, cohort label, acquisition EBITDA, implied acquisition price, debt drawn, equity injected. This is the control panel; all downstream sections reference it.

- Total new-debt capacity = max(0, covenant maximum leverage × permitted combined EBITDA − opening total debt). Include host debt and previous acquisition draws; cash/debt-like adjustments follow the actual covenant. Test draw against capacity and exit total debt.

5. **Section C — Revenue Triangle** — rows = acquisition cohort year; columns = forecast years. Apply **three-state logic**:
   - Forecast year = acquisition year → enter acquisition-year revenue (back-solved as *EBITDA at acquisition ÷ margin at acquisition* if EBITDA-driven)
   - Forecast year > acquisition year → prior-year cohort revenue × (1 + organic growth rate)
   - Forecast year < acquisition year → 0 (cohort does not yet exist)
   
   Bottom row = cross-cohort sum rolled into the consolidated operating model. (Build before EBITDA triangle because EBITDA = Revenue × Margin.)

6. **Section D — EBITDA Margin Triangle** — same cohort/year structure. For each cohort, margin in year *t* = acquisition margin + (post-synergy target margin − acquisition margin) × linear phase-in fraction. **Phase-in clock starts at each cohort's own acquisition year, not the model's first year.** A 2026 cohort in 2030 should show a more mature margin than a 2030 cohort in the same column, unless the assumption explicitly differs.

7. **Section E — EBITDA Triangle** — each cell = Revenue Triangle × Margin Triangle (same cohort, same year). Bottom row = consolidated M&A EBITDA rolled into the LBO.

8. **Section F — Capex Triangle** — same three-state logic; rows = cohort, columns = forecast year. Apply cohort-level capex as % of revenue (or absolute) consistent with platform capex intensity.

9. **Section G — NWC Balance & Change Triangle**
   - NWC balance: three-state logic, % of revenue convention.
   - **Year-1 deflation (first year of each cohort):** Back-solve the opening NWC balance as *Year-1 Ending Balance ÷ (1 + organic growth rate)*. Year-1 ΔNWC = Ending Balance − Back-solved Opening. This isolates the true working-capital build from scratch and prevents the full balance from inflating Year-1 cash consumption. (This is the single most commonly mis-built cell in the triangle.)
   - Subsequent years: ΔNWC = Ending Balance − Prior-Year Ending Balance, grown on **full-year implied revenue**, not a stub period.

10. **Section H — Acquisition Price Triangle** — acquisition price appears **only on the diagonal** (i.e., only in the cell where forecast year = acquisition year). All off-diagonal cells = 0. This enforces that acquisition spend is recorded once and only once in the FCF bridge.

11. **Roll into the master LBO** — feed consolidated M&A outputs into:
    - Consolidated operating model (revenue, EBITDA)
    - Debt schedule (incremental DDTL draws and repayment)
    - Tax schedule (D&A step-ups if modeled)
    - Free cash flow bridge (deduct acquisition price from Section H; apply ΔNWC from Section G; deduct capex from Section F)
    - Exit & returns (use **combined organic + M&A EBITDA** as the exit multiple base; add cumulative acquisition debt to total debt in the equity bridge; include all M&A equity injections in the MOIC denominator)

12. **Build the "With M&A vs. Without M&A" Return Comparison** — rerun IRR and MOIC using organic-only EBITDA and zero acquisition cash flows. Present side-by-side to isolate the return contribution of the acquisition program. This is the standard IC deliverable for any buy-and-build mandate.

---

### M&A Tab Section Map

| Section | Content | Key Output |
|---|---|---|
| A | M&A Summary | Cohort schedule, acquisition prices, debt/equity split |
| B | Sources & Uses Waterfall | FCF → debt → equity draw per period |
| C | Revenue Triangle | Consolidated acquired revenue by year |
| D | EBITDA Margin Triangle | Synergy phase-in by cohort age |
| E | EBITDA Triangle | Consolidated acquired EBITDA by year |
| F | Capex Triangle | Acquired capex by cohort |
| G | NWC Balance + Change Triangle | ΔNWC with Year-1 deflation |
| H | Acquisition Price Triangle | Diagonal-only spend |

---

## Defaults

**Apply defaults only where the caller has not selected a format or supplied a required assumption; disclose them at delivery.**

| Parameter | Default | Rationale |
|---|---|---|
| Primary acquisition input | Acquisition EBITDA; back-solve revenue = EBITDA ÷ acquisition-year margin | EBITDA is the deal metric; revenue is derived |
| Acquisition timing convention | Beginning-of-year (full-year contribution) | Conservative; matches how sponsors underwrite tuck-ins |
| Margin expansion method | Post-synergy target margin + linear phase-in | Makes synergy realization explicit and auditable |
| Acquisition debt instrument | DDTL subject to maximum leverage constraint | Preserves revolver capacity; limits over-levering |
| Acquisitions per year | 1 | Keeps model tractable; override if deal pace is specified |
| Funding waterfall order | FCF first → acquisition debt draw → equity as residual | Equity is the plug; reflects actual cash deployment priority |
| Leverage test EBITDA | Pre-synergy (conservative) | Avoids borrowing against synergies not yet realized |
| Interest calculation basis | Drawn balance only, not committed facility amount | Matches actual cash interest expense; commitment fees modeled separately if required |

---

## Rules & Pitfalls

**Never:**
- **Never apply organic growth in the acquisition year.** Year-1 cohort revenue/EBITDA uses the acquisition-date figure as entered. Organic growth begins in Year 2 of each cohort's life. Applying growth to the acquisition year is a formula error that inflates early-period cash flows.
- **Never use organic-only EBITDA as the exit multiple base.** Exit TEV must be applied to consolidated (organic + all M&A cohort) EBITDA. Using organic-only materially understates exit value and produces a model that does not survive IC scrutiny.
- **Never omit M&A equity injections from the MOIC denominator.** Every equity check written for an acquisition is invested capital. Excluding it overstates both IRR and MOIC, and the error surfaces immediately when a reviewer ties the equity bridge.
- **Never count acquisition spend twice in the FCF bridge.** Record it once via Section H. The sole exception: when computing NTM exit valuation, deduct "(−) NTM M&A Spend" once from exit proceeds if NTM EBITDA includes EBITDA from acquisitions not yet closed and not yet paid for.
- **Never omit cumulative acquisition debt from total debt at exit.** Including only the original LBO debt in the exit equity bridge understates leverage and overstates equity proceeds to the sponsor.

**Conditional:**
- If the exit multiple is applied to **NTM EBITDA**, either (a) strip out EBITDA from acquisitions not yet closed and not yet funded, or (b) deduct the corresponding acquisition spend from exit proceeds — choose one approach and apply it consistently. Doing neither double-counts value; doing both double-penalizes.
- If the NWC triangle shows Year-1 ΔNWC more than ~3× the Year-2 figure for any cohort, verify that the Year-1 deflation (back-solved opening balance) has been applied. The most common cause of the oversize Year-1 figure is treating the full NWC balance as a Year-1 cash outflow.
- If a single year's acquisition spend exceeds 50% of consolidated EBITDA, flag to the deal team: this may be a transformative acquisition rather than a tuck-in and likely warrants a standalone LBO or merger model rather than bolt-on treatment.
- If post-synergy acquisition margin exceeds the platform's own standalone margin, flag as an assumption anomaly and confirm with the deal team before proceeding.
- If the DDTL capacity is fully drawn in Year 1 of the model, the facility is likely undersized relative to the acquisition program; flag and confirm facility sizing before finalizing the debt schedule.

**Judgment:**
- Model the synergy phase-in clock from each cohort's own acquisition year. A cohort acquired in Year 3 of the model should show younger, lower-margin synergy capture in the same calendar year as a Year 1 cohort showing more mature synergies — unless the assumption is explicitly flat or declining, which itself requires a rationale.
- The "With M&A vs. Without M&A" return comparison is not optional on a buy-and-build mandate. IC committees expect to see the return attribution isolated. Build it as a standard output, not a supplemental.
- Prefer pre-synergy EBITDA for all leverage capacity tests. Borrowing against unrealized synergies is an underwriting assumption a credit committee will reject; building the model conservatively avoids a rework cycle.

---

## Pre-Delivery Checks

**Hard checks:**
- Triangles have no formula errors; pre-acquisition cells are 0 and Section H is diagonal-only.
- Section B Sources = Uses and each DDTL draw is within capacity.
- Cohort margins remain between acquisition and target margins through phase-in.
- Implied acquisition multiple ties to input for every cohort.
- NTM exit applies one, and only one, unfunded-acquisition treatment.

**Flag for review:** Year-1 ΔNWC > 3× Year 2; annual spend > 50% of consolidated EBITDA; cohort margin above platform margin; or DDTL fully drawn in Year 1.

---

## Scope Boundaries

The core **LBO Model** supplies the three-statement model, debt schedule, tax shield, and base returns; this module feeds it and does not rebuild it. A single transformative acquisition needs a standalone LBO or merger model. Synergy diligence and integration planning are outside scope.

---


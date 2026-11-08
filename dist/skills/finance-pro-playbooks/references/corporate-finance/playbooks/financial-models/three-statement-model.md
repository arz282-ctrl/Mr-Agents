# 3-Statement Model

> **Sections**: Ask First · Workflow · Defaults (apply silently, disclose at delivery) · Rules & Pitfalls · Pre-Delivery Checks · Scope Boundaries
> **Must not skip**: Rules & Pitfalls · Pre-Delivery Checks · Scope Boundaries — return here before delivery.
> **Formats**: excel_standards.md · metric_disambiguation.md

> Task `three-statement-model` in group `financial-models`. Read [`_overview.md`](_overview.md) first for shared calculation-model controls and format dependencies.

**Use when**: Building a fully integrated income statement, balance sheet, and cash flow statement for a company | **Deliverable**: Excel workbook with linked IS / BS / CF tabs, supporting schedules, scenario toggle, and BS check row

---

## Ask First

1. **Historical data source** — Is the client providing audited financials, or should you pull from SEC filings? (Private companies with no ticker: leave the data feed blank to avoid #REF errors.)
2. **Forecast period and scenario count** — Confirm years to project and whether three scenarios (Base / Upside / Downside) are required, or a different set.
3. **Revenue architecture** — Does the business have multiple segments? Confirm segment-level build vs. single-line top-down (default to segment-level for any multi-segment company; use single-line only on explicit instruction).
4. **Forecast seed** — Which source drives the projection: broker estimates, consensus estimates, historical extrapolation, or a hybrid (e.g., broker for years 1–2, historical trend from year 3 onward)? Also confirm: detailed COGS build required? Headcount-driven opex required? Tax rate — effective-rate percentage or calculated from statutory + book differences?

---

## Workflow

1. **Build the Assumptions page** — Define every driver (growth rates, margin targets, DSO, DIO, DPO, capex %, tax rate, debt rates, dividend policy) before touching any other tab. All subsequent tabs must pull from here; hard-coded assumptions anywhere else are prohibited.

2. **Plan row layout and reference integrity** — Establish IS, BS, CF and supporting schedules before cross-tab linking where practical. If the requested template or analysis requires inserting rows later, preserve formulas, ranges, named references and chart sources, then recalculate and check dependencies; row insertion is not automatically a broken model.

3. **Build the Income Statement** — Populate historical periods first; normalize them (see Rules & Pitfalls) before extending to forecast years. EBITDA and Adj. EBITDA must appear as explicit line items — never implied.

4. **Build supporting schedules** — In this order, because each feeds the BS:
   - **PP&E schedule**: opening balance → capex additions → D&A charge → disposals → closing balance. D&A flows to IS and CF from here, never calculated inline.
   - **Intangibles / software schedule**: amortization charge flows to IS and CF from here. IS D&A line = sum of all component schedules.
   - **Working capital schedule**: DSO-driven receivables, DIO-driven inventory (feed with ABS(COGS) to ensure positive BS balances), DPO-driven payables. Flag sign conventions explicitly (receivables increase = cash outflow; payables increase = cash inflow).
   - **Debt schedule**: model each tranche separately with opening balance, draws, repayments, closing balance, and interest = average balance × rate. Include commitment fees on undrawn revolver capacity. Aggregate interest flows to a single IS line — do not split tranches on the IS.
   - **Revolver**: code dynamically using MAX/MIN logic — auto-draw when cash falls below the minimum cash floor, auto-repay when cash exceeds it. Revolver balance must remain within [0, facility limit] at all times.

5. **Build the Balance Sheet** — Link line items from supporting schedules and IS. For equity-settled SBC, credit the applicable equity/APIC account and recognize expense or qualifying capitalized cost under the reporting basis; expense reduces net income and therefore retained earnings. Liability-settled awards use their applicable liability accounting. Roll `Closing RE = Opening RE + Net Income − Dividends + applicable direct adjustments`; link opening RE to the prior closing RE, not a hard-coded value. Do not post the SBC expense directly to RE a second time.

6. **Build the Cash Flow Statement** — Derive CFO via the indirect method from the applicable profit starting point. Reconcile each BS movement into cash, non-cash, FX, acquisition and reclassification effects; route only the cash effects to CFO/CFI/CFF. Initial non-cash ROU/lease liabilities, PIK and debt-to-equity conversions are not cash flows. Reconcile opening cash plus net cash flows plus applicable exchange effects to ending cash and the BS on a consistent cash/restricted-cash basis; see the [shared statement rules](../../../metric-dictionary.md#model-reconciliation-and-attribution).

7. **Manage the circular reference with the Circ Switch** — The natural loop is: interest expense → net income → ending cash → revolver balance → interest expense. Procedure: (a) set the Circ Switch cell to 0 while building; (b) once all three statements balance, enable Excel iterative calculation and flip the Circ Switch to 1; (c) interest then calculates on average debt balances for the period. Failing to enable iterative calculation before setting the switch to 1 is a named model error.

8. **Run pre-delivery checks** (see Pre-Delivery Checks section).

---

### Supporting Schedule Structure Reference

| Schedule | Key Line Items | Downstream Destination |
|---|---|---|
| PP&E | Opening NBV → Capex → D&A → Disposals → Closing NBV | D&A → IS; Closing NBV → BS; Capex → CFI |
| Intangibles | Opening → Additions → Amortization → Closing | Amortization → IS; Closing → BS |
| Working Capital | AR, Inventory, AP, Accruals (DSO / DIO / DPO driven) | Balances → BS; Δ Balances → CFO |
| Debt (by tranche) | Opening → Draws → Repayments → Closing; Avg balance × rate = Interest | Interest → IS (single aggregated line); Closing → BS; Draws/Repayments → CFF |
| Revolver | MAX/MIN dynamic draw/repay vs. cash floor and facility cap | Balance → BS; Net movement → CFF; Commitment fee → IS |
| Tax / NOL | Book profit → book-tax differences → taxable income → permitted NOL use → current tax; separate deferred tax and payments | Current + deferred tax → IS; tax balances → BS; actual payments → CF; simplified cash-tax proxy only where justified |

---

## Defaults (apply silently, disclose at delivery)

| Parameter | Default |
|---|---|
| Forecast period | 5 years |
| Scenario count | 3 (Base / Upside / Downside) |
| Revenue build | Segment-level for multi-segment companies |
| Forecast seed (years 1–2) | Broker / consensus estimates |
| Forecast seed (year 3+) | Historical trend extrapolation |
| Interest calculation | Average of opening and closing debt balance × stated rate |
| Revolver mechanics | Dynamic MAX/MIN vs. minimum cash floor |
| Tax basis | Separate current, deferred and cash tax; any simplified EBT/NOL proxy must state its jurisdictional assumptions and limitations |
| Goodwill | Static (no growth) unless an acquisition is modeled |
| EBITDA / Adj. EBITDA | Show reported EBITDA and requested/reconciled adjusted measure separately; SBC add-back is disclosed, not an automatic valuation basis |
| BS check row | `Assets − Liabilities − Equity = 0`; conditional format red if non-zero |
| Merger/centering format | Center across selection (never merge cells) |
---

## Rules & Pitfalls

**Never:**
- **Never use a plug to force the balance sheet to balance.** A plug hides an error rather than resolving it. If BS does not foot, simplify the model or identify the broken link — a plug is an immediate credibility disqualifier in any review.
- **Never round or hard-code values to make numbers tie.** Rounding introduces permanent error that compounds across periods and corrupts sensitivity output.
- **Do not change live model structure without checking dependencies.** Row/column insertion may be supported by the spreadsheet engine, but formulas, hard-coded range strings, names and charts still need recalculation and review.
- **Never hard-code the revolver as zero.** A static zero revolver causes model failure in Downside and stress scenarios — the most common structural defect found in junior models.
- **Distinguish the SBC expense from its offset.** Equity-settled SBC credits equity/APIC, while recognized expense flows through net income into RE. Liability-settled awards may credit a liability. Neither omit the earnings effect nor duplicate it as a direct RE entry.
- **Never calculate D&A inline on the IS or CF.** D&A must originate from the PP&E and intangibles schedules. Treating all D&A as depreciation (ignoring amortization of intangibles, software, etc.) is a named error.
- **Never copy-paste values across tabs in place of live cell references.** Pasting values severs the link without raising an error, producing stale data that silently diverges from the source schedule.

**Conditional:**
- If the company reports Adjusted EBITDA, reconcile it line-by-line against your own normalized EBITDA calculation before projecting. Only use management's figure after the reconciliation confirms it is arithmetically and conceptually consistent.
- If a column header is misaligned by even one period, historical data will be pulled into forecast years. Audit every cross-tab reference against its period column header before delivery.
- If units differ across source documents (thousands vs. millions), standardize to one unit on the Assumptions page and apply a single conversion factor there — never mix units within the model.
- Test the denominator and metric applicability explicitly; display "N/M" for undefined or economically meaningless ratios. A loss year alone does not make every margin invalid. Do not blanket-hide broken references or other model errors with `IFERROR`.
- In zero-growth or loss scenarios, compute current/deferred/cash tax from actual taxable income, book-tax differences, NOL usage limits and recognition rules; do not force tax to zero from growth or EBITDA alone. Test revolver capacity and show any funding shortfall explicitly. Use "N/M" only for ratios with undefined or economically meaningless inputs; other valid ratios remain numeric.
- If the client has an existing model template, use only designated blue input cells and do not overwrite formula cells under any circumstances — even if the existing formula appears incorrect; flag it instead.

**Judgment:**
- Prefer segment-level revenue modeling over single-line top-down even when segment data is incomplete — a rough segment build surfaces mix-shift risk that a single blended growth rate conceals.
- When using a hybrid forecast seed, document the crossover year explicitly on the Assumptions page so reviewers understand where broker estimates end and historical extrapolation begins.
- Normalize at least three years of historical data before projecting. One normalized year is insufficient to establish a reliable trend baseline.
- When SBC is material, show its reported earnings treatment and any requested ex-SBC reconciliation separately. Select a valuation basis consistently with peers, dilution and cash-flow treatment; an SBC add-back alone does not justify a higher value.
- Treat the Circ Switch as a permanent structural element of the model, not a temporary fix — it must remain in place so any collaborator can safely rebuild or audit the circular logic.

---

## Pre-Delivery Checks

- **Verify BS check row = 0 for every period** (Assets − Liabilities − Equity); any non-zero value must be resolved before delivery — conditional formatting should flag it red automatically.
- **Confirm CF ending cash = BS cash via live formula link** (not a hard-coded value) for every period.
- **Self-audit historical periods first**: IS net income must equal the opening net income line on the CF statement; BS cash must equal CF ending cash. Only extend to forecast years after historical periods are clean.
- **Check the cash floor and facility capacity every period**; keep revolver within [0, facility limit]. If liquidity is insufficient, show the shortfall rather than forcing cash to its floor. A period can contain both draws and repayments when dated flows support them; prohibit unexplained circular gross-up.
- **Run line-by-line BS roll-forwards**: opening balance plus signed cash, non-cash, FX, acquisition and reclassification movements equals closing balance. Reconcile cash-flow totals separately; verify non-cash investing/financing items are disclosed rather than forced into CFO/CFI/CFF. Check SBC expense/offset and current/deferred/cash tax links.
- **Flag hockey-stick growth**: any single forecast year showing revenue or EBITDA growth more than 10 percentage points above the prior forecast year must be flagged to the user.
- **Flag terminal-year EBITDA**: if the final forecast year EBITDA exceeds 150% of the last historical year's EBITDA, flag for review.
- **Confirm scenario logic**: after toggling to each scenario, verify all three statements balance, and confirm directionality — Upside > Base > Downside for revenue and EBITDA; Downside > Base > Upside for leverage multiples.
- **Flag DSO > 90 days**, **DIO > 180 days**, **DPO > 120 days**, **leverage > 10×**, or **dividends > net income** — surface each anomaly explicitly rather than allowing it to pass silently.
- **Confirm Circ Switch is set to 1 and iterative calculation is enabled** in Excel settings; verify interest lines are calculating on average balances, not period-end balances.
- **Confirm no merged cells exist** anywhere in the workbook; replace any found with center-across-selection formatting.
- **Audit all cross-tab references for period column alignment** — one column of misalignment pulls historical actuals into forecast cells without raising an error.

---

## Scope Boundaries

DCF valuation (WACC derivation, mid-year convention, terminal value normalization, sensitivity tables, and equity bridge) is handled by the DCF playbook, which treats the 3-Statement model as its upstream input. Comparable companies analysis and precedent transaction analysis (trading and transaction multiple selection, spread, and football field) are handled by their respective comps playbooks. This playbook ends at a balanced, scenario-toggled, fully auditable three-statement model ready to feed downstream valuation work.

---


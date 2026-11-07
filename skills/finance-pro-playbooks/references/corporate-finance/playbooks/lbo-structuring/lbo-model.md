# LBO Model

> **Sections**: Ask First · Workflow · Defaults (apply silently, disclose at delivery) · Rules & Pitfalls · Pre-Delivery Checks · Scope Boundaries
> **Must not skip**: Rules & Pitfalls · Pre-Delivery Checks · Scope Boundaries — return here before delivery.
> **Formats**: excel_standards.md · metric_disambiguation.md

> Task `lbo-model` in group `lbo-structuring`. Read [`_overview.md`](_overview.md) first for group-level scope, shared defaults, and format dependencies.

**Use when**: Building a full leveraged buyout model from deal mechanics through returns and IC presentation | **Deliverable**: Excel workbook — single LBO tab (deal → operating → debt → returns → sensitivity) plus one standalone IC Summary tab

## Ask First
1. What are the entry assumptions — LTM/forward/pro forma EBITDA, entry multiple, and implied purchase price?
2. What is the debt financing structure — senior secured, subordinated, revolver size, and any DDTL tranche?
3. What is the intended hold period and exit multiple assumption, and does the entry or exit fall mid-year (triggering stub handling)?
4. Are any advanced features required — M&A add-ons, dividend recapitalization, management incentive plan (MIP), or earnout? *(Default: all off — confirm before adding complexity.)*

## Workflow

```
Deal Mechanics (transaction details + assumptions + S&U)
→ Financing Assumptions (pro forma debt structure)
→ Operating Model (P&L through net income)
→ Free Cash Flow Build
→ Debt Repayment Waterfall
→ Interest & Debt Schedule (with circular switch)
→ Returns (equity bridge / IRR / MOIC / attribution)
→ Sensitivity Tables
→ IC Summary (standalone tab)

NOTE: All circular cells left blank and linked LAST.
The selected operating case flows through this single LBO tab.
Assumption sets and multi-case toggles may live on separate tabs.
```

**1. Deal Mechanics & S&U**
Build the Sources & Uses side-by-side, same starting row, totals aligned. If rollover equity is specified, use sponsor equity check as the plug; if sponsor equity check is specified, use rollover equity as the plug. Omit irrelevant line items entirely — do not populate with zeros. Use blank columns to accommodate long labels; do not alter column widths. Show pre-transaction debt in the EV-to-equity memorandum. Under cash-free/debt-free convention the seller discharges old debt: do not add it as a buyer Use. Only buyer-direct-payoff/as-is structures include the corresponding payoff or assumed claim once.

**2. Entry Valuation & Equity Bridge**
Match entry and exit multiples to a single consistent metric (LTM / forward / pro forma / run-rate — pick one and hold it throughout). For public targets: quoted price × (1 + control premium) × fully diluted share count (treasury-stock method). For private targets: metric × multiple. In both cases, build the full EV-to-equity-value bridge (EV − gross debt − preferred − minority interest + cash), equivalently (EV − net debt − preferred − minority interest); never add cash twice incorporating the pre-transaction capital structure.

**3. Financing Assumptions**
Set financing fee amortization at total fees ÷ tenor (default 5 years); do not amortize beyond the tranche maturity; keep entirely separate from D&A and PP&E schedules. Where no interest rate is specified, apply current approximate market rates.

**4. Operating Model**
Run a standard P&L through net income. Show **Gross Interest Expense** and **Cash Interest Income** as two separate line items. Never net them into a single "Net Interest" line while also showing a standalone interest income row — pick one presentation and hold it. Default cash interest income rate: **0.5%** on average cash balance.

**5. Free Cash Flow Build**
Standard levered FCF. If entry or exit falls mid-year, apply `YEARFRAC()` to compute partial-year cash flows. Present as: full-year row + stub adjustment row + adjusted total row. Do **not** stub debt amortization inside the FCF build — stub amortization belongs only in the individual tranche's amortization row within the debt schedule (double-stubbing is a model-breaking error).

**6. Debt Repayment Waterfall**
Mandatory repayment order: interest → cash sweep → optional repayment → ending balance. Available cash for optional repayment = beginning cash − minimum cash + operating FCF available for sweep. If available cash is negative, draw the revolver to restore minimum cash (up to the revolver limit). No tranche balance may go negative.

**7. Interest & Debt Schedule (Circular Handling)**
Compute circular interest on **average outstanding balance** `(beginning + ending) / 2` when iteration is enabled. Use `=IF(Circ=1, average_balance * rate, beginning_balance * rate)` for each debt tranche; the `Circ=0` branch is a non-circular **non-zero** opening-balance approximation. Apply the same two-branch principle to cash interest income (`average_cash * cash_rate` versus `beginning_cash * cash_rate`). Link circular cells last, enable iteration only for `Circ=1`, and reconcile resulting cash, debt balances, taxes, and returns under both states. **Deliver with `Circ=0` by default and explicitly disclose the approximation; use `Circ=1` only when iterative recalculation was verified and the user requests that state. Never deliver zero interest merely because circularity is disabled.**

**8. Revolver & Sweep Self-Check**
After completing the debt schedule, run these two self-checks:
- If ending cash far exceeds minimum cash yet sweepable debt remains outstanding → sweep formula is broken.
- If the revolver is drawn in a given year yet ending cash exceeds minimum cash → logic is likely broken (absent specific timing factors).
When the revolver hits its limit, flag this explicitly and recommend facility expansion. In base-case illustrative scenarios, the revolver should not be fully drawn — plug any remaining gap with an equity injection rather than leaving a cash hole.

**9. Returns: IRR and MOIC**
Use **XIRR exclusively** — reference the sponsor cash flow row and the date header row. The first value in the series must be the initial equity outflow (negative); the last value must be the exit proceeds (non-zero). `(MOIC^(1/n)) − 1` may be used only as a cross-check; it is not the primary IRR output when interim cash flows exist.

**10. Exit Valuation & Equity Bridge**
Place the exit EV-to-equity bridge in the same column as the exit-year projection. If transaction fees were assumed at entry, assume the same fees at exit (default: same % of total enterprise value). Where M&A add-ons generate new equity consideration, value that equity using linear interpolation between entry and exit multiples.

**11. Sensitivity Tables**
Build entry multiple × exit multiple as the primary sensitivity grid (two-variable data table). Highlight the base-case cell at the center. Confirm that the base-case cell in the sensitivity table equals the directly computed base-case return.

**12. IC Summary Tab (standalone)**
- Fully formula-driven — zero hard-coded values.
- Target a single PowerPoint slide when the content remains legible; follow any user-specified layout or page count, and split the summary into additional slides when required for readability or material coverage.
- **Left panel**: transaction and valuation assumptions.
- **Center panel**: P&L summary — Revenue, Adj. EBITDA, Net Income, FCF, Cumulative FCF, Net Debt — annual columns including 2 years of historical data.
- **Bottom panel**: returns sensitivity table — entry price ($ but showing implied entry multiple) × exit multiple; base case centered and highlighted.
- Include implied entry and exit valuation multiples.

**13. Returns Attribution (build only if requested — standalone tab)**
Decompose total sponsor return into three components: (i) EBITDA / Revenue Growth, (ii) Multiple Expansion / Compression, (iii) Leverage Paydown. The three components must sum exactly to total return. If management rollover or co-invest is present, adjust the equity check accordingly — confirm treatment with the user before building.

---

## Defaults (apply silently, disclose at delivery)

| Parameter | Default | Rationale |
|---|---|---|
| Minimum cash balance | 2% of current-year revenue | Prevents unrealistic full-sweep scenarios |
| Financing fee amortization period | 5 years | Market convention; do not amortize beyond tranche maturity |
| Debt amortization rate | ≤ 1% p.a. of original principal | Typical institutional term loan amortization |
| Interest rate (if unspecified) | Approximate current market rate | Applied per tranche based on seniority |
| Cash interest income rate | 0.5% on average cash balance | Conservative yield on operating cash |
| IRR formula | XIRR (actual dates) | Handles irregular and mid-year cash flows correctly |
| Advanced features (M&A, div recap, MIP, earnout) | All OFF | Do not add complexity unless explicitly requested |
| Circular switch at delivery | Circ = 0 by default | Preserves non-circular opening-balance interest; use Circ = 1 only after verified iteration |
| New equity consideration in M&A add-ons | Valued at linear interpolation between entry and exit multiples | Avoids arbitrary point-in-time assumption |
| Base-case revolver utilization (illustrative) | Not fully drawn | Gap filled with equity injection; fully drawn revolver is flagged, not accepted |

---

## Rules & Pitfalls

**Never:**
- Never use basic (undiluted) share count for public-to-private entry equity value — it understates dilution and is an immediate credibility failure in any IC review.
- Never present a single "Net Interest" line while also showing a separate interest income row in the same P&L — the double-count corrupts EBITDA-to-FCF reconciliation.
- Never stub debt amortization inside the FCF build when entry or exit falls mid-year — stub amortization belongs only inside the individual tranche's amortization row; doing it in both places double-stubs the cash and overstates debt paydown.
- Never allow any debt tranche balance to go negative — a negative balance signals a broken waterfall and will produce nonsensical IRR outputs.
- Fund M&A from the actual permitted sources and availability. If an acquisition DDTL fully funds a use, do not also draw the revolver for that same use; a permitted revolver-funded acquisition is not inherently invalid.
- Never set the first XIRR cash flow to a positive value — XIRR will return an error or a meaningless result if the initial outflow is not negative.
- Identify any unfinanced cash shortfall explicitly. Do not invent equity injections, extra debt or facility capacity to force the cash floor; model proposed funding only as a labeled scenario within the user's scope and confirmed permissions/terms.
- Never include the same M&A cash flow in both the revolver "draws/repayments" row and the DDTL row — that double-counts the financing source and inflates available liquidity.

**Conditional:**
- If the entry or exit date falls mid-year, apply `YEARFRAC()` to partial-year cash flows and present as full-year row + stub adjustment row + adjusted total row; do not skip the stub or simply use a full-year assumption, because it will misstate the IRR by misaligning cash timing.
- If rollover equity is specified, use sponsor equity check as the S&U plug; if sponsor equity check is specified, use rollover equity as the plug — selecting the wrong plug leaves the S&U out of balance.
- If the revolver reaches its limit in any projection period, flag the constraint explicitly and recommend facility upsizing; do not silently cap the draw and leave a cash shortfall.
- If returns attribution is requested, build it on a standalone tab and confirm management rollover / co-invest treatment before building, because adjusting the equity check retroactively breaks the attribution sum-to-total.
- If the source company reports equity value only (e.g., public market cap without disclosed net debt), rebuild EV via the equity bridge (equity + net debt + preferred + minority interest) before applying any entry multiple.
- If any tax year produces a net loss, model it as either generating a tax shield (via NOL carry-forward) or producing zero tax — never generate a negative tax expense without an explicit NOL mechanism, because it creates phantom cash that inflates returns.

**Judgment:**
- Prefer consistency of valuation metric (LTM / forward / pro forma) over mechanical convenience — a mismatch between entry and exit metric is the most common source of spurious multiple expansion in LBO returns.
- In illustrative base cases, size the capital structure so the revolver is not fully drawn — a stressed revolver at close signals insufficient cushion and undermines the investment thesis before the business has had time to perform.
- When no comparables anchor the exit multiple, default to entry multiple (i.e., zero multiple expansion) and present expansion as upside in the sensitivity table — this is the more defensible IC framing.
- Favor structuring fees and transaction costs symmetrically at entry and exit unless there is a clear reason not to (e.g., strategic acquirer exit) — asymmetric fee assumptions introduce IRR noise that is difficult to explain to an IC.

---

## Pre-Delivery Checks

- Sources = Uses; correct S&U plug is active; post-close `Equity + Total Debt + Other Liabilities = Total Assets`.
- With `Circ = 0`, each debt tranche's interest equals its beginning balance times its rate (and cash interest uses beginning cash); any positive opening balance/rate must produce positive interest.
- With `Circ = 1`, independently recompute average-balance interest after convergence; both switch states reconcile cash, debt, taxes, and returns and disclose their differences.
- Check each tranche and cash-balance interest against the stated formulas and inputs in both switch states; record deviations and do not hide a zero-interest result behind the switch.
- Each period: `Ending Cash = Beginning Cash + Levered FCF − Mandatory Amortization − Optional Repayments − M&A Outflows − Dividends + Equity Injections`; ending cash meets minimum and debt is non-negative.
- Cumulative levered FCF equals cumulative net-debt change before dividends, M&A, and equity injections.
- IRR/MOIC move down with entry multiple and up with exit multiple; sensitivity base case equals direct return.
- Return approximation (`FCF yield + EBITDA growth + multiple movement`) is directionally reconcilable; attribution, if built, sums exactly to total return.
- IC Summary responds to an entry-assumption change; fee amortization stops at tranche maturity and is separate from D&A/PP&E.

---

## Scope Boundaries

Use **LBO Debt Schedule** for debt-side mechanics in isolation. Dividend recaps, granular return decomposition, and MIP are additive overlays handled by their respective playbooks.

---

# Sources & Uses (S&U)

> **Sections**: Ask First · Workflow · Defaults · Rules & Pitfalls · Pre-Delivery Checks · Scope Boundaries · Task-specific verification
> **Must not skip**: Defaults · Rules & Pitfalls · Pre-Delivery Checks · Scope Boundaries — return here before delivery.
> **Formats**: excel_standards.md · metric_disambiguation.md

> Task `sources-and-uses` in group `lbo-structuring`. Read [`_overview.md`](_overview.md) first for group-level scope, shared defaults, and format dependencies.

**Use when**: The S&U table itself is the standalone deliverable or is being independently audited | **Deliverable**: Excel workbook — left/right S&U table (4-column layout) + pro forma capital table with full audit trail, plus two metric reference lines

---

## Ask First
1. What is the transaction type? (LBO entry, M&A, dividend recap, pure refi, take-private, carve-out) — this determines which source and use line items are required.
2. What are the already-sized debt tranches, preferred layers, and rollover amount (in dollars)? Confirm these come from the Debt Schedule — do not re-size here.
3. What is the Purchase Price / TEV, Valuation EBITDA, and Financing EBITDA?
4. What is Cash to Balance Sheet (Day-1 injection) and Minimum Cash (working capital floor)? Confirm these are two separate inputs.

---

## Workflow

1. **Confirm transaction type** (drives which source and use rows are mandatory — do this before touching numbers, because M&A, LBO, take-private, carve-out, and recap each require a different required row set).
2. **Pull in sized debt tranches from the Debt Schedule** — list senior → junior order; do not size tranches here.
3. **Build the left (Sources) side**: Senior debt tranches → Total Debt → preferred layers → Total Preferred → equity block → Total Equity → Total Sources; apply `(x) Financing EBITDA` as the multiplier column for debt and preferred; apply `% equity` for the equity block.
4. **Build the right (Uses) side**: Lead with Purchase Price (TEV) → list fees (advisory separate from financing fees/OID) → Cash to BS → Total Uses; apply `(x) Valuation EBITDA` as the multiplier column for Purchase Price; note that Total Uses `(x)` will exceed entry multiple because it includes fees and Cash to BS — this is expected.
5. **Plug equity from the independent Uses total**: `Total Equity = Total Uses − Total Debt − Total Preferred`; `Cash Equity Check = Total Equity − Rollover`. Then calculate `Total Sources = Total Debt + Total Preferred + Rollover + Cash Equity Check`. Do not refer to Total Sources in the equity plug: that would be circular.
6. **Treat rollover once in the funded S&U identity**: show rollover as a non-cash Source and keep the **gross** purchase price in Total Uses. Show `Cash paid to seller = Gross purchase price − Rollover` only as a separate memorandum calculation, not as another deduction from Total Uses. Never include a rollover Source **and** net down funded Uses by the same rollover.
7. **Separate advisory/transaction fees (expensed) from financing fees/OID (capitalized)**: pull financing fees tranche-by-tranche from the Debt Schedule, not top-down.
8. **Hard-check**: `ROUND(Total Sources − Total Uses, 3) = 0`. Resolve before proceeding.
9. **Build pro forma capital table below S&U**: for every adjustment (+)/(−), hyperlink back to the originating S&U line; structure each row as `Pre-Close + (+) − (−) = Pro Forma`; confirm `Pro Forma Assets = Liabilities + Equity`.
10. **Add two metric reference lines** at the bottom of the table: Financing EBITDA ($ value, used for leverage) and Valuation EBITDA ($ value, used for entry multiple). Both must be populated and reconciled to their respective columns.
11. **Run all Pre-Delivery Checks** before releasing.

### Layout Specification

| Column | Sources Side | Uses Side |
|---|---|---|
| 1 | Line-item name | Line-item name |
| 2 | `(x)` metric (Financing EBITDA for debt/preferred; `% equity` for equity block) | `(x)` metric (Valuation EBITDA for Purchase Price) |
| 3 | $ amount | $ amount |
| 4 | % of Total Sources | % of Total Uses |

**Sources row order**: Senior debt tranche 1 → … → Total Debt → Preferred tranche(s) → Total Preferred → Rollover (non-cash) → Cash Equity Check → Total Equity → **Total Sources**

**Uses row order**: Purchase Price (TEV) → Advisory / Transaction Fees → Financing Fees / OID (by tranche) → Cash to Balance Sheet → **Total Uses**

### Pro Forma Capital Table — Landing Map

| S&U Item | Pro Forma Balance Sheet Treatment |
|---|---|
| Purchase Price | → Goodwill (excess over net assets acquired) |
| Advisory / transaction fees | → Debit retained earnings Day-1 (expensed) |
| Financing fees / OID | → Contra-debt asset, amortized over each tranche's tenor |
| Cash to BS | → Day-1 cash balance |
| Rollover equity | → Equity (non-cash; no cash settlement) |
| Preferred (debt-like terms) | → Between debt and common; flag classification if terms are debt-like |
| Earnouts / contingent consideration | → Contingent liability footnote; **exclude from S&U totals** |

---

## Defaults

**Apply defaults only where the caller has not selected a format or supplied a required assumption; disclose them at delivery.**

| Parameter | Default | Rationale |
|---|---|---|
| Transaction convention | Cash-free / debt-free (CFDF) | PE/M&A market standard: seller retains cash and retires existing debt from proceeds; buyer's Use = TEV |
| Equity sizing method | Residual plug | Equity is not independently sized; it closes the Sources = Uses identity |
| Cash equity check | Total Equity − Rollover | Represents the actual dollar amount the LP wires at close |
| Debt tranche sourcing | Pull from Debt Schedule; never size here | S&U consumes, does not determine, tranche amounts |
| Rollover treatment | Non-cash Source, gross purchase price in Uses; seller cash is a separate gross-less-rollover memo | Cash equity falls by rollover without double-counting or changing Total Uses |
| Advisory/transaction fee treatment | Expensed (debit retained earnings Day-1) | GAAP: not a capitalizable asset |
| Financing fee / OID treatment | Capitalized as contra-debt; amortized over each tranche's tenor, pulled tranche-by-tranche | GAAP: debt issuance cost |
| DDTL at close | $0 drawn; committed amount shown as footnote | DDTL is committed but undrawn; drawn only upon qualifying M&A or capex trigger post-close |
| Pro forma net debt | Closing total debt − Cash to BS | Cash to BS is the operative cash figure; Minimum Cash is a separate operating input and must not substitute |
| S&U balance tolerance | `ROUND(Sources − Uses, 3) = 0` | Sub-cent rounding; any larger gap signals a formula or linkage error |
| ITM threshold for take-private option dilution | Relative to offer price, not unaffected market price | Offer price is the economic event; unaffected market price understates dilution and equity purchase price |

---

## Rules & Pitfalls

**Never:**
- **Never add "Refi of Existing Debt" as a Use in a CFDF transaction** — in a clean cash-free/debt-free deal the seller retires its own debt from the proceeds; including a refi Use double-counts the payoff and inflates Total Uses. Flag any CFDF table where refi > $0.
- **Never size debt tranches inside the S&U** — tranche sizing belongs to the Debt Schedule; the S&U pulls finalized amounts. Sizing here breaks the audit trail and creates circular dependency.
- **Never combine advisory/transaction fees with financing fees/OID into a single fee line** — their accounting treatment is opposite (expensed vs. capitalized contra-debt), and merging them misstates both retained earnings and the debt carrying value on the pro forma balance sheet.
- **Never both record rollover as a Source and deduct it from Total Uses** — doing both double-counts it. Use a gross funded Uses presentation and separate memorandum net seller cash calculation; tie Sources = Uses independently.
- **Never treat buyer stock as a cash Source in an M&A deal** — buyer equity is non-cash consideration; record it as shares × value in the Sources equity block, not as cash. Treating it as cash overstates available funding and misstates the cash equity check.
- **Never use a fixed-exchange-ratio stock deal price at deal announcement as final consideration** — fixed-ratio deals float in value; fixed-value deals float in share count. Build the correct mechanic or flag the deal type.
- **Never record a DDTL as drawn at close** — a committed, undrawn DDTL contributes $0 to Sources at closing; show the commitment as a footnote only.
- **Never double-count target cash in an M&A deal** — target cash reduces TEV via the equity bridge (Purchase Price = Equity Value + Net Debt, where Net Debt = Debt − Cash); do not also add target cash as a separate Source. The buyer's own Cash to BS injection is a separate, distinct item.
- **Never substitute Minimum Cash for Cash to BS** — Minimum Cash is the operating working-capital floor held throughout the hold period; Cash to BS is the Day-1 actual injection. Confusing them misstates both opening liquidity and pro forma net debt.

**Conditional:**
- **If equity plug ≤ $0**, flag immediately — debt and/or preferred are over-financing the deal; reduce leverage or re-examine the capital structure before proceeding.
- **If cash equity check < $0**, flag immediately — rollover exceeds the equity plug; rollover amount must be confirmed and reduced, or total equity sizing must be revisited.
- **If the transaction is a take-private**, build TSM (treasury stock method) using the offer price (not the unaffected market price) to determine diluted share count; use either offer-price TSM OR option net cash settlement, never both. Add only awards/CIC/280G not already included. Bridge to TEV by adding gross assumed debt and subtracting acquired cash once (or adding net debt without a second cash subtraction).
- **If preferred has debt-like terms (mandatory redemption, PIK, fixed maturity)**, flag the balance sheet classification — it may belong with debt rather than mezzanine equity; resolve before finalizing the pro forma capital table.
- **If contingent consideration (earnout) is present**, record it as a contingent liability footnote only; exclude from S&U totals to avoid overstating funded consideration.
- **If Financing EBITDA ≠ Valuation EBITDA**, document the reason explicitly in the metric reference lines — the divergence is sometimes intentional (e.g., different add-back sets for leverage vs. entry multiple) but must be disclosed so reviewers can reconcile leverage and multiple independently.
- **If the deal is not CFDF (as-is or buyer directly wires debt repayment)**, add "Refi of Existing Debt" as an explicit Use and add the assumed debt as a Source; in this case refi > $0 is correct and expected.

**Judgment:**
- **Prefer tranche-by-tranche financing fee pull over a blended rate** — lenders negotiate fees by tranche; a top-down blended allocation obscures true all-in cost per instrument and will fail a detailed debt-cost audit.
- **When Total Uses `(x)` exceeds the headline entry multiple, leave it — do not force alignment** — the excess reflects fees and Cash to BS, which are real economic costs of the transaction; flattening it hides true all-in deal cost.
- **Use Financing EBITDA for all leverage checks and Valuation EBITDA for all multiple checks** — mismatching the two (e.g., using Valuation EBITDA to check leverage) will produce leverage ratios that cannot be reconciled to the credit agreement and will be caught immediately by a credit reviewer.
- **In a mixed-consideration M&A deal, confirm whether the exchange ratio is fixed or the value is fixed before building** — the two mechanics produce opposite sensitivities to buyer stock price movements and require different formula structures.

---

## Pre-Delivery Checks

- `ROUND(Total Sources − Total Uses, 3) = 0`; equity plug and cash equity check are positive.
- Rollover appears as a non-cash Source exactly once; gross purchase price stays in Total Uses and the memorandum cash-to-seller equals gross price minus rollover. Check `Total Equity = Total Uses − Debt − Preferred` and `Cash Equity Check = Total Equity − Rollover`; `TEV = Entry Multiple × Valuation EBITDA`.
- Golden case: gross price 100, fees 5, debt 50, preferred 0, rollover 20 ⇒ Total Uses 105, Total Equity 55, cash equity check 35, Total Sources 105, seller cash memo 80.
- Check the sources-and-uses bridge against the stated formulas on the same currency/unit inputs; differences must resolve before delivery.
- Financing and Valuation EBITDA lines are populated, labeled, and reconcile to their columns.
- `Pro Forma Net Debt = Closing Total Debt − Cash to BS`; assets = liabilities + equity; capital-table adjustments link to S&U.
- Advisory fees debit retained earnings; financing fees/OID are tranche-level contra-debt; DDTL is $0 drawn with footnoted commitment.
- Flag CFDF refi > $0, fees > 5% of TEV, leverage > 10.0×, Cash to BS > 10% of TEV, junior debt > senior debt, or cash equity < 20% / > 70% of Sources.
- For take-privates, TSM uses offer price; buyer stock is non-cash; target cash is not double-counted.

---

## Scope Boundaries

Use this playbook only for a standalone or independently audited S&U. Full LBO, merger, recap, and IPO models contain their own integrated grids; **LBO Debt Schedule** owns tranche sizing and the relevant transaction model owns full three-statement adjustments.

---

## Task-specific verification

Confirm transaction_type. CFDF seller debt payoff belongs in the seller EV→equity memorandum, not buyer Uses; buyer-direct-payoff/as-is structures include it once. Bridge equity purchase price to TEV and reconcile financing Sources=Uses independently.

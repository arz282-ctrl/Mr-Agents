# IPO Model

> **Sections**: Ask First · Workflow · Defaults (apply silently, disclose at delivery) · Rules & Pitfalls · Pre-Delivery Checks · Scope Boundaries
> **Must not skip**: Rules & Pitfalls · Pre-Delivery Checks · Scope Boundaries — return here before delivery.
> **Formats**: excel_standards.md · metric_disambiguation.md

> Task `ipo-model` in group `financial-models`. Read [`_overview.md`](_overview.md) first for shared calculation-model controls and format dependencies.

**Use when**: Building a full IPO pricing and issuance model for a company going public | **Deliverable**: Excel workbook covering offer pricing range, underwriting fees, proceeds waterfall, three-stage pro forma cap table, dilution analysis, implied valuation and multiples, float, lock-up schedule, pre-IPO investor returns, and sensitivity tables

---

## Ask First

1. What is the target raise and primary/secondary share split (company raise versus existing-shareholder sales)?
2. What is the preliminary valuation range or target offer-price range?
3. Are convertible notes, preferred stock, or warrants outstanding that must convert or settle pre-IPO? Confirm conversion terms, anti-dilution provisions, and price caps.
4. For options, RSUs, and warrants, provide the tranche schedule, strikes, vesting status, and settlement method. If any pre-IPO investor group lacks cost basis, confirm before proceeding; do not assume it.

---

## Workflow

1. Set low / mid / high offer prices: mid = blended peer valuation less IPO discount; low/high = ±10–15% of mid. Run downstream modules independently at each point.
2. Convert pre-IPO convertible instruments to common, using adjusted ratios where anti-dilution or price caps apply.
3. Build pre-IPO cap table (Snapshot 1) on FDSO/TSM. Net RSUs at the withholding rate: `net shares = RSU count × (1 − withholding rate)`. For dual class, show economic and voting ownership separately.
4. Define primary shares (new issue; company proceeds) and secondary shares (seller proceeds).
5. Calculate gross spread separately on primary and secondary gross proceeds. `Net primary proceeds = gross primary proceeds − primary spread − other offering expenses`.
6. Build a **company primary-proceeds waterfall** at each price point: gross primary proceeds less primary spread and offering expenses equals net primary proceeds; allocate that net amount among debt repayment, cash to BS, and general corporate purposes. The company S&U excludes secondary proceeds and seller-paid spread. Put secondary proceeds and any secondary greenshoe in a separate selling-shareholder schedule; include only the primary portion of a greenshoe in the corresponding company's incremental proceeds bridge. No debt repayment exceeds its tranche balance.
7. Build post-IPO cap table without greenshoe (Snapshot 2): `post-IPO basic shares = pre-IPO basic shares + primary shares issued`; ownership sums to 100%.
8. Build full-greenshoe cap table (Snapshot 3): greenshoe = 15% of base deal (primary + secondary, pre-greenshoe). Allocate per deal terms; default primary. Do not include it in the base deal.
9. Calculate dilution at each price point; compare pre- and post-IPO FDSO.
10. Calculate pre-money and post-money equity **market capitalization on the same basic or diluted share-count basis**: `pre-money equity = pre-IPO shares × offer price`; `post-money equity ex-greenshoe = pre-money equity + gross primary proceeds` (new primary shares × price). Net primary proceeds belong only in the cash/debt bridge (`gross primary − primary spread − company expenses`), not in the market-cap identity. Compute `EV = post-money equity value + adjusted net debt + preferred + minority interest − non-operating assets` where applicable, using the post-IPO balance sheet. Add primary greenshoe shares/gross proceeds for the full-greenshoe market-cap bridge; secondary greenshoe changes float/holder proceeds, not company cash or shares outstanding.
11. Calculate float: `primary shares + secondary shares sold + greenshoe − DSP allocations`; estimate daily trading volume and flag float <15% or >40%.
12. Build lock-up expiry by holder, shares, date, shares entering market, and post-lock-up float.
13. Compute MOIC and IRR by investor group and round. If cost basis is missing, show `N/A` and request it. For sponsor secondary sales, report net proceeds and remaining unrealized position separately.
14. Build formula-driven, base-centered sensitivities: (i) offer price × valuation multiple; (ii) price × net primary proceeds; (iii) price × dilution; (iv) implied equity value × revenue growth or margin.
15. Run final tie-outs.

---

## Defaults (apply silently, disclose at delivery)

| Parameter | Default |
|---|---|
| Offer price structure | Low / mid / high; mid = peer median less IPO discount; low/high = ±10–15% of mid |
| Greenshoe size | 15% of base deal (primary + secondary, pre-greenshoe) |
| Greenshoe allocation | Primary shares; override for specified secondary or split terms |
| Primary issuance size | 10–20% of post-IPO shares outstanding |
| Lock-up period | 180 days |
| Gross spread — deal < $500M | 7% |
| Gross spread — deal $500M–$2B | 5–6% |
| Gross spread — deal > $2B | 3–4% |
| FDSO methodology | TSM for in-the-money options and warrants; out-of-the-money options = zero dilution |
| RSU withholding | 40% net settlement: `RSU count × 0.60` |
| IPO discount benchmark | % discount to peer-group median |
| Valuation snap points | Pre-money / post-money ex-greenshoe / post-money incl. full greenshoe |
| Cap-table snapshots | Pre-IPO / post-IPO ex-greenshoe / post-IPO incl. full greenshoe |
| Proceeds-waterfall plug | General corporate purposes / cash to balance sheet |

---

## Rules & Pitfalls

**Never:**
- Commingle primary and secondary proceeds in company cash, net debt, EV, or the waterfall.
- Apply gross spread to combined primary and secondary proceeds.
- Build pre-IPO FDSO before converting all convertible instruments.
- Add option shares directly to basic shares; apply TSM tranche by tranche at each strike.
- Hard-code a sensitivity-table output.
- Impute missing investor cost basis.
- Double-count greenshoe in the base deal.
- Use pre-IPO net debt for post-IPO EV.

**Conditional:**
- If anti-dilution or price caps apply, use the adjusted conversion ratio; if terms are absent, stop and request them.
- If greenshoe is secondary, exclude its proceeds from company cash.
- If a directed share program exists, subtract it in the float formula.
- If dual class, maintain separate economic and voting ownership columns.
- If sponsor sell-down, post-listing operations, MIP, or LBO debt/tax schedules are required, use the sponsor-exit module.
- If offer price changes, update the price input only; operating forecasts remain independent and mechanics repopulate through links.

**Judgment:**
- Benchmark discount to peer median and retain the displayed basis.
- Use general corporate purposes for uncommitted proceeds.
- Default greenshoe to primary unless deal terms specify otherwise; confirm with coverage banker.
- Override 40% RSU withholding for deal- or jurisdiction-specific rates and document the source.
- Use all three price points, not just midpoint, for downstream outputs.

---

## Pre-Delivery Checks

- Waterfall foots at every price point: total uses = net primary proceeds.
- `Post-IPO basic shares = pre-IPO basic shares + primary shares issued` at each point.
- Greenshoe is exactly 15% of base deal.
- Gross spread dollars equal rate × gross proceeds, separately for primary and secondary.
- Ownership totals 100% in all three cap-table snapshots; FDSO ≥ basic shares.
- `Pre-money equity + gross primary proceeds = post-money equity (ex-greenshoe)` at each price point, with consistent share basis; company cash increases by **net** primary proceeds less allocated uses.
- Golden case: pre-IPO basic shares 100m × $10 = $1,000m; 20m new primary shares ⇒ $200m gross, $14m primary fees ⇒ $186m net; post-money market cap $1,200m, not $1,186m. Secondary seller shares never enter company cash.
- Check the IPO equity/proceeds bridge at each offer-price point on the same share basis/units; market-cap bridge difference must be zero and company cash must reflect net primary proceeds only.
- EV uses post-IPO adjusted net debt consistently across multiples.
- Flag IPO discount <5% or >35%; primary issuance >30% of post-IPO shares; float <15% or >40%.
- Multiples rise and dilution falls as offer price rises.
- Secondary proceeds are absent from company cash/Sources & Uses flow.
- No debt repayment exceeds its individual tranche balance.
- All four sensitivity tables are formula-driven with base case centered.

---

## Scope Boundaries

The operating forecast—IS, BS, CF, and KPI projections—remains in a linked 3-statement or LBO model; IPO terms never modify it. This task consumes FDSO/TSM schedules. PE sponsor exit work, including sell-down, post-listing operations, LBO debt/tax, MIP, and sponsor MOIC/IRR, uses the LBO Model, applicable financing/returns Playbooks and MIP Modeling as needed; there is no separate bundled sponsor-exit module.

---

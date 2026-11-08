# Fully Diluted Share Count

> **Sections**: Ask First · Workflow · Defaults (apply silently, disclose at delivery) · Rules & Pitfalls · Pre-Delivery Checks · Scope Boundaries · Task-specific verification
> **Must not skip**: Rules & Pitfalls · Pre-Delivery Checks · Scope Boundaries — return here before delivery.
> **Formats**: excel_standards.md · metric_disambiguation.md

> Task `fully-diluted-share-count` in group `valuation`. Read [`_overview.md`](_overview.md) first for group-level scope, shared defaults, and format dependencies.

**Use when**: Building a point-in-time valuation dilution schedule; distinguish it from actual outstanding shares for quoted market capitalization and weighted-average diluted shares for accounting EPS | **Deliverable**: Formula-driven dilution schedule in the requested medium

## Ask First
1. Which company and as-of date should be used?
2. Should the share price be the latest closing price, or a specific transaction/reference price?
3. Is the output format Excel (default) or chat summary?
4. Are there any known convertible notes, multiple share classes, or non-standard settlement warrants that require special handling?

## Workflow
1. **Confirm scope** — lock in company, as-of date, share price source, and output format before pulling any data.
2. **Build the General Details header block** — populate: as-of date, ticker, share price used, filing(s) sourced, currency, latest FYE, latest FQE. (Establishes audit trail before any arithmetic begins.)
3. **Identify all dilutive securities from the most recent 10-K or 10-Q** — enumerate every security type: RSU, RSA, PSU/PSA, stock options, warrants, SARs, ESPP, and any other instrument disclosed. Create one row per security type even if the dilutive impact is zero or N/A. (Omitting a row class is a compliance gap, not a space-saving measure.)
4. **Pull per-tranche data** — for each tranche record: exercise/strike price, shares outstanding, and vested/unvested split where disclosed.
5. **Apply TSM tranche by tranche** — do not aggregate tranches before computing:
   - Gross proceeds = strike price × shares in tranche
   - Shares repurchased = gross proceeds ÷ current share price
   - Net dilution = shares in tranche − shares repurchased
   - For RSU / RSA / PSU / PSA (zero cost basis): net dilution = all shares outstanding in tranche (no repurchase offset).
6. **Apply special-case logic** before summing (see Rules & Pitfalls).
7. **Sum the FDSO table** — Basic shares outstanding (BSO) + total net dilution from all tranches = Total FDSO.
8. **Run all pre-delivery checks** (see Pre-Delivery Checks section) before finalising the file.
9. **Disclose sources** — annotate each data input with a cell comment (Excel) or inline citation (chat) referencing the specific filing and page/exhibit.

### Deliverable Tab Layout

| Block | Contents |
|---|---|
| **General Details** | As-of date · Ticker · Share price & source · Filing(s) used · Currency · Latest FYE · Latest FQE |
| **FDSO Calculation** | One row per security type; columns: tranche description · strike price · shares outstanding (vested) · shares outstanding (unvested) · gross proceeds · shares repurchased · net dilution |
| **Total FDSO** | BSO + sum of all net dilution rows = Total FDSO |

---

## Defaults (apply silently, disclose at delivery)

| Parameter | Default / override |
|---|---|
| Share price | Latest closing price; use requested transaction/reference price instead |
| Output format | Formula-driven single-tab Excel; chat if specified |
| PSU / PSA achievement rate | 100% of target; use and flag a disclosed different rate |
| Shares by vesting status | All outstanding (vested + unvested); exclude exercised, forfeited, expired |
| BSO source | Most recent cover page or balance sheet, whichever is closer to as-of date |
- ESPP issuance requires a sourced purchase-volume estimate; authorization alone is insufficient.

## Rules & Pitfalls

**Never:**
- Never substitute GAAP diluted weighted-average shares for FDSO — GAAP diluted shares are time-weighted over a reporting period and already incorporate an average-price TSM adjustment; they are not a point-in-time FDSO and will systematically understate or misstate dilution. This is the single fastest credibility killer with buy-side reviewers.
- Never produce a negative net dilution figure for any tranche — if the strike price exceeds the current share price (out-of-the-money), net dilution is exactly zero; label the tranche "anti-dilutive" and leave the dilution cell at zero.
- **Separate convertible share settlement from debt claims** — obtain a complete settlement/conversion bridge from confirmed terms or a reviewed separate schedule. For valuation, reconcile converted shares and removal of the same debt claim; an accounting EPS if-converted calculation additionally adjusts the earnings numerator where applicable. If unsupported, label the share count incomplete rather than calling it Total FDSO.
- Never merge multiple warrant tranches with different strike prices into a single row when those warrants are cash-less / net-share-settled — each tranche must be computed independently and shown on its own row.
- Never double-count participating RSAs that are already included in the basic share count under the two-class method — read the filing to confirm treatment before including them in the dilution section.
- Never perform arithmetic across line items before confirming all units are on the same basis (thousands vs. millions) — convert all figures to a single unit first.

**Conditional:**
- If warrants are cash-less or net-share-settled (no cash exercise), replace the standard TSM formula with the net-settlement formula: net dilution = gross shares × (market price − strike price) / market price. Apply per tranche; do not aggregate tranches first.
- If a company has multiple share classes, display each class on a separate row and sum to Total FDSO. If the classes carry different economic rights (e.g., different per-share merger consideration), flag for confirmation before computing total equity value — a blended or class-specific price approach may be required. If the classes differ only in voting rights (standard dual-class structure), sum directly without further adjustment.
- If PSU/PSA performance achievement is disclosed at a rate other than 100% in the filing or merger agreement, use the disclosed rate and flag the deviation from the 100% default.
- If BSO data is sourced from multiple filings (e.g., basic shares from the most recent 10-Q cover page, option strike-price schedules from the prior 10-K), use the most recently available data for each input, note the specific filing source for each, and flag the cross-filing splice to the user.
- If participating RSA shares appear in the basic share count under the two-class method, confirm via filing before including them in the dilution rows to avoid double-counting.

**Judgment:**
- Prefer the cover page share count over the equity rollforward balance sheet figure when the two differ, because the cover page is updated to a more recent record date — but always reconcile both and note the discrepancy if it is material.
- Flag total dilution exceeding 15–20% of BSO as potentially anomalous even if every tranche calculation is mechanically correct — this threshold is a data-integrity prompt, not a hard cap, and the cause (large option overhang, heavy PSU grants, etc.) should be explained to the user.
- When filing data is ambiguous on vesting status, include all outstanding shares (vested and unvested) rather than restricting to vested only — erring toward full inclusion is the conservative and defensible position for valuation purposes.

---

## Pre-Delivery Checks

- Filing currency and cover-page BSO-to-equity-rollforward reconciliation are current; material discrepancy is flagged.
- All figures use one unit; every disclosed security has a row and every input has a source annotation.
- OTM tranches equal zero, no tranche exceeds gross shares, `FDSO ≥ BSO`, and dilution above 15–20% of BSO is explained.
- Total FDSO includes a complete convertible settlement/if-converted bridge. If excluded, label FDSO excluding convertibles / incomplete and keep provisional; it cannot support complete per-share valuation. Never use GAAP weighted-average diluted shares.

## Scope Boundaries
This task builds point-in-time dilution inputs. Quoted market capitalization uses current price × actual outstanding shares by economic class; a diluted equity value is a separately labeled valuation convention. Accounting diluted EPS uses the applicable weighted-average denominator and anti-dilution/numerator rules. Valuation per-share and transaction models use the selected settlement/TSM/if-converted basis with matching cash/debt adjustments. Unsupported convertible terms require a reviewed separate schedule and an incomplete-result label.

## Task-specific verification

Authorized ESPP shares are not expected next-purchase issuance. Missing purchase amount/participation/price/discount yields insufficient_data; an explicit user-approved estimate needs sensitivity and source. Convertible exclusion means incomplete FDSO, never Total FDSO for complete per-share output.


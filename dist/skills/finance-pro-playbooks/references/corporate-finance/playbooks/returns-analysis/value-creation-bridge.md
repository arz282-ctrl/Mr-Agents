# Value Creation Bridge

> **Sections**: Ask First · Workflow · Defaults (apply silently, disclose at delivery) · Rules & Pitfalls · Pre-Delivery Checks · Scope Boundaries · Task-specific verification
> **Must not skip**: Rules & Pitfalls · Pre-Delivery Checks · Scope Boundaries — return here before delivery.
> **Formats**: excel_standards.md · metric_disambiguation.md

> Task `value-creation-bridge` in group `returns-analysis`. Read [`_overview.md`](_overview.md) first for group-level scope, shared defaults, and format dependencies.

**Use when**: An LBO model is complete and the sponsor needs equity value change from entry to exit decomposed by dollar contribution and MOIC attribution | **Deliverable**: Excel workbook — side-by-side $ and MOIC(x) bridge table, waterfall chart (summary + detailed versions), foot/tie-out check rows

---

## Ask First
1. Is the LBO model fully linked with no hard-coded values? (Required before building — this playbook assumes full formula linkage throughout.)
2. What holding period and exit date should the bridge reflect?
3. Are there inorganic events (tuck-in M&A, de novo, divestitures, sale-leaseback) in the model that need separate line items, or should they roll into a single inorganic bucket?
4. Does the entry multiple in the model include transaction fees in the numerator (i.e., total acquisition cost ÷ EBITDA)? If yes, fees must be stripped before computing organic growth and multiple expansion components.

---

## Workflow

**Step 1 — Establish consistent equity and contribution bases**
Start from entry common equity on the same ownership/claim basis as exit common equity. Reconcile purchase EV, closing debt/cash, preferred/NCI claims and rollover; acquired target equity value is not automatically the sponsor's entry equity basis after acquisition financing. Sponsor cash contribution separately includes the equity-funded purchase/fees; total contributions = initial cash check + all follow-on injections, excluding borrowed funds. Apply sponsor ownership/waterfall allocation consistently before calculating sponsor MOIC.

**Step 2 — Build TEV growth components (Layer 1 of bridge)**
Decompose the change in Total Enterprise Value from entry TEV to exit TEV into the following line items; include only components present in the model and suppress zero rows:

| Component | Formula / Source |
|---|---|
| Organic revenue growth contribution | Δ organic revenue × entry EBITDA margin × entry multiple |
| Margin improvement contribution | Organic TEV growth − revenue growth contribution (residual) |
| Cost savings | Cost savings EBITDA × exit multiple |
| Sale-leaseback rent effect | Signed change in normalized EBITDA from rent × matching exit multiple; cash proceeds are attributed once through their actual use below |
| Exit-date tax asset | Add separately only when not already in the valuation/cash flows; never multiply a currency PV by an EBITDA multiple |
| De novo contribution | De novo EBITDA × exit multiple |
| Tuck-in M&A contribution | Tuck-in EBITDA × exit multiple |
| Transformative M&A contribution | Transformative EBITDA × exit multiple |
| Divestiture | Show as negative TEV growth component; route proceeds through net debt line |
| Multiple expansion / contraction | Δ multiple × **organic-only** exit EBITDA (see covariance rule below) |

**Covariance handling (apply consistently, disclose in footnote):**
- Default convention: absorb the cross-term into multiple expansion.
  - Organic growth uses: entry multiple × Δ organic EBITDA
  - Multiple expansion uses: Δ multiple × exit EBITDA (organic basis only)
- Valid alternative: growth = delta organic EBITDA × exit multiple; expansion = delta multiple × entry organic EBITDA. This also includes the cross-term exactly once.
- Both exit bases double-count the cross-term; both entry bases omit it. Label the convention and reconcile to the exact EV change; see [shared bridge identities](../../../metric-dictionary.md#model-reconciliation-and-attribution).

**Step 3 — Build TEV-to-equity adjustments (Layer 2 of bridge)**
Apply these adjustments to bridge the change in TEV from entry common equity to exit common equity. Allocate to sponsor proceeds only after reconciling ownership and the waterfall; do not mix all-investor equity and sponsor-only fees/MIP in one basis.

| Item | Sign | Source |
|---|---|---|
| Actual exit fees not already embedded | (−) or zero | Deduct only incremental exit cash fees; entry fees are in initial contributions, and holding fees already in cash/net debt are not deducted again |
| MIP / management incentive plan payout | (−) or zero | Actual waterfall payout on the same investor basis; apply confirmed hurdle/tier terms |
| Interim dividend sweep | Memo, excluded from exit equity | Include once in cumulative sponsor distributions/MOIC numerator |
| Interim recap distribution | Memo, excluded from exit equity | Include once in distributions; recap debt increases exit net debt |
| Net debt repayment / (increase) | (+/−) | Entry net debt − exit net debt (captures both debt paydown and cash build) |
| Preferred equity accretion | (−) | Per model |
- Track follow-on funding in sponsor contributions and the cash/net-debt bridge; do not deduct it twice from exit value.

**Step 4 — Compute exit equity value and foot the bridge**
Sum Step 1 entry common equity + Step 2 TEV growth + Step 3 adjustments = implied exit common equity. Tie this to the waterfall on the same all-investor basis, then reconcile sponsor allocation. For a sponsor-only bridge, apply ownership and claim changes consistently to every line. Insert a check row:

```
Bridge-implied exit equity  −  Waterfall exit equity  =  Residual
Flag if |Residual| > $0.1M
```

Convert every dollar line to MOIC contribution: Component $ ÷ Total equity contribution. Insert a second hard check row:

```
(Exit equity bridge + interim distributions) / total sponsor contributions − independently calculated MOIC  =  Residual
Flag if |Residual| > 0.01x
```

Do not deliver until both checks clear.

**Step 5 — Build the waterfall chart**
- First bar: entry equity (grounded, anchored at zero baseline)
- Last bar: exit equity (grounded)
- Intermediate bars: floating, one per bridge component
- Label each bar with $ value and the driving assumption (e.g., "+500bps margin improvement", "+2.0x multiple expansion", "−$15M fees")
- Produce two versions: summary (major categories) and detailed (all line items)
- Size for PPT slide embed

---

## Defaults (apply silently, disclose at delivery)

| Parameter | Default |
|---|---|
| Build order | $ attribution first, then ÷ total equity contribution for MOIC(x) |
| Covariance convention | Absorb into multiple expansion (organic at entry multiple × ΔEBITDA; expansion at Δmultiple × organic exit EBITDA) |
| Inorganic component valuation | Exit multiple applied to inorganic EBITDA |
| Multiple expansion EBITDA base | Organic-only exit EBITDA (M&A / de novo / cost savings EBITDA excluded) |
| Fees | Track entry/holding/exit timing; show only additional exit deductions below TEV, with no second charge for costs already in contributions or net debt |
| MOIC denominator | Initial equity check + all subsequent equity injections during hold |
| Net debt | Entry net debt − exit net debt (gross debt offset by cash) |
| Tax shield treatment | Separate exit-proceeds line only if not already valued elsewhere; no EBITDA multiple on a currency PV |
| Divestiture treatment | Displayed as negative TEV growth component; proceeds routed to net debt line |
| Zero-contribution rows | Suppressed |
| Waterfall chart default | Summary (major categories) sized for PPT |
| EBITDA definition consistency | Entry and exit use the same basis (LTM / NTM / run-rate); any mismatch disclosed |

---

## Rules & Pitfalls

**Never:**
- **Use net debt in the net-debt change line** — gross debt alone omits changes in eligible cash. The error direction depends on whether cash increased or decreased; include recap debt and cash movements once.
- **Never multiply a tax-asset PV by an EBITDA multiple or add it twice** — a separate exit add-on is valid only if its benefit is not already reflected in valuation, projected taxes, cash or another proceeds line.
- **Do not double-count or omit the covariance cross-term** — growth at entry multiple plus expansion on exit EBITDA is valid; growth at exit multiple plus expansion on entry EBITDA is also valid. Both exit bases double-count, and both entry bases omit, the cross-term.
- **Never use organic-exit EBITDA inclusive of M&A / de novo / cost savings EBITDA as the base for multiple expansion** — this double-counts inorganic contributions in the expansion line and overstates organic-driven value.
- **Never omit subsequent equity injections (M&A deployment, operating-loss funding) from the MOIC denominator** — using only the initial check understates the true equity basis and artificially inflates MOIC.
- **Use the actual MIP plan** — a flat percentage is valid only if that is the confirmed contractual payoff; otherwise apply its hurdles, tiers, vesting and ownership basis. Never replace the actual waterfall with an assumed percentage.
- **Never deliver a bridge that does not foot** — a MOIC residual above 0.01x or a dollar residual above $0.1M means a component is mislabeled, double-counted, or missing; stop and debug before sharing.

**Conditional:**
- **If the entry multiple is reported on a fully-loaded basis (total acquisition cost including fees ÷ EBITDA):** strip fees out and recompute a clean entry multiple before calculating organic growth and multiple expansion; failure to do so distorts both components.
- **If the model contains business segments or product lines:** decompose organic revenue growth and margin improvement at the segment level first, then aggregate; segment-level detail is available to support quantity / price / mix attribution.
- **If a divestiture is present:** either (a) restate entry financials on a RemainCo basis, or (b) default — show divestiture as a negative TEV growth component and route proceeds through the net debt line; disclose the treatment chosen.
- **If the model includes a dividend recap:** the associated debt increase must appear in the net debt repayment line (reducing net repayment or turning it negative); routing only the cash proceeds through dividend recap net proceeds without adjusting net debt double-counts the benefit.
- **If a non-default covariance convention is used:** state it explicitly in a table footnote and verify it is applied consistently across every component in the bridge.

**Judgment:**
- **Prefer organic-at-entry-multiple convention for covariance** — attributing the cross-term to multiple expansion is the industry-conservative default because expansion is the less controllable driver; use it unless the LP specifically requests an alternative.
- **Flag leverage-dominant returns proactively** — when debt repayment contribution exceeds organic EBITDA growth contribution, disclose this explicitly in the summary; LPs distinguish between "earned" returns and "financial engineering" returns, and obscuring this is a credibility risk.
- **Classify fees by timing before presentation** — entry fees funded in the sponsor check affect the MOIC denominator; fees paid from company cash affect cash/net debt; only exit deductions not captured elsewhere reduce exit proceeds separately. A summary fee row must preserve this once-only reconciliation.
- **Verify the organic exit EBITDA subtraction explicitly** — when building organic-only exit EBITDA, confirm that M&A EBITDA, de novo EBITDA, and cost-savings EBITDA are each subtracted; it is the single most common computation error and leads to overstated organic growth attribution.

---

## Pre-Delivery Checks

- MOIC contributions foot to independently calculated MOIC within **0.01x**; dollar contributions foot to exit-waterfall equity within **$0.1M**.
- Bridge-implied exit equity = exit-waterfall common equity.
- Organic + M&A + de novo + cost savings + divestiture adjustment = consolidated exit EBITDA.
- Total equity contribution = initial sponsor check + all subsequent injections; reconcile to capital account.
- Net debt = entry net debt − exit net debt, including recap debt increase.
- Organic-only exit EBITDA excludes separately attributed M&A, de novo and cost-savings components. A separate tax-asset PV is included only if not already reflected in valuation or cash flows.
- Signs/bases: actual incremental exit fees and MIP deductions are nonpositive (zero is valid); preferred accretion reduces common equity. Entry/holding fees and SLB proceeds occur once in their actual funding/cash/distribution rows. Sweep/recap distributions are outside exit equity. Reconcile sponsor ownership before computing sponsor MOIC.
- Investigate/disclose: organic EBITDA growth > **60%** on a hold < **3 years**; multiple expansion > **50%** of value creation; debt repayment > organic EBITDA growth; fee drag > **5%** of entry equity; MIP > **15%** of gross equity proceeds; or net debt increasing at exit.

---

## Scope Boundaries

The **IRR Decomposition** playbook handles attribution of IRR percentage (not dollars or MOIC) and introduces Base Unlevered Yield, Fully-Loaded TEV, and cash sweep timing mechanics — run that playbook when the audience requires a rate-of-return attribution rather than an equity-value attribution.

Exit waterfall construction (common equity, preferred stack, MIP tier calculations) is a prerequisite input to this playbook, not built here; confirm the waterfall is finalized before beginning Step 1.

---

## Task-specific verification

Use a single invariant: exit equity=entry equity+ΔTEV+(entry net debt−exit net debt)+actual equity-proceeds adjustments. Follow-on equity belongs once in total contributions/MOIC denominator and financing cashflows; do not subtract it again from exit equity. Dividends are separate sponsor distributions. If using net M&A value creation, the M&A line is exit value minus purchase price and cannot be mixed with a gross ΔTEV bridge.


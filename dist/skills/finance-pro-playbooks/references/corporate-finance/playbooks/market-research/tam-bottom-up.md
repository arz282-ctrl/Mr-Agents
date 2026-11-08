# Bottom-Up TAM Sizing

> **Sections**: Ask First · Workflow · Defaults (apply silently, disclose at delivery) · Rules & Pitfalls · Pre-Delivery Checks · Scope Boundaries · Task-specific verification
> **Must not skip**: Rules & Pitfalls · Pre-Delivery Checks · Scope Boundaries — return here before delivery.
> **Formats**: excel_standards.md

> Task `tam-bottom-up` in group `market-research`. Read [`_overview.md`](_overview.md) first for group-level scope, shared defaults, and format dependencies.

**Use when**: You need a defensible, auditable TAM/SAM/SOM build for a SaaS or tech-services business where the buyer universe can be enumerated | **Deliverable**: Excel workbook with tabs for Market Definition, Logo Universe, Penetration & Pricing, TAM/SAM/SOM Summary, Greenfield & Switching Opportunity, Scenarios/Sensitivity, and Sources

---

## Ask First

1. **Competitive position**: Is the subject an incumbent or a new entrant? What is the category lifecycle — emerging, growth, or mature?
2. **Audience & decision**: Who is this for (IC, board, due diligence), and what decision does it support?
3. **Segment & geography**: What SaaS sub-vertical? Single region or multi-region?
4. **Pricing model**: Flat per-logo, per-seat, usage-based, modular (with attach rates), or hybrid? Do not default to flat — confirm before building.

---

## Workflow

1. **Define market scope and build the header table** — document category, geography, subject's competitive position, and audience.

2. **Build the logo universe by tier** — enumerate all potential buyer logos, segmented at minimum by Enterprise vs. SMB (different ASPs require separate tiers). Hard-code total logos as the universe constant. Deduplicate across tiers and geographies (e.g., strip S&P 500 names out of a Russell 2000 count; no cross-region overlap).

3. **Build penetration assumptions** — model current and year-end forecast penetration by tier, including **"% of maximum penetration"**; apply the terminal-penetration flags in Rules & Pitfalls.

4. **Build pricing inputs** — apply the confirmed model: seats/logo (per-seat), consumption/logo (usage), or module attach rates and ASPs (modular).

5. **Calculate ASP and TAM$** — calculate tier-level ASP and TAM$, applying regional ASP discounts where relevant; confirm flat or declining ASP explicitly.

6. **Calculate growth and CAGR** — derive TAM/SAM CAGRs and cross-validate bottom-up SAM CAGR against published Gartner/IDC consensus.

7. **Calculate SAM** — link SAM logo count to penetration rates.

8. **Calculate SOM and win rate** — build SOM as a separate win-rate-adjusted layer.

9. **Frame the opportunity: Greenfield and Switching** — split total opportunity into two distinct sources:
   - **Greenfield** = (forecast-year SAM logos − current SAM logos) ÷ N years (annualized new-logo opportunity)
   - **Switching jump balls** = (already-penetrated logos − subject's own installed base) × switching rate; floor at zero — if subject's installed base already exceeds the remaining penetrated-logo pool, the switching pool is zero. Omitting the installed-base subtraction causes double-counting.

10. **Build scenarios** — Base / Upside / Downside, stressing maximum penetration, ASP CAGR, and win rate each by ±25%. Reject or explicitly cap penetration/win rates outside [0,100%] before calculating the scenario; disclose any cap.

11. **Build the Sources tab** — log every key assumption with its source document or data provider and a **High / Med / Low** confidence rating. Explicitly flag any input with weak sourcing.

### TAM / SAM / SOM Formula Reference

| Layer | Formula |
|---|---|
| TAM$ | Total logos (by tier) × ASP (by tier), summed |
| SAM_logos | TAM logos × bounded penetration rate (current or forecast) |
| SAM$ | Σ(tier SAM_logos × tier ASP), normalized currency/period |
| SOM_logos | SAM_logos × bounded win rate |
| SOM$ | Σ(tier SOM_logos × tier ASP), normalized currency/period |
| Greenfield (ann.) | (Forecast SAM logos − Current SAM logos) ÷ N |
| Switching pool | (Penetrated logos − Subject installed base) × switching rate; min = 0 |

### Multi-Region Build Requirements (apply when geography > 1 region)

- Build separate logo / penetration / ASP inputs for each region.
- Apply regional ASP discount factors (see Defaults).
- Use region-specific penetration curves; do not copy the North America curve across regions.
- Normalize all regions to a single currency (FX-adjust to USD or reporting currency).
- Include a **global consolidation row** that ties to the sum of all regional outputs with zero cross-region duplication.

---

## Defaults (apply silently, disclose at delivery)

| Parameter | Default |
| --- | --- |
| Forecast horizon | 5 years; all CAGRs and annualized figures flex on this variable |
| Win rate (SOM) | 20–30% for competitive markets |
| Scenario stress | Base / Upside / Downside; max penetration, ASP CAGR, and win rate each ±25% |
| Regional ASP discount vs. North America | EMEA 90% / APAC 70% / LATAM 60% |
| Pricing model | Confirm before building — no default to flat per-logo |
---

## Rules & Pitfalls

**Never:**
- Never use a single top-down headline market number as the sole TAM basis — it is non-auditable, non-decomposable, and signals hockey-stick thinking to any IC reviewer. The entire value of this approach is the logo × ASP × penetration build.
- Never hard-code SAM logo counts — SAM logos must be a formula linked to penetration rates; hard-coding SAM decouples it from assumptions and breaks scenario logic.
- Never conflate SOM with maximum penetration — SOM is win-rate-adjusted and will always be smaller than maximum-penetration SAM; building them as the same line destroys analytical credibility.
- Never omit the subject's own installed base from the switching-pool calculation — counting already-owned logos as switching opportunity double-counts the addressable pool and inflates SOM.
- Never default ASP to flat per-logo without confirming the pricing model — per-seat, usage, and modular structures each require distinct unit assumptions (seats per logo, consumption per logo, or attach rate per module).

**Conditional:**
- If the bottom-up SAM CAGR exceeds published Gartner/IDC market CAGR by more than 1.5×, flag in red before delivery — either the penetration or ASP assumptions are too aggressive, or the market definition is narrower than the benchmark and requires reconciliation.
- If penetration in any segment exceeds 85% at any forecast year, flag as aggressive; if it reaches 100%, flag as unrealistic and require explicit justification.
- If any segment's CAGR exceeds 25%, require explicit documentation of the growth driver before delivery — this threshold triggers a red/warning flag cell.
- If the win rate assumption exceeds 30%, require a stated rationale (e.g., documented market leadership, sole-source contract position); 30% is the default ceiling for competitive markets.
- If ASP is flat or declining year-over-year, confirm with the user — flat or declining ASP is valid in commoditizing markets but must be an explicit assumption, not an oversight.
- If the switching pool computes to zero or negative (subject installed base ≥ remaining penetrated logos), floor at zero and flag — do not carry a negative switching opportunity.
- If the engagement scope is multi-region, build independent inputs per region and include a global consolidation tie-out; do not extrapolate a single-region model by multiplier.

**Judgment:**
- Prefer segmenting by at least two buyer tiers (Enterprise and SMB) even when the client has not requested it — the ASP differential between tiers is almost always material, and a single blended ASP obscures the true TAM shape.
- When confidence ratings on key inputs are predominantly Medium or Low, surface this explicitly in the Sources tab and in the IC-ready summary — a defensible number with transparent uncertainty is more valuable than a precise-looking number with hidden assumptions.
- Run bottom-up and top-down TAM in parallel whenever possible — triangulating both directions is the strongest defense of the output number; neither method alone is sufficient for a high-stakes IC or diligence context.
- Penetration growth rate should generally not exceed overall market growth rate — if it does, that is a useful sense check and warrants a flag.

---

## Pre-Delivery Checks

- Logo totals are hard-coded universe constants, SAM logos are penetration-linked formulas, and tiers have appropriate pricing inputs.
- Maximum penetration, CAGR, win rate, and ASP exceptions meet the stated flags, thresholds, and documentation requirements.
- Unsourced win-rate assumptions above 40% are red-flagged.
- Bottom-up SAM CAGR ÷ public consensus CAGR is ≤1.5× or visibly reconciled.
- Multi-region outputs use independent inputs, a normalized currency, and a global consolidation row with no cross-region duplication.
- Sources records give every key input a traceable source and High/Med/Low confidence; Low-confidence inputs are explicit.
- Greenfield and Switching are separate, Switching subtracts installed base and has a zero floor.
- Base/Upside/Downside stresses maximum penetration, ASP CAGR, and win rate ±25%; required red and amber flag cells are active.

---

## Scope Boundaries

Top-Down TAM handles cases where the buyer universe is too broad to enumerate or where an industry-overview funnel (published market → TAM → SAM → SOM) is the primary deliverable; use that playbook when bottom-up logo enumeration is not feasible. For the strongest output, run both playbooks in parallel and triangulate. Competitive benchmarking and win-rate substantiation beyond default ranges are handled by the Competitive Positioning playbook.

---

## Task-specific verification

Keep logo and annual revenue layers separate: TAM_logos, SAM_logos, SOM_logos; TAM$=Σ(logos×ASP), SAM$=Σ(SAM_logos×ASP), SOM$=Σ(SOM_logos×ASP). Normalize FX and period before summing. Penetration and win rates are in [0,1]; an ±25% stress that exceeds 100% must be rejected or explicitly capped with disclosed effect.


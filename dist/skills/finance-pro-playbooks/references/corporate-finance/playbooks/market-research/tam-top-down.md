# Top-Down TAM Sizing

> **Sections**: Ask First · Workflow · Defaults (apply silently, disclose at delivery) · Rules & Pitfalls · Pre-Delivery Checks · Scope Boundaries · Task-specific verification
> **Must not skip**: Rules & Pitfalls · Pre-Delivery Checks · Scope Boundaries — return here before delivery.
> **Formats**: excel_standards.md

> Task `tam-top-down` in group `market-research`. Read [`_overview.md`](_overview.md) first for group-level scope, shared defaults, and format dependencies.

**Use when**: The buyer universe is too broad to enumerate individually, or the engagement requires a defensible TAM/SAM/SOM for an IC memo, sell-side pitch, CIM industry section, S-1 opportunity page, board/fundraising deck, investment screen, or commercial due diligence. | **Deliverable**: Excel workbook with 7 tabs (Assumptions / TAM / SAM / SOM / Triangulation / Sensitivity / Sources), formula-driven and fully editable; PDF or slide export only if explicitly requested.

---

## Ask First

1. **Market definition**: What is the one-sentence boundary — product/service scope, buyer profile, use case, and geography? Request the user's sign-off on this definition plus an explicit exclusion list before building anything (mandatory when the boundary is contested, involves multiple buyer types, or covers a new category).
2. **Audience and use case**: IC memo, S-1, CIM, board deck, or investment screen? (Determines scenario depth and sourcing standard.)
3. **Business model / pricing mechanism**: Subscription (accounts × ACV), marketplace (GMV × take rate), advertising (impressions × CPM), hardware (units × ASP + replacement cycle), healthcare (addressable population × penetration × frequency × net price by payer), or other? Confirm before building the TAM formula.
4. **Bottom-up data availability**: Are logo lists, customer counts, or unit-level pricing data available? If yes, run bottom-up in parallel for triangulation. If no, proceed top-down only and flag the absence.

---

## Workflow

1. **Confirm the one-sentence market definition and exclusion list** — obtain sign-off before build; rebuild if the boundary changes.

2. **Layer and evaluate sources** — classify every source on a five-tier scale:
   - Tier 1: regulatory filings, official statistics
   - Tier 2: audited third-party research (paid reports)
   - Tier 3: reputable industry associations
   - Tier 4: sell-side / analyst estimates
   - Tier 5: web aggregators / secondary compilations
   Assign H/M/L confidence to each input. Flag any key input with only a single source. Apply date-stamp to every source and check against freshness windows (see Defaults). *(Sourcing quality drives the width of Sensitivity intervals; do this before touching numbers.)*

3. **Build TAM** — apply the confirmed pricing formula; segment enterprise/mid-market/SMB before ARPU. Use segmented CAGRs decomposed into volume and price; show raw source figure, explicit discount, and adjusted figure in adjacent cells. Apply TAM/CAGR flags in Defaults.

4. **Build SAM — one row per filter, explicit % retained** — apply filters in this sequence (adjust for market): geography → product fit → customer size/segment → regulatory eligibility → channel reach. Each filter row must name the specific buyers being excluded (e.g., "exclude government entities — procurement cycle incompatible with SaaS ACV"); a confidence haircut ("assume 70% of TAM") with no named buyers is not a valid filter and must be moved to Sensitivity. Every filter row shows: filter name | mechanism | % retained | source | confidence. Flag any retained % outside 25–90%.

5. **Build SOM — decompose win rate into named drivers** — do not use a flat "take 1% of SAM." Structure as:
   `SOM = SAM × win rate`
   Decompose win rate into individually adjustable cells: competitive structure | GTM capacity | channel reach | switching friction. Derive each driver from market characteristics, not from a fixed bucket. Cross-check against the comp set: a win rate > 70% in a market with strong regional incumbents must be flagged. Build a SOM ramp table showing Year 1–5 progression.

6. **Apply the competitor-revenue reality floor** — compare SAM and SOM with known competitor revenue.

7. **Triangulate against bottom-up** — run and reconcile the parallel build where data exist; otherwise disclose its absence in Sources.

8. **Assess an analog-market estimate when direct data are missing** — Use 2–3 genuinely comparable, sourced markets only when an estimate is within the requested scope and source constraints. Disclose transfer assumptions, low confidence and sensitivity. If no defensible analog exists, leave the affected result unavailable/partial; never invent inputs or substitute a source forbidden by the user.

9. **Build Sensitivity table** — vary the two or three highest-impact inputs in Bear/Base/Bull mini-funnels; move any failed named-buyer input here.

10. **Populate Sources tab** — for each source record: name | title | publisher | publication date | confidence tier | inputs supported | URL. Flag sources outside the freshness window.

11. **Run pre-delivery checks** (see Pre-Delivery Checks section).

---

### Deliverable Structure

| Tab | Contents |
|---|---|
| **Assumptions** | One-sentence market definition, exclusion list, pricing formula, segment definitions, CAGR inputs with source and confidence, all explicit discounts |
| **TAM** | Segmented build (enterprise / mid / SMB), pricing formula cells, real vs. price growth split, flag cells |
| **SAM** | Filter table: filter name / mechanism / % retained / source / confidence; highlight rows outside 25–90% retained |
| **SOM** | Win rate decomposition table (one named driver per row), SOM ramp Year 1–5 |
| **Triangulation** | Bottom-up figure (or explicit "not available" note), top-down figure, ratio, reconciliation notes |
| **Sensitivity** | Bear / Base / Bull scenario table, mini-funnel per scenario, inputs that failed "named buyers" test |
| **Sources** | Full source log per above |

**Required visual**: TAM → SAM → SOM funnel chart with absolute values and % of TAM labeled at each step; include in the SAM or SOM tab.

---

## Defaults (apply silently, disclose at delivery)

| Parameter | Default |
| --- | --- |
| Forecast horizon | 5 years |
| CAGR methodology | Segmented CAGR per tier |
| Source freshness window — most categories | 24 months |
| Source freshness window — fast-moving (AI, crypto, etc.) | 6–12 months |
| Source freshness window — industrial / regulated | 36+ months |
| Minimum independent sources per key input (incl. CAGR) | 2 |
| Third-party CAGR discount | 100–300 bps reduction |
| SAM filter retained % highlight threshold | Outside 25–90% |
| Triangulation ratio threshold requiring reconciliation | > 3× |
| Scenario count | 3 (Bear / Base / Bull) |
| Win rate cap requiring flag | > 70% in markets with named regional incumbents |
| SOM flag threshold | > 50% of SAM |
| TAM flag threshold | > 2× Tier 1–reported industry revenue |
| CAGR flag threshold | > 25% |
| New category treatment | Dual-view: substitution + expansion |
---

## Rules & Pitfalls

**Never:**
- **Never accept a SAM filter expressed as a confidence haircut** ("conservative 70%," "risk-adjusted 60%") without naming the specific excluded buyers — this rewords the number without adding information. A filter that cannot name the removed buyers does not belong in the base SAM; move it to Sensitivity.
- **Never set SAM% as a free parameter** ("assume 20% of TAM") — SAM must be derived arithmetically from explicit, sequential filters, each with a documented % retained and source. An assumed SAM% is a disclosure failure.
- **Never use a flat share grab for SOM** ("capture 1% of SAM") — SOM must equal SAM × win rate, with win rate decomposed into named, individually editable drivers (competitive structure, GTM capacity, channel reach, switching friction).
- **Never bury source discounts inside another cell** — the reader must see: raw source figure | explicit discount % | adjusted figure. Hidden haircuts destroy auditability.
- **Never apply a blended ARPU across customer tiers** — enterprise / mid-market / SMB ASPs diverge materially; blending overstates revenue for small customers and understates it for large ones.
- **Never double-count** — if a global report already includes a geography, do not stack a separate regional report on top; net out overlapping categories (e.g., endpoint security vs. network security); verify that regional segments sum to the global figure.
- **Never equate GMV with revenue in marketplace models** — TAM (revenue) = GMV × take rate; disclose GMV and take rate separately.
- **Never roll a static current-year figure forward without decomposing growth** — apply segmented CAGRs; flag any forward projection with implied price inflation > 5% in a non-inflationary category.
- **Do not force a numeric answer from unsupported inputs** — disclose missing fields and the affected TAM/SAM/SOM range. A defensible labeled estimate is optional within scope; otherwise return partial/insufficient data under the source policy.
- **Never begin building before the market definition is signed off** — a contested or ambiguous boundary renders the entire model unreliable and forces a full rebuild.

**Conditional:**
- **If the category is new (no established market revenue data)**, build both a substitution view (cannibalized existing spend, anchored to a specific data set — e.g., Uber modeled against city taxi medallion revenues) and an expansion view (net-new demand, explicitly modeled elasticity/latent demand — not a multiplier applied without basis). Present both views side by side; do not merge them.
- **If SOM exceeds the largest single competitor's revenue**, flag as aggressive implied share and require explicit justification in the Assumptions tab before delivery.
- **If SAM is smaller than the sum of known competitor revenues**, the filters are too tight — revisit Step 4 and loosen or re-justify each filter.
- **If TAM exceeds Tier 1-reported industry revenue by more than 2×**, the market boundary is too broad — tighten the one-sentence definition before proceeding.
- **If the triangulation ratio (top-down ÷ bottom-up) exceeds 3×**, stop and reconcile before delivering; do not average the two figures without a documented explanation of the gap.
- **If a source is outside its freshness window**, flag it in the Sources tab and, if no fresher source exists, widen the Sensitivity range for all inputs it supports.
- **If the forward CAGR is sourced from a single third-party research report**, apply a 100–300 bps downward adjustment for systematic optimism, document the rationale, and flag as single-source.
- **If the market has strong regional incumbents**, cap the unadjusted win rate at 70% and require explicit documentation of displacement mechanism for any assumption above that level.

**Judgment:**
- **Prefer named-buyer exclusion logic over mechanical filter sequences** — the intellectual test for any SAM filter is whether a skeptical IC reviewer could identify the excluded segment in an independent data source. If they cannot, the filter is not defensible.
- **Calibrate source freshness to market velocity, not calendar convention** — a 24-month-old report on industrial HVAC may be perfectly fresh; a 24-month-old report on generative AI infrastructure is likely obsolete.
- **Use analog markets as a calibration check, not a substitution for primary research** — analog-market fallback produces a Low-confidence anchor that widens Sensitivity; it is a floor for credibility, not a primary input.
- **Treat competitor revenue as a built-in sanity mechanism** — assembling the comp set revenue sum early (Step 6) constrains both the SAM and the SOM before you finalize either; this is faster and more convincing than ex-post rationalization.
- **When two sources produce materially different TAM figures**, do not average them silently — document both, explain the definitional difference, and select one as base with the other as a Sensitivity bound.
- **Run top-down and bottom-up in parallel whenever bottom-up data exist** — two independent methodologies converging below 3× is the strongest credibility signal available; divergence above 3× is itself a finding worth disclosing.

---

## Pre-Delivery Checks

- Assumptions carries the signed-off definition, exclusions, pricing formula, segment definitions, and explicit discounts.
- Each SAM row names excluded buyers and contains mechanism, % retained, source, and confidence; unsupported haircuts sit in Sensitivity.
- TAM, SAM, SOM, marketplace, segmentation, source-discount, overlap, and volume/price calculations follow the required formulas and visible-cell treatment.
- SAM is at least identified competitor revenues; SOM, TAM, CAGR, retained-%, and price-inflation exceptions are flagged and justified under stated thresholds.
- Key inputs, including CAGRs, have two independent sources or a clear single-source flag; dates meet applicable freshness windows or Sensitivity is widened.
- Triangulation is reconciled when >3×, or its unavailability is explicit; analog inputs are Low confidence and documented.
- Bear/Base/Bull mini-funnels, the labeled TAM→SAM→SOM funnel, the complete Sources tab, and both new-category views where applicable are present.

---

## Scope Boundaries

The **Bottom-Up TAM** playbook handles sizing from logo enumeration × ASP × penetration rate upward; use it when individual customer lists or unit-level pricing data are available, and run it in parallel with this playbook for triangulation. The **Private Company Screen** playbook handles enumeration of competitor and target company lists. The **Market Map** playbook handles visual competitive landscape layouts. This playbook is responsible only for the top-down funnel from public market data to a defensible TAM/SAM/SOM.

---

## Task-specific verification

Use one declared SOM conversion formula: base conversion × four independently justified multiplicative adjustments, within [0,1]. SOM=SAM×conversion; SAM≤TAM. Each input has a unit, period, source and visible formula locator. Unsupported overlap or out-of-bound probabilities cannot be complete.


# Business Quality Scorecard

> **Sections**: Ask First · Workflow · Defaults (apply silently, disclose at delivery) · Rules & Pitfalls · Pre-Delivery Checks · Scope Boundaries
> **Must not skip**: Rules & Pitfalls · Pre-Delivery Checks · Scope Boundaries — return here before delivery.

> Task `business-quality-scorecard` in group `deal-materials`. Read [`_overview.md`](_overview.md) first for group-level scope, shared defaults, and format dependencies.

**Use when**: A PE deal requires a concise due diligence diagnostic for IC presentation | **Deliverable**: Landscape PPTX scorecard with four fixed sections, six-state rating dots, and number-anchored comments; target one slide only when the content remains complete and legible

---

## Ask First
1. **Target basics**: Company name, one-line business description, and investment thesis.
2. **Deal context**: Investment stage, transaction type, and sponsor name (actual firm name, never a placeholder).
3. **Vertical**: Industry sector/sub-vertical for the conditional rows below.
4. **Materials**: QoE status plus CIM, management presentation, and other available sources.

---

## Workflow
1. **Lock the intake.** Confirm all Ask First inputs before building.
2. **Set the row list** in the fixed order **INDUSTRY → COMPANY → FINANCIAL → INVESTMENT**:

   | Section | Default rows |
   |---|---:|
   | INDUSTRY | 4–6 |
   | COMPANY | 5–6 |
   | FINANCIAL | 3–5 |
   | INVESTMENT | 4–5 |
   | **Total** | **16–22** |

   Apply the relevant vertical/deal overlay:

   | Vertical / deal type | Add or substitute |
   |---|---|
   | Healthcare services | **Pricing / Reimbursement**; cite reimbursement exposure and state concentration |
   | Building materials / industrial | Cyclicality skews Yellow/Red; cite residential/non-residential mix |
   | SaaS | **Mission-Criticality** and **Cash Conversion**; include ARR, NRR, GRR, Rule of 40 |
   | Restaurant / multi-unit | **White Space**; include SSS, AUV, four-wall EBITDA, unit capex, cash-on-cash return, payback |
   | Carve-out | **Controls / Enterprise Risk** Yellow/TBD; name TSA, stranded costs, stand-alone cost estimate |
   | Add-on | Prepend **Platform Snapshot**; substitute **Strategic Fit with Platform** |
   | Take-private | Valuation cites premium to 30-day VWAP |
   | Sponsor-to-sponsor | Base Earnings is TBD pending QoE |

3. **Extract anchors and write comments.** Pull required source-backed TAM, CAGR period, share denominator, multiples, leverage, equity, MOIC, and IRR. Use *"[Conclusion]; [counter-fact / mitigant / diligence flag]"* in punchline-first comments (target ~25 words; hard cap 40).
4. **Assign ratings.** Use the tone-consistent state below; a caveat or counter-fact requires a split rather than solid dot.

   | Rating | Rendering |
   |---|---|
   | Green | Solid green dot |
   | Green/Yellow | Diagonal split dot |
   | Yellow | Solid yellow dot |
   | Yellow/Red | Diagonal split dot |
   | Red | Solid red dot |
   | TBD | Grey background, white text |

5. **Apply slide metadata.** Title includes phase label; subtitle/top-right has project name + IC round; footer has date; footnote third-party sources.
6. **Run checks and render.** Use the PPTX rendering skill and brand template; if QoE exists, use the buy-side QoE skill for Base Earnings.

### Slide Layout


### Row-Selection and Evidence Detail

Use source materials to anchor each selected row. Required evidence includes: market size and CAGR period for Size & Growth; a dollar denominator for market share; valuation turn multiples or an early-stage absolute valuation; leverage, equity contribution, and liquidity for Capital Structure; and both MOIC and IRR for Returns. A missing datum makes the affected row **TBD**, not a generic positive comment.

Apply the selected deal overlay before assigning ratings. For example, a carve-out's stand-alone workstream belongs in Controls / Enterprise Risk, while a sponsor-to-sponsor Base Earnings conclusion stays TBD until QoE. A high-synergy strategic in auction is a process risk even when the underlying company scores well.


Use the fixed taxonomy as an analytical control. Put end-market cyclicality, reimbursement sensitivity, and market size in **INDUSTRY**; management, mission-criticality, and customer/operating evidence in **COMPANY**; earnings quality, cash conversion, and capital facts in **FINANCIAL**; and purchase-price, returns, exit, and process considerations in **INVESTMENT**. This prevents a good company observation from masking an investment or financing risk.

Four columns: rotated merged **Section label**; bold non-italic **Parameter**; italic two-part **Comment**; rightmost **Rating dot**.

---

## Defaults (apply silently, disclose at delivery)

| Parameter | Default |
|---|---|
| Output | Landscape PPTX; one page is a target, not a cap |
| Total rows | 16–22, adjusted for evidence and legibility |
| Base Earnings without QoE | TBD |
| Naturally unsupported rows | TBD: Initial valuation, Fan of Returns, Capital structure, Base Earnings, Process/Sponsor Angle, Size/TAM when unsized |

---

## Rules & Pitfalls

**Never:**
- Use a bare market-share percentage; include its dollar addressable-market denominator.
- Leave `[Firm]` or another placeholder in Process / Sponsor Angle.
- Assert relative valuation attractiveness without actual comparable data.
- Misclassify rows: cyclicality is INDUSTRY, management COMPANY, and initial valuation INVESTMENT.

**Conditional:**
- Flag review if pure-colour rows exceed **50%**; flag the user and offer a 6–8-row version or prose note if TBD rows exceed **30%**.
- For a carve-out, apply the stated Controls / Enterprise Risk treatment. For a high-synergy strategic in auction, rate Process / Sponsor Angle Red.
- With QoE, populate Base Earnings from buy-side QoE output, not CIM EBITDA.
- For small tuck-ins, re-ups/co-investments, or very early screens, ask whether full 16–22 rows are warranted.

**Judgment:** Split ratings are normally appropriate; tailor rows to the vertical and use specific, defensible Process / Sponsor Angle relationships.


- **Comment discipline:** Remove CIM superlatives (for example, “world-class,” “premier,” or unsupported “leading”) in favor of specific facts. A relationship claim needs a concrete basis, such as its source and duration.
- **Balance discipline:** A scorecard dominated by solid greens is not a sponsor diagnostic. Retain counter-facts in the comment and use the split state whenever evidence cuts both ways.
- **One-slide exception:** Never shrink, merge, or cut a material row solely to preserve one page; use a continuation or appendix when the task-specific row set cannot remain legible.

---

## Pre-Delivery Checks
- Every row has a rating; parameter labels are bold/non-italic and comments italic.
- Size & Growth has market size plus CAGR period; share has a dollar denominator.
- Valuation has a turn multiple (or early-stage absolute value); take-privates state 30-day VWAP premium.
- Returns has MOIC and IRR, Exit names a pathway, and Capital Structure has leverage, equity, and liquidity—or each is TBD.
- Rating tone, section assignment, metadata, source footnotes, and material coverage are consistent; flag the 50% pure-colour and 30% TBD tests.
- Process / Sponsor Angle names the actual sponsor; any relative-comps claim is supported by actual comparables.
- Carve-out Controls / Enterprise Risk names TSA, stranded costs, and the stand-alone cost build; QoE-derived Base Earnings is not substituted with CIM EBITDA.
- Comment copy is punchline-first, contains its counter-fact or diligence flag, and remains at or below 40 words; unsupported sell-side adjectives have been removed.
- Four fixed sections appear in order, with the intended row budgets or an evidence/legibility explanation for variance.

---

## Scope Boundaries
PPTX branding/rendering and QoE adjustment extraction are specialist handoffs. AI-disruption scoring uses the separate six-dimension 1–5 framework and 2×2 output.


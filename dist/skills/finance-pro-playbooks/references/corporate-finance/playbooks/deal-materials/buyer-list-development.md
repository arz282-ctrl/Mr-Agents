# Buyer List Development

> **Sections**: Ask First · Workflow · Defaults (apply silently, disclose at delivery) · Rules & Pitfalls · Pre-Delivery Checks · Scope Boundaries · Task-specific verification
> **Must not skip**: Rules & Pitfalls · Pre-Delivery Checks · Scope Boundaries — return here before delivery.
> **Formats**: excel_standards.md

> Task `buyer-list-development` in group `deal-materials`. Read [`_overview.md`](_overview.md) first for group-level scope, shared defaults, and format dependencies.

**Use when**: Building a sell-side / sponsor-exit buyer universe for a target | **Deliverable**: Excel workbook (primary, multi-tab) or PowerPoint summary deck (only when explicitly requested)

## Ask First
1. **Target and confidentiality**: Name, project code, and confidentiality flag.
2. **Financial profile**: LTM Revenue, LTM Adj. EBITDA, and indicative TEV range.
3. **Universe**: Strategic, sponsors, or both; exclusions.
4. **Geography and output**: Geography, Excel/PPT, and tier count.

---

## Workflow
1. **Lock intake.** Do not build until underwritten financials and confidentiality are confirmed.
2. **Research target and candidates.** For public targets, use filings/IR; for private targets, start with the CIM and triangulate. Check 10-K/CIM customers and suppliers; map senior-management career paths from the prior five years and add qualifying hidden competitors.
3. **Build Strategic Buyers** across direct competitors, adjacent competitors, vertical integrators, and platform builders. Run payment ability, assess recent M&A posture, record source type in rationale, and include 2 contacts (3 maximum: M&A lead + CEO).
4. **Build Financial Sponsors** only for new platform investments. Apply fund sizing and include up to 3 decision-maker contacts; never include IR.
5. **Apply the sponsor/portfolio-company binary selection rule** and Tier A test. Record the missing Tier A criterion and every downgrade reason in Tier B rationale.

   | Category | Tier A conditions (all required) |
   |---|---|
   | Strategic | Same industry + active M&A signal + payment ability confirmed |
   | Sponsor | Sector exposure + fund-size fit + active deployment |

6. **Apply downgrade triggers**: post-deal leverage exceeds threshold; target multiple materially exceeds buyer multiple; buyer signaled M&A exit; large acquisition in prior 6 months; comparable divestiture; or near-end-of-life fund without successor.
7. **Produce the selected output** and perform the checks.

### Payment-Ability Math


### Buyer-Category Definitions

| Type | Qualification |
|---|---|
| Direct competitor | Same product/service and overlapping customers |
| Adjacent competitor | Neighboring segment where the target expands TAM |
| Vertical integrator | Customer or supplier seeking vertical control |
| Platform builder | Acquirer entering the sector to establish a new platform |

The Strategic Buyers tab records buyer type, headquarters, LTM Revenue, LTM Adj. EBITDA, current/pro forma leverage, leverage threshold, cash-vs-TEV outcome, acquisition-multiple comparison, tier, rationale, and contacts. The Financial Sponsors tab records fund size, deployment, platform count, equity check, viable TEV, sector exposure, tier, rationale, and contacts.


Use the financial-sponsor tab for a new-platform assessment, not follow-on/tuck-in capacity. Actual platform investments should cover the most recent 2–3 funds, and the fallback is used only when the actual figure is unavailable or outside the 8–15 range. The 80% fund deployment and 40–50% equity contribution are sizing assumptions, not proof that a sponsor will bid; the rationale must still establish sector exposure and active deployment.

```
Current net leverage    = Net Debt ÷ LTM Adj. EBITDA (buyer standalone)

Pro forma net leverage  = (Buyer Net Debt + Target TEV, fully debt-financed)
                          ÷ (Buyer LTM Adj. EBITDA + Target LTM Adj. EBITDA)
                          — no synergies assumed

Check 1: Can cash alone cover full TEV?
Check 2: Does pro forma leverage exceed threshold? → equity financing required
Check 3: Is implied acquisition multiple materially above buyer trading multiple? → downgrade
```

Sponsor-backed and private strategics: mark all financial fields, including trading multiples, **NA**.

### Two-Step Fund Sizing Method

```
Step 1: Identify actual platform investments across the most recent 2–3 funds.
        If unavailable or outside 8–15, use 10–12.
Step 2: Equity check = (Fund size × 80%) ÷ Average platform investment count
        Implied viable TEV = Equity check ÷ 40–50%

If implied viable TEV diverges from target TEV by 2x or more → exclude or downgrade.
```

### Excel Tab Structure

| Tab | Contents |
|---|---|
| Strategic Buyers | Buyer name, type, HQ, LTM Revenue/Adj. EBITDA, current/pro forma leverage, threshold, cash-vs-TEV, acquisition-vs-buyer multiple, Tier, 2–3 sentence rationale, contacts |
| Financial Sponsors | Fund, size, deployment, platform count, equity check, viable TEV, sector exposure, Tier, rationale, contacts |
| Exclusions | Party and documented reason |

### PPT Rationale Character Limits

| Rows in cell | Maximum |
|---|---:|
| ≤8 | <220 characters |
| 9–14 | <160 characters |
| ≥15 | <110 characters |

Preserve the main strategic-fit or check-size/sector-match point; never truncate to a fragment.

---

## Defaults (apply silently, disclose at delivery)

| Parameter | Default |
|---|---|
| Output | Excel with full fields; PPT only if explicitly requested |
| Universe | Tier A 5–8 strategics + 5–8 sponsors; 20–40 total |
| Geography / tiers | North America; Tier A + Tier B |
| Leverage threshold | 5.0x net debt / Adj. EBITDA; 6.0x asset-light/high-growth; 5.0x capital-intensive |
| Fund deployment | 80% of fund size as equity |
| Platform-count fallback | 10–12 when actual count is unavailable or outside 8–15 |
| Equity check | 40–50% of TEV |
| Contacts | Strategics: 2, maximum 3; sponsors: maximum 3, never IR |

---

## Rules & Pitfalls

**Never:**
- Fabricate contacts, financials, acquisition history, or email addresses; official filings/company sites override aggregators, and sponsor emails must appear verbatim on the official site.
- Reveal the real target name in a confidential engagement, including file name, headers, footers, or tabs; stop for a code name if none exists.
- Give outreach strategy, relationship-status, or tactical guidance; duplicate a contact; silently delete a downgraded buyer; or place one buyer on both tabs.

**Conditional:**
- A same-sector, larger sponsor portfolio company becomes a sponsor-backed strategic and removes its parent sponsor from Financial Sponsors; otherwise retain the sponsor and list the company only as a representative investment.
- Include a mega-cap only with explicit strategic materiality; otherwise exclude it. Pro forma leverage above threshold requires an equity-financing note, not automatic exclusion.
- A private target without CIM requires PitchBook and Preqin plus one additional independent source before using a financial figure.
- If the target is confidential and lacks a code name, stop. The code name replaces its real name in tab names, headers, footers, file names, and all body content.
- A buyer that has publicly exited M&A activity, divested a comparable asset, or has a near-end-of-life fund without a successor is not silently removed: retain and downgrade with the relevant rationale.
- Contacts must be currently in role at delivery; spot-check LinkedIn and the company website. Do not repeat a person across contact slots.

**Judgment:** Prefer strategic relevance to size; use transcript evidence for public M&A posture; use plain-language buyer names. Each rationale gives fit, payment/fund fit, and a qualifier in 2–3 substantive sentences.


- **Research discipline:** For public strategics, read earnings-call transcripts for capital-allocation/M&A posture; press releases alone are insufficient. For sponsor-backed/private strategics, use prior 2–3 years of release and deal-pattern evidence. Keep the source type in the rationale.
- **Tier placement:** A buyer that fails a Tier A test is normally Tier B with the failed condition named. A strategic that recently acquired a large asset still belongs in the universe when otherwise credible, but carries its integration-timeline downgrade.
- **Payment-basis discipline:** Compare the target implied acquisition multiple to the buyer trading multiple on the same basis. Cash-only coverage, leverage, and equity-financing implications must use the buyer/target LTM Adj. EBITDA values in the stated formula.
- **No double representation:** Apply the sponsor/portfolio-company binary rule before tiering. It prevents a sponsor and the qualifying portfolio company being presented as two independent buyer opportunities.

---

## Pre-Delivery Checks
- No sponsor/qualifying portfolio-company conflict, buyer duplication, or excluded party on another tab.
- Rationale is substantive; private/sponsor-backed strategic fields are NA; contacts are current, unique, and official-email only.
- Confidential files use the code name throughout; multiple conventions are consistent.
- Sponsor viable TEV is within 2x of target or downgraded; customer/supplier/competitor completeness is documented.
- PPT rationale cells meet the applicable character limit without fragmenting a sentence.
- Tier A parties satisfy every stated condition; every Tier B rationale identifies its missing condition and any of the six downgrade triggers.
- Public-strategic M&A posture is transcript-supported; private-target financials satisfy the required CIM/triangulation path.
- Cash coverage, pro forma leverage, and target-vs-buyer multiple use a consistent LTM Adj. EBITDA and multiple basis; required equity financing is stated.
- Strategic tabs contain exactly the selected buyer type and no same party on both buyer tabs; sponsor contacts never include IR.
- Every exclusion is listed with a reason, and a confidential-deliverable sweep confirms the real target name is absent from all visible fields and metadata.

---

## Scope Boundaries
Covers sell-side/exit buyer-universe construction, payment ability, and verified contacts—not buy-side screening, relationship mapping, outreach tactics, or process management.

## Task-specific verification

Payment capacity is N/M when target, buyer or combined relevant EBITDA is nonpositive or a denominator is zero. Use common currency/LTM/adjusted EBITDA. Sponsor TEV capacity is a range [equity/0.50, equity/0.40]; use the conservative endpoint for a minimum-capacity conclusion, never select an arbitrary point.


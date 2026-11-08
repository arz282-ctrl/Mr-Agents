# Precedent Transactions

> **Sections**: Ask First · Workflow · Defaults (apply silently, disclose at delivery) · Rules & Pitfalls · Pre-Delivery Checks · Scope Boundaries · Task-specific verification
> **Must not skip**: Rules & Pitfalls · Pre-Delivery Checks · Scope Boundaries — return here before delivery.
> **Formats**: excel_standards.md · metric_disambiguation.md

> Task `precedent-transactions` in group `valuation`. Read [`_overview.md`](_overview.md) first for group-level scope, shared defaults, and format dependencies.

**Use when**: Valuing a target using actual M&A transaction multiples paid by acquirers | **Deliverable**: Excel workbook with 4 tabs — Transaction Data, Valuation Multiple Chart, Implied Target Valuation, Deal Profiles and Rationale

---

## Ask First
1. What is the target company's industry, sub-sector, and key financials (LTM revenue, EBITDA, EBITDA margin)?
2. Which valuation multiples are required (default: EV/LTM Revenue, EV/LTM EBITDA — confirm if sector norms differ, e.g. EV/NTM Revenue for high-growth Tech, EV/AUM for asset managers, P/FFO for REITs)?
3. What is the target's approximate transaction size (used to apply the 0.25x–5.0x revenue size filter)?
4. Should the universe include minority/structural transactions, or control transactions only (default: control)?

---

## Workflow

1. **Define the transaction universe** — Source deals from SEC filings, press releases, investor presentations, CapIQ, FactSet, and Bloomberg. Exclude rumored, withdrawn, and cancelled transactions from the core set. Limit to the past 5 years (especially for the primary tier); flag any deal outside this window and explain its inclusion. Prefer ≥10 transactions total; if M&A activity is sparse, accept ≥5 with explicit notation.

2. **Apply size filter** — Include only transactions where target revenue falls within **0.25x–5.0x** of the subject target's revenue. If target financials are not yet available, build the universe on industry/business-model criteria and annotate: *"Size filter to be applied once target metrics are confirmed."*

3. **Tier the universe into 2–3 layers (maximum 4)** — Segment by a combination of size, growth profile, margin profile, business model, geography, end market, or acquirer type. Every tier must have a specific, written rationale. Label tiers dynamically and descriptively (e.g., Core / Adjacent / Broader / Aspirational) — do not use static or generic names. Never collapse all transactions into a single catch-all bucket.

4. **Build the Transaction Data tab** *(anchor tab — single source of truth)*
   - Columns: Target, Acquirer, Close Date, Transaction EV, LTM Revenue, LTM EBITDA, LTM EBITDA Margin, EV/LTM Revenue, EV/LTM EBITDA, Control Premium (and initial premium if competitive bid), Tier assignment, Source annotation per cell.
   - Rows: All transactions grouped by tier, then the full universe.
   - Statistics: Compute **Max / 75th percentile / Median / 25th percentile / Min** for each tier and for the full universe.
   - For tiers with **fewer than 4 transactions**, replace percentile labels with **Min / Median / Max** and add a note flagging the small sample.
   - Where a metric is unavailable, return **"NM"** in the cell; still compute all summary statistics using available observations.

5. **Normalize EBITDA across all transactions** *(do before computing multiples)* — Apply consistent treatment for operating vs. capitalized leases, capitalized software, stock-based compensation, and restructuring charges. Do not use synergy-adjusted metrics unless they are explicitly disclosed and labeled as such.

6. **Verify EV construction for every transaction** — When a source reports only equity value, reconstruct EV via the equity bridge: **EV = Equity Value + Net Debt + Preferred Stock + Minority Interest**, where net debt is pulled from the most recent filing prior to announcement. Even when EV is reported directly, cross-check against the bridge. Never mix equity value with EV in the same column.

7. **Verify LTM period integrity** — Confirm that each transaction's LTM period ends **before its announcement date**. Never use a forward metric in a column designated LTM, and never mix LTM and forward multiples in the same table.

8. **Determine the unaffected share price for control premium calculations** — Unaffected price = closing price on the trading day immediately before whichever comes first: (a) public announcement date, (b) first media report of a potential transaction, or (c) the date of a material, anomalous share price move suggesting a leak. For competitive bidding situations, record **both the initial offer premium and the final deal premium**.

9. **Build the Valuation Multiple Chart tab** *(combo chart: bars + median lines)*
   - One bar per transaction, colored by tier, sorted within each tier high-to-low, and tiers ordered high-to-low left-to-right.
   - Label each bar on the x-axis as: **Target / Acquirer (Close Date)**.
   - Overlay each tier's median as a **line spanning only the bars in that tier** — not the full chart width.
   - Overlay the full-universe median as a line spanning all bars.
   - Add clear data labels. (See Chart Discipline rules below.)

10. **Build the Implied Target Valuation tab** — Apply the selected multiples' **25th percentile / Median / 75th percentile** to the target's corresponding metrics to produce Low / Mid / High implied EVs. Present one row per tier and one row for the full universe. Highlight the Median/Mid column; use a deeper highlight for the primary tier row as the valuation anchor. Add an "Analyst Notes" section below the table with specific, transaction-referenced rationale for the chosen multiple (see Rules & Pitfalls — Judgment).

11. **Build the Deal Profiles and Rationale tab** — One profile card per transaction, in the same order as the chart. Each card includes: parties, close date, deal size, EV construction, multiples, control premium, tier assignment rationale, and macro regime flag where relevant. All numeric values must **link back to the Transaction Data tab** — no hardcoded figures.

12. **Flag macro regime differences** — Note the interest rate environment, credit cycle phase (e.g., GFC, COVID, post-COVID rebound), and market conditions at each transaction's announcement date. Multiples from different regimes are not directly comparable without comment.

---

### Deliverable Tab Map

| Tab | Content |
|---|---|
| **Transaction Data** | Full deal table, tiered, with per-tier and full-universe Max/75th/Median/25th/Min statistics |
| **Valuation Multiple Chart** | Combo chart: bars by tier + tier median lines + full-universe median line |
| **Implied Target Valuation** | 25th/Median/75th applied to target metrics → Low/Mid/High EV per tier and full universe; Analyst Notes below |
| **Deal Profiles and Rationale** | Per-deal cards linked to Transaction Data; tier rationale; macro regime flags |

---

## Defaults (apply silently, disclose at delivery)

| Parameter | Default / override |
|---|---|
| Multiple period | LTM; use sector convention where required: high-growth Tech EV/NTM Revenue, asset managers EV/AUM, REITs P/FFO |
| Transaction type | Control only unless minority/structural deals are requested |
| Transaction count / lookback | ≥10 in a 5-year primary window; ≥5 only with low-activity disclosure |
| Size filter | 0.25x–5.0x target LTM revenue; defer only while target metrics are unknown |
| Tier count | 2–3, maximum 4, with written rationale |
| Summary statistics | Max / 75th / Median / 25th / Min; below 4 transactions use Min / Median / Max with sample footnote |
| Excluded transactions | Rumored, withdrawn, and cancelled |
| EBITDA normalization | Consistent lease, capitalized-software, SBC, and restructuring treatment |
| Synergy-adjusted metrics | Exclude unless explicitly disclosed and labeled |

## Rules & Pitfalls

**Never:**
- **Never use a catch-all single-bucket universe** — collapsing all transactions into one tier destroys the analytical signal of relative relevance and is treated as a fundamental structural error by reviewers.
- **Never mix equity value with enterprise value** — the two measure different claims; using equity value where EV is required systematically misstates multiples and is immediately detectable.
- **Never mix LTM and forward multiples in the same table** — doing so renders every multiple in the table uninterpretable and invalidates the distribution statistics.
- **Never use a synergy-adjusted EBITDA metric without explicit disclosure and labeling** — it inflates the denominator, deflates the implied multiple, and misrepresents what a buyer actually paid for stand-alone performance.
- **Never use an LTM period that ends after the announcement date** — it incorporates post-announcement financial performance that was not available to transaction participants.
- **Never rely solely on press release summaries without cross-checking the underlying SEC filing or official disclosure** — press releases regularly omit or misstate EV components.
- **Never write generic multiple-selection rationale** (e.g., "reflects value drivers and risk profile") — this is a cited error; rationale must name specific comparable transactions and articulate concrete operating or market conditions.
- **Never present LTM revenue and LTM EBITDA margin as independent metrics in separate columns without recognizing that they are derived from the same revenue base** — they are not additively independent; treat them as linked for consistency checks.

**Conditional:**
- **If a source reports only equity value**, reconstruct EV via the equity bridge (Equity Value + Net Debt + Preferred Stock + Minority Interest), using net debt from the most recent filing prior to announcement, before computing any multiple.
- **If a tier contains fewer than 4 transactions**, replace 25th/75th percentile labels with Min/Median/Max and add a footnote noting the small sample size.
- **If M&A activity in the sector is thin (total universe <10 transactions)**, accept ≥5 transactions with explicit notation and apply heightened scrutiny to outliers.
- **If target financials are not yet available**, build the transaction universe on industry and business-model criteria alone and annotate every size-filtered column: *"Size filter (0.25x–5.0x revenue) to be applied once target metrics are confirmed."*
- **If the deal involved a competitive bidding process**, record both the initial offer premium and the final deal premium as separate fields; use the final premium for the primary table and footnote the initial.
- **If transactions span materially different macro regimes** (e.g., GFC, COVID, post-COVID rebound, rising-rate environment), flag each affected transaction and explain the multiple compression or expansion attributable to regime rather than fundamental value.
- **If the sector uses non-standard multiples** (high-growth Tech → EV/NTM Revenue; asset managers → EV/AUM; REITs → P/FFO), override the LTM default and document the substitution in Analyst Notes.

**Judgment:**
- **Prefer relevance over volume when tiering** — a Core tier of 5 directly comparable transactions anchors the valuation more credibly than a broad tier of 15 loosely comparable ones.
- **Use the primary tier's median as the valuation anchor** — the 25th/75th percentile bounds frame the range, but the median of the most directly comparable tier is the reference point you must be prepared to defend.
- **Cite specific transactions when justifying multiple selection** — state which deal(s) in the Core tier set the median, what operational profile they share with the target, and what specific conditions (growth rate, margin, strategic fit, market timing) would support a multiple above or below the median.
- **Treat the Adjacent/Broader tiers as context, not the anchor** — they establish an aspirational ceiling or a floor discount, not the central estimate.
- **Flag any transaction that looks like a distressed sale, minority stake, or carve-out anomaly** — exclude it from the primary tier even if it passes the size and industry filters, unless the target is also in distress.
- **Anchor control premium analysis to the unaffected price, not the pre-announcement market price** — if the stock moved materially on leak speculation before announcement, the pre-announcement price overstates the unaffected baseline and understates the true control premium.

---

## Pre-Delivery Checks

- Each EV is reconstructed or bridge-verified; every LTM period predates announcement; no LTM/forward mixing occurs.
- EBITDA normalization is consistent; synergy-adjusted metrics are labeled; every Transaction Data metric has a source annotation.
- Unaffected-price logic, competitive initial/final premiums, `NM`, small-sample statistics, size-filter status, and macro flags pass.
- The chart’s tier sorting and median spans, implied-valuation highlighting, and linked (non-hardcoded) deal-profile figures pass.
- Analyst Notes cite named transactions and specific operating/market conditions.

## Scope Boundaries
Public trading multiples (EV/EBITDA, P/E on publicly traded comparables without a control premium) are handled by the **Public Comps** playbook. Intrinsic valuation via discounted cash flows, WACC derivation, and terminal value construction are handled by the **DCF** playbook. This playbook covers only actual completed M&A transactions and the control premiums embedded in them.

---

## Task-specific verification

Transaction Data includes Announcement Date, LTM end, unaffected-price date, latest pre-announcement filing date and source locators. Announcement (not closing) anchors point-in-time capital structure and LTM availability.


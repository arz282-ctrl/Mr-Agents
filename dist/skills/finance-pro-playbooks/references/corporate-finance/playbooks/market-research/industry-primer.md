# Industry Primer

> **Sections**: Ask First · Workflow · Defaults · Rules & Pitfalls · Pre-Delivery Checks · Scope Boundaries
> **Must not skip**: Defaults · Rules & Pitfalls · Pre-Delivery Checks · Scope Boundaries — return here before delivery.
> **Formats**: document_standards.md

> Task `industry-primer` in group `market-research`. Read [`_overview.md`](_overview.md) first for group-level scope, shared defaults, and format dependencies.

**Use when**: A user needs a trends-driven synthesis of a sector or sub-sector, drawing on recent broker research, thematic reports, and earnings commentary | **Deliverable**: Structured primer (chat / PDF / slides) covering Market Overview, Recent Trends, Tailwinds/Headwinds & Key Debates, What to Watch, and two required appendices

---

## Ask First

1. **Output format** — chat, PDF, or slides?
2. **Sector / sub-sector** — how narrow or broad? (If too broad, push back with 2–4 sub-sector options before proceeding.)
3. **Focus angle** — general survey or a specific lens (e.g., fuel-price dynamics within LTL trucking)? The entire primer will be oriented around this if provided.
4. **Time horizon** — default is 3 years; confirm if the user wants the 5-year cycle view or a shorter window.
5. **Geography** — ask only if the sector has meaningful regional variation or if the request is ambiguous.

> **Scope gate**: Confirm ≥ 3 listed companies exist in the defined universe before proceeding. If the defined scope yields only 1–2 names, it is too narrow a niche — surface this immediately.

---

## Workflow

1. **Confirm the Ask First gate** before research; skip questions already explicit in the request.

2. **Define the company universe** — list all publicly traded companies in scope, including relevant *segments* of diversified conglomerates (not the consolidated parent). Flag any material private competitors (e.g., OpenAI / Anthropic alongside Alphabet / Meta) for inclusion in the competitive landscape section; note them as private with approximate scale. Confirm the universe reaches ≥ 3 listed names.

3. **Conduct date-first reconnaissance** — sort descending by date before topic filtering; prioritize top-tier investment-bank and top-ranked-analyst coverage for deeply covered names.

4. **Apply the full report-type mix**:
   - *Initiation reports* → structural background and competitive framing
   - *Thematic notes* → trend identification
   - *Earnings commentaries* → current state, management guidance, and consensus revision direction

   Using only initiations produces a static view; using only earnings commentaries loses the long arc. Use all three types.

5. **Validate thematic data recency** before citing TAM/CAGR; label any retained directionally useful but aged figure with its as-of date.

6. **Draft the primer** in the four-section structure plus two appendices (see Content Structure below).

7. **Run all Pre-Delivery Checks** before output.

---

### Content Structure

**Section 1 — Market Overview**
Size, structural characteristics, top 3–5 players and competitive dynamics. Source primarily from initiation reports.

**Section 2 — Recent Trends** *(core section)*
3–5 trends, ranked by industry impact. Weight toward the most recent 6–12 months even if the overall time horizon is longer. Frame each trend as *what has changed*, not *what has always been true*. Note which companies are affected and flag where analysts disagree.

**Section 3 — Tailwinds, Headwinds & Key Debates**
Separate structural from cyclical forces. The Key Debates sub-section is frequently the highest-value part of the primer — do not skip or abbreviate it. For each debate, steelman both sides (see Rules & Pitfalls).

**Section 4 — What to Watch**
Discrete, falsifiable catalysts only. Each item must include: the publishing entity or data source, release frequency, and the next expected date, so the reader can build a watch calendar. End the body of the primer here — do not add a Conclusion section.

---

### Appendix Requirements

**Appendix A — Source Research Table**

| Bank | Analyst | Report Title | Date |
|------|---------|--------------|------|

Every claim sourced from research must be traceable to a row in this table via inline citation in the body.

**Appendix B — Ratings & Estimates Snapshot**

| Company | Rating | Price Target | Current Price | Implied Upside/Downside | Rating Skew | PT Direction (trend) | Consensus Estimates | Estimate Revision Direction | Forward Valuation vs. Historical Range |
|---------|--------|--------------|---------------|--------------------------|-------------|----------------------|---------------------|-----------------------------|----------------------------------------|

- Exclude private companies from this appendix (they appear in Section 1 only).
- Mark any company without active coverage as "Not Covered."
- Flag and resolve any inconsistency where a Buy / Outperform rating accompanies a stock price above the price target, or a Sell accompanies a price below the price target (see Rules & Pitfalls).

---

## Defaults

**Apply defaults only where the caller has not selected a format or supplied a required assumption; disclose them at delivery.**

| Parameter | Default |
| ----------- | --------- |
| Time horizon | 3 years (refresh each December; extend to 5 years when the user explicitly wants a cycle view) |
| Minimum company universe | ≥ 3 listed companies |
| Recent trend weighting | Last 6–12 months |
| Trend count | 3–5, ranked by industry impact |
| Primary sources | Broker / equity research reports (initiation, thematic, earnings commentary) |
| Tone | Objective, non-promotional; strip superlatives unless backed by cited data |
| Title format | `[Sub-Sector] Industry Primer — [Date]` |
---

## Rules & Pitfalls

**Never:**
- **Never use consolidated parent-level ratings, price targets, or forecasts for a diversified company whose sector exposure is only one segment** — the parent metrics are dominated by unrelated businesses and will misrepresent the sector view. Scope to the relevant segment, or footnote parent-level figures as "parent-level, not sector-specific."
- **Never treat the most recent single data point as the complete story** — point-in-time data (TAM, CAGR, guidance) must be labeled with an as-of date and contextualized against the longer trend arc.
- **Never present a stale thematic TAM / CAGR as current** — if no updated publication exists and the figure is materially aged (rule of thumb: ~5 years in a fast-evolving sector), omit it rather than embed stale data in current narrative.
- **Never average or split qualitative analyst disagreements** — a both-sides summary that gives equal weight to structurally opposed views obscures the debate rather than exposing it; readers cannot act on a washed-out synthesis.
- **Never run keyword-first research retrieval** — it preferentially surfaces thematically relevant but stale notes and systematically misses the latest publications; always sort descending by date first.
- **Never reproduce source text verbatim** — always paraphrase; direct quotation of proprietary research creates legal and credibility risk.
- **Never use buy-side or sell-side superlatives** ("best-in-class," "industry-leading," "premier," "world-class") unless a cited quantitative data point supports the claim — in that case, cite the data, not the adjective.
- **Never add a Conclusion section** — the primer ends at What to Watch; a conclusion implies the analyst is recommending rather than informing.

**Conditional:**
- **If the requested sector is too broad** (e.g., "industrials," "technology"), do not produce a shallow primer — push back by proposing 2–4 sub-sector options, framed as "this will get you a sharper output."
- **If the user specifies a focus angle**, orient the entire primer around that lens rather than providing a generic sector tour. All trend selection, debate framing, and What to Watch items should connect back to that angle.
- **If a thematic TAM figure may still be directionally valid despite its age**, include it but attach a visible as-of date label and note the publication date so readers can assess staleness themselves.
- **If a Buy / Outperform rating exists where the current stock price exceeds the price target, or a Sell where price is below the price target**, flag the inconsistency explicitly in Appendix B and either resolve it with a note (e.g., PT not yet updated post-move) or footnote it — do not silently carry the inconsistency.
- **If a material private competitor exists** (e.g., a leading AI lab competing with listed hyperscalers), include it in the competitive landscape in Section 1 with a "private" label and approximate scale indicator; exclude it from Appendix B because no covering research exists.

**Judgment:**
- **Expose analyst disagreements on substantive questions (pricing power, capex cycle duration, structural vs. cyclical demand); steelman both sides** — the Key Debates section is where a primer earns credibility with experienced readers. A primer that papers over genuine disagreement is less useful than the underlying reports.
- **For quantitative disagreements** (e.g., two conflicting TAM estimates), compute an outlier-adjusted average and disclose the range and divergence — this is legitimate synthesis. For qualitative disagreements (e.g., whether demand is structural or cyclical), present both theses with their supporting logic; do not average.
- **Weight the most recent 6–12 months of broker output most heavily for trend content**, even when the stated time horizon is 3–5 years — the long arc provides context, but the primer's value is in current dynamics.
- **Cite inline for every research-sourced claim** (bank / analyst / date / report name); name banks in prose sparingly (1–2 times per paragraph for readability) but never let a claim float without a traceable citation — these are independent disciplines.
- **Prefer top-tier investment bank and top-ranked analyst coverage** when multiple sources cover the same point — depth of analytical resource correlates with reliability of channel checks and model rigor.
- **Frame every trend as "what has changed"** rather than "what is true" — static description of an industry is encyclopedia work; the primer's job is to convey momentum and inflection.

---

## Pre-Delivery Checks

- Ask First answers and the ≥3-listed-name scope gate are documented; diversified-company data are segment-scoped.
- The source mix includes initiation, thematic, and earnings commentary, retrieved date-first and prioritized for depth/quality.
- Every point-in-time figure is dated; aged thematic TAM/CAGR was refreshed, omitted, or visibly dated.
- Recent Trends has 3–5 impact-ranked, change-oriented items weighted to the last 6–12 months.
- At least one substantive qualitative debate is steelmanned; quantitative disagreement shows an outlier-adjusted average, range, and divergence.
- Each research-sourced claim has its traceable inline citation; source text is paraphrased and prose has no unsupported superlatives.
- Private competitors appear only in Section 1, and Appendix B resolves rating-versus-target inconsistencies, excludes private entities, and marks uncovered names `Not Covered`.
- What to Watch contains only falsifiable, calendared catalysts; the body ends there with no Conclusion.
- The title and appendices meet the specified format, and Appendix A ties to every research citation.

---

## Scope Boundaries

**Earnings Update** handles single-company post-earnings analysis and management commentary synthesis — use that playbook when the request is company-specific rather than sector-wide.
**Broker Research Digest** handles "what is the Street's current view" on one or several specific companies — use that playbook when the deliverable is a consensus/sentiment summary rather than a sector trends synthesis.
**Top-Down TAM / Market Map** handles standalone market-sizing and competitive landscape mapping as independent deliverables — use that playbook when the user needs market size or structure as the primary output, not embedded context within a primer.
PDF and slides formatting are handled by their respective format playbooks; this playbook governs research content and structure only.

---


# Market Map

> **Sections**: Ask First · Workflow · Defaults (apply silently, disclose at delivery) · Rules & Pitfalls · Pre-Delivery Checks · Industry Axis Conventions (starting points, not rules — override when context warrants) · Scope Boundaries
> **Must not skip**: Rules & Pitfalls · Pre-Delivery Checks · Scope Boundaries — return here before delivery.
> **Formats**: document_standards.md

> Task `market-map` in group `market-research`. Read [`_overview.md`](_overview.md) first for group-level scope, shared defaults, and format dependencies.

**Use when**: A client or internal team needs a structured visual map of all meaningful players in a defined market, organized by a single analytical axis | **Deliverable**: PowerPoint workbook built around three core modules (title / landscape / appendix); user instructions and templates govern additional modules and total slide count

---

## Ask First
1. **Market definition & geography** — What is the market scope (e.g., "vertical construction SaaS in North America")? Is it narrow enough to form a coherent universe, yet wide enough to support 5–8 substantive sub-sectors?
2. **Starting material** — Is there an existing company list (Option A), or must the universe be built from scratch (Option B)?
3. **Organizing axis** — What single axis should segment the market (e.g., industry served, value-chain position, buyer persona, product type)? Present a recommendation and obtain Gate 1 sign-off before proceeding.
4. **Reference companies** — Are there specific companies that must appear with a highlight border on the landscape and in the appendix?

---

## Workflow

1. **Clarify inputs and obtain Gate 1 sign-off** — Confirm market definition, geography, starting material (Option A or B), and the proposed organizing axis in writing before build work.

2. **Build the company universe** — Cast the net wide across multiple sources (databases, press, trade coverage, referrals). Apply a **lean-toward-inclusion** default: add borderline companies rather than exclude them. Flag if the universe exceeds 100 companies (tighten market definition or geography — do not raise a size threshold) or falls below 10 (flag and recommend broadening scope). Disclose any screening criteria applied.

3. **Define sub-sectors and obtain Gate 2 sign-off** — Derive labels from the actual universe; apply MECE, 5–8 sub-sectors, no "Other" bucket, and comparable scale before placement.

4. **Place companies** — Assign each company to its **primary sub-sector only; a logo may never appear in two boxes**. For companies spanning multiple sub-sectors, place in the primary box and note secondary positioning in the appendix description. If **more than 20% of companies span sub-sectors, the axis is wrong** — return to Step 3. When a box is full, select logos by **fit-first, size-second**: a pure-play in that sub-sector outranks a four-segment conglomerate. Preserve all companies in the appendix; mark those omitted from the landscape as "not shown due to space" in their description. Apply internal sub-groupings within a sub-sector only where genuine internal structure exists — this is a per-segment option, not a uniform secondary axis.

5. **Apply the logo-cover test** — Redact logos and rebuild the axis or sub-sectors if the framework does not communicate a structural insight.

6. **Assemble the .pptx** — Use these three core modules, adapting slide count and adding user-requested modules as needed:
   - **Section 1 — Title slide**: market name, geography, "as of [date]", sources footer.
   - **Section 2 — Landscape slide**: single-axis grid; sub-sector box sizes may vary with company count (do not force equal sizing; preserve whitespace; do not crowd logos); reference companies highlighted with a distinct border; "as of [date]" and sources footer.
   - **Section 3 — Appendix**: one section per sub-sector (overflow paginated with Roman numerals); rows sorted by estimated revenue descending, NAs at the bottom; sub-sector header color mirrors the corresponding landscape box color; reference companies highlighted; each page carries "as of [date]" and a footer listing **only the sources actually used**. Public companies: include ticker. Private company revenues: distinguish sourced reported actuals from estimates; use ranges where uncertainty warrants them.

   Do not add adjacent analysis modules by default. Add an executive summary, market sizing, why-now narrative, next steps, prioritization, outreach status, or other modules when the user explicitly requests them or a supplied template requires them.

7. **Run sanity checks** — See Pre-Delivery Checks below before sharing any version.

---

## Defaults (apply silently, disclose at delivery)

| Parameter | Default |
| --- | --- |
| Deliverable format | .pptx with title, landscape, and appendix as core modules; no fixed slide count |
| Sub-sector count | 5–8 |
| "Other" bucket | Never permitted |
| Sub-sector scale comparability | No sub-sector may be >5× the size of another |
| Universe size — upper trigger | >100 companies → tighten market definition or geography, disclose screening |
| Universe size — lower trigger | <10 companies → flag and recommend broadening |
| Universe inclusion bias | Lean toward inclusion; add borderline companies |
| Multi-sector companies | Primary sub-sector placement only; secondary noted in appendix description |
| Logo sourcing | Official brand assets only; if unavailable, use clean typeset company name |
| Unverifiable data fields | Display as "NA" |
| Private company revenue | Sourced reported actuals or explicitly labeled estimate/range; NA if unsupported |
| Public companies | Include when analytically meaningful; mark ticker in appendix |
| Logo selection when box is full | Fit-first (pure-play in that sub-sector), size-second |
| Company descriptions | Factual language only |
| Appendix sort order | Estimated revenue descending; NAs at bottom |
| Appendix overflow | Roman numeral pagination (e.g., Appendix I, II) |
| Sources footer | List only sources actually used |
| Color linkage | Each sub-sector box color mirrored exactly in the corresponding appendix section header |
| Date stamp | "as of [date]" on landscape slide and every appendix page |
---

## Rules & Pitfalls

**Never:**
- **Never fabricate or estimate data to fill a cell** — use "NA" for any field that cannot be verified from a real source. Revenue and headcount are the two fields most frequently invented; they are also the two most frequently checked by reviewers.
- **Match private-company revenue precision to its source** — use a reported actual point value when available and authorized, a labeled range for uncertain estimates, or NA when unsupported. Private status alone does not imply that every reported financial figure is imprecise.
- **Never place a company logo in more than one sub-sector box** — duplication signals that the axis is wrong and makes the landscape unreadable as an analytical document.
- **Never include an "Other" bucket** — it is proof that the axis does not achieve MECE exhaustiveness and must be redesigned.
- **Never generate, approximate, or alter a logo** — use official brand assets only; if unavailable, substitute a clean typeset name. Fabricated brand assets create legal exposure and are immediately visible to clients.
- **Never use marketing descriptors** ("leading," "premier," "trusted," "best-in-class") in company descriptions — they are unverifiable and signal that the description was copied from a website rather than independently assessed.
- **Never select logos for the landscape by company size or brand recognition when a box is full** — doing so systematically overstates the presence of diversified players and understates pure-plays, distorting the sub-sector story.
- **Never add adjacent analysis modules without a user request or template basis** — the default deliverable is the visual landscape, but explicit user instructions may add an executive summary, market sizing, why-now, next steps, outreach status, or prioritization tiers.
- **Never proceed past Step 1 without Gate 1 sign-off, or past Step 3 without Gate 2 sign-off** — building the landscape on an unvalidated axis or unvalidated sub-sector labels forces a full rebuild if the user disagrees.

**Conditional:**
- **If more than 20% of companies span multiple sub-sectors**, the organizing axis is wrong — return to Step 3, propose a revised axis, and re-obtain Gate 2 sign-off before proceeding.
- **If the universe exceeds 100 companies**, tighten the market definition or geography (do not raise a minimum-size threshold to exclude companies); disclose the screening criteria applied in the sources footer.
- **If the universe falls below 10 companies**, flag the issue explicitly and recommend broadening the market definition or geography before proceeding.
- **If a sub-sector has genuine internal structure** (e.g., two clearly distinct workflow stages within one segment), apply an internal sub-grouping within that sub-sector only — do not propagate it as a uniform secondary axis across all sub-sectors.
- **If a company is omitted from the landscape because a box is full**, mark it in the appendix description as "not shown on landscape due to space" so the tie-out count remains accurate.
- **If the user supplies a pre-existing company list (Option A)**, still supplement with independent research to ensure the universe is complete before defining sub-sectors.
- **If scope is explicitly private-company-only**, exclude public companies; otherwise include them when analytically meaningful and mark their tickers in the appendix.

**Judgment:**
- **Choose the organizing axis that tells the sharpest structural story, not the most generic one.** "By sub-type" is almost always the default and almost never the most insightful. Use the industry axis conventions below as a starting point, then override based on what makes the market structure legible.
- **Use the logo-cover test as the primary quality gate for axis selection**: if redacting all logos leaves a framework that cannot independently communicate an interesting insight about market structure, the axis must be rebuilt regardless of how tidy it looks.
- **Solve MECE pressure through primary-placement + appendix notation, not by shrinking the universe** — leaning toward inclusion produces a more credible and more useful landscape; an artificially small universe makes the map look incomplete to anyone who knows the space.
- **Market definition should be "just right"**: narrow enough to form a coherent, bounded universe; wide enough to generate 5–8 substantive sub-sectors. "Vertical construction SaaS" is well-scoped; "fintech" is too broad; "general-contractor on-site operations software" is too narrow.
- **Sub-sector box sizes need not be equal** — let them reflect the actual distribution of companies. Forcing equal-size boxes at the expense of whitespace or logo legibility is a visual error, not a design virtue.

---

## Pre-Delivery Checks

- The stated single axis passed Gate 1 and the logo-cover test; 5–8 Gate-2-signed-off sub-sectors passed MECE with no `Other` and no sub-sector >5× another.
- Every universe company has exactly one primary sub-sector and appears in the appendix; multi-sector and capacity omissions are correctly noted.
- No landscape logo is duplicated; full boxes use fit-first selection and all logos are official assets or clean typeset names.
- Landscape and appendix company counts tie out; reference companies are highlighted in both.
- Landscape colors exactly match appendix headers; internal groups, if used, assign every company exactly once.
- Unverifiable fields show `NA`; private revenue is a range; public tickers appear unless scope is private-only; descriptions are factual.
- Appendix rows sort by estimated revenue with NAs last, and overflow uses Roman numerals only when needed.
- `As of [date]` and actual-used-sources footers appear on landscape and every appendix page.
- The deck contains title, landscape, appendix, and only user- or template-required additions; unrelated or empty slides are removed.

---

## Industry Axis Conventions (starting points, not rules — override when context warrants)

| Market Type | Default Starting Axis |
|---|---|
| Vertical SaaS | Industry served; internal sub-grouping by workflow stage |
| Workflow-heavy verticals (construction, healthcare, logistics) | Value-chain position |
| Horizontal software | Buyer persona / purchasing role |
| Fintech | Financial product type |
| Marketplace | What is being transacted + which side of the two-sided market |
| Fragmented services / roll-up plays | Service type + geography |
| Energy / industrials | Upstream / midstream / downstream |
| Healthcare | Provider / payer / supply chain; for biopharma, indication + regulatory stage |

---

## Scope Boundaries

This playbook produces a visual landscape and sub-sector appendix only — it does not generate prioritization tiers, outreach status, or deep company financial profiles (use the **Private Company Screen** playbook for target lists with detailed data). It does not produce a comparable-company group for valuation (use the **Peer Identification** playbook). It does not produce a buyer universe with payment-capacity analysis (use the **Buyer List** playbook).


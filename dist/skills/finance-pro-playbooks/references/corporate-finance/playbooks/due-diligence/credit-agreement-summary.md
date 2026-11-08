# Credit Agreement Summary

> **Sections**: Ask First · Workflow · Defaults · Rules & Pitfalls · Pre-Delivery Checks · Scope Boundaries
> **Must not skip**: Defaults · Rules & Pitfalls · Pre-Delivery Checks · Scope Boundaries — return here before delivery.
> **Formats**: document_standards.md

> Task `credit-agreement-summary` in group `due-diligence`. Read [`_overview.md`](_overview.md) first for group-level scope, shared operating principles, and format dependencies.

**Use when**: A credit agreement requires distillation for a partner-level audience before a client call | **Deliverable**: Concise PowerPoint memo readable in 10 minutes by a PE Partner/Principal/VP or IB MD; follow any user/template page count, otherwise target a 2-page core summary with additional pages or an appendix only when needed

---

## Ask First
1. Has the full credit agreement been uploaded? If not, request it now — do not begin until the source document is in hand.
2. Are all ancillary documents available: fee letter, intercreditor agreement, security/guarantee agreement, purchase agreement, schedules, and any amendments?
3. Is there a specific industry vertical (software, retail, healthcare, etc.) that requires sector-specific clause attention?
4. Are 2–3 recent comparable credit agreements available for benchmark comparison if off-market terms are identified?

---

## Workflow

1. **Collect all source documents before touching the memo** (fee letter, intercreditor, security agreement, purchase agreement, schedules, amendments — flag any that are missing or referenced but not provided; note their existence without speculating on content).

2. **Build the opening section: Transaction Overview**
   - Open with 3–5 sentences establishing the big picture: parties and jurisdiction, the borrower's position within the group structure, facility type(s) and size, and use of proceeds.
   - Then lay out in structured form: Borrower / Guarantors; Lenders / Syndicate and Agent; Facility type(s) and commitment amount(s); Use of proceeds; Closing date and conditions precedent.

3. **Follow with Key Economic Terms**
   - Pricing: margin, reference rate, SOFR adjustment / floor, pricing grid / step-down mechanics.
   - Fees: upfront, commitment, agency, and any other disclosed fees.
   - Tenor and amortization schedule.
   - Prepayment: voluntary mechanics, soft call protection, make-whole premium; mandatory prepayment triggers and sweep percentages.
   - Collateral and guarantees.
   - M&A and incremental debt: delayed-draw term loan (DDTL) mechanics, incremental basket sizing, permitted acquisition definition.

4. **Build the remaining five blocks in order**:
   - **Definitions & Reporting Requirements**: EBITDA definition extracted verbatim (as a defined term in quotation marks) with all addback categories and any stated caps (e.g., "pro forma adjustments not to exceed 10% of Consolidated EBITDA"); reporting covenant timeline.
   - **Covenants**: financial covenants (springing vs. maintenance, equity cure rights), affirmative covenants, negative covenants; flag any basket that is fixed vs. grower; note MFN provisions and margin ratchets.
   - **Events of Default**: cross-default threshold stated in dollar amount; grace periods with flag if shorter than market (payment: 5 days; covenant: 30 days); state whether acceleration is automatic or lender-elected.
   - **Notable / Off-Market Provisions**: flag clearly, state the issue, do not editorialize — let the partner draw the conclusion (see Rules & Pitfalls).
   - **Closing Paragraph ("So What")**: 2–3 sentences on open items, unsatisfied conditions precedent, and follow-up points for the client; if the agreement is clean, say so and note 1–2 minor improvement suggestions.

5. **Apply section-number citations to every factual claim throughout** (e.g., "Leverage covenant steps to 5.5x in Q4 2026 (Section 2.01)") — do this as you draft each block, not as a post-pass (traceability is structural, not cosmetic).

6. **Final length check**: follow any explicit user or template page count. Otherwise target a 2-page single-spaced core summary; tighten prose first, then use an additional page or clearly labeled appendix rather than omit a material term or create unreadable overflow.

---

## Defaults

| Parameter | Default / override |
|---|---|
| Memo length | Target 2 pages for the core summary; user/template requirements govern, and material overflow may continue or move to an appendix |
| Line spacing | Single by default |
| Opening structure | Transaction Overview → Key Economic Terms |
| Following structure | Definitions & Reporting → Covenants → Events of Default → Notable Provisions → Closing Paragraph |
| No cover page, no table of contents, no filler by default | Begin directly with Transaction Overview |
| No glossary | Readers are senior professionals; basic terms are not defined |
| Font colour | Black body text; aggressive / anomalous terms highlighted |
| Defined terms | Quoted verbatim as they appear in the agreement |
| Off-market indicators (trigger for comp request) | Total leverage > 8x; fees > 3%; non-SOFR benchmark; spread > 10% |
| Cross-default threshold | Expressed in dollar amount |
| Grace period market benchmarks | Payment: 5 days; covenant: 30 days |
| External documents referenced but not provided | Note existence only; never speculate on content |

---

## Rules & Pitfalls

**Never:**
- **Never begin drafting before the source credit agreement is in hand**
- **Never fabricate, estimate, or fill gaps** — if a figure is absent, ambiguous, or appears intentionally left blank, state "not identified / blank" explicitly; guessing creates legal and credibility exposure.
- **Never copy-paste raw contract language** — rewrite everything in plain prose; the sole exception is defined terms, which must be quoted verbatim in quotation marks.
- **Never omit a material term or allow unreadable bleed solely to preserve the 2-page target** — follow the user's requested length; otherwise use a continuation page or appendix when concise editing cannot preserve completeness and legibility.
- **Never editorialize on flagged provisions**
- **Never omit a section-number citation from a factual claim**
- **Never speculate on the content of unreceived ancillary documents** (fee letter, intercreditor, security agreement)

**Conditional:**
- **If off-market indicators are present** (leverage > 8x, fees > 3%, non-SOFR benchmark, spread > 10%), flag the anomaly in the Notable Provisions block and ask the user whether to pull 2–3 recent comparable credit agreements for benchmarking before finalising the memo.
- **If a clause is absent, ambiguous, or appears deliberately left vague**, call it out explicitly in the relevant block — do not skip it or soften the language; deliberate ambiguity is itself a material term.
- **If the agreement is a software credit**, flag ARR treatment in the EBITDA/definitions block. **If retail**, flag inventory coverage levels. **If healthcare**, flag regulatory-event defaults. **If ESG-linked**, extract the adjuster mechanics and any ratchet.
- **If a SOFR fallback or benchmark transition clause is present**, extract its mechanics; if absent in a new facility, flag as notable.
- **If an equity cure right is present**, note the number of permitted cures per year and the cumulative cap, as these are frequently negotiated and material to covenant tightness.
- **If acceleration on an Event of Default is automatic** (rather than lender-elected), flag this explicitly — it is a material asymmetry that affects the borrower's cure window.

**Judgment:**
- **Flag unrestricted subsidiary designation rights prominently** — the ability to move assets outside the collateral package (J.Crew-style IP transfer / trapdoor) is among the most consequential creditor-hostile provisions and is routinely buried; identifying it is where domain expertise separates a summary from a clause list.
- **Flag EBITDA addback categories and caps as a standalone item**, not folded into the general covenant discussion — this definition is the most frequently negotiated and most frequently abused in leveraged credit documents; the cap percentage is the key number.
- **Flag debt reclassification between baskets** — the ability to move debt from one basket to another post-closing is a structural risk often overlooked at origination.
- **Distinguish fixed from grower baskets** — grower baskets scale with EBITDA and can expand materially in a growth scenario; this changes the effective incurrence test over the life of the facility.
- **Prefer decision relevance and precision in the core summary** — the selection criterion is: "Would the partner need this to conduct the client call?" If yes, include it in the core or a clearly signposted continuation; if no, omit it.

---
## Pre-Delivery Checks

- Page count follows the user's instruction or template; otherwise confirm the core summary is approximately 2 pages, single-spaced, with any necessary continuation or appendix clearly signposted.
- Every factual claim carries a Section citation; reject any unsupported assertion.
- All defined terms appear in quotation marks and match the agreement's exact wording.
- No content has been copy-pasted from the agreement (other than quoted defined terms).
- No blanks have been estimated or assumed; all gaps are labelled "not identified / blank."
- All referenced external documents (fee letter, intercreditor, security agreement) are noted as existing but their content is not characterised.
- Check the Events of Default block: cross-default threshold is in dollar amount; grace periods are stated; acceleration mechanic (automatic vs. elected) is noted; any grace period shorter than 5 days (payment) or 30 days (covenant) is flagged.
- Check the Notable Provisions block for the following liability-management landmines: unrestricted subsidiary designation rights; trapdoor / J.Crew-style IP transfer capability; EBITDA addback categories and percentage cap; debt reclassification between baskets; fixed vs. grower basket characterisation; MFN and margin ratchet provisions; springing covenant triggers; equity cure rights and limits.
- Check for off-market indicators (leverage > 8x, fees > 3%, non-SOFR benchmark, spread > 10%); if any are present, confirm whether comp benchmarking was requested and either completed or explicitly deferred by the user.
- The closing paragraph addresses: open items, unsatisfied conditions precedent, client follow-up points (or a clean confirmation plus 1–2 minor improvement suggestions if the agreement is clean).
- There is no cover page, table of contents, glossary, or other filler ahead of the Transaction Overview.
---

## Scope Boundaries
This task distils credit-agreement text; it does not audit financial models or build debt schedules.


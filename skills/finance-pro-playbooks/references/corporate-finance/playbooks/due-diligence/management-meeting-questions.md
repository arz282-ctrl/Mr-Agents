# Management Meeting Questions

> **Sections**: Ask First · Workflow · Defaults · Rules & Pitfalls · Pre-Delivery Checks · Scope Boundaries · Task-specific verification
> **Must not skip**: Defaults · Rules & Pitfalls · Pre-Delivery Checks · Scope Boundaries — return here before delivery.
> **Formats**: document_standards.md

> Task `management-meeting-questions` in group `due-diligence`. Read [`_overview.md`](_overview.md) first for group-level scope, shared operating principles, and format dependencies.

**Use when**: Preparing qualitative discussion questions for a live management meeting in an M&A or PE due diligence context | **Deliverable**: Word document + PDF with consecutively numbered, open-ended questions organized by category (optional timed agenda included)

---

## Ask First

1. **Meeting type** — Broad/general (Mode A), focused deep-dive on a specific topic (Mode B), or hybrid (Mode C)?
2. **Depth level** — Preliminary (relationship-building, wide coverage) or deep-dive (sharp probing, assumption stress-testing)?
3. **Meeting duration** — How many minutes is the session?

> These three inputs cannot be inferred from materials or defaulted; generation is blocked until all three are confirmed.

Optional (confirm if not self-evident from materials): target company name and industry; priority topics or areas of concern; whether a timed agenda should be included.

---

## Workflow

1. **Collect mandatory inputs** — Gate on meeting type, depth, and duration before any generation. Do not proceed with incomplete responses to the three Ask First items; request them explicitly if missing.

2. **Analyze available materials** — Review any CIM, management presentation, or financials provided. For public companies, pull regardless of whether materials are supplied: last 2 years of 10-K/10-Q/8-K filings, broker research from the past 90 days, and news from the past 12 months (e.g., acquisitions, new facilities). Identify key theses, value drivers, and risks. Flag every unexplained trend, margin inflection, or revenue acceleration — each flags at minimum one question requiring management to explain it verbally. *(This step must precede question drafting so that questions are company-specific, not template-generic.)*

3. **Set meeting mode** — Confirm Mode A (broad), Mode B (focused), or Mode C (hybrid) and calibrate category scope accordingly:
   - **Mode A**: Use all six default categories (Company Overview, Financial Performance, Commercial/Sales, Operations, Management & Organization, Growth & Strategy/M&A — include M&A only if deal-relevant).
   - **Mode B**: Derive 4–6 sub-topics from the company's specific context (do not pull from a generic fixed list); collapse all questions into those sub-topics; total question count does not decrease — each sub-topic receives more questions.
   - **Mode C**: Apply Mode A structure with Mode B depth on the designated focal area.

4. **Calibrate question count to depth and duration** — Apply the depth/volume scale: preliminary meetings target 15–20 questions per 60 minutes; deep-dive meetings target 20–40. Scale proportionally for other durations. In deep-dive mode, minimize questions on Company Overview (foundational coverage is assumed from earlier sessions); concentrate volume on financial performance, operational drivers, and strategic assumptions.

5. **Draft questions by category** — Write every question in open, discussion-driving form (e.g., "Walk us through…", "How do you think about…", "What gives you confidence that…", "Can you describe how…"). Apply consecutive numbering across all categories without resetting at each new category (enables in-meeting reference by number, e.g., "Let's come back to Question 12"). For known industries, include industry-specific questions probing metrics and dynamics unique to that sector. Vary sentence openers — do not repeat the same lead phrase across consecutive questions.

6. **Apply internal thesis screening (without disclosing it)** — Questions must covertly probe identified theses, risks, and value-driver assumptions. The output must not expose the deal team's analytical judgments, risk flags, or investment thesis language; management will see this document.

7. **Build the Word document** — Structure: document title (see Rules & Pitfalls), optional timed agenda (see #### Agenda Construction below), questions grouped by category with consecutive numbering, consistent formatting throughout. Export to both .docx and PDF. Run sanity checks (see Pre-Delivery Checks) before delivery.

### Agenda Construction (when requested)

- Allocate time across categories proportionally to question count within that category.
- Round all time slots to the nearest 5 minutes.
- Include a wrap-up/closing buffer at the end.
- Verify that all time blocks sum exactly to the stated meeting duration.

---

## Defaults

| Parameter | Default / override |
|---|---|
| Meeting type | Mandatory confirmed Mode A/B/C; no silent default |
| Depth level | Mandatory confirmed preliminary/deep-dive |
| Meeting duration | Mandatory confirmed duration |
| Question count (preliminary / 60 min) | 15–20 |
| Question count (deep-dive) | 20–40 |
| Output format | Word (.docx) + PDF |
| Default categories (Mode A) | Company Overview; Financial Performance; Commercial/Sales; Operations; Management & Organization; Growth & Strategy/M&A |
| Numbering | Consecutive across all categories |
| Timed agenda | Not included unless requested |
| Public company research | Always pulled (2-yr filings + 90-day research + 1-yr news) |

---

## Rules & Pitfalls

**Never:**
- **Never write a question that can be answered by uploading a document**
- **Never convert a DRL request into spoken form**
- **Never include questions requiring specific numbers, data points, or documents**
- **Never include confirmatory or advisor-domain topics** (legal, tax, insurance, regulatory) unless the user explicitly requests them
- **Never fabricate company-specific information**
- **Never generate when mandatory inputs are missing**
- **Never use a long, internally descriptive document title** (e.g., "Mid-Depth Meeting with Sales and Financial Focus")
- **Never expose the deal team's thesis, risk flags, or analytical framing in the output**
- **Never write leading, adversarial, or confrontational questions**

**Conditional:**
- **If no materials are provided and the target is a public company**, still pull 2-year SEC filings, 90-day broker research, and 12-month news before drafting — questions must be grounded in disclosed information, not generic.
- **If no materials are provided and the target is a private company with no public information**, request materials before generating; if the user cannot supply any, produce a clearly labeled generic template or blank structure.
- **If depth is deep-dive**, shift tone toward sharper probing of assumptions, forecast confidence, and risk scenarios; reduce question allocation to Company Overview; increase allocation to Financial Performance and Operations.
- **If Mode B (focused)**, derive sub-topics from the specific company context (e.g., from the CIM or disclosed strategy) — do not apply a generic fixed sub-topic table. Total question count stays the same; volume per sub-topic increases.
- **If an unexplained trend, margin inflection, or revenue acceleration appears in any material**, generate at least one question in that category asking management to walk through the explanation verbally — do not skip anomalies.
- **If a timed agenda is requested**, verify that all time slots sum exactly to the stated meeting duration before delivery.
- **If the industry is known**, include questions probing industry-specific KPIs and competitive dynamics — do not substitute with generic business questions.

**Judgment:**
- **Vary question openers deliberately** — repeating the same lead phrase (e.g., "Can you walk us through…" for every question) signals template use and reduces engagement; vary phrasing while maintaining open, discussion-driving form.
- **In deep-dive mode, weight early Company Overview questions lightly** — foundational context is typically established in preliminary meetings; spending question budget on it in a deep-dive wastes session time with senior management.
- **Frame every risk-probing question from a position of curiosity, not suspicion** — the goal is to let management reveal their narrative; an adversarial tone closes off information rather than surfacing it.
- **Treat each question as a real-time insight tool** — before finalizing, ask whether each question could generate a genuine, unexpected data point in the room. If the answer is likely a scripted IR response, reframe or deepen it.

---
## Pre-Delivery Checks

- Output files are .docx and PDF.
- **every question is open-ended and discussion-driving** — no question should be answerable with a number, a yes/no, or by referencing a document.
- **zero DRL items appear** in verbal form — no specific data points, file requests, or numeric confirmations.
- **no confirmatory or advisor-domain questions** (legal, tax, insurance, regulatory) appear unless explicitly requested.
- Question count matches depth calibration: **15–20 for preliminary/60 min; 20–40 for deep-dive**; proportionally scaled for other durations.
- **numbering is consecutive across all categories** with no reset between sections.
- For Mode A: confirm all six default categories are present; confirm M&A sub-category appears only if deal-relevant.
- For Mode B: confirm all categories have been collapsed into 4–6 company-context-derived sub-topics (not a generic fixed list); confirm total question count is not reduced.
- **every flagged anomaly or unexplained trend has at least one corresponding question**.
- If the company is in a known industry, confirm **industry-specific questions** are present and not substitutable with generic alternatives.
- If a timed agenda was requested, verify **all time blocks sum exactly to the stated meeting duration**, slots are rounded to 5-minute increments, and a wrap-up buffer is included.
- The **document title is presentable to the target company** — no internal descriptors, depth labels, or analytical framing in the heading.
- **no internal thesis, risk hypothesis, or deal team judgment** is visible in the question text or section headers.
- For any assumed information, confirm it is **explicitly labeled as an assumption**.
---

## Scope Boundaries
This task covers target-management discussion questions. Written document requests and third-party expert interviews are separate tasks.

---

## Task-specific verification

Mode, stage, duration and audience are mandatory intake. Defaults are proposals requiring explicit acceptance; missing any mandatory answer blocks drafting. Do not silently instantiate Mode A/Preliminary/60 minutes.


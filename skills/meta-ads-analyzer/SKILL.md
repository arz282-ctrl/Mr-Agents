---
name: meta-ads-analyzer
description: Provides expert-level analysis and diagnosis for Meta Ads campaigns. Interpret performance data, identify root causes, ensure correct metric usage and data integrity, and generate actionable recommendations.
---

# Meta Ads analysis & diagnosis skill

> [!DANGER] > **CRITICAL: FAILURE TO FOLLOW THE RULES IN THIS DOCUMENT WILL RESULT IN TASK FAILURE.**

> [!IMPORTANT] > **SCOPE: The rules in this skill apply to every `meta-marketing` connector tool call and to all outputs and responses — including diagrams, analyses, documents, reports, slides, and any other deliverable. Compliance is required at all times.**

## 1. Non-negotiable rules (MANDATORY)

These are the most common failure points. They are not guidelines; they are absolute requirements.

### 1.1. Audience terminology: use "Accounts Center accounts", never "people" or "users"

- **Reason**: This is a strict terminology requirement from Meta.
- **Rule**: When referring to users, audiences, or reach, you **MUST** use the exact phrase `"Accounts Center accounts"`. The words "people", "person", and "unique users" are forbidden in these contexts — including as units of measurement (e.g., "cost per 1,000 people reached" is invalid).
- **Rule**: `Reach` **MUST** be used as a standalone metric name. Do NOT add modifiers or prefixes (e.g., `Total reach`, `Organic reach`, `74k reach` are all invalid).
- **Examples**:
  - **Correct**: "The campaign reached 10,000 Accounts Center accounts."
  - **INCORRECT**: "The campaign reached 10,000 people."
  - **Correct**: "Reach measures the number of Accounts Center accounts that saw your ad."
  - **INCORRECT**: "Reach measures the number of unique users who saw your ad."

### 1.2. Clicks metrics: use "Clicks (all)" or "Link clicks", never "clicks"

- **Reason**: "Clicks" is ambiguous and leads to incorrect analysis. The API returns separate values for different click types, and conflating them causes misleading reports.
- **Rule**: You **MUST** always use the specific metric name — either `"Clicks (all)"` or `"Link clicks"`. **NEVER** use the word "clicks" alone, in any context, regardless of what other qualified terms appear in the same response.
- **Examples**:
  - **Correct**: "The ad received 1,500 Clicks (all) and 800 Link clicks."
  - **INCORRECT**: "The ad received 1,500 clicks."

### 1.3. Metric naming: use exact names, no modifications

- **Reason**: Consistency and clarity are critical for accurate reporting.
- **Rule**: You **MUST** use exact standardized metric names. This applies **everywhere** — documents, reports, messages to the user, diagrams, slides, and code output. Do not alter a metric name to make it "fit" a visual design.
- **Forbidden prefixes**: **NEVER** add `Total`, `Overall`, or `Average` before a metric name (e.g., `Total Impressions`, `Total clicks (all)` are invalid). If you need to express an aggregate sum, rephrase the surrounding sentence instead.
- **Forbidden suffixes and noun modifications**: **NEVER** change the grammatical form of a metric name or append contextual nouns (e.g., `Accounts Reached`, `Reach Volume`, `Impressions Generated` are all invalid). Even if a name like `Reach` or `Spend` feels too short for a label, do NOT expand it — use the surrounding text to provide context.
- **Forbidden ambiguous terms**: **NEVER** use vague terms like `Video views` or `Video View Rate`. Use the exact standardized display name, such as `3-second video plays`.

### 1.4. Data integrity: currency and dates

- **Currency**: The monetary values returned by the API are already converted into the standard currency unit (e.g., USD, EUR). When presenting any money-related metrics (such as Amount spent, CPC (all), CPM (cost per 1,000 impressions), Cost per result, etc.), use the returned numerical values directly together with the `currency` field from the ad account context. For example, if the API returns `spend: 150.50` and the account currency is `USD`, report it as `$150.50`.
- **Partial dates**: If a query's date range includes today, you **MUST** state that the data is partial and subject to change.

### 1.5. Data scope: account vs. asset level accuracy

- **Reason**: Confusing account-level data with campaign-level (or ad set/ad level) data is a common and critical error. It renders any analysis of specific assets meaningless and misleading.
- **Rule**: You **MUST** ensure the data scope strictly matches the user's query. If a user asks about a specific campaign, you must return data _only_ for that campaign, not the entire account. Before presenting data, double-check that the correct entity ID and reporting level were used in the data retrieval process.

### 1.6. Cross-objective aggregation: display "N/A" for mixed result types

- **Reason**: "Cost per result" cannot be aggregated across campaigns with different objectives (e.g., Sales vs. Lead). Ads Manager returns `null` for this.
- **Rule**: When aggregating across mixed objectives, display `"N/A"` for "Cost per result" and "Results" — do NOT compute these metrics.

### 1.7. Null data handling & data authenticity: never fabricate data

- **Reason**: Ads Manager returns `null` for metrics that cannot be computed or are unavailable. Additionally, presenting fabricated numbers destroys trust and leads to incorrect business decisions.
- **Rule**:
  - When a metric returns `null`, display `"Data not available"` or `"N/A"` — do NOT report the raw null value.
  - **MUST** only report numerical values that are explicitly returned by the API. **NEVER** fabricate, estimate, or invent any data values. If a metric is not available in the API response, do NOT guess or make up a number — always indicate that the data is unavailable.

## 2. Core analysis principles & workflow

### 2.1. Core principles (how to think)

- All data presented must be rigorously verified for accuracy. This includes its scope (e.g., Account vs. Campaign), units (e.g., cents vs. dollars), and timeframes (e.g., partial vs. full day). Never present data without first confirming its integrity.
- Always read values directly from the MCP tool's JSON result for any calculation or reporting — never manually transcribe values from API responses. Reference the JSON file in code or via command line to compute aggregates, ratios, averages, or any derived metrics.
- Evaluate at the aggregate level before drilling down.
- Analyze performance over time, not single snapshots.
- The system prioritizes marginal cost (cost of the _next_ result), not the average. A segment with a higher average CPA might have a lower marginal CPA.

### 2.2. Analysis workflow (how to act)

**Reference documents:** Start by reading `references/breakdown_effect.md`.

1. Use Campaign Level for CBO, Ad Set Level otherwise to avoid the Breakdown Effect.
2. Investigate marginal efficiency, ad relevance diagnostics, and learning phase status.
3. Explain why the system makes its decisions based on marginal cost, not just average cost.

## 3. Output generation rules

- **Never** recommend pausing or reducing budget based solely on higher average CPA/CPM in any analysis or output. Frame changes as testable hypotheses.
- **Always** justify recommendations with data and system mechanics.
- Every insight must include data evidence and an explanation.
- Align with official recommendations from the `meta_marketing_get_recommendations` tool, or explicitly state why you are diverging.
- Visit https://transparency.meta.com/policies and use the relevant policy content to answer every policy-related user query.
- All output **must** be in a single, consistent language.
- Always use sentence case for metric names (e.g., `Link clicks`).
- DO NOT shorten or change the terminologies for brevity, natural flow, or conversational purposes.
- **Before delivering any output**, verify compliance with all non-negotiable rules in Section 1 — especially metric naming, clicks qualifiers, and audience terminology. Correct any violations before delivery.

## 4. Meta Ads domain knowledge

### Campaign & performance concepts

- **Conversion ads:** Ad entities with objectives like Lead, Sales, or App Promotions are categorized as conversion ads.
- **Conversion rate:** Conversion rate = conversion / impression.
- **Performance indicators:** Lower value of Cost Per result or CPM is associated with higher performance. Higher value of ROAS is associated with higher performance.

### Budget & billing

- **Daily spending limit (DSL):** The current daily spending limit that advertisers can check, increase, or decrease.
- **Billing threshold (payment threshold):** The amount of ad spend that triggers a payment method charge when reached. Advertisers can check limit, lower, or increase their payment threshold. The billing threshold is also relevant to billing frequency (e.g., monthly billing, daily billing).

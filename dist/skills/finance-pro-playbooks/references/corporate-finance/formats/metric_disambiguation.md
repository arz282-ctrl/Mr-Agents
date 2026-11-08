# Metric Disambiguation: Data-Source Trap Appendix

> This document is the Data-Source Trap Appendix, not the source of metric definitions. The Skill's default formulas and conventions come from [`references/metric-dictionary.md`](../../metric-dictionary.md); explicit user-provided definitions override defaults with qualified naming and traceability. This appendix records naming pitfalls of standardized endpoints, differences in inclusions/exclusions, and when to rebuild from original disclosure for independent verification. Internal-document conflicts defer to the metric dictionary, not to a silent override of the user's requested basis.

## 1. Operating Profit vs. EBIT vs. EBITDA

> Authority for formulas: [`metric-dictionary.md §Financials & Valuation`](../../metric-dictionary.md#financials-and-valuation) (EBITDA, EBIT Margin rows).

| Metric | Standard Endpoint Behavior | When to use | When to avoid |
| --- | --- | --- | --- |
| **Operating Income (Profit)** | Typically includes D&A. Does NOT include non-operating income/expenses (e.g., interest, taxes, equity in earnings of affiliates). | Standard margin analysis. | Do not use if the user explicitly asks for EBIT, as Operating Income excludes non-operating items that are part of EBIT. |
| **EBIT** | Earnings Before Interest and Taxes. Often calculated as Net Income + Interest + Taxes. | Standard valuation multiples (EV/EBIT). | Do not confuse with Operating Income. |
| **EBITDA** | EBIT + D&A. Standardized endpoints usually provide a clean, unadjusted EBITDA. | Standard valuation multiples, basic screening. | Do not pass a standardized endpoint field off as independently reconciled "Adjusted EBITDA", "Covenant EBITDA", or "Management EBITDA". To validate the customized metric, parse the earnings release or filing reconciliation; if the user explicitly requested the vendor's field, quote it as vendor-defined and single-source instead. |

## 2. Earnings Per Share (EPS)

> Authority for formulas: [`metric-dictionary.md §Financials & Valuation`](../../metric-dictionary.md#financials-and-valuation) (P/E row: EPS convention, LTM/NTM, GAAP/adjusted labeling requirements).

| Metric | Standard Endpoint Behavior | When to use | When to avoid |
| --- | --- | --- | --- |
| **Basic EPS** | Net Income / Basic Weighted Average Shares. | Rarely used in valuation. | Avoid in almost all valuation contexts. |
| **Diluted EPS** | Net Income / Diluted Shares (includes options, warrants, convertible debt). | Standard P/E multiples. | Avoid if the user asks for "Adjusted EPS" or "Non-GAAP EPS". |
| **Adjusted / Non-GAAP EPS** | Excludes one-time items, amortization of intangibles, and often Stock-Based Compensation (SBC). | Tech/Software valuation, management performance tracking. | Rarely available cleanly via standard endpoints. Parse the company's Non-GAAP reconciliation. |

## 3. Enterprise Value (TEV) & Debt

> Authority for formulas: [`metric-dictionary.md §Financials & Valuation`](../../metric-dictionary.md#financials-and-valuation) (EV, Net Debt, EV/EBITDA rows, includes consistency constraint for operating leases between numerator and denominator).

| Metric | Standard Endpoint Behavior | When to use | When to avoid |
| --- | --- | --- | --- |
| **Total Debt** | Usually includes Short-Term Debt, Current Portion of Long-Term Debt, and Long-Term Debt. | Basic capital structure. | Be careful with Operating Leases. Post-ASC 842 / IFRS 16, operating lease liabilities are on the balance sheet. Standard "Total Debt" endpoints may or may not include them. |
| **Net Debt** | Total Debt - Cash & Equivalents (- Short Term Investments). | Enterprise Value calculation. | Ensure you know if restricted cash or long-term investments are excluded. |
| **Enterprise Value (TEV)** | Use the EV definition in the authoritative metric dictionary. | EV/EBITDA, EV/Revenue multiples. | **Lease basis**: follow [metric-dictionary.md §Custom and Adjusted Metrics](../../metric-dictionary.md#custom-and-adjusted-metrics). Identify rent deduction, lease debt inclusions and the accounting standard before comparing multiples. EBITDAR adds back rent; do not label it as post-rent EBITDA or apply a blanket lease-debt exclusion. |

## 4. Multiples: Trailing vs. Forward

> Authority for formulas: [`metric-dictionary.md §Financials & Valuation`](../../metric-dictionary.md#financials-and-valuation) (All multiples rows require LTM/NTM labeling).

| Metric | Standard Endpoint Behavior | When to use | When to avoid |
| --- | --- | --- | --- |
| **LTM (Trailing) Multiples** | Uses Last Twelve Months (LTM) financial data. | Precedent transactions, mature company comps. | Ensure the LTM period is explicitly dated (e.g., "LTM as of Q3 2024"). |
| **NTM (Forward) Multiples** | Uses Next Twelve Months (NTM) consensus estimates. | High-growth tech, software, forward-looking comps. | **Never mix NTM multiples with LTM financials.** If the user asks for "Forward P/E", you must fetch consensus estimates, not trailing Net Income. |

## 5. Free Cash Flow (FCF)

> Authority for formulas: [`metric-dictionary.md §Financials & Valuation`](../../metric-dictionary.md#financials-and-valuation) (FCF, FCFE and FCFF rows).

| Metric | Standard Endpoint Behavior | When to use | When to avoid |
| --- | --- | --- | --- |
| **FCF (levered)** | A provider may report CFO less CapEx; apply the separate FCF definition in the metric dictionary. | Cash generation and disclosed FCF analysis. | Do not relabel it FCFE without the net-borrowing bridge; not an Enterprise Value DCF cash flow. |
| **FCFE** | Reconcile the source CFO basis and net borrowing using the metric dictionary. | Equity cash-flow valuation and distribution capacity. | Do not omit debt principal repayments/new borrowing or use for an Enterprise Value DCF. |
| **Unlevered FCF (FCFF)** | Rebuild from original inputs using the FCFF definition in the metric dictionary. | Enterprise Value DCF Modeling. | A provider FCF field is not automatically clean FCFF. |

## Golden Rule for Custom Metrics

> The normative version of this rule has been moved to [`metric-dictionary.md §Custom and Adjusted Metrics`](../../metric-dictionary.md#custom-and-adjusted-metrics), and applies to all nine domain modules.

For independently analyzed metrics prefixed **"Adjusted", "Covenant", "Pro Forma", "Run-rate", or "Management"**, do not treat a similarly named standardized API field as a verified reconciliation. Rebuild from the original filing, CIM, or Earnings Release. If the user instead explicitly requests the named provider's field as reported, retain that provider-defined source and label its verification limits rather than replacing it with a different formula.

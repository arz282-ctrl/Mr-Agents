# Unified Scoring and Confidence Standard

Read this file when the task includes total scores, ratings, rankings, thresholds, recommendation levels, or confidence. Do not treat scores as objective facts; present composition, evidence, coverage, and hard-threshold results together.

## Scoring Sequence

1. Execute hard gates first; if a hard gate fails output `fail`, and do not offset it with other high scores.
2. Calculate each dimension score according to this file or a user-explicitly approved scoring profile.
3. Compute coverage for missing items; do not treat missing values as 0.
4. Apply explicit penalties/bonuses and preserve an audit trail.
5. Compute confidence; separate score and confidence.
6. Map scores to decision bands, and have domain modules interpret them with risk and failure conditions.

## General Formulas

Let dimension scores be `s_i∈[0,100]`, weights be `w_i`, and the set of available dimensions be `A`:

`BaseScore = Σ(i∈A)(w_i × s_i) / Σ(i∈A)w_i`

`Coverage = Σ(i∈A)w_i / Σ(all i)w_i`

`FinalScore = clamp(BaseScore + Bonuses - Penalties, 0, 100)`

By default total bonuses must not exceed 5 points and total penalties must not exceed 15 points; any adjustment must include name, triggering evidence, score, and cap. If using other ranges, normalize to 0–100 first.

## General Scoring Anchors

Each dimension must define observable anchors for 0, 25, 50, 75, 100. Interpolate only when evidence lies between two anchors.

| Score | General Meaning | Evidence Requirement |
|---:|---|---|
| 0 | Clear failure, materially negative evidence, or unacceptable risk | At least one locatable hard piece of evidence |
| 25 | Significantly below reasonable benchmark; risk-dominant | Multiple negative pieces of evidence or a critical gap |
| 50 | Neutral, mixed, or near benchmark | Supporting and contradicting evidence roughly balanced |
| 75 | Clearly above benchmark with controllable risk | Multiple independent supporting pieces of evidence |
| 100 | Extremely strong and highly consistent, near predefined upper bound | Strong evidence, low conflict; do not award based solely on subjective impression |

Quantitative dimensions must define specific thresholds for 0/25/50/75/100 within the task. Qualitative dimensions that cannot give thresholds must list evidence and counter-evidence; do not output decimal-level precision.

## Coverage and Availability

| Coverage | Status | Allowed Output |
|---:|---|---|
| `>=90%` | Complete | Score, rating, and dimension breakdown |
| `80%–<90%` | Essentially complete | Score and rating, but flag gaps |
| `60%–<80%` | Provisional | Output only `provisional` score; do not make a strong recommendation |
| `<60%` | Insufficient | Do not output a total score; list only evaluated dimensions |

If fields required by a hard gate are missing, status is `unknown_gate` and must not be considered passing.

## Decision Bands

| Score | Default Label | Meaning |
|---:|---|---|
| 85–100 | `strong` | Evidence strongly supports, but still subject to hard gates and confidence constraints |
| 70–<85 | `positive` | Overall supportive, with explicit risks and monitoring items |
| 55–<70 | `watch` | Mixed pros and cons; await conditions or additional evidence |
| 40–<55 | `weak` | Negative factors dominate; not recommended to actively increase risk |
| 0–<40 | `reject` | Does not meet requirements or risk is unacceptable |

This is the default mapping and does not constitute buy/sell advice. User or institutional custom thresholds may override defaults but must be fixed and recorded before the task begins.

## Confidence

Confidence measures evidence reliability, not investment attractiveness. Score each item 0–100:

`ConfidenceScore = 0.35×SourceQuality + 0.30×DataCoverage + 0.20×CrossSourceConsistency + 0.15×RecencyFit`

| Dimension | 0 | 50 | 100 |
|---|---|---|---|
| Source Quality | Anonymous or untraceable | Single credible secondary source | Authoritative primary or verified structured source |
| Data Coverage | Key fields largely missing | Major fields available but with key gaps | All decision fields complete |
| Cross-Source Consistency | Key sources conflict | Single source or minor differences | Multiple independent sources consistent |
| Recency Fit | Clearly stale | Barely meets research-level needs | Meets task-level needs with timestamps |

Confidence labels: `high >=80`; `medium 60–<80`; `low <60`. If any hard gate is `unknown_gate`, maximum possible label is `medium`; if key factual conflicts remain unresolved, maximum possible label is `low`.

## Domain Scoring Profiles

The following are default profiles. If the user employs a custom framework, preserve the same audit fields.

| Profile | Dimensions & Weights | Typical Hard Gates |
|---|---|---|
| `equity_v1` | Business and moat 20; Financial quality 25; Valuation & expectations 20; Growth & catalysts 15; Balance sheet 10; Governance & risk 10 | Security or reporting period unclear; missing key valuation inputs |
| `fund_etf_v1` | Exposure fit 25; Total cost 20; Structure & replication 20; Liquidity 15; Tracking quality 10; Concentration & operational risk 10 | Product not tradable; index or leveraged structure mismatch |
| `options_v1` | Objective fit 20; Liquidity 20; Volatility environment 15; Payoff/risk structure 25; Events & manageability 20 | Maximum loss not computable; quotes stale; disallowed naked risk |
| `crypto_v1` | Market structure 20; Cross-venue liquidity 20; Derivatives/on-chain evidence 20; Leverage & tail risk 25; Operational security 15 | Asset/network unclear; key contracts unverified; private key requests |
| `portfolio_v1` | Objective fit 20; Diversification & concentration 20; Downside resilience 25; Liquidity & cash 15; Costs & executability 10; Research quality 10 | Portfolio unreconcilable; hard-constraint violations unaddressed |
| `quant_v1` | Data and timeliness 25; Rule completeness 15; Out-of-sample performance 20; Robustness 20; Cost feasibility 10; Tail risk 10 | Look-ahead bias; unreproducible; key costs zero and untested |
| `trade_signal_v1` | Upstream research 20; Technical structure 25; Liquidity & execution 20; Payoff/risk 20; Events & tail risk 15 | Quotes stale; no stop-loss/failure conditions; missing risk budget |
| `deal_screen_v1` | Strategic fit 20; Economics 25; Downside protection 20; Governance & terms 15; Execution feasibility 20 | Violates investment prohibitions; key parties/terms unclear; evidence untraceable |

## Dimension Anchor Examples

Before using a profile, expand each dimension into observable anchors. For example, the "Liquidity & Execution" dimension in `fund_etf_v1` can be set per the task market:

| Score | Example Anchors |
|---:|---|
| 0 | No reliable quotes or cannot subscribe/redeem/trade |
| 25 | Spreads and volume insufficient to support target order, and no alternative execution path |
| 50 | Tradable but orders require splitting or limit orders; costs moderate |
| 75 | Liquidity sufficient, spreads acceptable, execution risk low |
| 100 | Depth for target order size, multiple market makers, and executable under stress scenarios |

Do not apply the above qualitative examples directly to all markets; provide numeric thresholds that account for order size, trading session, and actual distribution.

## Gates, Penalties, and Ranking

Hard gates must only output `pass`, `fail`, or `unknown_gate`. When `fail` occurs retain dimension scores for diagnostics, but set final label to `ineligible`.

Apply penalties to events not fully captured in dimension scores, such as major data conflicts, single-client concentration shocks, near-term liquidity to maturity, unresolved governance issues, or excessive backtest parameterization. Do not deduct the same risk both in dimension scores and penalties.

When ranking, group by eligibility first, then sort by `FinalScore`, then by `ConfidenceScore`; when score differences are under 3 points treat them as approximate ties and avoid creating false-precision rankings.

## Audit Output

```yaml
score_profile: portfolio_v1
hard_gates:
  - name: portfolio_reconciled
    status: pass | fail | unknown_gate
    evidence: string
dimensions:
  - name: downside_resilience
    weight: 25
    score: 75
    anchor_used: string
    evidence: []
coverage: 0.92
base_score: 72.4
adjustments:
  bonuses: []
  penalties: []
final_score: 72.4
decision_band: positive
confidence_score: 81
confidence_label: high
status: eligible | ineligible | provisional | insufficient
```

Do not output only a total score. Whenever weights, anchors, gates, or adjustments change, update the profile version or record coverage items in the results.

# Privacy and Sensitive Financial Data Policy

Read this file when a request or input includes holdings, costs, cash, transaction history, accounts, wallets, orders, contacts, recordings, non-public documents, or any credentials.

## Data Classification

| Level | Examples | Default Handling |
|---|---|---|
| `P0 Public` | Public market data, published financial reports, public fund documents | Usable for reports, still record source |
| `P1 Internal` | Unpublished research notes, internal ratings, draft meeting minutes | Use only for the current task, do not publish externally |
| `P2 Personal/Financial` | Names, emails, phone numbers, holdings, costs, cash, transaction history, tax or income information | Minimize, de-identify, restrict outputs and logs |
| `P3 Credential/Secret` | Passwords, API keys, tokens, cookies, private keys, mnemonics, full account numbers | Do not read plaintext; do not write to files or output; use only authorized connections or environment variables |

Verified public token/protocol contract identifiers are P0 when needed for asset identity and source traceability; record their network and authoritative source evidence in task working records. This exception never applies to a user wallet or credentials. Treat wallet addresses, exchange UIDs, broker account numbers, and order IDs as `P2` even if publicly searchable. Treat private keys and mnemonics always as `P3`; do not request them from users.

## Verified Public Contract Input

Before using a public protocol contract identifier, verify its network, purpose and identity read-only against an authoritative original source. A result label, HTTPS URL or file checksum alone does not establish authority. Keep the actual source and locator in working records; no separate registry file or machine field is required.

This exception applies only to genuine public protocol identifiers needed for the analysis. Private user wallet/account identifiers remain protected. Include a full public identifier only where necessary for unambiguous analytical identity or the verified source reference; mask unnecessary identifiers in visible text and delivered artifacts. Keep evidence internal unless requested.

## Minimization Rules

1. Collect only the fields necessary to complete the current task. Portfolio analysis or a manual trade plan may require the asset, quantity, cost, and currency; do not collect name, email, full account number, broker order identifier, or identification.
2. Use stable aliases instead of real identifiers, e.g., `account_A`, `wallet_1`, `client_X`. Do not write alias mappings into the final report.
3. For screenshots, PDFs, CSVs, and recordings, first identify sensitive regions, then extract only required fields; exclude unrelated pages and columns from working files.
4. If a user voluntarily provides unnecessary P2/P3 data, ignore or mask it; do not reproduce it in replies.
5. Do not use user data for examples, templates, test cases, or cross-task memory.

## Field Handling Matrix

| Field | Typically required? | Workspace handling | Final output |
|---|---|---|---|
| Asset, quantity, cost | Required for portfolio analysis or manual trade planning | Retain until task completion | May display aggregated; show on user request |
| Account name | No | Convert to alias | Alias only |
| Full account number | No | Do not save; keep last 4 digits at most for verification | Mask as `***1234` |
| Wallet address | Required only for read-only on-chain analysis | Hash or keep first 6 / last 4 chars; use original only with read-only analytical services | `0x123456…89ab` |
| Historical order ID | Not required by default; optional only in a user-supplied read-only record | Do not retain the original; replace immediately with a local alias if comparison requires linkage | Alias only |
| Name, email, phone | Required for minutes/contacts scenarios | Use role or alias | Mask unless explicitly required for delivery |
| API key/token/cookie | Should not appear in content | Use only via authorized connections or environment variables | Never output |
| Private key/mnemonic/password | Never required | Refuse to receive or process | Never output |
| Recording/transcript | Required for minutes scenarios | Process only required segments and speaker labels | Remove unrelated personal information |

## Credential Management

- Read credentials only through authorized read-only data connections, the system key store, or environment variables. Never use any credential to access a transaction, custody, order-management, signing, or transfer endpoint.
- Do not write credentials into `SKILL.md`, References, scripts, command-line arguments, JSON input files, logs, exception stacks, screenshots, or reports.
- Do not print environment variables, echo request headers, or save authentication information from full API responses to files.
- On discovering a suspected key, immediately stop propagation, replace it with `[REDACTED_SECRET]`, and prompt the user to rotate it; do not test or validate that key.
- Do not ask users to send private keys, mnemonics, passwords, or one-time verification codes.

## Files and Logs

1. Use a separate working directory for each task, with permissions following the principle of least visibility.
2. Do not copy original P2 files to unnecessary locations; derived files should retain only fields required to complete the task.
3. Log only steps, status, field names, and de-identified summaries; do not log full rows of data, accounts, wallets, orders, or request bodies.
4. Filter error messages for URL query parameters, request headers, stack-local variables, and file contents.
5. Delete temporary files after verification; do not attach original sensitive inputs in final delivery unless the user explicitly requests them.
6. Do not upload sensitive files to public links or third-party services; if external services are necessary, disclose the data scope and obtain user consent first.

## Retention and Deletion

By default, retain P2/P3 data only for the current task lifecycle. After task completion, delete original copies not required for delivery, temporary extracts, caches, debug logs, and credential files. If the user explicitly requests ongoing maintenance of holdings, first disclose which fields will be stored, their purpose, location, retention period, and deletion method; do not retain data persistently without explicit consent.

Deletion checklist:

```yaml
raw_inputs_removed: true | false | not_applicable
derived_sensitive_files_removed: true | false | not_applicable
temporary_uploads_removed: true | false | not_applicable
logs_redacted: true | false
credentials_absent_from_files: true | false
retained_files:
  - path: string
    reason: string
    classification: P0 | P1 | P2
```

## Recordings, Meetings, and External Materials

Process recordings or transcripts only when the user has the right to provide the material. Use role labels instead of personal identities; retain names only when required for delivery. External materials must not include private contact details, account information, unpublished holdings, unauthorized quotations, or contents of confidentiality agreements.

## Output De-identification

Before delivery, scan for the following patterns and manually verify context: email addresses, phone numbers, full bank/account numbers, identification numbers, API key formats, Bearer tokens, private key/mnemonic hints, full wallet addresses, order IDs, URLs with credentials. Automatic detection alone does not prove safety; any hit must be evaluated for business necessity.

Suggested replacement formats:

| Type | Replacement example |
|---|---|
| Name | `Client A`, `Speaker 2` |
| Email | `a***@example.com` |
| Phone | `***-***-1234` |
| Account | `account_A (***1234)` |
| Wallet | `0x123456…89ab` |
| Order | `order_7f2a` |
| Key | `[REDACTED_SECRET]` |

## Failure and Incident Handling

If sensitive data is suspected to have been written to an insecure file or output: stop further propagation, locate copies, delete or mask them, regenerate deliverables, and inform the user of the categories of affected data and recommended actions. Do not reproduce sensitive values in incident descriptions.

The final privacy status must include: which data categories were processed, which minimization measures were used, which files were retained, whether credentials were found, and whether deletion was completed.

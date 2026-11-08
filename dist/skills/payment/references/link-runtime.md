# Link on Device-only and Long Sandbox

Read only when Stripe Link is enabled and the task uses Device-only or Long Sandbox execution.

Use the session-scoped executable for all Link commands:

```sh
"$MANUS_CONFIG_HOME/connectors/stripe-link/link-cli" <args...>
```

In PowerShell:

```powershell
& "$env:MANUS_CONFIG_HOME/connectors/stripe-link/link-cli.cmd" <args...>
```

This runs the official Link CLI with the session's wallet credentials. Read `link-payment` if listed; otherwise read the executable's `--llms-full` and the command's `--schema`. Use `--format json`.

The user approves each spend request in Link. Never use `--approve` or provide approval details on the user's behalf.

## Retrieve the approved card

Use one self-contained command that exports the approved card into a fresh private temporary directory outside the project and leaves the terminal's working directory unchanged.

POSIX:

```sh
( card_dir="$(mktemp -d)" && cd "$card_dir" && "$MANUS_CONFIG_HOME/connectors/stripe-link/link-cli" spend-request retrieve <id> --include card --output-file "card-${card_dir##*/}.json" --format json )
```

PowerShell:

```powershell
& { $ErrorActionPreference = 'Stop'; $card_id = [guid]::NewGuid().ToString('N'); $card_dir = Join-Path $env:TEMP $card_id; New-Item -ItemType Directory -Path $card_dir -ErrorAction Stop | Out-Null; Push-Location -LiteralPath $card_dir -ErrorAction Stop; try { & "$env:MANUS_CONFIG_HOME/connectors/stripe-link/link-cli.cmd" spend-request retrieve <id> --include card --output-file "card-${card_id}.json" --format json } finally { Pop-Location } }
```

Use only the absolute `card_output_file` returned by that successful retrieve. If it is missing, stop: the output may contain card data, so do not quote or reuse it.

Read the returned file once with the terminal, then fill the observed checkout fields through the In-App Browser `js` tool's element methods `setValue`, `typeText`, or `selectOption`. Native `browser_fill` and `browser_select` accept only one-time references there.

Apart from the required private export above, never put card values in chat, files, uploads, or attachments. Never reuse or overwrite a card file. Delete both the card file and its temporary directory when checkout completes, fails, is taken over, or is abandoned.

## Runtime failures

If Link reports `LINK_NETWORK_PERMISSION_REQUIRED`, rerun the same self-contained command with the exec tool's `network=true` and a justification.

Do not set any `LINK_*` environment variables, change Link endpoints or proxies, sign in, or use another wallet. If the executable is unavailable, report that the computer runtime needs updating.

Source: [original payment block](original-block.txt).

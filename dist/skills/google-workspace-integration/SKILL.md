---
name: google-workspace-integration
description: "Use the session's enabled Google Workspace connector through gws, with rclone reserved for bulk sync or binary transfer. Applies when Workspace CLI is available, not to the legacy Drive-only branch."
---


# Google Workspace Integration

Apply when `google_drive_enabled=true` and `gog_cli_disabled=false`. Use current session context for `device_only_execution_enabled`, `long_sandbox_execution`, and optional `google_workspace_scopes`.

When scopes are supplied, follow their enabled services and access levels: `READ` is read-only; `FULL` permits reads and writes.

## Device-only or Long Sandbox

Plain `gws ...` and `rclone ...` retain the user's existing local configuration. When choosing the enabled Google Workspace connector, use:

```sh
"$MANUS_CONFIG_HOME/connectors/google/gws" <args...>
```

In PowerShell:

```powershell
& "$env:MANUS_CONFIG_HOME\connectors\google\gws.cmd" <args...>
```

Before first use, check whether `gws` is installed. If missing, install the official native release on the user's computer and report the exact error if installation fails. Do not run `gws auth login` or change the user's gws configuration. Run the connector wrapper with `--help` before first use to learn available services and subcommands.

Use the connector rclone wrapper only as a fallback for bulk sync or binary upload/download, with the fixed remote `manus_google_drive:<path>`:

```sh
"$MANUS_CONFIG_HOME/connectors/google/rclone" <args...>
```

In PowerShell:

```powershell
& "$env:MANUS_CONFIG_HOME\connectors\google\rclone.cmd" <args...>
```

Check whether rclone is installed first. If missing, install it with an available system package manager or an official native release. Never run `rclone config` or pass `--config` in this mode.

Run each connector wrapper directly as a top-level `exec` command, with its path written out in full. Do not invoke a wrapper through scripts or subprocesses, and do not build its path from variables or string operations; use scripts only to process saved command output afterward.

## Other Sandbox execution

Use the preconfigured `gws` CLI through `exec`. Run `gws --help` before first use to learn available services and subcommands.

Use rclone only as a fallback for bulk sync or binary upload/download:

```sh
rclone <command> [args...] --config /home/ubuntu/.gdrive-rclone.ini
```

The fixed remote is `manus_google_drive:<path>`.

Review provenance: [original block and enclosing conditions](references/original-block.txt). The separate legacy `google_drive_integration` block is intentionally excluded.

---

## Portability & Multi-Agent Execution Notes

This skill was canonicalized from the Mr-Agents collection for universal agent compatibility.

- **Primary Target Category:** devops
- **Required Capabilities:** filesystem, network
- **Path Resolution:** Any historical references to `/home/ubuntu/...` should be mapped to the active workspace root or `$TMPDIR` on your host operating system.
- **Authentication & Connectors:** Pass any required API keys or tokens via standard environment variables or MCP server configurations rather than proprietary platform connectors.

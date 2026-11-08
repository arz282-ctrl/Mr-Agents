# Security & Threat Model (SECURITY.md)

## 1. Security Philosophy & Hard Rules

Mr-Agents distributes 276 specialized skills comprising thousands of instructions, scripts, references, and configuration files. Because skills in community repositories may originate from diverse sources, **all skill contents are treated as untrusted data payloads**.

### Core Guardrails:
1. **Zero Execution of Skill Scripts:** Neither `tools/normalize.py`, the `mr-agents` CLI, nor the test suite executes any script bundled within a skill during installation, indexing, or verification.
2. **Cryptographic Integrity (SHA-256):** Every canonical skill in `dist/skills/` has its full directory structure hashed deterministically. The CLI verifies the SHA-256 digest against `dist/catalog.json` before writing any byte to the destination.
3. **No Code Evaluation or Hooks:** The installer strictly executes deterministic file system operations (directory creation, file copying, rule formatting, and managed block merging). No `eval()`, shell evaluation, or `postinstall` hooks are permitted.
4. **No Telemetry, No Tracking:** The CLI contains zero telemetry, zero analytics, and zero external tracking.

---

## 2. Threat Analysis & Mitigations

### Threat 1: Malicious Executables or Scripts in Skills
- **Attack Vector:** An attacker submits a skill containing a malicious `.py`, `.sh`, or binary designed to execute when installed.
- **Install-Time Mitigation:**
  - Hard Rule 3 forbids running skill scripts.
  - The CLI does not make files executable (`chmod +x` is not invoked on installed skill scripts).
  - Skills operate purely as contextual guidance and templates read by AI models when relevant.
- **Runtime Execution Risk & Agent Guardrails:**
  - **Important Distinction:** The installer guarantees 0 code execution at install time, but once installed, an autonomous agent (such as Claude Code, Antigravity, or Gemini CLI) may invoke scripts under `scripts/` via its native Bash/Terminal tool if a user's prompt matches that skill's workflow.
  - **Mitigation:** Developers should skim the `scripts/` directory of any skill prior to triggering workflows that execute external automation scripts.

### Threat 2: Remote Supply Chain & Floating Branch Risks
- **Attack Vector:** Executing `npx github:...` tracks the repository's default branch, which could undergo unexpected changes or point to an unmerged branch.
- **Mitigation:**
  - Always pin the specific commit hash, release tag, or branch in remote invocations:
    ```bash
    npx github:arz282-ctrl/Mr-Agents#v1.0.0 install --pack starter --agent claude-code --dry-run
    ```
  - When working from a feature branch:
    ```bash
    npx github:arz282-ctrl/Mr-Agents#feat/universal-skills install --pack starter --agent claude-code --dry-run
    ```

### Threat 3: Multi-Tool Spray with `--agent auto`
- **Attack Vector:** Using `--agent auto` on a system with multiple AI IDEs or tools installed might select an unexpected agent or install into multiple environments.
- **Mitigation:**
  - Prefer explicit agent naming (e.g. `--agent claude-code`, `--agent cursor`, `--agent antigravity`) instead of `auto`.
  - Always preview planned actions with `--dry-run` before actual installation.

### Threat 4: Path Traversal (`../` Attacks)
- **Attack Vector:** A crafted skill attempts to write outside the intended agent directory (e.g. `../../etc/cron`).
- **Mitigation:**
  - `src/paths.js` uses `path.resolve()` and `path.normalize()` with strict prefix validation against the project root or user configuration directories.

### Threat 3: Accidental Overwriting of User Configuration
- **Attack Vector:** Installing a skill clobbers a user's custom `AGENTS.md`, `CLAUDE.md`, or existing `.cursor/rules/`.
- **Mitigation:**
  - **Managed Blocks:** Shared instruction files only edit content between `<!-- mr-agents:begin -->` and `<!-- mr-agents:end -->`. User content outside these markers is 100% preserved.
  - **Automated Backups:** Any existing rule file or directory is backed up to `.mr-agents/backup/<timestamp>/` before an overwrite is attempted.
  - **Idempotency:** Re-running install checks checksums and skips unchanged files without touching the disk.

### Threat 4: Network & Supply Chain Vulnerabilities
- **Attack Vector:** Dependency hijacking or malicious network requests.
- **Mitigation:**
  - The CLI uses pure Node.js standard libraries (`node:*`) with **zero external npm dependencies**.
  - No network requests are made during CLI operations except fetching from the pinned GitHub repository when running in remote mode.

---

## 3. Vulnerability Reporting

If you discover a security issue or potential exploit in Mr-Agents, please report it privately via GitHub Security Advisories or by contacting the maintainers directly at Rareware Studio.

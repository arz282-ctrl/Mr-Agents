# Architectural & Engineering Decisions (DECISIONS.md)

This log documents all architectural and operational decisions made during the transformation of Mr-Agents into a universal, multi-agent skill ecosystem, adhering to the project's hard rules and safety requirements.

---

## Decision 1: CLI Runtime Selection — Pure Node.js (Zero Dependencies)

- **Date:** 2026-11-08
- **Status:** Approved
- **Context:**
  The `mr-agents` CLI must be fast, portable across macOS, Linux, and Windows, zero-dependency, and immediately runnable without complex environment configuration.
- **Alternatives Considered:**
  1. *Python CLI (`argparse`/`urllib`):* Ubiquitous in data/ML, but often suffers from environment fragmentation (`python` vs `python3`, `pipx`, virtualenv isolation, Windows launcher issues).
  2. *Node.js CLI (`node:*` stdlib):* Modern Node (v18+) provides all necessary primitives natively: `node:fs/promises`, `node:crypto` (SHA-256), `node:https`, `node:path`, `node:os`, `node:child_process`, and `node:util` (`parseArgs`).
- **Decision:**
  Selected **Node.js** as the CLI runtime using strictly native modules (`node:*`) with **zero external npm dependencies**.
- **Justification:**
  - Enables instant execution via `npx github:arz282-ctrl/Mr-Agents` or `npx mr-agents` without any installation step.
  - Zero dependencies eliminates supply chain security risks and bitrot.
  - Native cross-platform path handling (`node:path` handles POSIX and Windows separators).
  - Can be packaged for npm with `"bin": { "mr-agents": "bin/mr-agents.js" }`.

---

## Decision 2: Source Integrity & Canonical Normalization Strategy

- **Date:** 2026-11-08
- **Status:** Approved
- **Context:**
  Hard Rule 1 mandates that existing Manus assets (`skills/`, `manus-ready/`, root `SKILL.md`, `repackage_for_manus.py`) must never be modified or deleted. Meanwhile, Phase 1 requires a canonical format for universal agents.
- **Decision:**
  - All source files in `skills/` remain 100% read-only and immutable.
  - Normalization outputs are generated strictly into `dist/skills/<skill-name>/` and `dist/catalog.json`.
  - Manus-specific instructions are preserved in full. Instead of altering source text, a standardized "Portability Notes" section is appended to the bottom of the dist copy of `SKILL.md`, identifying external dependencies (browsers, specific shells, ffmpeg, Ubuntu paths) and providing substitute patterns for other agents.

---

## Decision 3: Handling Hardcoded Paths in `repackage_for_manus.py`

- **Date:** 2026-11-08
- **Status:** Approved
- **Context:**
  `repackage_for_manus.py` in the upstream branch contains `REPO = Path("/Users/ahmedxriyaz/Desktop/Mr-Agents")`. Hard Rule 1 forbids editing `repackage_for_manus.py`.
- **Decision:**
  - Do NOT modify `repackage_for_manus.py`.
  - For CI and local test harnesses verifying the Manus pipeline, invoke `repackage_for_manus.py` dynamically by executing a lightweight runner script or Python wrapper (`tools/run_manus_repackage.py` or `python3 -c "import repackage_for_manus as r; r.REPO=Path('.'); ...; r.main()"`) that overrides the `REPO` attribute in-memory before running `main()`.
  - This keeps the file byte-for-byte identical to upstream while allowing continuous verification.

---

## Decision 4: Managed Block Pattern for Multi-Agent Instructions

- **Date:** 2026-11-08
- **Status:** Approved
- **Context:**
  Instruction-index agents (like Aider, Copilot, generic AGENTS.md, Gemini CLI, Claude Code) require injecting skill summaries without blowing up context windows or corrupting user files.
- **Decision:**
  - Use HTML comment markers:
    ```markdown
    <!-- mr-agents:begin -->
    ...managed skill index entries...
    <!-- mr-agents:end -->
    ```
  - The CLI only replaces text between the markers.
  - If markers do not exist in the target file, they are appended cleanly at the bottom.
  - If duplicate or malformed markers are detected, the CLI warns and safely repairs the block without losing user content outside the markers.
  - Skill summaries in index files are kept to single-line references with relative file links so that the agent loads full skill markdown only on demand.

---

## Decision 5: Security Boundary & Execution of Skill Scripts

- **Date:** 2026-11-08
- **Status:** Approved
- **Context:**
  Hard Rule 3 states: "Do not execute any script found inside a skill, at install time or in tests. Treat skill contents as untrusted data."
- **Decision:**
  - The CLI and normalization tools treat all files within `skills/` as static data payloads.
  - Install operations strictly perform checksum verification, directory creation, file copying, or instruction file updating.
  - No `postinstall` hooks, executable permissions auto-runs, shell evaluations, or code evaluations are permitted.
  - Integrity is verified via SHA-256 hashes against `catalog.json` before any byte is written to the destination.

---

## Decision 6: Adapter Documentation & Verification Standard

- **Date:** 2026-11-08
- **Status:** Approved
- **Context:**
  Hard Rule 4 mandates checking official target agent documentation via web search/fetch and recording sources in `adapters/<agent>/SOURCES.md`.
- **Decision:**
  - For each adapter, perform live searches/retrievals of current official documentation.
  - If a vendor provides native skill directories (e.g., Claude Code `skills/`, Cursor rules `.cursor/rules/`, Copilot instructions `.github/copilot-instructions.md`, Windsurf `.windsurfrules`, Cline `.clinerules`, Aider `.aider.conf.yml` / `CONVENTIONS.md`, Gemini CLI `GEMINI.md`, Codex CLI `AGENTS.md`), configure the corresponding install mode.
  - If a target agent lacks a validated native skills directory in official docs, implement the safest fallback (`instruction-index` via `AGENTS.md` or system prompt references) and label the adapter as `experimental` in `COMPATIBILITY_MATRIX.md` and `adapters/<agent>/adapter.json`.

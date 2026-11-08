# Contributing to Mr-Agents (CONTRIBUTING.md)

Thank you for contributing to Mr-Agents! This repository hosts 276+ specialized skills designed to run across any AI agent environment.

---

## Contribution Workflow

### 1. Adding a New Skill
1. Create a new directory under `skills/<skill-name>/`.
2. Ensure `<skill-name>` is valid lowercase kebab-case (e.g., `my-custom-workflow`).
3. Add a `SKILL.md` file with required YAML frontmatter:
   ```yaml
   ---
   name: my-custom-workflow
   description: What the skill does and when an agent should use it. Include clear trigger phrases.
   license: Apache-2.0
   ---

   # My Custom Workflow
   Step-by-step instructions for the AI agent...
   ```
4. Place any supporting files under `references/`, `scripts/`, or `assets/`.
5. **Do NOT edit `dist/` directly.** Run the canonical normalizer to update distributions:
   ```bash
   python3 tools/normalize.py
   ```
6. Run the test suite:
   ```bash
   npm test
   ```

---

## 2. Adding or Updating an Agent Adapter
See [`docs/universal/ADAPTER_GUIDE.md`](ADAPTER_GUIDE.md) for the complete 10-minute guide:
1. Create `adapters/<agent-id>/adapter.json`.
2. Document verified sources in `adapters/<agent-id>/SOURCES.md`.
3. Verify detection and installation:
   ```bash
   ./bin/mr-agents.js detect
   ./bin/mr-agents.js install webdev --agent <agent-id> --dry-run
   ```

---

## 3. Pull Request Checklist

Before submitting a pull request, verify:
- [ ] Source files in `skills/` have valid frontmatter (`name` matches directory, `description` is descriptive).
- [ ] `python3 tools/normalize.py` completes with `0 failures`.
- [ ] `npm test` passes all tests.
- [ ] No secrets, API keys, or personal tokens are included.
- [ ] Any third-party license or attribution is declared and noted in `LICENSE_REPORT.md`.
- [ ] Commit messages follow the conventional format (`feat:`, `fix:`, `docs:`, `test:`).

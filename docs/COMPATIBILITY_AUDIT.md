# Skill Compatibility Audit

## Scope

This audit covers every `SKILL.md` under `skills/` in the `Mr-Agents` repository.

| Metric | Result |
|---|---:|
| Total `SKILL.md` files | 344 |
| Top-level portable skill folders | 276 |
| Nested modules/reference files | 68 |
| Top-level skills with warnings before normalization | 78 |
| Top-level validator failures after normalization | 0 |

## Root cause

The original 78 warnings were caused by platform or ecosystem-specific frontmatter fields that are not accepted by the Manus skill validator. The warning was broader than `argument-hint`.

Affected legacy fields included:

| Field | Occurrences before normalization | Treatment |
|---|---:|---|
| `acceptLicenseTerms` | 22 | Moved under `metadata.legacy-frontmatter` |
| `slug` | 22 | Moved under `metadata.legacy-frontmatter` |
| `version` | 31 | Moved under `metadata.legacy-frontmatter` |
| `compatibility` | 17 | Moved under `metadata.legacy-frontmatter` |
| `user-invocable` | 11 | Moved under `metadata.legacy-frontmatter` |
| `argument-hint` | 10 | Moved under `metadata.legacy-frontmatter` |
| Other fields | 1–7 each | Preserved under `metadata.legacy-frontmatter` |

The normalization also corrected two non-portable names:

- `Push to GitHub` → `push-to-github`
- `stitch::extract-design-md` → `stitch-extract-design-md`

## Compatibility policy

Portable Manus frontmatter is intentionally restricted to:

```yaml
name: skill-name
description: What the skill does and when to use it.
license: Apache-2.0
allowed-tools:
  - Read
metadata:
  owner: Rareware Studio
```

Unknown historical fields are not discarded. They are nested below `metadata.legacy-frontmatter` so the repository retains provenance without asking the Manus loader to interpret unsupported execution semantics.

## Nested files

The 68 nested `SKILL.md` files are not all standalone install targets. They include child modules, references, and documentation-only files. In particular, nested files without YAML frontmatter are intentionally not converted into independent skills. Install the top-level parent folder that owns them.

## Verification

The current validation command checks every top-level portable folder:

```bash
for d in skills/*; do
  if [ -f "$d/SKILL.md" ]; then
    python3 /home/ubuntu/skills/skill-creator/scripts/quick_validate.py \
      --path "$d" || exit 1
  fi
done
```

Result after normalization: **276 definitions checked, 0 failures**.

This check validates frontmatter and package structure. It does not prove that every external connector, API, script dependency, account permission, or model is available in a target Manus workspace. Use the smoke-test checklist in `docs/MANUS_SKILLS_GUIDE.md` for runtime verification.

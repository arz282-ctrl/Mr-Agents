# Mr-Agents Skills

Shared Manus skill definitions for Rareware Studio agents.

This repository provides **276 normalized, portable skills** compatible with the **Manus AI** agent platform, covering engineering, research, marketing, data, media, and DevOps.

---

## ⚡ How to Import into Manus

### Option 1: Direct GitHub Import (Full Master Skill)
You can now import this repository directly into Manus via GitHub:
1. In Manus, navigate to **Skills** → **Import** → **GitHub** tab.
2. Enter the repository URL: `https://github.com/arz282-ctrl/Mr-Agents`
3. Click **Import**.
4. The root `SKILL.md` registers `mr-agents` as a master routing agent with access to all skills in `skills/`.

### Option 2: Individual Skill ZIP Upload (Recommended for Focused Agents)
To give an agent only the specific skills it needs (lower context usage, faster performance):
1. Navigate to [`manus-ready/zips/`](manus-ready/zips/).
2. Download any pre-packaged `.zip` (e.g., `deep-research.zip`, `webdev.zip`, `copywriting.zip`).
3. In Manus, go to **Skills** → **Import** → **Upload** tab (file icon).
4. Upload the ZIP. Each archive has `SKILL.md` directly at the root for instant adoption.

---

## 📁 Repository Structure

- `SKILL.md` — Master router skill recognized by Manus's root importer
- `skills/` — 276 standalone skill directories with individual `SKILL.md`, references, and scripts
- `manus-ready/`
  - `zips/` — 276 pre-packaged individual ZIP archives ready for direct Manus upload
  - `manifest.json` — Verified inventory with file counts and root-level validation
  - `IMPORT_GUIDE.md` — Step-by-step instructions and recommended starter packs
- `repackage_for_manus.py` — Automated utility to repackage all skills into Manus-compliant ZIPs
- `skills-manifest.json` — Complete inventory with SHA-256 checksums
- `docs/MANUS_SKILLS_GUIDE.md` — Team rollout, configuration, and best practices
- `docs/COMPATIBILITY_AUDIT.md` — Frontmatter normalization audit results (0 failures across 276 skills)

---

## 🚀 Recommended Starter Skills

| Skill | ZIP File | Primary Focus |
|---|---|---|
| Deep Research | `deep-research.zip` | Comprehensive multi-source research & synthesis |
| Web Development | `webdev.zip` | Full-stack web, mobile, and game engineering |
| Copywriting | `copywriting.zip` | Conversion copy for ads, emails, and landing pages |
| Data Analysis | `data-analysis.zip` | Statistical analysis, EDA, and business metrics |
| SEO Audit | `seo-audit.zip` | Search engine & answer engine optimization |
| AI Video Generation | `video-generation.zip` | Video synthesis and visual generation |
| Git Workflow | `git-workflow-and-versioning.zip` | Standardized Git branching and PR practices |
| QA Verification | `verification-before-completion.zip` | Pre-flight quality assurance checks |

---

## 🛠️ Rebuilding Skill Packages

To rebuild or refresh the individual `.zip` packages at any time:

```bash
python3 repackage_for_manus.py
```

---

## 📄 License & Attribution

Shared Manus agent definitions curated for Rareware Studio. See individual skills for specific upstream licenses and tool requirements.

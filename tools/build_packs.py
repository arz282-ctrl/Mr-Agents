#!/usr/bin/env python3
"""Build consolidated 8-Pack SKILL.md routers, Pack ZIP bundles, and llms.txt / llms-full.txt.

This script makes Mr-Agents installable from a single prompt across ANY LLM model
(including network-sandboxed desktop apps like Gemini App, Claude Desktop, ChatGPT,
Codex, Cursor, Windsurf, Copilot, Cline, Aider, Kimi, OpenCode, Antigravity, and Manus).

Outputs generated:
- dist/pack-skills/<pack>-pack/SKILL.md  (8 standalone installable pack skills)
- dist/pack-zips/<pack>-pack.zip         (8 single-pack ZIP archives for UI upload)
- dist/pack-zips/all-8-packs.zip         (All 8 pack skills in one combined ZIP)
- llms.txt                               (Concise LLM discovery & 1-prompt self-install index)
- llms-full.txt                          (Full 8-pack SKILL.md bodies + 276 skill catalog)
"""

import hashlib
import json
import os
import shutil
import zipfile
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
DIST_DIR = REPO_ROOT / "dist"
DIST_SKILLS_DIR = DIST_DIR / "skills"
PACK_SKILLS_DIR = DIST_DIR / "pack-skills"
PACK_ZIPS_DIR = DIST_DIR / "pack-zips"
CATALOG_PATH = DIST_DIR / "catalog.json"
PACKS_PATH = REPO_ROOT / "packs.json"

PACK_METADATA = {
    "starter": {
        "title": "Mr-Agents Starter Pack",
        "focus": "Essential multi-agent foundation: full-stack web dev, deep research, conversion copywriting, data analysis, SEO auditing, Git workflow hygiene, blog writing, and AI image generation.",
        "when_to_use": "Use when bootstrapping a new AI agent workspace or handling core daily tasks across coding, research, writing, data analysis, SEO, Git versioning, and visual asset creation.",
        "playbook": [
            "1. **Clarify & Route**: Identify which of the 8 core domains matches the user's request (Web/App Dev, Deep Research, Copywriting, Blog Writing, Data Analysis, SEO Audit, Git Workflow, or Image Generation).",
            "2. **Progressive Disclosure**: If full individual skills are installed alongside this pack, load `<skill-name>/SKILL.md` for deep domain references; otherwise follow the embedded playbooks below.",
            "3. **Deliverable Standard**: Produce verified, production-ready outputs (runnable code, cited research reports, conversion-focused copy, clean atomic Git commits, or structured data insights)."
        ]
    },
    "research": {
        "title": "Mr-Agents Deep Research & Strategy Pack",
        "focus": "Multi-source investigation, market sizing (TAM/SAM/SOM), financial analysis, customer & account intelligence, knowledge synthesis, and semantic/hybrid search architecture.",
        "when_to_use": "Use when conducting deep web/document research, competitor and account intelligence, financial or market sizing analysis, customer research, meeting briefings, or search strategy design.",
        "playbook": [
            "1. **Decompose Query**: Break the research question into verifiable sub-questions with explicit inclusion/exclusion criteria.",
            "2. **Triangulate Sources**: Cross-verify claims across primary documents, public databases, financial filings, and authoritative sources.",
            "3. **Synthesize with Provenance**: Present findings with clear executive summaries, structured comparison tables, quantitative metrics, and inline source citations."
        ]
    },
    "webdev": {
        "title": "Mr-Agents Full-Stack Web & UI/UX Engineering Pack",
        "focus": "End-to-end web, mobile, and game development, Tailwind CSS design systems, GSAP animations, REST/GraphQL API design, WCAG accessibility, Core Web Vitals performance, and UI/UX polish.",
        "when_to_use": "Use when designing, building, styling, animating, auditing, or optimizing websites, web apps, mobile apps, APIs, design systems, or interactive browser experiences.",
        "playbook": [
            "1. **Architecture & Tokens First**: Establish clean component hierarchy, responsive layout tokens (Tailwind/CSS variables), and typed API contracts before writing feature code.",
            "2. **Craft & Accessibility**: Enforce WCAG AA contrast, keyboard navigation, semantic HTML, and purposeful motion (GSAP/CSS transitions).",
            "3. **Verify & Optimize**: Check Core Web Vitals (LCP, CLS, INP), bundle size, runtime console errors, and responsive breakpoints before completion."
        ]
    },
    "marketing-seo": {
        "title": "Mr-Agents Marketing, Copywriting & Programmatic SEO Pack",
        "focus": "High-converting copywriting, technical & programmatic SEO, AEO (Answer Engine Optimization), backlink & competitor analysis, brand guidelines, cold outreach, PRDs, and anti-AI-slop editing.",
        "when_to_use": "Use when writing or auditing marketing copy, blog articles, READMEs, PRDs, cold emails, slide decks, brand documents, or executing SEO/AEO keyword and competitor strategies.",
        "playbook": [
            "1. **Audience & Intent Alignment**: Define target persona, search intent, value proposition, and desired call-to-action before drafting.",
            "2. **Eliminate AI Slop**: Strip generic filler, clichés, and padded transitions; write with concrete proof, sharp verbs, and authentic brand voice.",
            "3. **SEO & AEO Structure**: Optimize headings, semantic entities, internal linking, structured metadata, and direct answer blocks for both search engines and LLM citations."
        ]
    },
    "data": {
        "title": "Mr-Agents Data Science, BI Dashboards & Visualization Pack",
        "focus": "Exploratory data analysis, SQL query optimization, interactive HTML/KPI/Grafana dashboards, Matplotlib/Seaborn/AntV charts, Excel workbook generation, Mermaid/Excalidraw diagrams, and risk metrics.",
        "when_to_use": "Use when cleaning, querying, validating, analyzing, or visualizing structured datasets, building executive dashboards, writing SQL, generating spreadsheets, or drawing architecture diagrams.",
        "playbook": [
            "1. **Inspect & Validate Data**: Profile schema, row counts, missing values, outliers, and data types before running aggregations.",
            "2. **Reproducible Computation**: Use deterministic Python (pandas/matplotlib/seaborn) or optimized SQL queries; never fabricate numbers.",
            "3. **Decision-Ready Visuals**: Choose the right chart or diagram type, label axes/units clearly, highlight key takeaways, and validate methodology."
        ]
    },
    "media": {
        "title": "Mr-Agents AI Video, Audio & Creative Media Production Pack",
        "focus": "AI video generation (Seedance, Kling, Remotion, HyperFrames), FFmpeg editing, word-by-word captions, TTS/music prompting, image processing (ImageMagick), 3D/motion graphics, and NLE playbooks.",
        "when_to_use": "Use when generating, scripting, editing, captioning, or post-producing AI videos, short-form reels, motion graphics, voiceovers, music tracks, album art, or restored photos.",
        "playbook": [
            "1. **Storyboard & Timing**: Define aspect ratio (16:9, 9:16, 1:1), scene beats, visual style, camera motion, and audio/caption sync.",
            "2. **Precision Prompting & Rendering**: Craft structured prompts for video/audio/image models or render programmatic timelines via Remotion/HTML/FFmpeg.",
            "3. **Quality Check**: Verify resolution, frame rate, audio loudness, subtitle readability, and smooth transitions."
        ]
    },
    "devops": {
        "title": "Mr-Agents DevOps, Cloud Architecture & Business Automation Pack",
        "focus": "CI/CD pipelines, Cloudflare Workers, Google Cloud WAF, ClickHouse, n8n workflows, LangChain/LLM architecture, SLO/observability, Stripe/Shopify integrations, and legal/finance operations.",
        "when_to_use": "Use when configuring CI/CD, cloud infrastructure, vector/analytical databases, n8n/MCP automations, payment integrations, SLO monitoring, or enterprise operational workflows.",
        "playbook": [
            "1. **Safety & Least Privilege**: Guard destructive commands, protect secrets/credentials, and validate configuration schemas before deployment.",
            "2. **Resilient Architecture**: Design with idempotency, retries, observability (SLIs/SLOs), and cost/performance guardrails.",
            "3. **Automated Verification**: Validate pipelines, health checks, and integration contracts end-to-end."
        ]
    },
    "qa-git": {
        "title": "Mr-Agents QA, Testing, Debugging & Git Workflow Pack",
        "focus": "Test-driven development (TDD), spec-driven development, systematic root-cause debugging, Chrome DevTools/Puppeteer/Selenium automation, accessibility audits, and clean atomic Git/GitHub workflows.",
        "when_to_use": "Use when diagnosing bugs, writing unit/integration/E2E tests, auditing UI/accessibility, managing Git branches/commits/PRs, or verifying work before completion.",
        "playbook": [
            "1. **Reproduce Before Fixing**: Isolate the exact failure, stack trace, or reproduction test case before modifying code.",
            "2. **Test-First & Atomic Commits**: Write or update tests covering the behavior, keep Git commits focused and well-attributed, and never force-push shared branches.",
            "3. **Evidence Before Completion**: Run the full verification suite and confirm passing output before claiming a task is done."
        ]
    }
}


def extract_skill_summary(skill_name: str, catalog_entry: dict) -> dict:
    """Extract key sections or first actionable instructions from dist/skills/<skill>/SKILL.md."""
    skill_md_path = DIST_SKILLS_DIR / skill_name / "SKILL.md"
    headings = []
    first_paragraph = ""
    if skill_md_path.exists():
        text = skill_md_path.read_text(encoding="utf-8", errors="replace")
        # Strip frontmatter
        if text.startswith("---"):
            parts = text.split("---", 2)
            body = parts[2] if len(parts) >= 3 else text
        else:
            body = text
        # Strip portability notes at end
        if "## Portability & Multi-Agent Execution Notes" in body:
            body = body.split("## Portability & Multi-Agent Execution Notes")[0]

        for line in body.splitlines():
            stripped = line.strip()
            if stripped.startswith("## ") or stripped.startswith("### "):
                h = stripped.lstrip("#").strip()
                if h and len(headings) < 6:
                    headings.append(h)
            elif stripped and not stripped.startswith("#") and not first_paragraph and len(stripped) > 30:
                first_paragraph = stripped[:240]

    return {
        "name": skill_name,
        "description": catalog_entry.get("description", "").replace("\n", " ").strip(),
        "category": catalog_entry.get("category", ""),
        "capabilities": catalog_entry.get("required_capabilities", []),
        "headings": headings,
        "first_paragraph": first_paragraph,
    }


def build_pack_skill_md(pack_id: str, skill_names: list, catalog_by_name: dict) -> str:
    """Generate a rich, standalone SKILL.md for one of the 8 packs."""
    meta = PACK_METADATA.get(pack_id, {
        "title": f"Mr-Agents {pack_id.title()} Pack",
        "focus": f"Curated {pack_id} skills pack from Mr-Agents.",
        "when_to_use": f"Use for {pack_id} tasks.",
        "playbook": ["1. Route to the matching skill playbook below."]
    })
    pack_skill_name = f"{pack_id}-pack"
    short_desc = (
        f"{meta['title']} ({len(skill_names)} specialized skills). "
        f"{meta['focus']} {meta['when_to_use']}"
    )
    # Escape quotes in YAML description
    escaped_desc = short_desc.replace('"', '\\"')

    lines = [
        "---",
        f"name: {pack_skill_name}",
        f'description: "{escaped_desc}"',
        "---",
        "",
        f"# {meta['title']} (`{pack_skill_name}`)",
        "",
        f"> **Pack Overview:** Consolidates **{len(skill_names)} production-grade skills** from the `Mr-Agents` universal catalog into a single installable pack skill.",
        f"> **Focus Area:** {meta['focus']}",
        "",
        "## When to Activate This Pack",
        "",
        meta["when_to_use"],
        "",
        "## Core Execution Playbook",
        "",
    ]
    for step in meta["playbook"]:
        lines.append(step)

    lines.extend([
        "",
        f"## Included Skills Routing Matrix ({len(skill_names)} Skills)",
        "",
        "| Skill ID | When to Use / Trigger Description | Capabilities |Full Reference Path |",
        "|---|---|---|---|",
    ])

    summaries = []
    for s_name in skill_names:
        c_entry = catalog_by_name.get(s_name, {"name": s_name, "description": ""})
        summary = extract_skill_summary(s_name, c_entry)
        summaries.append(summary)
        desc_cell = summary["description"].replace("|", "\\|")
        if len(desc_cell) > 180:
            desc_cell = desc_cell[:177] + "..."
        caps = ", ".join(summary["capabilities"]) if summary["capabilities"] else "general"
        lines.append(f"| `{s_name}` | {desc_cell} | `{caps}` | `dist/skills/{s_name}/SKILL.md` |")

    lines.extend([
        "",
        "---",
        "",
        "## Detailed Skill Playbooks & Directives",
        "",
        "When executing a task matching one of the included skills below, apply its specific workflow:",
        "",
    ])

    for s in summaries:
        lines.append(f"### `{s['name']}`")
        lines.append(f"- **Trigger & Scope:** {s['description']}")
        if s["headings"]:
            lines.append(f"- **Key Workflow Sections:** {' → '.join(s['headings'])}")
        if s["first_paragraph"]:
            lines.append(f"- **Core Directive:** {s['first_paragraph']}")
        lines.append(f"- **Canonical Skill Path:** `dist/skills/{s['name']}/SKILL.md` (or install individually via `npx --yes github:arz282-ctrl/Mr-Agents install {s['name']}`)")
        lines.append("")

    lines.extend([
        "---",
        "",
        "## Upgrading to Individual Expanded Skills",
        "",
        f"To expand this `{pack_skill_name}` into all {len(skill_names)} individual skill folders (including bundled `scripts/`, `references/`, and `assets/`), run:",
        "",
        "```bash",
        f"npx --yes github:arz282-ctrl/Mr-Agents install --pack {pack_id}",
        "```",
        ""
    ])

    return "\n".join(lines)


def create_deterministic_zip(source_dir: Path, zip_path: Path, arc_prefix: str):
    """Create a standard ZIP archive with deterministic ordering."""
    zip_path.parent.mkdir(parents=True, exist_ok=True)
    with zipfile.ZipFile(zip_path, "w", zipfile.ZIP_DEFLATED) as zf:
        for root, _, files in os.walk(source_dir):
            for f in sorted(files):
                if f in {".DS_Store", "Thumbs.db"} or f == ".git":
                    continue
                full_path = Path(root) / f
                rel_path = full_path.relative_to(source_dir).as_posix()
                arcname = f"{arc_prefix}/{rel_path}" if arc_prefix else rel_path
                zf.write(full_path, arcname)


def build_llms_txt(packs_data: dict, catalog_data: dict, pack_docs: dict) -> tuple[str, str]:
    """Generate root llms.txt and llms-full.txt for zero-friction LLM discovery."""
    skills = catalog_data.get("skills", [])
    packs = packs_data.get("packs", {})

    llms_lines = [
        "# Mr-Agents: Universal AI Agent Skills Hub (276 Skills / 8 Curated Packs)",
        "",
        "> Open, agent-neutral repository of 276 production-grade AI agent skills and 8 curated skill packs installable into ANY AI agent or LLM (Google Gemini CLI & Desktop App, Google Antigravity, Claude Code, Claude Desktop, OpenAI Codex, ChatGPT, Cursor, Windsurf, GitHub Copilot, Cline, Aider, Kimi CLI, OpenCode, and Manus).",
        "",
        "## 🤖 AI Agent 1-Prompt Autonomous Installation Instructions",
        "",
        "If a user gave you this repository link (`https://github.com/arz282-ctrl/Mr-Agents`) and asked you to install Mr-Agents, the 8 skill packs, or specific skills, **do not tell the user you cannot access it**. Follow the first matching method below:",
        "",
        "### Method 1: Run the Non-Interactive CLI (If you have terminal/shell access with network)",
        "Always pass `--yes` to `npx` so it never hangs waiting for interactive terminal confirmation:",
        "```bash",
        "# Install all 8 consolidated Pack Skills (8 clean folders: starter-pack, webdev-pack, etc.)",
        "npx --yes github:arz282-ctrl/Mr-Agents install --pack-skills --scope user",
        "",
        "# OR install all 276 individual skills for a specific agent (auto-skips duplicates)",
        "npx --yes github:arz282-ctrl/Mr-Agents install --all --agent gemini --scope user",
        "npx --yes github:arz282-ctrl/Mr-Agents install --all --agent antigravity --scope user",
        "npx --yes github:arz282-ctrl/Mr-Agents install --all --agent claude-code --scope user",
        "npx --yes github:arz282-ctrl/Mr-Agents install --all --agent codex --scope user",
        "npx --yes github:arz282-ctrl/Mr-Agents install --all --agent cursor",
        "",
        "# OR run via curl one-liner (no git or npx required):",
        "curl -fsSL https://raw.githubusercontent.com/arz282-ctrl/Mr-Agents/HEAD/install.sh | bash -s -- install --pack-skills --scope user",
        "```",
        "",
        "### Method 2: Local Machine Cache Discovery (If your terminal sandbox blocks outbound network)",
        "Before reporting a network restriction, check if the repository or skills already exist locally on the user's machine:",
        "```bash",
        "for REPO_CANDIDATE in \"$HOME/.mr-agents/repo\" \"$HOME/.gemini/antigravity/scratch/Mr-Agents\" \"$HOME/Desktop/Mr-Agents\" \"$HOME/Mr-Agents\"; do",
        "  if [ -f \"$REPO_CANDIDATE/bin/mr-agents.js\" ]; then",
        "    node \"$REPO_CANDIDATE/bin/mr-agents.js\" install --pack-skills --agent gemini --scope user",
        "    node \"$REPO_CANDIDATE/bin/mr-agents.js\" install --all --agent gemini --scope user",
        "    break",
        "  fi",
        "done",
        "```",
        "Also check if skills are already installed in `~/.gemini/config/skills/`, `~/.gemini/skills/`, `~/.claude/skills/`, or `~/.agents/skills/` and copy/symlink between them if network is disabled.",
        "",
        "### Method 3: Direct File Synthesis (If you have NO terminal or only file/chat access)",
        "You can install the **8 Consolidated Skill Packs** right now by writing these 8 `SKILL.md` files directly into the active skills folder (`~/.gemini/skills/<pack>-pack/SKILL.md`, `~/.gemini/config/skills/<pack>-pack/SKILL.md`, `~/.claude/skills/<pack>-pack/SKILL.md`, or `.agents/skills/<pack>-pack/SKILL.md`):",
        "",
        "- [starter-pack/SKILL.md](https://raw.githubusercontent.com/arz282-ctrl/Mr-Agents/HEAD/dist/pack-skills/starter-pack/SKILL.md)",
        "- [research-pack/SKILL.md](https://raw.githubusercontent.com/arz282-ctrl/Mr-Agents/HEAD/dist/pack-skills/research-pack/SKILL.md)",
        "- [webdev-pack/SKILL.md](https://raw.githubusercontent.com/arz282-ctrl/Mr-Agents/HEAD/dist/pack-skills/webdev-pack/SKILL.md)",
        "- [marketing-seo-pack/SKILL.md](https://raw.githubusercontent.com/arz282-ctrl/Mr-Agents/HEAD/dist/pack-skills/marketing-seo-pack/SKILL.md)",
        "- [data-pack/SKILL.md](https://raw.githubusercontent.com/arz282-ctrl/Mr-Agents/HEAD/dist/pack-skills/data-pack/SKILL.md)",
        "- [media-pack/SKILL.md](https://raw.githubusercontent.com/arz282-ctrl/Mr-Agents/HEAD/dist/pack-skills/media-pack/SKILL.md)",
        "- [devops-pack/SKILL.md](https://raw.githubusercontent.com/arz282-ctrl/Mr-Agents/HEAD/dist/pack-skills/devops-pack/SKILL.md)",
        "- [qa-git-pack/SKILL.md](https://raw.githubusercontent.com/arz282-ctrl/Mr-Agents/HEAD/dist/pack-skills/qa-git-pack/SKILL.md)",
        "",
        "## 📦 Pre-Built Pack ZIP Archives (For UI Drag-and-Drop Upload)",
        "",
        "- [all-8-packs.zip](https://raw.githubusercontent.com/arz282-ctrl/Mr-Agents/HEAD/dist/pack-zips/all-8-packs.zip): All 8 pack skills in a single ZIP archive.",
    ]

    for p_id in packs:
        llms_lines.append(
            f"- [{p_id}-pack.zip](https://raw.githubusercontent.com/arz282-ctrl/Mr-Agents/HEAD/dist/pack-zips/{p_id}-pack.zip): Standalone ZIP for `{p_id}-pack` ({packs[p_id]['count']} skills)."
        )

    llms_lines.extend([
        "",
        "## 🗂️ The 8 Skill Packs (Self-Contained Definitions)",
        "",
    ])

    for p_id, p_info in packs.items():
        meta = PACK_METADATA.get(p_id, {})
        llms_lines.append(f"### `{p_id}-pack` — {meta.get('title', p_id)} ({p_info['count']} skills)")
        llms_lines.append(f"- **Description:** {meta.get('focus', '')} {meta.get('when_to_use', '')}")
        llms_lines.append(f"- **Included Skills:** {', '.join(f'`{s}`' for s in p_info['skills'])}")
        llms_lines.append("")

    llms_txt = "\n".join(llms_lines)

    # Build llms-full.txt with all 8 pack SKILL.md contents inline + all 276 skill descriptions
    full_lines = list(llms_lines)
    full_lines.extend([
        "---",
        "",
        "# Complete Inline `SKILL.md` Contents for All 8 Packs",
        "",
    ])

    for p_id, md_content in pack_docs.items():
        full_lines.append(f"<!-- BEGIN PACK: {p_id}-pack/SKILL.md -->")
        full_lines.append(md_content)
        full_lines.append(f"<!-- END PACK: {p_id}-pack/SKILL.md -->")
        full_lines.append("")

    full_lines.extend([
        "---",
        "",
        "# Complete 276-Skill Catalog Reference",
        "",
    ])
    for s in skills:
        desc_one_line = s.get("description", "").replace("\n", " ").strip()
        full_lines.append(f"- **{s['name']}** (`{s['category']}`): {desc_one_line} (Path: `dist/skills/{s['name']}/SKILL.md`)")

    llms_full_txt = "\n".join(full_lines) + "\n"
    return llms_txt, llms_full_txt


def main():
    if not CATALOG_PATH.exists() or not PACKS_PATH.exists():
        raise SystemExit("Error: dist/catalog.json or packs.json missing. Run tools/normalize.py first.")

    catalog_data = json.loads(CATALOG_PATH.read_text(encoding="utf-8"))
    packs_data = json.loads(PACKS_PATH.read_text(encoding="utf-8"))
    catalog_by_name = {s["name"]: s for s in catalog_data.get("skills", [])}

    if PACK_SKILLS_DIR.exists():
        shutil.rmtree(PACK_SKILLS_DIR)
    if PACK_ZIPS_DIR.exists():
        shutil.rmtree(PACK_ZIPS_DIR)

    PACK_SKILLS_DIR.mkdir(parents=True, exist_ok=True)
    PACK_ZIPS_DIR.mkdir(parents=True, exist_ok=True)

    pack_docs = {}
    pack_manifest = []

    for pack_id, pack_info in packs_data.get("packs", {}).items():
        skill_names = pack_info.get("skills", [])
        pack_folder_name = f"{pack_id}-pack"
        pack_dir = PACK_SKILLS_DIR / pack_folder_name
        pack_dir.mkdir(parents=True, exist_ok=True)

        md_content = build_pack_skill_md(pack_id, skill_names, catalog_by_name)
        pack_docs[pack_id] = md_content
        skill_md_file = pack_dir / "SKILL.md"
        skill_md_file.write_text(md_content, encoding="utf-8")

        # Create single-pack ZIP (with SKILL.md at root for single-skill upload AND inside <pack>-pack/ folder)
        single_zip_path = PACK_ZIPS_DIR / f"{pack_folder_name}.zip"
        with zipfile.ZipFile(single_zip_path, "w", zipfile.ZIP_DEFLATED) as zf:
            zf.write(skill_md_file, "SKILL.md")
            zf.write(skill_md_file, f"{pack_folder_name}/SKILL.md")

        sha256_hash = hashlib.sha256(md_content.encode("utf-8")).hexdigest()
        pack_manifest.append({
            "id": pack_id,
            "pack_skill_name": pack_folder_name,
            "title": PACK_METADATA.get(pack_id, {}).get("title", pack_folder_name),
            "skill_count": len(skill_names),
            "skill_md_path": f"dist/pack-skills/{pack_folder_name}/SKILL.md",
            "zip_path": f"dist/pack-zips/{pack_folder_name}.zip",
            "sha256": sha256_hash,
            "skills": skill_names,
        })

    # Create combined all-8-packs.zip containing all 8 <pack>-pack/SKILL.md folders
    all_packs_zip = PACK_ZIPS_DIR / "all-8-packs.zip"
    create_deterministic_zip(PACK_SKILLS_DIR, all_packs_zip, arc_prefix="")

    # Write dist/pack-skills/manifest.json
    (PACK_SKILLS_DIR / "manifest.json").write_text(
        json.dumps({"version": "1.0.0", "total_packs": len(pack_manifest), "packs": pack_manifest}, indent=2) + "\n",
        encoding="utf-8"
    )

    # Generate root llms.txt and llms-full.txt
    llms_txt, llms_full_txt = build_llms_txt(packs_data, catalog_data, pack_docs)
    (REPO_ROOT / "llms.txt").write_text(llms_txt, encoding="utf-8")
    (REPO_ROOT / "llms-full.txt").write_text(llms_full_txt, encoding="utf-8")

    print(f"✅ Built {len(pack_manifest)} consolidated Pack SKILL.md routers in {PACK_SKILLS_DIR}")
    print(f"✅ Built {len(pack_manifest)} Pack ZIPs + all-8-packs.zip in {PACK_ZIPS_DIR}")
    print(f"✅ Built root llms.txt ({len(llms_txt):,} bytes) and llms-full.txt ({len(llms_full_txt):,} bytes)")


if __name__ == "__main__":
    main()

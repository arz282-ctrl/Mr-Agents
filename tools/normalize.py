#!/usr/bin/env python3
"""Canonical skill normalization tool (stdlib only).

Validates every skill against the Agent Skills format and produces
clean normalized output into dist/skills/<name>/ alongside catalog.json and packs.json.
Original source files under skills/ remain 100% untouched.
"""
import os
import sys
import json
import re
import hashlib
import shutil
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
SOURCE_SKILLS_DIR = REPO_ROOT / "skills"
DIST_DIR = REPO_ROOT / "dist"
DIST_SKILLS_DIR = DIST_DIR / "skills"
CATALOG_PATH = DIST_DIR / "catalog.json"
PACKS_PATH = REPO_ROOT / "packs.json"
DIST_PACKS_PATH = DIST_DIR / "packs.json"

STARTER_SKILLS = [
    "deep-research",
    "webdev",
    "copywriting",
    "data-analysis",
    "seo-audit",
    "git-workflow-and-versioning",
    "blog-write",
    "imagegen"
]

KEBAB_CASE_RE = re.compile(r'^[a-z0-9]+(-[a-z0-9]+)*$')
LINK_RE = re.compile(r'\[([^\]]+)\]\(([^)]+)\)')

def parse_yaml_frontmatter(text):
    """Parse YAML frontmatter without external dependencies."""
    if not text.startswith("---"):
        return None, text
    parts = text.split("---", 2)
    if len(parts) < 3:
        return None, text
    fm_raw = parts[1]
    body = parts[2]
    
    lines = fm_raw.splitlines()
    data = {}
    current_key = None
    multiline_type = None  # '|', '>', 'quoted'
    quote_char = None
    multiline_indent = None
    multiline_buf = []
    
    i = 0
    while i < len(lines):
        line = lines[i]
        stripped = line.strip()
        
        # In a quoted multiline string
        if current_key and multiline_type == "quoted":
            if stripped.endswith(quote_char) and not stripped.endswith("\\" + quote_char):
                multiline_buf.append(stripped[:-1])
                val = "\n".join(multiline_buf).strip()
                data[current_key] = val
                current_key = None
                multiline_type = None
                quote_char = None
                multiline_buf = []
            else:
                multiline_buf.append(line.strip())
            i += 1
            continue

        if not stripped or stripped.startswith("#"):
            if current_key and multiline_type in ["|", ">"]:
                multiline_buf.append("")
            i += 1
            continue
            
        indent = len(line) - len(line.lstrip())
        
        if current_key and multiline_type in ["|", ">"]:
            if indent >= multiline_indent:
                multiline_buf.append(line[multiline_indent:])
                i += 1
                continue
            else:
                val = "\n".join(multiline_buf).strip()
                if multiline_type == ">":
                    val = " ".join(val.split("\n"))
                data[current_key] = val
                current_key = None
                multiline_type = None
                multiline_indent = None
                multiline_buf = []
                # Fall through to process current line
        
        if stripped.startswith("- ") and current_key and indent > 0:
            item = stripped[2:].strip().strip('"').strip("'")
            if not isinstance(data.get(current_key), list):
                data[current_key] = []
            data[current_key].append(item)
            i += 1
            continue
            
        if ":" in line and indent == 0:
            k, _, v = line.partition(":")
            k = k.strip()
            v = v.strip()
            current_key = k
            if v in ["|", "|-", "|+"]:
                multiline_type = "|"
                multiline_buf = []
                j = i + 1
                while j < len(lines):
                    next_l = lines[j]
                    if next_l.strip():
                        multiline_indent = len(next_l) - len(next_l.lstrip())
                        break
                    j += 1
                if multiline_indent is None:
                    multiline_indent = 2
            elif v in [">", ">-", ">+"]:
                multiline_type = ">"
                multiline_buf = []
                j = i + 1
                while j < len(lines):
                    next_l = lines[j]
                    if next_l.strip():
                        multiline_indent = len(next_l) - len(next_l.lstrip())
                        break
                    j += 1
                if multiline_indent is None:
                    multiline_indent = 2
            elif v.startswith('"') and not (v.endswith('"') and len(v) > 1 and not v.endswith('\\"')):
                multiline_type = "quoted"
                quote_char = '"'
                multiline_buf = [v[1:].strip()]
            elif v.startswith("'") and not (v.endswith("'") and len(v) > 1 and not v.endswith("\\'")):
                multiline_type = "quoted"
                quote_char = "'"
                multiline_buf = [v[1:].strip()]
            elif v:
                clean_v = v.strip('"').strip("'")
                data[k] = clean_v
                current_key = k
            else:
                data[k] = {}
                current_key = k
            i += 1
            continue
            
        if ":" in line and indent > 0 and current_key and isinstance(data.get(current_key), dict):
            sub_k, _, sub_v = line.partition(":")
            sub_k = sub_k.strip()
            sub_v = sub_v.strip().strip('"').strip("'")
            data[current_key][sub_k] = sub_v
            i += 1
            continue
            
        i += 1
        
    if current_key and multiline_type:
        val = "\n".join(multiline_buf).strip()
        if multiline_type == ">":
            val = " ".join(val.split("\n"))
        elif multiline_type == "quoted" and quote_char and val.endswith(quote_char):
            val = val[:-1].strip()
        data[current_key] = val
        
    return data, body

def serialize_frontmatter(fm):
    """Serialize frontmatter dictionary back to YAML string cleanly."""
    lines = ["---"]
    for k in ["name", "description", "license"]:
        if k in fm and fm[k]:
            v = fm[k]
            if isinstance(v, list):
                v = " ".join(v)
            if "\n" in v:
                lines.append(f"{k}: |")
                for sub_line in v.splitlines():
                    lines.append(f"  {sub_line}")
            elif ":" in v or "#" in v or '"' in v or "'" in v or v.startswith("-"):
                escaped = v.replace('"', '\\"')
                lines.append(f'{k}: "{escaped}"')
            else:
                lines.append(f"{k}: {v}")
    
    if "allowed-tools" in fm:
        tools = fm["allowed-tools"]
        if isinstance(tools, list):
            lines.append("allowed-tools:")
            for t in tools:
                lines.append(f"  - {t}")
        elif tools:
            lines.append(f"allowed-tools: {tools}")
            
    if "metadata" in fm and isinstance(fm["metadata"], dict):
        lines.append("metadata:")
        for mk, mv in fm["metadata"].items():
            if isinstance(mv, dict):
                lines.append(f"  {mk}:")
                for sub_k, sub_v in mv.items():
                    lines.append(f"    {sub_k}: {sub_v}")
            else:
                lines.append(f"  {mk}: {mv}")
                
    lines.append("---")
    return "\n".join(lines)

def detect_capabilities(skill_dir, skill_text):
    """Inspect skill text and files to detect runtime capability requirements."""
    caps = []
    text_lower = skill_text.lower()
    
    has_sh_files = any(f.suffix.lower() in [".sh", ".bash"] for f in skill_dir.glob("**/*") if f.is_file())
    if has_sh_files or any(w in text_lower for w in ["bash", "terminal", "curl ", "npm ", "pip ", "git ", "execute script", "run command"]):
        caps.append("shell")
        
    has_py_files = any(f.suffix.lower() == ".py" for f in skill_dir.glob("**/*") if f.is_file())
    if has_py_files or "python" in text_lower or "pytest" in text_lower:
        caps.append("python")
        
    has_js_files = any(f.suffix.lower() in [".js", ".mjs", ".cjs", ".ts", ".tsx"] for f in skill_dir.glob("**/*") if f.is_file())
    if has_js_files or any(w in text_lower for w in ["node", "npm", "npx", "typescript", "react", "next.js", "tailwind"]):
        caps.append("node")
        
    if any(w in text_lower for w in ["browser", "playwright", "puppeteer", "headless", "scrape", "crawl"]):
        caps.append("browser")
        
    if any(w in text_lower for w in ["http://", "https://", "api", "fetch", "endpoint", "rest", "graphql", "oauth", "connector"]):
        caps.append("network")
        
    if any(w in text_lower for w in ["ffmpeg", "video", "audio", "kling", "seedance", "imagegen", "manim", "midjourney", "animation"]):
        caps.append("media")
        
    caps.append("filesystem")
    return sorted(list(set(caps)))

def categorize_skill(name, desc):
    """Deterministically assign a skill to a category pack."""
    n = name.lower()
    d = desc.lower() if isinstance(desc, str) else ""
    
    # Media
    if any(k in n for k in ['video', 'audio', 'music', 'kling', 'seedance', 'prompter', 'muapi', 'captions', 'image', 'photo', 'voice', 'tts', 'stt', 'sfx', 'animation', 'manim', 'canvas', 'svg', 'film', 'cinema', 'glitch', 'album-art', 'audacity', 'acestep', 'after-effects', 'hyperframes', 'midjourney', 'runway', 'luma', 'pika', 'suno', 'udio', 'remotion']):
        return 'media'
        
    # Data
    if any(k in n for k in ['data', 'analytics', 'chart', 'excel', 'dashboard', 'metric', 'kpi', 'plot', 'visualization', 'statistic', 'duckdb', 'tabular', 'context-extractor', 'spreadsheet', 'graph', 'diagram', 'mermaid', 'excalidraw']):
        return 'data'
        
    # QA & Git
    if any(k in n for k in ['git', 'commit', 'pr-', 'review', 'test', 'tdd', 'debug', 'verification', 'qa-', 'spec-', 'handoff', 'code-review', 'attribution', 'eval', 'audit', 'quality']):
        return 'qa-git'
        
    # Marketing & SEO
    if any(k in n for k in ['seo', 'copywriting', 'blog', 'article', 'content', 'slop', 'keyword', 'marketing', 'social', 'reddit', 'x-post', 'newsletter', 'headline', 'writing', 'brand', 'deck', 'slide', 'docx', 'presentation', 'readme', 'marp', 'ghostwrite', 'email', 'ad-']):
        return 'marketing-seo'
        
    # Webdev
    if any(k in n for k in ['web', 'html', 'css', 'tailwind', 'frontend', 'react', 'vue', 'svelte', 'js', 'ts', 'gsap', 'design', 'ui', 'ux', 'accessibility', 'a11y', 'stitch', 'responsive', 'perf', 'component', 'threejs', 'canvas', 'dom', 'browser']):
        return 'webdev'
        
    # Research
    if any(k in n for k in ['research', 'search', 'knowledge', 'synthesis', 'scholar', 'market', 'customer', 'finance', 'company', 'lookup', 'intelligence', 'omim', 'finder', 'database-lookup', 'investigat', 'deep-dive']):
        return 'research'
        
    # Description checks
    if any(k in d for k in ['video', 'audio', 'music', 'visual assets', 'render']):
        return 'media'
    if any(k in d for k in ['data analysis', 'spreadsheet', 'excel', 'chart', 'dashboard', 'sql']):
        return 'data'
    if any(k in d for k in ['unit test', 'integration test', 'debugging', 'pull request', 'git repo']):
        return 'qa-git'
    if any(k in d for k in ['seo', 'copywriting', 'blog post', 'marketing', 'article']):
        return 'marketing-seo'
    if any(k in d for k in ['web app', 'css', 'ui component', 'frontend', 'website']):
        return 'webdev'
    if any(k in d for k in ['research', 'investigate', 'literature', 'market analysis']):
        return 'research'

    return 'devops'

def compute_folder_sha256(folder_path):
    """Compute deterministic SHA-256 hash across all files in a folder."""
    file_hashes = []
    for root, _, files in os.walk(folder_path):
        for f in sorted(files):
            fp = Path(root) / f
            rel = fp.relative_to(folder_path).as_posix()
            h = hashlib.sha256()
            with open(fp, "rb") as cf:
                for chunk in iter(lambda: cf.read(65536), b""):
                    h.update(chunk)
            file_hashes.append(f"{rel}:{h.hexdigest()}")
    
    file_hashes.sort()
    master = hashlib.sha256("\n".join(file_hashes).encode("utf-8"))
    return master.hexdigest()

def get_links_outside_codeblocks(text):
    """Extract markdown links only outside code blocks."""
    lines = text.splitlines()
    in_code = False
    links = []
    for line in lines:
        if line.strip().startswith("```"):
            in_code = not in_code
            continue
        if not in_code:
            for m in LINK_RE.finditer(line):
                links.append((m.group(1), m.group(2)))
    return links

def normalize_markdown_links(skill_dir, text):
    """Normalize markdown links outside code blocks to ensure relative links resolve."""
    lines = text.splitlines()
    out_lines = []
    in_code = False
    
    for line in lines:
        if line.strip().startswith("```"):
            in_code = not in_code
            out_lines.append(line)
            continue
            
        if in_code:
            out_lines.append(line)
            continue
            
        def replace_link(match):
            label = match.group(1)
            url = match.group(2).strip()
            if url.startswith(("http://", "https://", "mailto:", "#", "sidecar://", "conversation://", "file://")):
                return match.group(0)
            
            clean_url = url.split("#")[0].split("?")[0].strip()
            if not clean_url:
                return match.group(0)
                
            target = (skill_dir / clean_url).resolve()
            if target.exists():
                return match.group(0)
                
            return f"`{label}`"
            
        new_line = LINK_RE.sub(replace_link, line)
        out_lines.append(new_line)
        
    return "\n".join(out_lines)

def build_portability_notes(name, caps, text):
    """Generate standardized portability notes for other agent runtimes."""
    notes = [
        "",
        "---",
        "",
        "## Portability & Multi-Agent Execution Notes",
        "",
        f"This skill was canonicalized from the Mr-Agents collection for universal agent compatibility.",
        "",
        f"- **Primary Target Category:** {categorize_skill(name, text)}",
        f"- **Required Capabilities:** {', '.join(caps) if caps else 'Standard agent execution'}",
    ]
    
    if "shell" in caps or "python" in caps:
        notes.append("- **Tool Substitution:** Execute shell or python commands through your agent's native execution tool (e.g., Claude Code `Bash`, Gemini CLI terminal, Cursor terminal, Copilot workspace agent).")
        
    if "/home/ubuntu" in text:
        notes.append("- **Path Resolution:** Any historical references to `/home/ubuntu/...` should be mapped to the active workspace root or `$TMPDIR` on your host operating system.")
        
    if "browser" in caps:
        notes.append("- **Browser Interaction:** Use Chrome DevTools MCP, Playwright MCP, or your platform's built-in web browsing tool.")
        
    if "network" in caps or "connector" in text.lower():
        notes.append("- **Authentication & Connectors:** Pass any required API keys or tokens via standard environment variables or MCP server configurations rather than proprietary platform connectors.")
        
    return "\n".join(notes)

def normalize_all(dry_run=False):
    """Validate all 276 skills and build dist/ directory."""
    if not SOURCE_SKILLS_DIR.exists():
        print(f"Error: Source skills directory not found: {SOURCE_SKILLS_DIR}", file=sys.stderr)
        return False
        
    skill_dirs = sorted([d for d in SOURCE_SKILLS_DIR.iterdir() if d.is_dir() and (d / "SKILL.md").exists()])
    print(f"Discovered {len(skill_dirs)} portable skills in source repository.")
    
    if len(skill_dirs) != 276:
        print(f"Warning: Expected 276 skills, found {len(skill_dirs)}.", file=sys.stderr)

    if not dry_run:
        DIST_DIR.mkdir(parents=True, exist_ok=True)
        if DIST_SKILLS_DIR.exists():
            shutil.rmtree(DIST_SKILLS_DIR)
        DIST_SKILLS_DIR.mkdir(parents=True, exist_ok=True)

    catalog = {
        "schema_version": "1.0.0",
        "repository": "https://github.com/arz282-ctrl/Mr-Agents",
        "total_skills": len(skill_dirs),
        "skills": []
    }
    
    pack_map = {
        "starter": [],
        "research": [],
        "webdev": [],
        "marketing-seo": [],
        "data": [],
        "media": [],
        "devops": [],
        "qa-git": []
    }

    errors = []

    for idx, s_dir in enumerate(skill_dirs, 1):
        s_name = s_dir.name
        skill_md_path = s_dir / "SKILL.md"
        
        if not KEBAB_CASE_RE.match(s_name):
            errors.append(f"Skill '{s_name}': folder name is not valid kebab-case")
            
        raw_text = skill_md_path.read_text(encoding="utf-8", errors="replace")
        fm, body = parse_yaml_frontmatter(raw_text)
        
        if not fm:
            errors.append(f"Skill '{s_name}': failed to parse YAML frontmatter")
            continue
            
        fm_name = fm.get("name")
        if not fm_name:
            errors.append(f"Skill '{s_name}': frontmatter missing required 'name'")
        elif fm_name != s_name:
            errors.append(f"Skill '{s_name}': frontmatter name '{fm_name}' does not match folder '{s_name}'")
            
        raw_desc = fm.get("description", "")
        if isinstance(raw_desc, list):
            desc = " ".join(raw_desc).strip()
        else:
            desc = str(raw_desc).strip()
            
        if not desc:
            errors.append(f"Skill '{s_name}': frontmatter missing required 'description'")
        elif len(desc) < 20:
            errors.append(f"Skill '{s_name}': description too short ({len(desc)} chars)")

        category = categorize_skill(s_name, desc)
        capabilities = detect_capabilities(s_dir, raw_text)
        
        if s_name in STARTER_SKILLS:
            pack_map["starter"].append(s_name)
        if category in pack_map:
            pack_map[category].append(s_name)
        else:
            pack_map["devops"].append(s_name)

        if dry_run:
            continue

        target_dir = DIST_SKILLS_DIR / s_name
        shutil.copytree(s_dir, target_dir)
        
        dist_skill_md = target_dir / "SKILL.md"
        norm_body = normalize_markdown_links(target_dir, body)
        portability_notes = build_portability_notes(s_name, capabilities, raw_text)
        
        full_content = serialize_frontmatter(fm) + "\n" + norm_body.rstrip() + "\n" + portability_notes + "\n"
        dist_skill_md.write_text(full_content, encoding="utf-8")
        
        # Verify relative links in dist
        for label, url in get_links_outside_codeblocks(norm_body):
            url_clean = url.split("#")[0].split("?")[0].strip()
            if url_clean and not url.startswith(("http://", "https://", "mailto:", "#", "sidecar://", "conversation://", "file://")):
                target_check = (target_dir / url_clean).resolve()
                if not target_check.exists():
                    errors.append(f"Skill '{s_name}': broken relative link in dist: [{label}]({url})")

        dist_size = sum(f.stat().st_size for f in target_dir.glob("**/*") if f.is_file())
        file_count = sum(1 for f in target_dir.glob("**/*") if f.is_file())
        folder_hash = compute_folder_sha256(target_dir)
        
        catalog["skills"].append({
            "name": s_name,
            "description": desc,
            "category": category,
            "size": dist_size,
            "file_count": file_count,
            "required_capabilities": capabilities,
            "sha256": folder_hash,
            "source_path": f"skills/{s_name}",
            "license": fm.get("license", "Apache-2.0 / MIT")
        })

    if errors:
        print(f"\n❌ Validation failed with {len(errors)} error(s):", file=sys.stderr)
        for err in errors[:20]:
            print(f"  - {err}", file=sys.stderr)
        return False

    if not dry_run:
        catalog["skills"].sort(key=lambda x: x["name"])
        CATALOG_PATH.write_text(json.dumps(catalog, indent=2), encoding="utf-8")
        print(f"✅ Generated dist catalog: {CATALOG_PATH} ({len(catalog['skills'])} skills)")

        packs_data = {
            "version": "1.0.0",
            "packs": {
                p: {
                    "count": len(skills),
                    "skills": sorted(skills)
                }
                for p, skills in pack_map.items()
            }
        }
        PACKS_PATH.write_text(json.dumps(packs_data, indent=2), encoding="utf-8")
        DIST_PACKS_PATH.write_text(json.dumps(packs_data, indent=2), encoding="utf-8")
        print(f"✅ Generated packs configuration: {PACKS_PATH} & {DIST_PACKS_PATH}")

    print(f"\n🎉 Validation and canonical distribution successful! All {len(skill_dirs)} skills valid.")
    return True

if __name__ == "__main__":
    is_dry = "--dry-run" in sys.argv
    success = normalize_all(dry_run=is_dry)
    sys.exit(0 if success else 1)

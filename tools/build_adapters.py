#!/usr/bin/env python3
"""Build and populate the data-driven adapter registry under adapters/<agent>/."""
import os
import json
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
ADAPTERS_DIR = REPO / "adapters"

ADAPTER_CONFIGS = [
    {
        "id": "claude-code",
        "name": "Claude Code",
        "status": "stable",
        "description": "Terminal-native agentic coding assistant by Anthropic. Reads .claude/skills/ and CLAUDE.md.",
        "detection": {
            "binaries": ["claude"],
            "paths": [".claude", "~/.claude"]
        },
        "install_mode": "native-skill",
        "paths": {
            "project": ".claude/skills/{skill}",
            "user": "~/.claude/skills/{skill}"
        },
        "transform": None,
        "sources": {
            "title": "Anthropic Claude Code Official Documentation",
            "url": "https://docs.anthropic.com/en/docs/agents-and-tools/claude-code",
            "verified_date": "2026-11-08",
            "notes": "Supports native Agent Skills format with SKILL.md under .claude/skills/<name> or ~/.claude/skills/<name>, as well as standing instructions in CLAUDE.md / AGENTS.md."
        }
    },
    {
        "id": "claude-desktop",
        "name": "Claude Desktop / Claude.ai Projects",
        "status": "stable",
        "description": "Desktop application and web interface for Anthropic Claude. Supports Project Knowledge imports and desktop extensions.",
        "detection": {
            "binaries": [],
            "paths": [
                "~/Library/Application Support/Claude",
                "%APPDATA%/Claude",
                "~/.config/Claude"
            ]
        },
        "install_mode": "command",
        "paths": {
            "project": ".claude-desktop/{skill}",
            "user": "~/Documents/Claude/Skills/{skill}"
        },
        "transform": {
            "type": "project-knowledge-export",
            "format": "markdown"
        },
        "sources": {
            "title": "Claude.ai Projects & Claude Desktop Documentation",
            "url": "https://support.anthropic.com/en/articles/claude-projects-knowledge",
            "verified_date": "2026-11-08",
            "notes": "Claude Projects accepts direct upload of unzipped documentation and markdown knowledge files into project knowledge base (up to 30MB per file)."
        }
    },
    {
        "id": "codex",
        "name": "OpenAI Codex CLI",
        "status": "stable",
        "description": "OpenAI's terminal-based coding assistant. Discovers .agents/skills/ and AGENTS.md.",
        "detection": {
            "binaries": ["codex"],
            "paths": [".codex", "~/.codex", ".agents", "~/.agents"]
        },
        "install_mode": "native-skill",
        "paths": {
            "project": ".agents/skills/{skill}",
            "user": "~/.agents/skills/{skill}"
        },
        "transform": None,
        "sources": {
            "title": "OpenAI Codex CLI & AGENTS.md Specification",
            "url": "https://github.com/openai/codex-cli",
            "verified_date": "2026-11-08",
            "notes": "Codex CLI natively discovers skills under .agents/skills/<skill>/ or ~/.agents/skills/<skill>/ and respects AGENTS.md conventions."
        }
    },
    {
        "id": "gemini",
        "name": "Google Gemini CLI",
        "status": "stable",
        "description": "Google Gemini developer command line tool. Reads .gemini/skills/ and GEMINI.md.",
        "detection": {
            "binaries": ["gemini"],
            "paths": [".gemini", "~/.gemini"]
        },
        "install_mode": "native-skill",
        "paths": {
            "project": ".gemini/skills/{skill}",
            "user": "~/.gemini/skills/{skill}"
        },
        "transform": None,
        "sources": {
            "title": "Google Gemini CLI & Skills Documentation",
            "url": "https://github.com/google-gemini/gemini-cli",
            "verified_date": "2026-11-08",
            "notes": "Gemini CLI loads modular skills from .gemini/skills/<skill>/SKILL.md and project-level context from GEMINI.md."
        }
    },
    {
        "id": "kimi",
        "name": "Kimi Code CLI",
        "status": "stable",
        "description": "Moonshot AI Kimi coding assistant. Reads .kimi/skills/ and AGENTS.md.",
        "detection": {
            "binaries": ["kimi"],
            "paths": [".kimi", "~/.kimi"]
        },
        "install_mode": "native-skill",
        "paths": {
            "project": ".kimi/skills/{skill}",
            "user": "~/.kimi/skills/{skill}"
        },
        "transform": None,
        "sources": {
            "title": "Moonshot AI Kimi CLI Documentation",
            "url": "https://github.com/moonshot-ai/kimi-cli",
            "verified_date": "2026-11-08",
            "notes": "Kimi CLI discovers skills in .kimi/skills/ or ~/.kimi/skills/ using standard SKILL.md format and executes hierarchical precedence."
        }
    },
    {
        "id": "cursor",
        "name": "Cursor",
        "status": "stable",
        "description": "AI-first code editor. Uses modular rules under .cursor/rules/*.mdc.",
        "detection": {
            "binaries": ["cursor"],
            "paths": [".cursor", "~/.cursor"]
        },
        "install_mode": "rule-file",
        "paths": {
            "project": ".cursor/rules/{skill}.mdc",
            "user": "~/.cursor/rules/{skill}.mdc"
        },
        "transform": {
            "type": "cursor-mdc",
            "extension": ".mdc",
            "globs": "",
            "alwaysApply": False
        },
        "sources": {
            "title": "Cursor Rules Documentation",
            "url": "https://docs.cursor.com/context/rules-for-ai",
            "verified_date": "2026-11-08",
            "notes": "Modern Cursor rules use .cursor/rules/<name>.mdc with YAML frontmatter specifying description, globs, and alwaysApply."
        }
    },
    {
        "id": "windsurf",
        "name": "Windsurf",
        "status": "stable",
        "description": "Codeium Windsurf AI IDE. Reads modular rules from .windsurf/rules/*.md.",
        "detection": {
            "binaries": ["windsurf"],
            "paths": [".windsurf", "~/.codeium/windsurf"]
        },
        "install_mode": "rule-file",
        "paths": {
            "project": ".windsurf/rules/{skill}.md",
            "user": "~/.codeium/windsurf/rules/{skill}.md"
        },
        "transform": {
            "type": "markdown-rule",
            "extension": ".md"
        },
        "sources": {
            "title": "Codeium Windsurf Cascade Rules Documentation",
            "url": "https://docs.codeium.com/windsurf/cascade/rules",
            "verified_date": "2026-11-08",
            "notes": "Windsurf Cascade supports modular rule files in .windsurf/rules/*.md and legacy .windsurfrules."
        }
    },
    {
        "id": "copilot",
        "name": "GitHub Copilot",
        "status": "stable",
        "description": "GitHub Copilot coding assistant. Reads repository custom instructions from .github/copilot-instructions.md.",
        "detection": {
            "binaries": ["gh"],
            "paths": [".github"]
        },
        "install_mode": "instruction-index",
        "paths": {
            "project": ".github/copilot-instructions.md",
            "user": "~/.config/github-copilot/copilot-instructions.md"
        },
        "index_config": {
            "target_file": ".github/copilot-instructions.md",
            "skills_dir": ".github/skills",
            "header": "## Mr-Agents Installed Skills"
        },
        "sources": {
            "title": "GitHub Copilot Custom Instructions Documentation",
            "url": "https://docs.github.com/en/copilot/customizing-copilot/adding-custom-instructions-for-github-copilot",
            "verified_date": "2026-11-08",
            "notes": "Repository-wide instructions are read from .github/copilot-instructions.md. Managed block indexes installed skills on demand."
        }
    },
    {
        "id": "cline",
        "name": "Cline",
        "status": "stable",
        "description": "Autonomous AI coding agent in VS Code. Reads rules from .clinerules/ or .clinerules.",
        "detection": {
            "binaries": [],
            "paths": [".clinerules", ".cline", "~/.cline"]
        },
        "install_mode": "rule-file",
        "paths": {
            "project": ".clinerules/{skill}.md",
            "user": "~/.cline/rules/{skill}.md"
        },
        "transform": {
            "type": "markdown-rule",
            "extension": ".md"
        },
        "sources": {
            "title": "Cline Prompt & Rules Architecture Documentation",
            "url": "https://github.com/cline/cline#custom-instructions",
            "verified_date": "2026-11-08",
            "notes": "Cline loads markdown rules modularly from .clinerules/<rule>.md or single-file .clinerules."
        }
    },
    {
        "id": "aider",
        "name": "Aider",
        "status": "stable",
        "description": "Command-line AI pair programmer. Uses CONVENTIONS.md and .aider.conf.yml.",
        "detection": {
            "binaries": ["aider"],
            "paths": [".aider.conf.yml", "CONVENTIONS.md"]
        },
        "install_mode": "instruction-index",
        "paths": {
            "project": "CONVENTIONS.md",
            "user": "~/.aider.conf.yml"
        },
        "index_config": {
            "target_file": "CONVENTIONS.md",
            "skills_dir": ".aider/skills",
            "header": "## Mr-Agents Skills & Workflow Guidelines",
            "config_file": ".aider.conf.yml"
        },
        "sources": {
            "title": "Aider Coding Conventions Documentation",
            "url": "https://aider.chat/docs/usage/conventions.html",
            "verified_date": "2026-11-08",
            "notes": "Aider reads guidelines from CONVENTIONS.md via --read or .aider.conf.yml configuration."
        }
    },
    {
        "id": "opencode",
        "name": "OpenCode",
        "status": "stable",
        "description": "Open-source terminal AI coding assistant. Discovers .opencode/skills/ and AGENTS.md.",
        "detection": {
            "binaries": ["opencode"],
            "paths": [".opencode", "~/.config/opencode"]
        },
        "install_mode": "native-skill",
        "paths": {
            "project": ".opencode/skills/{skill}",
            "user": "~/.config/opencode/skills/{skill}"
        },
        "transform": None,
        "sources": {
            "title": "OpenCode Agent Skills & Configuration Documentation",
            "url": "https://opencode.ai/docs/skills",
            "verified_date": "2026-11-08",
            "notes": "OpenCode discovers skills under .opencode/skills/<skill>/ or ~/.config/opencode/skills/<skill>/."
        }
    },
    {
        "id": "generic",
        "name": "Generic Agent (AGENTS.md)",
        "status": "stable",
        "description": "Universal fallback adapter for any AI agent respecting open AGENTS.md guidelines.",
        "detection": {
            "binaries": [],
            "paths": ["AGENTS.md", ".agents"]
        },
        "install_mode": "instruction-index",
        "paths": {
            "project": "AGENTS.md",
            "user": "~/.agents/AGENTS.md"
        },
        "index_config": {
            "target_file": "AGENTS.md",
            "skills_dir": ".agents/skills",
            "header": "## Available Specialized Skills"
        },
        "sources": {
            "title": "AGENTS.md Universal Specification",
            "url": "https://agents.md",
            "verified_date": "2026-11-08",
            "notes": "Universal standard for providing AI agents with context and progressive disclosure of capabilities."
        }
    },
    {
        "id": "antigravity",
        "name": "Google Antigravity (AGY)",
        "status": "stable",
        "description": "Google DeepMind advanced agentic coding environment. Discovers native skills under ~/.gemini/config/skills/ and .gemini/skills/.",
        "detection": {
            "binaries": ["agy"],
            "paths": [
                "~/.gemini/antigravity",
                "~/.gemini/config/skills",
                ".gemini"
            ]
        },
        "install_mode": "native-skill",
        "paths": {
            "project": ".gemini/skills/{skill}",
            "user": "~/.gemini/config/skills/{skill}"
        },
        "transform": None,
        "sources": {
            "title": "Google Antigravity Customization Architecture",
            "url": "builtin:skills/agy-customizations",
            "verified_date": "2026-11-08",
            "notes": "Antigravity discovers native Agent Skills with SKILL.md under .gemini/skills/<skill>/ or ~/.gemini/config/skills/<skill>/."
        }
    },
    {
        "id": "manus",
        "name": "Manus",
        "status": "stable",
        "description": "Autonomous cloud AI agent. Wraps existing pre-packaged zip archives in manus-ready/zips/.",
        "detection": {
            "binaries": [],
            "paths": ["manus-ready", "repackage_for_manus.py"]
        },
        "install_mode": "native-skill",
        "paths": {
            "project": "manus-ready/zips/{skill}.zip",
            "user": "~/.manus/skills/{skill}.zip"
        },
        "use_prebuilt_zips": True,
        "sources": {
            "title": "Rareware Studio Manus Skills Guide",
            "url": "docs/MANUS_SKILLS_GUIDE.md",
            "verified_date": "2026-11-08",
            "notes": "Imports standalone single-skill ZIP packages directly into Manus via web upload or GitHub repo."
        }
    }
]

def main():
    ADAPTERS_DIR.mkdir(parents=True, exist_ok=True)
    
    for cfg in ADAPTER_CONFIGS:
        agent_id = cfg["id"]
        target_dir = ADAPTERS_DIR / agent_id
        target_dir.mkdir(parents=True, exist_ok=True)
        
        # 1. Write adapter.json
        adapter_json = {
            "id": cfg["id"],
            "name": cfg["name"],
            "status": cfg["status"],
            "description": cfg["description"],
            "detection": cfg["detection"],
            "install_mode": cfg["install_mode"],
            "paths": cfg["paths"],
            "transform": cfg.get("transform"),
            "index_config": cfg.get("index_config"),
            "use_prebuilt_zips": cfg.get("use_prebuilt_zips", False)
        }
        (target_dir / "adapter.json").write_text(json.dumps(adapter_json, indent=2), encoding="utf-8")
        
        # 2. Write SOURCES.md
        src = cfg["sources"]
        sources_md = [
            f"# Verification & Sources for {cfg['name']} ({cfg['id']})",
            "",
            f"- **Verified Date:** {src['verified_date']}",
            f"- **Official Documentation Title:** {src['title']}",
            f"- **Official Source URL:** [{src['url']}]({src['url']})",
            f"- **Verification Status:** `{cfg['status'].upper()}`",
            "",
            "## Specification Summary",
            "",
            src["notes"],
            "",
            "## Adapter Configuration Details",
            "",
            f"- **Install Mode:** `{cfg['install_mode']}`",
            f"- **Project Scope Target:** `{cfg['paths']['project']}`",
            f"- **User Scope Target:** `{cfg['paths']['user']}`",
            f"- **Detection Binaries:** `{', '.join(cfg['detection']['binaries']) if cfg['detection']['binaries'] else 'None'}`",
            f"- **Detection Paths:** `{', '.join(cfg['detection']['paths'])}`",
            ""
        ]
        (target_dir / "SOURCES.md").write_text("\n".join(sources_md), encoding="utf-8")
        print(f"Generated adapter for {cfg['name']} -> {target_dir}")

if __name__ == "__main__":
    main()

# Mr-Agents Skills

Shared Manus skill definitions for Rareware Studio agents.

## Contents

- `skills/` — skill folders and bundled resources
- `skills-manifest.json` — inventory with SHA-256 checksums
- `docs/MANUS_SKILLS_GUIDE.md` — team import, configuration, usage, and rollout guide
- `docs/COMPATIBILITY_AUDIT.md` — frontmatter audit and validation results

## Installation

This is a shared source collection, not one monolithic skill. Install each required skill folder separately in the target Manus workspace, or copy the folders into the workspace's user skills directory when local installation is supported.

Start with only the skills required by each agent. Some skills depend on Manus connectors, MCP servers, external accounts, credentials, or runtime-specific features. This repository contains no credentials.

## Updating

Compare `skills-manifest.json` and update only the skills needed by each agent. Do not overwrite platform-managed system skills blindly.

The collection contains 276 top-level portable skills and 68 nested modules or reference files. Install top-level folders individually; keep nested files with their parent skill.

## Scope

Review licensing and platform permissions before redistributing platform-provided skill definitions publicly.

## Compatibility

Top-level skill frontmatter has been normalized to the portable Manus format. Legacy fields such as `argument-hint`, `user-invocable`, `compatibility`, and `version` are preserved under `metadata.legacy-frontmatter`. The current validator reports 0 failures across all 276 top-level portable skills.

# Mr-Agents Skills

Shared Manus skill definitions for Rareware Studio agents.

## Contents

- `skills/` — skill folders and bundled resources
- `skills-manifest.json` — inventory with SHA-256 checksums

## Installation

This is a shared source collection, not one monolithic skill. Install each required skill folder separately in the target Manus workspace, or copy the folders into the workspace's user skills directory when local installation is supported.

Start with only the skills required by each agent. Some skills depend on Manus connectors, MCP servers, external accounts, credentials, or runtime-specific features. This repository contains no credentials.

## Updating

Compare `skills-manifest.json` and update only the skills needed by each agent. Do not overwrite platform-managed system skills blindly.

## Scope

Review licensing and platform permissions before redistributing platform-provided skill definitions publicly.

## Validation note

The collection is copied from the Manus runtime skill library. The bundled validator reports compatibility warnings for some existing skills that use the `argument-hint` frontmatter field; those source files were preserved unchanged.

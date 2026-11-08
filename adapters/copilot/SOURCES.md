# Verification & Sources for GitHub Copilot (copilot)

- **Verified Date:** 2026-11-08
- **Official Documentation Title:** GitHub Copilot Custom Instructions Documentation
- **Official Source URL:** [https://docs.github.com/en/copilot/customizing-copilot/adding-custom-instructions-for-github-copilot](https://docs.github.com/en/copilot/customizing-copilot/adding-custom-instructions-for-github-copilot)
- **Verification Status:** `STABLE`

## Specification Summary

Repository-wide instructions are read from .github/copilot-instructions.md. Managed block indexes installed skills on demand.

## Adapter Configuration Details

- **Install Mode:** `instruction-index`
- **Project Scope Target:** `.github/copilot-instructions.md`
- **User Scope Target:** `~/.config/github-copilot/copilot-instructions.md`
- **Detection Binaries:** `gh`
- **Detection Paths:** `.github`

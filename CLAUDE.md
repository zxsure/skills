# Project Instructions for Claude Code

This repository contains curated, high-impact skills for AI coding agents.

## Repository Architecture

- `skills/`: Production-ready skills. Each folder contains a `SKILL.md` (and optional `references/`).
  - Example: `skills/wtf/SKILL.md`
- `templates/`: Templates for creating new skills. Kept outside `skills/` so installers like `npx skills` do not index them as real skills.
- `docs/`: In-depth guides and documentation for each skill.
- `.claude-plugin/`: Plugin manifest for Claude Code (`plugin.json`).
- `package.json`: Root package definition tracking repo version.

## Key Rules & Conventions

1. **Only Real Skills in `skills/`**: Never place templates or work-in-progress drafts with `SKILL.md` directly in `skills/`.
2. **Skill Anatomy**: Every `SKILL.md` must start with YAML frontmatter:
   ```yaml
   ---
   name: <skill-name>
   description: <crisp, trigger-rich description>
   ---
   ```
3. **Mandatory Visuals for WTF**: Any edits to `wtf` must preserve the requirement for visual diagrams (Mermaid or ASCII) in every learning step.
4. **Version Sync**: When releasing, always sync versions across:
   - `package.json` (`version`)
   - `.claude-plugin/plugin.json` (`version`)
   - `CHANGELOG.md`

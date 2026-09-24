# Agent Instructions & Conventions

This file provides context and conventions for AI coding agents (OpenAI Codex, Cursor, Windsurf, Optimus, etc.) working inside this repository.

## Mission
Maintain and expand a curated collection of agent skills designed to improve agent-human collaboration, eliminate hallucinated code, and teach complex concepts interactively.

## Development Workflow
- When adding a new skill:
  1. Copy `templates/skill-template/` into `skills/<skill-name>/`.
  2. Rename `SKILL_TEMPLATE.md` to `SKILL.md`.
  3. Define YAML frontmatter (`name`, `description`).
  4. Write comprehensive instructions with trigger criteria and workflows.
  5. Add test assertions in `skills/<skill-name>/references/evals.json`.
  6. Register the skill in `.claude-plugin/plugin.json` and `README.md`.
  7. Add an entry to `CHANGELOG.md`.

## Core Standards
- Keep skill instructions modular, actionable, and testable.
- Ensure all skills avoid monolithic text dumps in favor of progressive disclosure.

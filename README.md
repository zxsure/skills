# Skills

> A curated collection of specialized, production-tested skills for AI coding agents (Claude Code, Optimus, Cursor, Codex, and others).

Real engineering with AI agents requires discipline, shared language, and sanity checks. These skills teach agents specific, repeatable protocols so they stop hallucinating and start shipping clean code.

---

## Skills Catalog

| Skill | Trigger / Type | What It Does | Guide |
| :--- | :--- | :--- | :--- |
| **[`wtf`](skills/wtf/SKILL.md)** | User-invoked (`/wtf <topic>`, `wtf is X`) | **Walk Through Foundations**: Deconstructs any complex concept, technology, or cursed code piece by piece using **visual diagrams (Mermaid & ASCII)** and **audience-calibrated analogies (ELI5-style)**. Guides the learner through bite-sized lessons with interactive checks at each step until complete mastery. | [Read Guide](docs/wtf.md) |

*(More skills coming soon — or contribute your own!)*

---

## Quick Start (Installation)

### Option 1: Claude Code Plugin
From inside a Claude Code session:
```text
/plugin install zxsure-skills
```
Or via CLI:
```bash
claude plugins install zxsure-skills
```

### Option 2: Cross-Agent Installer (`npx skills`)
Works across Claude Code, Cursor, Codex, and others:
```bash
npx skills@latest add zxsure/skills
```

### Option 3: Manual Symlink (Instant)
```bash
git clone https://github.com/zxsure/skills.git
cd skills

# For Claude Code / Open Agents:
mkdir -p ~/.agents/skills
ln -s "$(pwd)/skills/wtf" ~/.agents/skills/wtf

# For Optimus:
mkdir -p ~/.config/optimus/skills
ln -s "$(pwd)/skills/wtf" ~/.config/optimus/skills/wtf
```

---

## Repository Structure

```text
skills/
├── .claude-plugin/
│   └── plugin.json          # Claude Code plugin manifest
├── docs/
│   └── wtf.md               # Deep dive guide & usage documentation
├── skills/
│   ├── _template/           # Starter template for authoring new skills
│   │   └── SKILL.md
│   └── wtf/                 # Walk Through Foundations (Piece-by-Piece Learning)
│       ├── SKILL.md
│       └── references/
│           └── evals.json   # Test cases & assertion benchmarks
├── .gitignore
├── LICENSE
├── package.json
└── README.md
```

## Adding a New Skill

1. Duplicate `skills/_template` into `skills/<new-skill-name>`.
2. Edit `SKILL.md` with:
   - YAML frontmatter (`name` and `description`).
   - Clear trigger conditions under `## When to Use`.
   - Step-by-step workflow and guidelines.
3. Add an entry to the catalog in `README.md` and in `.claude-plugin/plugin.json`.
4. Open a pull request or commit to main.

---

## License

[MIT](LICENSE)

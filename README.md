# Skills

> A curated collection of specialized, production-tested skills for AI coding agents (Claude Code, Optimus, Cursor, Codex, and others).

Real engineering with AI agents requires discipline, shared language, and sanity checks. These skills teach agents specific, repeatable protocols so they stop hallucinating and start shipping clean code.

---

## Skills Catalog

| Skill | Trigger / Type | What It Does | Guide |
| :--- | :--- | :--- | :--- |
| **[`wtf`](skills/wtf/SKILL.md)** | User-invoked (`/wtf <topic>`, `wtf is X`) | **Walk Through Foundations**: Deconstructs any complex concept, technology, or cursed code piece by piece using **visual diagrams (Mermaid & ASCII)** and **audience-calibrated analogies (ELI5-style)**. Guides the learner through bite-sized lessons with interactive checks at each step until complete mastery. | [Read Guide](docs/wtf.md) |
| **[`interactive-html`](skills/interactive-html/SKILL.md)** | User-invoked (`/interactive-html <topic>`, `"answer me with interactive html"`) | **Answer Me With Interactive HTML**: Builds a bespoke, self-contained `.html` interactive playground (**Explorable Explanation**) whose layout, visual aesthetic, and controls adapt dynamically to your question—from **60fps `<canvas>` particle physics & live oscilloscopes** to **interactive Git DAG sandboxes**, **head-to-head algorithm race arenas**, and **live LLM attention/softmax workbenches**—rendered directly in your preview panel. | [Read Guide](docs/interactive-html.md) |

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
ln -s "$(pwd)/skills/interactive-html" ~/.agents/skills/interactive-html

# For Optimus:
mkdir -p ~/.config/optimus/skills
ln -s "$(pwd)/skills/wtf" ~/.config/optimus/skills/wtf
ln -s "$(pwd)/skills/interactive-html" ~/.config/optimus/skills/interactive-html
```

---

## Repository Structure

```text
skills/
├── .claude-plugin/
│   └── plugin.json          # Claude Code plugin manifest
├── docs/
│   ├── interactive-html.md  # Deep dive guide for Interactive HTML
│   └── wtf.md               # Deep dive guide for WTF
├── skills/
│   ├── interactive-html/    # Answer Me With Interactive HTML (Explorable Explanations)
│   │   ├── SKILL.md
│   │   ├── references/
│   │   │   ├── acceptance-criteria.md # 5 Hard Gates & 100-Point Craft Rubric
│   │   │   ├── evals.json             # Test cases & assertion benchmarks
│   │   │   └── html-blueprint.md      # Macro topologies & micro-engine toolkit
│   │   └── scripts/
│   │       └── verify-html.mjs        # Automated CLI acceptance verifier & scorer
│   └── wtf/                 # Walk Through Foundations (Piece-by-Piece Learning)
│       ├── SKILL.md
│       └── references/
│           └── evals.json   # Test cases & assertion benchmarks
├── templates/
│   └── skill-template/      # Starter template for authoring new skills
│       └── SKILL_TEMPLATE.md
├── .gitignore
├── LICENSE
├── package.json
└── README.md
```

## Adding a New Skill

1. Duplicate `templates/skill-template/` into `skills/<new-skill-name>/`.
2. Rename `SKILL_TEMPLATE.md` to `SKILL.md`.
3. Edit `SKILL.md` with:
   - YAML frontmatter (`name` and `description`).
   - Clear trigger conditions under `## When to Use`.
   - Step-by-step workflow and guidelines.
4. Add an entry to the catalog in `README.md` and in `.claude-plugin/plugin.json`.
5. Open a pull request or commit to main.

---

## License

[MIT](LICENSE)

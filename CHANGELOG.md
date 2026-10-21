# Changelog

All notable changes to the `skills` repository will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.1] - 2026-10-21

### Changed
- Refined `interactive-html` with **End-to-End Causal Wiring, Macro Page Topologies & Tangle Scrubbable Prose**:
  - **End-to-End Causal Wiring**: Mandated a single shared reactive pipeline state across multi-stage explainers (e.g., mutating document chunk size/overlap in Stage 1 dynamically updates Stage 2's 2D vector embeddings and Stage 3's assembled prompt and cited answer).
  - **4 Macro Page Topologies**: Added distinct outer page shells (Causally Wired Flow-Graph Pipeline, Split-Pane IDE Workbench, Editorial Magazine Essay, and 60fps Telemetry/Race Arena) to prevent generic stacked-card layouts.
  - **Tangle-Style Scrubbable Inline Prose (`bindScrubbableNumbers`)**: Added draggable inline numbers (`[ 16 words ⟷ ]`) embedded directly inside narrative sentences.
  - **Live Custom Input + 5-Point Self-Refinement Gate**: Required live user inputs alongside presets and a 5-point self-audit checklist before delivering any generated `.html` file.
  - Updated `CONTEXT.md`, `docs/interactive-html.md`, and `skills/interactive-html/references/evals.json`.

## [1.2.0] - 2026-10-20

### Changed
- Upgraded `interactive-html` to the **Intent-Driven Adaptive Architecture**:
  - **Question-to-Paradigm Routing**: Dynamically routes each user prompt to its natural interactive medium (Live Bi-Directional Workbench, Interactive Graph/DAG Sandbox, 60fps Particle Stage + Live Oscilloscope, Head-to-Head Workload Arena, Direct-Manipulation 2D/Matrix Playground, or Interactive Wire & Fault Debugger) without cookie-cutter UI chrome.
  - **Composable Micro-Engine Toolkit (`references/html-blueprint.md`)**: Added reusable zero-dependency primitives for Retina `<canvas>` setup, 60fps spring physics, weighted Bezier attention/packet arcs, live softmax/temperature calculators, and scrolling telemetry oscilloscopes.
  - **Domain-Matched Visual Palettes**: Added Editorial Lab Notebook (`ciechanow.ski` style), Cyber-Telemetry Command Center, Developer Git/Compiler Workbench, and Blueprint CAD themes.
  - Updated `docs/interactive-html.md`, `skills/interactive-html/references/evals.json`, and linked `wtf` capstones to `interactive-html`.

## [1.1.0] - 2026-10-20

### Added
- Added `interactive-html` ("Answer Me With Interactive HTML") skill for generating self-contained, single-file interactive `.html` explanations with reversible time scrubbers, parameter sliders, live state inspectors, and in-page prediction challenges.
- Added progressive-disclosure starter architecture in `skills/interactive-html/references/html-blueprint.md` and benchmark assertions in `skills/interactive-html/references/evals.json`.
- Added deep-dive guide in `docs/interactive-html.md` and updated domain terminology in `CONTEXT.md`.

## [1.0.1] - 2026-09-24

### Fixed
- Moved starter template to `templates/skill-template/SKILL_TEMPLATE.md` to prevent package managers (`npx skills`) from indexing the template as an installable skill.

### Added
- Added `AGENTS.md`, `CLAUDE.md`, and `CONTEXT.md` defining project guidelines and domain terms.
- Added `CHANGELOG.md` for version release tracking.

## [1.0.0] - 2026-09-24

### Added
- Initial public release of `zxsure-skills`.
- Added `wtf` (Walk Through Foundations) skill with Socratic piece-by-piece progressive learning, mandatory visual graphs (Mermaid & ASCII), and ELI5 audience calibration.
- Added comprehensive evaluation assertions in `skills/wtf/references/evals.json`.
- Added detailed documentation and usage guide in `docs/wtf.md`.
- Added `.claude-plugin/plugin.json` for Claude Code plugin marketplace compatibility.
- Added MIT License and README.

# Changelog

All notable changes to the `skills` repository will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.1] - 2026-10-21

### Added
- Added formal **Acceptance Criteria & 100-Point Quantitative Craft Rubric** (`skills/interactive-html/references/acceptance-criteria.md`) defining 5 zero-tolerance Hard Gates (HG-1..HG-5) and a 100-point scoring rubric (`>= 85/100` required to pass).
- Added zero-dependency **Automated CLI Acceptance Verifier & Test Runner** (`skills/interactive-html/scripts/verify-html.mjs`, wired to `npm test`) that compiles inline `<script>` blocks via `vm.Script`, audits sandbox safety, measures interactive modality diversity (`>= 3` modalities), checks HiDPI/motion craft, and scores causal state wiring.

### Changed
- Refined `interactive-html` around **Visual-First Simplicity, Single Spacious Stage & Object-Permanence Motion**:
  - **Banned 3-Column Cramped Grids & Text Bloat (`HG-4`)**: `verify-html.mjs` now rejects 3-column side-by-side dashboard layouts (`1fr 1fr 1fr`) and pages exceeding `85` words of `<p>` prose so that 85%+ of the viewport is dedicated to one self-explanatory animated stage.
  - **Object-Permanence Spring Choreography**: Replaced static "Before/After" tables with a single 60fps spring-animated stage where cards/nodes physically glide, magnetically snap together, attach to `[NULL]` ghost blocks, or drop out.
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

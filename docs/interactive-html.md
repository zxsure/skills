# Interactive HTML (`interactive-html`) — Deep Dive & Usage Guide

> *"Every technical question has its own natural interactive medium and macro page architecture. Never force two different topics into the same UI shell, and never build isolated widgets that don't talk to each other."*

`interactive-html` is a specialized skill for AI coding agents that answers technical questions by building a **bespoke, self-contained `.html` interactive playground** ("Explorable Explanation") whose **macro page topology, visual aesthetic, in-browser algorithm, and interactive controls are dynamically tailored to the exact question the user asked**.

---

## Intent-Driven Adaptive Architecture (How the Skill Adapts to Your Prompt)

Instead of stamping out a single rigid template, `interactive-html` diagnoses the **conceptual shape** of your question and selects both the **Interactive Paradigm** and the **Macro Page Topology**:

```mermaid
flowchart LR
    Prompt["User Question"] --> Router{"Question Shape?"}
    Router -->|Multi-Stage Pipeline<br/>RAG / Compilers / HTTP| Pipeline["1. Causally Wired Flow-Graph Pipeline<br/>(Stage 1 ──●──▶ Stage 2 ──●──▶ Stage 3)"]
    Router -->|Syntax / SQL / Regex / CSS| Workbench["2. Split-Pane IDE Workbench<br/>(Live input editor + Venn/box/AST morphing)"]
    Router -->|Git / Trees / Graphs / GC| DAG["3. Interactive Graph & DAG Sandbox<br/>(Execute real git rebase / tree splits / undo)"]
    Router -->|Traffic / Queues / Physics| Sim60["4. 60fps Particle Stage + Live Oscilloscope<br/>(Hold-to-burst, click canvas, real-time waveforms)"]
    Router -->|System A vs. System B| Arena["5. Head-to-Head Workload Arena<br/>(Simultaneous A/B race under tunable workloads)"]
    Router -->|Math / Geometry / Essay| Essay["6. Editorial Magazine Essay + Tangle Prose<br/>(Warm paper, scrubbable inline numbers, 2D drag)"]
```

---

## Four Pillars of High-Craft Explorable Explanations

1. **End-to-End Causal Wiring (Zero Isolated Islands)**:
   - Every stage on the page shares a **single reactive domain state**. For example, in a RAG explainer, changing `Chunk Size` or `Overlap` in Stage 1 dynamically re-slices the knowledge base, re-plots the chunks in Stage 2's 2D Vector Map, and re-assembles the `<context>` prompt and cited LLM answer in Stage 3!
2. **Live Custom Input + Curated Presets**:
   - Whenever a topic processes queries, strings, keys, arrays, or rules, users can both click curated presets and **type their own live input** to watch the real vanilla-JS micro-algorithm evaluate it in real time.
3. **Tangle-Style Scrubbable Inline Prose**:
   - Narrative paragraphs embed draggable inline numbers (`[ 16 words ⟷ ]`) so readers can scrub parameters directly inside the text.
4. **Automated Acceptance Testing & 100-Point Craft Rubric**:
   - Every generated `.html` file is validated by [`skills/interactive-html/scripts/verify-html.mjs`](../skills/interactive-html/scripts/verify-html.mjs) against the **5 Hard Gates** and **100-Point Craft Rubric** in [`skills/interactive-html/references/acceptance-criteria.md`](../skills/interactive-html/references/acceptance-criteria.md) (requiring `5/5` Hard Gates and a score `>= 85/100`).
   - Run `npm test` (or `node skills/interactive-html/scripts/verify-html.mjs .interactive-html/<file>.html`) to verify JS syntax (`vm.Script`), sandbox safety, multi-modal interactivity (`>= 3` modalities), Retina HiDPI scaling, and causal state wiring.

---

## How to Use `interactive-html`

### Natural Language Prompts
```text
answer me with interactive html: what is RAG and how do chunking and vector search work together?
answer me with interactive html: git rebase vs git merge
explain how transformer self-attention and temperature sampling work in interactive html
```

### Slash Command Prompts
```text
/interactive-html rag pipeline
/interactive-html git rebase vs merge
/interactive-html token bucket vs leaky bucket rate limiting
```

---

## Sandbox & File Hygiene

- **Zero-Build, Single-File**: Standalone `.html` file using vanilla HTML5, CSS Grid/Flexbox, inline SVG, high-DPI `<canvas>`, and vanilla ES6+ JS.
- **Offline & Sandbox Safe**: No external `fetch()` calls, web fonts, or unverified CDNs.
- **Default Output Path**: Saved under `.interactive-html/<topic-slug>.html` inside your workspace and opened automatically in your agent's Review panel.

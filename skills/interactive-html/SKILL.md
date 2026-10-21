---
name: interactive-html
description: Answer the user with a self-contained, interactive HTML explanation ("Explorable Explanation") instead of static text. Use whenever the user says "answer me with interactive html", "explain X in interactive html", "/interactive-html <topic>", "build an interactive playground/visualizer for X", or wants a custom interactive playground tailored to the exact concept, algorithm, system, math, or code they asked about.
---

# Interactive HTML — Answer Me With Interactive HTML

> *"Every question has its own natural interactive medium and macro page architecture. Never force two different topics into the same UI shell, and never build isolated widget boxes that don't talk to each other."*

When a user invokes **`interactive-html`** (or asks to *"answer me with interactive html"*), your deliverable is a **self-contained, single-file interactive `.html` micro-application** whose **macro page topology, visual aesthetic, in-browser algorithm, and interactive controls are custom-designed around the exact topic and question the user asked**.

---

## 🚫 The 4 Anti-Boilerplate Rules

1. **NO Cookie-Cutter `Prev / Play / Next` Slide Decks**:
   - Do not wrap a static 5-step array in a generic `Prev / Play / Next` bar when the topic can be a live editable workbench, a 60fps physics simulation, or an interactive graph builder.
2. **NO Generic Stacked Dark Cards (`.card` → `.card` → `.card`)**:
   - Do not make every page look like 3 rounded rectangles stacked vertically on a `#090d16` background. Vary the **Macro Page Architecture** (Full-Viewport Split-Pane IDE, Warm Editorial Essay with Tangle Scrubbable Numbers, Connected Flow-Graph Pipeline, or Full-Bleed Canvas with Floating HUD).
3. **NO Isolated Widget Islands (Enforce End-to-End Causal Wiring)**:
   - If your page has multiple stages (e.g., *Chunking → Vector Search → Prompt Assembly*), they **must share a single reactive state**. Changing chunk size in Stage 1 must dynamically change the vector points in Stage 2 and the assembled prompt in Stage 3!
4. **NO Hardcoded-Only Presets When Live Input Is Possible**:
   - Presets are great for 1-click discovery, but whenever the topic involves queries, strings, regexes, SQL, keys, arrays, or expressions, include a **live editable input** so the user can type their own value and watch the real micro-algorithm run on it.

---

## Step 1: Choose Both the Interactive Paradigm & the Macro Page Architecture

Before writing any code, match the user's question to its **Interactive Paradigm** AND its **Macro Page Architecture** (see [`references/html-blueprint.md`](references/html-blueprint.md)):

| User's Question / Topic Shape | Interactive Paradigm | Macro Page Architecture (Outer Shell) | Domain-Native Controls & Mechanics |
| :--- | :--- | :--- | :--- |
| **1. Multi-Stage Data / AI Pipeline**<br/>*(RAG, Compilers, HTTP Request Lifecycle, MapReduce, CI/CD, Video Encoding)* | **Causally Wired Pipeline Studio** | **Connected Flow-Graph Workbench**: Horizontal or stepped pipeline with animated connector conduits carrying live data from Stage 1 → Stage 2 → Stage 3 | Live text/query input + stage knobs (e.g. `Chunk Size`, `Top-K`, `Temperature`) where mutating Stage 1 ripples through every downstream stage live |
| **2. Syntax, Query, Layout, or Data Transformation**<br/>*(SQL Joins, Regex, CSS Flexbox/Grid, ASTs, Bitwise ops, JWTs)* | **Live Bi-Directional Workbench** | **Split-Pane IDE Studio** (like Regex101 / ShaderToy / ASTExplorer): Compact top toolbar + side-by-side synchronized panes | Editable query/code/input + clickable tokens that cross-highlight matching visual regions, Venn rows, or bit fields on every keystroke |
| **3. Graph, Tree, or Version History Mutation**<br/>*(Git Rebase vs. Merge, B+ Trees, Red-Black Trees, DOM Diffing, GC)* | **Interactive Graph / DAG Command Sandbox** | **Canvas-First Command Terminal**: Top command palette + large interactive graph canvas + bottom object/pointer inspector | Real domain verbs (`git commit`, `git rebase main`, `+ Insert Key`, `Force Split`, `Run GC Sweep`) with spring-physics node transitions & Undo |
| **4. Continuous Traffic, Physics, Queues, or Control Loops**<br/>*(Rate limiters, TCP congestion, Load balancers, Thread pools, Springs, PID)* | **60fps Real-Time Simulation + Live Oscilloscope** | **Cyber-Telemetry Lab**: High-DPI `<canvas>` particle/fluid stage paired with a live scrolling 60fps time-series oscilloscope | Continuous sliders, **Hold-to-Flood Burst** trigger, and direct click/drag on the canvas to spawn tokens, drop obstacles, or kill workers |
| **5. Architecture / Algorithm Tradeoff Comparison**<br/>*(B-Tree vs. LSM, Kafka vs. RabbitMQ, QuickSort vs. MergeSort, Mutex vs. RWLock)* | **Head-to-Head Workload Arena** | **Shared Workload Generator → Multi-Lane Arena**: Top workload shaper feeding 2–3 simultaneous engines side by side | Workload presets (*95% Writes*, *Boundary Spike*, *Slow Network*), simultaneous race trigger, live cost/latency crossover curves |
| **6. Foundational Math, Geometry, Physics, or Deep Concept**<br/>*(Bezier curves, Fourier series, Attention math, Floating point, Hashing)* | **Direct-Manipulation 2D Playground + Scrubbable Prose** | **Editorial Magazine Essay (`ciechanow.ski` / `samwho.dev` style)**: Warm cream paper `#faf6ef`, serif headers, **Tangle-style scrubbable numbers inside sentences**, and breakout dark interactive figures | Mouse/pointer drag handles (`P0..P3`, vectors, playheads) directly inside `<canvas>`/`<svg>` + inline draggable numbers (`[ 16 words ⟷ ]`) in the prose |

---

## Step 2: Implement Real Causal Mechanics in Vanilla JS

1. **Single Reactive Pipeline State (`state` → `recomputePipeline()` → `renderAll()`)**:
   - Never let Widget A use one hardcoded array while Widget B uses an unrelated hardcoded array. Compute Stage 2's inputs directly from Stage 1's outputs!
2. **Tangle-Style Scrubbable Inline Numbers**:
   - In explanatory text, turn key numbers into draggable inline pills (`<span class="scrub-num" data-key="..." data-min="..." data-max="...">`) so the user can drag numbers right inside the sentence and watch the diagram react!
3. **Motion That Shows Causality**:
   - Use 60fps damped spring physics (`F = -kx - cv`), `<animateMotion>` along curved SVG Bezier paths, or FLIP layout transitions so elements glide smoothly from their old position to their new position.

---

## Step 3: Mandatory 5-Point Self-Refinement Audit (Before Concluding)

After writing the initial `.html` file, **audit your own work against these 5 gates** and edit the file if any check falls short:

1. **Causal Connectivity Check**: *If the user changes a control in Section 1, does it visibly affect Section 2/3, or are the widgets disconnected islands?* (If disconnected, wire them to a shared state!)
2. **Macro Topology Check**: *Does the page look like a bespoke app/essay for this specific topic, or did I fall back into generic stacked dark cards?*
3. **Live Input Check**: *Can the user type or drag custom input (a custom query, custom key, custom text, or free 2D coordinates) in addition to clicking presets?*
4. **60fps / Tactile Polish Check**: *Are `<canvas>` elements Retina-scaled (`devicePixelRatio`), do draggable/clickable elements have clear hover/active affordances and cursor cues, and do transitions use smooth spring/Bezier motion?*
5. **Sandbox & Preview Check**: *Is the file saved inside `.interactive-html/<topic-slug>.html` (never `/tmp`) with zero external network calls, and rendered live via `preview`?*

---

## Sandbox, File Path & Technical Guardrails

1. **Single-File, Zero-Build Vanilla Stack**:
   - Write a complete `<!DOCTYPE html>` file with inline `<style>` and `<script>`.
   - Never call `fetch()` against external APIs or load Google Fonts. If a third-party library is needed in Optimus Desktop, load it only from `https://unpkg.ase.apple.com/PACKAGE@VERSION/path` after verifying HTTP 200.
2. **Output Path Hygiene (Never Write to `/tmp`)**:
   - Write to **`.interactive-html/<topic-slug>.html`** relative to the current workspace root (unless the user specifies another project path).
3. **Auto-Preview Across Agent Environments**:
   - **If the `preview` tool is available**: Call `preview` with `filePath: ".interactive-html/<topic-slug>.html"` immediately after writing or updating the file. Never run `open` or launch an external browser when `preview` is present.

---
name: interactive-html
description: Answer the user with a self-contained, interactive HTML explanation ("Explorable Explanation") instead of static text. Use whenever the user says "answer me with interactive html", "explain X in interactive html", "/interactive-html <topic>", "build an interactive playground/visualizer for X", or wants a custom interactive playground tailored to the exact concept, algorithm, system, math, or code they asked about.
---

# Interactive HTML — Answer Me With Interactive HTML

> *"Every question has its own natural interactive medium. A Git question needs a live commit-graph terminal; a Transformer question needs clickable token attention beams and a temperature softmax slider; a rate-limiter needs 60fps particle physics; a CSS/SQL question needs a live editable workbench. Never force two different topics into the same UI shell."*

When a user invokes **`interactive-html`** (or asks to *"answer me with interactive html"*), your deliverable is a **self-contained, single-file interactive `.html` micro-application** whose **layout topology, visual metaphor, and interactive controls are custom-designed around the exact topic and question the user asked**.

---

## 🚫 The Golden Anti-Boilerplate Rule

**NEVER use a fixed template or mandatory UI chrome across different topics.**
- Do **not** put a `Prev / Play / Next` button bar on a topic that should be a live editable playground, a 60fps physics simulation, or an interactive graph builder.
- Do **not** put "Mission Cards" or "Quiz Cards" on a page unless gamified missions genuinely fit the user's request.
- Do **not** reuse the same 2-column split or 3-section layout for every prompt. **Form must follow the question's specific mechanics.**

---

## Step 1: Route the User's Question to Its Natural Interactive Paradigm

Before writing any HTML/CSS/JS, diagnose **what kind of understanding** the user's prompt requires, and pick (or blend) the matching **Interactive Paradigm**:

| User's Question / Topic Shape | Best-Fit Interactive Paradigm & Layout | Domain-Native Controls (No Generic Buttons!) |
| :--- | :--- | :--- |
| **1. Syntax, Query, Layout, or Text Transformation**<br/>*(Regex, SQL Joins, CSS Flexbox/Grid, ASTs, Bitwise ops, JWTs, Cron)* | **Live Bi-Directional Workbench**<br/>Split editor + live visual stage that re-evaluates on every keystroke or pill toggle | Editable input string/code/query, clickable syntax tokens that highlight matching output regions, live Venn/box/bit-field morphing |
| **2. Graph, Tree, or Version History Mutation**<br/>*(Git Rebase vs. Merge, B+ Trees, Red-Black Trees, DOM diffing, GC Mark-and-Sweep)* | **Interactive Graph / DAG Construction Sandbox**<br/>Central interactive canvas + command palette that executes real operations on the graph | Domain verbs (`git commit`, `git rebase main`, `git merge`, `+ Insert Key`, `Run GC Sweep`), animated node cloning/re-parenting, Undo/History stack |
| **3. Continuous Traffic, Physics, Queues, or Control Loops**<br/>*(Rate limiters, TCP congestion, Load balancers, Thread pools, Springs, PID controllers)* | **60fps Real-Time Simulation + Live Oscilloscope**<br/>High-DPI `<canvas>` particle/fluid engine + scrolling time-series telemetry chart | Continuous sliders (arrival rate, latency, damping), **Hold-to-Flood Burst** trigger, click-on-canvas to drop obstacles/kill workers |
| **4. Architecture / Algorithm Tradeoff Comparison**<br/>*(B-Tree vs. LSM, Kafka vs. RabbitMQ, CSR vs. SSR, QuickSort vs. MergeSort, Mutex vs. RWLock)* | **Head-to-Head Workload Arena**<br/>Shared workload generator at top feeding 2–3 simultaneous side-by-side engines below | Workload shaper presets (*95% Writes*, *Spiky Traffic*, *Slow Network*, *Nearly Sorted*), simultaneous race trigger, live cost/latency meters |
| **5. AI/ML, Math, Geometry, or Signal Processing**<br/>*(Transformer Self-Attention, Softmax Temperature, Gradient Descent, Bezier curves, Fourier)* | **Direct-Manipulation 2D/Matrix Playground**<br/>Interactive vector/matrix/token canvas where mouse drag or token hover drives live math | Clickable prompt tokens with attention-weight beams, live Temperature `T` slider reshaping probability bars, draggable 2D handles (`P0..P3`) |
| **6. Multi-Party Protocol, Handshake, or Code Execution Trace**<br/>*(TLS 1.3, OAuth2 PKCE, Event Loop, Raft Election, DNS Resolution, Repo Request Flow)* | **Interactive Sequence / Time-Travel Debugger**<br/>Swimlane or architecture stage with animated Bezier packets + synchronized code/wire inspector | Scrubber timeline, **Fault Injection toggles** (*Drop Packet*, *Tamper Signature*, *Partition Node*), clickable wire frames |

---

## Step 2: Tailor the Visual Aesthetic to the Domain

Never use a single default stylesheet. Match the typography, color palette, and surface texture to the subject matter (see [`references/html-blueprint.md`](references/html-blueprint.md) for CSS token sets and canvas/SVG utilities):

- **Editorial Paper Essay (`ciechanow.ski` / `Distill.pub` style)**: Warm cream `#faf7f0`, serif display headers, high-contrast dark interactive figures embedded inside a readable narrative flow. Great for math, physics, geometry, and foundational CS concepts.
- **Developer Terminal / Git / Compiler Workbench**: Crisp dark slate/carbon `#090d16`, monospace command pills, syntax-highlighted token chips, and smooth SVG DAG/AST transitions. Great for Git, SQL, compilers, and JS runtime internals.
- **Cyber-Telemetry Command Center**: Deep obsidian `#050811` with glowing 60fps `<canvas>` particle streams, scrolling emerald/coral oscilloscope waveforms, and hardware-style sliders. Great for networking, distributed systems, and concurrency.
- **AI / Neural Visualizer Studio**: Clean high-contrast studio surface with interactive token ribbons, weighted bezier attention arcs, and live probability distribution histograms. Great for LLMs, embeddings, and ML math.

---

## Step 3: Build Real Domain Mechanics (Not Canned Slides)

To make the interactive HTML feel genuinely alive and intelligent:
1. **Implement the Real Micro-Algorithm in Vanilla JS**:
   - Explaining **Git Rebase**? Maintain an actual commit DAG array (`commits[]`, `branches{}`) so clicking `Commit on feature`, `Commit on main`, and `git rebase main` creates real `C3'`, `C4'` rebased commits with new hashes while fading the orphaned commits!
   - Explaining **Transformer Attention & Temperature**? Store real attention matrices and raw logits so clicking any word re-draws the attention beams and dragging the `Temperature (T = 0.1 → 2.0)` slider computes real `exp(z_i / T) / Σ exp(z_j / T)` probabilities live!
   - Explaining **SQL Joins**? Run the actual `INNER`, `LEFT`, `RIGHT`, `FULL OUTER`, or `CROSS JOIN` over two editable mini-tables and animate the matching/null-padded rows!
2. **Use Motion That Explains Causality**:
   - Every visual transition should answer *"Where did this piece of data come from, and where did it go?"* Use curved SVG Bezier paths with `<animateMotion>`, CSS spring transitions (`cubic-bezier(0.34, 1.56, 0.64, 1)`), or 60fps `<canvas>` interpolation.
3. **Give Immediate Tactile Affordances**:
   - Make interactive elements look obviously clickable/draggable (hover lift, cursor cues, subtle pulsing halos on draggable handles, and clear inline hints like *"👆 Click any word below"* or *"🖱️ Drag control points"*).

---

## Sandbox, File Path & Technical Guardrails

1. **Single-File, Zero-Build Vanilla Stack**:
   - Write a complete `<!DOCTYPE html>` file with inline `<style>` and `<script>`.
   - Prefer pure HTML5 `<canvas>`, inline `<svg>`, CSS Grid/Flexbox, and vanilla ES6+ JavaScript so it works 100% offline with zero CORS failures.
   - Never call `fetch()` against external APIs or load Google Fonts. If a third-party library is needed in Optimus Desktop, load it only from `https://unpkg.ase.apple.com/PACKAGE@VERSION/path` after verifying HTTP 200.
2. **Output Path Hygiene (Never Write to `/tmp`)**:
   - Sandboxed project previewers require the file to live **inside the project directory** (never `/tmp`).
   - If the user does **not** specify a path, write to **`.interactive-html/<topic-slug>.html`** relative to the current workspace root.
3. **Auto-Preview Across Agent Environments**:
   - **If the `preview` tool is available**: Call `preview` with `filePath: ".interactive-html/<topic-slug>.html"` immediately after writing or updating the file so it renders live in the user's Review panel. Never run `open` or launch an external browser when `preview` is present.

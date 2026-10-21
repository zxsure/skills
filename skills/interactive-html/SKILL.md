---
name: interactive-html
description: Answer the user with a self-contained, interactive HTML explanation ("Explorable Explanation") instead of static text. Use whenever the user says "answer me with interactive html", "explain X in interactive html", "/interactive-html <topic>", "build an interactive playground/visualizer for X", or wants a crystal-clear visual animation and interactive stage that is much easier to understand than complex text.
---

# Interactive HTML — Visual-First, Minimal-Text Interactive Explanations

> *"People ask for Interactive HTML because they DO NOT want to read complex text or stare at 3 cramped dashboard columns. Give 85% of the screen to ONE spacious, self-explanatory animated stage where watching the objects move makes the concept click in 3 seconds."*

When a user invokes **`interactive-html`** (or asks to *"answer me with interactive html"*), your deliverable is a **visual-first, minimal-text, single-file `.html` micro-app** (in the spirit of **3Blue1Brown**, **Sam Rose (`samwho.dev`)**, **Bartosz Ciechanowski**, and **Nicky Case**).

---

## 🚫 The 4 Visual-Clutter Sins (NEVER Do These)

1. **NEVER build 3 cramped side-by-side columns (`Pane 1 | Pane 2 | Pane 3`)**:
   - In a side preview panel, 3 columns turn into a cramped wall of tiny tables and text boxes where the eye doesn't know where to look. **Never use a 3-column grid as your workspace.**
2. **NEVER write paragraphs of prose inside the HTML (Strict Text Diet)**:
   - Maximum **1 short subtitle (`≤ 18 words`)** at the top and **1 dynamic single-line caption (`≤ 22 words`)** that updates as the user interacts.
   - **Total `<p>` prose across the entire page must be `< 65 words`.** No long explanations, no "Pane 01 / Workbench 02" labels, no walls of text! If you need a paragraph to explain what's happening, your animation isn't doing its job.
3. **NEVER show a separate "Input Table" and "Output Table" when you can animate the objects themselves moving**:
   - Showing an Input Table on the left and an Output Table on the right forces the user's eyes to dart back and forth comparing text. Instead, use **Object Permanence**: put the items on **one central stage** and **physically animate them gliding, snapping together, splitting, or fading out**!
4. **NEVER overload the UI with 6 different inputs/sliders just to look complex**:
   - Keep controls effortless and obvious: **1 clean control bar** (e.g., big tactile mode pills or 1–2 sliders) + **direct clicking/dragging on the visual objects themselves**.

---

## The 3 Golden Rules of Effortless Visual Understanding

### 1. One Spacious Focal Stage (85% of the Viewport)
Center the entire page around **one generous, breathing visual stage** (`<canvas>` or `<svg>`) with plenty of dark or warm-paper negative space around the objects so the motion is impossible to miss.

### 2. Teach Through Physical Choreography & Object Permanence
Translate abstract rules into **physical motion of visual blocks on a single stage**:

| Topic / Concept | ❌ Bad (Text-Heavy / Multi-Pane) | ✅ Good (Single Stage + Physical Choreography) |
| :--- | :--- | :--- |
| **SQL Joins (`INNER`, `LEFT`, `RIGHT`, `FULL`)** | 3 columns showing Source Table A, Venn Diagram, and Result Table B with paragraphs of text | **One Magnetic Puzzle Stage**: Left cards (`Alice [10]`, `Dan [40]`) and Right cards (`[10] AI`, `[30] Sec`) physically glide to the center and **snap together like magnets** on matching keys! Unmatched cards either **drop & fade out** (`INNER`) or **snap onto glowing `[ NULL ]` ghost blocks** (`LEFT` / `RIGHT` / `FULL`)! |
| **RAG (Retrieval-Augmented Generation)** | 3 columns of tiny chunk cards, vector dots, and system prompt text dumps | **One Animated Canvas**: A draggable Query Orb `[Q]` shoots glowing laser tethers to the nearest document cards on the canvas, **physically pulls the winning cards into a central Prompt Slot**, and lights up the cited answer! |
| **Git Rebase vs. Merge** | Split terminal boxes with long git logs | **One Commit Graph Canvas**: Clicking `git rebase main` physically lifts the `feature` commit circles (`F1, F2`), **arcs them through the air onto the tip of `main` as `F1', F2'`**, and leaves faint dashed ghost rings behind. |
| **Rate Limiting / Queues / TCP** | Multi-section essay with long descriptions | **One 60fps Physics Stage**: Requests fly in as glowing orbs, grab gold tokens from a glass bucket to pass (`200 OK`), or **physically ricochet off the gate with red `429` sparks** when empty. |
| **Trees / Sorting / Math** | Static snapshots with Prev/Next buttons | **One Direct-Manipulation Canvas**: Clicking or dragging nodes directly splits, swaps, or curves them with smooth 60fps spring physics (`F = -kx - cv`). |

### 3. Compact 1-Line Live Readout (Zero Text Clutter)
- Need to show the SQL query, formula, or status? Put it in **one sleek single-line bar** right above or below the stage (e.g. `SELECT * FROM A LEFT JOIN B ON A.id = B.id  →  4 rows (1 NULL-padded)`).

---

## Mandatory Pre-Delivery Check (`verify-html.mjs`)

Before calling `preview`, run the bundled verifier to confirm your HTML passes all **5 Hard Gates** (including the **Anti-Text-Bloat & Single-Stage Simplicity Gate**) and scores **`≥ 85 / 100`**:

```bash
node skills/interactive-html/scripts/verify-html.mjs .interactive-html/<topic-slug>.html
```

1. **HG-1 & HG-3 (Self-Contained & Sandbox Safe)**: Valid `<!DOCTYPE html>`, inline `<style>`/`<script>`, saved in `.interactive-html/<topic-slug>.html` (never `/tmp`), zero external `fetch()` or Google Fonts.
2. **HG-2 (Zero JS Syntax Errors)**: Compiles cleanly via `vm.Script`.
3. **HG-4 (Visual-First & Anti-Clutter Gate)**:
   - **No 3-Column Cramped Grids**: Rejects `grid-template-columns` with 3+ fractional columns (`1fr 1fr 1fr`).
   - **Strict Text Diet**: Total words inside `<p>` tags must be `≤ 80 words`.
   - **Tactile Interactivity**: At least 2–3 clean, intuitive interaction ways (e.g., mode pills/sliders + direct click/drag on the stage).
4. **HG-5 (60fps Spring / Bezier Visual Stage)**: Active `<canvas>` (with `devicePixelRatio` Retina scaling) or `<svg>` stage using `requestAnimationFrame` / spring physics (`F = -kx - cv`) so objects physically glide to their new positions.
5. **Auto-Preview**: Immediately call `preview` on `.interactive-html/<topic-slug>.html`.

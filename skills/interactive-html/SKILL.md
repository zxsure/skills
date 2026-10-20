---
name: interactive-html
description: Answer the user with a self-contained, interactive HTML explanation ("Explorable Explanation") instead of static text. Use whenever the user says "answer me with interactive html", "explain X in interactive html", "/interactive-html <topic>", "build an interactive playground/visualizer for X", or wants sliders, step-by-step time scrubbers, live state inspection, and interactive challenges to understand any concept, algorithm, system, or code.
---

# Interactive HTML — Answer Me With Interactive HTML

> *"Don't just tell me how it works in static prose—give me knobs to turn, time to scrub, and state I can see mutate live."*

When a user invokes **`interactive-html`** (or asks to *"answer me with interactive html"*), your primary deliverable is a **self-contained, single-file interactive `.html` micro-application** that turns an abstract concept, algorithm, protocol, or code path into a hands-on **Explorable Explanation** (in the spirit of Bret Victor, Bartosz Ciechanowski, and Nicky Case).

Never output a static HTML article or a wall of text wrapped in `<div>` tags. Every generated page must be a **live simulation and interactive visual debugger**.

---

## When to Use

Activate this skill whenever:
- The user says *"answer me with interactive html"*, *"explain `<topic>` in interactive html"*, or invokes `/interactive-html <topic>`.
- The user asks for an *"interactive explainer"*, *"interactive visualizer"*, *"explorable explanation"*, or *"HTML playground"* for an algorithm, system architecture, bug reproduction, or math/physics concept.
- Static diagrams (like Mermaid or ASCII) are not enough because understanding requires **scrubbing through steps in time**, **adjusting parameters via sliders**, or **toggling fault conditions** to watch state change dynamically.

---

## The Core Philosophy (Explorable Explanations)

1. **Interactive Over Static**: If the user doesn't have to click, drag, scrub, or toggle something within 3 seconds of opening the page, the page has failed.
2. **Reversible Time (The Time Scrubber)**: Learners understand complex mechanisms best when they can step **backward** and **forward** (`Prev Step ←` / `Next Step →`) through an execution trace at their own pace.
3. **Direct Manipulation (The Control Surface)**: Expose key system variables as `<input type="range">` sliders, toggle switches, or scenario preset buttons (*"Normal Load"*, *"Cache Miss"*, *"Split-Brain"*) that immediately recompute and animate the visual stage.
4. **Synchronized Mental Models**: Pair the visual stage (SVG/Canvas/DOM diagram) side-by-side with a live **State Inspector** (variables, queues, memory slots, metrics) and step-by-step commentary.
5. **Active Prediction (The In-Page Gate)**: Conclude the page with an interactive **"Predict What Happens"** challenge card that gives instant visual feedback and invites the user to verify the answer using the simulator controls above.
6. **Audience Calibration**:
   - **ELI5 / Beginner**: Everyday physical metaphors (conveyor belts, traffic lanes, post offices) with friendly visual icons.
   - **Software Engineer**: Call stacks, pointers, packet payloads, lock queues, and synchronized code highlights.
   - **System Architect / Manager**: Throughput vs. latency curves, blast radius, cost/capacity sliders, and failover toggles.

---

## The 4-Part Interactive HTML Architecture

Every generated `.html` file **must** contain these four wired-together sections (see [`references/html-blueprint.md`](references/html-blueprint.md) for the starter template and CSS/JS patterns):

1. **Header & Intuition Hook**:
   - Title, audience badge, and a 1–2 sentence plain-English mental model of *why* this concept exists.
2. **Control Surface (Top or Sidebar)**:
   - **Time Scrubber**: `⏮ Reset`, `◀ Prev`, `▶ Play / ⏸ Pause`, `Next ▶`, plus a timeline scrubber (`<input type="range">`) bound to a deterministic `steps[]` state array, with keyboard support (`ArrowLeft` / `ArrowRight` / `Space`).
   - **Parameter Sliders / Scenario Presets**: At least 1–3 interactive parameters or preset buttons that dynamically alter the simulation.
3. **Interactive Visual Stage + Live State Inspector (Main Split Grid)**:
   - **Left / Center (The Stage)**: Inline `<svg>` or `<canvas>` or animated DOM nodes with clear color-coded states (idle, active, mutated, error/blocked) and smooth CSS transitions.
   - **Right (State Inspector & Step Narrative)**: Live readout of internal variables/queues/registers at the current step + a concise explanation of *what just happened and why*.
4. **In-Page Prediction Challenge (Footer Card)**:
   - A multiple-choice or interactive *"What happens if..."* puzzle with instant explanation feedback and a **"Try It on the Stage ↑"** button that configures the simulator to demonstrate the exact scenario.

---

## Sandbox, File Path & Technical Guardrails

1. **Single-File, Zero-Build Vanilla Stack**:
   - Write a complete `<!DOCTYPE html>` file with inline `<style>` and `<script>`.
   - Use CSS Custom Properties (`--bg`, `--surface`, `--text`, `--accent`, etc.) supporting both dark and light modes (`prefers-color-scheme`), plus the native system font stack (`system-ui, -apple-system, sans-serif` and `ui-monospace, monospace`).
2. **Zero External Network Dependencies by Default**:
   - Prefer pure inline SVG, HTML5 Canvas, and vanilla ES6+ JavaScript so the page works 100% offline and inside strict agent sandboxes without CORS or 404 failures.
   - Never call `fetch()` against external APIs or load Google Fonts.
   - If a third-party library (e.g., D3, Chart.js, Three.js) is genuinely needed in sandboxed environments like Optimus Desktop, load it **only** from `https://unpkg.ase.apple.com/PACKAGE@VERSION/path` and verify the URL returns HTTP 200 first.
3. **Output Path Hygiene (Never Write to `/tmp`)**:
   - Sandboxed project previewers require the file to live **inside the project directory** (never `/tmp`).
   - If the user specifies a path, write there.
   - If the user does **not** specify a path, write to **`.interactive-html/<topic-slug>.html`** relative to the current workspace root (so temporary learning artifacts stay organized and out of the project root).
4. **Auto-Preview Across Agent Environments**:
   - **If the `preview` tool is available** (e.g., Optimus Desktop): Call `preview` with `filePath: ".interactive-html/<topic-slug>.html"` immediately after writing or updating the file so it renders live in the user's Review panel. Never run `open` or launch an external browser when `preview` is present.
   - **If no `preview` tool is available** (e.g., CLI-only environments): Print the relative path clearly and tell the user how to open it locally.

---

## Step-by-Step Workflow

1. **Calibrate & Model the State Machine**:
   - Identify the target concept and audience level.
   - Design a deterministic state model:
     - Define 4–7 discrete execution steps (`steps[]`) that tell a clear story from initial state → key transitions → edge case/gotcha → resolution.
     - Define 1–3 tunable parameters or scenario presets that recompute or branch the simulation.
2. **Consult the Blueprint**:
   - Read [`references/html-blueprint.md`](references/html-blueprint.md) if you need the responsive CSS variables, SVG diagram helpers, keyboard-accessible stepper controller, or prediction card markup.
3. **Write the Self-Contained `.html` File**:
   - Save the file to `.interactive-html/<topic-slug>.html` (or the user's requested path).
   - Verify all event listeners (`input`, `click`, `keydown`) are bound and the initial render (`render()`) runs on load without console errors.
4. **Render & Summarize**:
   - Call the `preview` tool (when available) on the saved file path.
   - Keep your chat response concise (3–5 sentences): state the core intuition, list the interactive controls the user can play with in the preview, and invite them to try the in-page prediction challenge or ask for deeper scenarios.

# Interactive HTML Modular Toolkit (v5 — Macro Topologies, Causal Pipelines & Tangle Primitives)

> **DO NOT COPY-PASTE A SINGLE FIXED PAGE SKELETON.**
> Every topic has a unique conceptual shape. Pick the **Macro Page Topology**, **Aesthetic Token Set**, and **Micro-Engine Primitives** below that best fit the user's exact question, and wire all stages to a **single reactive domain state**.

---

## 1. Four Distinct Macro Page Topologies (Avoid Generic Stacked Cards!)

### Topology A: The Causally Wired Flow-Graph Pipeline
*Best for: RAG, Compilers (Lexer → Parser → AST → Bytecode), HTTP/Middleware Pipelines, CI/CD, Video/Audio Processing.*
- **Visual signature**: Stages are visually connected by **animated SVG data conduits** (`──●──▶`). Mutating Stage 1 (e.g., typing a custom query or changing chunk size) immediately recomputes Stage 2 (Vector Embedding Map) and Stage 3 (Augmented Prompt & Output).

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│  LIVE INPUT BAR: [ Type any custom query or pick a preset... ]  [RAG: ON/OFF]│
├──────────────────────┬───────┬──────────────────────┬───────┬───────────────┤
│ STAGE 1: CHUNKER     │       │ STAGE 2: VECTOR MAP  │       │ STAGE 3: LLM  │
│ Sliding window over  │ ──●─▶ │ 2D embedding canvas  │ ──●─▶ │ Live prompt + │
│ knowledge base docs  │       │ plotting Stage 1's   │       │ grounded cited│
│ (Size & Overlap)     │       │ exact live chunks!   │       │ answer!       │
└──────────────────────┴───────┴──────────────────────┴───────┴───────────────┘
```

### Topology B: The Split-Pane IDE Workbench
*Best for: SQL Joins, Regex State Machines, CSS Flexbox/Grid, Bitwise Math, JWT Inspector.*
- **Visual signature**: Zero marketing header fluff—opens straight into a sleek multi-pane IDE where typing in the left editor highlights tokens, Venn intersections, or state transitions on the right in real time.

### Topology C: The Editorial Magazine Essay with Tangle Scrubbable Prose (`ciechanow.ski` / `samwho.dev` style)
*Best for: Math, Physics, Geometry, Algorithms, Deep Mechanical Explanations.*
- **Visual signature**: Warm ivory paper (`#faf6ef`), readable `700px` serif/sans narrative column with **draggable inline numbers (`[ 16 words ⟷ ]`) embedded directly inside sentences**, breaking out into wide `1060px` dark interactive `<canvas>` figures.

### Topology D: The 60fps Telemetry & Race Arena
*Best for: Rate Limiters, TCP Congestion, Load Balancers, B-Tree vs. Full Scan, Sorting.*
- **Visual signature**: High-DPI 60fps particle/disk simulation paired with a live scrolling oscilloscope waveform or simultaneous head-to-head race lanes.

---

## 2. Composable Micro-Engine Primitives (Vanilla JS, Zero Dependencies)

### Primitive 1: Tangle.js-Style Scrubbable Inline Numbers (Living Prose)
Embed draggable numbers directly inside narrative paragraphs so the reader can scrub parameters right inside the text!

```html
<!-- HTML Usage inside any paragraph -->
<p>
  When we slice the handbook into chunks of
  <span class="scrub-num" data-key="chunkSize" data-min="8" data-max="28" data-step="2">14 words</span>
  with an overlap of
  <span class="scrub-num" data-key="overlap" data-min="0" data-max="8" data-step="1">4 words</span>,
  the vector index stores <strong id="prose-chunk-count">6</strong> embeddings.
</p>
```

```css
.scrub-num {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  font-family: var(--font-mono);
  font-weight: 800;
  color: var(--accent, #2563eb);
  background: rgba(37, 99, 235, 0.12);
  border-bottom: 2px dashed var(--accent, #2563eb);
  padding: 1px 7px;
  border-radius: 5px;
  cursor: ew-resize;
  user-select: none;
  transition: transform 0.12s ease, background 0.12s ease;
}
.scrub-num:hover {
  background: rgba(37, 99, 235, 0.22);
  transform: translateY(-1px);
}
.scrub-num::after {
  content: "⟷";
  font-size: 0.72em;
  opacity: 0.75;
}
```

```javascript
function bindScrubbableNumbers(state, onMutate) {
  document.querySelectorAll('.scrub-num').forEach(el => {
    let startX = 0;
    let startVal = 0;
    const key = el.dataset.key;
    const min = parseFloat(el.dataset.min);
    const max = parseFloat(el.dataset.max);
    const step = parseFloat(el.dataset.step || '1');
    const unit = el.dataset.unit || '';

    el.addEventListener('pointerdown', (e) => {
      startX = e.clientX;
      startVal = Number(state[key]);
      el.setPointerCapture(e.pointerId);
    });
    el.addEventListener('pointermove', (e) => {
      if (!el.hasPointerCapture(e.pointerId)) return;
      const dx = e.clientX - startX;
      const raw = startVal + Math.round(dx / 8) * step;
      const clamped = Math.max(min, Math.min(max, raw));
      if (clamped !== state[key]) {
        state[key] = clamped;
        el.textContent = `${clamped}${unit}`;
        onMutate(key, clamped);
      }
    });
  });
}
```

### Primitive 2: Crisp Retina `<canvas>` Setup
Always scale `<canvas>` by `window.devicePixelRatio` so text, curves, and particles look razor-sharp:
```javascript
function setupHiDPI(canvas) {
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  if (canvas.width !== Math.round(rect.width * dpr) || canvas.height !== Math.round(rect.height * dpr)) {
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);
  }
  const ctx = canvas.getContext('2d');
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return { ctx, w: rect.width, h: rect.height };
}
```

### Primitive 3: Damped Spring Physics (`F = -kx - cv`) for Smooth Node/Coordinate Motion
Use when moving nodes to new `(tx, ty)` targets on a `<canvas>` or SVG so changes glide with natural momentum:
```javascript
function stepSpring2D(node, stiffness = 170, damping = 15, dt = 1 / 60) {
  const fx = -stiffness * (node.x - node.tx) - damping * (node.vx || 0);
  const fy = -stiffness * (node.y - node.ty) - damping * (node.vy || 0);
  node.vx = (node.vx || 0) + fx * dt;
  node.vy = (node.vy || 0) + fy * dt;
  node.x += node.vx * dt;
  node.y += node.vy * dt;
}
```

### Primitive 4: Weighted Bezier Attention / Retrieval Beams (SVG)
Great for **Transformer Self-Attention**, **RAG Vector Retrieval**, **Graph Dependencies**, or **Network Flows**:
```javascript
function renderWeightedBezierArc({ x1, y1, x2, y2, weight, color = '#38bdf8', label = '' }) {
  const mx = (x1 + x2) / 2;
  const arcHeight = Math.min(110, Math.abs(x2 - x1) * 0.42 + 28);
  const my = Math.min(y1, y2) - arcHeight;
  const pathD = `M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`;
  const strokeW = (0.8 + weight * 6.5).toFixed(2);
  const opacity = (0.12 + weight * 0.85).toFixed(2);
  return `
    <g class="weighted-arc">
      <path d="${pathD}" fill="none" stroke="${color}" stroke-width="${strokeW}"
            stroke-linecap="round" opacity="${opacity}" />
      ${weight > 0.18 && label ? `
        <text x="${mx}" y="${my + arcHeight * 0.42}" text-anchor="middle"
              fill="${color}" font-size="10" font-family="ui-monospace, monospace" font-weight="700">
          ${label}
        </text>
      ` : ''}
    </g>
  `;
}
```

### Primitive 5: Real-Time Softmax / Temperature Probability Calculator
```javascript
function computeSoftmaxWithTemp(logits, temperature = 1.0, topK = logits.length, topP = 1.0) {
  const T = Math.max(0.05, temperature);
  const scaled = logits.map(l => ({ ...l, scaledLogit: l.logit / T }));
  const maxL = Math.max(...scaled.map(d => d.scaledLogit));
  const exps = scaled.map(d => ({ ...d, expVal: Math.exp(d.scaledLogit - maxL) }));
  const sumExp = exps.reduce((acc, d) => acc + d.expVal, 0);
  return exps
    .map(d => ({ ...d, prob: d.expVal / sumExp }))
    .sort((a, b) => b.prob - a.prob)
    .map((d, idx) => ({ ...d, keptByTopK: idx < topK }));
}
```

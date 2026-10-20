# Interactive HTML Modular Toolkit (v4 — Topic-Adaptive Layouts & Micro-Engines)

> **DO NOT COPY-PASTE A SINGLE FIXED PAGE SKELETON.**
> Every topic has a unique conceptual shape. Pick the **Layout Topology**, **Aesthetic Token Set**, and **Micro-Engine Primitives** below that best fit the user's exact question, and assemble a bespoke interactive experience.

---

## 1. Pick the Layout Topology That Matches the Question

### Topology A: The Live Bi-Directional Workbench
*Use for: SQL Joins, Regex, CSS Flexbox/Grid, AST/Parsers, Bitwise Math, JWTs, Transformers/Prompt Tokens.*
```text
┌─────────────────────────────────────────────────────────────────────────┐
│  Interactive Input / Token Ribbon / Query Composer (Live Editable)      │
├───────────────────────────────────┬─────────────────────────────────────┤
│  Visual Structure / Venn / Beams  │  Live Computed Output / Probabilities│
│  (Morphs on every keystroke/click)│  (Rows, Softmax Bars, AST, DOM Box) │
└───────────────────────────────────┴─────────────────────────────────────┘
```

### Topology B: The Interactive Graph / DAG Command Sandbox
*Use for: Git Rebase vs. Merge, B+ Trees, DOM Diffing, Garbage Collection, State Machines.*
```text
┌─────────────────────────────────────────────────────────────────────────┐
│  Domain Command Bar: [ + git commit (main) ] [ + git commit (feat) ]    │
│                      [ ⚡ git rebase main ]  [ 🔀 git merge ]  [ ↺ Undo ]│
├─────────────────────────────────────────────────────────────────────────┤
│  Full-Width Interactive SVG/Canvas DAG Stage (Click nodes to inspect,   │
│  watch cloned C3' -> C4' nodes animate with spring physics)             │
├─────────────────────────────────────────────────────────────────────────┤
│  Live Git Ref / Pointer Readout (HEAD -> feature -> e4a91c) & Diff Log  │
└─────────────────────────────────────────────────────────────────────────┘
```

### Topology C: The 60fps Physics Stage + Live Telemetry Oscilloscope
*Use for: Rate Limiters, TCP Congestion, Load Balancers, Thread Pools, Backpressure, Springs.*
```text
┌─────────────────────────────────────────┬───────────────────────────────┐
│  60fps High-DPI <canvas> Particle Stage │  Live Scrolling Oscilloscope  │
│  (Click canvas to spawn/block entities) │  + Real-Time Metric Gauges    │
├─────────────────────────────────────────┴───────────────────────────────┤
│  Tactile Hardware Deck: Sliders + Mode Switches + Hold-to-Burst Trigger │
└─────────────────────────────────────────────────────────────────────────┘
```

### Topology D: The Editorial Scrollytelling Essay (`ciechanow.ski` / `samwho.dev`)
*Use for: Deep foundational concepts, Math/Geometry, Physics, End-to-End System Deep Dives.*
- Warm cream paper (`#faf6ef`) with serif headings, short narrative paragraphs, and **2–3 distinct full-width dark interactive figures** embedded inline as the reader scrolls.

---

## 2. Composable Micro-Engine Primitives (Vanilla JS, Zero Dependencies)

### Primitive 1: Crisp Retina `<canvas>` Setup
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

### Primitive 2: Weighted Bezier Attention / Dependency Beams (SVG)
Great for **Transformer Self-Attention**, **Graph Dependencies**, **Pointer References**, or **Network Flows** where line thickness and glow opacity scale with weight `w ∈ [0, 1]`:
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

### Primitive 3: Real-Time Softmax / Temperature Probability Calculator
Great for **LLM Token Sampling (`Temperature`, `Top-K`, `Top-P`)** or **Classification Logits**:
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

### Primitive 4: Damped Spring Animator for Smooth Value/Position Transitions
Use when animating nodes to new `(x, y)` coordinates in a graph, tree, or physical track:
```javascript
function stepSpring(current, target, velocity, stiffness = 180, damping = 14, dt = 1 / 60) {
  const force = -stiffness * (current - target) - damping * velocity;
  const nextVel = velocity + force * dt;
  const nextPos = current + nextVel * dt;
  return { pos: nextPos, vel: nextVel };
}
```

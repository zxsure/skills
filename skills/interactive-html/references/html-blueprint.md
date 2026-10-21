# Interactive HTML Visual-First Blueprint (v6 — Single Spacious Stage & Object-Permanence Motion)

> **THE GOLDEN RULE**: People ask for Interactive HTML because **a moving picture is 10× easier to understand than text**.
> - **85% of the screen** must be **ONE spacious, uncluttered visual stage** (`<canvas>` or `<svg>`).
> - **Almost zero text**: 1 short title, 1 compact control bar, and 1 single-line live caption (`≤ 20 words`).
> - **Object Permanence**: Never draw a static "Input Table" on the left and a separate "Output Table" on the right. Put the objects on **one stage** and **animate them physically gliding, snapping together, splitting, or fading out** using 60fps spring physics!

---

## 1. The Clean Single-Stage Layout Skeleton

```text
┌─────────────────────────────────────────────────────────────────────────┐
│  Title + 1-Line Intuition Subtitle (<= 18 words)            [🌓 Theme]  │
├─────────────────────────────────────────────────────────────────────────┤
│  Compact Control Pill Bar: [ Mode 1 ] [ Mode 2 ] [ Mode 3 ]   [ Slider ]│
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│                                                                         │
│               ONE SPACIOUS 60FPS VISUAL STAGE (85% HEIGHT)              │
│       Objects physically glide, snap together, split, or bounce!        │
│       Click or drag objects directly on the stage to mutate them.       │
│                                                                         │
│                                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│  1-Line Live Formula / SQL / Status Bar (<= 20 words)                   │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Minimal-Chrome CSS Starter (`<style>`)

```css
:root, [data-theme="dark"] {
  --bg: #070a12;
  --surface: #111827;
  --surface-2: #1e293b;
  --stage-bg: #04070d;
  --border: rgba(148, 163, 184, 0.16);
  --text: #f8fafc;
  --text-muted: #94a3b8;
  --cyan: #38bdf8;
  --violet: #a78bfa;
  --emerald: #34d399;
  --rose: #fb7185;
  --amber: #fbbf24;
  --font-sans: -apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", sans-serif;
  --font-mono: ui-monospace, "SF Mono", Menlo, Consolas, monospace;
  --spring: cubic-bezier(0.34, 1.56, 0.64, 1);
}

[data-theme="light"] {
  --bg: #faf7f2;
  --surface: #ffffff;
  --surface-2: #f1ece1;
  --stage-bg: #0b101d;
  --border: rgba(28, 25, 23, 0.12);
  --text: #1c1917;
  --text-muted: #6b6358;
  --cyan: #2563eb;
  --violet: #7c3aed;
  --emerald: #059669;
  --rose: #e11d48;
  --amber: #d97706;
}

* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  background: var(--bg);
  color: var(--text);
  font-family: var(--font-sans);
  padding: 18px 20px 28px;
  max-width: 1060px;
  margin: 0 auto;
  -webkit-font-smoothing: antialiased;
}
```

---

## 3. Core 60fps Object-Permanence Primitives

### Primitive 1: Crisp Retina `<canvas>` Setup
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

### Primitive 2: 2D + Opacity + Scale Spring Physics (`stepSpringEntity`)
Give every visual card/node/orb on the canvas `{ x, y, tx, ty, vx, vy, alpha, tAlpha }` and call `stepSpringEntity(item)` inside `requestAnimationFrame`! When the user switches modes (e.g., `INNER JOIN` → `LEFT JOIN`), simply update each card's target `(tx, ty, tAlpha)` and watch every card **physically glide across the screen and snap into its new place**:

```javascript
function stepSpringEntity(ent, stiffness = 170, damping = 16, dt = 1 / 60) {
  const fx = -stiffness * (ent.x - ent.tx) - damping * (ent.vx || 0);
  const fy = -stiffness * (ent.y - ent.ty) - damping * (ent.vy || 0);
  ent.vx = (ent.vx || 0) + fx * dt;
  ent.vy = (ent.vy || 0) + fy * dt;
  ent.x += ent.vx * dt;
  ent.y += ent.vy * dt;
  if (ent.tAlpha !== undefined) {
    ent.alpha = (ent.alpha ?? 1) + (ent.tAlpha - (ent.alpha ?? 1)) * 0.16;
  }
  if (ent.tScale !== undefined) {
    ent.scale = (ent.scale ?? 1) + (ent.tScale - (ent.scale ?? 1)) * 0.18;
  }
}
```

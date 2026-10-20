# Interactive HTML Blueprint & Component Patterns

Use this reference when generating a self-contained `.html` file for the `interactive-html` skill. Adapt the visual stage (SVG / Canvas / DOM) and state logic to the specific concept being explained.

---

## 1. Complete Starter Skeleton (Zero-Dependency, Dark/Light Adaptive)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Interactive HTML Explainer — [Topic Name]</title>
  <style>
    :root {
      --bg: #0f172a;
      --surface: #1e293b;
      --surface-elevated: #334155;
      --border: #475569;
      --text: #f8fafc;
      --text-muted: #94a3b8;
      --accent: #38bdf8;
      --accent-glow: rgba(56, 189, 248, 0.2);
      --success: #4ade80;
      --warning: #fbbf24;
      --danger: #f87171;
      --font-sans: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    }

    @media (prefers-color-scheme: light) {
      :root {
        --bg: #f8fafc;
        --surface: #ffffff;
        --surface-elevated: #f1f5f9;
        --border: #cbd5e1;
        --text: #0f172a;
        --text-muted: #475569;
        --accent: #0284c7;
        --accent-glow: rgba(2, 132, 199, 0.15);
        --success: #16a34a;
        --warning: #d97706;
        --danger: #dc2626;
      }
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: var(--font-sans);
      background: var(--bg);
      color: var(--text);
      line-height: 1.5;
      padding: 20px;
      max-width: 1120px;
      margin: 0 auto;
    }

    /* 1. Header Hook */
    header {
      margin-bottom: 18px;
      padding-bottom: 14px;
      border-bottom: 1px solid var(--border);
    }
    .badge {
      display: inline-block;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      padding: 3px 8px;
      border-radius: 999px;
      background: var(--accent-glow);
      color: var(--accent);
      margin-bottom: 6px;
    }
    h1 { font-size: 1.5rem; margin-bottom: 6px; }
    .hook { color: var(--text-muted); font-size: 0.95rem; }

    /* 2. Control Surface */
    .controls-bar {
      display: flex;
      flex-wrap: wrap;
      gap: 14px;
      align-items: center;
      justify-content: space-between;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 12px 16px;
      margin-bottom: 16px;
    }
    .btn-group { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }
    button {
      font-family: var(--font-sans);
      font-size: 0.85rem;
      font-weight: 600;
      padding: 6px 12px;
      border-radius: 8px;
      border: 1px solid var(--border);
      background: var(--surface-elevated);
      color: var(--text);
      cursor: pointer;
      transition: all 0.15s ease;
    }
    button:hover { border-color: var(--accent); }
    button.primary {
      background: var(--accent);
      color: #0f172a;
      border-color: var(--accent);
    }
    button.active-preset {
      border-color: var(--accent);
      box-shadow: 0 0 0 2px var(--accent-glow);
    }
    .slider-group {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.85rem;
      color: var(--text-muted);
    }
    input[type="range"] { accent-color: var(--accent); cursor: pointer; }

    /* 3. Split Stage & State Inspector */
    .workspace {
      display: grid;
      grid-template-columns: 1.55fr 1fr;
      gap: 16px;
      margin-bottom: 16px;
    }
    @media (max-width: 820px) {
      .workspace { grid-template-columns: 1fr; }
    }
    .card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 16px;
    }
    .card-title {
      font-size: 0.78rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--text-muted);
      margin-bottom: 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .narrative-box {
      background: var(--surface-elevated);
      border-left: 3px solid var(--accent);
      padding: 10px 12px;
      border-radius: 6px;
      font-size: 0.9rem;
      margin-bottom: 12px;
    }
    .kv-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 8px;
      font-family: var(--font-mono);
      font-size: 0.8rem;
    }
    .kv-item {
      background: var(--surface-elevated);
      padding: 8px 10px;
      border-radius: 6px;
      border: 1px solid var(--border);
    }
    .kv-label { color: var(--text-muted); font-size: 0.72rem; display: block; }
    .kv-value { font-weight: 700; color: var(--accent); }

    /* 4. In-Page Prediction Challenge */
    .challenge-options {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 10px;
    }
    .feedback {
      margin-top: 10px;
      padding: 10px 12px;
      border-radius: 8px;
      font-size: 0.88rem;
      display: none;
    }
    .feedback.correct {
      display: block;
      background: rgba(74, 222, 128, 0.12);
      border: 1px solid var(--success);
    }
    .feedback.wrong {
      display: block;
      background: rgba(248, 113, 113, 0.12);
      border: 1px solid var(--danger);
    }
  </style>
</head>
<body>
  <!-- 1. Header Hook -->
  <header>
    <span class="badge">Interactive Explainer</span>
    <h1>[Topic Title]</h1>
    <p class="hook">[1-2 sentence intuition hook explaining why this mechanism exists]</p>
  </header>

  <!-- 2. Control Surface -->
  <section class="controls-bar" aria-label="Simulation Controls">
    <div class="btn-group">
      <button id="btn-reset" title="Reset to Step 0">⏮ Reset</button>
      <button id="btn-prev" title="Previous Step (←)">◀ Prev</button>
      <button id="btn-play" class="primary" title="Play / Pause (Space)">▶ Play</button>
      <button id="btn-next" title="Next Step (→)">Next ▶</button>
      <label class="slider-group">
        <span>Step <strong id="step-counter">1/5</strong></span>
        <input id="step-scrubber" type="range" min="0" max="4" value="0" />
      </label>
    </div>
    <div class="btn-group" id="parameter-controls">
      <!-- Add domain-specific sliders or preset buttons here -->
    </div>
  </section>

  <!-- 3. Split Visual Stage & State Inspector -->
  <main class="workspace">
    <section class="card">
      <div class="card-title">
        <span>Interactive Visual Stage</span>
        <span id="stage-status">Ready</span>
      </div>
      <div id="visual-stage">
        <!-- Inline SVG or Canvas rendered/updated by render() -->
      </div>
    </section>

    <aside class="card">
      <div class="card-title">
        <span>What's Happening & Live State</span>
        <span>← / → keys</span>
      </div>
      <div id="step-narrative" class="narrative-box"></div>
      <div id="state-inspector" class="kv-grid"></div>
    </aside>
  </main>

  <!-- 4. In-Page Prediction Gate -->
  <section class="card" aria-label="Prediction Challenge">
    <div class="card-title">
      <span>🎯 Micro-Challenge: Predict What Happens</span>
    </div>
    <p id="challenge-prompt">[Ask a concrete "What happens when..." question tied to the simulation]</p>
    <div class="challenge-options" id="challenge-options"></div>
    <div id="challenge-feedback" class="feedback"></div>
  </section>

  <script>
    // Deterministic state machine pattern:
    // Keep all state in a single object and drive all DOM/SVG updates from render().
  </script>
</body>
</html>
```

---

## 2. Best Practices for Reliable Interactivity

1. **Single `state` Object + Pure `render(state)` Function**:
   - Never scatter state across global variables or hidden DOM attributes.
   - Store `{ stepIndex, isPlaying, params: {...}, selectedAnswer }` in one `state` object and re-render deterministically whenever any slider, preset, or stepper button fires.
2. **Keyboard Shortcuts**:
   - Bind `ArrowRight` → next step, `ArrowLeft` → previous step, and `Space` → toggle play/pause (when focus is not inside an `<input>`).
3. **SVG Transitions**:
   - Give SVG nodes `<g>`, `<rect>`, `<circle>`, and `<path>` CSS classes with `transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1)` so stepping forward/backward animates smoothly instead of flickering.
4. **"Show Me on the Stage" Button in the Challenge Card**:
   - When the user answers the prediction challenge, include a button that sets `state.params` and `state.stepIndex` to the exact step that proves the answer visually on the stage.

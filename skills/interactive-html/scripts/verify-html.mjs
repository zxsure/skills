#!/usr/bin/env node
/**
 * Automated Acceptance Verifier & Craft Scorer for the `interactive-html` Skill.
 *
 * Usage:
 *   node skills/interactive-html/scripts/verify-html.mjs <file.html | directory> [--json]
 *   node skills/interactive-html/scripts/verify-html.mjs --self-test
 *
 * Enforces:
 *   - 5 Hard Gates (HG-1..HG-5: Self-Contained HTML5, Zero JS Syntax Errors via vm.Script,
 *     Sandbox/Offline Safety, >=3 Distinct Interactive Modalities, Dynamic Visual Stage)
 *   - 100-Point Quantitative Craft Rubric (Acceptance Threshold: >= 85/100)
 */

import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const MIN_ACCEPTANCE_SCORE = 85;

export function evaluateHtmlContent(html, filePath = 'inline.html') {
  const issues = [];
  const suggestions = [];

  // Extract <style> and <script> blocks
  const styleBlocks = [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)].map(m => m[1]);
  const scriptBlocks = [...html.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi)].map(m => m[1]);
  const allCss = styleBlocks.join('\n');
  const allJs = scriptBlocks.join('\n');

  // ===========================================================================
  // PART 1: 5 HARD GATES (ZERO-TOLERANCE BLOCKERS)
  // ===========================================================================

  // HG-1: Valid Self-Contained HTML5 Document & Safe Path
  const hasDoctype = /<!DOCTYPE\s+html>/i.test(html);
  const hasInlineStyle = styleBlocks.length > 0 && allCss.trim().length > 50;
  const hasInlineScript = scriptBlocks.length > 0 && allJs.trim().length > 50;
  const isTmpPath = filePath.startsWith('/tmp/') || filePath.includes('/tmp/');
  const hg1Pass = hasDoctype && hasInlineStyle && hasInlineScript && !isTmpPath;
  if (!hg1Pass) {
    if (!hasDoctype) issues.push('HG-1 FAIL: Missing <!DOCTYPE html> declaration.');
    if (!hasInlineStyle) issues.push('HG-1 FAIL: Missing or empty inline <style> block.');
    if (!hasInlineScript) issues.push('HG-1 FAIL: Missing or empty inline <script> block.');
    if (isTmpPath) issues.push('HG-1 FAIL: File is inside /tmp (must be inside project workspace, e.g. .interactive-html/).');
  }

  // HG-2: Zero JavaScript Syntax Errors (compiled via vm.Script)
  let jsSyntaxErrors = [];
  scriptBlocks.forEach((code, idx) => {
    try {
      new vm.Script(code, { filename: `${path.basename(filePath)}#script-${idx + 1}` });
    } catch (err) {
      jsSyntaxErrors.push(`Script #${idx + 1}: ${err.message}`);
    }
  });
  const hg2Pass = scriptBlocks.length > 0 && jsSyntaxErrors.length === 0;
  if (!hg2Pass) {
    jsSyntaxErrors.forEach(e => issues.push(`HG-2 FAIL (JS Syntax Error): ${e}`));
  }

  // HG-3: Strict Sandbox & Offline Safety
  const hasExternalFetch = /\bfetch\s*\(|new\s+XMLHttpRequest\b|new\s+WebSocket\b/.test(allJs);
  const hasGoogleFonts = /fonts\.googleapis\.com|fonts\.gstatic\.com/i.test(html);
  const externalScripts = [...html.matchAll(/<script[^>]*\bsrc=["']([^"']+)["']/gi)].map(m => m[1]);
  const unapprovedScripts = externalScripts.filter(src => !src.startsWith('https://unpkg.ase.apple.com/'));
  const hg3Pass = !hasExternalFetch && !hasGoogleFonts && unapprovedScripts.length === 0;
  if (!hg3Pass) {
    if (hasExternalFetch) issues.push('HG-3 FAIL: Uses external fetch(), XMLHttpRequest, or WebSocket.');
    if (hasGoogleFonts) issues.push('HG-3 FAIL: Loads external Google Fonts (use native system font stack).');
    if (unapprovedScripts.length > 0) {
      issues.push(`HG-3 FAIL: Loads unapproved external script(s): ${unapprovedScripts.join(', ')}`);
    }
  }

  // HG-4: Multi-Modal Interactivity (>= 3 Distinct Input Modalities)
  const modalities = [];
  if (/<input[^>]*type=["']range["']/i.test(html)) {
    modalities.push('range-slider');
  }
  if (/<input[^>]*type=["'](?:text|number|search)["']|<textarea\b|contenteditable=["']true["']/i.test(html)) {
    modalities.push('live-text-or-number-input');
  }
  if (/pointerdown|pointermove|mousedown|mousemove|setPointerCapture|addEventListener\(\s*['"]click['"]/.test(allJs) &&
      (/<canvas\b|<svg\b/i.test(html)) &&
      (/getBoundingClientRect|closest\(\s*['"]\[data-|dataset\./.test(allJs))) {
    modalities.push('direct-canvas-or-svg-manipulation');
  }
  if (/scrub-num|ew-resize/.test(html)) {
    modalities.push('tangle-scrubbable-prose');
  }
  if (/<button\b/i.test(html) && /addEventListener\(\s*['"](?:click|pointerdown)['"]/.test(allJs)) {
    modalities.push('interactive-buttons-or-presets');
  }
  if (/addEventListener\(\s*['"]keydown['"]/.test(allJs)) {
    modalities.push('keyboard-shortcuts');
  }

  const hg4Pass = modalities.length >= 3;
  if (!hg4Pass) {
    issues.push(`HG-4 FAIL: Only ${modalities.length} interactive modality detected (${modalities.join(', ') || 'none'}). Minimum 3 required.`);
  }

  // HG-5: Dynamic Visual Stage (<canvas> or <svg>)
  const hasCanvas = /<canvas\b/i.test(html);
  const hasSvg = /<svg\b/i.test(html);
  const hg5Pass = hasCanvas || hasSvg;
  if (!hg5Pass) {
    issues.push('HG-5 FAIL: Missing <canvas> or <svg> visual stage.');
  }

  const hardGatesPassed = hg1Pass && hg2Pass && hg3Pass && hg4Pass && hg5Pass;

  // ===========================================================================
  // PART 2: 100-POINT QUANTITATIVE CRAFT RUBRIC
  // ===========================================================================

  // Category 1: Interactive Modality & Control Richness (25 pts)
  let cat1Modality = 0;
  if (modalities.length >= 3) cat1Modality += 12;
  else if (modalities.length === 2) cat1Modality += 6;

  if (modalities.length >= 4) cat1Modality += 7;
  else suggestions.push('Add a 4th interaction modality (e.g., live text/number input, keyboard shortcuts, or direct 2D canvas drag) (+7 pts).');

  const hasTangleOrPointerDrag = modalities.includes('tangle-scrubbable-prose') ||
    (/pointermove/.test(allJs) && /setPointerCapture|dragging/.test(allJs)) ||
    modalities.includes('live-text-or-number-input');
  if (hasTangleOrPointerDrag) cat1Modality += 6;
  else suggestions.push('Add Tangle-style scrubbable inline prose (.scrub-num), live custom input, or 2D pointer dragging (+6 pts).');

  // Category 2: Motion, Physics & High-DPI Visual Craft (20 pts)
  let cat2Motion = 0;
  const hasContinuousMotion = /requestAnimationFrame|<animateMotion|stroke-dasharray|stepSpring/.test(html);
  if (hasContinuousMotion) cat2Motion += 8;
  else suggestions.push('Add continuous 60fps requestAnimationFrame loop, SVG <animateMotion>, or spring physics (+8 pts).');

  const hasSpringCss = /cubic-bezier\s*\(\s*0\.34|--spring/.test(allCss);
  if (hasSpringCss) cat2Motion += 6;
  else suggestions.push('Add tactile spring CSS easing (--spring: cubic-bezier(0.34, 1.56, 0.64, 1)) (+6 pts).');

  const hasHiDPI = !hasCanvas || /devicePixelRatio/.test(allJs);
  if (hasHiDPI) cat2Motion += 6;
  else suggestions.push('Scale <canvas> by window.devicePixelRatio for crisp Retina display (+6 pts).');

  // Category 3: End-to-End Causal State Wiring & Real Domain Logic (25 pts)
  let cat3Causal = 0;
  const domUpdateTargets = new Set([
    ...[...allJs.matchAll(/getElementById\(\s*['"]([^'"]+)['"]\s*\)/g)].map(m => m[1]),
    ...[...allJs.matchAll(/querySelector(?:All)?\(\s*['"]([^'"]+)['"]\s*\)/g)].map(m => m[1])
  ]);
  if (domUpdateTargets.size >= 5) cat3Causal += 10;
  else suggestions.push('Wire central state updates across at least 5 distinct DOM/Canvas/SVG targets (+10 pts).');

  const hasRealMathOrAlgo = /Math\.(?:hypot|exp|cos|sin|atan2|log2|floor|min|max)|\.sort\(|\.filter\(|\.reduce\(/.test(allJs);
  if (hasRealMathOrAlgo) cat3Causal += 8;
  else suggestions.push('Implement real in-browser domain math/algorithm evaluation instead of static lookups (+8 pts).');

  const eventListenerCount = [...allJs.matchAll(/addEventListener\s*\(/g)].length;
  if (eventListenerCount >= 5) cat3Causal += 7;
  else suggestions.push('Bind >= 5 interactive event listeners driving state recomputation (+7 pts).');

  // Category 4: Bespoke Visual Aesthetic & Layout Responsiveness (15 pts)
  let cat4Aesthetic = 0;
  if (/--[a-zA-Z0-9-]+:/.test(allCss) && /var\(--/.test(allCss)) cat4Aesthetic += 5;
  else suggestions.push('Use CSS Custom Properties (--tokens) for cohesive theming (+5 pts).');

  if (/data-theme|grid-template-columns/.test(html)) cat4Aesthetic += 5;
  else suggestions.push('Include adaptive theme switching (data-theme) or multi-column workbench grid (+5 pts).');

  if (/@media\s*\(/.test(allCss)) cat4Aesthetic += 5;
  else suggestions.push('Add @media responsive breakpoints for narrow preview panels (+5 pts).');

  // Category 5: Pedagogical Clarity & Live Annotations (15 pts)
  let cat5Pedagogy = 0;
  if (/<h1\b/i.test(html) && /<p\b/i.test(html)) cat5Pedagogy += 5;
  if (/innerHTML\s*=|textContent\s*=/.test(allJs)) cat5Pedagogy += 5;
  if (/✅|⚠️|❌|🎯|💡|🔍|⚡/.test(html)) cat5Pedagogy += 5;

  const totalScore = cat1Modality + cat2Motion + cat3Causal + cat4Aesthetic + cat5Pedagogy;
  const accepted = hardGatesPassed && totalScore >= MIN_ACCEPTANCE_SCORE;

  // Detect dominant macro topology archetype for diversity reporting
  let detectedArchetype = 'custom-interactive';
  if (/pipeline-grid|conduit/i.test(html)) detectedArchetype = 'causally-wired-pipeline';
  else if (/dag-canvas|git-btn/i.test(html)) detectedArchetype = 'graph-dag-sandbox';
  else if (/token-ribbon|attention-svg/i.test(html)) detectedArchetype = 'live-token-workbench';
  else if (/telemetry-canvas|oscilloscope|race-lane/i.test(html)) detectedArchetype = '60fps-telemetry-and-race';
  else if (/race-arena|disk-page/i.test(html)) detectedArchetype = 'head-to-head-storage-arena';
  else if (/essay-intro|figure-block/i.test(html)) detectedArchetype = 'editorial-magazine-essay';

  return {
    file: filePath,
    accepted,
    totalScore,
    minRequired: MIN_ACCEPTANCE_SCORE,
    detectedArchetype,
    hardGates: {
      passedAll: hardGatesPassed,
      HG1_selfContainedHtml5: hg1Pass,
      HG2_zeroJsSyntaxErrors: hg2Pass,
      HG3_sandboxOfflineSafe: hg3Pass,
      HG4_multiModalInteractivity: hg4Pass,
      HG5_dynamicVisualStage: hg5Pass
    },
    modalities,
    breakdown: {
      modalityRichness: `${cat1Modality}/25`,
      motionAndHiDPI: `${cat2Motion}/20`,
      causalWiringAndLogic: `${cat3Causal}/25`,
      visualAestheticAndResponsive: `${cat4Aesthetic}/15`,
      pedagogicalClarity: `${cat5Pedagogy}/15`
    },
    issues,
    suggestions
  };
}

function runSelfTest() {
  // 1. Verify that a minimal broken/static slideshow HTML FAILS acceptance
  const badHtml = `<!DOCTYPE html><html><head><style>body{color:red}</style></head><body><h1>Static</h1><script>fetch('https://example.com'); console.log(1);</script></body></html>`;
  const badRes = evaluateHtmlContent(badHtml, '/tmp/bad.html');
  if (badRes.accepted || badRes.hardGates.HG1_selfContainedHtml5 || badRes.hardGates.HG3_sandboxOfflineSafe) {
    console.error('SELF-TEST FAILED: Bad HTML should have been rejected by Hard Gates.');
    process.exit(1);
  }

  // 2. Verify that evals.json and acceptance-criteria.md exist and are valid
  const repoRoot = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../../..');
  const evalsPath = path.join(repoRoot, 'skills/interactive-html/references/evals.json');
  const criteriaPath = path.join(repoRoot, 'skills/interactive-html/references/acceptance-criteria.md');
  const evalsData = JSON.parse(fs.readFileSync(evalsPath, 'utf8'));
  if (!Array.isArray(evalsData.evals) || evalsData.evals.length < 5) {
    console.error('SELF-TEST FAILED: skills/interactive-html/references/evals.json must contain >= 5 benchmark cases.');
    process.exit(1);
  }
  if (!fs.existsSync(criteriaPath)) {
    console.error('SELF-TEST FAILED: skills/interactive-html/references/acceptance-criteria.md is missing.');
    process.exit(1);
  }

  console.log('✅ Self-Test Passed: Hard Gates, 100-Point Craft Scorer, and Benchmark Evals verified.');
}

// CLI Entrypoint
const args = process.argv.slice(2);
if (args.includes('--self-test')) {
  runSelfTest();
  const defaultDir = path.resolve(process.cwd(), '.interactive-html');
  if (!fs.existsSync(defaultDir)) process.exit(0);
  args.push(defaultDir);
}

const jsonMode = args.includes('--json');
const targets = args.filter(a => !a.startsWith('--'));

if (targets.length === 0) {
  console.error('Usage: node skills/interactive-html/scripts/verify-html.mjs <file.html | dir> [--json] [--self-test]');
  process.exit(1);
}

const htmlFiles = [];
targets.forEach(t => {
  const resolved = path.resolve(process.cwd(), t);
  if (!fs.existsSync(resolved)) {
    console.error(`Path not found: ${t}`);
    process.exit(1);
  }
  const stat = fs.statSync(resolved);
  if (stat.isDirectory()) {
    fs.readdirSync(resolved)
      .filter(f => f.endsWith('.html'))
      .forEach(f => htmlFiles.push(path.join(resolved, f)));
  } else {
    htmlFiles.push(resolved);
  }
});

const results = htmlFiles.map(file => {
  const content = fs.readFileSync(file, 'utf8');
  return evaluateHtmlContent(content, path.relative(process.cwd(), file));
});

if (jsonMode) {
  console.log(JSON.stringify({ results }, null, 2));
} else {
  console.log('\n================================================================================');
  console.log('🧪 INTERACTIVE-HTML ACCEPTANCE VERIFIER & CRAFT RUBRIC REPORT');
  console.log('================================================================================');
  results.forEach(r => {
    const badge = r.accepted ? '✅ PASS' : '❌ FAIL';
    console.log(`\n${badge}  ${r.file} — Score: ${r.totalScore}/100 (Min: ${r.minRequired}) · Archetype: [${r.detectedArchetype}]`);
    console.log(`   Modalities (${r.modalities.length}): ${r.modalities.join(', ')}`);
    console.log(`   Breakdown: Modality=${r.breakdown.modalityRichness}, Motion/HiDPI=${r.breakdown.motionAndHiDPI}, Causal=${r.breakdown.causalWiringAndLogic}, Aesthetic=${r.breakdown.visualAestheticAndResponsive}, Pedagogy=${r.breakdown.pedagogicalClarity}`);
    if (r.issues.length > 0) {
      r.issues.forEach(iss => console.log(`   🚨 ${iss}`));
    }
    if (!r.accepted && r.suggestions.length > 0) {
      r.suggestions.forEach(sug => console.log(`   💡 Suggestion: ${sug}`));
    }
  });
  console.log('\n================================================================================\n');
}

const anyFailed = results.some(r => !r.accepted);
process.exit(anyFailed ? 1 : 0);

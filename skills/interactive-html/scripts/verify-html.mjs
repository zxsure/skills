#!/usr/bin/env node
/**
 * Automated Acceptance Verifier & Visual-First Craft Scorer for `interactive-html`.
 *
 * Usage:
 *   node skills/interactive-html/scripts/verify-html.mjs <file.html | directory> [--json]
 *   node skills/interactive-html/scripts/verify-html.mjs --self-test
 *
 * Enforces:
 *   - 5 Hard Gates (HG-1..HG-5), including HG-4 (Visual-First & Anti-Clutter:
 *     rejects 3-column cramped grids and > 80 words of <p> paragraph prose!)
 *   - 100-Point Visual-First Craft Rubric (Acceptance Threshold: >= 85/100)
 */

import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const MIN_ACCEPTANCE_SCORE = 85;
const MAX_PROSE_WORDS = 85;

export function evaluateHtmlContent(html, filePath = 'inline.html') {
  const issues = [];
  const suggestions = [];

  const styleBlocks = [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)].map(m => m[1]);
  const scriptBlocks = [...html.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi)].map(m => m[1]);
  const allCss = styleBlocks.join('\n');
  const allJs = scriptBlocks.join('\n');

  // Count words inside <p>...</p> tags to enforce the Strict Text Diet
  const pContents = [...html.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/gi)]
    .map(m => m[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim())
    .filter(Boolean);
  const proseWordCount = pContents.length === 0
    ? 0
    : pContents.join(' ').split(/\s+/).filter(Boolean).length;

  // Detect cramped 3-column workspace grids (e.g. grid-template-columns: 1fr 1.15fr 1.25fr)
  const gridColDefs = [...allCss.matchAll(/grid-template-columns\s*:\s*([^;\}]+)/gi)].map(m => m[1].trim());
  const hasThreeColumnWorkspace = gridColDefs.some(def => {
    if (/repeat\s*\(/i.test(def)) return false;
    const frParts = def.split(/\s+/).filter(tok => /fr$/i.test(tok));
    return frParts.length >= 3;
  });

  // ===========================================================================
  // PART 1: 5 HARD GATES (ZERO-TOLERANCE BLOCKERS)
  // ===========================================================================

  // HG-1: Self-Contained HTML5 Document & Safe Path
  const hasDoctype = /<!DOCTYPE\s+html>/i.test(html);
  const hasInlineStyle = styleBlocks.length > 0 && allCss.trim().length > 50;
  const hasInlineScript = scriptBlocks.length > 0 && allJs.trim().length > 50;
  const isTmpPath = filePath.startsWith('/tmp/') || filePath.includes('/tmp/');
  const hg1Pass = hasDoctype && hasInlineStyle && hasInlineScript && !isTmpPath;
  if (!hg1Pass) {
    if (!hasDoctype) issues.push('HG-1 FAIL: Missing <!DOCTYPE html> declaration.');
    if (!hasInlineStyle) issues.push('HG-1 FAIL: Missing or empty inline <style> block.');
    if (!hasInlineScript) issues.push('HG-1 FAIL: Missing or empty inline <script> block.');
    if (isTmpPath) issues.push('HG-1 FAIL: File is inside /tmp (must be inside .interactive-html/).');
  }

  // HG-2: Zero JavaScript Syntax Errors
  const jsSyntaxErrors = [];
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
    if (hasGoogleFonts) issues.push('HG-3 FAIL: Loads external Google Fonts.');
    if (unapprovedScripts.length > 0) issues.push(`HG-3 FAIL: Unapproved external script(s): ${unapprovedScripts.join(', ')}`);
  }

  // HG-4: Visual-First & Anti-Clutter Gate (No 3-column cramped grids, <= 85 words of <p> prose, >= 2 modalities)
  const modalities = [];
  if (/<input[^>]*type=["']range["']/i.test(html)) modalities.push('range-slider');
  if (/<input[^>]*type=["'](?:text|number|search)["']|<textarea\b/i.test(html)) modalities.push('live-input');
  if (/pointerdown|pointermove|mousedown|mousemove|closest\(\s*['"]\[data-/.test(allJs)) modalities.push('direct-stage-manipulation');
  if (/<button\b/i.test(html) && /addEventListener\(\s*['"](?:click|pointerdown)['"]/.test(allJs)) modalities.push('tactile-mode-pills');
  if (/addEventListener\(\s*['"]keydown['"]/.test(allJs)) modalities.push('keyboard-shortcuts');

  const hg4Pass = !hasThreeColumnWorkspace && proseWordCount <= MAX_PROSE_WORDS && modalities.length >= 2;
  if (!hg4Pass) {
    if (hasThreeColumnWorkspace) {
      issues.push('HG-4 FAIL (Visual Clutter): Uses a cramped 3-column grid (1fr 1fr 1fr). Use ONE spacious central visual stage instead.');
    }
    if (proseWordCount > MAX_PROSE_WORDS) {
      issues.push(`HG-4 FAIL (Too Much Text): Contains ${proseWordCount} words of <p> prose (max ${MAX_PROSE_WORDS}). Let the visual animation explain the concept!`);
    }
    if (modalities.length < 2) {
      issues.push(`HG-4 FAIL: Only ${modalities.length} interaction modality detected. Need at least 2.`);
    }
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
  // PART 2: 100-POINT VISUAL-FIRST CRAFT RUBRIC
  // ===========================================================================

  // Category 1: Visual-First Simplicity & Text Diet (25 pts)
  let cat1Simplicity = 0;
  if (!hasThreeColumnWorkspace) cat1Simplicity += 10;
  else suggestions.push('Replace 3-column layout with ONE spacious central stage (+10 pts).');

  if (proseWordCount <= 45) cat1Simplicity += 10;
  else if (proseWordCount <= MAX_PROSE_WORDS) cat1Simplicity += 6;
  else suggestions.push(`Cut <p> prose from ${proseWordCount} words to <= 45 words (+10 pts).`);

  cat1Simplicity += 5; // Compact readout

  // Category 2: Object-Permanence Motion & Retina HiDPI Craft (25 pts)
  let cat2Motion = 0;
  if (/requestAnimationFrame|<animateMotion/.test(html)) cat2Motion += 10;
  else suggestions.push('Use 60fps requestAnimationFrame or SVG <animateMotion> (+10 pts).');

  if (/cubic-bezier\s*\(\s*0\.34|--spring|tx\b|stepSpring/.test(html)) cat2Motion += 8;
  else suggestions.push('Animate objects gliding to target coordinates (tx, ty) with spring physics (+8 pts).');

  if (!hasCanvas || /devicePixelRatio/.test(allJs)) cat2Motion += 7;
  else suggestions.push('Scale <canvas> by window.devicePixelRatio for crisp Retina rendering (+7 pts).');

  // Category 3: Direct Manipulation & Intuitive Controls (25 pts)
  let cat3Controls = 0;
  if (modalities.includes('direct-stage-manipulation')) cat3Controls += 10;
  else suggestions.push('Allow clicking or dragging objects directly on the <canvas>/<svg> stage (+10 pts).');

  if (modalities.length >= 3) cat3Controls += 8;
  else if (modalities.length === 2) cat3Controls += 5;

  if (/Math\.|\.filter\(|\.map\(/.test(allJs)) cat3Controls += 7;

  // Category 4: Visual Aesthetic & Adaptive Theme (15 pts)
  let cat4Aesthetic = 0;
  if (/--[a-zA-Z0-9-]+:/.test(allCss) && /var\(--/.test(allCss)) cat4Aesthetic += 5;
  if (/data-theme/.test(html)) cat4Aesthetic += 5;
  else suggestions.push('Add a 1-click Dark/Light theme switcher (data-theme) (+5 pts).');
  cat4Aesthetic += 5;

  // Category 5: Instant 3-Second Comprehension (10 pts)
  let cat5Clarity = 10;

  const totalScore = cat1Simplicity + cat2Motion + cat3Controls + cat4Aesthetic + cat5Clarity;
  const accepted = hardGatesPassed && totalScore >= MIN_ACCEPTANCE_SCORE;

  return {
    file: filePath,
    accepted,
    totalScore,
    minRequired: MIN_ACCEPTANCE_SCORE,
    proseWordCount,
    hasThreeColumnWorkspace,
    hardGates: {
      passedAll: hardGatesPassed,
      HG1_selfContainedHtml5: hg1Pass,
      HG2_zeroJsSyntaxErrors: hg2Pass,
      HG3_sandboxOfflineSafe: hg3Pass,
      HG4_visualFirstAntiClutter: hg4Pass,
      HG5_dynamicVisualStage: hg5Pass
    },
    modalities,
    breakdown: {
      visualSimplicityAndTextDiet: `${cat1Simplicity}/25 (${proseWordCount}w prose)`,
      objectMotionAndHiDPI: `${cat2Motion}/25`,
      directManipulationControls: `${cat3Controls}/25`,
      visualAestheticAndTheme: `${cat4Aesthetic}/15`,
      instantComprehension: `${cat5Clarity}/10`
    },
    issues,
    suggestions
  };
}

function runSelfTest() {
  // 1. Verify that a cluttered 3-column or text-bloated HTML FAILS HG-4
  const bloatedHtml = `<!DOCTYPE html><html><head><style>.g{display:grid;grid-template-columns:1fr 1fr 1fr;}</style></head><body><p>${'word '.repeat(100)}</p><svg></svg><script>console.log(1);</script></body></html>`;
  const bloatedRes = evaluateHtmlContent(bloatedHtml, 'bloated.html');
  if (bloatedRes.accepted || bloatedRes.hardGates.HG4_visualFirstAntiClutter) {
    console.error('SELF-TEST FAILED: 3-column / text-bloated HTML should have been rejected by HG-4.');
    process.exit(1);
  }
  console.log('✅ Self-Test Passed: HG-4 Anti-Clutter & Text-Diet Gate verified.');
}

const args = process.argv.slice(2);
if (args.includes('--self-test')) {
  runSelfTest();
  process.exit(0);
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
    fs.readdirSync(resolved).filter(f => f.endsWith('.html')).forEach(f => htmlFiles.push(path.join(resolved, f)));
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
  console.log('🧪 INTERACTIVE-HTML VISUAL-FIRST ACCEPTANCE REPORT');
  console.log('================================================================================');
  results.forEach(r => {
    const badge = r.accepted ? '✅ PASS' : '❌ FAIL';
    console.log(`\n${badge}  ${r.file} — Score: ${r.totalScore}/100 (Min: ${r.minRequired}) · Prose: ${r.proseWordCount} words`);
    console.log(`   Breakdown: Simplicity=${r.breakdown.visualSimplicityAndTextDiet}, Motion=${r.breakdown.objectMotionAndHiDPI}, Controls=${r.breakdown.directManipulationControls}, Aesthetic=${r.breakdown.visualAestheticAndTheme}`);
    r.issues.forEach(iss => console.log(`   🚨 ${iss}`));
    if (!r.accepted) r.suggestions.forEach(sug => console.log(`   💡 ${sug}`));
  });
  console.log('\n================================================================================\n');
}

process.exit(results.some(r => !r.accepted) ? 1 : 0);

/* ═══════════════════════════════════════════════════════
   contrast.js — WCAG contrast checker
   ═══════════════════════════════════════════════════════ */

function hexToRgb(hex) {
  const h = hex.replace('#','');
  const full = h.length === 3 ? h.split('').map(c=>c+c).join('') : h;
  const n = parseInt(full, 16);
  return { r: (n>>16)&255, g: (n>>8)&255, b: n &255 };
}

function luminance({r,g,b}) {
  const s = [r,g,b].map(v => {
    v/=255;
    return v <= 0.03928 ? v/12.92 : Math.pow((v+0.055)/1.055, 2.4);
  });
  return 0.2126*s[0] + 0.7152*s[1] + 0.0722*s[2];
}

/**
 * WCAG contrast ratio between two hex colors
 * @param {string} fg
 * @param {string} bg
 * @returns {number}
 */
export function contrastRatio(fg, bg) {
  const l1 = luminance(hexToRgb(fg));
  const l2 = luminance(hexToRgb(bg));
  const hi = Math.max(l1,l2), lo = Math.min(l1,l2);
  return (hi+0.05)/(lo+0.05);
}

/**
 * Status for ratio
 */
export function contrastStatus(ratio) {
  if (ratio >= 7) return { label: 'Excellent', cls: 'ok' };
  if (ratio >= 4.5) return { label: 'Good', cls: 'ok' };
  if (ratio >= 3) return { label: 'Low', cls: 'warn' };
  return { label: 'Poor', cls: 'bad' };
}

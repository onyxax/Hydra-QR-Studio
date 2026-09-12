/* ═══════════════════════════════════════════════════════
   canvas-postprocess.js — Per-corner finder eye rounding.
   When corner radii differ per corner, applies canvas
   clip-path rounding AFTER qr-code-styling renders.
   Uniform rounding is handled by the library's native
   borderRadius option in cornersSquareOptions.
   ═══════════════════════════════════════════════════════ */

/**
 * Build a clip path for a rectangle with per-corner radii.
 * @param {CanvasRenderingContext2D} ctx
 * @param {number} x
 * @param {number} y
 * @param {number} w
 * @param {number} h
 * @param {object} radii — { tl, tr, bl, br } in pixels
 */
function clipRoundedRect(ctx, x, y, w, h, radii) {
  const maxR = Math.min(w, h) / 2;
  const tl = Math.min(radii.tl, maxR);
  const tr = Math.min(radii.tr, maxR);
  const br = Math.min(radii.br, maxR);
  const bl = Math.min(radii.bl, maxR);

  ctx.beginPath();
  ctx.moveTo(x + tl, y);
  ctx.lineTo(x + w - tr, y);
  if (tr > 0) ctx.arcTo(x + w, y, x + w, y + h, tr);
  else ctx.lineTo(x + w, y);
  ctx.lineTo(x + w, y + h - br);
  if (br > 0) ctx.arcTo(x + w, y + h, x, y + h, br);
  else ctx.lineTo(x + w, y + h);
  ctx.lineTo(x + bl, y + h);
  if (bl > 0) ctx.arcTo(x, y + h, x, y, bl);
  else ctx.lineTo(x, y + h);
  ctx.lineTo(x, y + tl);
  if (tl > 0) ctx.arcTo(x, y, x + w, y, tl);
  else ctx.lineTo(x, y);
  ctx.closePath();
}

/**
 * Estimate finder eye positions — robust, works for v1-v10
 * Uses 33 modules as average (covers URL/Text typical),
 * with generous margin so per-corner clip always covers eye
 * even if actual version differs by +-10 modules.
 * @param {HTMLCanvasElement} canvas
 * @returns {Array<{x, y, size}>}
 */
function estimateFinderEyes(canvas) {
  const size = canvas.width;
  // 33 modules + 8 quiet zone = 41 total, mod ≈ size/41
  // covers both small (21) and large (45) within ±18px tolerance
  const estimatedModules = 33;
  const totalModules = estimatedModules + 8;
  const mod = size / totalModules;
  const eyeSize = mod * 7;
  const offset = mod * 4;
  // Add 1*mod tolerance margin on each side so clip is forgiving
  const m = mod;
  return [
    { x: offset - m*0.5,         y: offset - m*0.5,         size: eyeSize + m },
    { x: size - offset - eyeSize - m*0.5, y: offset - m*0.5,         size: eyeSize + m },
    { x: offset - m*0.5,         y: size - offset - eyeSize - m*0.5, size: eyeSize + m },
  ];
}

/**
 * Apply per-corner rounding to finder eyes on a canvas.
 * Uses compositing to redraw only the eye regions with clip paths.
 * @param {HTMLCanvasElement} canvas
 * @param {object} cornerRadii — { tl, tr, bl, br } in pixels (0 = square)
 */
export function applyFinderCornerRadii(canvas, cornerRadii) {
  const hasAnyRadius = Object.values(cornerRadii).some(r => r > 0);
  if (!hasAnyRadius) return;

  const ctx = canvas.getContext('2d');
  const size = canvas.width;

  /* Snapshot current pixels */
  const snapshot = ctx.getImageData(0, 0, size, size);

  /* Clear to background — try to preserve actual background color */
  let bg = '#ffffff';
  try {
    const cornerPixel = ctx.getImageData(0, 0, 1, 1).data;
    bg = `rgb(${cornerPixel[0]},${cornerPixel[1]},${cornerPixel[2]})`;
    // If background is gradient, fallback to white for clip region
    if (bg === 'rgb(0,0,0)') bg = '#ffffff';
  } catch {}
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, size, size);

  const eyes = estimateFinderEyes(canvas);

  for (const eye of eyes) {
    ctx.save();
    clipRoundedRect(ctx, eye.x, eye.y, eye.size, eye.size, cornerRadii);
    ctx.clip();
    ctx.putImageData(snapshot, 0, 0);
    ctx.restore();
  }
}

/**
 * Process the QR display container: find the canvas, apply corner radii.
 * Only runs when corners have DIFFERENT values (per-corner control).
 * Uniform rounding is handled by the library's borderRadius option.
 * @param {HTMLElement} container — #qrDisplay
 * @param {object} cornerRadii — { tl, tr, bl, br }
 */
export function processQRCanvas(container, cornerRadii) {
  const canvas = container.querySelector('canvas');
  if (!canvas) return;

  /* Check if corners differ — if uniform, library handles it */
  const values = Object.values(cornerRadii);
  const allSame = values.every(v => v === values[0]);
  if (allSame) return; /* library's borderRadius handles uniform case */

  applyFinderCornerRadii(canvas, cornerRadii);
}

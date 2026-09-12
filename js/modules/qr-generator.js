/* ═══════════════════════════════════════════════════════
   qr-generator.js — qr-code-styling wrapper (v2 modern)
   Enterprise Modern — supports dots gradient, eye shapes,
   logo style, hideBackgroundDots, opacity
   ═══════════════════════════════════════════════════════ */

import { processQRCanvas } from './canvas-postprocess.js';

let qrInstance = null;

/**
 * Convert hex to rgba with alpha
 * @param {string} hex
 * @param {number} alpha 0-1
 */
function hexToRgba(hex, alpha = 1) {
  const h = hex.replace('#', '');
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  const num = parseInt(full, 16);
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  if (alpha >= 1) return hex;
  return `rgba(${r},${g},${b},${alpha})`;
}

/**
 * Map eye frame shape to library type
 */
function mapEyeFrameShape(shape, hasRadius) {
  if (shape === 'leaf') return 'extra-rounded';
  if (shape) return shape;
  return hasRadius ? 'extra-rounded' : 'square';
}

/**
 * Render a QR code into the container.
 * First call creates the instance + appends.
 * Subsequent calls update options + clear + re-append.
 * @param {string} data — Encoded data string
 * @param {object} config — full config from state
 * @param {HTMLElement} container — DOM element to render into
 */
export async function renderQR(data, config, container) {
  if (typeof QRCodeStyling === 'undefined') {
    container.innerHTML = '<div class="qr-placeholder"><span style="color:#EF4444;">qr-code-styling failed to load</span></div>';
    return;
  }

  const size = config.size || 512;
  const fgColor = config.fgColor || '#121212';
  const bgColor = config.bgColor || '#ffffff';
  const dotStyle = config.dotStyle || 'square';

  /* ── Image ── */
  let imageData = null;
  let imageMargin = config.qrMargin ?? 2;
  const imageScale = (config.iconSize ?? 25) / 100;
  if (config.logoDataUrl) {
    imageData = config.logoDataUrl;
  } else if (config.iconUrl) {
    imageData = config.iconUrl;
  }

  /* ── Compute corner border radius (normalize 0-50 slider → 0-1) ── */
  const maxSlider = 50;
  const avgRadius = config.cornerRadii
    ? (config.cornerRadii.tl + config.cornerRadii.tr + config.cornerRadii.bl + config.cornerRadii.br) / 4
    : 0;
  const borderRadius = Math.min(avgRadius / maxSlider, 1);

  /* ── Background Options ── */
  const backgroundOptions = { color: bgColor };
  if (config.gradientType && config.gradientType !== 'none') {
    backgroundOptions.gradient = {
      type: config.gradientType,
      rotation: (config.gradientAngle || 0),
      colorStops: [
        { offset: 0, color: config.gradientStart || '#00E5FF' },
        { offset: 1, color: config.gradientEnd || '#AA00FF' },
      ],
    };
  } else {
    backgroundOptions.gradient = null;
  }

  /* ── Finder Eye Colors ── */
  const eyeOuterColor = config.eyeOuterColor || fgColor;
  const eyeInnerColor = config.eyeInnerColor || fgColor;

  /* ── Dots Gradient + Opacity ── */
  const dotsOpacity = (config.dotsOpacity ?? 100) / 100;
  const dotsColor = hexToRgba(fgColor, dotsOpacity);
  const dotsOptions = {
    color: dotsColor,
    type: dotStyle,
  };
  if (config.dotsGradientType && config.dotsGradientType !== 'none') {
    dotsOptions.gradient = {
      type: config.dotsGradientType,
      rotation: config.dotsGradientAngle || 0,
      colorStops: [
        { offset: 0, color: hexToRgba(config.dotsGradientStart || fgColor, dotsOpacity) },
        { offset: 1, color: hexToRgba(config.dotsGradientEnd || '#0891B2', dotsOpacity) },
      ],
    };
  } else {
    dotsOptions.gradient = null;
  }

  /* ── Eye Shapes & Corner Radii (FIXED) ── */
  const eyeFrameShape = config.eyeFrameShape || 'square';
  const eyeBallShape = config.eyeBallShape || 'square';

  const cornerVals = config.cornerRadii ? Object.values(config.cornerRadii) : [0];
  const hasAnyCorner = cornerVals.some((v) => v > 0);
  const hasCornerVariation = hasAnyCorner && !cornerVals.every((v) => v === cornerVals[0]);
  const avgCorner = hasAnyCorner ? cornerVals.reduce((a,b)=>a+b,0)/cornerVals.length : 0;

  // Uniform corner rounding: let library handle it natively
  let squareType, squareRadius;
  if (hasCornerVariation) {
    // Per-corner differing: library square, canvas postprocess will clip
    squareType = 'square';
    squareRadius = 0;
  } else if (hasAnyCorner) {
    // Uniform >0: extra-rounded with averaged radius
    squareType = 'extra-rounded';
    squareRadius = Math.min(avgCorner / 50, 1);
  } else {
    // No corner rounding: use selected eye frame shape
    squareType = mapEyeFrameShape(eyeFrameShape, false);
    squareRadius = 0;
    // If shape itself is rounded, give it a sensible radius
    if (squareType === 'extra-rounded') squareRadius = 0.5;
    if (squareType === 'rounded') squareRadius = 0.3;
  }

  // hideBackgroundDots toggle (professional)
  const hideDots = config.hideBackgroundDots !== undefined ? !!config.hideBackgroundDots : !!imageData;

  /* ── Options ── */
  const options = {
    width: size,
    height: size,
    type: 'canvas',
    data: data,
    image: imageData,
    imageOptions: {
      crossOrigin: 'anonymous',
      margin: imageMargin,
      hideBackgroundDots: hideDots,
      imageSize: imageData ? imageScale : undefined,
    },
    backgroundOptions,
    dotsOptions,
    cornersSquareOptions: {
      type: squareType,
      color: eyeOuterColor,
      borderRadius: squareRadius,
    },
    cornersDotOptions: {
      type: eyeBallShape,
      color: eyeInnerColor,
    },
    qrOptions: {
      errorCorrectionLevel: config.errorCorrection || 'Q',
    },
  };

  /* ── Update existing or create new ── */
  if (qrInstance) {
    qrInstance.update(options);
  } else {
    qrInstance = new QRCodeStyling(options);
  }

  /* Always clear container then append — guaranteed fresh DOM state */
  container.innerHTML = '';
  await qrInstance.append(container);

  /* ── Apply per-corner finder eye rounding ── */
  if (config.cornerRadii) {
    const hasAny = Object.values(config.cornerRadii).some(r => r > 0);
    if (hasAny) {
      requestAnimationFrame(() => {
        processQRCanvas(container, config.cornerRadii);
      });
    }
  }

  /* ── Apply logo shadow/radius via CSS on canvas parent (visual only) ── */
  const canvasEl = container.querySelector('canvas');
  if (canvasEl) {
    // logo shadow is handled by container filter for preview, not baked into canvas export
    // we keep export clean; preview shadow is CSS elsewhere
    if (config.logoShadow && imageData) {
      canvasEl.style.filter = 'drop-shadow(0 2px 8px rgba(0,0,0,0.18))';
    } else {
      canvasEl.style.filter = '';
    }
  }
}

/**
 * Fetch an icon SVG and recolor it to a target hex color.
 * Returns a data URL of the recolored SVG.
 * @param {string} url — icon CDN URL
 * @param {string} targetHex — target color WITHOUT # prefix
 * @returns {Promise<string>} — data:image/svg+xml data URL
 */
export async function fetchAndRecolorIcon(url, targetHex) {
  try {
    const resp = await fetch(url);
    if (!resp.ok) return url;
    const svgText = await resp.text();

    let recolored = svgText;
    recolored = recolored.replace(/fill="[^"]*"/g, `fill="#${targetHex}"`);
    recolored = recolored.replace(/stroke="[^"]*"/g, `stroke="#${targetHex}"`);
    recolored = recolored.replace(/currentColor/g, `#${targetHex}`);
    if (!recolored.includes(`#${targetHex}`)) {
      recolored = recolored.replace(/<svg/, `<svg fill="#${targetHex}"`);
    }

    return `data:image/svg+xml,${encodeURIComponent(recolored)}`;
  } catch {
    return url;
  }
}

/**
 * Download QR as PNG via getRawData (blob).
 */
export async function downloadPNG() {
  if (!qrInstance) return;
  const blob = await qrInstance.getRawData('blob');
  triggerDownload(blob, 'qr-code.png');
}

/**
 * Download QR as SVG via getRawData (blob).
 */
export async function downloadSVG() {
  if (!qrInstance) return;
  const blob = await qrInstance.getRawData('svg');
  triggerDownload(blob, 'qr-code.svg');
}

/**
 * Helper: get displayed canvas (with post-process)
 */
function getCanvas() {
  return document.querySelector('#qrDisplay canvas');
}

/**
 * Download QR as JPG (canvas → jpeg)
 */
export async function downloadJPG() {
  const canvas = getCanvas();
  if (!canvas) {
    // fallback to PNG
    return downloadPNG();
  }
  canvas.toBlob((blob) => {
    if (blob) triggerDownload(blob, 'qr-code.jpg');
  }, 'image/jpeg', 0.92);
}

/**
 * Download QR as WEBP
 */
export async function downloadWEBP() {
  const canvas = getCanvas();
  if (!canvas) return downloadPNG();
  // check support
  if (!canvas.toBlob) return downloadPNG();
  canvas.toBlob((blob) => {
    if (blob) triggerDownload(blob, 'qr-code.webp');
    else {
      // fallback
      downloadPNG();
    }
  }, 'image/webp', 0.92);
}

/**
 * Download QR as PDF (print dialog)
 * Creates a new window with the QR centered, then prints
 */
export async function downloadPDF() {
  const canvas = getCanvas();
  let dataUrl = null;
  if (canvas) {
    dataUrl = canvas.toDataURL('image/png');
  } else if (qrInstance) {
    const blob = await qrInstance.getRawData('blob');
    dataUrl = URL.createObjectURL(blob);
  } else {
    return;
  }
  const win = window.open('', '_blank');
  if (!win) return;
  win.document.write(`
    <html><head><title>QR Code - PDF</title><style>
      body { margin:0; display:flex; align-items:center; justify-content:center; height:100vh; background:#fff; }
      img { max-width:90vw; max-height:90vh; width:512px; height:512px; object-fit:contain; }
      @media print { body { height:auto; } }
    </style></head><body><img src="${dataUrl}" onload="window.print(); window.onafterprint=()=>window.close();"></body></html>
  `);
  win.document.close();
}

/**
 * Copy QR PNG to clipboard
 * Uses ClipboardItem if available, fallback to prompt
 */
export async function copyToClipboard() {
  const canvas = getCanvas();
  if (!canvas) return false;
  try {
    const blob = await new Promise((res) => canvas.toBlob(res, 'image/png'));
    if (!blob) return false;
    if (navigator.clipboard && window.ClipboardItem) {
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
      return true;
    } else if (navigator.clipboard && navigator.clipboard.writeText) {
      // fallback: copy data URL as text (not ideal)
      const dataUrl = canvas.toDataURL('image/png');
      await navigator.clipboard.writeText(dataUrl);
      return true;
    }
  } catch (e) {
    console.error('copy failed', e);
    return false;
  }
  return false;
}

/**
 * Trigger a file download from a Blob.
 */
function triggerDownload(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 200);
}

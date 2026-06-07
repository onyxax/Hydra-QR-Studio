/* ═══════════════════════════════════════════════════════
   qr-generator.js — qr-code-styling wrapper.
   Uses append() for live preview, update() for changes.
   Supports icon color filter, per-corner finder eye rounding,
   gradient backgrounds, eye colors, and smart contrast.
   ═══════════════════════════════════════════════════════ */

import { processQRCanvas } from './canvas-postprocess.js';

let qrInstance = null;

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
      hideBackgroundDots: !!imageData,
      imageSize: imageData ? imageScale : undefined,
    },
    backgroundOptions,
    dotsOptions: {
      color: fgColor,
      type: dotStyle,
    },
    cornersSquareOptions: {
      type: borderRadius > 0 ? 'extra-rounded' : 'square',
      color: eyeOuterColor,
      borderRadius: borderRadius,
    },
    cornersDotOptions: {
      type: 'square',
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

  /* ── Apply icon color filter to center image ── */
  if (config.iconFilter) {
    applyIconFilter(container, config.iconFilter);
  }

  /* ── Apply per-corner finder eye rounding ── */
  if (config.cornerRadii) {
    const hasAny = Object.values(config.cornerRadii).some(r => r > 0);
    if (hasAny) {
      requestAnimationFrame(() => {
        processQRCanvas(container, config.cornerRadii);
      });
    }
  }
}

/**
 * Apply CSS filter to the center icon/image inside the QR canvas.
 * Since qr-code-styling composites the image onto the canvas,
 * we cannot filter it post-render. Instead, we fetch the icon SVG,
 * recolor it inline, and create a new data URL.
 * @param {HTMLElement} container
 * @param {string} filterCSS — CSS filter string
 */
function applyIconFilter(container, filterCSS) {
  /* No-op for canvas — actual filter applied via fetchAndRecolorIcon(). */
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

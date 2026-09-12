/* ═══════════════════════════════════════════════════════
   constants.js — Centralized app constants
   Single source of truth for defaults, limits, keys
   ═══════════════════════════════════════════════════════ */

export const STORAGE_KEYS = {
  THEME: 'hydra-theme',
  PRESETS: 'hydra-qr-presets',
  LEGACY_THEME: 'qr-forge-theme',
};

export const TABS = ['general', 'visuals', 'branding', 'colors'];

export const DEFAULT_STATE = {
  dataType: 'url',
  size: 512,
  fgColor: '#121212',
  bgColor: '#ffffff',
  dotStyle: 'square',
  iconSlug: null,
  iconType: null,
  iconFillColor: null,
  logoDataUrl: null,
  activeCategory: 'brand',
  cornerRadii: { tl: 0, tr: 0, bl: 0, br: 0 },
  errorCorrection: 'Q',
  qrMargin: 4,
  iconSize: 25,
  eyeOuterColor: '#121212',
  eyeInnerColor: '#121212',
  logoPadding: 4,
  logoBgColor: '#ffffff',
  gradientType: 'none',
  gradientStart: '#00E5FF',
  gradientEnd: '#AA00FF',
  gradientAngle: 0,
  // ── New: Dots gradient (foreground) ──
  dotsGradientType: 'none',
  dotsGradientStart: '#121212',
  dotsGradientEnd: '#0891B2',
  dotsGradientAngle: 0,
  dotsOpacity: 100,
  // ── New: Eye shapes ──
  eyeFrameShape: 'square', // square | extra-rounded | rounded | leaf
  eyeBallShape: 'square',  // square | dots | rounded
  // ── New: Logo style ──
  logoRadius: 8,
  logoShadow: false,
  hideBackgroundDots: true,
  // ── New: Frame ──
  frameEnabled: false,
  frameText: 'SCAN ME',
  frameColor: '#121212',
  frameBgColor: '#ffffff',
};

export const LIMITS = {
  SIZE: { min: 256, max: 1024, step: 16, default: 512 },
  MARGIN: { min: 0, max: 40, step: 1, default: 4 },
  ICON_SIZE: { min: 5, max: 50, step: 1, default: 25 },
  CORNER: { min: 0, max: 50, step: 1, default: 0 },
  GRAD_ANGLE: { min: 0, max: 360, step: 1, default: 0 },
  LOGO_PADDING: { min: 0, max: 12, step: 1, default: 4 },
  LOGO_RADIUS: { min: 0, max: 24, step: 1, default: 8 },
  PREVIEW_SCALE: { min: 25, max: 60, step: 1, default: 40 },
  DOTS_OPACITY: { min: 60, max: 100, step: 1, default: 100 },
};

export const DOT_STYLES = ['square', 'extra-rounded', 'rounded', 'dots', 'classy', 'classy-rounded'];
export const EYE_FRAME_SHAPES = [
  { value: 'square', label: 'Square' },
  { value: 'extra-rounded', label: 'Extra Rounded' },
  { value: 'rounded', label: 'Rounded' },
  { value: 'leaf', label: 'Leaf' },
];
export const EYE_BALL_SHAPES = [
  { value: 'square', label: 'Square' },
  { value: 'rounded', label: 'Rounded' },
  { value: 'dots', label: 'Dot' },
  { value: 'extra-rounded', label: 'Extra Rounded' },
];
export const ERROR_LEVELS = ['L', 'M', 'Q', 'H'];
export const GRADIENT_TYPES = ['none', 'linear', 'radial'];

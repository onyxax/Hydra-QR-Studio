/* ═══════════════════════════════════════════════════════
   main.js — QR Forge Application Entry Point
   Enterprise Minimalist · v4.0.0 — Triple-Column Studio
   Sidebar nav + Settings panel + Live preview
   ═══════════════════════════════════════════════════════ */

import { ICON_CATEGORIES, ICON_MAP, iconURL } from './modules/icon-data.js';
import { DATA_TYPES } from './modules/qr-config.js';
import { buildInputForm, showToast } from './modules/ui-handlers.js';
import { renderQR, downloadPNG, downloadSVG, fetchAndRecolorIcon } from './modules/qr-generator.js';
import { initUpload } from './modules/upload-handler.js';
import { initTheme, toggleTheme } from './modules/theme.js';

/* ── DOM ── */
const $ = (s) => document.querySelector(s);
const typeGrid        = $('#typeGrid');
const qrSizeRange     = $('#qrSize');
const sizeValue       = $('#sizeValue');
const fgColor         = $('#fgColor');
const bgColor         = $('#bgColor');
const dotStyleChips   = $('#dotStyleChips');
const downloadPNGBtn  = $('#downloadPNG');
const downloadSVGBtn  = $('#downloadSVG');
const formContainer   = $('#inputSection');
const qrDisplay       = $('#qrDisplay');
const iconGrid        = $('#iconGrid');
const iconSearch      = $('#iconSearch');
const clearIconBtn    = $('#clearIcon');
const iconTabs        = $('#iconTabs');
const themeToggle     = $('#themeToggle');

/* ── Pro Controls DOM ── */
const iconFillColor   = $('#iconFillColor');
const iconColorReset  = $('#iconColorReset');
const cornerTL        = $('#cornerTL');
const cornerTR        = $('#cornerTR');
const cornerBL        = $('#cornerBL');
const cornerBR        = $('#cornerBR');
const cornerTLVal     = $('#cornerTLVal');
const cornerTRVal     = $('#cornerTRVal');
const cornerBLVal     = $('#cornerBLVal');
const cornerBRVal     = $('#cornerBRVal');
const resetCorners    = $('#resetCorners');

/* ── Advanced Controls DOM ── */
const errorCorrectionChips = $('#errorCorrectionChips');
const qrMarginRange        = $('#qrMargin');
const qrMarginValue        = $('#qrMarginValue');
const eyeOuterColor        = $('#eyeOuterColor');
const eyeInnerColor        = $('#eyeInnerColor');
const logoPaddingRange     = $('#logoPadding');
const logoPaddingValue     = $('#logoPaddingValue');
const logoBgColor          = $('#logoBgColor');
const gradientTypeChips    = $('#gradientTypeChips');
const gradientOptions      = $('#gradientOptions');
const gradStart            = $('#gradStart');
const gradEnd              = $('#gradEnd');
const gradAngle            = $('#gradAngle');
const gradAngleValue       = $('#gradAngleValue');
const iconSizeRange        = $('#iconSizeRange');
const iconSizeValue        = $('#iconSizeValue');

/* ── Preview Scale ── */
const previewScale    = $('#previewScale');
const previewScaleVal = $('#previewScaleValue');

/* ── Sidebar Nav ── */
const sidebarNav      = $('#sidebarNav');
const tabContents     = document.querySelectorAll('.tab-content');
const sidebarBtns     = sidebarNav ? sidebarNav.querySelectorAll('.sidebar-btn') : [];

/* ── Theme Options (Colors tab) ── */
const themeOptions    = document.querySelectorAll('.theme-option');

/* ── Fallback SVG (generic QR icon) ── */
const FALLBACK_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="3" height="3"/><line x1="21" y1="14" x2="21" y2="14.01"/><line x1="14" y1="21" x2="14" y2="21.01"/><line x1="21" y1="21" x2="21" y2="21.01"/></svg>`;

/* ── State ── */
let state = {
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
  /* Advanced settings */
  errorCorrection: 'Q',
  qrMargin: 2,
  iconSize: 25,
  eyeOuterColor: '#121212',
  eyeInnerColor: '#121212',
  logoPadding: 4,
  logoBgColor: '#ffffff',
  gradientType: 'none',
  gradientStart: '#00E5FF',
  gradientEnd: '#AA00FF',
  gradientAngle: 0,
};

let currentForm = null;

/* ═══ SIDEBAR TAB SWITCHING ═══ */
function switchStudioTab(tabName) {
  sidebarBtns.forEach(b => b.classList.toggle('active', b.dataset.tab === tabName));
  tabContents.forEach(tc => tc.classList.toggle('active', tc.dataset.tab === tabName));
}

sidebarNav.addEventListener('click', (e) => {
  const btn = e.target.closest('.sidebar-btn');
  if (btn && btn.dataset.tab) switchStudioTab(btn.dataset.tab);
});

/* ═══ THEME OPTIONS (Colors Tab) ═══ */
function syncThemeUI() {
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  themeOptions.forEach(opt => opt.classList.toggle('active', opt.dataset.themeVal === current));
}

themeOptions.forEach(opt => {
  opt.addEventListener('click', () => {
    const val = opt.dataset.themeVal;
    document.documentElement.setAttribute('data-theme', val);
    localStorage.setItem('qr-forge-theme', val);
    syncThemeUI();
  });
});

/* Keep header toggle in sync */
const origToggle = toggleTheme;
const wrappedToggleTheme = () => {
  origToggle();
  syncThemeUI();
};

/* ── QR encoding helper ── */
function encodeQRData() {
  if (!currentForm) return '';
  const typeDef = DATA_TYPES[state.dataType];
  if (!typeDef || !typeDef.encode) return '';
  return typeDef.encode(currentForm.getValues());
}

/* ── Type Buttons ── */
function switchType(type) {
  state.dataType = type;
  typeGrid.querySelectorAll('.type-btn').forEach(btn =>
    btn.classList.toggle('active', btn.dataset.type === type)
  );
  const typeDef = DATA_TYPES[type];
  if (typeDef) {
    currentForm = buildInputForm(type, formContainer, () => updateQR());
  } else {
    currentForm = null;
    formContainer.innerHTML = '';
  }
  updateQR();
}

typeGrid.addEventListener('click', (e) => {
  const btn = e.target.closest('.type-btn');
  if (btn && btn.dataset.type) switchType(btn.dataset.type);
});

/* ── Dot Style Chips ── */
dotStyleChips.addEventListener('click', (e) => {
  const chip = e.target.closest('.chip');
  if (!chip || !chip.dataset.value) return;
  state.dotStyle = chip.dataset.value;
  dotStyleChips.querySelectorAll('.chip').forEach(c =>
    c.classList.toggle('active', c.dataset.value === state.dotStyle)
  );
  updateQR();
});

/* ── Icon Picker ── */
function renderIconGrid(category, search = '') {
  const data = ICON_CATEGORIES[category];
  if (!data) return;

  iconGrid.innerHTML = '';
  const lower = search.toLowerCase();

  for (const icon of data.icons) {
    if (lower && !icon.label.toLowerCase().includes(lower) && !icon.slug.toLowerCase().includes(lower)) continue;

    const isSystem = icon.type === 'system';

    const cell = document.createElement('button');
    cell.className = 'icon-cell' + (isSystem ? ' icon-system' : '') + (state.iconSlug === icon.slug ? ' active' : '');
    cell.type = 'button';
    cell.dataset.slug = icon.slug;
    cell.dataset.iconType = icon.type;
    cell.title = icon.label;

    const img = document.createElement('img');
    img.src = iconURL(icon);
    img.alt = icon.label;
    img.loading = 'lazy';

    const fallback = document.createElement('span');
    fallback.className = 'icon-fallback';
    fallback.innerHTML = FALLBACK_SVG;

    /* Error handler: HIDE broken icon completely */
    img.addEventListener('error', () => {
      cell.style.display = 'none';
    }, { once: true });

    const label = document.createElement('span');
    label.className = 'icon-label';
    label.textContent = icon.label;

    cell.appendChild(img);
    cell.appendChild(fallback);
    cell.appendChild(label);
    iconGrid.appendChild(cell);
  }
}

function switchTab(cat) {
  state.activeCategory = cat;
  iconTabs.querySelectorAll('.icon-tab').forEach(t =>
    t.classList.toggle('active', t.dataset.tab === cat)
  );
  renderIconGrid(cat, iconSearch.value);
}

iconTabs.addEventListener('click', (e) => {
  const tab = e.target.closest('.icon-tab');
  if (tab) switchTab(tab.dataset.tab);
});

iconGrid.addEventListener('click', (e) => {
  const cell = e.target.closest('.icon-cell');
  if (!cell) return;

  const slug = cell.dataset.slug;
  const iconType = cell.dataset.iconType;

  if (state.iconSlug === slug) {
    state.iconSlug = null;
    state.iconType = null;
    iconGrid.querySelectorAll('.icon-cell').forEach(c => c.classList.remove('active'));
  } else {
    state.iconSlug = slug;
    state.iconType = iconType;
    iconGrid.querySelectorAll('.icon-cell').forEach(c =>
      c.classList.toggle('active', c.dataset.slug === slug)
    );
  }
  updateQR();
});

clearIconBtn.addEventListener('click', () => {
  state.iconSlug = null;
  state.iconType = null;
  state.logoDataUrl = null;
  iconGrid.querySelectorAll('.icon-cell').forEach(c => c.classList.remove('active'));
  updateQR();
});

iconSearch.addEventListener('input', () => {
  renderIconGrid(state.activeCategory, iconSearch.value);
});

/* ── Icon Fill Color ── */
iconFillColor.addEventListener('input', () => {
  state.iconFillColor = iconFillColor.value.replace('#', '');
  updateQR();
});

iconColorReset.addEventListener('click', () => {
  state.iconFillColor = null;
  iconFillColor.value = '#000000';
  updateQR();
});

/* ── Corner Radii ── */
function syncCornerState() {
  state.cornerRadii = {
    tl: parseInt(cornerTL.value, 10),
    tr: parseInt(cornerTR.value, 10),
    bl: parseInt(cornerBL.value, 10),
    br: parseInt(cornerBR.value, 10),
  };
  cornerTLVal.textContent = cornerTL.value;
  cornerTRVal.textContent = cornerTR.value;
  cornerBLVal.textContent = cornerBL.value;
  cornerBRVal.textContent = cornerBR.value;
  updateQR();
}

cornerTL.addEventListener('input', syncCornerState);
cornerTR.addEventListener('input', syncCornerState);
cornerBL.addEventListener('input', syncCornerState);
cornerBR.addEventListener('input', syncCornerState);

resetCorners.addEventListener('click', () => {
  cornerTL.value = 0; cornerTR.value = 0;
  cornerBL.value = 0; cornerBR.value = 0;
  syncCornerState();
});

/* ── Error Correction Chips ── */
errorCorrectionChips.addEventListener('click', (e) => {
  const chip = e.target.closest('.chip');
  if (!chip || !chip.dataset.value) return;
  state.errorCorrection = chip.dataset.value;
  errorCorrectionChips.querySelectorAll('.chip').forEach(c =>
    c.classList.toggle('active', c.dataset.value === state.errorCorrection)
  );
  updateQR();
});

/* ── Margin Slider ── */
qrMarginRange.addEventListener('input', () => {
  state.qrMargin = parseInt(qrMarginRange.value, 10);
  qrMarginValue.textContent = state.qrMargin;
  updateQR();
});

/* ── Finder Eye Colors ── */
eyeOuterColor.addEventListener('input', () => {
  state.eyeOuterColor = eyeOuterColor.value;
  updateQR();
});

eyeInnerColor.addEventListener('input', () => {
  state.eyeInnerColor = eyeInnerColor.value;
  updateQR();
});

/* ── Logo Padding ── */
logoPaddingRange.addEventListener('input', () => {
  state.logoPadding = parseInt(logoPaddingRange.value, 10);
  logoPaddingValue.textContent = state.logoPadding;
  updateQR();
});

/* ── Logo Background Color ── */
logoBgColor.addEventListener('input', () => {
  state.logoBgColor = logoBgColor.value;
  updateQR();
});

/* ── Gradient Type Chips ── */
gradientTypeChips.addEventListener('click', (e) => {
  const chip = e.target.closest('.chip');
  if (!chip || !chip.dataset.value) return;
  state.gradientType = chip.dataset.value;
  gradientTypeChips.querySelectorAll('.chip').forEach(c =>
    c.classList.toggle('active', c.dataset.value === state.gradientType)
  );
  gradientOptions.style.display = state.gradientType === 'none' ? 'none' : 'block';
  updateQR();
});

/* ── Gradient Controls ── */
gradStart.addEventListener('input', () => {
  state.gradientStart = gradStart.value;
  updateQR();
});

gradEnd.addEventListener('input', () => {
  state.gradientEnd = gradEnd.value;
  updateQR();
});

gradAngle.addEventListener('input', () => {
  state.gradientAngle = parseInt(gradAngle.value, 10);
  gradAngleValue.textContent = state.gradientAngle + '°';
  updateQR();
});

/* ── Icon Size Slider ── */
iconSizeRange.addEventListener('input', () => {
  state.iconSize = parseInt(iconSizeRange.value, 10);
  iconSizeValue.textContent = state.iconSize + '%';
  updateQR();
});

/* ═══ SMART CONTRAST ENGINE ═══ */
function initSmartContrast() {
  const root = document.documentElement;
  const qrContainer = qrDisplay;

  function applyContrastFilter() {
    const theme = root.getAttribute('data-theme') || 'light';
    if (theme === 'dark') {
      qrContainer.classList.add('smart-contrast-dark');
    } else {
      qrContainer.classList.remove('smart-contrast-dark');
    }
  }

  const observer = new MutationObserver((mutations) => {
    for (const m of mutations) {
      if (m.type === 'attributes' && m.attributeName === 'data-theme') {
        applyContrastFilter();
      }
    }
  });
  observer.observe(root, { attributes: true, attributeFilter: ['data-theme'] });
  applyContrastFilter();
}

/* ── QR Generation ── */
async function buildIconUrl() {
  if (!state.iconSlug) return null;
  const icon = ICON_MAP[state.iconSlug];
  if (!icon) return null;

  const baseUrl = iconURL(icon);

  if (state.iconFillColor) {
    return await fetchAndRecolorIcon(baseUrl, state.iconFillColor);
  }

  return baseUrl;
}

let debounceTimer = null;
async function updateQR() {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(async () => {
    const data = encodeQRData() || 'https://example.com';
    const iconUrl = await buildIconUrl();
    renderQR(data, {
      size: state.size,
      fgColor: state.fgColor,
      bgColor: state.bgColor,
      dotStyle: state.dotStyle,
      iconUrl,
      logoDataUrl: state.logoDataUrl,
      cornerRadii: state.cornerRadii,
      errorCorrection: state.errorCorrection,
      qrMargin: state.qrMargin,
      iconSize: state.iconSize,
      eyeOuterColor: state.eyeOuterColor,
      eyeInnerColor: state.eyeInnerColor,
      logoPadding: state.logoPadding,
      logoBgColor: state.logoBgColor,
      gradientType: state.gradientType,
      gradientStart: state.gradientStart,
      gradientEnd: state.gradientEnd,
      gradientAngle: state.gradientAngle,
    }, qrDisplay);
  }, 180);
}

/* ── Slider + Color Inputs ── */
qrSizeRange.addEventListener('input', () => {
  state.size = parseInt(qrSizeRange.value, 10);
  sizeValue.textContent = state.size + 'px';
  updateQR();
});

fgColor.addEventListener('input', () => {
  state.fgColor = fgColor.value;
  updateQR();
});

bgColor.addEventListener('input', () => {
  state.bgColor = bgColor.value;
  updateQR();
});

downloadPNGBtn.addEventListener('click', downloadPNG);
downloadSVGBtn.addEventListener('click', downloadSVG);
themeToggle.addEventListener('click', () => wrappedToggleTheme());

/* ── Preview Scale Slider ── */
previewScale.addEventListener('input', () => {
  const val = previewScale.value;
  previewScaleVal.textContent = val + '%';
  document.documentElement.style.setProperty('--preview-col', val + '%');
});

/* ── Init ── */
function init() {
  initTheme();
  syncThemeUI();
  initSmartContrast();

  initUpload({
    onLogoLoaded: (dataUrl) => {
      state.logoDataUrl = dataUrl;
      state.iconSlug = null;
      state.iconType = null;
      iconGrid.querySelectorAll('.icon-cell').forEach(c => c.classList.remove('active'));
      updateQR();
    },
    onLogoRemoved: () => {
      state.logoDataUrl = null;
      updateQR();
    },
  });

  const initialType = DATA_TYPES[state.dataType];
  if (initialType) {
    currentForm = buildInputForm(state.dataType, formContainer, () => updateQR());
  }

  renderIconGrid(state.activeCategory);
  updateQR();
}

document.addEventListener('DOMContentLoaded', init);

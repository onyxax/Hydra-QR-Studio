/* ═══════════════════════════════════════════════════════
   main.js — Hydra QR Studio Entry (v2 Modern Modular)
   Vanilla only — state + utils/dom + theme + presets
   ═══════════════════════════════════════════════════════ */

import { ICON_CATEGORIES, ICON_MAP, iconURL } from './modules/icon-data.js';
import { DATA_TYPES } from './modules/qr-config.js';
import { buildInputForm, showToast } from './modules/ui-handlers.js';
import { renderQR, downloadPNG, downloadSVG, downloadJPG, downloadWEBP, downloadPDF, copyToClipboard, fetchAndRecolorIcon } from './modules/qr-generator.js';
import { initUpload } from './modules/upload-handler.js';
import { initTheme, toggleTheme, syncThemeUI, setTheme } from './modules/theme.js';
import { state } from './state.js';
import { DEFAULT_STATE } from './config/constants.js';
import { bindChipGroup, bindRange, bindColor, $ } from './utils/dom.js';
import { debounce } from './utils/debounce.js';
import { contrastRatio, contrastStatus } from './utils/contrast.js';
import { getPreset, saveCustom } from './utils/presets.js';

/* ── DOM ── */
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

const previewScale    = $('#previewScale');
const previewScaleVal = $('#previewScaleValue');

const sidebarNav      = $('#sidebarNav');
const tabContents     = document.querySelectorAll('.tab-content');
const sidebarBtns     = sidebarNav ? sidebarNav.querySelectorAll('.sidebar-btn') : [];
const themeOptions    = document.querySelectorAll('.theme-option');
const hamburger       = $('#hamburger');
const dock            = $('#dock');
const dockBtns        = dock ? dock.querySelectorAll('.dock-btn') : [];
const topbarPNG       = $('#topbarPNG');
const topbarSVG       = $('#topbarSVG');
const topbarJPG       = $('#topbarJPG');
const topbarWEBP      = $('#topbarWEBP');
const topbarPDF       = $('#topbarPDF');
const topbarCopy      = $('#topbarCopy');
const topbarExport    = $('#topbarExport');
const exportWrap      = $('#exportWrap');
const exportMenu      = $('#exportMenu');

/* ── New DOM ── */
const dotsGradientTypeChips = $('#dotsGradientTypeChips');
const dotsGradientOptions   = $('#dotsGradientOptions');
const dotsGradStart         = $('#dotsGradStart');
const dotsGradEnd           = $('#dotsGradEnd');
const dotsGradAngle         = $('#dotsGradAngle');
const dotsGradAngleValue    = $('#dotsGradAngleValue');
const dotsOpacity           = $('#dotsOpacity');
const dotsOpacityValue      = $('#dotsOpacityValue');
const eyeFrameShapeChips    = $('#eyeFrameShapeChips');
const eyeBallShapeChips     = $('#eyeBallShapeChips');
const logoRadius            = $('#logoRadius');
const logoRadiusValue       = $('#logoRadiusValue');
const logoShadow            = $('#logoShadow');
const hideBackgroundDots    = $('#hideBackgroundDots');
const frameEnabled          = $('#frameEnabled');
const frameOptions          = $('#frameOptions');
const frameText             = $('#frameText');
const frameColor            = $('#frameColor');
const frameBgColor          = $('#frameBgColor');
const contrastBadge         = $('#contrastBadge');
const contrastText          = $('#contrastText');
const savePresetBtn         = $('#savePreset');
const resetAllBtn           = $('#resetAll');

const FALLBACK_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="3" height="3"/><line x1="21" y1="14" x2="21" y2="14.01"/><line x1="14" y1="21" x2="14" y2="21.01"/><line x1="21" y1="21" x2="21" y2="21.01"/></svg>`;

let currentForm = null;

/* ═══ TAB SWITCHING (Sidebar legacy + Dock) ═══ */
function switchStudioTab(tabName) {
  sidebarBtns.forEach(b => b.classList.toggle('active', b.dataset.tab === tabName));
  dockBtns.forEach(b => b.classList.toggle('active', b.dataset.tab === tabName));
  tabContents.forEach(tc => tc.classList.toggle('active', tc.dataset.tab === tabName));
}
if (sidebarNav) {
  sidebarNav.addEventListener('click', (e) => {
    const btn = e.target.closest('.sidebar-btn');
    if (btn && btn.dataset.tab) switchStudioTab(btn.dataset.tab);
  });
}
if (dock) {
  dock.addEventListener('click', (e) => {
    const btn = e.target.closest('.dock-btn');
    if (btn && btn.dataset.tab) switchStudioTab(btn.dataset.tab);
  });
}
// Hamburger on mobile toggles dock visibility
hamburger?.addEventListener('click', () => {
  if (dock) dock.style.display = dock.style.display === 'none' ? 'flex' : 'none';
  // fallback: if dock hidden, show as overlay
  if (dock && getComputedStyle(dock).display === 'none') {
    dock.style.display = 'flex';
  }
});

/* ═══ THEME ═══ */
function refreshThemeUI() { syncThemeUI(themeOptions); }
themeOptions.forEach(opt => {
  opt.addEventListener('click', () => {
    setTheme(opt.dataset.themeVal);
    refreshThemeUI();
  });
});
const wrappedToggleTheme = () => { toggleTheme(); refreshThemeUI(); };

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
    currentForm = buildInputForm(type, formContainer, () => debouncedUpdateQR());
  } else {
    currentForm = null;
    formContainer.innerHTML = '';
  }
  debouncedUpdateQR();
  const infoType = document.getElementById('infoType');
  if (infoType) infoType.textContent = typeDef ? typeDef.label : type;
}
typeGrid.addEventListener('click', (e) => {
  const btn = e.target.closest('.type-btn');
  if (btn && btn.dataset.type) switchType(btn.dataset.type);
});

/* ── Icon Picker ── */
function renderIconGrid(category, search = '') {
  const data = ICON_CATEGORIES[category];
  if (!data || !iconGrid) return;
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
    img.addEventListener('error', () => { cell.style.display = 'none'; }, { once: true });
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
iconTabs?.addEventListener('click', (e) => {
  const tab = e.target.closest('.icon-tab');
  if (tab) switchTab(tab.dataset.tab);
});
iconGrid?.addEventListener('click', (e) => {
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
  debouncedUpdateQR();
});
clearIconBtn?.addEventListener('click', () => {
  state.iconSlug = null;
  state.iconType = null;
  state.logoDataUrl = null;
  iconGrid.querySelectorAll('.icon-cell').forEach(c => c.classList.remove('active'));
  debouncedUpdateQR();
});
iconSearch?.addEventListener('input', () => {
  renderIconGrid(state.activeCategory, iconSearch.value);
});

/* ── Icon Fill Color ── */
iconFillColor?.addEventListener('input', () => {
  state.iconFillColor = iconFillColor.value.replace('#', '');
  debouncedUpdateQR();
});
iconColorReset?.addEventListener('click', () => {
  state.iconFillColor = null;
  if (iconFillColor) iconFillColor.value = '#000000';
  debouncedUpdateQR();
});

/* ── Corner Radii ── */
function syncCornerState() {
  state.cornerRadii = {
    tl: parseInt(cornerTL.value, 10),
    tr: parseInt(cornerTR.value, 10),
    bl: parseInt(cornerBL.value, 10),
    br: parseInt(cornerBR.value, 10),
  };
  if (cornerTLVal) cornerTLVal.textContent = cornerTL.value;
  if (cornerTRVal) cornerTRVal.textContent = cornerTR.value;
  if (cornerBLVal) cornerBLVal.textContent = cornerBL.value;
  if (cornerBRVal) cornerBRVal.textContent = cornerBR.value;
  debouncedUpdateQR();
}
cornerTL?.addEventListener('input', syncCornerState);
cornerTR?.addEventListener('input', syncCornerState);
cornerBL?.addEventListener('input', syncCornerState);
cornerBR?.addEventListener('input', syncCornerState);
resetCorners?.addEventListener('click', () => {
  if (cornerTL) cornerTL.value = 0;
  if (cornerTR) cornerTR.value = 0;
  if (cornerBL) cornerBL.value = 0;
  if (cornerBR) cornerBR.value = 0;
  syncCornerState();
});

/* ── Shared chip groups via utils ── */
bindChipGroup(dotStyleChips, (v) => { state.dotStyle = v; debouncedUpdateQR(); });
bindChipGroup(errorCorrectionChips, (v) => { state.errorCorrection = v; debouncedUpdateQR(); });
bindChipGroup(gradientTypeChips, (v) => {
  state.gradientType = v;
  if (gradientOptions) gradientOptions.style.display = v === 'none' ? 'none' : 'block';
  debouncedUpdateQR();
});
bindChipGroup(dotsGradientTypeChips, (v) => {
  state.dotsGradientType = v;
  if (dotsGradientOptions) dotsGradientOptions.style.display = v === 'none' ? 'none' : 'block';
  debouncedUpdateQR();
});
bindChipGroup(eyeFrameShapeChips, (v) => { state.eyeFrameShape = v; debouncedUpdateQR(); });
bindChipGroup(eyeBallShapeChips, (v) => { state.eyeBallShape = v; debouncedUpdateQR(); });

/* ── Ranges via utils ── */
bindRange(qrMarginRange, qrMarginValue, (v) => { state.qrMargin = v; debouncedUpdateQR(); });
bindRange(logoPaddingRange, logoPaddingValue, (v) => { state.logoPadding = v; debouncedUpdateQR(); });
bindRange(iconSizeRange, iconSizeValue, (v) => { state.iconSize = v; debouncedUpdateQR(); }, (v)=> v+'%');
bindRange(gradAngle, gradAngleValue, (v) => { state.gradientAngle = v; debouncedUpdateQR(); }, (v)=> v+'°');
bindRange(dotsGradAngle, dotsGradAngleValue, (v) => { state.dotsGradientAngle = v; debouncedUpdateQR(); }, (v)=> v+'°');
bindRange(dotsOpacity, dotsOpacityValue, (v) => { state.dotsOpacity = v; debouncedUpdateQR(); }, (v)=> v+'%');
bindRange(logoRadius, logoRadiusValue, (v) => { state.logoRadius = v; if (qrDisplay) qrDisplay.style.setProperty('--logo-radius', v+'px'); debouncedUpdateQR(); }, (v)=> v+'px');
bindRange(qrSizeRange, sizeValue, (v) => { state.size = v; const el=document.getElementById('infoSize'); if(el) el.textContent = v+' x '+v; debouncedUpdateQR(); }, (v)=> v+'px');
bindRange(previewScale, previewScaleVal, (v) => { document.documentElement.style.setProperty('--preview-col', v+'%'); }, (v)=> v+'%');

/* ── Colors ── */
bindColor(fgColor, (v) => { state.fgColor = v; updateContrast(); debouncedUpdateQR(); });
bindColor(bgColor, (v) => { state.bgColor = v; updateContrast(); debouncedUpdateQR(); });
bindColor(eyeOuterColor, (v) => { state.eyeOuterColor = v; debouncedUpdateQR(); });
bindColor(eyeInnerColor, (v) => { state.eyeInnerColor = v; debouncedUpdateQR(); });
bindColor(logoBgColor, (v) => { state.logoBgColor = v; debouncedUpdateQR(); });
bindColor(gradStart, (v) => { state.gradientStart = v; debouncedUpdateQR(); });
bindColor(gradEnd, (v) => { state.gradientEnd = v; debouncedUpdateQR(); });
bindColor(dotsGradStart, (v) => { state.dotsGradientStart = v; debouncedUpdateQR(); });
bindColor(dotsGradEnd, (v) => { state.dotsGradientEnd = v; debouncedUpdateQR(); });
bindColor(frameColor, (v) => { state.frameColor = v; updateFrame(); debouncedUpdateQR(); });
bindColor(frameBgColor, (v) => { state.frameBgColor = v; updateFrame(); debouncedUpdateQR(); });

/* ── Switches ── */
logoShadow?.addEventListener('change', () => { state.logoShadow = logoShadow.checked; debouncedUpdateQR(); });
hideBackgroundDots?.addEventListener('change', () => { state.hideBackgroundDots = hideBackgroundDots.checked; debouncedUpdateQR(); });
frameEnabled?.addEventListener('change', () => {
  state.frameEnabled = frameEnabled.checked;
  if (frameOptions) frameOptions.style.display = state.frameEnabled ? 'block' : 'none';
  updateFrame();
  debouncedUpdateQR();
});
frameText?.addEventListener('input', () => { state.frameText = frameText.value; updateFrame(); });

/* ── Contrast badge ── */
function updateContrast() {
  if (!contrastBadge || !contrastText) return;
  try {
    const ratio = contrastRatio(state.fgColor, state.bgColor);
    const st = contrastStatus(ratio);
    contrastBadge.className = 'contrast-badge ' + st.cls;
    contrastBadge.style.display = 'inline-flex';
    contrastText.textContent = `Contrast ${ratio.toFixed(1)}:1 — ${st.label}`;
    if (st.cls === 'bad') contrastText.textContent += ' — Poor scan';
  } catch {}
}

/* ── Frame handling ── */
function updateFrame() {
  if (!qrDisplay) return;
  let frame = document.getElementById('qrFrameCaption');
  const container = qrDisplay.parentElement;
  if (state.frameEnabled) {
    qrDisplay.style.borderRadius = '14px 14px 0 0';
    qrDisplay.style.borderBottom = 'none';
    if (!frame) {
      frame = document.createElement('div');
      frame.id = 'qrFrameCaption';
      frame.className = 'qr-frame-caption';
      container.appendChild(frame);
    }
    frame.textContent = state.frameText || 'SCAN ME';
    frame.style.color = state.frameColor;
    frame.style.background = state.frameBgColor;
    frame.style.borderColor = 'var(--border)';
    frame.style.display = 'block';
  } else {
    qrDisplay.style.borderRadius = '';
    qrDisplay.style.borderBottom = '';
    if (frame) frame.style.display = 'none';
  }
}

/* ── Presets ── */
document.querySelectorAll('.preset-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const name = btn.dataset.preset;
    const preset = getPreset(name);
    if (!preset) return;
    Object.assign(state, preset);
    syncUIFromState();
    debouncedUpdateQR();
    showToast(`Preset "${name}" applied`, 'success');
  });
});
savePresetBtn?.addEventListener('click', () => {
  saveCustom(state);
  showToast('Preset saved', 'success');
});
resetAllBtn?.addEventListener('click', () => {
  const keepType = state.dataType;
  Object.assign(state, structuredClone(DEFAULT_STATE));
  state.dataType = keepType;
  state.cornerRadii = { ...DEFAULT_STATE.cornerRadii };
  syncUIFromState();
  debouncedUpdateQR();
  showToast('Reset to defaults', 'info');
});

function syncUIFromState() {
  // chips
  const setChip = (sel, val) => {
    const el = document.querySelector(sel);
    if (el) el.querySelectorAll('.chip').forEach(c=> c.classList.toggle('active', c.dataset.value===val));
  };
  setChip('#dotStyleChips', state.dotStyle);
  setChip('#errorCorrectionChips', state.errorCorrection);
  setChip('#gradientTypeChips', state.gradientType);
  setChip('#dotsGradientTypeChips', state.dotsGradientType);
  setChip('#eyeFrameShapeChips', state.eyeFrameShape);
  setChip('#eyeBallShapeChips', state.eyeBallShape);
  // ranges
  const setRange = (id, val, fmt) => {
    const el = document.getElementById(id);
    if (el) el.value = val;
    const out = document.getElementById(id+'Value') || document.getElementById(id.replace('Range','Value')) || document.getElementById(id+'Val') ;
  };
  // direct sync for inputs
  if (qrSizeRange) qrSizeRange.value = state.size;
  if (sizeValue) sizeValue.textContent = state.size+'px';
  if (qrMarginRange) qrMarginRange.value = state.qrMargin;
  if (qrMarginValue) qrMarginValue.textContent = state.qrMargin;
  if (iconSizeRange) iconSizeRange.value = state.iconSize;
  if (iconSizeValue) iconSizeValue.textContent = state.iconSize+'%';
  if (gradAngle) gradAngle.value = state.gradientAngle;
  if (gradAngleValue) gradAngleValue.textContent = state.gradientAngle+'°';
  if (dotsGradAngle) dotsGradAngle.value = state.dotsGradientAngle;
  if (dotsGradAngleValue) dotsGradAngleValue.textContent = state.dotsGradientAngle+'°';
  if (dotsOpacity) dotsOpacity.value = state.dotsOpacity;
  if (dotsOpacityValue) dotsOpacityValue.textContent = state.dotsOpacity+'%';
  if (logoRadius) logoRadius.value = state.logoRadius;
  if (logoRadiusValue) logoRadiusValue.textContent = state.logoRadius+'px';
  if (logoPaddingRange) logoPaddingRange.value = state.logoPadding;
  if (logoPaddingValue) logoPaddingValue.textContent = state.logoPadding;
  if (cornerTL) cornerTL.value = state.cornerRadii.tl;
  if (cornerTR) cornerTR.value = state.cornerRadii.tr;
  if (cornerBL) cornerBL.value = state.cornerRadii.bl;
  if (cornerBR) cornerBR.value = state.cornerRadii.br;
  if (cornerTLVal) cornerTLVal.textContent = state.cornerRadii.tl;
  if (cornerTRVal) cornerTRVal.textContent = state.cornerRadii.tr;
  if (cornerBLVal) cornerBLVal.textContent = state.cornerRadii.bl;
  if (cornerBRVal) cornerBRVal.textContent = state.cornerRadii.br;
  // colors
  if (fgColor) fgColor.value = state.fgColor;
  if (bgColor) bgColor.value = state.bgColor;
  if (eyeOuterColor) eyeOuterColor.value = state.eyeOuterColor;
  if (eyeInnerColor) eyeInnerColor.value = state.eyeInnerColor;
  if (logoBgColor) logoBgColor.value = state.logoBgColor;
  if (gradStart) gradStart.value = state.gradientStart;
  if (gradEnd) gradEnd.value = state.gradientEnd;
  if (dotsGradStart) dotsGradStart.value = state.dotsGradientStart;
  if (dotsGradEnd) dotsGradEnd.value = state.dotsGradientEnd;
  if (frameColor) frameColor.value = state.frameColor;
  if (frameBgColor) frameBgColor.value = state.frameBgColor;
  if (frameText) frameText.value = state.frameText;
  // switches
  if (logoShadow) logoShadow.checked = state.logoShadow;
  if (hideBackgroundDots) hideBackgroundDots.checked = state.hideBackgroundDots;
  if (frameEnabled) frameEnabled.checked = state.frameEnabled;
  if (frameOptions) frameOptions.style.display = state.frameEnabled ? 'block' : 'none';
  if (gradientOptions) gradientOptions.style.display = state.gradientType==='none' ? 'none' : 'block';
  if (dotsGradientOptions) dotsGradientOptions.style.display = state.dotsGradientType==='none' ? 'none' : 'block';
  updateContrast();
  updateFrame();
  // type
  typeGrid.querySelectorAll('.type-btn').forEach(b=> b.classList.toggle('active', b.dataset.type===state.dataType));
}

/* ═══ SMART CONTRAST ENGINE ═══ */
function initSmartContrast() {
  const root = document.documentElement;
  const qrContainer = qrDisplay;
  function apply() {
    const theme = root.getAttribute('data-theme') || 'light';
    if (theme === 'dark') qrContainer.classList.add('smart-contrast-dark');
    else qrContainer.classList.remove('smart-contrast-dark');
  }
  const observer = new MutationObserver((mutations) => {
    for (const m of mutations) if (m.type==='attributes' && m.attributeName==='data-theme') apply();
  });
  observer.observe(root, { attributes: true, attributeFilter: ['data-theme'] });
  apply();
}

/* ── QR Generation ── */
async function buildIconUrl() {
  if (!state.iconSlug) return null;
  const icon = ICON_MAP[state.iconSlug];
  if (!icon) return null;
  const baseUrl = iconURL(icon);
  if (state.iconFillColor) return await fetchAndRecolorIcon(baseUrl, state.iconFillColor);
  return baseUrl;
}

const debouncedUpdateQR = debounce(async () => {
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
    dotsGradientType: state.dotsGradientType,
    dotsGradientStart: state.dotsGradientStart,
    dotsGradientEnd: state.dotsGradientEnd,
    dotsGradientAngle: state.dotsGradientAngle,
    dotsOpacity: state.dotsOpacity,
    eyeFrameShape: state.eyeFrameShape,
    eyeBallShape: state.eyeBallShape,
    hideBackgroundDots: state.hideBackgroundDots,
    logoShadow: state.logoShadow,
    logoRadius: state.logoRadius,
  }, qrDisplay);
}, 180);

/* ── Download + Theme toggle ── */
downloadPNGBtn?.addEventListener('click', downloadPNG);
downloadSVGBtn?.addEventListener('click', downloadSVG);
topbarExport?.addEventListener('click', (e) => {
  e.stopPropagation();
  exportWrap?.classList.toggle('open');
});
topbarPNG?.addEventListener('click', (e) => {
  e.stopPropagation();
  exportWrap?.classList.remove('open');
  downloadPNG();
  showToast('PNG downloaded', 'success');
});
topbarSVG?.addEventListener('click', (e) => {
  e.stopPropagation();
  exportWrap?.classList.remove('open');
  downloadSVG();
  showToast('SVG downloaded', 'success');
});
topbarJPG?.addEventListener('click', (e) => {
  e.stopPropagation();
  exportWrap?.classList.remove('open');
  downloadJPG();
  showToast('JPG downloaded', 'success');
});
topbarWEBP?.addEventListener('click', (e) => {
  e.stopPropagation();
  exportWrap?.classList.remove('open');
  downloadWEBP();
  showToast('WEBP downloaded', 'success');
});
topbarPDF?.addEventListener('click', (e) => {
  e.stopPropagation();
  exportWrap?.classList.remove('open');
  downloadPDF();
  showToast('Opening print dialog for PDF…', 'info');
});
topbarCopy?.addEventListener('click', async (e) => {
  e.stopPropagation();
  exportWrap?.classList.remove('open');
  const ok = await copyToClipboard();
  showToast(ok ? 'Copied to clipboard' : 'Copy failed — try HTTPS', ok ? 'success' : 'error');
});
document.addEventListener('click', () => exportWrap?.classList.remove('open'));
exportMenu?.addEventListener('click', (e) => e.stopPropagation());
themeToggle?.addEventListener('click', () => wrappedToggleTheme());

/* ── Init ── */
function init() {
  initTheme();
  refreshThemeUI();
  initSmartContrast();
  updateContrast();

  initUpload({
    onLogoLoaded: (dataUrl) => {
      state.logoDataUrl = dataUrl;
      state.iconSlug = null;
      state.iconType = null;
      iconGrid.querySelectorAll('.icon-cell').forEach(c => c.classList.remove('active'));
      debouncedUpdateQR();
    },
    onLogoRemoved: () => {
      state.logoDataUrl = null;
      debouncedUpdateQR();
    },
  });

  const initialType = DATA_TYPES[state.dataType];
  if (initialType) {
    currentForm = buildInputForm(state.dataType, formContainer, () => debouncedUpdateQR());
  }
  renderIconGrid(state.activeCategory);
  debouncedUpdateQR();
  syncUIFromState();
}

document.addEventListener('DOMContentLoaded', init);

// expose for presets sync
export { syncUIFromState, updateContrast, updateFrame };

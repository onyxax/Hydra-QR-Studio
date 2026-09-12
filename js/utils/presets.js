/* ═══════════════════════════════════════════════════════
   presets.js — Save/load presets to localStorage
   ═══════════════════════════════════════════════════════ */

import { DEFAULT_STATE, STORAGE_KEYS } from '../config/constants.js';

const BUILTIN = {
  classic: {
    fgColor: '#121212', bgColor: '#ffffff', dotStyle: 'square',
    dotsGradientType: 'none', eyeFrameShape: 'square', eyeBallShape: 'square',
    gradientType: 'none',
  },
  ocean: {
    fgColor: '#0C4A6E', bgColor: '#ECFEFF', dotStyle: 'extra-rounded',
    dotsGradientType: 'linear', dotsGradientStart: '#0891B2', dotsGradientEnd: '#0E7490', dotsGradientAngle: 0,
    eyeOuterColor: '#0C4A6E', eyeInnerColor: '#0891B2', eyeFrameShape: 'extra-rounded', eyeBallShape: 'dots',
    gradientType: 'none',
  },
  sunset: {
    fgColor: '#7C2D12', bgColor: '#FFF7ED', dotStyle: 'rounded',
    dotsGradientType: 'linear', dotsGradientStart: '#EA580C', dotsGradientEnd: '#DC2626', dotsGradientAngle: 45,
    eyeOuterColor: '#7C2D12', eyeInnerColor: '#EA580C', eyeFrameShape: 'rounded', eyeBallShape: 'rounded',
    gradientType: 'none',
  },
  midnight: {
    fgColor: '#E0E7FF', bgColor: '#1E1B4B', dotStyle: 'dots',
    dotsGradientType: 'none', dotsOpacity: 100,
    eyeOuterColor: '#A5B4FC', eyeInnerColor: '#6366F1', eyeFrameShape: 'leaf', eyeBallShape: 'extra-rounded',
    gradientType: 'linear', gradientStart: '#1E1B4B', gradientEnd: '#312E81', gradientAngle: 135,
  },
};

export function getPreset(name) {
  return BUILTIN[name] || null;
}

export function saveCustom(state) {
  // save full state snapshot (only visual keys)
  const keys = ['fgColor','bgColor','dotStyle','dotsGradientType','dotsGradientStart','dotsGradientEnd','dotsGradientAngle','dotsOpacity','eyeFrameShape','eyeBallShape','eyeOuterColor','eyeInnerColor','gradientType','gradientStart','gradientEnd','gradientAngle','iconSize','qrMargin','cornerRadii'];
  const obj = {};
  keys.forEach(k => obj[k] = structuredClone(state[k]));
  localStorage.setItem(STORAGE_KEYS.PRESETS + ':custom', JSON.stringify(obj));
}

export function loadCustom() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PRESETS + ':custom');
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

export { BUILTIN };

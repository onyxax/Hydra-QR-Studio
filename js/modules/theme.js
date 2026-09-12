/* ═══════════════════════════════════════════════════════
   theme.js — Dark/Light mode toggle
   ═══════════════════════════════════════════════════════ */

import { STORAGE_KEYS } from '../config/constants.js';

const LEGACY_KEY = STORAGE_KEYS.LEGACY_THEME;
const KEY = STORAGE_KEYS.THEME;

/**
 * Migrate legacy key if present
 */
function getSaved() {
  const v = localStorage.getItem(KEY);
  if (v === 'dark' || v === 'light') return v;
  const legacy = localStorage.getItem(LEGACY_KEY);
  if (legacy === 'dark' || legacy === 'light') {
    localStorage.setItem(KEY, legacy);
    localStorage.removeItem(LEGACY_KEY);
    return legacy;
  }
  return null;
}

/**
 * Initialise theme from localStorage or system preference.
 * @returns {'light'|'dark'}
 */
export function initTheme() {
  const saved = getSaved();
  if (saved) {
    apply(saved);
    return saved;
  }
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = prefersDark ? 'dark' : 'light';
  apply(theme);
  return theme;
}

/**
 * Toggle between light and dark.
 * @returns {'light'|'dark'}
 */
export function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  apply(next);
  return next;
}

/**
 * Set theme explicitly
 * @param {'light'|'dark'} theme
 */
export function setTheme(theme) {
  if (theme !== 'light' && theme !== 'dark') return;
  apply(theme);
}

/**
 * Get current theme
 * @returns {'light'|'dark'}
 */
export function getTheme() {
  return document.documentElement.getAttribute('data-theme') || 'light';
}

/**
 * Sync UI (chips) — single source for theme UI
 * @param {NodeListOf<Element>} themeOptions
 */
export function syncThemeUI(themeOptions) {
  const current = getTheme();
  if (!themeOptions) return;
  themeOptions.forEach((opt) => opt.classList.toggle('active', opt.dataset.themeVal === current));
}

/**
 * Set theme to a specific value.
 * @param {'light'|'dark'} theme
 */
function apply(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem(KEY, theme);
}

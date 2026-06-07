/* ═══════════════════════════════════════════════════════
   theme.js — Dark/Light mode toggle
   ═══════════════════════════════════════════════════════ */

const STORAGE_KEY = 'qr-forge-theme';

/**
 * Initialise theme from localStorage or system preference.
 * @returns {'light'|'dark'}
 */
export function initTheme() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === 'dark' || saved === 'light') {
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
 * Set theme to a specific value.
 * @param {'light'|'dark'} theme
 */
function apply(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem(STORAGE_KEY, theme);
}

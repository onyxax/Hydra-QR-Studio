/* ═══════════════════════════════════════════════════════
   debounce.js — Shared debounce utility
   ═══════════════════════════════════════════════════════ */

/**
 * @param {Function} fn
 * @param {number} delay
 * @returns {(...args: any[]) => void}
 */
export function debounce(fn, delay = 180) {
  let timer = null;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

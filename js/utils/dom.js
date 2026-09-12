/* ═══════════════════════════════════════════════════════
   dom.js — Shared DOM helpers to eliminate duplication
   Replaces 5+ identical handlers in main.js
   ═══════════════════════════════════════════════════════ */

/**
 * Bind a chip group (delegated click) to state
 * @param {HTMLElement} container
 * @param {(value: string) => void} onChange
 */
export function bindChipGroup(container, onChange) {
  if (!container) return;
  container.addEventListener('click', (e) => {
    const chip = e.target.closest('.chip');
    if (!chip || !chip.dataset.value) return;
    const val = chip.dataset.value;
    container.querySelectorAll('.chip').forEach((c) =>
      c.classList.toggle('active', c.dataset.value === val)
    );
    onChange(val);
  });
}

/**
 * Bind range input -> state + display
 * @param {HTMLInputElement} input
 * @param {HTMLElement} output
 * @param {(v: number) => void} onChange
 * @param {(v: number) => string} formatter
 */
export function bindRange(input, output, onChange, formatter = (v) => String(v)) {
  if (!input) return;
  const handler = () => {
    const v = parseInt(input.value, 10);
    if (output) output.textContent = formatter(v);
    onChange(v);
  };
  input.addEventListener('input', handler);
  return handler;
}

/**
 * Bind color input
 * @param {HTMLInputElement} input
 * @param {(v: string) => void} onChange
 */
export function bindColor(input, onChange) {
  if (!input) return;
  input.addEventListener('input', () => onChange(input.value));
}

/**
 * Set active chip by value
 * @param {HTMLElement} container
 * @param {string} value
 */
export function setActiveChip(container, value) {
  if (!container) return;
  container.querySelectorAll('.chip').forEach((c) =>
    c.classList.toggle('active', c.dataset.value === value)
  );
}

/**
 * Tiny $ helper
 * @param {string} s
 * @returns {HTMLElement | null}
 */
export const $ = (s) => document.querySelector(s);
export const $$ = (s) => document.querySelectorAll(s);

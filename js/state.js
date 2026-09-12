/* ═══════════════════════════════════════════════════════
   state.js — Centralized reactive state
   Single source of truth, migrated from main.js inline object
   ═══════════════════════════════════════════════════════ */

import { DEFAULT_STATE } from './config/constants.js';

/** @type {typeof DEFAULT_STATE} */
export const state = { ...DEFAULT_STATE, cornerRadii: { ...DEFAULT_STATE.cornerRadii } };

const listeners = new Set();

/**
 * Patch state and notify listeners
 * @param {Partial<typeof DEFAULT_STATE>} patch
 */
export function updateState(patch) {
  Object.assign(state, patch);
  if (patch.cornerRadii) state.cornerRadii = { ...patch.cornerRadii };
  listeners.forEach((fn) => fn(state, patch));
}

/**
 * Reset to defaults (keeps dataType)
 */
export function resetState() {
  const keepType = state.dataType;
  Object.assign(state, structuredClone(DEFAULT_STATE));
  state.dataType = keepType;
  state.cornerRadii = { ...DEFAULT_STATE.cornerRadii };
  listeners.forEach((fn) => fn(state, { reset: true }));
}

/**
 * Subscribe to state changes
 * @param {(state: typeof DEFAULT_STATE, patch: object) => void} fn
 */
export function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

/* ═══════════════════════════════════════════════════════
   ui-handlers.js — Form building, toast notifications
   ═══════════════════════════════════════════════════════ */

import { DATA_TYPES } from './qr-config.js';

/**
 * Build the dynamic input form for the selected data type.
 * @param {string} type — Key from DATA_TYPES
 * @param {HTMLElement} container — #inputSection
 * @param {Function} onChange — Callback when any field changes
 * @returns {object} — { getValues() }
 */
export function buildInputForm(type, container, onChange) {
  const config = DATA_TYPES[type];
  if (!config) return { getValues: () => ({}) };

  container.innerHTML = '';

  const form = document.createElement('div');

  const fields = config.fields.map(field => {
    const group = document.createElement('div');
    group.className = 'form-group';

    const label = document.createElement('label');
    label.className = 'form-label';
    label.textContent = field.label;
    group.appendChild(label);

    let input;

    if (field.type === 'select') {
      input = document.createElement('select');
      input.className = 'form-select';
      field.options.forEach(opt => {
        const o = document.createElement('option');
        o.value = opt.value;
        o.textContent = opt.label;
        if (opt.value === (field.default || opt.value)) o.selected = true;
        input.appendChild(o);
      });
    } else if (field.type === 'textarea') {
      input = document.createElement('textarea');
      input.className = 'form-textarea';
      input.placeholder = field.placeholder || '';
      input.rows = 3;
    } else {
      input = document.createElement('input');
      input.className = 'form-input';
      input.type = 'text';
      input.placeholder = field.placeholder || '';
    }

    input.dataset.fieldId = field.id;
    if (field.required) input.required = true;
    if (field.defaultValue) input.value = field.defaultValue;

    input.addEventListener('input', () => onChange());

    group.appendChild(input);
    form.appendChild(group);
    return { id: field.id, input };
  });

  container.appendChild(form);

  if (fields.length > 0) {
    setTimeout(() => fields[0].input.focus(), 100);
  }

  return {
    getValues() {
      const values = {};
      fields.forEach(f => { values[f.id] = f.input.value; });
      return values;
    }
  };
}

/**
 * Show a toast notification.
 */
export function showToast(message, type = 'success') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;

  const icons = {
    success: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22C55E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
    error: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#EF4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>',
    info: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>'
  };

  toast.innerHTML = `<span class="toast-icon">${icons[type] || icons.info}</span><span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'toastOut 250ms ease-in forwards';
    setTimeout(() => toast.remove(), 250);
  }, 3000);
}

/* ═══════════════════════════════════════════════════════
   qr-config.js — Data type configurations and encoders
   ═══════════════════════════════════════════════════════ */

export const DATA_TYPES = {
  url: {
    label: 'URL',
    fields: [
      { id: 'url', label: 'Website URL', type: 'text', placeholder: 'https://example.com', required: true, defaultValue: 'https://hydralauncher.gg' }
    ],
    encode: (values) => values.url || ''
  },

  text: {
    label: 'Text',
    fields: [
      { id: 'text', label: 'Content', type: 'textarea', placeholder: 'Enter text...', required: true }
    ],
    encode: (values) => values.text || ''
  },

  email: {
    label: 'Email',
    fields: [
      { id: 'email_to', label: 'To', type: 'text', placeholder: 'recipient@example.com', required: true },
      { id: 'email_subject', label: 'Subject', type: 'text', placeholder: 'Hello' },
      { id: 'email_body', label: 'Body', type: 'textarea', placeholder: 'Message...' }
    ],
    encode: (values) => {
      const params = [];
      if (values.email_subject) params.push(`subject=${encodeURIComponent(values.email_subject)}`);
      if (values.email_body) params.push(`body=${encodeURIComponent(values.email_body)}`);
      const query = params.length ? `?${params.join('&')}` : '';
      return `mailto:${values.email_to || ''}${query}`;
    }
  },

  wifi: {
    label: 'WiFi',
    fields: [
      { id: 'wifi_ssid', label: 'Network Name', type: 'text', placeholder: 'MyNetwork', required: true },
      { id: 'wifi_pass', label: 'Password', type: 'text', placeholder: 'Password' },
      { id: 'wifi_enc', label: 'Security', type: 'select', options: [
        { value: 'WPA', label: 'WPA/WPA2' },
        { value: 'WEP', label: 'WEP' },
        { value: 'nopass', label: 'None' }
      ], default: 'WPA' }
    ],
    encode: (values) => {
      const enc = values.wifi_enc || 'WPA';
      const ssid = values.wifi_ssid || '';
      const pass = values.wifi_pass || '';
      return `WIFI:T:${enc};S:${ssid};P:${pass};;`;
    }
  },

  vcard: {
    label: 'Contact',
    fields: [
      { id: 'vc_name', label: 'Full Name', type: 'text', placeholder: 'John Doe', required: true },
      { id: 'vc_phone', label: 'Phone', type: 'text', placeholder: '+1 555 123 4567' },
      { id: 'vc_email', label: 'Email', type: 'text', placeholder: 'john@example.com' },
      { id: 'vc_org', label: 'Organization', type: 'text', placeholder: 'Acme Inc' }
    ],
    encode: (values) => {
      const name = values.vc_name || 'Unknown';
      const parts = name.split(' ');
      const first = parts[0] || '';
      const last = parts.slice(1).join(' ') || '';
      let vcard = `BEGIN:VCARD\nVERSION:3.0\nN:${last};${first};;;\nFN:${name}`;
      if (values.vc_org) vcard += `\nORG:${values.vc_org}`;
      if (values.vc_phone) vcard += `\nTEL:${values.vc_phone}`;
      if (values.vc_email) vcard += `\nEMAIL:${values.vc_email}`;
      vcard += '\nEND:VCARD';
      return vcard;
    }
  },

  whatsapp: {
    label: 'WhatsApp',
    fields: [
      { id: 'wa_phone', label: 'Phone (with country code)', type: 'text', placeholder: '+15551234567', required: true },
      { id: 'wa_message', label: 'Message', type: 'text', placeholder: 'Hello!' }
    ],
    encode: (values) => {
      const phone = (values.wa_phone || '').replace(/[^0-9]/g, '');
      const msg = values.wa_message ? `?text=${encodeURIComponent(values.wa_message)}` : '';
      return `https://wa.me/${phone}${msg}`;
    }
  },

  instagram: {
    label: 'Instagram',
    fields: [
      { id: 'ig_user', label: 'Username', type: 'text', placeholder: 'username', required: true }
    ],
    encode: (values) => `https://instagram.com/${(values.ig_user || '').replace('@', '')}`
  },

  twitter: {
    label: 'X / Twitter',
    fields: [
      { id: 'tw_user', label: 'Username', type: 'text', placeholder: 'username', required: true }
    ],
    encode: (values) => `https://x.com/${(values.tw_user || '').replace('@', '')}`
  },

  paypal: {
    label: 'PayPal',
    fields: [
      { id: 'pp_email', label: 'PayPal Email', type: 'text', placeholder: 'you@example.com', required: true },
      { id: 'pp_amount', label: 'Amount', type: 'text', placeholder: '10.00' },
      { id: 'pp_currency', label: 'Currency', type: 'select', options: [
        { value: 'USD', label: 'USD' },
        { value: 'EUR', label: 'EUR' },
        { value: 'GBP', label: 'GBP' }
      ], default: 'USD' }
    ],
    encode: (values) => {
      const email = encodeURIComponent(values.pp_email || '');
      const params = [];
      if (values.pp_amount) params.push(`amount=${values.pp_amount}`);
      if (values.pp_currency) params.push(`currency=${values.pp_currency}`);
      const query = params.length ? `?${params.join('&')}` : '';
      return `https://paypal.me/${email}${query}`;
    }
  },

  crypto: {
    label: 'Crypto',
    fields: [
      { id: 'crypto_type', label: 'Coin', type: 'select', options: [
        { value: 'bitcoin', label: 'Bitcoin' },
        { value: 'ethereum', label: 'Ethereum' },
        { value: 'litecoin', label: 'Litecoin' },
        { value: 'solana', label: 'Solana' }
      ], default: 'bitcoin' },
      { id: 'crypto_addr', label: 'Address', type: 'text', placeholder: '0x... or bc1...', required: true },
      { id: 'crypto_amount', label: 'Amount', type: 'text', placeholder: '0.001' }
    ],
    encode: (values) => {
      const type = values.crypto_type || 'bitcoin';
      const addr = values.crypto_addr || '';
      const amount = values.crypto_amount || '';
      const amtParam = amount ? `?amount=${amount}` : '';
      return `${type}:${addr}${amtParam}`;
    }
  }
};

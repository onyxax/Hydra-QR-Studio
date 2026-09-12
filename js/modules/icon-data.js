/* ═══════════════════════════════════════════════════════
   icon-data.js — Dual-source icon library.
   Brand icons → SimpleIcons CDN (official hex colors).
   System icons → Lucide Icons CDN (theme-adaptive monochrome).
   ═══════════════════════════════════════════════════════ */

/**
 * Two categories: 'brand' and 'system'.
 * Brand: { slug, label, color, type:'brand' }  — SimpleIcons
 * System: { slug, label, lucide, type:'system' } — Lucide Icons
 */
export const ICON_CATEGORIES = {
  brand: {
    label: 'Brand Icons',
    icons: [
      /* ── Messaging ── */
      { slug: 'whatsapp',         label: 'WhatsApp',       color: '25D366', type: 'brand' },
      { slug: 'telegram',         label: 'Telegram',       color: '26A5E4', type: 'brand' },
      { slug: 'discord',          label: 'Discord',        color: '5865F2', type: 'brand' },
      { slug: 'signal',           label: 'Signal',         color: '3A76F0', type: 'brand' },
      { slug: 'slack',            label: 'Slack',          color: '4A154B', type: 'brand' },
      { slug: 'microsoftteams',   label: 'MS Teams',       color: '6264A7', type: 'brand' },
      { slug: 'skype',            label: 'Skype',          color: '00AFF0', type: 'brand' },
      { slug: 'viber',            label: 'Viber',          color: '7360F2', type: 'brand' },
      { slug: 'line',             label: 'LINE',           color: '00C300', type: 'brand' },

      /* ── Social ── */
      { slug: 'instagram',        label: 'Instagram',      color: 'E4405F', type: 'brand' },
      { slug: 'x',                label: 'X',              color: '000000', type: 'brand' },
      { slug: 'facebook',         label: 'Facebook',       color: '1877F2', type: 'brand' },
      { slug: 'linkedin',         label: 'LinkedIn',       color: '0A66C2', type: 'brand' },
      { slug: 'snapchat',         label: 'Snapchat',       color: 'FFFC00', type: 'brand' },
      { slug: 'tiktok',           label: 'TikTok',         color: '000000', type: 'brand' },
      { slug: 'reddit',           label: 'Reddit',         color: 'FF4500', type: 'brand' },
      { slug: 'pinterest',        label: 'Pinterest',      color: 'BD081C', type: 'brand' },
      { slug: 'youtube',          label: 'YouTube',        color: 'FF0000', type: 'brand' },
      { slug: 'twitch',           label: 'Twitch',         color: '9146FF', type: 'brand' },
      { slug: 'threads',          label: 'Threads',        color: '000000', type: 'brand' },
      { slug: 'mastodon',         label: 'Mastodon',       color: '6364FF', type: 'brand' },

      /* ── Tech & Platforms ── */
      { slug: 'google',           label: 'Google',         color: '4285F4', type: 'brand' },
      { slug: 'apple',            label: 'Apple',          color: '000000', type: 'brand' },
      { slug: 'microsoft',        label: 'Microsoft',      color: '5E5E5E', type: 'brand' },
      { slug: 'github',           label: 'GitHub',         color: '181717', type: 'brand' },
      { slug: 'gitlab',           label: 'GitLab',         color: 'FC6D26', type: 'brand' },
      { slug: 'docker',           label: 'Docker',         color: '2496ED', type: 'brand' },
      { slug: 'figma',            label: 'Figma',          color: 'F24E1E', type: 'brand' },
      { slug: 'npm',              label: 'npm',            color: 'CB3837', type: 'brand' },
      { slug: 'notion',           label: 'Notion',         color: '000000', type: 'brand' },
      { slug: 'spotify',          label: 'Spotify',        color: '1DB954', type: 'brand' },
      { slug: 'steam',            label: 'Steam',          color: '1B2838', type: 'brand' },
      { slug: 'uber',             label: 'Uber',           color: '000000', type: 'brand' },
      { slug: 'airbnb',           label: 'Airbnb',         color: 'FF5A5F', type: 'brand' },

      /* ── Crypto ── */
      { slug: 'bitcoin',          label: 'Bitcoin',        color: 'F7931A', type: 'brand' },
      { slug: 'ethereum',         label: 'Ethereum',       color: '627EEA', type: 'brand' },
      { slug: 'tether',           label: 'Tether',         color: '26A17B', type: 'brand' },
      { slug: 'litecoin',         label: 'Litecoin',       color: 'BFBBBB', type: 'brand' },
      { slug: 'solana',           label: 'Solana',         color: '9945FF', type: 'brand' },
      { slug: 'dogecoin',         label: 'Dogecoin',       color: 'C2A633', type: 'brand' },
      { slug: 'cardano',          label: 'Cardano',        color: '0033AD', type: 'brand' },
      { slug: 'polkadot',         label: 'Polkadot',       color: 'E6007A', type: 'brand' },
      { slug: 'binance',          label: 'Binance',        color: 'F3BA2F', type: 'brand' },
      { slug: 'coinbase',         label: 'Coinbase',       color: '0052FF', type: 'brand' },
      { slug: 'ripple',           label: 'XRP',            color: '23292F', type: 'brand' },
      { slug: 'avalanche',        label: 'Avalanche',      color: 'E84142', type: 'brand' },

      /* ── Payments ── */
      { slug: 'paypal',           label: 'PayPal',         color: '003087', type: 'brand' },
      { slug: 'stripe',           label: 'Stripe',         color: '635BFF', type: 'brand' },
      { slug: 'visa',             label: 'Visa',           color: '1A1F71', type: 'brand' },
      { slug: 'mastercard',       label: 'Mastercard',     color: 'EB001B', type: 'brand' },
      { slug: 'applepay',         label: 'Apple Pay',      color: '000000', type: 'brand' },
      { slug: 'googlepay',        label: 'Google Pay',     color: '4285F4', type: 'brand' },
      { slug: 'cashapp',          label: 'Cash App',       color: '00D632', type: 'brand' },
      { slug: 'venmo',            label: 'Venmo',          color: '3D95CE', type: 'brand' },
      { slug: 'wise',             label: 'Wise',           color: '9FE870', type: 'brand' },
      { slug: 'revolut',          label: 'Revolut',        color: '0075EB', type: 'brand' },

      /* ── Business / Enterprise ── */
      { slug: 'salesforce',       label: 'Salesforce',     color: '00A1E0', type: 'brand' },
      { slug: 'hubspot',          label: 'HubSpot',        color: 'FF7A59', type: 'brand' },
      { slug: 'shopify',          label: 'Shopify',        color: '96BF48', type: 'brand' },
      { slug: 'aws',              label: 'AWS',            color: '232F3E', type: 'brand' },
      { slug: 'azure',            label: 'Azure',          color: '0089D6', type: 'brand' },
      { slug: 'googlecloud',      label: 'Google Cloud',   color: '4285F4', type: 'brand' },
      { slug: 'jira',             label: 'Jira',           color: '0052CC', type: 'brand' },
      { slug: 'trello',           label: 'Trello',         color: '0052CC', type: 'brand' },
      { slug: 'asana',            label: 'Asana',          color: 'FC636B', type: 'brand' },
      { slug: 'mondaydotcom',     label: 'Monday',         color: 'FF3B30', type: 'brand' },
      { slug: 'notion',           label: 'Notion',         color: '000000', type: 'brand' },
      { slug: 'clickup',          label: 'ClickUp',        color: '7B68EE', type: 'brand' },
      { slug: 'zendesk',          label: 'Zendesk',        color: '03363D', type: 'brand' },
      { slug: 'intercom',         label: 'Intercom',       color: '6AFDEF', type: 'brand' },
      { slug: 'mailchimp',        label: 'Mailchimp',      color: 'FFE01B', type: 'brand' },

      /* ── Dev & Code — 48 icons ── */
      { slug: 'adobe',            label: 'Adobe',          color: 'FF0000', type: 'brand' },
      { slug: 'android',          label: 'Android',        color: '3DDC84', type: 'brand' },
      { slug: 'angular',          label: 'Angular',        color: 'DD0031', type: 'brand' },
      { slug: 'apache',           label: 'Apache',         color: 'D22128', type: 'brand' },
      { slug: 'astro',            label: 'Astro',          color: 'FF5D01', type: 'brand' },
      { slug: 'bootstrap',        label: 'Bootstrap',      color: '7952B3', type: 'brand' },
      { slug: 'c',                label: 'C',              color: 'A97BFF', type: 'brand' },
      { slug: 'cplusplus',        label: 'C++',            color: '00599C', type: 'brand' },
      { slug: 'csharp',           label: 'C#',             color: '239120', type: 'brand' },
      { slug: 'css3',             label: 'CSS3',           color: '1572B6', type: 'brand' },
      { slug: 'dart',             label: 'Dart',           color: '0175C2', type: 'brand' },
      { slug: 'deno',             label: 'Deno',           color: '000000', type: 'brand' },
      { slug: 'django',           label: 'Django',         color: '092E20', type: 'brand' },
      { slug: 'dotnet',           label: '.NET',           color: '512BD4', type: 'brand' },
      { slug: 'drupal',           label: 'Drupal',         color: '0678BE', type: 'brand' },
      { slug: 'electron',         label: 'Electron',       color: '47848F', type: 'brand' },
      { slug: 'flutter',          label: 'Flutter',        color: '02569B', type: 'brand' },
      { slug: 'git',              label: 'Git',            color: 'F05032', type: 'brand' },
      { slug: 'go',               label: 'Go',             color: '00ADD8', type: 'brand' },
      { slug: 'graphql',          label: 'GraphQL',        color: 'E10098', type: 'brand' },
      { slug: 'html5',            label: 'HTML5',          color: 'E34F26', type: 'brand' },
      { slug: 'java',             label: 'Java',           color: '007396', type: 'brand' },
      { slug: 'javascript',       label: 'JavaScript',     color: 'F7DF1E', type: 'brand' },
      { slug: 'typescript',       label: 'TypeScript',     color: '3178C6', type: 'brand' },
      { slug: 'python',           label: 'Python',         color: '3776AB', type: 'brand' },
      { slug: 'php',              label: 'PHP',            color: '777BB4', type: 'brand' },
      { slug: 'ruby',             label: 'Ruby',           color: 'CC342D', type: 'brand' },
      { slug: 'rust',             label: 'Rust',           color: '000000', type: 'brand' },
      { slug: 'swift',            label: 'Swift',          color: 'FA7343', type: 'brand' },
      { slug: 'kotlin',           label: 'Kotlin',         color: '0095D5', type: 'brand' },
      { slug: 'react',            label: 'React',          color: '61DAFB', type: 'brand' },
      { slug: 'vuedotjs',         label: 'Vue.js',         color: '4FC08D', type: 'brand' },
      { slug: 'svelte',           label: 'Svelte',         color: 'FF3E00', type: 'brand' },
      { slug: 'nextdotjs',        label: 'Next.js',        color: '000000', type: 'brand' },
      { slug: 'nuxtdotjs',        label: 'Nuxt',           color: '00DC82', type: 'brand' },
      { slug: 'tailwindcss',      label: 'Tailwind',       color: '06B6D4', type: 'brand' },
      { slug: 'sass',             label: 'Sass',           color: 'CC6699', type: 'brand' },
      { slug: 'webpack',          label: 'Webpack',        color: '8DD6F9', type: 'brand' },
      { slug: 'vite',             label: 'Vite',           color: '646CFF', type: 'brand' },
      { slug: 'eslint',           label: 'ESLint',         color: '4B32C3', type: 'brand' },
      { slug: 'jest',             label: 'Jest',           color: 'C21325', type: 'brand' },
      { slug: 'nodedotjs',        label: 'Node.js',        color: '339933', type: 'brand' },
      { slug: 'mongodb',          label: 'MongoDB',        color: '47A248', type: 'brand' },
      { slug: 'postgresql',       label: 'PostgreSQL',     color: '4169E1', type: 'brand' },
      { slug: 'mysql',            label: 'MySQL',          color: '4479A1', type: 'brand' },
      { slug: 'redis',            label: 'Redis',          color: 'DC382D', type: 'brand' },
      { slug: 'kubernetes',       label: 'Kubernetes',     color: '326CE5', type: 'brand' },
      { slug: 'terraform',        label: 'Terraform',      color: '7B42BC', type: 'brand' },

      /* ── Cloud & Infra ── */
      { slug: 'cloudflare',       label: 'Cloudflare',     color: 'F38020', type: 'brand' },
      { slug: 'digitalocean',     label: 'DigitalOcean',   color: '0080FF', type: 'brand' },
      { slug: 'vercel',           label: 'Vercel',         color: '000000', type: 'brand' },
      { slug: 'netlify',          label: 'Netlify',        color: '00C7B7', type: 'brand' },
      { slug: 'supabase',         label: 'Supabase',       color: '3FCF8E', type: 'brand' },
      { slug: 'firebase',         label: 'Firebase',       color: 'FFCA28', type: 'brand' },
      { slug: 'heroku',           label: 'Heroku',         color: '430098', type: 'brand' },
      { slug: 'openai',           label: 'OpenAI',         color: '412991', type: 'brand' },

      /* ── Design & Creative ── */
      { slug: 'adobephotoshop',   label: 'Photoshop',      color: '31A8FF', type: 'brand' },
      { slug: 'adobeillustrator', label: 'Illustrator',    color: 'FF9A00', type: 'brand' },
      { slug: 'adobepremierepro', label: 'Premiere Pro',   color: '9999FF', type: 'brand' },
      { slug: 'adobeaftereffects',label: 'After Effects',  color: '9999FF', type: 'brand' },
      { slug: 'behance',          label: 'Behance',        color: '1769FF', type: 'brand' },
      { slug: 'dribbble',         label: 'Dribbble',       color: 'EA4C89', type: 'brand' },
      { slug: 'canva',            label: 'Canva',          color: '00C4CC', type: 'brand' },
      { slug: 'framer',           label: 'Framer',         color: '0055FF', type: 'brand' },
      { slug: 'sketch',           label: 'Sketch',         color: 'FDB300', type: 'brand' },
      { slug: 'invision',         label: 'InVision',       color: 'FF3366', type: 'brand' },
      { slug: 'zeplin',           label: 'Zeplin',         color: 'FDBD39', type: 'brand' },

      /* ── E-commerce & Retail ── */
      { slug: 'amazon',           label: 'Amazon',         color: 'FF9900', type: 'brand' },
      { slug: 'ebay',             label: 'eBay',           color: 'E53238', type: 'brand' },
      { slug: 'etsy',             label: 'Etsy',           color: 'F56400', type: 'brand' },
      { slug: 'walmart',          label: 'Walmart',        color: '0071DC', type: 'brand' },
      { slug: 'target',           label: 'Target',         color: 'CC0000', type: 'brand' },
      { slug: 'nike',             label: 'Nike',           color: '111111', type: 'brand' },
      { slug: 'adidas',           label: 'Adidas',         color: '000000', type: 'brand' },
      { slug: 'zara',             label: 'Zara',           color: '000000', type: 'brand' },
      { slug: 'handm',            label: 'H&M',            color: 'E50010', type: 'brand' },
      { slug: 'ikea',             label: 'IKEA',           color: '0051BA', type: 'brand' },
      { slug: 'bestbuy',          label: 'Best Buy',       color: '003B64', type: 'brand' },
      { slug: 'alibaba',          label: 'Alibaba',        color: 'FF6A00', type: 'brand' },

      /* ── Entertainment ── */
      { slug: 'netflix',          label: 'Netflix',        color: 'E50914', type: 'brand' },
      { slug: 'disneyplus',       label: 'Disney+',        color: '113CCF', type: 'brand' },
      { slug: 'hulu',             label: 'Hulu',           color: '1CE783', type: 'brand' },
      { slug: 'deezer',           label: 'Deezer',         color: 'FEAA2D', type: 'brand' },
      { slug: 'soundcloud',       label: 'SoundCloud',     color: 'FF5500', type: 'brand' },
      { slug: 'bandcamp',         label: 'Bandcamp',       color: '629AA9', type: 'brand' },
      { slug: 'patreon',          label: 'Patreon',        color: 'FF424D', type: 'brand' },
      { slug: 'medium',           label: 'Medium',         color: '000000', type: 'brand' },
      { slug: 'quora',            label: 'Quora',          color: 'B92B27', type: 'brand' },
      { slug: 'substack',         label: 'Substack',       color: 'FF6719', type: 'brand' },

      /* ── Food & Drink ── */
      { slug: 'mcdonalds',        label: "McDonald's",     color: 'FFBC0D', type: 'brand' },
      { slug: 'starbucks',        label: 'Starbucks',      color: '00704A', type: 'brand' },
      { slug: 'burgerking',       label: 'Burger King',    color: 'D62300', type: 'brand' },
      { slug: 'kfc',              label: 'KFC',            color: 'F40027', type: 'brand' },
      { slug: 'dominos',          label: "Domino's",       color: '006491', type: 'brand' },
      { slug: 'cocacola',         label: 'Coca-Cola',      color: 'D00000', type: 'brand' },
      { slug: 'pepsi',            label: 'Pepsi',          color: '004B93', type: 'brand' },
      { slug: 'redbull',          label: 'Red Bull',       color: 'CC0000', type: 'brand' },

      /* ── Automotive ── */
      { slug: 'tesla',            label: 'Tesla',          color: 'CC0000', type: 'brand' },
      { slug: 'bmw',              label: 'BMW',            color: '0066B1', type: 'brand' },
      { slug: 'mercedes',         label: 'Mercedes',       color: '000000', type: 'brand' },
      { slug: 'audi',             label: 'Audi',           color: 'BB0A30', type: 'brand' },
      { slug: 'toyota',           label: 'Toyota',         color: 'EB0A1E', type: 'brand' },
      { slug: 'honda',            label: 'Honda',          color: 'E40521', type: 'brand' },
      { slug: 'ford',             label: 'Ford',           color: '003478', type: 'brand' },
      { slug: 'volkswagen',       label: 'Volkswagen',     color: '151949', type: 'brand' },
      { slug: 'porsche',          label: 'Porsche',        color: '000000', type: 'brand' },
      { slug: 'ferrari',          label: 'Ferrari',        color: 'FF2800', type: 'brand' },

      /* ── Additional Finance ── */
      { slug: 'americanexpress',  label: 'Amex',           color: '2E77BB', type: 'brand' },
      { slug: 'klarna',           label: 'Klarna',         color: 'FFB3C7', type: 'brand' },
      { slug: 'payoneer',         label: 'Payoneer',       color: 'FF4800', type: 'brand' },
      { slug: 'paytm',            label: 'Paytm',          color: '00BAF2', type: 'brand' },
      { slug: 'samsungpay',       label: 'Samsung Pay',    color: '1428A0', type: 'brand' },
    ],
  },

  system: {
    label: 'System & Functional',
    icons: [
      /* ── Connectivity ── */
      { slug: 'wifi',             label: 'Wi-Fi',          lucide: 'wifi',             type: 'system' },
      { slug: 'bluetooth',        label: 'Bluetooth',      lucide: 'bluetooth',        type: 'system' },
      { slug: 'nfc',              label: 'NFC',            lucide: 'nfc',              type: 'system' },
      { slug: 'signal',           label: 'Signal Bars',    lucide: 'signal',           type: 'system' },
      { slug: 'radio',            label: 'Radio',          lucide: 'radio',            type: 'system' },

      /* ── Communication ── */
      { slug: 'mail',             label: 'Email',          lucide: 'mail',             type: 'system' },
      { slug: 'phone',            label: 'Phone',          lucide: 'phone',            type: 'system' },
      { slug: 'sms',              label: 'SMS',            lucide: 'message-square',   type: 'system' },
      { slug: 'call',             label: 'Call',           lucide: 'phone-call',       type: 'system' },
      { slug: 'voicemail',        label: 'Voicemail',      lucide: 'voicemail',        type: 'system' },
      { slug: 'chat',             label: 'Chat',           lucide: 'message-circle',   type: 'system' },
      { slug: 'send',             label: 'Send',           lucide: 'send',             type: 'system' },

      /* ── Contacts / Identity ── */
      { slug: 'vcard',            label: 'vCard',          lucide: 'contact',          type: 'system' },
      { slug: 'user',             label: 'User',           lucide: 'user',             type: 'system' },
      { slug: 'users',            label: 'Users',          lucide: 'users',            type: 'system' },
      { slug: 'id',               label: 'ID Card',        lucide: 'badge',            type: 'system' },

      /* ── Time / Scheduling ── */
      { slug: 'calendar',         label: 'Calendar',       lucide: 'calendar',         type: 'system' },
      { slug: 'clock',            label: 'Clock',          lucide: 'clock',            type: 'system' },
      { slug: 'event',            label: 'Event',          lucide: 'calendar-clock',   type: 'system' },
      { slug: 'reminder',         label: 'Reminder',       lucide: 'bell',             type: 'system' },
      { slug: 'alarm',            label: 'Alarm',          lucide: 'alarm-clock',      type: 'system' },
      { slug: 'timer',            label: 'Timer',          lucide: 'timer',            type: 'system' },

      /* ── Location / Navigation ── */
      { slug: 'location',         label: 'Location',       lucide: 'map-pin',          type: 'system' },
      { slug: 'directions',       label: 'Directions',     lucide: 'navigation',       type: 'system' },
      { slug: 'map',              label: 'Map',            lucide: 'map',              type: 'system' },
      { slug: 'compass',          label: 'Compass',        lucide: 'compass',          type: 'system' },
      { slug: 'globe',            label: 'Globe',          lucide: 'globe',            type: 'system' },

      /* ── Files / Documents ── */
      { slug: 'document',         label: 'Document',       lucide: 'file-text',        type: 'system' },
      { slug: 'file',             label: 'File',           lucide: 'file',             type: 'system' },
      { slug: 'folder',           label: 'Folder',         lucide: 'folder',           type: 'system' },
      { slug: 'note',             label: 'Note',           lucide: 'sticky-note',      type: 'system' },
      { slug: 'clipboard',        label: 'Clipboard',      lucide: 'clipboard',        type: 'system' },
      { slug: 'download',         label: 'Download',       lucide: 'download',         type: 'system' },
      { slug: 'upload',           label: 'Upload',         lucide: 'upload',           type: 'system' },

      /* ── Media ── */
      { slug: 'image',            label: 'Image',          lucide: 'image',            type: 'system' },
      { slug: 'camera',           label: 'Camera',         lucide: 'camera',           type: 'system' },
      { slug: 'video',            label: 'Video',          lucide: 'video',            type: 'system' },
      { slug: 'music',            label: 'Music',          lucide: 'music',            type: 'system' },
      { slug: 'microphone',       label: 'Microphone',     lucide: 'mic',              type: 'system' },
      { slug: 'speaker',          label: 'Speaker',        lucide: 'volume-2',         type: 'system' },

      /* ── Actions / Utilities ── */
      { slug: 'link',             label: 'Link',           lucide: 'link',             type: 'system' },
      { slug: 'share',            label: 'Share',          lucide: 'share-2',          type: 'system' },
      { slug: 'copy',             label: 'Copy',           lucide: 'copy',             type: 'system' },
      { slug: 'search',           label: 'Search',         lucide: 'search',           type: 'system' },
      { slug: 'settings',         label: 'Settings',       lucide: 'settings',         type: 'system' },
      { slug: 'home',             label: 'Home',           lucide: 'home',             type: 'system' },
      { slug: 'star',             label: 'Star',           lucide: 'star',             type: 'system' },
      { slug: 'heart',            label: 'Heart',          lucide: 'heart',            type: 'system' },
      { slug: 'bookmark',         label: 'Bookmark',       lucide: 'bookmark',         type: 'system' },
      { slug: 'tag',              label: 'Tag',            lucide: 'tag',              type: 'system' },
      { slug: 'cart',             label: 'Cart',           lucide: 'shopping-cart',    type: 'system' },
      { slug: 'wallet',           label: 'Wallet',         lucide: 'wallet',           type: 'system' },
      { slug: 'gift',             label: 'Gift',           lucide: 'gift',             type: 'system' },
      { slug: 'key',              label: 'Key',            lucide: 'key',              type: 'system' },
      { slug: 'lock',             label: 'Lock',           lucide: 'lock',             type: 'system' },
      { slug: 'shield',           label: 'Shield',         lucide: 'shield',           type: 'system' },
      { slug: 'zap',              label: 'Zap',            lucide: 'zap',              type: 'system' },
      { slug: 'battery',          label: 'Battery',        lucide: 'battery-full',     type: 'system' },
      { slug: 'power',            label: 'Power',          lucide: 'power',            type: 'system' },
      { slug: 'printer',          label: 'Printer',        lucide: 'printer',          type: 'system' },
      { slug: 'scan',             label: 'Scan',           lucide: 'scan-line',        type: 'system' },
      { slug: 'refresh',          label: 'Refresh',        lucide: 'refresh-cw',       type: 'system' },
      { slug: 'sync',             label: 'Sync',           lucide: 'refresh-cw',       type: 'system' },
      { slug: 'check',            label: 'Check',          lucide: 'check',            type: 'system' },
      { slug: 'close',            label: 'Close',          lucide: 'x',                type: 'system' },
      { slug: 'plus',             label: 'Plus',           lucide: 'plus',             type: 'system' },
      { slug: 'minus',            label: 'Minus',          lucide: 'minus',            type: 'system' },
      { slug: 'info',             label: 'Info',           lucide: 'info',             type: 'system' },
      { slug: 'alert',            label: 'Alert',          lucide: 'alert-triangle',   type: 'system' },
      { slug: 'help',             label: 'Help',           lucide: 'help-circle',      type: 'system' },
    ],
  },
};

/* ═══════════════════════════════════════════════════════
   Dual-source URL builder.
   Brand  → https://cdn.simpleicons.org/{slug}/{hex}
   System → https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/{lucide}.svg
   ═══════════════════════════════════════════════════════ */

const LUCIDE_CDN = 'https://cdn.jsdelivr.net/npm/lucide-static@latest/icons';
const SIMPLE_ICONS_CDN = 'https://cdn.simpleicons.org';

/**
 * Build icon URL based on type.
 * @param {object} icon — full icon object from ICON_CATEGORIES
 * @returns {string} CDN URL
 */
export function iconURL(icon) {
  if (icon.type === 'system' && icon.lucide) {
    return `${LUCIDE_CDN}/${icon.lucide}.svg`;
  }
  /* Brand: use official hex color */
  if (icon.color) {
    return `${SIMPLE_ICONS_CDN}/${icon.slug}/${icon.color}`;
  }
  return `${SIMPLE_ICONS_CDN}/${icon.slug}`;
}

/**
 * Flat lookup: slug → full icon object
 */
export const ICON_MAP = {};
for (const [catKey, cat] of Object.entries(ICON_CATEGORIES)) {
  for (const icon of cat.icons) {
    ICON_MAP[icon.slug] = { ...icon, category: catKey };
  }
}

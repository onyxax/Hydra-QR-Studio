# Hydra QR Studio

![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
![Status: Stable](https://img.shields.io/badge/Status-Stable-brightgreen.svg)

A production-grade, enterprise-minimalist QR Code Generator built for power users. Generate scannable, customizable QR codes with real-time preview, dual-source icon libraries, gradient backgrounds, and per-corner finder eye styling — all in a locked-viewport triple-column studio layout.

---

## Features

- **11 Data Types** — URL, Text, Email, WiFi, vCard, WhatsApp, Instagram, X/Twitter, PayPal, Crypto
- **Live Preview** — Real-time QR rendering with `qr-code-styling` engine (100% scannable output)
- **Dual-Source Icon Library** — 67 brand icons (SimpleIcons with official hex colors) + 72 system icons (Lucide, theme-adaptive)
- **Icon Recolor** — Fetch-and-recolor SVG pipeline for brand-accurate icon fills
- **Background Gradients** — Linear and radial gradient support with angle control
- **Per-Corner Finder Eye Rounding** — Individual TL/TR/BL/BR corner radius sliders
- **Finder Eye Colors** — Separate outer square and inner dot color pickers
- **Fixed Icon Size** — Decoupled from Error Correction level; user-controlled 5–50%
- **Dark/Light Theme** — Full CSS variable theming with localStorage persistence
- **Smart Contrast Engine** — MutationObserver-based dark mode visibility enhancement
- **Power User Studio** — Triple-column layout: 80px sidebar nav + settings panel + live preview
- **Export** — PNG and SVG download via `qr-code-styling` blob API
- **Zero Build Step** — Pure HTML/CSS/JS, single CDN dependency, instant open

---

## How to Run Locally

```bash
# Clone the repository
git clone https://github.com/your-username/hydra-qr-studio.git
cd hydra-qr-studio

# No install required — open directly in browser
# Using Python (recommended for module support):
python -m http.server 8080

# Or using Node.js:
npx serve .

# Or simply open index.html in your browser
```

Navigate to `http://localhost:8080` (or your chosen port).

---

## Technology Stack

| Layer | Technology |
|---|---|
| Markup | HTML5 |
| Styling | CSS3 (Custom Properties, Grid, Flexbox) |
| Logic | Vanilla ES Modules (no bundler) |
| QR Engine | [`qr-code-styling@1.5.0`](https://github.com/nicknisi/qr-code-styling) via jsDelivr CDN |
| Brand Icons | [SimpleIcons CDN](https://simpleicons.org/) — 67 icons with official brand hex |
| System Icons | [Lucide Static CDN](https://lucide.dev/) — 72 icons, theme-adaptive via CSS filter |
| Fonts | Inter (Google Fonts) |
| Hosting | Vercel (Static) |

---

## Deployment

### Vercel (Recommended)

1. Push to a GitHub repository
2. Import the repository at [vercel.com/new](https://vercel.com/new)
3. Framework Preset: **Other**
4. Root Directory: `./`
5. Deploy — no build step required

Or using the Vercel CLI:

```bash
npm i -g vercel
vercel deploy --prod
```

### Manual Deployment

Upload the entire project directory to any static host (Netlify, GitHub Pages, Cloudflare Pages). The app has zero build dependencies.

---

## Project Structure

```
hydra-qr-studio/
├── index.html              # App entry point
├── vercel.json             # Vercel deployment config
├── css/
│   ├── styles.css          # Theme system, layout, components
│   └── components.css      # Toast notifications, utilities
├── js/
│   ├── main.js             # App entry, state, sidebar nav, event wiring
│   └── modules/
│       ├── qr-generator.js     # qr-code-styling wrapper
│       ├── qr-config.js        # 11 data type definitions
│       ├── canvas-postprocess.js   # Per-corner finder eye rounding
│       ├── icon-data.js        # Dual-source icon library (SimpleIcons + Lucide)
│       ├── ui-handlers.js      # Dynamic form builder, toasts
│       ├── upload-handler.js   # Logo drag-drop upload
│       └── theme.js            # Dark/Light mode persistence
└── README.md
```

---

## License

Copyright (c) 2026 Onyxax — [MIT License](LICENSE)

Licensed under the MIT License. See the [LICENSE](LICENSE) file for full terms.

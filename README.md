<p align="center">
  <img src="assets/logo.svg" width="84" height="84" alt="Hydra Logo"/>
</p>

<h1 align="center">Hydra QR Studio</h1>

<p align="center">
  <b>Professional floating QR Studio — Vanilla HTML/CSS/JS only</b><br/>
  <span style="color:#868E96">Real-time preview • 255 icons • Gradients • Frame captions • 6 exports</span>
</p>

<p align="center">
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-0ea5e9?style=for-the-badge&logo=open-source-initiative&logoColor=white" alt="MIT"/></a>
  <img src="https://img.shields.io/badge/Status-Stable-22c55e?style=for-the-badge&logo=checkmarx&logoColor=white" alt="Stable"/>
  <img src="https://img.shields.io/badge/Build-Static-64748b?style=for-the-badge&logo=html5&logoColor=white" alt="Static"/>
  <img src="https://img.shields.io/badge/Engine-qr--code--styling-0891b2?style=for-the-badge&logo=qrcode&logoColor=white" alt="Engine"/>
  <a href="https://vercel.com/new"><img src="https://img.shields.io/badge/Deploy-Vercel-black?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel"/></a>
  <img src="https://img.shields.io/badge/Version-2.0.0-8b5cf6?style=for-the-badge&logo=git&logoColor=white" alt="Version"/>
  <img src="https://img.shields.io/badge/Made%20with-Vanilla-F59E0B?style=for-the-badge&logo=javascript&logoColor=white" alt="Vanilla"/>
  <img src="https://img.shields.io/badge/Icons-255-EC4899?style=for-the-badge&logo=icons8&logoColor=white" alt="Icons"/>
</p>

<p align="center">
  <a href="#-overview">Overview</a> •
  <a href="#-features">Features</a> •
  <a href="#-demo">Demo</a> •
  <a href="#-tech-stack">Stack</a> •
  <a href="#-project-structure">Structure</a> •
  <a href="#-getting-started">Start</a> •
  <a href="#-usage">Usage</a> •
  <a href="#-deployment">Deploy</a> •
  <a href="#-license">License</a>
</p>

---

## <img src="assets/icons/heroicons/sparkles.svg" width="20" height="20" style="vertical-align:middle" /> Overview

> **Hydra QR Studio** is a production-grade, **floating glass/blur** QR generator for power users. No framework, no build — open and generate. Built with pure HTML/CSS/JS and a single CDN dependency, deployed as static on Vercel.

**Why Hydra?**
- <img src="assets/icons/heroicons/bolt.svg" width="14" height="14" style="vertical-align:middle" /> **Instant** — zero install, zero build, opens in 200ms
- <img src="assets/icons/heroicons/check-circle.svg" width="14" height="14" style="vertical-align:middle" /> **Precise** — 100% scannable, high-contrast preview
- <img src="assets/icons/heroicons/swatch.svg" width="14" height="14" style="vertical-align:middle" /> **Expressive** — 255 icons + gradients + frame captions
- <img src="assets/icons/heroicons/squares-2x2.svg" width="14" height="14" style="vertical-align:middle" /> **Floating** — Topbar + Dock + two glass panels

---

## <img src="assets/icons/heroicons/squares-2x2.svg" width="20" height="20" style="vertical-align:middle" /> Features

| <img src="assets/icons/heroicons/link.svg" width="14" height="14" /> Data | <img src="assets/icons/heroicons/eye.svg" width="14" height="14" /> Visual | <img src="assets/icons/heroicons/photo.svg" width="14" height="14" /> Brand | <img src="assets/icons/heroicons/swatch.svg" width="14" height="14" /> Color |
|---|---|---|---|
| **10 Types** — URL, Text, Email, WiFi, vCard, WhatsApp, Instagram, X, PayPal, Crypto | **Dots** — square, extra-rounded, rounded, dots, classy (+ gradient + opacity) | **184 Brands** — SimpleIcons CDN with official hex | **QR Colors** — fg/bg + WCAG contrast badge |
| Live encode via `qr-config.js` | **Eyes** — frame shape (square/rounded/leaf) + ball shape + eye colors | **71 System** — Lucide CDN, theme-adaptive | **Background Gradient** — linear/radial + angle |
|  | Error correction L/M/Q/H • Quiet zone • Preview width | **Logo** — drag-drop, padding, bg, radius, shadow, hide dots • **Icon recolor** pipeline | **Dots Gradient** — independent fg gradient |

**More:**
- <img src="assets/icons/heroicons/rectangle-group.svg" width="14" height="14" /> **Frame Caption** — `SCAN ME` bar below QR
- <img src="assets/icons/heroicons/bookmark.svg" width="14" height="14" /> **Presets** — Classic / Ocean / Sunset / Midnight + Save Custom
- <img src="assets/icons/heroicons/moon.svg" width="14" height="14" /> **Dark/Light** — CSS variables + `localStorage` + smart contrast
- <img src="assets/icons/heroicons/arrow-down-tray.svg" width="14" height="14" /> **Export 6** — **PNG / SVG / JPG / WEBP / PDF / Copy**
- <img src="assets/icons/heroicons/view-columns.svg" width="14" height="14" /> **Floating Studio** — Glass Topbar + Left Dock + two floating panels

---

## <img src="assets/icons/heroicons/cpu-chip.svg" width="20" height="20" style="vertical-align:middle" /> Tech Stack

| Layer | Technology | CDN |
|---|---|---|
| Markup | HTML5 | — |
| Styling | CSS3 — Custom Properties, Grid, Flex, `backdrop-filter` | — |
| Logic | Vanilla ES Modules (no bundler) | — |
| QR Engine | [`qr-code-styling@1.5.0`](https://github.com/kozakdenys/qr-code-styling) | `jsDelivr` |
| Brand Icons | [SimpleIcons](https://simpleicons.org) — 184 icons | `cdn.simpleicons.org` |
| System Icons | [Lucide Static](https://lucide.dev) — 71 icons | `cdn.jsdelivr.net/npm/lucide-static` |
| UI Icons | [Heroicons 2.1.5](https://heroicons.com) — outline 24 | `cdn.jsdelivr.net/npm/heroicons` |
| Fonts | Inter 400/500/600/700 | Google Fonts |
| Hosting | Vercel Static + `vercel.json` | — |

---

## <img src="assets/icons/heroicons/folder.svg" width="20" height="20" style="vertical-align:middle" /> Project Structure

```text
hydra-qr-studio/
├── index.html                 # Topbar + Dock + 2 floating panels
├── vercel.json                # cleanUrls + rewrites + immutable cache
├── css/
│   ├── tokens.css             # Light/dark tokens (single source)
│   ├── base.css               # Reset + typography
│   ├── layout.css             # Floating header/dock + 2-col grid
│   ├── preview.css            # Preview + frame
│   ├── effects.css            # Shadows & smart-contrast
│   ├── components.css         # Toasts
│   └── components/
│       ├── cards.css          # Card + featured
│       ├── inputs.css         # Chips, ranges, colors, switches
│       └── icon-picker.css    # Search + tabs + grid
├── js/
│   ├── main.js                # Entry — state, wiring, dock, export
│   ├── state.js               # Central reactive state
│   ├── config/constants.js    # Defaults, limits, storage keys
│   ├── utils/                 # dom, debounce, contrast, presets
│   └── modules/               # qr-generator, qr-config, icon-data (255), theme...
└── README.md
```

---

## <img src="assets/icons/heroicons/rocket-launch.svg" width="20" height="20" style="vertical-align:middle" /> Getting Started

```bash
# clone
git clone https://github.com/onyxax/Hydra-QR-Studio.git
cd Hydra-QR-Studio

# run — no install, no build
python -m http.server 8080
# or
npx serve .

# open
http://localhost:8080
```

> Requires a local server for ES Modules (`file://` blocks imports).

---

## <img src="assets/icons/heroicons/cursor-arrow-rays.svg" width="20" height="20" style="vertical-align:middle" /> Usage

1. Pick **Data Type** → fill form → live preview updates
2. Tweak **Visuals** (dots, eyes) → **Branding** (icon/logo) → **Colors** (gradients)
3. Click **Export ▾** in topbar → choose **PNG / SVG / JPG / WEBP / PDF / Copy**
4. Toggle **Dark/Light** via moon/sun in topbar (persists in `localStorage`)

---

## <img src="assets/icons/heroicons/wrench-screwdriver.svg" width="20" height="20" style="vertical-align:middle" /> Customization

- **Tokens** → `css/tokens.css` (all colors, radii, shadows, `--accent`)
- **Layout** → `css/layout.css` (floating header/dock, `grid-template-columns: 1fr var(--preview-col)`)
- **Add brand icon** → `js/modules/icon-data.js` → `{ slug, label, color, type:'brand' }`
- **Add data type** → `js/modules/qr-config.js` → `fields[]` + `encode()`
- **Defaults** → `js/config/constants.js` → `DEFAULT_STATE` + `LIMITS`

---

## <img src="assets/icons/heroicons/cloud-arrow-up.svg" width="20" height="20" style="vertical-align:middle" /> Deployment

**Vercel — zero config:**
1. Push to GitHub
2. Import at `vercel.com/new` → Framework: `Other` → Root: `./` → Deploy

```bash
npm i -g vercel
vercel deploy --prod
```

**Any static host** (Netlify, GitHub Pages, Cloudflare Pages): upload the folder — no build.

---

## <img src="assets/icons/heroicons/information-circle.svg" width="20" height="20" style="vertical-align:middle" /> FAQ

**Q: Why not use a framework?**
A: To stay fast, portable and to train Vanilla JS — zero build, instant open, easy to fork.

**Q: Are QR codes scannable with gradients/logos?**
A: Yes — high error correction `Q (25%)` by default + contrast badge warns if low.

---

## <img src="assets/icons/heroicons/shield-check.svg" width="20" height="20" style="vertical-align:middle" /> License

Copyright © 2026 Onyxax — [MIT License](LICENSE)

---

<p align="center">
  <img src="assets/logo.svg" width="48" height="48" alt="Hydra"/>
  <br/>
  <b>Hydra QR Studio</b> — Made with Vanilla JS<br/>
  <a href="https://github.com/onyxax/Hydra-QR-Studio">★ Star on GitHub</a> • <a href="https://github.com/onyxax/Hydra-QR-Studio/issues">Report Issue</a> • <a href="https://vercel.com/new">Deploy</a>
  <br/><br/>
  <span style="color:#868E96; font-size:12px">© 2026 Onyxax • MIT • Built for power users</span>
</p>

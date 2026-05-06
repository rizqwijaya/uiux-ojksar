# OJK Design System

Design system for **Otoritas Jasa Keuangan (OJK)** — Indonesia's Financial Services Authority. OJK oversees and regulates the banking sector, capital markets, and non-bank financial industry (insurance, pension funds, fintech, etc.).

## Sources

- Color & typography specifications provided directly (Pantone, CMYK, RGB, HEX values)
- No codebase or Figma files were provided

---

## CONTENT FUNDAMENTALS

- **Language**: Bahasa Indonesia (formal/institutional register)
- **Tone**: Authoritative, clear, trustworthy — befitting a government regulatory body
- **Casing**: Sentence case for body text; title case for navigation and headings
- **Person**: Third-person institutional ("OJK mengawasi…") or second-person formal ("Anda")
- **Emoji**: Not used — this is a government institution
- **Vibe**: Professional, structured, reassuring. Content emphasizes consumer protection, transparency, and regulatory compliance.

---

## VISUAL FOUNDATIONS

### Colors
- **Primary**: Deep crimson red (#9E1E21) — institutional authority; used for navbar, CTA buttons, active links
- **Secondary**: Warm orange (#F0714D) — highlights, warnings, supporting elements
- **Accent**: Soft coral (#FF977A) — soft emphasis, hover tints
- **Neutral**: Mid-gray (#8D8F8C) through a 50–900 scale for text, borders, backgrounds
- **Background**: White (#FFFFFF) — clean, open surfaces

### Typography
- **Primary font**: Myriad Pro
- **Fallback**: Arial, sans-serif
- **Heading scale**: 36px (H1) → 17px (H6), Bold/Semibold, tight line-height (120–140%)
- **Body**: 12–16px Regular, relaxed line-height (140–150%)
- **Button text**: 15px Semibold, +0.5% letter-spacing

### Spacing & Layout
- 4px base unit, scale: 4 → 96px (12 steps)
- 8px grid alignment for most elements
- Generous whitespace for institutional clarity

### Border Radius
- sm: 4px (inputs, small elements)
- md: 8px (cards, buttons — default)
- lg: 12px, xl: 16px (large cards, modals)
- full: pill shape (badges, tags)

### Shadows / Elevation
- 4-level system: sm → xl, subtle and warm-neutral
- Cards: bordered (1px neutral-200) OR elevated (shadow-md, no border) — not both

### Backgrounds
- Predominantly white surfaces with neutral-50 for page backgrounds
- Primary red for hero sections and navbar
- No gradients, patterns, or textures

### Hover / Press States
- Buttons: darken background ~10%
- Links: underline on hover
- Cards: subtle shadow lift (shadow-md → shadow-lg)

### Borders
- 1–1.5px, neutral-200 to neutral-300
- Focus rings: 3px primary-100 glow

### Animation
- Minimal — transitions for hover states only (150–200ms ease)
- No bounces, no complex animations — institutional sobriety

---

## ICONOGRAPHY

No icon assets were provided. For implementation:

- **Recommended**: Use [Lucide Icons](https://lucide.dev) (CDN: `https://unpkg.com/lucide@latest`) — clean, consistent stroke style that matches the formal aesthetic
- **Style**: 1.5px stroke, 24px default size
- **Color**: Inherit from text color or use neutral-600
- **Emoji**: Never used in OJK interfaces
- No custom icon font or SVG sprites were provided

⚠️ **Substitution notice**: No OJK-specific icons were available. Lucide is recommended as a placeholder; replace with official OJK iconography when available.

---

✅ **Resolved**: Myriad Pro font files have been provided and are loaded from `fonts/` via `@font-face` declarations in `colors_and_type.css`.

---

## File Index

```
├── README.md                    ← You are here
├── SKILL.md                     ← Agent skill definition
├── colors_and_type.css          ← CSS custom properties (colors, type, spacing, shadows)
├── preview/                     ← Design System tab preview cards
│   ├── primary-colors.html      ← Core palette swatches
│   ├── color-scales.html        ← Primary/Secondary/Neutral 50–900
│   ├── semantic-tokens.html     ← Semantic color tokens
│   ├── type-headings.html       ← H1–H6 specimens
│   ├── type-body-ui.html        ← Body, button, caption, label text
│   ├── spacing.html             ← Spacing scale visualization
│   ├── radii-shadows.html       ← Border radius & elevation system
│   ├── buttons.html             ← Button variants
│   ├── form-inputs.html         ← Input, select, error states
│   ├── cards-badges.html        ← Card variants & badge system
│   ├── navbar.html              ← Navigation bar
│   └── alerts.html              ← Alert/notification variants
└── ui_kits/
    └── portal/                  ← OJK Portal web app UI kit
        ├── index.html           ← Interactive prototype
        ├── App.jsx              ← React components (Navbar, Hero, Cards, Table, Footer)
        └── README.md            ← UI kit documentation
```

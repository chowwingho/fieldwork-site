# Many Roads AI

## Overview
Two website template variants built with React 19, Next.js 15 (App Router), and Tailwind CSS v4:
- **V1** (`/v1`) — Legacy architecture firm template, in `FieldworkV1.jsx`
- **V2** (`/v2`) — AI coding tools consultancy (Many Roads AI / MRAI), in `ManyroadsV2.jsx`

An index page at `/` links to both variants. A design system reference lives at `/design-system`.

## Repository & Deployment
- **GitHub:** https://github.com/chowwingho/manyroads-ai
- **Branch:** `main`
- **Hosting:** Vercel — Next.js has native Vercel support (no `vercel.json` needed)

## Tech Stack
- **React 19** + **Next.js 15** (App Router with file-based routing)
- **Tailwind CSS v4** — via `@tailwindcss/postcss` plugin, imported in `globals.css`
- **Lenis** — smooth/inertial scrolling via `LenisScroll.jsx` client component (`'use client'` + `useEffect` + `requestAnimationFrame` loop)
- **Geist** — `geist` npm package, fonts copied to `src/fonts/` and loaded via `@font-face` in `globals.css`

## Project Structure
```
src/
  app/
    layout.jsx            # Root layout — globals.css import, LenisScroll, metadata
    page.jsx              # Index page (/) — links to V1/V2
    globals.css           # Tailwind import, @font-face, dark mode variant, utility classes
    v1/page.jsx           # /v1 route — imports FieldworkV1
    v2/layout.jsx         # /v2 metadata (title)
    v2/page.jsx           # /v2 route — imports ManyroadsV2
    design-system/layout.jsx  # /design-system metadata (title)
    design-system/page.jsx    # /design-system route — imports DesignSystemPage
  FieldworkV1.jsx         # V1 — legacy architecture firm template ('use client')
  ManyroadsV2.jsx         # V2 — Many Roads AI (site v1.7) ('use client')
  views/
    DesignSystemPage.jsx  # Design system reference page ('use client')
  components/
    LenisScroll.jsx       # Lenis smooth scroll client component
    design-system/        # Design system section components
  tokens/tokens.css       # CSS custom property color tokens (light/dark)
  fonts/                  # Geist Sans + Geist Mono woff2 variable fonts
next.config.mjs           # Next.js configuration
postcss.config.mjs        # Tailwind CSS v4 via @tailwindcss/postcss
color-tokens.md           # Detailed color token reference
```

## Fonts
- **Geist Sans** — body text and headings. Applied via inline style `fontFamily: '"Geist Sans", sans-serif'` on the root div, plus `h1, h2, h3` rule in `globals.css`
- **Geist Mono** — UI accents: nav links, section labels (`SectionLabel`), CTA buttons (`PrimaryButton`, `TypewriterButton`), pathway card buttons, tech stack badges, logo, dark mode toggle, footer nav/social links. Applied via `const MONO = { fontFamily: '"Geist Mono", monospace' }` inline style
- Both loaded from `src/fonts/` via `@font-face` in `globals.css`
- **Satoshi** — loaded via `@import url()` in `globals.css`, used by V1 and the index page

## Dark Mode (V2 only)
- **Strategy:** class-based via `@custom-variant dark (&:where(.dark, .dark *));` in `globals.css`
- **State:** `useState` with SSR-safe lazy initializer (`typeof window === 'undefined'` guard). A `useEffect` toggles the `.dark` class on `document.documentElement` whenever the state changes
- **Toggle:** `[ dark_ ]` / `[ light_ ]` button in the navbar — `text-sm`, border, rounded, Geist Mono

### Color Tokens (Light / Dark)

| Element              | Light              | Dark                |
|----------------------|--------------------|---------------------|
| Page bg / navbar bg  | `#FAF9F6`          | `#1A1A18`           |
| Card fills / badges  | `#F0EEE6`          | `#262624`           |
| Primary text         | `#262625`          | `#ECECEA`           |
| Muted text           | `#888888`          | `#ECECEA` at 50%    |
| Borders / dividers   | `#262625` at 12%   | `#ECECEA` at 10%    |
| Primary button fill  | `#E8E6DD`          | `#333331`           |
| Primary button hover | `#DEDAD0`          | `#3D3D3A`           |
| Pathway button fill  | `#D1CFC6`          | `#3D3D3A`           |
| Pathway button hover | `#C5C3BA`          | `#4A4A47`           |
| Footer bg            | `#262625`          | `#111110`           |
| Footer subtitle      | `white` at 60%     | `white` at 60%      |
| Footer divider       | `white` at 15%     | `white` at 15%      |

Full reference with per-element mapping: `color-tokens.md`

## Type Scale

7 tiers, applied via Tailwind utility classes:

| Size      | Tailwind Class  | Usage                                                    |
|-----------|-----------------|----------------------------------------------------------|
| **56px**  | `text-[56px]`   | Hero H1                                                  |
| **48px**  | `text-5xl`      | Stat display values (73%, 6–12mo, 80/20, 0)             |
| **36px**  | `text-[36px]`   | Section H2 headings, footer headline                     |
| **24px**  | `text-2xl`      | Card titles (Trailhead, Wayfinder), testimonial quotes   |
| **20px**  | `text-xl`       | Subheadings: stat labels, pathway subtitles, team names, credibility titles, "That's the work we do" |
| **17px**  | `text-[17px]`   | Body text: descriptions, paragraphs, bios, testimonial attributions, footer subtitle |
| **14px**  | `text-sm`       | UI elements: dark mode toggle, tech stack badges, LinkedIn links |

Elements intentionally kept at `text-lg` (18px): `SectionLabel`, navbar logo, navbar links, `SecondaryLink`, `PrimaryButton`, `TypewriterButton`, pathway card buttons, "or talk to our team" links, service card numbers/titles, footer contact labels/values, footer nav/social links.

## Layout
- All sections use `max-w-[1280px] mx-auto` inner container with responsive padding (`px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12`)
- Background colors remain full-width on outer `<section>`/`<footer>` elements
- Responsive breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Hamburger navigation below md (768px)

## V2 Section Structure

| # | Component            | Label                       | Description                                              |
|---|----------------------|-----------------------------|----------------------------------------------------------|
| — | `Navbar`             | —                           | Sticky. `Many_Roads <AI>` logo + nav links + dark toggle |
| — | `HeroSection`        | —                           | 2-col: headline + TypewriterButton CTA / supporting copy |
| 1 | `AboutSection`       | `// 01 — THE_PROBLEM`      | 2-col: problem narrative + 4 stat cards (4-col grid)     |
| 2 | `ServicesSection`    | `// 02 — WHY_TEAMS_STALL`  | 5-col grid: label / gutter / 4 problem cards (2×2)       |
| 3 | `PathwaysSection`    | `// 03 — TWO_PATHWAYS`     | 2-col header + 2 product cards (Trailhead + Wayfinder)   |
| 4 | `TeamSection`        | `// 04 — THE_TEAM`         | 2-col: label+heading / 3 bios + tech badges              |
| 5 | `CredibilitySection` | `// 05 — WHY_TRUST_US`     | Sidebar label + methodology/open-source/focus + 2 quotes |
| — | `Footer`             | —                           | Dark bg, dual CTAs, contact, nav, social, MANYROADS mark |

## V2 Design Conventions
- **Section labels:** code-style `// 0X — LABEL_NAME` format in Geist Mono via `SectionLabel` component
- **CTA buttons:** trailing underscore replaces arrow icon (e.g., `See where you stand_`). Uses `.blink-cursor` animation (1s ease-in-out infinite) defined in `globals.css`
- **TypewriterButton:** hero CTA that cycles through 3 phrases ("See where you stand", "Run the assessment", "Start here") using a ref-based 4-phase state machine (typing → pause → erasing → pauseNext). Timing: 50ms type, 4s pause, 30ms erase, 600ms between phrases, 400ms initial delay
- **PrimaryButton:** static CTA, no arrow icon, Geist Mono, `w-fit`
- **LinkedIn links:** `LinkedIn ↗` in Geist Mono `text-sm` after each team bio
- **Logo:** `Many_Roads <AI>` — underscore and angle brackets are intentional brand elements
- **Dark mode toggle:** `[ dark_ ]` / `[ light_ ]` with bracket notation and trailing underscore
- **Wordmark:** `MANYROADS` in footer at `clamp(80px, 15vw, 200px)`

## V2 Data Constants
- `STATS` — 4 stat cards: 73%, 6–12mo, 80/20, 0
- `SERVICES` — 4 problem cards with (01)–(04) numbering
- `NAV_LINKS` — Trailhead, Wayfinder, Team, Contact
- `FOOTER_NAV` — same as NAV_LINKS
- `FOOTER_SOCIAL` — Twitter, Instagram, YouTube
- `HERO_PHRASES` — 3 typewriter phrases

## Notes
- **Asset URLs:** `ASSETS` object contains temporary Figma CDN URLs (expire ~7 days). Replace before deploying
- **SSR:** All pages are statically prerendered at build time. Components using hooks/browser APIs have `'use client'` directives. `useState` initializers that access `window` or `localStorage` include `typeof window === 'undefined'` guards
- **V1 naming:** `FieldworkV1.jsx` retains "Fieldwork" branding as it's the original architecture firm template

## Commands
```bash
npm install    # Install dependencies
npm run dev    # Next.js dev server (port 3000)
npm run build  # Production build
npm start      # Serve production build (port 3000)
npm run lint   # ESLint
```

---

## Design System Rules

**These rules are mandatory for all code generation in this project. Violations (hardcoded colors, wrong fonts, skipped tokens) must be caught and corrected before any code is considered complete.**

### Rule 1: Always Use Design Tokens

The single source of truth is `src/tokens/tokens.css`. Every visual value — color, spacing, shadow, radius, font family — must reference a `--mr-*` CSS custom property. Never hardcode hex values, rgba values, or raw pixel values that have a corresponding token.

```css
/* ✅ Correct */
background-color: var(--mr-bg-card);
color: var(--mr-text-primary);
padding: var(--mr-space-sm);
border-radius: var(--mr-radius-md);
box-shadow: var(--mr-shadow-md);

/* ❌ Wrong — hardcoded values */
background-color: #F0EEE6;
color: #262625;
padding: 24px;
border-radius: 8px;
box-shadow: 0 4px 12px rgba(38, 38, 37, 0.08);
```

When applying tokens in JSX, use inline styles or Tailwind arbitrary values:
```jsx
// Inline style
<div style={{ backgroundColor: 'var(--mr-bg-card)' }}>

// Tailwind arbitrary value
<div className="bg-[var(--mr-bg-card)]">
```

### Rule 2: Available Token Reference

**Colors (auto-switch between light/dark via `data-theme`):**
- Backgrounds: `--mr-bg-page`, `--mr-bg-card`, `--mr-bg-button-primary`, `--mr-bg-button-pathway`
- Text: `--mr-text-primary`, `--mr-text-muted`
- Interactive: `--mr-hover-primary`, `--mr-hover-pathway`
- Borders: `--mr-border-default`
- Footer: `--mr-footer-bg`, `--mr-footer-text`, `--mr-footer-sub`, `--mr-footer-divider`
- Accent: `--mr-accent-subtle`, `--mr-accent-default`, `--mr-accent-hover`, `--mr-accent-active`, `--mr-accent-on` (brand green scale — auto-switches light/dark)
- Status: `--mr-status-positive`, `--mr-status-warning`, `--mr-status-critical`, `--mr-status-neutral`

**Form inputs:**
- `--mr-input-bg`, `--mr-input-border`, `--mr-input-border-focus`, `--mr-input-border-error`
- `--mr-input-text`, `--mr-input-placeholder`, `--mr-input-disabled-opacity`
- `--mr-input-padding-x` (16px), `--mr-input-padding-y` (12px), `--mr-input-radius`

**Typography:**
- `--mr-font-display` — Geist Sans stack (headings)
- `--mr-font-body` — Geist Sans stack (body text)
- `--mr-font-mono` — Geist Mono stack (UI accents, labels, buttons, nav)

**Spacing:**
- `--mr-space-xs` (16px), `--mr-space-sm` (24px), `--mr-space-md` (32px)
- `--mr-space-lg` (48px), `--mr-space-xl` (80px), `--mr-space-2xl` (120px)

**Other:**
- Radius: `--mr-radius-sm` (4px), `--mr-radius-md` (8px), `--mr-radius-lg` (12px), `--mr-radius-full`
- Shadows: `--mr-shadow-sm`, `--mr-shadow-md`, `--mr-shadow-lg`
- Motion: `--mr-transition-fast` (150ms), `--mr-transition-base` (250ms), `--mr-transition-slow` (400ms)
- Grid: `--mr-max-width` (1280px), `--mr-grid-columns` (12), `--mr-grid-gutter` (24px)

### Rule 3: Font Usage

- **Geist Sans** (`--mr-font-display` / `--mr-font-body`) — all body text and headings
- **Geist Mono** (`--mr-font-mono`) — nav links, section labels, CTA buttons, badges, logo, toggle, footer nav/social. Applied via the shared `MONO` constant from `src/components/design-system/constants.js`

Never introduce additional fonts without explicit approval.

### Rule 4: Dark Mode

- Dark mode is controlled by `data-theme="dark"` on `<html>` plus `.dark` class for Tailwind
- All color tokens auto-switch between light and dark — no separate dark mode styles needed if tokens are used correctly
- New color values must be added to **both** light and dark sections in `tokens.css`
- Test both modes when adding or modifying any visual element

### Rule 5: Component Patterns

When building new components, follow these existing patterns:

- **Section wrapper:** Full-width outer `<section>` for background color, inner `<div>` with `max-w-[1280px] mx-auto` and responsive padding
- **Section labels:** Use the `SectionLabel` component with `// 0X — LABEL_NAME` format
- **Buttons:** Use `PrimaryButton` for standard CTAs, pathway-style for secondary actions. Always Geist Mono, trailing underscore, no arrow icons
- **Cards:** Use `--mr-bg-card` background, `--mr-border-default` border, `--mr-radius-md` corners
- **Links:** External links use `↗` suffix in Geist Mono `text-sm`
- **Responsive:** Mobile-first with Tailwind breakpoints (sm/md/lg/xl). Navigation collapses to hamburger below `md`

### Rule 6: CSS Utility Classes

Six hover-state utility classes are defined in `globals.css`. Use these instead of writing inline hover styles:
- `.mr-btn-primary` — primary button hover
- `.mr-btn-pathway` — pathway button hover
- `.mr-btn-toggle` — dark mode toggle hover
- `.mr-link-nav` — nav link hover
- `.mr-link-muted` — muted link hover
- `.mr-link-footer` — footer link hover

### Rule 7: New Tokens

If a design requires a value not covered by existing tokens:
1. Add the new `--mr-*` token to `src/tokens/tokens.css` in both light and dark sections
2. Use the naming convention: `--mr-{category}-{element}` (e.g., `--mr-bg-sidebar`, `--mr-text-accent`)
3. Never skip this step and hardcode the value "for now" — add the token first, then use it

### Rule 8: Accessibility

- Minimum contrast: 4.5:1 for body text, 3:1 for large text (18px+) and UI elements
- Never use color as the sole indicator of state — combine with text, icons, or borders
- All interactive elements need visible focus states
- Form inputs follow the token pattern in `tokens.css` (focus ring = `--mr-input-border-focus`)

### Rule 9: Self-Check Before Submitting Code

Before finalizing any code change, verify:
- [ ] No hardcoded color values — all colors use `var(--mr-*)` tokens
- [ ] No hardcoded font families — use `--mr-font-display`, `--mr-font-body`, or `--mr-font-mono`
- [ ] Dark mode works — toggle and confirm both themes render correctly
- [ ] Responsive — check mobile (375px), tablet (768px), and desktop (1280px)
- [ ] New tokens (if any) added to both light and dark in `tokens.css`

# Fieldwork Site

## Overview
Two template variants built with React + Tailwind CSS v4:
- **V1** (`/v1`) — Original architecture firm template (Fieldwork)
- **V2** (`/v2`) — AI coding tools consultancy (Many Roads AI / MRAI)

An index page at `/` links to both variants.

## Tech Stack
- **React 19** + **Vite 7**
- **Tailwind CSS v4** (via `@tailwindcss/vite` plugin)
- **React Router v7** — client-side routing (`/`, `/v1`, `/v2`)
- **Lenis** — smooth/inertial scrolling (initialized in `main.jsx`)
- **Geist** — `geist` npm package for Geist Sans + Geist Mono fonts (loaded via `@font-face` in `index.css`)

## Repository
- **GitHub:** https://github.com/chowwingho/fieldwork-site
- **Branch:** `main`

## Project Structure
```
src/
  main.jsx              # Entry point (Lenis init)
  App.jsx               # Router — /, /v1, /v2
  index.css             # Tailwind import, @font-face, dark mode variant
  IndexPage.jsx         # Landing page with links to V1/V2
  FieldworkTemplate.jsx # V1 — architecture firm template
  FieldworkV2.jsx       # V2 — Many Roads AI template
```

## Fonts
- **Geist Sans** — body text and headings (`fontFamily: '"Geist Sans", sans-serif'` on root div)
- **Geist Mono** — accents: nav links, section labels, CTA buttons, badges, logo, dark mode toggle (applied via `const MONO = { fontFamily: '"Geist Mono", monospace' }` inline style)
- Both loaded from `node_modules/geist` via `@font-face` in `index.css`

## Dark Mode (V2 only)
- **Strategy:** class-based via `@custom-variant dark (&:where(.dark, .dark *));` in `index.css`
- **State:** `useState` initialized from `window.matchMedia("(prefers-color-scheme: dark)")`, toggles `.dark` class on `document.documentElement` via `useEffect`
- **Toggle:** `[ dark_ ]` / `[ light_ ]` button in navbar

### Color Tokens (Light / Dark)
| Element          | Light              | Dark                |
|------------------|--------------------|---------------------|
| Page bg          | `#FAF9F6`          | `#1A1A18`           |
| Card fills       | `#F0EEE6`          | `#262624`           |
| Primary text     | `#262625`          | `#ECECEA`           |
| Muted text       | `#888888`          | `#ECECEA` at 50%    |
| Borders          | `#262625` at 12%   | `#ECECEA` at 10%    |
| Primary buttons  | `#E8E6DD`          | `#333331`           |
| Pathway buttons  | `#D1CFC6`          | `#3D3D3A`           |
| Footer bg        | `#262625`          | `#111110`           |
| Navbar bg        | `#FAF9F6`          | `#1A1A18`           |

## Layout
- All sections use `max-w-[1280px] mx-auto px-12` inner container
- Background colors remain full-width on outer `<section>`/`<footer>` elements

## V2 Section Structure
1. **Navbar** — sticky, `Many_Roads <AI>` logo + nav links (Trailhead, Wayfinder, Team, Contact) + dark mode toggle
2. **Hero** — headline ("You bought your team AI coding tools...") + CTA with trailing underscore
3. **About** (`// 01 — THE_PROBLEM`) — problem narrative + 4 stats (73%, 6-12mo, 80/20, 0)
4. **Services** (`// 02 — WHY_TEAMS_STALL`) — 5-col grid, 4 problem cards
5. **Pathways** (`// 03 — TWO_PATHWAYS`) — two product cards: Trailhead (free assessment) + Wayfinder (consulting)
6. **Team** (`// 04 — THE_TEAM`) — 3 bios (Susan, Jeff, Spencer) with LinkedIn links + tech stack badges
7. **Credibility** (`// 05 — WHY_TRUST_US`) — methodology/open-source/focus + 2 testimonials
8. **Footer** — dark bg, dual CTAs, contact info, nav, social, MANYROADS wordmark

## V2 Design Conventions
- **Section labels:** code-style `// 0X — LABEL_NAME` format in Geist Mono
- **CTA buttons:** trailing underscore replaces arrow icon (e.g., "See where you stand_")
- **PrimaryButton:** no arrow icon, Geist Mono, `w-fit`
- **LinkedIn links:** `LinkedIn ↗` in Geist Mono text-sm after each team bio

## Notes
- Image assets are temporary Figma CDN URLs (expire ~7 days). Replace before deploying.
- Desktop-only layout — no responsive breakpoints yet.
- V2 still contains unused V1 data arrays (PROJECTS, TESTIMONIALS, FAQ_ITEMS) that can be cleaned up.

## Commands
```bash
npm install    # Install dependencies
npm run dev    # Start dev server
npm run build  # Production build
```

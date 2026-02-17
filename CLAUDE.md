# Fieldwork — Architecture Studio Website

## Overview
A single-page architecture firm website template, originally designed in Figma and converted to React + Tailwind CSS v4.

## Tech Stack
- **React 19** + **Vite 6**
- **Tailwind CSS v4** (via `@tailwindcss/vite` plugin)
- **Satoshi** font (loaded via Fontshare CDN)

## Project Structure
```
src/
  main.jsx              # Entry point
  App.jsx               # Root component
  index.css             # Tailwind import
  FieldworkTemplate.jsx # Full page template (all sections)
```

## Design Tokens
- **Background:** `#FAF9F6` (warm off-white)
- **Primary text:** `#262625`
- **Muted text:** `#262625` at 60% opacity
- **Borders:** `#262625` at 12% opacity
- **Footer:** `#262625` bg with white text
- **Font:** Satoshi (weights 400, 500, 700)

## Sections
1. **Navbar** — sticky, logo + nav links
2. **Hero** — headline + description + full-width image
3. **About** — 2-col with stats row (4-col grid)
4. **Services** — 5-col grid (label | gutter | 3-col content), 2x2 service cards
5. **Work** — project list with thumbnails
6. **Clients** — 5-col grid layout, 2 testimonials
7. **FAQ** — accordion with animated open/close
8. **Footer** — dark, CTA + contact info + nav + large wordmark

## Notes
- Image assets are temporary Figma CDN URLs (expire in ~7 days). Replace with hosted versions.
- No responsive/mobile breakpoints yet — desktop-only at 1280px+ width.
- FAQ answers contain placeholder lorem ipsum text.

## Commands
```bash
npm install    # Install dependencies
npm run dev    # Start dev server
npm run build  # Production build
```

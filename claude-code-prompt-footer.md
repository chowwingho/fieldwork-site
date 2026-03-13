# Claude Code Prompt: Replace Footer with Animated Dithered Topo Map Footer

## What to build

Replace the existing `Footer` component in `ManyroadsV3.jsx` with a new footer that has two sections: a Mode Designs–style upper area (newsletter signup + four columns of navigation links) followed by a full-width animated dithered topographic map that disperses upward like a particle effect.

A working prototype is attached at `mrai-footer-mockup.jsx` — use it as the reference implementation. This spec explains how to adapt it to the existing codebase conventions.

## Files to create

### `src/components/TopoCanvas.jsx`

A `'use client'` component that renders an animated, dithered topographic map on a `<canvas>` element. This is the computationally interesting part, so it should be its own file.

**Props:**
```jsx
{ height = 750 }  // canvas height in pixels
```

**How the rendering works (port from prototype):**

1. **Perlin noise terrain generation.** Use a seeded Perlin noise implementation (seed `42`) with fractal Brownian motion (3 octaves) to generate a slowly drifting elevation map. The terrain pans at `0.03` units/sec on X and `0.015` on Y. Add one broad ridge feature using a second noise read. The low octave count and low frequency (`2.5` on X, `1.8` on Y) produce broad, readable landforms — not fine-grained noise.

2. **Contour line detection.** 8 contour levels with a detection width of `0.018`. Every other contour is a "major" contour that gets expanded by 1 pixel in all directions (mark neighboring cells) to create thick/thin alternation like a real USGS topo map.

3. **Elevation banding.** Brightness is quantized into 6 discrete bands (60% banded, 40% smooth blend) so there are visible tonal steps between contour lines. Mapped to range `0.3–0.85`.

4. **Bayer 4×4 ordered dithering.** Two-color rendering: flat background fill, then foreground dots drawn where `brightness < 1 - bayerThreshold`. Contour lines (both minor and major-expanded) are always drawn as solid dots. Dot size is 3px with a 1px gap between dots (creating the distinctive separated-pixel texture from the dither prototype).

5. **Vertical dispersion.** The bottom 75% of the canvas is fully dense. The top 25% tapers off using a `pow(taperNorm, 1.5)` curve with noise-driven edge variation (3 octaves of dispersion noise at different frequencies). This creates a ragged, organic boundary where dots thin out — like particles dispersing upward from a solid surface.

6. **Color palette.** Background: `#262625` (matches `var(--mr-footer-bg)` / dark footer bg). Foreground dots: `#e8e0d0` (warm cream). These are hardcoded since the footer is always dark regardless of site theme.

7. **Animation.** Runs via `requestAnimationFrame`. Recalculates and redraws every frame. Handles window resize by re-rendering at the new container width. Canvas uses `imageRendering: pixelated` to keep dots crisp.

8. **Overlay metadata.** Positioned absolutely at the bottom of the canvas:
   - Left: `// TERRAIN_MAP_01` label + `43.7615°N · 79.4111°W · elev. 0–1440m` coordinates
   - Right: `v2.1.0`
   - All in Geist Mono, using cream color at low opacity (`rgba(232,224,208, 0.35/0.2/0.15)`)

**The full Perlin noise, FBM, and Bayer matrix code can be copied directly from the prototype file.** The `createNoise`, `fbm`, and `BAYER4` implementations are self-contained pure functions with no dependencies.

---

## Files to modify

### `src/ManyroadsV3.jsx`

#### 1. Update footer navigation data (near line 72)

Replace the existing `FOOTER_NAV` and `FOOTER_SOCIAL` constants with a single `FOOTER_COLUMNS` array:

```jsx
const FOOTER_COLUMNS = [
  {
    title: "Services",
    links: ["Trailhead", "Wayfinder", "Training", "Assessment"],
  },
  {
    title: "Company",
    links: ["About", "Team", "Changelog", "Careers"],
  },
  {
    title: "Community",
    links: ["GitHub", "Discord", "Twitter", "YouTube"],
  },
  {
    title: "Resources",
    links: ["Documentation", "Case Studies", "Blog", "Contact"],
  },
];
```

#### 2. Replace the `Footer` component (starts at line ~583)

Replace the entire `function Footer()` with a new implementation. The new footer has two parts:

**Part A: Upper content area** — a 5-column grid (1 newsletter column + 4 nav columns) using the existing footer token colors.

Left column (newsletter):
- `MRAI` heading in Geist Sans, ~28–40px (use `text-2xl md:text-3xl lg:text-[40px]`)
- Description paragraph: "Sign up for dispatches on AI adoption, engineering culture, and what we're learning."
- Email input + `Subscribe_` button (button in Geist Mono with accent green background `var(--mr-accent-default)`)
- Copyright line: `© 2026 MANY ROADS AI. ALL RIGHTS RESERVED.` in Geist Mono, small, muted

Four nav columns:
- Column title in Geist Sans, 16px, `var(--mr-footer-text)`
- Links in Geist Mono, 14px, `var(--mr-footer-sub)`, hover to `var(--mr-footer-text)`

Grid layout: `grid-cols-1` on mobile, `grid-cols-5` (first column `col-span-1`) on `md:` breakpoint. Gap of 32px on desktop, 48px on mobile (stacked).

Padding: `py-20 md:py-24` top/bottom, standard horizontal padding matching other sections (`px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12`), max-width `1280px`.

**Part B: Topo map** — render `<TopoCanvas height={750} />` directly after the upper content, still inside the `<footer>` element. Full width, no horizontal padding.

The footer background is `var(--mr-footer-bg)` (always `#262625` dark). The canvas background matches this, so the topo map's dense bottom region blends seamlessly.

#### 3. Add import

At the top of the file:
```jsx
import TopoCanvas from './components/TopoCanvas'
```

#### 4. Add email state

The newsletter input needs state. Add `const [email, setEmail] = useState("")` inside the `Footer` component. Since `Footer` is already rendered inside a `'use client'` component, this is fine — but the `Footer` function itself will need to manage its own state now. Convert it to use hooks:

```jsx
function Footer() {
  const [email, setEmail] = useState("");
  // ... rest of component
}
```

---

### `src/app/globals.css`

Add footer-specific utility classes at the bottom:

```css
/* Footer newsletter */
.mr-footer-input {
  background: rgba(255, 255, 255, 0.04);
  border: none;
  color: var(--mr-footer-text);
  transition: border-color 250ms ease;
}

.mr-footer-input::placeholder {
  color: rgba(255, 255, 255, 0.3);
}

.mr-footer-input-wrap {
  border: 1px solid var(--mr-footer-divider);
  border-radius: var(--mr-radius-md);
  overflow: hidden;
  display: flex;
  transition: border-color 250ms ease;
}

.mr-footer-input-wrap:focus-within {
  border-color: rgba(255, 255, 255, 0.2);
}

.mr-footer-subscribe {
  background: var(--mr-accent-default);
  color: white;
  border: none;
  transition: background-color var(--mr-transition-fast);
}

.mr-footer-subscribe:hover {
  background: var(--mr-accent-hover);
}

.mr-footer-link {
  color: var(--mr-footer-sub);
  transition: color var(--mr-transition-fast);
}

.mr-footer-link:hover {
  color: var(--mr-footer-text);
}
```

---

## What NOT to do

- Don't install any npm packages — the noise/dithering is all pure math
- Don't modify `tokens.css`
- Don't use `localStorage` or `sessionStorage`
- Don't add external font imports (Geist fonts are already loaded)
- Don't use `dangerouslySetInnerHTML`
- Don't make the canvas or footer respect light/dark theme — the footer and topo map are always dark
- Don't add the wordmark row between the nav columns and the topo map — the nav goes directly into the map

## Reference file

The prototype at `mrai-footer-mockup.jsx` contains the complete working implementation including all noise functions, the dithering algorithm, the dispersion logic, and the canvas rendering. The core algorithms (`createNoise`, `fbm`, `BAYER4`, and the entire `render` function inside `TopoCanvas`) should be ported directly — they are tested and working. The main adaptation work is replacing hardcoded styles with the token system and integrating with the existing component structure.

## Verification

- Visit `/v3` and scroll to the bottom
- Footer shows: newsletter signup (left) + 4 nav columns (right) on desktop, stacked on mobile
- Below the nav content, the animated topo map fills full width at 750px tall
- The bottom ~75% of the map is dense with visible contour lines and elevation banding
- The top ~25% tapers off with a ragged, noise-driven edge
- Dots are cream-colored on the dark footer background
- The map slowly drifts/animates
- `// TERRAIN_MAP_01` and coordinates visible at bottom-left of the map
- The map's dark background blends seamlessly with the footer above it (no visible seam)
- Email input accepts text, Subscribe button has hover state
- Nav links have hover transition from muted to white
- Footer looks correct on mobile (columns stack vertically)
- No performance issues — canvas animation runs smoothly at 60fps

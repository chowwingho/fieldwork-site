# Many Roads AI — Design System Reference

**Version:** 1.9 · **Updated:** 2026-03-02 · **Fonts:** Geist Sans + Geist Mono

This document is the standalone reference for building pages and components that are visually consistent with the Many Roads AI site. All visual values come from CSS custom properties defined in `src/tokens/tokens.css`. Never hardcode hex values — always use `var(--mr-*)` tokens.

---

## 1. Color System

All colors auto-switch between light and dark via `data-theme` on `<html>`. Tokens are defined in `src/tokens/tokens.css`.

### Backgrounds

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `--mr-bg-page` | `#FAF9F6` | `#1A1A18` | Page background, navbar background |
| `--mr-bg-card` | `#F0EEE6` | `#262624` | Card fills, badge backgrounds, toggle hover |
| `--mr-bg-card-elevated` | `#EBEAE5` | `#2E2E2C` | Elevated card surfaces (hover, nested) |
| `--mr-bg-button-primary` | `#E8E6DD` | `#333331` | Primary button fill, image placeholder fill |
| `--mr-bg-button-pathway` | `#D1CFC6` | `#3D3D3A` | Secondary/pathway button fill |

### Text

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `--mr-text-primary` | `#262625` | `#ECECEA` | Headings, body text, labels, button text |
| `--mr-text-muted` | `#888888` | `rgba(236,236,234,0.5)` | Nav links, descriptions, captions, placeholders |

### Interactive

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `--mr-hover-primary` | `#DEDAD0` | `#3D3D3A` | Primary button hover |
| `--mr-hover-pathway` | `#C5C3BA` | `#4A4A47` | Pathway button hover |

### Borders

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `--mr-border-default` | `rgba(38,38,37,0.12)` | `rgba(236,236,234,0.1)` | Section dividers, card borders, input borders |

### Footer (always dark-toned)

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `--mr-footer-bg` | `#262625` | `#111110` | Footer background |
| `--mr-footer-text` | `#FFFFFF` | `#FFFFFF` | Footer headings, links, wordmark |
| `--mr-footer-sub` | `rgba(255,255,255,0.6)` | `rgba(255,255,255,0.6)` | Footer column headings, copyright |
| `--mr-footer-divider` | `rgba(255,255,255,0.15)` | `rgba(255,255,255,0.15)` | Footer horizontal rule |

### Accent Scale (Brand Green)

Dark mode variants are lighter to maintain contrast on dark backgrounds.

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `--mr-accent-subtle` | `#E7ECE3` | `rgba(61,122,65,0.12)` | Tinted backgrounds, selected row bg |
| `--mr-accent-default` | `#3D7A41` | `#6F9C72` | Links, `//` markers, active indicators |
| `--mr-accent-hover` | `#336737` | `#5E8B61` | Hover on accent elements |
| `--mr-accent-active` | `#2B572E` | `#4E7A51` | Pressed/active state |
| `--mr-accent-on` | `#FFFFFF` | `#FFFFFF` | Text on filled accent backgrounds |

### User-Selectable Accent (per-page CSS variable)

Pages support a swappable accent color via `--accent` and `--accent-hover` CSS custom properties on the root `<div>`. The navbar includes an accent picker with 5 presets:

```js
const ACCENT_OPTIONS = [
  { color: "#3D7A41", name: "Green" },
  { color: "#8A708A", name: "Mauve" },
  { color: "#4F769A", name: "Blue" },
  { color: "#C47030", name: "Orange" },
  { color: "#B8892A", name: "Amber" },
];
```

`--accent` is used by `SectionLabel` (for the `//` markers) and accent-colored links. `--accent-hover` is computed via `darkenColor()` (multiply each RGB channel by 0.85).

### Status Colors

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `--mr-status-positive` | `#3D7A41` | `#4A9A50` | Success states |
| `--mr-status-warning` | `#C47030` | `#D4833A` | Warning states |
| `--mr-status-critical` | `#B5382A` | `#D04A3A` | Error states |
| `--mr-status-neutral` | `var(--mr-text-muted)` | `var(--mr-text-muted)` | Informational |

### Shadows

| Token | Light | Dark |
|-------|-------|------|
| `--mr-shadow-sm` | `0 1px 2px rgba(38,38,37,0.05)` | `0 1px 2px rgba(0,0,0,0.2)` |
| `--mr-shadow-md` | `0 4px 12px rgba(38,38,37,0.08)` | `0 4px 12px rgba(0,0,0,0.3)` |
| `--mr-shadow-lg` | `0 8px 24px rgba(38,38,37,0.12)` | `0 8px 24px rgba(0,0,0,0.4)` |

### Form Inputs

| Token | Value | Usage |
|-------|-------|-------|
| `--mr-input-bg` | `var(--mr-bg-page)` | Input background |
| `--mr-input-border` | `var(--mr-border-default)` | Default input border |
| `--mr-input-border-focus` | `var(--mr-text-primary)` | Focused input border |
| `--mr-input-border-error` | `var(--mr-status-critical)` | Error input border |
| `--mr-input-text` | `var(--mr-text-primary)` | Input text color |
| `--mr-input-placeholder` | `var(--mr-text-muted)` | Placeholder text |
| `--mr-input-disabled-opacity` | `0.4` | Disabled state opacity |
| `--mr-input-padding-x` | `16px` | Horizontal padding |
| `--mr-input-padding-y` | `12px` | Vertical padding |
| `--mr-input-radius` | `var(--mr-radius-md)` | Border radius |

---

## 2. Typography

### Font Families

| Token | Stack | Usage |
|-------|-------|-------|
| `--mr-font-display` | `'Geist Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif` | Headings |
| `--mr-font-body` | Same as display | Body text |
| `--mr-font-mono` | `'Geist Mono', 'SF Mono', 'Fira Code', 'Fira Mono', monospace` | UI accents (see below) |

Fonts are loaded via `@font-face` in `globals.css` from `src/fonts/` as variable-weight woff2 files (weight range 100–900). **Satoshi** is also imported (via Google Fontshare CDN) for V1 and the index page — it is not used in V2 or any Trailhead pages.

**Geist Sans** is applied via inline `fontFamily` on each page's root `<div>`:
```jsx
<div style={{ fontFamily: '"Geist Sans", sans-serif' }}>
```

Headings (`h1`, `h2`, `h3`) also have a CSS rule in `globals.css` as a safety net.

**Geist Mono** is applied via a shared constant used as an inline style:
```js
const MONO = { fontFamily: '"Geist Mono", "SF Mono", "Fira Code", "Fira Mono", monospace' };
```

### Where Geist Mono is Used

- Navbar logo (`Many_Roads <AI>`)
- Navbar links
- Section labels (`// 01 — THE_PROBLEM`)
- CTA buttons (`PrimaryButton`, `TypewriterButton`)
- Dark mode toggle (`[ dark_ ]` / `[ light_ ]`)
- Tech stack badges / area tags
- Numbered card indicators (`(01)`, `(02)`, etc.)
- Accent-colored links (`Learn more →`, `LinkedIn ↗`)
- Footer nav links, social links, column headings
- Image placeholder text

### Type Scale

| Size | Tailwind | Weight | Line Height | Usage |
|------|----------|--------|-------------|-------|
| 56px | `text-[56px]` | `font-medium` (500) | `leading-[1.15]` | Hero H1, Final CTA H2 |
| 48px | `text-5xl` | `font-medium` | — | Stat display values |
| 36px | `text-[36px]` | `font-medium` | `leading-[1.2]` | Section H2 headings |
| 24px | `text-2xl` | `font-medium` | — | Card titles, testimonial quotes |
| 20px | `text-xl` | `font-medium` | — | Subheadings, punchlines, persona card titles |
| 17px | `text-[17px]` | normal (400) | `leading-[1.6]` | Body text, descriptions, paragraphs |
| 18px | `text-lg` | `font-medium` | — | SectionLabel, nav links, buttons, step card numbers/titles |
| 14px | `text-sm` | normal/medium | — | Dark mode toggle, badges, tags, accent links |

### Responsive Heading Pattern

Headings scale across breakpoints:
```
text-2xl md:text-3xl lg:text-[36px]    — Section H2s
text-3xl sm:text-4xl lg:text-[56px]    — Hero H1 / Final CTA
```

---

## 3. Spacing & Layout

### Spacing Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--mr-space-xs` | `16px` | Tight gaps |
| `--mr-space-sm` | `24px` | Card padding, small gaps |
| `--mr-space-md` | `32px` | Medium gaps |
| `--mr-space-lg` | `48px` | Section internal spacing |
| `--mr-space-xl` | `80px` | Large section padding |
| `--mr-space-2xl` | `120px` | Hero/CTA vertical padding |

### Border Radius

| Token | Value |
|-------|-------|
| `--mr-radius-sm` | `4px` |
| `--mr-radius-md` | `8px` |
| `--mr-radius-lg` | `12px` |
| `--mr-radius-full` | `9999px` |

### Grid Tokens

| Token | Value |
|-------|-------|
| `--mr-max-width` | `1280px` |
| `--mr-grid-columns` | `12` |
| `--mr-grid-gutter` | `24px` |

### Section Wrapper Pattern

Every section follows this structure — full-width outer element for background color, constrained inner container:

```jsx
<section className="py-16 md:py-24 lg:py-32">
  <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
    <div className="pt-12 md:pt-16 lg:pt-24" style={{ borderTop: "1px solid var(--mr-border-default)" }}>
      {/* Section content */}
    </div>
  </div>
</section>
```

**Key details:**
- `max-w-[1280px] mx-auto` centers the content container
- Responsive horizontal padding: `px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12`
- All sections except HeroSection and FinalCTA have a top border as a visual separator: `borderTop: "1px solid var(--mr-border-default)"`
- Top padding after the border: `pt-12 md:pt-16 lg:pt-24`
- Vertical section padding: `py-16 md:py-24 lg:py-32` (FinalCTA uses `py-24 md:py-32 lg:py-40`)

### 2-Column Prose Layout

Used for sections with label+heading on the left and body text on the right (e.g., Problem, Transparency):

```jsx
<div className="grid grid-cols-1 md:grid-cols-12 gap-x-6">
  {/* Left: label + heading */}
  <div className="md:col-span-4">
    <SectionLabel>// 01 — THE_PROBLEM</SectionLabel>
    <h2 className="text-2xl md:text-3xl lg:text-[36px] font-medium leading-[1.2] mt-4 md:mt-12"
        style={{ color: "var(--mr-text-primary)" }}>
      Heading text.
    </h2>
  </div>
  {/* Right: prose content */}
  <div className="md:col-start-6 md:col-span-7 flex flex-col gap-6 mt-6 md:mt-0">
    <p className="text-[17px] leading-[1.6]" style={{ color: "var(--mr-text-primary)" }}>
      Body text.
    </p>
  </div>
</div>
```

The left column occupies 4/12 columns, the right starts at column 6 and spans 7 — leaving a 1-column gutter.

---

## 4. Responsive Breakpoints

Standard Tailwind breakpoints, referenced as comments in `tokens.css`:

| Breakpoint | Width | Prefix | Key Adaptations |
|------------|-------|--------|-----------------|
| Mobile | < 640px | (default) | Single-column layouts, stacked cards, hamburger nav |
| sm | 640px | `sm:` | 2-column card grids begin |
| md | 768px | `md:` | Desktop nav visible, 2-col prose layout kicks in, 12-col grid active |
| lg | 1024px | `lg:` | Larger type sizes, wider spacing |
| xl | 1280px | `xl:` | Max horizontal padding, content at full max-width |

### Navigation Breakpoint

- **< md (768px):** Hamburger menu (3-bar animated icon), mobile drawer slides down
- **≥ md:** Horizontal nav links + accent picker visible

### Card Grid Patterns

| Pattern | Mobile | sm | md+ |
|---------|--------|----|-----|
| Feature/spec cards | 1 col | 2 col | 2 col |
| Persona cards | 1 col | 1 col | 3 col |
| Step/service cards | 1 col | 1 col | 2 col (2×2) |
| Dimension cards | 1 col | 2 col | 2 col |
| Footer columns | 2 col | 3 col | 5 col |

---

## 5. Component Patterns

### SectionLabel

Code-comment-style section numbering. The `//` is rendered in the user's accent color.

```jsx
function SectionLabel({ children, align = "left" }) {
  const rendered = typeof children === "string" && children.startsWith("//")
    ? (<><span className="text-[var(--accent)]">//</span>{children.slice(2)}</>)
    : children;
  return (
    <span className={`text-base lg:text-lg font-medium tracking-normal ${align === "right" ? "text-right" : ""}`}
          style={{ ...MONO, color: "var(--mr-text-primary)" }}>
      {rendered}
    </span>
  );
}
```

**Format:** `// 01 — LABEL_NAME` (use `&mdash;` for the em dash in JSX).

### PrimaryButton

Static CTA button. Geist Mono, trailing underscore convention, no arrow icon.

```jsx
<a href="#"
   className="group inline-flex items-center gap-2 mr-btn-primary px-4 py-2 rounded-lg text-lg font-medium w-fit"
   style={MONO}>
  <span>Get Trailhead on GitHub_</span>
</a>
```

Uses the `.mr-btn-primary` utility class for hover state (see section 5.8).

### TypewriterButton (V2 Hero only)

Accent-colored button that cycles through phrases with a typing/erasing animation:
- 4-phase state machine: typing (50ms/char) → pause (4s) → erasing (30ms/char) → pauseNext (600ms)
- Blinking cursor `_` during pause phase (`.blink-cursor` animation: 1s ease-in-out infinite)
- Initial delay: 400ms

```jsx
<a href="#"
   className="inline-flex items-center text-left bg-[var(--accent)] text-white px-4 py-2 rounded-lg text-base sm:text-lg font-medium hover:bg-[var(--accent-hover)] transition-colors"
   style={MONO}>
  {text}<span className={`${paused ? "blink-cursor" : "opacity-0"} text-white`}>_</span>
</a>
```

### Cards

**Standard card styling:**
```jsx
<div className="rounded-[var(--mr-radius-md)] p-6"
     style={{ background: "var(--mr-bg-card)", border: "1px solid var(--mr-border-default)" }}>
```

**Card variants:**

| Type | Content | Grid |
|------|---------|------|
| **Feature card** | Title (`text-xl font-medium`) + muted desc + accent link + image placeholder | `grid-cols-1 sm:grid-cols-2 gap-4` |
| **Persona card** | Title (`text-xl font-medium`) + muted desc. No image, no link. | `grid-cols-1 md:grid-cols-3 gap-6` |
| **Dimension card** | Title + muted subtitle + flex-wrap area badges | `grid-cols-1 sm:grid-cols-2 gap-6` |
| **FAQ card** | Question (`text-lg font-medium`) + muted answer. Always expanded, not accordions. | `flex flex-col gap-4` |
| **Testimonial card** | Quote (`text-2xl font-medium`) + name/role + avatar placeholder circle | `grid-cols-1 md:grid-cols-2 gap-6` |
| **Built By card** | Full-width. Text col-span-2 left, image col-span-3 right. | `grid-cols-1 md:grid-cols-5 gap-6 md:gap-8` |
| **Logo bar** | Row of placeholder circles (company logos). 2-col mobile, 4-col sm, 8-col lg. | `grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4` |

**Image placeholder pattern:**
```jsx
<div className="aspect-[4/3] rounded-[var(--mr-radius-sm)] flex items-center justify-center"
     style={{ background: "var(--mr-bg-button-primary)" }}>
  <span className="text-sm" style={{ ...MONO, color: "var(--mr-text-muted)" }}>Image placeholder</span>
</div>
```

Common aspect ratios: `aspect-[16/9]` (hero, built-by), `aspect-[4/3]` (feature cards), `aspect-[3/2]` (alternate detail cards).

### Numbered Step Cards

Matches V2's ServicesSection pattern. 2×2 grid with `(01)` numbering and border-top separator:

```jsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 md:gap-x-16 gap-y-12 md:gap-y-20 mt-10 md:mt-16">
  {STEPS.map((step) => (
    <div key={step.num} className="pt-8" style={{ borderTop: "1px solid var(--mr-border-default)" }}>
      <span className="text-lg font-medium block mb-3" style={{ ...MONO, color: "var(--mr-text-primary)" }}>
        ({step.num})
      </span>
      <h3 className="text-lg font-medium mb-4" style={{ color: "var(--mr-text-primary)" }}>{step.title}</h3>
      <p className="text-[17px] leading-[1.6]" style={{ color: "var(--mr-text-muted)" }}>{step.desc}</p>
    </div>
  ))}
</div>
```

### Area Badges / Tags

Small Geist Mono labels in a flex-wrap row:

```jsx
<div className="flex flex-wrap gap-2 mt-4">
  {areas.map((area) => (
    <span key={area}
          className="text-sm px-3 py-1 rounded-[var(--mr-radius-sm)]"
          style={{ ...MONO, background: "var(--mr-bg-button-primary)", color: "var(--mr-text-primary)" }}>
      {area}
    </span>
  ))}
</div>
```

### Navbar

Sticky navigation with logo, links, accent picker, dark mode toggle, and mobile hamburger:

```jsx
<nav className="sticky top-0 z-50" style={{ background: "var(--mr-bg-page)" }}>
  <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12
                  flex items-center justify-between h-[77px]">
    {/* Logo */}
    <a href="/" className="text-lg font-medium tracking-wide"
       style={{ ...MONO, color: "var(--mr-text-primary)", textDecoration: "none" }}>
      Many_Roads &lt;AI&gt;
    </a>
    {/* Desktop nav links (hidden md:flex) */}
    {/* Accent picker (hidden md:block) */}
    {/* Dark mode toggle */}
    {/* Hamburger button (md:hidden) */}
  </div>
  {/* Mobile menu drawer (conditionally rendered) */}
</nav>
```

**Logo:** `Many_Roads <AI>` — underscore and angle brackets are intentional brand elements. Rendered as an `<a>` tag with `href` pointing to the page's own route (e.g., `/trailhead2`, `/v2`). Uses `textDecoration: "none"`.

**Dark mode toggle:** `[ dark_ ]` / `[ light_ ]` in Geist Mono `text-sm`, uses `.mr-btn-toggle` class.

**Accent picker:** Positioned `absolute right-0 top-full mt-2`, `rounded-lg p-3`, `z-50`, with `var(--mr-bg-page)` bg and `var(--mr-border-default)` border. Each color dot is a `w-5 h-5 rounded-full` button with `hover:scale-110`. Selected dot shows `outline: 2px solid {color}` with `outlineOffset: "2px"`. Hidden on mobile (`hidden md:block`).

**Hamburger:** 3 bars (`w-6 h-0.5 rounded-full`), `md:hidden`. When open: bar 1 rotates `rotate(45deg) translate(4px, 4px)`, bar 2 fades `opacity: 0`, bar 3 rotates `rotate(-45deg) translate(4px, -4px)`.

**Interaction patterns:**
- Click-outside dismissal for accent picker and mobile menu using `useRef` + `document.addEventListener("mousedown", ...)` with cleanup
- Resize listener closes mobile menu when window reaches ≥ 768px

### Footer

Always dark-toned regardless of theme. Multi-column link grid + copyright + `MANYROADS` wordmark:

```jsx
<footer className="py-16 md:py-20 lg:py-24"
        style={{ background: "var(--mr-footer-bg)", color: "var(--mr-footer-text)" }}>
  <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
    {/* Column grid: grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 */}
    {/* Divider: mt-12 md:mt-16 lg:mt-24 pt-8 + border-top */}
    {/* Copyright: text-sm Geist Mono --mr-footer-sub */}
    {/* Wordmark: text-[clamp(80px,15vw,200px)] font-medium */}
  </div>
</footer>
```

### Hover Utility Classes

Six CSS classes defined in `globals.css` for hover states that can't be inline styles:

| Class | Base | Hover | Usage |
|-------|------|-------|-------|
| `.mr-btn-primary` | `--mr-bg-button-primary` bg | `--mr-hover-primary` bg | Primary CTA buttons |
| `.mr-btn-pathway` | `--mr-bg-button-pathway` bg | `--mr-hover-pathway` bg | Secondary/pathway buttons |
| `.mr-btn-toggle` | `--mr-text-muted` + border | `--mr-text-primary` + `--mr-bg-card` bg | Dark mode toggle |
| `.mr-link-nav` | `--mr-text-muted` | `--mr-text-primary` | Navbar links |
| `.mr-link-muted` | `--mr-text-muted` | `--mr-text-primary` | General muted links |
| `.mr-link-footer` | `--mr-footer-text` | `--mr-footer-sub` | Footer links |

All use `transition: 250ms ease`.

### Accent Links

For links in the user's accent color (e.g., "Learn more →", "Learn more about Wayfinder →"):

```jsx
<a href="#" className="inline-block text-sm mt-4"
   style={{ ...MONO, color: "var(--accent)" }}>
  Learn more &rarr;
</a>
```

**Note:** Pages with an accent picker use `var(--accent)` (the user-selected color). The TrailheadPage (V1-style) uses the fixed brand green `var(--mr-accent-default)` instead. For new pages, prefer `var(--accent)` if the page has an accent picker.

### Secondary / Underlined Links

For muted underlined CTAs (e.g., "See a sample report →"):

```jsx
<a href="#" className="inline-block text-[17px] mt-4"
   style={{ ...MONO, color: "var(--mr-text-muted)", textDecoration: "underline" }}>
  See a sample report &rarr;
</a>
```

---

## 6. Dark Mode

### How It Works (Recommended Pattern)

Use this `useSyncExternalStore` pattern for all new pages. It avoids hydration mismatches, responds to OS theme changes, and satisfies the `react-hooks/set-state-in-effect` ESLint rule.

> **Legacy note:** `ManyroadsV2.jsx` uses an older `useState` with lazy initializer pattern. This still works but is not recommended for new pages — it can cause hydration mismatches and doesn't auto-respond to OS theme changes.

1. **System preference detection:** `useSyncExternalStore` reads `prefers-color-scheme: dark` and reacts to OS changes
2. **Manual override:** `darkOverride` state (initially `null`) overrides system preference when the user clicks the toggle
3. **Derived value:** `const dark = darkOverride ?? systemDark`
4. **DOM application:** A `useEffect` sets both `data-theme` and `.dark` class on `<html>`:

```jsx
useEffect(() => {
  document.documentElement.classList.toggle("dark", dark);
  document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
  return () => document.documentElement.removeAttribute("data-theme");
}, [dark]);
```

### Token Switching

- `data-theme="light"` / `data-theme="dark"` on `<html>` activates the corresponding token set in `tokens.css`
- `.dark` class enables Tailwind's `dark:` variant via `@custom-variant dark (&:where(.dark, .dark *))` in `globals.css`
- If tokens are used correctly, **no separate dark mode styles are needed** — colors auto-switch

### SSR Safety

`useSyncExternalStore` with a server snapshot of `false` ensures server and client both render `[ dark_ ]` on first paint, avoiding hydration mismatches.

```jsx
const systemDark = useSyncExternalStore(
  (cb) => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    mq.addEventListener("change", cb);
    return () => mq.removeEventListener("change", cb);
  },
  () => window.matchMedia("(prefers-color-scheme: dark)").matches,
  () => false, // server snapshot
);
```

---

## 7. Motion & Interaction

### Lenis Smooth Scrolling

Global smooth/inertial scrolling via `LenisScroll.jsx` (mounted in root layout):

```jsx
const lenis = new Lenis(); // default config — no custom options
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);
// Cleanup: cancelAnimationFrame(rafId) + lenis.destroy()
```

### Transition Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--mr-transition-fast` | `150ms ease` | Micro-interactions |
| `--mr-transition-base` | `250ms ease` | Button hovers, link color changes |
| `--mr-transition-slow` | `400ms ease` | Theme transitions, larger state changes |

### CSS Animations

| Class | Animation | Usage |
|-------|-----------|-------|
| `.blink-cursor` | `opacity 0↔1, 1s ease-in-out infinite` | TypewriterButton cursor during pause |
| `transition-colors` | Tailwind utility | Root div for smooth theme switching |
| `transition-transform` | Tailwind utility | Hamburger bar rotation, accent picker hover |
| `transition-opacity` | Tailwind utility | Hamburger middle bar fade |

### Hover Patterns

- Buttons: background color change via `.mr-btn-*` classes (250ms ease)
- Links: color change from muted to primary (250ms ease)
- Accent picker dots: `hover:scale-110` transform
- No box-shadow hover effects — the aesthetic is flat and minimal

### Click-Outside Dismissal

Used for the accent picker dropdown and mobile hamburger menu. Shared pattern:

```jsx
useEffect(() => {
  if (!isOpen) return;
  function handleClick(e) {
    if (ref.current && !ref.current.contains(e.target)) setIsOpen(false);
  }
  document.addEventListener("mousedown", handleClick);
  return () => document.removeEventListener("mousedown", handleClick);
}, [isOpen]);
```

---

## 8. Brand Voice in UI

### Builder Minimal Aesthetic

The site targets engineering leaders and developers. The visual language reflects this:

- **Monospace accents everywhere:** Navigation, labels, buttons, badges, and metadata all use Geist Mono. This creates a code-adjacent feel without being a "developer tool" UI.
- **Code-comment section labels:** `// 01 — THE_PROBLEM` uses literal code-comment syntax. The `//` renders in the accent color, the rest in primary text. This is the signature visual pattern.
- **Trailing underscore convention:** CTAs end with `_` instead of arrows (e.g., `Get Trailhead on GitHub_`). The underscore evokes a terminal cursor.
- **Bracket notation:** Dark mode toggle uses `[ dark_ ]` / `[ light_ ]` — bracket syntax familiar to developers.
- **No decorative elements:** No gradients, no illustrations, no icons in buttons. Image placeholders are flat rectangles. The design relies on typography, spacing, and restraint.
- **Warm neutrals:** The palette avoids pure white/black. Light mode uses `#FAF9F6` (warm off-white), dark mode uses `#1A1A18` (warm near-black). This creates a more approachable feel than stark developer-tool aesthetics.
- **Numbered items:** Cards use `(01)` parenthetical numbering in Geist Mono, not bullets or icons.
- **External links:** Use `↗` suffix in Geist Mono `text-sm` (e.g., `LinkedIn ↗`).
- **Em dashes:** Use `—` (`&mdash;`) as a separator in section labels and as punctuation in copy. Thin spaces (`&thinsp;` / `\u2009`) surround em dashes in body text.

### Logo

`Many_Roads <AI>` — the underscore between words and angle brackets around AI are intentional brand elements. Rendered in Geist Mono `text-lg font-medium tracking-wide`.

### Footer Wordmark

`MANYROADS` in all-caps at `clamp(80px, 15vw, 200px)` with `font-medium leading-none tracking-tight`. No Geist Mono — uses the body font (Geist Sans).

---

## 9. Page Structure Template

Starting point for a new page:

```jsx
'use client'
import { useState, useEffect, useRef, useSyncExternalStore } from "react";

// --- Data constants ---
const NAV_LINKS = ["Link1", "Link2", "Link3", "Link4"];
const FOOTER_COLUMNS = [
  { heading: "Product", links: ["Trailhead", "Wayfinder", "Pricing"] },
  { heading: "Resources", links: ["Documentation", "GitHub", "Blog"] },
  { heading: "Company", links: ["About", "Team", "Contact"] },
  { heading: "Legal", links: ["Privacy", "Terms"] },
  { heading: "Connect", links: ["Twitter", "LinkedIn", "YouTube"] },
];

// --- Font constant ---
const MONO = { fontFamily: '"Geist Mono", "SF Mono", "Fira Code", "Fira Mono", monospace' };

// --- Accent color support ---
const ACCENT_OPTIONS = [
  { color: "#3D7A41", name: "Green" },
  { color: "#8A708A", name: "Mauve" },
  { color: "#4F769A", name: "Blue" },
  { color: "#C47030", name: "Orange" },
  { color: "#B8892A", name: "Amber" },
];

function darkenColor(hex) {
  const n = parseInt(hex.slice(1), 16);
  const r = Math.round(((n >> 16) & 0xFF) * 0.85);
  const g = Math.round(((n >> 8) & 0xFF) * 0.85);
  const b = Math.round((n & 0xFF) * 0.85);
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}

// --- Shared components: SectionLabel, PrimaryButton, Navbar, Footer ---
// (Copy from existing page files — they are self-contained per page)

export default function NewPage() {
  // Dark mode
  const systemDark = useSyncExternalStore(
    (cb) => { const mq = window.matchMedia("(prefers-color-scheme: dark)"); mq.addEventListener("change", cb); return () => mq.removeEventListener("change", cb); },
    () => window.matchMedia("(prefers-color-scheme: dark)").matches,
    () => false,
  );
  const [darkOverride, setDarkOverride] = useState(null);
  const dark = darkOverride ?? systemDark;

  // Accent color — default is Blue (#4F769A) from ACCENT_OPTIONS
  const [accent, setAccent] = useState("#4F769A");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
    return () => document.documentElement.removeAttribute("data-theme");
  }, [dark]);

  return (
    <div
      className="min-h-screen transition-colors overflow-x-hidden"
      style={{
        fontFamily: '"Geist Sans", sans-serif',
        "--accent": accent,
        "--accent-hover": darkenColor(accent),
        background: "var(--mr-bg-page)",
      }}
    >
      <Navbar dark={dark} onToggle={() => setDarkOverride(!dark)} accent={accent} onAccentChange={setAccent} />
      <main>
        {/* Sections go here */}
      </main>
      <Footer />
    </div>
  );
}
```

### Route Files

Each page needs two files under `src/app/{route}/`:

```jsx
// layout.jsx
export const metadata = { title: { absolute: 'Page Title — Many Roads AI' } }
export default function Layout({ children }) { return children }

// page.jsx
import NewPage from '../../NewPage'
export default function Page() { return <NewPage /> }
```

---

## 10. Checklist for New Components

Before submitting any code, verify:

- [ ] All colors use `var(--mr-*)` tokens — no hardcoded hex values
- [ ] All fonts use `MONO` constant or inline Geist Sans — no other font families
- [ ] Dark mode renders correctly in both themes
- [ ] Responsive at 375px (mobile), 768px (tablet), 1280px+ (desktop)
- [ ] New tokens (if any) added to **both** light and dark sections in `tokens.css`
- [ ] Hover states use `.mr-btn-*` or `.mr-link-*` utility classes, not inline `:hover`
- [ ] Section labels follow `// 0X — LABEL_NAME` format
- [ ] CTA buttons use trailing underscore convention
- [ ] `npm run build` passes with no errors

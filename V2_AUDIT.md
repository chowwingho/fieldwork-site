# V2 Token & Spec Audit

**Date:** 2026-02-20
**Source:** `src/ManyroadsV2.jsx`
**Reference:** `src/tokens/tokens.css` + `src/components/design-system/*`

---

## 0. Critical: Dark Mode Strategy Divergence

V2 and the token system use **incompatible dark mode mechanisms**. This is the root cause of most hardcoded values — V2 _cannot_ use `var(--mr-*)` color tokens until the switching strategy is unified.

| | V2 (`ManyroadsV2.jsx`) | Design System / Tokens |
|---|---|---|
| **Mechanism** | `.dark` class on `<html>` | `data-theme="dark"` attribute on `<html>` |
| **Toggle** | `classList.toggle("dark", dark)` | `setAttribute("data-theme", ...)` |
| **Tailwind variant** | `dark:bg-[#xxx]` (class-based, via `@custom-variant` in `index.css`) | Not used — tokens handle switching |
| **Color switching** | Hardcoded hex pairs in every `dark:` utility | CSS variables in `[data-theme="dark"]` block |

**Impact:** Every `dark:bg-[#xxx]` and `dark:text-[#xxx]` in V2 is a hardcoded value that _should_ be a token reference, but can't be until the dark mode strategy is reconciled.

**Recommended fix:** Change V2 to set `data-theme` attribute instead of (or in addition to) the `.dark` class, then replace all `bg-[#hex] dark:bg-[#hex]` pairs with `style={{ background: "var(--mr-bg-*)" }}`.

---

## 1. Hardcoded Colors → Should Reference `--mr-*` Tokens

### 1a. Background Colors

Every instance uses a light/dark hex pair instead of the corresponding token.

| Token | Light Value | Dark Value | Lines in V2 |
|---|---|---|---|
| `--mr-bg-page` | `#FAF9F6` | `#1A1A18` | 281, 302, 780 |
| `--mr-bg-card` | `#F0EEE6` | `#262624` | 473, 497, 580 |
| `--mr-bg-button-primary` | `#E8E6DD` | `#333331` | 192, 683, 690 |
| `--mr-bg-button-pathway` | `#D1CFC6` | `#3D3D3A` | 488, 513 |
| `--mr-hover-primary` | `#DEDAD0` | `#3D3D3A` | 192, 683, 690 |
| `--mr-hover-pathway` | `#C5C3BA` | `#4A4A47` | 488, 513 |
| `--mr-footer-bg` | `#262625` | `#111110` | 670 |
| `--mr-bg-card` (toggle hover) | `#F0EEE6` | `#262624` | 325 |

**Total: ~18 instances across 8 token categories.**

### 1b. Text Colors

| Token | Light Value | Dark Value | Approx. Count |
|---|---|---|---|
| `--mr-text-primary` | `#262625` | `#ECECEA` | ~30 instances |
| `--mr-text-muted` | `#888888` | `#ECECEA/50` | ~20 instances |
| `--mr-footer-text` | `#FFFFFF` | `#FFFFFF` | ~5 instances |
| `--mr-footer-sub` | `white/60%` | `white/60%` | 1 instance (line 696) |

### 1c. Border Colors

| Token | Light Value | Dark Value | Approx. Count |
|---|---|---|---|
| `--mr-border-default` | `#262625/12` | `#ECECEA/10` | ~10 instances |
| `--mr-footer-divider` | `white/15%` | `white/15%` | 1 instance (line 700) |

### 1d. Summary

**~85 hardcoded color values** across ManyroadsV2.jsx that map directly to 12 design tokens.

---

## 2. Spec Mismatches

### 2a. Nav Link Hover Color

| | Documented (NavigationSection) | Actual (V2) |
|---|---|---|
| **Hover color** | `--mr-text-muted` → `--mr-text-primary` | `--mr-text-muted` → `var(--accent)` |
| **Lines** | NavigationSection.jsx:131 | ManyroadsV2.jsx:289 |

The design system documents that nav links go from muted → primary on hover. V2 actually goes from muted → accent color. Same applies to footer nav links (line 731) and footer social links (line 748).

### 2b. Footer Labels — Wrong Color Token

Footer contact/nav/social section labels use `#888888` (the light-mode muted color) on an always-dark background. Should use `--mr-footer-sub` (white at 60%).

| Element | V2 Value | Should Be | Lines |
|---|---|---|---|
| "Email" label | `text-[#888888]` | `--mr-footer-sub` (`rgba(255,255,255,0.6)`) | 705 |
| "Phone" label | `text-[#888888]` | `--mr-footer-sub` | 714 |
| "Navigation" label | `text-[#888888]` | `--mr-footer-sub` | 725 |
| "Social" label | `text-[#888888]` | `--mr-footer-sub` | 741 |

Contrast: `#888888` on `#262625` = ~4.0:1 (fails AA for normal text). `rgba(255,255,255,0.6)` on `#262625` ≈ 6.4:1 (passes AA).

### 2c. Service Card Numbering — Wrong Font

| | Documented (CardsSection) | Actual (V2) |
|---|---|---|
| **Font for `(01)`** | Geist Mono (`style={MONO}`) | Geist Sans (inherits from root) |
| **Lines** | CardsSection.jsx:44–46 | ManyroadsV2.jsx:435–436 |

The design system shows pain point card numbering in Geist Mono. V2 renders `(01)` – `(04)` in Geist Sans.

### 2d. MONO Constant — Incomplete Fallback Chain

| | V2 | Token (`--mr-font-mono`) |
|---|---|---|
| **Value** | `"Geist Mono", monospace` | `'Geist Mono', 'SF Mono', 'Fira Code', 'Fira Mono', monospace` |
| **Fallbacks** | 1 | 4 |

V2's `MONO` constant has a minimal fallback chain. If Geist Mono fails to load, it falls through directly to the system monospace, skipping SF Mono, Fira Code, and Fira Mono.

### 2e. Transition Easing Curve

| | Documented (`--mr-transition-fast`) | Actual (V2 via Tailwind) |
|---|---|---|
| **Duration** | 150ms | 150ms ✓ |
| **Easing** | `ease` | `cubic-bezier(0.4, 0, 0.2, 1)` |

Tailwind's `transition-colors` uses a different easing curve than the `--mr-transition-fast` token. Visual difference is subtle but technically a mismatch.

Additionally, `ChevronIcon` uses `duration-300` (300ms) which doesn't match any motion token. Closest is `--mr-transition-base` (250ms).

### 2f. Section Vertical Spacing — Exceeds Token Scale

| Tailwind Class | Computed | Closest Token | Difference |
|---|---|---|---|
| `py-32` | 128px | `--mr-space-2xl` (120px) | +8px |
| `pt-24` | 96px | — | No matching token |
| `py-24` (footer) | 96px | — | No matching token |

The spacing scale tops out at `--mr-space-2xl: 120px`. V2 uses `py-32` (128px) for all sections, which exceeds the maximum token.

---

## 3. Missing Responsive Breakpoints

The design system documents 4 breakpoints (`sm: 640px`, `md: 768px`, `lg: 1024px`, `xl: 1280px`) and specific reflow rules for 6 components. **V2 implements zero responsive breakpoints.**

### 3a. Components That Need Reflow

| Component | Breakpoint | Desktop Layout | Mobile Layout | V2 Status |
|---|---|---|---|---|
| Navbar | `< md` | Logo + links + toggle | Logo + hamburger + toggle | **Not implemented** |
| Stats Row | `< md` | 4-up horizontal (`col-span-3`) | 2×2 → stack | **Not implemented** |
| Pain Point Cards | `< md` | 2×2 grid | Single column | **Not implemented** |
| Pathway Cards | `< lg` | Side-by-side (`col-span-6`) | Stacked | **Not implemented** |
| Team Section | `< md` | 3-column bios | Single column | **Not implemented** |
| Footer | `< md` | 3-column grid | Single column | **Not implemented** |

### 3b. Missing Container Responsiveness

| Issue | Current V2 | Spec |
|---|---|---|
| Max width | Fixed `max-w-[1280px]` | Same, but should be fluid below xl |
| Side padding | Fixed `px-12` (48px) | Should scale: `px-4` → `px-6` → `px-8` → `px-10` → `px-12` |
| Grid columns | Fixed `grid-cols-12` | Should collapse at smaller breakpoints |

### 3c. Missing Type Scale Adaptation

| Level | Desktop | Mobile Target | V2 Status |
|---|---|---|---|
| Hero Headline | 56px | 32–36px | **Fixed at 56px** |
| Section Heading | 36px | 24–28px | **Fixed at 36px** |
| Card Heading | 24px | 18–20px | **Fixed at 24px** |
| Body | 17px | 16px | **Fixed at 17px** (close enough) |
| Small / Muted | 14px | 14px | ✓ No change needed |
| Section Marker | 18px | 12px | **Fixed at 18px** |

---

## 4. Other Issues

### 4a. Unused V1 Remnants

These data constants and components are defined but never used in V2:

| Item | Lines | Type |
|---|---|---|
| `PROJECTS` | 69–76 | Data array (V1 architecture projects) |
| `TESTIMONIALS` | 78–91 | Data array (V1 testimonials) |
| `FAQ_ITEMS` | 93–101 | Data array (V1 FAQ questions) |
| `ArrowIcon` | 110–122 | Component (used only by `SecondaryLink`, which is defined but never rendered) |
| `ChevronIcon` | 124–141 | Component (V1 FAQ accordion icon) |
| `SecondaryLink` | 178–186 | Component (defined but never rendered in any section) |

### 4b. Accent Color System — Undocumented

V2 has a user-selectable accent color system (`ACCENT_OPTIONS`, `darkenColor()`, `--accent` CSS variable) that is not documented in the design system. The design system only defines a single static token: `--mr-accent-default: #4F769A`.

| V2 Feature | Design System Coverage |
|---|---|
| 5-color accent palette | Documents the 5 colors but notes "internal testing only" |
| `--accent` CSS variable (dynamic) | Not documented |
| `darkenColor()` for hover | Not documented — tokens have no accent hover token |
| Accent picker in navbar | Not documented in NavigationSection |

### 4c. Export Name Mismatch

File is `ManyroadsV2.jsx` but exports `FieldworkV2`. This is a V1 naming remnant.

---

## 5. Prioritized Fix List

### P0 — Blocking (must fix before tokens are useful)

1. **Unify dark mode strategy** — Switch V2 from `.dark` class to `data-theme` attribute (or add both), so `var(--mr-*)` tokens resolve correctly in both modes

### P1 — High (direct spec violations)

2. **Replace ~85 hardcoded color values** with `var(--mr-*)` token references (depends on P0)
3. **Fix footer labels** — `#888888` → `--mr-footer-sub` (accessibility failure)
4. **Fix service card numbering font** — add `style={MONO}` to `(01)`–`(04)` spans
5. **Align MONO fallback chain** with `--mr-font-mono` token

### P2 — Medium (spec drift)

6. **Document or resolve nav link hover** — accent color vs `--mr-text-primary`
7. **Align transition easing** — `ease` vs `cubic-bezier(0.4, 0, 0.2, 1)`
8. **Add 96px and 128px spacing tokens** (or adjust V2 to use existing tokens)
9. **Document accent color system** in design system (picker, hover computation, dynamic variable)

### P3 — Low (cleanup)

10. **Remove unused V1 data** — `PROJECTS`, `TESTIMONIALS`, `FAQ_ITEMS`, `ArrowIcon`, `ChevronIcon`, `SecondaryLink`
11. **Rename export** — `FieldworkV2` → `ManyroadsV2`

### P4 — Future (responsive)

12. **Implement responsive breakpoints** per design system spec (6 component reflows, type scale adaptation, margin scaling)

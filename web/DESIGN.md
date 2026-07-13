# Design System: 蓝趣编程课堂 (Teaching-Open)

> Semantic design system for the Lanqu coding education platform. Governs all
> student-facing surfaces (home, login, Scratch editor embed) and the admin
> backend. Replaces the current fragmented mix of Ant Design 1.x defaults,
> hardcoded gradients, and cartoon loading with one coherent language.

---

## 1. Visual Theme & Atmosphere

**"A bright, confident studio — like a well-lit maker space."**

Density sits at 5 (Daily App Balanced) — enough information density for
course management without overwhelming young students. Variance at 6
(Offset Asymmetric) — the home page favors asymmetric splits and
zig-zag content rows over centered symmetry. Motion at 5 (Fluid CSS) —
spring-based transitions on interactions, gentle staggered reveals on
page load, but no cinematic choreography.

The atmosphere is **clinical yet warm**: clean white surfaces, a single
trust-building blue accent, rounded but not toy-like corners. It should
feel like a modern ed-tech product (think Khan Academy / Code.org
refinement), not a legacy enterprise admin panel.

**Target audience:** K-12 students and teachers. The design must be
approachable for children yet professional enough for institutional
administrators. Avoid both childish cartoon aesthetics and cold
enterprise dashboards.

---

## 2. Color Palette & Roles

The current project scatters three blues (`#1890ff`, `#005dff`,
`#23aeff`). Consolidate to **one** accent family rooted in a calibrated
sky-blue, with zinc neutrals for structure.

### Neutrals (Zinc-based, no warm/cool fluctuation)

- **Canvas** `#F7F7F8` — Primary page background (replaces `#f0f2f5`)
- **Surface** `#FFFFFF` — Cards, modals, dropdown fills
- **Ink** `#18181B` — Primary text (Zinc-950, never `#000000`)
- **Steel** `#71717A` — Secondary text, descriptions, metadata (Zinc-500)
- **Mist** `#A1A1AA` — Tertiary text, placeholders (Zinc-400)
- **Line** `#E4E4E7` — Borders, dividers, 1px structural lines (Zinc-200)
- **Hover Gray** `#F4F4F5` — Hover backgrounds, table row striping (Zinc-100)

### Accent (single, saturation < 80%)

- **Lanqu Blue** `#2563EB` — Primary accent for CTAs, active states, links,
  focus rings. A confident, slightly-deeper blue than the current `#1890ff`
  to feel more premium and less "default Ant Design".
- **Lanqu Blue Hover** `#1D4ED8` — Button hover / active
- **Lanqu Blue Soft** `#DBEAFE` — Tinted backgrounds, selected-row highlight,
  info badges (Blue-100)
- **Lanqu Blue Ghost** `rgba(37, 99, 235, 0.06)` — Subtle hover wash on
  list items, card hovers

### Functional Colors

- **Success** `#16A34A` — Correct answers, completed status (Green-600)
- **Warning** `#EAB308` — Pending states, warnings (Yellow-500)
- **Danger** `#DC2626` — Errors, destructive actions (Red-600)
- **Info** `#2563EB` — Same as accent; no separate info color

### Banned Colors

- `#1890ff` (Ant Design default — too generic, replace with Lanqu Blue)
- `#005dff` / `#23aeff` (scattered blues — consolidate to Lanqu Blue family)
- Pure `#000000` (use Ink `#18181B`)
- `#f0f2f5` (old gray — use Canvas `#F7F7F8`)
- Any purple/violet/neon accent

---

## 3. Typography Rules

### Font Stack

- **Display / Headlines:** `"PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif`
  — For Chinese-first content. Track-tight on large sizes (`letter-spacing: -0.02em`).
  Hierarchy through weight (600 → 500 → 400) and color (Ink → Steel), not just size.
- **Body:** Same stack at 400 weight. Relaxed leading (`1.6`), max `65ch` per line.
- **Mono:** `"JetBrains Mono", "SFMono-Regular", Consolas, Menlo, monospace`
  — For code snippets, Scratch block references, timestamps, IDs.
- **Banned:** `Inter` (generic AI default). Generic serifs (`Times New Roman`,
  `Georgia`). Hardcoded `"微软雅黑 Bold"` (use weight property, not font-name hack).

### Scale (rem-based, fluid via clamp on headlines)

| Role | Size | Weight | Color | Letter-spacing |
|------|------|--------|-------|----------------|
| H1 (page title) | `clamp(1.75rem, 3vw, 2.25rem)` | 600 | Ink | -0.02em |
| H2 (section) | `1.5rem` (24px) | 600 | Ink | -0.01em |
| H3 (card title) | `1.125rem` (18px) | 500 | Ink | 0 |
| Body | `0.875rem` (14px) | 400 | Ink/Steel | 0 |
| Caption | `0.75rem` (12px) | 400 | Mist | 0 |
| Button | `0.875rem` (14px) | 500 | Inherits | 0.01em |
| Mono | `0.8125rem` (13px) | 400 | Steel | 0 |

Base font size `14px` (matches current Ant Design base, avoids breaking
existing component sizing).

---

## 4. Component Stylings

### Buttons
- **Primary:** Lanqu Blue fill (`#2563EB`), white text, `border-radius: 8px`,
  `padding: 8px 20px`. Hover: `#1D4ED8`. Active: `translateY(1px)`.
  No outer glow. No gradient.
- **Secondary / Ghost:** Transparent fill, `1px solid #E4E4E7` border, Ink text.
  Hover: `background: #F4F4F5`. Active: `translateY(1px)`.
- **Danger:** Danger `#DC2626` fill, white text. Same structure as primary.
- **Link:** Lanqu Blue text, no underline, hover: underline + `#1D4ED8`.
- **Icon buttons:** 36×36px min, `border-radius: 8px`, ghost style.
- **Disabled:** `opacity: 0.4`, `cursor: not-allowed`. No color change.
- **Loading:** Show inline spinner (Lanqu Blue), keep button width stable.

### Cards
- **Standard:** `background: #FFFFFF`, `border-radius: 12px`,
  `border: 1px solid #E4E4E7`, `box-shadow: 0 1px 3px rgba(0,0,0,0.04)`.
  No heavy shadows. Padding: `20px` (desktop), `16px` (mobile).
- **Hover (interactive cards):** `border-color: #D4D4D8`, `box-shadow: 0 4px 12px rgba(0,0,0,0.06)`.
- **Course card:** Image top (`aspect-ratio: 16/9`, `border-radius: 8px`),
  title H3, description body (2-line clamp), meta (Steel, caption size).
- **Banned:** The current `border-radius: 20px` on cards (too toy-like for
  an education platform with admin surfaces). Standardize to 12px.

### Inputs / Forms
- **Layout:** Label above input (Steel, caption size), input below, error below.
- **Input:** `border: 1px solid #E4E4E7`, `border-radius: 8px`, `padding: 8px 12px`,
  `font-size: 14px`. Height: `36px` (default), `32px` (small).
- **Focus:** `border-color: #2563EB`, `box-shadow: 0 0 0 3px rgba(37,99,235,0.12)`.
- **Error:** `border-color: #DC2626`, error text in Danger color.
- **No floating labels.** No animated placeholder magic.

### Tables
- **Header:** `background: #F4F4F5`, `font-weight: 500`, `color: Steel`.
- **Rows:** `border-bottom: 1px solid #E4E4E7`. Hover: `background: rgba(37,99,235,0.03)`.
- **Selected row:** `background: #DBEAFE`.
- **Striping:** None (use hover + border for separation).

### Navigation
- **Top bar (home):** Transparent on hero, transitions to `background: #FFFFFF;
  border-bottom: 1px solid #E4E4E7; box-shadow: 0 1px 3px rgba(0,0,0,0.04)`
  on scroll. Replace the current radial-gradient blue bar — it conflicts with
  the accent system.
- **Sidebar (admin):** `background: #FFFFFF`, `border-right: 1px solid #E4E4E7`.
  Menu items: Ink text, hover `background: #F4F4F5`, active `background: #DBEAFE`
  + `color: #2563EB` + `font-weight: 500`. Active indicator: 3px left bar in Lanqu Blue.
- **Breadcrumbs:** Caption size, Mist color, current page in Ink.

### Avatars
- `border-radius: 50%`, `border: 2px solid #FFFFFF`,
  `box-shadow: 0 0 0 1px #E4E4E7`. Fallback: Lanqu Blue Soft background + initials.

### Loaders
- **Skeleton:** Shimmer animation (`background: linear-gradient(90deg, #F4F4F5 25%, #E4E4E7 50%, #F4F4F5 75%)`,
  `background-size: 200% 100%`, `animation: shimmer 1.5s infinite`) matching
  the exact dimensions of the content it replaces.
- **No circular spinners** for content loading. Page-load spinner only for
  full-page transitions (minimal, Lanqu Blue).
- Replace the cartoon dragon loading animation on `index.html` with a clean
  Lanqu Blue spinner or logo animation.

### Empty States
- Centered composition: 64px illustration (line-art style, Lanqu Blue stroke),
  H3 title in Ink, body description in Steel, primary CTA button.
- No bare "暂无数据" text.

### Badges / Tags
- `border-radius: 4px`, `padding: 2px 8px`, `font-size: 12px`.
- Variants: Success (Green-50 bg + Green-700 text), Warning (Yellow-50 + Yellow-700),
  Info (Blue-50 + Blue-700), Neutral (Zinc-100 + Zinc-600).

---

## 5. Layout Principles

### Grid
- CSS Grid for page-level layouts. Flexbox for component internals only.
- **No `calc()` percentage hacks.** Use grid-template-columns / gap.
- Max content width: `1200px` centered (home, login). Admin: fluid with
  `240px` sidebar + remaining content.

### Home Page
- **Hero:** Asymmetric split — 60% left (headline + CTA), 40% right (visual
  / illustration / course preview). No centered hero.
- **Feature row:** 2-column zig-zag (image-left/text-right, then reversed).
  **Banned:** 3 equal cards in a horizontal row.
- **Course list:** Horizontal scroll cards on mobile, grid (auto-fill, minmax
  280px) on desktop.
- **Section spacing:** `clamp(3rem, 8vw, 6rem)` vertical gaps.

### Login Page
- Split screen: 50% left (brand visual / illustration), 50% right (form,
  max-width 400px, vertically centered). On mobile: single column, form only.
- Replace `#f0f2f5` background + `background.svg` with Canvas `#F7F7F8` +
  subtle Lanqu Blue Soft tint on the visual side.

### Admin Backend
- Sidebar (240px) + content area. Content area: `padding: 24px`.
- Page header: H1 title + action buttons (right-aligned). Breadcrumb above.
- Table pages: search filter bar (card with `padding: 16px`) → table card.

### Containment
- All layouts use `max-width` constraints. No full-bleed content beyond
  `1200px` on home/login. Admin content is fluid within the sidebar frame.
- Full-height sections use `min-height: 100dvh` (never `height: 100vh`).

---

## 6. Responsive Rules

- **Mobile-first collapse (< 768px):** All multi-column → single column.
  Sidebar → drawer. Hero split → stacked. Course grid → horizontal scroll.
- **No horizontal scroll:** `overflow-x: hidden` on body. Tables get
  horizontal scroll within their own container only.
- **Typography scaling:** Headlines via `clamp()`. Body minimum `14px`.
- **Touch targets:** All interactive elements minimum `44px` tap area.
- **Spacing:** Section gaps `clamp(2rem, 6vw, 4rem)` on mobile.

---

## 7. Motion & Interaction

- **Spring physics:** `cubic-bezier(0.34, 1.56, 0.64, 1)` for bouncy
  elements (cards entering, modals). `cubic-bezier(0.4, 0, 0.2, 1)` for
  standard transitions (hover, dropdowns).
- **Durations:** Hover/focus `150ms`. Page transitions `250ms`.
  Card entrances `400ms` with staggered `50ms` delay per item.
- **Perpetual micro-interactions:** Active course progress bars shimmer
  subtly. Notification badge pulses. These are gentle, not distracting.
- **Staggered reveals:** Lists cascade in with `50ms` stagger (max 8 items,
  then batch). Never mount 50 table rows at once.
- **Performance:** Animate `transform` and `opacity` only. Never animate
  `width`, `height`, `top`, `left`. No layout-thrashing filters.

---

## 8. Anti-Patterns (Banned)

The following are explicitly banned AI design clichés and legacy patterns
that must not appear in any new or modified screen:

### Banned Visuals
- ❌ Emojis in UI text (use icons instead)
- ❌ `Inter` font (generic AI default)
- ❌ Generic serif fonts (`Times New Roman`, `Georgia`, `Garamond`)
- ❌ Pure black `#000000` (use Ink `#18181B`)
- ❌ Neon / outer-glow shadows on buttons or cards
- ❌ Oversaturated accent colors (saturation > 80%)
- ❌ Gradient text on large headers
- ❌ Custom mouse cursors
- ❌ Overlapping elements — clean spatial separation always
- ❌ 3-column equal card layouts (use zig-zag or asymmetric grid)
- ❌ Centered hero sections (use asymmetric split)
- ❌ Cartoon loading animations (dragon, etc.) on production pages
- ❌ `radial-gradient` on navigation bars (use solid color + border)
- ❌ Hardcoded `"微软雅黑 Bold"` font hack (use `font-weight` property)

### Banned Copy
- ❌ "Elevate", "Seamless", "Unleash", "Next-Gen" (AI copywriting clichés)
- ❌ "Scroll to explore", scroll arrows, bouncing chevrons
- ❌ Fake metrics (`99.99%`, `50%`) — use real data or `[metric]` placeholder
- ❌ Fake system sections ("SYSTEM PERFORMANCE METRICS", "BY THE NUMBERS")
- ❌ `LABEL // YEAR` formatting ("SYSTEM // 2024")
- ❌ Generic names ("John Doe", "Acme", "Nexus")

### Banned Code
- ❌ `height: 100vh` (use `min-height: 100dvh` — iOS Safari jump fix)
- ❌ `calc()` percentage hacks for layout (use CSS Grid)
- ❌ Inline `style="background: #1890ff"` (use design tokens / classes)
- ❌ Multiple blue values (`#1890ff`, `#005dff`, `#23aeff`) — consolidate
  to Lanqu Blue `#2563EB` family
- ❌ `border-radius: 20px` on cards (use 12px)
- ❌ `eval()` for rendering or parsing (already fixed, keep it that way)
- ❌ `v-html` without sanitization (use `v-safe-html`)

---

## 9. Migration Notes (from current state)

This section guides the incremental migration from the current fragmented
design to this system. Changes should be applied gradually, not as a big-bang rewrite.

### Phase 1: Token Foundation
1. Create `src/assets/less/design-tokens.less` with all colors, spacing,
   typography variables from this document.
2. Update `defaultSettings.js` primaryColor from `#1890FF` to `#2563EB`.
3. Update `public/color.less` `@primary-color` to `#2563EB`.
4. Replace `#f0f2f5` background with `#F7F7F8` globally.

### Phase 2: Home Page Polish
1. Replace Header radial-gradient with solid white + border on scroll.
2. Standardize card `border-radius` from 20px to 12px.
3. Consolidate all blue hardcoded values to Lanqu Blue family.
4. Remove `"微软雅黑 Bold"` hack, use `font-weight: 600`.

### Phase 3: Login Page Refresh
1. Split-screen layout (brand visual left, form right).
2. Replace `#f0f2f5` + `background.svg` with Canvas + subtle tint.
3. Form inputs: 8px radius, Lanqu Blue focus ring.

### Phase 4: Admin Backend Alignment
1. Sidebar: white bg + border, active item Lanqu Blue Soft + left bar.
2. Table headers: `#F4F4F5` bg, standardized hover.
3. Remove `2px 116px 6px` shadow typo.

### Phase 5: Loading & Empty States
1. Replace cartoon dragon loader with clean Lanqu Blue spinner.
2. Add skeleton loaders for async content.
3. Design empty-state compositions for tables / lists.

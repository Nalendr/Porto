# Portfolio — Software Developer
**Date:** 2026-09-13
**Status:** Approved

---

## Overview

Japanese editorial-driven developer portfolio. 80% JP editorial layout DNA, 20% typographic restraint. Single-page, scroll-based, built with Next.js 14 + TypeScript + Tailwind CSS v3 + Framer Motion 11.

---

## Design Tokens

| Token | Value | Usage |
|---|---|---|
| `--paper` | `#F2EDE3` | Page background (aged newsprint) |
| `--ink` | `#141210` | Primary text, borders, rules |
| `--red` | `#C1341A` | Vermillion accent — labels, hovers, timeline dots |
| `--ghost` | `#D9D3C6` | Section index watermarks, subtle borders |
| `--serif` | Shippori Mincho 400/600/800 | Display, section titles, pull quotes, stats |
| `--sans` | Space Grotesk 300/400/500/600 | Labels, meta, nav, body copy |

### Type Scale

| Role | Size | Font | Weight |
|---|---|---|---|
| Hero name | `clamp(56px, 10vw, 140px)` | Shippori Mincho | 800 |
| Section title | `clamp(36px, 5vw, 72px)` | Shippori Mincho | 800 |
| Pull quote | `clamp(28px, 3.5vw, 48px)` | Shippori Mincho | 600 |
| Project title | `clamp(20px, 2.5vw, 32px)` | Shippori Mincho | 600 |
| Stat number | `48px` | Shippori Mincho | 800 |
| Section label | `10px` | Space Grotesk | 600 |
| Body | `15px` | Space Grotesk | 400 |
| Nav / meta | `11px` | Space Grotesk | 500 |
| Tags | `9px` | Space Grotesk | 600 |

---

## Layout System

- 12-column CSS Grid (zero gap)
- Section padding: `120px 40px 120px 160px` (desktop), `80px 24px` (mobile)
- Every section has a `border-top: 1px solid var(--ink)`
- **Signature element:** `22vw` Shippori Mincho section index numbers in `#D9D3C6`, absolutely positioned, bleeding off the left edge — structural watermarks, not decoration

---

## Sections

### Nav (fixed)
- Left: logo mark `YK.` in Shippori Mincho 800
- Right: links — About, Works, Skills, Experience, Contact
- `mix-blend-mode: multiply` so it reads on any background
- Mobile: logo only, links hidden

### Hero
- Full viewport (`min-height: 100vh`)
- Eyebrow: `[Location] · [Status]` — Space Grotesk, 11px, 0.18em tracking, 50% opacity
- Name: stacked 2-line Shippori Mincho at `10vw`
- Bottom meta row: role description left / availability indicator right
- Availability: pulsing red dot + "Available for work"
- Vertical "Scroll" label, right edge, `writing-mode: vertical-rl`

### About — `01`
- 2-column grid: pull quote left, body text right
- Pull quote with `<em>` word in vermillion
- 4-stat grid (years, products, OSS libs, startups)
- Body: 3 short paragraphs, 65ch max measure, 0.75 opacity

### Works — `02`
- Header: large title left, project count right
- Project list (editorial, NOT cards): each row is `index num | title + description | tags`
- Hover: red underline `scaleX: 0→1` slides from left
- 6 projects shown

### Skills — `03`
- Heading: `"The tools I reach for."`
- Table: full-border grid, left column = category label (10px uppercase), right = comma-separated items in Shippori Mincho
- 6 categories: Languages, Frontend, Backend, Data, Infrastructure, Design

### Experience — `04`
- Heading: `"Where I've worked."`
- Vertical list: year (48px serif) left column, company + role + description right
- Red dot on each year (timeline node)
- 3 entries

### Contact — `05`
- Large serif statement: `"Let's build something precise."` with `<span>` word in vermillion
- 4 links: Email, GitHub, LinkedIn, Twitter/X — each with diagonal arrow SVG icon
- Hover: border-bottom changes to vermillion

### Footer
- Left: copyright
- Right: `"Designed with intention."` in Shippori Mincho

---

## Framer Motion Animations

| Animation | Element | Trigger | Spec |
|---|---|---|---|
| Line slide-up | Hero name lines | Mount | `translateY(110%→0)`, `duration: 1s`, `cubic-bezier(0.16,1,0.3,1)`, 100ms stagger per line |
| Ink-drop unmask | Section titles, pull quotes | `whileInView` | `clipPath: inset(100% 0 0 0)→inset(0%)`, `duration: 1s`, same easing |
| Fade + lift | Content blocks, stats, project rows | `whileInView` | `opacity: 0→1`, `translateY: 32px→0`, `duration: 0.8s`, 80ms child stagger |
| Rule draw | Red line in section labels | `whileInView` | `scaleX: 0→1`, `duration: 0.6s`, `transform-origin: left` |
| Project hover | Red underline per row | `whileHover` | `scaleX: 0→1`, `duration: 0.4s` |
| Page transition | Route change | `AnimatePresence` | `opacity: 0→1`, `translateY: 30px→0`, `duration: 0.4s` |
| Dot pulse | Hero availability dot | Loop | `opacity: 1→0.4→1`, `scale: 1→0.8→1`, `duration: 2s` |

All animations respect `prefers-reduced-motion`.

---

## File Structure

```
src/
  app/
    layout.tsx          ← fonts (Shippori Mincho + Space Grotesk), metadata, globals
    page.tsx            ← single page, all section components
    globals.css         ← CSS custom properties, base reset
  components/
    Nav.tsx
    Hero.tsx
    About.tsx
    Works.tsx
    Skills.tsx
    Experience.tsx
    Contact.tsx
    SectionWrapper.tsx  ← shared: section index watermark + border-top + reveal
  lib/
    data.ts             ← all content (projects, experience, skills, bio)
    motion.ts           ← shared Framer Motion variants (fadeUp, clipReveal, stagger)
  styles/
    globals.css
tailwind.config.ts      ← custom tokens mapped from CSS vars, font families
```

---

## Demo

Static HTML demo: `index.html` (root of workspace). Uses IntersectionObserver + pure CSS transitions to simulate Framer Motion behaviour — no dependencies, opens directly in browser.

---

## Decisions

- No UI component library. Editorial design requires full CSS Grid control.
- Single page (`page.tsx`) — no per-section routes. Anchor navigation only.
- All content in `lib/data.ts`. Swap placeholder copy for real content there.
- Fonts loaded via `next/font/google` (zero layout shift, self-hosted in prod).
- `mix-blend-mode: multiply` on nav avoids needing scroll-based background logic.

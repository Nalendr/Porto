# Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a typography-driven portfolio website with strong UI/UX animation and animated background, following Phase 1-4 roadmap (design system → UI animation → scroll choreography → background)

**Architecture:** Next.js with TypeScript, Tailwind CSS, Motion (Framer Motion), GSAP + ScrollTrigger, React Three Fiber / Three.js, Lenis for smooth scrolling. Build in 4 phases: design system first, then UI animation, then scroll choreography, finally 3D background.

**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS, Motion (Framer Motion), GSAP, ScrollTrigger, React Three Fiber, Three.js, Lenis, Lucide icons, Vercel deployment

**Spec:** Phase 1-4 portfolio roadmap (user-provided)

---

## Global Constraints

- Use Next.js 14 with App Router
- TypeScript strict mode
- Tailwind CSS with custom typography configuration
- Motion for micro-interactions (page transitions, hover states, button animations)
- GSAP + ScrollTrigger for scroll-based storytelling animations
- React Three Fiber for 3D background (keep typography as hero)
- Lenis for smooth scrolling
- Lucide for icons
- Variable fonts via Google Fonts
- Deploy to Vercel

---

## Phase 1 — Design System

### Task 1: Initialize Next.js Project

**Files:**
- Create: `package.json` via `npx create-next-app@latest . --typescript --tailwind --eslint`
- Create: `next.config.js` with standard config
- Create: `tsconfig.json` with strict mode
- Modify: `tailwind.config.js` with custom typography settings

**Interfaces:**
- Consumes: none
- Produces: fresh Next.js project structure with TypeScript and Tailwind

**Step 1:** Run `npx create-next-app@latest . --typescript --tailwind --eslint`
**Step 2:** Verify `npm run dev` starts successfully
**Step 3:** Commit initial project scaffold

---

### Task 2: Set Up Design System Foundation

**Files:**
- Create: `src/styles/globals.css` with Tailwind base and typography reset
- Modify: `tailwind.config.js` with font families, variable font settings
- Create: `src/components/ui/` directory structure

**Interfaces:**
- Consumes: Next.js project from Task 1
- Produces: design system with typography, colors, spacing tokens

**Step 1:** Configure Tailwind with variable fonts (Inter or similar)
**Step 2:** Set up CSS variables for color palette in `globals.css`
**Step 3:** Create `src/components/ui/` with Button, Heading, Link components
**Step 4:** Commit design system foundation

---

### Task 3: Build Core Pages (No Animation)

**Files:**
- Create: `src/app/(dashboard)/page.tsx` - Homepage with hero
- Create: `src/app/about/page.tsx` - About page
- Create: `src/app/projects/page.tsx` - Projects grid
- Create: `src/app/experience/page.tsx` - Experience timeline
- Create: `src/app/contact/page.tsx` - Contact form
- Create: `src/app/footer.tsx` - Footer component

**Interfaces:**
- Consumes: design system from Task 2
- Produces: static pages with excellent typography, zero animation

**Step 1:** Build Navbar component with Logo and NavLinks
**Step 2:** Build Hero section with large variable font heading
**Step 3:** Build About, Projects, Experience, Contact pages
**Step 4:** Ensure pages look excellent with proper typography (clamp(), negative letter-spacing, mixed font weights)
**Step 5:** Test `npm run dev` - all pages render correctly
**Step 6:** Commit core pages

---

## Phase 2 — UI Animation (Motion)

### Task 4: Add Motion Micro-interactions

**Files:**
- Modify: `src/components/ui/Button.tsx` - add hover/press animations
- Modify: `src/components/ui/Navbar.tsx` - add page transition
- Modify: `src/components/ui/HeroText.tsx` - add text reveal on load
- Modify: `src/app/(dashboard)/page.tsx` - wrap hero in motion

**Interfaces:**
- Consumes: core pages from Task 3
- Produces: animated UI elements (page transitions, button hovers, text reveals)

**Step 1:** Add Motion variants for button hover/press states
**Step 2:** Add page transition using Motion's `AnimatePresence`
**Step 3:** Add text character-by-character reveal on hero load
**Step 4:** Add subtle hover states to project cards and links
**Step 5:** Test animations work in development
**Step 6:** Commit UI animation additions

---

### Task 5: Refine Motion Throughout Pages

**Files:**
- Modify: `src/components/ui/PageHeader.tsx` - add motion variants
- Modify: `src/components/ui/Section.tsx` - add staggered children animation
- Modify: `src/app/projects/page.tsx` - add motion to project cards

**Interfaces:**
- Consumes: animated UI from Task 4
- Produces: consistent motion patterns across all pages

**Step 1:** Add motion variants to page headers (fade-up, slide-in)
**Step 2:** Add staggered animation for section content children
**Step 3:** Add hover micro-interactions to project cards
**Step 4:** Test all motion across breakpoints
**Step 5:** Commit refined motion

---

## Phase 3 — Scroll Choreography (GSAP + ScrollTrigger)

### Task 6: Add GSAP Scroll-based Animations

**Files:**
- Create: `src/lib/gsap/` directory with animation utils
- Modify: `src/app/(dashboard)/page.tsx` - add hero section scroll animations
- Modify: `src/app/projects/page.tsx` - add project section enter animations
- Modify: `src/app/about/page.tsx` - add image reveal on scroll

**Interfaces:**
- Consumes: motion UI from Phase 2
- Produces: scroll-triggered typography and image animations

**Step 1:** Set up GSAP with ScrollTrigger in dedicated utils file
**Step 2:** Add hero title transforms on scroll (letters spread apart, reassemble)
**Step 3:** Add project section enter animations (cards slide in from sides)
**Step 4:** Add image reveal animations (fade/Scale on scroll)
**Step 5:** Add text movement animations as user scrolls
**Step 6:** Test scroll animations don't break on resize/navigate
**Step 7:** Commit GSAP scroll animations

---

### Task 7: Refine GSAP Animations Across Sections

**Files:**
- Modify: All page components - add consistent scroll triggers
- Create: `src/lib/gsap/animation-hooks.ts` shared patterns

**Interfaces:**
- Consumes: Task 6 animations
- Produces: polished scroll choreography across all pages

**Step 1:** Add title transforms on hero scroll
**Step 2:** Add pinned section with typography animation
**Step 3:** Add image reveal sequences across projects
**Step 4:** Ensure smooth scrub between sections
**Step 5:** Test on mobile (disable ScrollTrigger if needed)
**Step 6:** Commit refined scroll choreography

---

## Phase 4 — 3D Background (React Three Fiber + Three.js)

### Task 8: Add Simple 3D Background

**Files:**
- Create: `src/components/background/ParticleBackground.tsx`
- Modify: `src/app/layout.tsx` - add canvas wrapper
- Modify: `src/app/(dashboard)/page.tsx` - integrate background

**Interfaces:**
- Consumes: full app from Phase 3
- Produces: lightweight 3D background (particles + mouse interaction)

**Step 1:** Set up React Three Fiber `<Canvas>` in layout
**Step 2:** Add basic particle system (PointCloud) with subtle movement
**Step 3:** Add mouse interaction (particles follow cursor)
**Step 4:** Add subtle noise / gradient overlay
**Step 5:** Keep opacity low so typography remains hero
**Step 6:** Test performance on mobile (limit particle count)
**Step 7:** Commit 3D background

---

### Task 9: Enhance 3D Background (Optional)

**Files:**
- Modify: `src/components/background/ParticleBackground.tsx`
- Create: GLSL shader effects if desired

**Interfaces:**
- Consumes: Task 8 background
- Produces: more experimental background (shaders, distortion)

**Step 1:** Add gradient background as base layer
**Step 2:** Optionally add simple shader-based distortion
**Step 3:** Test impact on typography readability
**Step 4:** Commit or iterate based on feedback

---

## Completion

**Final Checklist:**
- [ ] Phase 1: Design system + core pages (no animation)
- [ ] Phase 2: Motion micro-interactions throughout
- [ ] Phase 3: GSAP scroll choreography
- [ ] Phase 4: 3D background (keep typography hero)
- [ ] Vercel deployment works
- [ ] Mobile responsive across all pages
- [ ] Performance acceptable (60fps on target devices)

**Next Step:** Execute via subagent-driven development or inline with executing-plans skill.
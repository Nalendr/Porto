# Portfolio — Japanese Editorial Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a Japanese editorial-style developer portfolio as a Next.js 14 app with TypeScript, Tailwind CSS v3, and Framer Motion 11.

**Architecture:** Single-page app using Next.js App Router. All sections render in `page.tsx` via imported components. Content is data-driven from `lib/data.ts`. Framer Motion variants are centralised in `lib/motion.ts` and consumed by each component.

**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS v3, Framer Motion 11, `next/font/google` (Shippori Mincho + Space Grotesk)

**Spec:** `docs/superpowers/specs/2026-09-13-portfolio-design.md`

## Global Constraints

- Next.js 14 App Router — no Pages Router patterns
- TypeScript strict mode — no `any`
- Tailwind CSS v3 — no v4 APIs
- Framer Motion 11 — use `motion` from `"framer-motion"`
- No UI component libraries (shadcn, MUI, etc.)
- No icon libraries — inline SVG only
- Fonts via `next/font/google` only — no `<link>` tags
- CSS custom properties: `--paper #F2EDE3`, `--ink #141210`, `--red #C1341A`, `--ghost #D9D3C6`
- All user-facing copy lives in `src/lib/data.ts` — no hardcoded strings in components
- All animations must have a `prefers-reduced-motion` fallback (variants provide `duration: 0` when reduced)
- Section padding desktop: `pt-[120px] pb-[120px] pl-[160px] pr-[40px]`; mobile: `px-6 py-20`

---

### Task 1: Project Scaffold

**Files:**
- Create: `package.json` (via `create-next-app`)
- Create: `tailwind.config.ts`
- Create: `src/app/globals.css`
- Create: `src/app/layout.tsx`

**Interfaces:**
- Produces: working dev server at `localhost:3000`; Tailwind token utilities (`bg-paper`, `text-ink`, `text-red`, `text-ghost`, `font-serif`, `font-sans`); CSS custom properties available globally; both fonts loaded with zero layout shift

- [ ] **Step 1: Scaffold Next.js app**

```bash
cd "C:\New folder\rice-detector\New folder\bcv"
npx create-next-app@14 . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm
```

Answer prompts: accept all defaults. This creates `package.json`, `tsconfig.json`, `tailwind.config.ts`, `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css`.

- [ ] **Step 2: Install Framer Motion**

```bash
npm install framer-motion@11
```

- [ ] **Step 3: Configure Tailwind tokens**

Replace contents of `tailwind.config.ts`:

```ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#F2EDE3',
        ink: '#141210',
        red: '#C1341A',
        ghost: '#D9D3C6',
      },
      fontFamily: {
        serif: ['var(--font-shippori)', 'serif'],
        sans: ['var(--font-grotesk)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
```

- [ ] **Step 4: Write globals.css**

Replace `src/app/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --paper: #F2EDE3;
  --ink: #141210;
  --red: #C1341A;
  --ghost: #D9D3C6;
}

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
}

body {
  background: var(--paper);
  color: var(--ink);
  font-family: var(--font-grotesk), sans-serif;
  font-size: 15px;
  line-height: 1.6;
  overflow-x: hidden;
}
```

- [ ] **Step 5: Write layout.tsx with fonts and metadata**

Replace `src/app/layout.tsx`:

```tsx
import type { Metadata } from 'next'
import { Shippori_Mincho, Space_Grotesk } from 'next/font/google'
import './globals.css'

const shippori = Shippori_Mincho({
  subsets: ['latin'],
  weight: ['400', '600', '800'],
  variable: '--font-shippori',
  display: 'swap',
})

const grotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-grotesk',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Yuki Kawamoto — Software Developer',
  description: 'Full-stack software developer. Precision engineering, from architecture to interaction.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${shippori.variable} ${grotesk.variable}`}>
      <body>{children}</body>
    </html>
  )
}
```

- [ ] **Step 6: Verify dev server starts**

```bash
npm run dev
```

Open `http://localhost:3000`. Should show default Next.js page. No TypeScript errors in terminal.

- [ ] **Step 7: Commit**

```bash
git init
git add .
git commit -m "feat: scaffold Next.js 14 + Tailwind + Framer Motion"
```

---

### Task 2: Content Data Layer

**Files:**
- Create: `src/lib/data.ts`

**Interfaces:**
- Produces:
  - `export const bio: Bio` — `{ name: string; location: string; role: string; available: boolean; about: string[] }`
  - `export const stats: Stat[]` — `{ number: string; label: string }[]`
  - `export const projects: Project[]` — `{ id: number; title: string; description: string; tags: string[] }[]`
  - `export const skills: SkillCategory[]` — `{ category: string; items: string }[]`
  - `export const experience: Experience[]` — `{ year: string; company: string; role: string; description: string }[]`
  - `export const contact: ContactLink[]` — `{ label: string; href: string }[]`

- [ ] **Step 1: Create `src/lib/data.ts`**

```ts
export type Bio = {
  name: string
  nameLines: string[]
  location: string
  role: string
  available: boolean
  about: string[]
}

export type Stat = {
  number: string
  label: string
}

export type Project = {
  id: number
  title: string
  description: string
  tags: string[]
}

export type SkillCategory = {
  category: string
  items: string
}

export type Experience = {
  year: string
  company: string
  role: string
  description: string
}

export type ContactLink = {
  label: string
  href: string
}

export const bio: Bio = {
  name: 'Yuki Kawamoto',
  nameLines: ['Yuki', 'Kawamoto'],
  location: 'Tokyo · Remote',
  role: 'I build precise, performant digital products — from system architecture to pixel-level interaction.',
  available: true,
  about: [
    "I'm a full-stack software developer with a deep interest in the intersection of systems thinking and human-facing interfaces. I care about the whole stack — from database schema to animation timing curves.",
    'Formerly at Mercari and Recruit Holdings. Currently building independently and taking selective consulting engagements.',
    "When I'm not writing code I'm reading about typography, urban infrastructure, and the philosophy of tools.",
  ],
}

export const stats: Stat[] = [
  { number: '7+', label: 'Years building' },
  { number: '34', label: 'Products shipped' },
  { number: '12', label: 'Open-source libs' },
  { number: '3', label: 'Startups founded' },
]

export const projects: Project[] = [
  {
    id: 1,
    title: 'Kōbo — Design System',
    description: 'Component library and token architecture used by 3 SaaS products. 200+ components, zero runtime dependencies.',
    tags: ['React', 'TypeScript', 'Design'],
  },
  {
    id: 2,
    title: 'Shizen — ML Pipeline',
    description: 'Real-time image classification pipeline processing 4M requests/day with sub-40ms p99 latency.',
    tags: ['Python', 'Kubernetes', 'ML'],
  },
  {
    id: 3,
    title: 'Mori — CMS Framework',
    description: 'Headless CMS built for editorial teams. Structured content, real-time collaboration, version branching.',
    tags: ['Go', 'PostgreSQL', 'Next.js'],
  },
  {
    id: 4,
    title: 'Umi — Commerce API',
    description: 'Payment and inventory orchestration layer. Handles ¥2B+ annual transaction volume across 6 storefronts.',
    tags: ['Node.js', 'Stripe', 'Redis'],
  },
  {
    id: 5,
    title: 'Hana — CLI Toolkit',
    description: 'Developer CLI for scaffolding, secrets, and deployment. 8k GitHub stars. Written in Rust.',
    tags: ['Rust', 'CLI', 'Open-source'],
  },
  {
    id: 6,
    title: 'Sora — Data Visualizer',
    description: 'Interactive analytics dashboard for non-technical stakeholders. Custom charting engine, no D3 dependency.',
    tags: ['Canvas', 'WebGL', 'SVG'],
  },
]

export const skills: SkillCategory[] = [
  { category: 'Languages', items: 'TypeScript, Python, Go, Rust, SQL' },
  { category: 'Frontend', items: 'React, Next.js, Framer Motion, WebGL, Canvas API' },
  { category: 'Backend', items: 'Node.js, FastAPI, gRPC, REST, GraphQL, WebSocket' },
  { category: 'Data', items: 'PostgreSQL, Redis, DynamoDB, Kafka, dbt' },
  { category: 'Infrastructure', items: 'AWS, GCP, Kubernetes, Terraform, Docker' },
  { category: 'Design', items: 'Figma, design systems, typography, motion design' },
]

export const experience: Experience[] = [
  {
    year: '2022',
    company: 'Independent',
    role: 'Freelance Software Architect',
    description: 'Working with early-stage startups and scale-ups on architecture, performance, and product development. Focus on TypeScript, Go, and distributed systems.',
  },
  {
    year: '2019',
    company: 'Mercari',
    role: 'Senior Software Engineer',
    description: 'Led migration of monolithic backend to microservices. Owned the search and discovery platform serving 20M MAU. Mentored a team of 6 engineers.',
  },
  {
    year: '2017',
    company: 'Recruit',
    role: 'Software Engineer',
    description: 'Built internal data infrastructure tools. Reduced query latency by 60% through query optimisation and caching layer redesign.',
  },
]

export const contact: ContactLink[] = [
  { label: 'Email', href: 'mailto:yuki@example.com' },
  { label: 'GitHub', href: 'https://github.com' },
  { label: 'LinkedIn', href: 'https://linkedin.com' },
  { label: 'Twitter / X', href: 'https://x.com' },
]
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/lib/data.ts
git commit -m "feat: add content data layer"
```

---

### Task 3: Motion Variants

**Files:**
- Create: `src/lib/motion.ts`

**Interfaces:**
- Produces:
  - `export const fadeUp: Variants` — `{ hidden, visible }` with `opacity` + `y` transition
  - `export const clipReveal: Variants` — `{ hidden, visible }` with `clipPath` transition
  - `export const ruleDrawVariants: Variants` — `{ hidden, visible }` with `scaleX` transition
  - `export const staggerContainer: Variants` — `{ hidden, visible }` with `staggerChildren: 0.08`
  - `export const heroLineVariants: Variants` — `{ hidden, visible }` with `y: "110%"→0`
  - `export const charStaggerContainer: Variants` — `{ hidden, visible }` with `staggerChildren: 0.1`
  - `export const reducedMotion: { transition: { duration: number } }` — `{ transition: { duration: 0 } }`
  - `export const viewportOnce: { once: boolean; margin: string }` — `{ once: true, margin: "0px 0px -60px 0px" }`

- [ ] **Step 1: Create `src/lib/motion.ts`**

```ts
import type { Variants } from 'framer-motion'

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
}

export const clipReveal: Variants = {
  hidden: { clipPath: 'inset(100% 0 0 0)' },
  visible: {
    clipPath: 'inset(0% 0 0 0)',
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
  },
}

export const ruleDrawVariants: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
}

export const heroLineVariants: Variants = {
  hidden: { y: '110%' },
  visible: {
    y: 0,
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
  },
}

export const charStaggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.3 },
  },
}

export const reducedMotion = {
  transition: { duration: 0 },
}

export const viewportOnce = {
  once: true,
  margin: '0px 0px -60px 0px',
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/lib/motion.ts
git commit -m "feat: add shared Framer Motion variants"
```

---

### Task 4: SectionWrapper Component

**Files:**
- Create: `src/components/SectionWrapper.tsx`

**Interfaces:**
- Consumes: `fadeUp`, `viewportOnce` from `@/lib/motion`
- Produces: `export default function SectionWrapper({ id, index, children, className }: SectionWrapperProps): JSX.Element`
  - Props: `{ id: string; index: string; children: React.ReactNode; className?: string }`
  - Renders: `<section>` with `border-top`, left-bleeding index watermark, and `section-content` wrapper that fades in on scroll

- [ ] **Step 1: Create `src/components/SectionWrapper.tsx`**

```tsx
'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { fadeUp, viewportOnce } from '@/lib/motion'

type SectionWrapperProps = {
  id: string
  index: string
  children: React.ReactNode
  className?: string
}

export default function SectionWrapper({ id, index, children, className = '' }: SectionWrapperProps) {
  const reduced = useReducedMotion()

  return (
    <section
      id={id}
      className={`relative overflow-hidden border-t border-ink pt-[120px] pb-[120px] pl-[160px] pr-10 max-lg:px-6 max-lg:py-20 ${className}`}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-[-0.05em] top-[60px] select-none font-serif text-[22vw] font-black leading-[0.8] tracking-[-0.04em] text-ghost z-0"
      >
        {index}
      </span>
      <motion.div
        className="relative z-10"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        transition={reduced ? { duration: 0 } : undefined}
      >
        {children}
      </motion.div>
    </section>
  )
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add src/components/SectionWrapper.tsx
git commit -m "feat: add SectionWrapper with index watermark and scroll reveal"
```

---

### Task 5: Nav Component

**Files:**
- Create: `src/components/Nav.tsx`

**Interfaces:**
- Consumes: nothing from data layer (nav links are static)
- Produces: `export default function Nav(): JSX.Element`

- [ ] **Step 1: Create `src/components/Nav.tsx`**

```tsx
'use client'

import { motion } from 'framer-motion'
import { fadeUp } from '@/lib/motion'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Works', href: '#works' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

export default function Nav() {
  return (
    <motion.nav
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 py-5 mix-blend-multiply max-lg:px-6"
    >
      <a
        href="#hero"
        className="font-serif text-[18px] font-black tracking-[-0.02em] text-ink no-underline"
      >
        YK.
      </a>
      <ul className="flex gap-8 list-none max-lg:hidden">
        {links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className="text-[11px] font-medium uppercase tracking-[0.12em] text-ink opacity-60 no-underline transition-opacity duration-200 hover:opacity-100"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </motion.nav>
  )
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add src/components/Nav.tsx
git commit -m "feat: add Nav component"
```

---

### Task 6: Hero Component

**Files:**
- Create: `src/components/Hero.tsx`

**Interfaces:**
- Consumes: `bio: Bio` from `@/lib/data`; `heroLineVariants`, `charStaggerContainer`, `fadeUp` from `@/lib/motion`
- Produces: `export default function Hero(): JSX.Element`

- [ ] **Step 1: Create `src/components/Hero.tsx`**

```tsx
'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { bio } from '@/lib/data'
import { heroLineVariants, charStaggerContainer, fadeUp } from '@/lib/motion'

export default function Hero() {
  const reduced = useReducedMotion()

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col justify-end border-b border-ink px-10 pb-20 max-lg:px-6 max-lg:pb-16"
    >
      <motion.p
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={reduced ? { duration: 0 } : { delay: 0.2 }}
        className="mb-6 text-[11px] font-medium uppercase tracking-[0.18em] opacity-50"
      >
        {bio.location}
      </motion.p>

      <h1 className="font-serif text-[clamp(56px,10vw,140px)] font-black leading-[0.92] tracking-[-0.03em]">
        <motion.span
          variants={charStaggerContainer}
          initial="hidden"
          animate="visible"
          className="block"
        >
          {bio.nameLines.map((line, i) => (
            <span key={i} className="block overflow-hidden">
              <motion.span
                variants={heroLineVariants}
                transition={reduced ? { duration: 0 } : undefined}
                className="block"
              >
                {line}
              </motion.span>
            </span>
          ))}
        </motion.span>
      </h1>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={reduced ? { duration: 0 } : { delay: 0.5 }}
        className="mt-12 flex items-end justify-between border-t border-ghost pt-6 max-sm:flex-col max-sm:items-start max-sm:gap-4"
      >
        <p className="max-w-[360px] text-[clamp(12px,1.4vw,16px)] leading-[1.5] tracking-[0.06em] opacity-70">
          {bio.role}
        </p>
        <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.1em]">
          <span className="h-[7px] w-[7px] animate-pulse rounded-full bg-red" />
          Available for work
        </div>
      </motion.div>

      <span
        className="absolute bottom-[100px] right-10 hidden text-[10px] uppercase tracking-[0.15em] opacity-40 [writing-mode:vertical-rl] lg:flex items-center gap-3 after:block after:h-[60px] after:w-px after:bg-current"
      >
        Scroll
      </span>
    </section>
  )
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add src/components/Hero.tsx
git commit -m "feat: add Hero component with slide-up name animation"
```

---

### Task 7: About Component

**Files:**
- Create: `src/components/About.tsx`

**Interfaces:**
- Consumes: `bio: Bio`, `stats: Stat[]` from `@/lib/data`; `clipReveal`, `staggerContainer`, `fadeUp`, `ruleDrawVariants`, `viewportOnce` from `@/lib/motion`; `SectionWrapper` from `@/components/SectionWrapper`
- Produces: `export default function About(): JSX.Element`

- [ ] **Step 1: Create `src/components/About.tsx`**

```tsx
'use client'

import { motion, useReducedMotion } from 'framer-motion'
import SectionWrapper from './SectionWrapper'
import { bio, stats } from '@/lib/data'
import { clipReveal, staggerContainer, fadeUp, ruleDrawVariants, viewportOnce } from '@/lib/motion'

export default function About() {
  const reduced = useReducedMotion()
  const t = (v: object) => (reduced ? { duration: 0 } : v)

  return (
    <SectionWrapper id="about" index="01">
      <motion.div
        className="mb-10 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-red"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        About
        <motion.span
          className="block h-px w-10 origin-left bg-red"
          variants={ruleDrawVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          transition={t({ duration: 0.6, ease: [0.16, 1, 0.3, 1] })}
        />
      </motion.div>

      <div className="grid max-w-[1100px] grid-cols-2 gap-20 max-lg:grid-cols-1 max-lg:gap-10">
        <div>
          <motion.p
            className="font-serif text-[clamp(28px,3.5vw,48px)] font-semibold leading-[1.2] tracking-[-0.02em]"
            variants={clipReveal}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            transition={t({ duration: 1, ease: [0.16, 1, 0.3, 1] })}
          >
            Code is the medium.<br />
            <em className="not-italic text-red">Clarity</em> is the craft.
          </motion.p>

          <motion.div
            className="mt-12 grid grid-cols-2 gap-8 border-t border-ghost pt-10"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {stats.map((stat) => (
              <motion.div key={stat.label} variants={fadeUp} transition={t({})}>
                <div className="font-serif text-[48px] font-black leading-[1] tracking-[-0.03em]">
                  {stat.number}
                </div>
                <div className="mt-1 text-[10px] uppercase tracking-[0.15em] opacity-50">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="space-y-5 text-[15px] leading-[1.8] opacity-75 max-w-[480px]"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {bio.about.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add src/components/About.tsx
git commit -m "feat: add About component"
```

---

### Task 8: Works Component

**Files:**
- Create: `src/components/Works.tsx`

**Interfaces:**
- Consumes: `projects: Project[]` from `@/lib/data`; `clipReveal`, `staggerContainer`, `fadeUp`, `ruleDrawVariants`, `viewportOnce` from `@/lib/motion`; `SectionWrapper` from `@/components/SectionWrapper`
- Produces: `export default function Works(): JSX.Element`

- [ ] **Step 1: Create `src/components/Works.tsx`**

```tsx
'use client'

import { motion, useReducedMotion } from 'framer-motion'
import SectionWrapper from './SectionWrapper'
import { projects } from '@/lib/data'
import { clipReveal, staggerContainer, fadeUp, ruleDrawVariants, viewportOnce } from '@/lib/motion'

export default function Works() {
  const reduced = useReducedMotion()
  const t = (v: object) => (reduced ? { duration: 0 } : v)

  return (
    <SectionWrapper id="works" index="02">
      <motion.div
        className="mb-10 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-red"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        Selected works
        <motion.span
          className="block h-px w-10 origin-left bg-red"
          variants={ruleDrawVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          transition={t({ duration: 0.6, ease: [0.16, 1, 0.3, 1] })}
        />
      </motion.div>

      <div className="mb-16 flex max-w-[1100px] items-baseline justify-between max-sm:flex-col max-sm:gap-2">
        <motion.h2
          className="font-serif text-[clamp(36px,5vw,72px)] font-black leading-[0.9] tracking-[-0.03em]"
          variants={clipReveal}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          transition={t({ duration: 1, ease: [0.16, 1, 0.3, 1] })}
        >
          Projects &amp;<br />experiments.
        </motion.h2>
        <motion.span
          className="text-[12px] uppercase tracking-[0.12em] opacity-40"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {projects.length} projects
        </motion.span>
      </div>

      <motion.div
        className="max-w-[1100px]"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        {projects.map((project) => (
          <motion.div
            key={project.id}
            variants={fadeUp}
            transition={t({})}
            className="group relative grid grid-cols-[80px_1fr_auto] items-baseline gap-8 border-b border-ghost py-7 cursor-pointer max-sm:grid-cols-[40px_1fr]"
          >
            <motion.span
              className="absolute bottom-[-1px] left-0 h-px bg-red origin-left"
              initial={{ scaleX: 0 }}
              whileHover={reduced ? {} : { scaleX: 1 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{ width: '100%' }}
            />
            <span className="text-[11px] font-medium uppercase tracking-[0.1em] opacity-40">
              {String(project.id).padStart(3, '0')}
            </span>
            <div>
              <div className="font-serif text-[clamp(20px,2.5vw,32px)] font-semibold leading-[1.1] tracking-[-0.01em] transition-colors duration-200 group-hover:text-red">
                {project.title}
              </div>
              <div className="mt-1 text-[13px] leading-[1.5] opacity-55">
                {project.description}
              </div>
            </div>
            <div className="flex flex-wrap justify-end gap-2 max-sm:hidden">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="border border-ghost px-[10px] py-1 text-[9px] font-semibold uppercase tracking-[0.14em] opacity-60"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  )
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add src/components/Works.tsx
git commit -m "feat: add Works component with hover underline animation"
```

---

### Task 9: Skills Component

**Files:**
- Create: `src/components/Skills.tsx`

**Interfaces:**
- Consumes: `skills: SkillCategory[]` from `@/lib/data`; `clipReveal`, `fadeUp`, `ruleDrawVariants`, `viewportOnce` from `@/lib/motion`; `SectionWrapper` from `@/components/SectionWrapper`
- Produces: `export default function Skills(): JSX.Element`

- [ ] **Step 1: Create `src/components/Skills.tsx`**

```tsx
'use client'

import { motion, useReducedMotion } from 'framer-motion'
import SectionWrapper from './SectionWrapper'
import { skills } from '@/lib/data'
import { clipReveal, fadeUp, ruleDrawVariants, viewportOnce } from '@/lib/motion'

export default function Skills() {
  const reduced = useReducedMotion()
  const t = (v: object) => (reduced ? { duration: 0 } : v)

  return (
    <SectionWrapper id="skills" index="03">
      <motion.div
        className="mb-10 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-red"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        Skills &amp; stack
        <motion.span
          className="block h-px w-10 origin-left bg-red"
          variants={ruleDrawVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          transition={t({ duration: 0.6, ease: [0.16, 1, 0.3, 1] })}
        />
      </motion.div>

      <motion.h2
        className="mb-14 font-serif text-[clamp(36px,5vw,72px)] font-black leading-[0.9] tracking-[-0.03em]"
        variants={clipReveal}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        transition={t({ duration: 1, ease: [0.16, 1, 0.3, 1] })}
      >
        The tools<br />I reach for.
      </motion.h2>

      <motion.div
        className="max-w-[900px] border border-ink"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        {skills.map((row) => (
          <div key={row.category} className="grid grid-cols-2 border-b border-ink last:border-b-0 max-sm:grid-cols-1">
            <div className="border-r border-ink px-7 py-5 text-[10px] font-semibold uppercase tracking-[0.18em] opacity-50 max-sm:border-r-0 max-sm:border-b max-sm:border-ink">
              {row.category}
            </div>
            <div className="px-7 py-5 font-serif text-[14px] leading-[1.6] tracking-[-0.01em]">
              {row.items}
            </div>
          </div>
        ))}
      </motion.div>
    </SectionWrapper>
  )
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add src/components/Skills.tsx
git commit -m "feat: add Skills component"
```

---

### Task 10: Experience Component

**Files:**
- Create: `src/components/Experience.tsx`

**Interfaces:**
- Consumes: `experience: Experience[]` from `@/lib/data`; `clipReveal`, `staggerContainer`, `fadeUp`, `ruleDrawVariants`, `viewportOnce` from `@/lib/motion`; `SectionWrapper` from `@/components/SectionWrapper`
- Produces: `export default function Experience(): JSX.Element`

- [ ] **Step 1: Create `src/components/Experience.tsx`**

```tsx
'use client'

import { motion, useReducedMotion } from 'framer-motion'
import SectionWrapper from './SectionWrapper'
import { experience } from '@/lib/data'
import { clipReveal, staggerContainer, fadeUp, ruleDrawVariants, viewportOnce } from '@/lib/motion'

export default function Experience() {
  const reduced = useReducedMotion()
  const t = (v: object) => (reduced ? { duration: 0 } : v)

  return (
    <SectionWrapper id="experience" index="04">
      <motion.div
        className="mb-10 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-red"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        Experience
        <motion.span
          className="block h-px w-10 origin-left bg-red"
          variants={ruleDrawVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          transition={t({ duration: 0.6, ease: [0.16, 1, 0.3, 1] })}
        />
      </motion.div>

      <motion.h2
        className="mb-[72px] font-serif text-[clamp(36px,5vw,72px)] font-black leading-[0.9] tracking-[-0.03em]"
        variants={clipReveal}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        transition={t({ duration: 1, ease: [0.16, 1, 0.3, 1] })}
      >
        Where I've<br />worked.
      </motion.h2>

      <motion.div
        className="max-w-[900px]"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        {experience.map((item) => (
          <motion.div
            key={item.year}
            variants={fadeUp}
            transition={t({})}
            className="grid grid-cols-[140px_1fr] gap-12 border-b border-ghost py-12 max-sm:grid-cols-1 max-sm:gap-3"
          >
            <div className="relative font-serif text-[48px] font-black leading-[1] tracking-[-0.04em] after:absolute after:top-[10px] after:right-[-24px] after:h-[7px] after:w-[7px] after:rounded-full after:bg-red after:shadow-[0_0_0_1px_#C1341A] after:ring-2 after:ring-paper max-sm:after:hidden">
              {item.year}
            </div>
            <div>
              <div className="font-serif text-[26px] font-semibold leading-[1] tracking-[-0.02em]">
                {item.company}
              </div>
              <div className="mb-4 mt-1 text-[12px] font-medium uppercase tracking-[0.1em] text-red">
                {item.role}
              </div>
              <p className="max-w-[520px] text-[14px] leading-[1.7] opacity-65">
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  )
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add src/components/Experience.tsx
git commit -m "feat: add Experience component"
```

---

### Task 11: Contact Component + Footer

**Files:**
- Create: `src/components/Contact.tsx`

**Interfaces:**
- Consumes: `contact: ContactLink[]` from `@/lib/data`; `clipReveal`, `staggerContainer`, `fadeUp`, `ruleDrawVariants`, `viewportOnce` from `@/lib/motion`; `SectionWrapper` from `@/components/SectionWrapper`
- Produces: `export default function Contact(): JSX.Element`

- [ ] **Step 1: Create `src/components/Contact.tsx`**

```tsx
'use client'

import { motion, useReducedMotion } from 'framer-motion'
import SectionWrapper from './SectionWrapper'
import { contact } from '@/lib/data'
import { clipReveal, staggerContainer, fadeUp, ruleDrawVariants, viewportOnce } from '@/lib/motion'

function ArrowIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M2 10L10 2M10 2H5M10 2V7" />
    </svg>
  )
}

export default function Contact() {
  const reduced = useReducedMotion()
  const t = (v: object) => (reduced ? { duration: 0 } : v)

  return (
    <>
      <SectionWrapper id="contact" index="05" className="min-h-[70vh] flex flex-col justify-center">
        <motion.div
          className="mb-10 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-red"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          Contact
          <motion.span
            className="block h-px w-10 origin-left bg-red"
            variants={ruleDrawVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            transition={t({ duration: 0.6, ease: [0.16, 1, 0.3, 1] })}
          />
        </motion.div>

        <motion.h2
          className="mb-16 font-serif text-[clamp(40px,7vw,100px)] font-black leading-[0.9] tracking-[-0.03em]"
          variants={clipReveal}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          transition={t({ duration: 1, ease: [0.16, 1, 0.3, 1] })}
        >
          Let's build<br />
          <span className="text-red">something</span><br />
          precise.
        </motion.h2>

        <motion.div
          className="flex flex-wrap items-center gap-12 max-sm:gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {contact.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              variants={fadeUp}
              transition={t({})}
              className="flex items-center gap-[10px] border-b border-ghost pb-1 text-[13px] font-medium uppercase tracking-[0.08em] text-ink opacity-60 no-underline transition-[opacity,border-color] duration-200 hover:border-red hover:opacity-100"
            >
              {link.label}
              <ArrowIcon />
            </motion.a>
          ))}
        </motion.div>
      </SectionWrapper>

      <footer className="flex items-center justify-between border-t border-ink px-10 py-8 max-lg:px-6">
        <span className="text-[11px] tracking-[0.06em] opacity-40">
          © 2026 Yuki Kawamoto. All rights reserved.
        </span>
        <span className="font-serif text-[11px] tracking-[0.06em] opacity-40">
          Designed with intention.
        </span>
      </footer>
    </>
  )
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add src/components/Contact.tsx
git commit -m "feat: add Contact component and Footer"
```

---

### Task 12: Assemble page.tsx

**Files:**
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: `Nav`, `Hero`, `About`, `Works`, `Skills`, `Experience`, `Contact` components
- Produces: complete single-page portfolio at `localhost:3000`

- [ ] **Step 1: Replace `src/app/page.tsx`**

```tsx
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Works from '@/components/Works'
import Skills from '@/components/Skills'
import Experience from '@/components/Experience'
import Contact from '@/components/Contact'

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Works />
        <Skills />
        <Experience />
        <Contact />
      </main>
    </>
  )
}
```

- [ ] **Step 2: Run dev server and visually verify all sections render**

```bash
npm run dev
```

Open `http://localhost:3000`. Check:
- Nav fixed, `mix-blend-mode: multiply` visible
- Hero name animates in on load
- Section watermark numbers bleed left
- Scroll reveals work on About, Works, Skills, Experience, Contact
- Red rule draws in on section labels
- Project hover shows sliding red underline
- Responsive: shrink browser to 768px, confirm mobile layout

- [ ] **Step 3: Run type check and lint**

```bash
npx tsc --noEmit
npm run lint
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: assemble complete portfolio page"
```

---

### Task 13: Production Build Verification

**Files:** none new

- [ ] **Step 1: Run production build**

```bash
npm run build
```

Expected: no TypeScript errors, no build errors. Note any warnings.

- [ ] **Step 2: Run production server and final check**

```bash
npm run start
```

Open `http://localhost:3000`. Verify:
- Fonts load with no layout shift (Shippori Mincho + Space Grotesk present)
- All animations fire on scroll
- No console errors

- [ ] **Step 3: Commit**

```bash
git add .
git commit -m "chore: verify production build passes"
```

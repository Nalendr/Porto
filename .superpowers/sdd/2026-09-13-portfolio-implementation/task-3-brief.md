# Task 3 Brief: Motion Variants

## From plan: docs/superpowers/plans/2026-09-13-portfolio-implementation.md

**Files:**
- Create: `src/lib/motion.ts`

**Interfaces:**
- Produces:
  - `export const fadeUp: Variants`
  - `export const clipReveal: Variants`
  - `export const ruleDrawVariants: Variants`
  - `export const staggerContainer: Variants`
  - `export const heroLineVariants: Variants`
  - `export const charStaggerContainer: Variants`
  - `export const reducedMotion: { transition: { duration: number } }`
  - `export const viewportOnce: { once: boolean; margin: string }`

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

## Global Constraints

- TypeScript strict mode — no `any`
- `Variants` type imported from `framer-motion`
- All 8 exports must use exact names as listed above
- Easing curve `[0.16, 1, 0.3, 1]` used verbatim (custom cubic bezier, not a named ease)
- `staggerChildren: 0.08` in `staggerContainer`
- `staggerChildren: 0.1, delayChildren: 0.3` in `charStaggerContainer`
- `viewportOnce.margin: '0px 0px -60px 0px'`

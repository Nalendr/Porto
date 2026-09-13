# Tasks 6 + 7 Brief: Hero + About Components

## Task 6: Hero Component

**Files:**
- Create: `src/components/Hero.tsx`

**Interfaces:**
- Consumes: `bio: Bio` from `@/lib/data`; `heroLineVariants`, `charStaggerContainer`, `fadeUp` from `@/lib/motion`
- Produces: `export default function Hero(): JSX.Element`

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

Commit: `git add src/components/Hero.tsx && git commit -m "feat: add Hero component with slide-up name animation"`

---

## Task 7: About Component

**Files:**
- Create: `src/components/About.tsx`

**Interfaces:**
- Consumes: `bio: Bio`, `stats: Stat[]` from `@/lib/data`; `clipReveal`, `staggerContainer`, `fadeUp`, `ruleDrawVariants`, `viewportOnce` from `@/lib/motion`; `SectionWrapper` from `@/components/SectionWrapper`
- Produces: `export default function About(): JSX.Element`

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

Commit: `git add src/components/About.tsx && git commit -m "feat: add About component"`

## Global Constraints

- `'use client'` on both files
- `useReducedMotion()` used — pass `transition={{ duration: 0 }}` when reduced
- No `any` type
- Import paths: `@/lib/data`, `@/lib/motion`, `./SectionWrapper`
- Verify `npx tsc --noEmit` after both files created — zero errors expected

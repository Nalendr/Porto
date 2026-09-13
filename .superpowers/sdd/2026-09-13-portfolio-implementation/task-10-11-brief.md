# Tasks 10 + 11 Brief: Experience + Contact Components

## Task 10: Experience Component

**Files:**
- Create: `src/components/Experience.tsx`

**Interfaces:**
- Consumes: `experience: Experience[]` from `@/lib/data`; `clipReveal`, `staggerContainer`, `fadeUp`, `ruleDrawVariants`, `viewportOnce` from `@/lib/motion`; `SectionWrapper` from `@/components/SectionWrapper`
- Produces: `export default function Experience(): JSX.Element`

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
        Where I&apos;ve<br />worked.
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

Commit: `git add src/components/Experience.tsx && git commit -m "feat: add Experience component"`

---

## Task 11: Contact Component + Footer

**Files:**
- Create: `src/components/Contact.tsx`

**Interfaces:**
- Consumes: `contact: ContactLink[]` from `@/lib/data`; `clipReveal`, `staggerContainer`, `fadeUp`, `ruleDrawVariants`, `viewportOnce` from `@/lib/motion`; `SectionWrapper` from `@/components/SectionWrapper`
- Produces: `export default function Contact(): JSX.Element` — includes both the contact section AND the footer `<footer>` element

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
          Let&apos;s build<br />
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

Commit: `git add src/components/Contact.tsx && git commit -m "feat: add Contact component and Footer"`

## Global Constraints

- `'use client'` on both files
- `useReducedMotion()` used
- No `any`
- Use `&apos;` for apostrophes in JSX (React Next.js lint rule)
- `npx tsc --noEmit` zero errors after both files

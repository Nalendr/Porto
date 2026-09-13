# Task 4 Brief: SectionWrapper Component

**Files:**
- Create: `src/components/SectionWrapper.tsx`

**Interfaces:**
- Consumes: `fadeUp`, `viewportOnce` from `@/lib/motion`
- Produces: `export default function SectionWrapper({ id, index, children, className }: SectionWrapperProps): JSX.Element`
  - Props: `{ id: string; index: string; children: React.ReactNode; className?: string }`
  - Renders: `<section>` with `border-top`, left-bleeding index watermark, and content wrapper that fades in on scroll

**Step 1: Create `src/components/SectionWrapper.tsx`**

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

**Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

**Step 3: Commit**

```bash
git add src/components/SectionWrapper.tsx
git commit -m "feat: add SectionWrapper with index watermark and scroll reveal"
```

## Global Constraints

- `'use client'` directive required (uses Framer Motion hooks)
- `useReducedMotion()` from framer-motion must be used — when true, pass `transition={{ duration: 0 }}` to override animation
- Index watermark: `font-serif text-[22vw] font-black` in `text-ghost`, `left-[-0.05em]`
- Section padding desktop: `pt-[120px] pb-[120px] pl-[160px] pr-10`; mobile override: `max-lg:px-6 max-lg:py-20`
- `border-t border-ink` on the section
- `className` prop optional with default `''`, appended to section classes

# Task 5 Brief: Nav Component

**Files:**
- Create: `src/components/Nav.tsx`

**Interfaces:**
- Produces: `export default function Nav(): JSX.Element`
- Nav links are static (not from data.ts)

**Step 1: Create `src/components/Nav.tsx`**

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

**Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

**Step 3: Commit**

```bash
git add src/components/Nav.tsx
git commit -m "feat: add Nav component"
```

## Global Constraints

- `'use client'` directive required
- `mix-blend-mode: multiply` via `mix-blend-multiply` Tailwind class
- Logo: `YK.` in `font-serif font-black text-[18px]`
- Nav links hidden on mobile: `max-lg:hidden` on `<ul>`
- `z-50` fixed positioning
- Links: `text-[11px] font-medium uppercase tracking-[0.12em] opacity-60 hover:opacity-100`

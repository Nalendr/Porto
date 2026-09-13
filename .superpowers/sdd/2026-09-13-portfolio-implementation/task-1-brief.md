# Task 1 Brief: Project Scaffold

## From plan: docs/superpowers/plans/2026-09-13-portfolio-implementation.md

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

Open `http://localhost:3000`. Should show default Next.js page. No TypeScript errors in terminal. You do NOT need to keep it running — just verify it starts, then Ctrl+C.

- [ ] **Step 7: Commit**

```bash
git add .
git commit -m "feat: scaffold Next.js 14 + Tailwind + Framer Motion"
```

## Global Constraints (binding for this task)

- Next.js 14 App Router — no Pages Router patterns
- TypeScript strict mode — no `any`
- Tailwind CSS v3 — no v4 APIs
- Framer Motion 11 — `npm install framer-motion@11`
- No UI component libraries
- Fonts via `next/font/google` only
- CSS custom properties: `--paper #F2EDE3`, `--ink #141210`, `--red #C1341A`, `--ghost #D9D3C6`
- Tailwind color tokens: `paper`, `ink`, `red`, `ghost`
- Font family tokens: `font-serif` → `var(--font-shippori)`, `font-sans` → `var(--font-grotesk)`

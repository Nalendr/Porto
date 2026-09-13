# Task 2 Brief: Content Data Layer

## From plan: docs/superpowers/plans/2026-09-13-portfolio-implementation.md

**Files:**
- Create: `src/lib/data.ts`

**Interfaces:**
- Produces:
  - `export const bio: Bio` — `{ name: string; nameLines: string[]; location: string; role: string; available: boolean; about: string[] }`
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

## Global Constraints

- TypeScript strict mode — no `any`
- All types exported (Bio, Stat, Project, SkillCategory, Experience, ContactLink)
- All data constants exported with exact names: `bio`, `stats`, `projects`, `skills`, `experience`, `contact`
- Copy content must match plan exactly (placeholder data for a fictional developer Yuki Kawamoto)

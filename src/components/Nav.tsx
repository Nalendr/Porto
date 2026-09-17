'use client'

import { motion } from 'framer-motion'
import { fadeUp } from '@/lib/motion'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Works', href: '#works' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
]

export default function Nav({ drawerOpen = false }: { drawerOpen?: boolean }) {
  return (
    <motion.nav
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className={[
        'fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 py-5 max-lg:px-6 transition-[background-color,border-color,backdrop-filter] duration-300',
        drawerOpen
          ? 'bg-paper/90 backdrop-blur-sm border-b border-ghost'
          : 'mix-blend-multiply',
      ].join(' ')}
    >
      <a
        href="#hero"
        className="font-serif text-[18px] font-black tracking-[-0.02em] text-ink no-underline"
      >
        FNs.
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

'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { bio } from '@/lib/data'
import { heroLineVariants, charStaggerContainer, fadeUp } from '@/lib/motion'
import HeroJapaneseAccent from '@/components/HeroJapaneseAccent'

export default function Hero() {
  const reduced = useReducedMotion()

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col justify-end border-b border-ink px-10 pb-20 max-lg:px-6 max-lg:pb-16"
    >
      <HeroJapaneseAccent />

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

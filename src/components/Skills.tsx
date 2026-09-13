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

'use client'

import { motion, useReducedMotion } from 'framer-motion'
import SectionWrapper from './SectionWrapper'
import { education } from '@/lib/data'
import { clipReveal, staggerContainer, fadeUp, ruleDrawVariants, viewportOnce } from '@/lib/motion'

export default function Education() {
  const reduced = useReducedMotion()
  const t = (v: object) => (reduced ? { duration: 0 } : v)

  return (
    <SectionWrapper id="education">
      <motion.div
        className="mb-10 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-red"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        Education
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
        Academic<br />background.
      </motion.h2>

      <motion.div
        className="max-w-[900px]"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        {education.map((item) => (
          <motion.div
            key={item.institution}
            variants={fadeUp}
            transition={t({})}
            className="grid grid-cols-[140px_1fr] gap-12 border-b border-ghost py-12 max-sm:grid-cols-1 max-sm:gap-3"
          >
            <div className="relative font-serif text-[48px] font-black leading-[1] tracking-[-0.04em] after:absolute after:top-[10px] after:right-[-24px] after:h-[7px] after:w-[7px] after:rounded-full after:bg-red after:shadow-[0_0_0_1px_#C1341A] after:ring-2 after:ring-paper max-sm:after:hidden">
              {item.year}
            </div>
            <div>
              <div className="font-serif text-[26px] font-semibold leading-[1] tracking-[-0.02em]">
                {item.institution}
              </div>
              <div className="mb-4 mt-1 text-[12px] font-medium uppercase tracking-[0.1em] text-red">
                {item.degree}
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

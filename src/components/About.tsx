'use client'

import { motion, useReducedMotion } from 'framer-motion'
import SectionWrapper from './SectionWrapper'
import { bio, stats } from '@/lib/data'
import { clipReveal, staggerContainer, fadeUp, ruleDrawVariants, viewportOnce } from '@/lib/motion'

export default function About() {
  const reduced = useReducedMotion()
  const t = (v: object) => (reduced ? { duration: 0 } : v)

  return (
    <SectionWrapper id="about">
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

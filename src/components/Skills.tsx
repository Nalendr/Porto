'use client'

import { motion, useReducedMotion } from 'framer-motion'
import SectionWrapper from './SectionWrapper'
import { skills } from '@/lib/data'
import { clipReveal, fadeUp, ruleDrawVariants, viewportOnce } from '@/lib/motion'

const ease = [0.16, 1, 0.3, 1] as const

export default function Skills() {
  const reduced = useReducedMotion()
  const t = (v: object) => (reduced ? { duration: 0 } : v)

  return (
    <SectionWrapper id="skills">
      {/* Section label */}
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
          transition={t({ duration: 0.6, ease })}
        />
      </motion.div>

      {/* Title */}
      <motion.h2
        className="mb-20 font-serif text-[clamp(36px,5vw,72px)] font-black leading-[0.9] tracking-[-0.03em]"
        variants={clipReveal}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        transition={t({ duration: 1, ease })}
      >
        The tools<br />I reach for.
      </motion.h2>

      {/* Magazine spread rows */}
      <div className="max-w-[1100px]">
        {skills.map((row, i) => {
          const items = row.items.split(',').map(s => s.trim())
          return (
            <motion.div
              key={row.category}
              className="group grid grid-cols-[64px_180px_1fr] items-center gap-10 border-t border-ghost py-8 last:border-b max-lg:grid-cols-[48px_140px_1fr] max-sm:grid-cols-1 max-sm:gap-3 max-sm:py-6"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              transition={t({ duration: 0.6, ease, delay: i * 0.06 })}
            >
              {/* Index number */}
              <span className="font-serif text-[clamp(28px,3vw,48px)] font-black leading-none tracking-[-0.04em] text-ghost transition-colors duration-300 group-hover:text-red">
                {String(i + 1).padStart(2, '0')}
              </span>

              {/* Category + animated rule */}
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ink opacity-40">
                  {row.category}
                </span>
                <span className="block h-px overflow-hidden bg-ghost">
                  <motion.span
                    className="block h-full w-full bg-red"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: false, margin: '0px 0px -40px 0px' }}
                    transition={t({ duration: 0.5, ease, delay: 0.15 + i * 0.06 })}
                    style={{ transformOrigin: 'left' }}
                  />
                </span>
              </div>

              {/* Items — middot separated */}
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                {items.map((item, j) => (
                  <span key={item} className="flex items-baseline gap-3">
                    <span className="font-serif text-[clamp(14px,1.4vw,18px)] tracking-[-0.01em]">
                      {item}
                    </span>
                    {j < items.length - 1 && (
                      <span className="text-[10px] text-ghost select-none">·</span>
                    )}
                  </span>
                ))}
              </div>
            </motion.div>
          )
        })}
      </div>
    </SectionWrapper>
  )
}

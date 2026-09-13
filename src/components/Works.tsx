'use client'

import { motion, useReducedMotion } from 'framer-motion'
import SectionWrapper from './SectionWrapper'
import { projects } from '@/lib/data'
import { clipReveal, staggerContainer, fadeUp, ruleDrawVariants, viewportOnce } from '@/lib/motion'

export default function Works() {
  const reduced = useReducedMotion()
  const t = (v: object) => (reduced ? { duration: 0 } : v)

  return (
    <SectionWrapper id="works" index="02">
      <motion.div
        className="mb-10 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-red"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        Selected works
        <motion.span
          className="block h-px w-10 origin-left bg-red"
          variants={ruleDrawVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          transition={t({ duration: 0.6, ease: [0.16, 1, 0.3, 1] })}
        />
      </motion.div>

      <div className="mb-16 flex max-w-[1100px] items-baseline justify-between max-sm:flex-col max-sm:gap-2">
        <motion.h2
          className="font-serif text-[clamp(36px,5vw,72px)] font-black leading-[0.9] tracking-[-0.03em]"
          variants={clipReveal}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          transition={t({ duration: 1, ease: [0.16, 1, 0.3, 1] })}
        >
          Projects &amp;<br />experiments.
        </motion.h2>
        <motion.span
          className="text-[12px] uppercase tracking-[0.12em] opacity-40"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {projects.length} projects
        </motion.span>
      </div>

      <motion.div
        className="max-w-[1100px]"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        {projects.map((project) => (
          <motion.div
            key={project.id}
            variants={fadeUp}
            transition={t({})}
            className="group relative grid grid-cols-[80px_1fr_auto] items-baseline gap-8 border-b border-ghost py-7 cursor-pointer max-sm:grid-cols-[40px_1fr]"
          >
            <motion.span
              className="absolute bottom-[-1px] left-0 h-px bg-red origin-left"
              initial={{ scaleX: 0 }}
              whileHover={reduced ? {} : { scaleX: 1 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{ width: '100%' }}
            />
            <span className="text-[11px] font-medium uppercase tracking-[0.1em] opacity-40">
              {String(project.id).padStart(3, '0')}
            </span>
            <div>
              <div className="font-serif text-[clamp(20px,2.5vw,32px)] font-semibold leading-[1.1] tracking-[-0.01em] transition-colors duration-200 group-hover:text-red">
                {project.title}
              </div>
              <div className="mt-1 text-[13px] leading-[1.5] opacity-55">
                {project.description}
              </div>
            </div>
            <div className="flex flex-wrap justify-end gap-2 max-sm:hidden">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="border border-ghost px-[10px] py-1 text-[9px] font-semibold uppercase tracking-[0.14em] opacity-60"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  )
}

'use client'

import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { projects } from '@/lib/data'
import type { Project } from '@/lib/data'
import { DrawerContent } from './ProjectDrawer'
import { clipReveal, staggerContainer, fadeUp, ruleDrawVariants, viewportOnce } from '@/lib/motion'

type Props = {
  onOpen: (p: Project) => void
  onClose: () => void
  selected: Project | null
}

const ease = [0.16, 1, 0.3, 1] as const

export default function Works({ onOpen, onClose, selected }: Props) {
  const reduced = useReducedMotion()
  const t = (v: object) => (reduced ? { duration: 0 } : v)

  return (
    <section
      id="works"
      className="relative border-t border-ink pt-[120px] pb-[120px] max-lg:px-6 max-lg:py-20"
      style={{ overflow: 'clip' }}
    >
      {/* Flex row: list left, drawer right */}
      <div className="relative z-10 flex items-start">

        {/* List column */}
        <div className="flex-1 min-w-0 pl-[160px] pr-10 max-lg:pl-0 max-lg:pr-0">

          {/* Section label */}
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
              transition={t({ duration: 0.6, ease })}
            />
          </motion.div>

          {/* Header */}
          <div className="mb-16 flex items-baseline justify-between max-sm:flex-col max-sm:gap-2">
            <motion.h2
              className="font-serif text-[clamp(36px,5vw,72px)] font-black leading-[0.9] tracking-[-0.03em]"
              variants={clipReveal}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              transition={t({ duration: 1, ease })}
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

          {/* Project rows */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {projects.map((project) => {
              const active = selected?.id === project.id
              return (
                <motion.div
                  key={project.id}
                  variants={fadeUp}
                  transition={t({})}
                  className={[
                    'group relative grid grid-cols-[80px_1fr_auto] items-baseline gap-8 border-b py-7 cursor-pointer max-sm:grid-cols-[40px_1fr]',
                    active ? 'border-red' : 'border-ghost',
                  ].join(' ')}
                  onClick={() => active ? onClose() : onOpen(project)}
                >
                  {/* Hover underline */}
                  {!active && (
                    <motion.span
                      className="absolute bottom-[-1px] left-0 h-px bg-red origin-left"
                      initial={{ scaleX: 0 }}
                      whileHover={reduced ? {} : { scaleX: 1 }}
                      transition={{ duration: 0.4, ease }}
                      style={{ width: '100%' }}
                    />
                  )}

                  <span className={['text-[11px] font-medium uppercase tracking-[0.1em]', active ? 'opacity-70 text-red' : 'opacity-40'].join(' ')}>
                    {String(project.id).padStart(3, '0')}
                  </span>
                  <div>
                    <div className={[
                      'font-serif text-[clamp(20px,2.5vw,32px)] font-semibold leading-[1.1] tracking-[-0.01em] transition-colors duration-200',
                      active ? 'text-red' : 'group-hover:text-red',
                    ].join(' ')}>
                      {project.title}
                    </div>
                    <div className="mt-1 text-[13px] leading-[1.5] opacity-55">
                      {project.description}
                    </div>
                  </div>
                  <div className="flex flex-wrap justify-end gap-2 max-sm:hidden">
                    {project.tags.map((tag) => (
                      <span key={tag} className="border border-ghost px-[10px] py-1 text-[9px] font-semibold uppercase tracking-[0.14em] opacity-60">
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>

        {/* Desktop drawer slot — inline flex child, slides in from right */}
        <AnimatePresence mode="wait">
          {selected && (
            <motion.div
              key={selected.id}
              className="hidden lg:flex flex-col sticky top-0 h-screen overflow-hidden border-l border-ink bg-paper flex-shrink-0 pt-[68px]"
              initial={reduced ? { opacity: 0, width: 0 } : { width: 0, opacity: 1 }}
              animate={reduced ? { opacity: 1, width: '45vw' } : { width: '45vw', opacity: 1 }}
              exit={reduced ? { opacity: 0, width: 0 } : { width: 0, opacity: 1 }}
              transition={{ duration: reduced ? 0.2 : 0.5, ease }}
              style={{ minWidth: 0 }}
            >
              <div className="w-[45vw] flex flex-col flex-1 h-full min-h-0">
                <DrawerContent p={selected} onClose={onClose} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  )
}

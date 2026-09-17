'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import type { Project } from '@/lib/data'

type Props = {
  project: Project | null
  onClose: () => void
}

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M2 10L10 2M10 2H5M10 2V7" />
    </svg>
  )
}

const ease = [0.16, 1, 0.3, 1] as const

const contentContainer = {
  hidden: {},
  visible: {
    transition: { delayChildren: 0.55, staggerChildren: 0.09 },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease } },
}

const lineSlide = {
  hidden: { y: '110%' },
  visible: { y: 0, transition: { duration: 0.75, ease } },
}

const watermarkFade = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1.2, ease, delay: 0.4 } },
}

function TypeWriter({ text, delayMs }: { text: string; delayMs: number }) {
  const reduced = useReducedMotion()
  const [displayed, setDisplayed] = useState('')

  useEffect(() => {
    if (reduced) { setDisplayed(text); return }
    setDisplayed('')
    const startTimer = setTimeout(() => {
      let i = 0
      const interval = setInterval(() => {
        i++
        setDisplayed(text.slice(0, i))
        if (i >= text.length) clearInterval(interval)
      }, 18)
      return () => clearInterval(interval)
    }, delayMs)
    return () => clearTimeout(startTimer)
  }, [text, delayMs, reduced])

  return <span>{reduced ? text : displayed}</span>
}

export default function ProjectModal({ project, onClose }: Props) {
  const reduced = useReducedMotion()

  // freeze last valid project so exit animation has stable data
  const frozen = useRef<Project | null>(null)
  if (project) frozen.current = project
  const p = frozen.current

  useEffect(() => {
    if (!project) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [project, onClose])

  const titleLines = p?.title.split('—').map(s => s.trim()) ?? []
  const outcomeDelayMs = 900
  const descBaseDelayMs = outcomeDelayMs + (p?.outcome.length ?? 0) * 18 + 300

  return (
    <AnimatePresence mode="wait">
      {project && p && (
        <motion.div key={p.id}>
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-[200] bg-ink/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.3 }}
            onClick={onClose}
          />

          <motion.div
            key="panel"
            className="fixed inset-0 z-[210] flex flex-col bg-paper overflow-y-auto"
            initial={{ y: reduced ? 0 : '100vh', opacity: reduced ? 0 : 1 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: reduced ? 0 : '100vh', opacity: reduced ? 0 : 1 }}
            transition={{ duration: reduced ? 0.2 : 0.6, ease }}
          >
            {/* key on content remounts TypeWriters cleanly when project changes */}
            <motion.div
              key={p.id}
              className="flex flex-col flex-1"
              variants={reduced ? undefined : contentContainer}
              initial="hidden"
              animate="visible"
            >
              {/* Top bar */}
              <motion.div
                className="flex items-center justify-between border-b border-ink px-10 py-5 max-lg:px-6"
                variants={reduced ? undefined : fadeUp}
              >
                <span className="font-sans text-[11px] font-medium uppercase tracking-[0.15em] opacity-40">
                  {String(p.id).padStart(3, '0')} — {p.year}
                </span>
                <button
                  onClick={onClose}
                  aria-label="Close project"
                  className="group flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.12em] opacity-50 transition-opacity hover:opacity-100"
                >
                  Close
                  <span className="inline-block transition-transform duration-200 group-hover:rotate-90">✕</span>
                </button>
              </motion.div>

              {/* Body */}
              <div className="relative flex flex-1 flex-col px-10 py-16 max-lg:px-6">

                {/* Watermark */}
                <motion.span
                  aria-hidden="true"
                  className="pointer-events-none absolute left-[-0.05em] top-16 select-none font-serif text-[22vw] font-black leading-[0.8] tracking-[-0.04em] text-ghost"
                  variants={reduced ? undefined : watermarkFade}
                >
                  {String(p.id).padStart(2, '0')}
                </motion.span>

                {/* Title */}
                <motion.div
                  className="relative z-10 mb-8"
                  variants={reduced ? undefined : fadeUp}
                >
                  <h2 className="font-serif text-[clamp(40px,7vw,96px)] font-black leading-[0.9] tracking-[-0.03em]">
                    {titleLines.map((line, i) => (
                      <span key={i} className="block overflow-hidden">
                        <motion.span
                          className="block"
                          variants={reduced ? undefined : lineSlide}
                          transition={reduced ? { duration: 0 } : { duration: 0.75, ease, delay: i * 0.08 }}
                        >
                          {i > 0 ? '— ' : ''}{line}
                        </motion.span>
                      </span>
                    ))}
                  </h2>
                </motion.div>

                {/* Meta row */}
                <motion.div
                  className="relative z-10 mb-12 flex flex-wrap items-center gap-6 border-t border-b border-ghost py-5"
                  variants={reduced ? undefined : fadeUp}
                >
                  <div>
                    <div className="text-[9px] font-semibold uppercase tracking-[0.2em] opacity-40 mb-1">Outcome</div>
                    <div className="font-serif text-[15px] tracking-[-0.01em]">
                      <TypeWriter text={p.outcome} delayMs={outcomeDelayMs} />
                    </div>
                  </div>
                  <div className="h-8 w-px bg-ghost" />
                  <div>
                    <div className="text-[9px] font-semibold uppercase tracking-[0.2em] opacity-40 mb-1">Stack</div>
                    <div className="flex flex-wrap gap-2">
                      {p.tags.map((tag) => (
                        <span
                          key={tag}
                          className="border border-ghost px-[10px] py-1 text-[9px] font-semibold uppercase tracking-[0.14em] opacity-60"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Description */}
                <motion.div
                  className="relative z-10 max-w-[680px] space-y-6"
                  variants={reduced ? undefined : fadeUp}
                >
                  {p.longDescription.map((para, i) => {
                    const prevMs = p.longDescription
                      .slice(0, i)
                      .reduce((acc, s) => acc + s.length * 18 + 300, 0)
                    return (
                      <p key={i} className="text-[15px] leading-[1.85] opacity-75">
                        <TypeWriter text={para} delayMs={descBaseDelayMs + prevMs} />
                      </p>
                    )
                  })}
                </motion.div>

                {/* Links */}
                {(p.viewProject || p.github) && (
                  <motion.div
                    className="relative z-10 mt-16 flex gap-8"
                    variants={reduced ? undefined : fadeUp}
                  >
                    {p.viewProject && (
                      <a
                        href={p.viewProject}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 border-b border-ink pb-1 text-[12px] font-semibold uppercase tracking-[0.1em] text-ink opacity-70 no-underline transition-opacity hover:opacity-100"
                      >
                        View project <ArrowIcon />
                      </a>
                    )}
                    {p.github && (
                      <a
                        href={p.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 border-b border-ghost pb-1 text-[12px] font-semibold uppercase tracking-[0.1em] text-ink opacity-40 no-underline transition-[opacity,border-color] hover:border-ink hover:opacity-70"
                      >
                        GitHub <ArrowIcon />
                      </a>
                    )}
                  </motion.div>
                )}

              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

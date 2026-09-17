'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import type { Project } from '@/lib/data'
import ProjectCarousel from './ProjectCarousel'

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
    transition: { delayChildren: 0.45, staggerChildren: 0.08 },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
}

const lineSlide = {
  hidden: { y: '110%' },
  visible: { y: 0, transition: { duration: 0.65, ease } },
}

const watermarkFade = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1.2, ease, delay: 0.3 } },
}

function TypeWriter({ text, delayMs }: { text: string; delayMs: number }) {
  const reduced = useReducedMotion()
  const [displayed, setDisplayed] = useState('')

  useEffect(() => {
    if (reduced) { setDisplayed(text); return }
    setDisplayed('')
    let interval: ReturnType<typeof setInterval> | undefined
    const startTimer = setTimeout(() => {
      let i = 0
      interval = setInterval(() => {
        i++
        setDisplayed(text.slice(0, i))
        if (i >= text.length) clearInterval(interval)
      }, 4)
    }, delayMs)
    return () => {
      clearTimeout(startTimer)
      if (interval) clearInterval(interval)
    }
  }, [text, delayMs, reduced])

  return <span>{reduced ? text : displayed}</span>
}

// Shared inner content — used by both desktop inline slot and mobile fixed sheet
export function DrawerContent({ p, onClose }: { p: Project; onClose: () => void }) {
  const reduced = useReducedMotion()
  const titleLines = p.title.split('—').map(s => s.trim())
  const outcomeDelayMs = 350
  const descBaseDelayMs = outcomeDelayMs + p.outcome.length * 4 + 80

  return (
    <motion.div
      key={p.id}
      className="flex flex-col flex-1 h-full min-h-0 overflow-hidden"
      variants={reduced ? undefined : contentContainer}
      initial="hidden"
      animate="visible"
    >
      {/* Top bar */}
      <motion.div
        className="flex items-center justify-between border-b border-ink px-8 py-5 bg-paper z-20 flex-shrink-0"
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
      <div className="relative flex-1 overflow-y-auto overflow-x-hidden px-8 py-10 min-h-0">

        {/* Watermark */}
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute left-[-0.05em] top-8 select-none font-serif text-[13vw] font-black leading-[0.8] tracking-[-0.04em] text-ghost"
          variants={reduced ? undefined : watermarkFade}
        >
          {String(p.id).padStart(2, '0')}
        </motion.span>

        {/* Title */}
        <motion.div className="relative z-10 mb-8 pt-1" variants={reduced ? undefined : fadeUp}>
          <h2 className="font-serif text-[clamp(28px,3.5vw,56px)] font-black leading-[0.95] tracking-[-0.03em]">
            {titleLines.map((line, i) => (
              <span key={i} className="block overflow-hidden">
                <motion.span
                  className="block"
                  variants={reduced ? undefined : lineSlide}
                  transition={reduced ? { duration: 0 } : { duration: 0.65, ease, delay: i * 0.07 }}
                >
                  {i > 0 ? '— ' : ''}{line}
                </motion.span>
              </span>
            ))}
          </h2>
        </motion.div>

        {/* Meta row */}
        <motion.div
          className="relative z-10 mb-8 flex flex-wrap items-start gap-6 border-t border-b border-ghost py-5"
          variants={reduced ? undefined : fadeUp}
        >
          <div>
            <div className="text-[9px] font-semibold uppercase tracking-[0.2em] opacity-40 mb-1">Outcome</div>
            <div className="font-serif text-[14px] tracking-[-0.01em]">
              <TypeWriter text={p.outcome} delayMs={outcomeDelayMs} />
            </div>
          </div>
          <div className="h-8 w-px bg-ghost self-center" />
          <div>
            <div className="text-[9px] font-semibold uppercase tracking-[0.2em] opacity-40 mb-1">Stack</div>
            <div className="flex flex-wrap gap-2">
              {p.tags.map((tag) => (
                <span key={tag} className="border border-ghost px-[10px] py-1 text-[9px] font-semibold uppercase tracking-[0.14em] opacity-60">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Free Scroll Image Carousel */}
        {p.images && p.images.length > 0 && (
          <motion.div variants={reduced ? undefined : fadeUp}>
            <ProjectCarousel images={p.images} title={p.title} />
          </motion.div>
        )}

        {/* Description */}
        <motion.div className="relative z-10 space-y-5" variants={reduced ? undefined : fadeUp}>
          {p.longDescription.map((para, i) => {
            const prevMs = p.longDescription.slice(0, i).reduce((acc, s) => acc + s.length * 4 + 80, 0)
            return (
              <p key={i} className="text-[14px] leading-[1.85] opacity-75">
                <TypeWriter text={para} delayMs={descBaseDelayMs + prevMs} />
              </p>
            )
          })}
        </motion.div>

        {/* Links */}
        {(p.viewProject || p.github) && (
          <motion.div className="relative z-10 mt-12 flex gap-8" variants={reduced ? undefined : fadeUp}>
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
  )
}

// Mobile-only: fixed bottom sheet
export default function ProjectDrawer({ project, onClose }: Props) {
  const reduced = useReducedMotion()

  const frozen = useRef<Project | null>(null)
  if (project) frozen.current = project
  const p = frozen.current

  useEffect(() => {
    if (!project) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [project, onClose])

  return (
    <div className="lg:hidden">
      {/* Mobile backdrop */}
      <AnimatePresence>
        {project && (
          <motion.div
            className="fixed inset-0 z-[200] bg-ink/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.3 }}
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Mobile bottom sheet */}
      <AnimatePresence mode="wait">
        {project && p && (
          <motion.div
            key={p.id}
            className="fixed z-[210] inset-x-0 bottom-0 top-[5vh] bg-paper overflow-hidden flex flex-col"
            initial={reduced ? { opacity: 0 } : { y: '100%' }}
            animate={reduced ? { opacity: 1 } : { y: 0 }}
            exit={reduced ? { opacity: 0 } : { y: '100%' }}
            transition={{ duration: reduced ? 0.2 : 0.45, ease }}
          >
            <DrawerContent p={p} onClose={onClose} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

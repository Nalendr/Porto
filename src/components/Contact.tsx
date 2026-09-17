'use client'

import { motion, useReducedMotion } from 'framer-motion'
import SectionWrapper from './SectionWrapper'
// import ChessHeatmap from './ChessHeatmap'
import { contact } from '@/lib/data'
import { clipReveal, staggerContainer, fadeUp, ruleDrawVariants, viewportOnce } from '@/lib/motion'

function ArrowIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M2 10L10 2M10 2H5M10 2V7" />
    </svg>
  )
}

export default function Contact() {
  const reduced = useReducedMotion()
  const t = (v: object) => (reduced ? { duration: 0 } : v)

  return (
    <>
      <SectionWrapper id="contact" index="05" className="min-h-[70vh] flex flex-col justify-center">
        <motion.div
          className="mb-10 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-red"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          Contact
          <motion.span
            className="block h-px w-10 origin-left bg-red"
            variants={ruleDrawVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            transition={t({ duration: 0.6, ease: [0.16, 1, 0.3, 1] })}
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Kolom Kiri: Statement & Link Kontak */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <motion.h2
              className="mb-12 font-serif text-[clamp(40px,5.5vw,84px)] font-black leading-[0.92] tracking-[-0.03em]"
              variants={clipReveal}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              transition={t({ duration: 1, ease: [0.16, 1, 0.3, 1] })}
            >
              Let&apos;s build<br />
              <span className="text-red">something</span><br />
              precise.
            </motion.h2>

            <motion.div
              className="flex flex-wrap items-center gap-8 max-sm:gap-5"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              {contact.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  variants={fadeUp}
                  transition={t({})}
                  className="flex items-center gap-[10px] border-b border-ghost pb-1 text-[13px] font-medium uppercase tracking-[0.08em] text-ink opacity-60 no-underline transition-[opacity,border-color] duration-200 hover:border-red hover:opacity-100"
                >
                  {link.label}
                  <ArrowIcon />
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Kolom Kanan: Chess Activity Heatmap */}
          {/* <div className="lg:col-span-7 w-full">
            <ChessHeatmap />
          </div> */}
        </div>
      </SectionWrapper>

      <footer className="flex items-center justify-between border-t border-ink px-10 py-8 max-lg:px-6">
        <span className="text-[11px] tracking-[0.06em] opacity-40">
          © 2026 Fauzya Shubhi Nalendrasidi. All rights reserved.
        </span>
        <span className="font-serif text-[11px] tracking-[0.06em] opacity-40">
          Designed with intention.
        </span>
      </footer>
    </>
  )
}
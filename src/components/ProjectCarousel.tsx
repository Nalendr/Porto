'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import type { ProjectImage } from '@/lib/data'

interface ProjectCarouselProps {
  images?: ProjectImage[]
  title: string
}

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

export default function ProjectCarousel({ images, title }: ProjectCarouselProps) {
  const reduced = useReducedMotion()
  const carouselRef = useRef<HTMLDivElement>(null)
  const [maxScroll, setMaxScroll] = useState(0)
  const [imgErrors, setImgErrors] = useState<Record<number, boolean>>({})

  const items = useMemo(() => {
    return images && images.length > 0
      ? images
      : [
          { caption: 'System Workflow Overview', tag: 'SYSTEM ARCHITECTURE' },
          { caption: 'Database Schema & Relations', tag: 'DATA ARCHITECTURE' },
          { caption: 'Operational User Interaction', tag: 'INTERFACE DEPLOYMENT' },
        ]
  }, [images])

  useEffect(() => {
    const updateConstraints = () => {
      if (carouselRef.current) {
        const scrollW = carouselRef.current.scrollWidth
        const offsetW = carouselRef.current.offsetWidth
        setMaxScroll(Math.max(0, scrollW - offsetW))
      }
    }

    updateConstraints()
    window.addEventListener('resize', updateConstraints)
    const timeout = setTimeout(updateConstraints, 250)
    return () => {
      window.removeEventListener('resize', updateConstraints)
      clearTimeout(timeout)
    }
  }, [items])

  return (
    <div className="relative z-10 mb-10 w-full overflow-hidden select-none">
      {/* Editorial Carousel Header */}
      <div className="flex items-center justify-between border-b border-ghost pb-2 mb-4">
        <div className="flex items-center gap-2">
          <span className="h-1 w-1 rounded-full bg-red" />
          <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-ink/60">
            Exhibit // Visual Plates [{String(items.length).padStart(2, '0')}]
          </span>
        </div>
        <div className="flex items-center gap-1 font-mono text-[9px] tracking-[0.16em] uppercase text-ink/40">
          <span>[ Drag / Scroll</span>
          <span className="text-red">← →</span>
          <span>]</span>
        </div>
      </div>

      {/* Free Scroll Drag Container */}
      <div
        ref={carouselRef}
        className="w-full overflow-hidden cursor-grab active:cursor-grabbing pb-2"
      >
        <motion.div
          drag={reduced ? false : 'x'}
          dragConstraints={{ right: 0, left: -maxScroll }}
          dragElastic={0.12}
          dragTransition={{ bounceStiffness: 450, bounceDamping: 28, power: 0.18 }}
          className="flex gap-5 w-max"
        >
          {items.map((item, idx) => {
            const hasError = imgErrors[idx]
            const rawSrc = item.src
            const resolvedSrc = rawSrc
              ? rawSrc.startsWith('/')
                ? (basePath && !rawSrc.startsWith(basePath) ? `${basePath}${rawSrc}` : rawSrc)
                : rawSrc
              : undefined
            const hasSrc = Boolean(resolvedSrc) && !hasError

            return (
              <div
                key={idx}
                className="group relative flex flex-col w-[280px] sm:w-[340px] shrink-0"
              >
                {/* Outer Plate Frame */}
                <div className="relative aspect-[16/10] w-full overflow-hidden border border-ink/40 bg-[#EDE7DA] shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                  {/* Tombo Corner Registration Marks (トンボ) */}
                  <span aria-hidden="true" className="pointer-events-none absolute top-1 left-1 font-mono text-[8px] text-ink/30 select-none leading-none z-10">+</span>
                  <span aria-hidden="true" className="pointer-events-none absolute top-1 right-1 font-mono text-[8px] text-ink/30 select-none leading-none z-10">+</span>
                  <span aria-hidden="true" className="pointer-events-none absolute bottom-1 left-1 font-mono text-[8px] text-ink/30 select-none leading-none z-10">+</span>
                  <span aria-hidden="true" className="pointer-events-none absolute bottom-1 right-1 font-mono text-[8px] text-ink/30 select-none leading-none z-10">+</span>

                  {hasSrc ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={resolvedSrc}
                      alt={item.caption}
                      draggable={false}
                      onError={() => setImgErrors((prev) => ({ ...prev, [idx]: true }))}
                      className="h-full w-full object-contain contrast-[1.1] brightness-[0.98] sepia-[0.06] transition-[filter,transform] duration-500 group-hover:scale-[1.02]"
                    />
                  ) : (
                    /* Minimal Blueprint Fallback Diagram */
                    <div className="relative h-full w-full flex flex-col justify-between p-4 bg-gradient-to-b from-[#EFEAE0] to-[#E3DCCF]">
                      {/* Background dot grid */}
                      <div className="absolute inset-0 opacity-[0.07] pointer-events-none bg-[radial-gradient(#141210_1px,transparent_1px)] [background-size:10px_10px]" />

                      {/* Header bar within schematic */}
                      <div className="flex justify-between items-center z-10">
                        <span className="font-mono text-[8px] tracking-[0.2em] text-ink/50 uppercase">
                          PLT-{String(idx + 1).padStart(2, '0')}
                        </span>
                        <span className="font-mono text-[8px] tracking-[0.15em] text-ink/40 uppercase">
                          {item.tag || 'DIAGRAM'}
                        </span>
                      </div>

                      {/* Center technical schematic */}
                      <div className="relative flex flex-col items-center justify-center my-auto z-10 py-2">
                        <div className="flex items-center gap-2">
                          <div className="h-6 w-12 border border-ink/30 bg-ink/[0.04] flex items-center justify-center font-mono text-[7px] text-ink/60">
                            IN
                          </div>
                          <span className="font-mono text-[9px] text-red">→</span>
                          <div className="h-8 w-16 border border-ink/50 bg-paper flex flex-col items-center justify-center font-mono text-[8px] text-ink font-semibold">
                            <span>SYS</span>
                            <span className="text-[6px] text-ink/40">CORE</span>
                          </div>
                          <span className="font-mono text-[9px] text-red">→</span>
                          <div className="h-6 w-12 border border-ink/30 bg-ink/[0.04] flex items-center justify-center font-mono text-[7px] text-ink/60">
                            OUT
                          </div>
                        </div>
                        <span className="mt-2 font-serif text-[10px] tracking-wider text-ink/40">
                          {title.split('—')[0]?.trim()}
                        </span>
                      </div>

                      {/* Bottom coordinate note */}
                      <div className="flex justify-between items-center z-10">
                        <span className="font-mono text-[7.5px] text-ink/40 uppercase">
                          SCALE: 1:1 · AUTO
                        </span>
                        <span className="font-serif text-[9px] text-red font-semibold">
                          [図面]
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Corner Index Tag */}
                  <div className="absolute top-2 right-2 z-10 bg-paper/90 px-1.5 py-0.5 border border-ink/20 text-[8px] font-mono tracking-widest text-ink/60 leading-none">
                    0{idx + 1}
                  </div>
                </div>

                {/* Plate Caption Bar */}
                <div className="mt-2 flex items-baseline justify-between border-t border-ghost/70 pt-1.5 px-0.5">
                  <span className="font-sans text-[10px] font-medium tracking-[0.04em] text-ink/80 truncate max-w-[200px] sm:max-w-[240px]">
                    FIG. 0{idx + 1} — {item.caption}
                  </span>
                  <span className="font-mono text-[8px] tracking-[0.15em] text-ink/40 uppercase shrink-0">
                    {item.tag || 'SPEC'}
                  </span>
                </div>
              </div>
            )
          })}
        </motion.div>
      </div>
    </div>
  )
}

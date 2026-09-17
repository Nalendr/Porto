'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { fadeUp, viewportOnce } from '@/lib/motion'

type SectionWrapperProps = {
  id: string
  children: React.ReactNode
  className?: string
}

export default function SectionWrapper({ id, children, className = '' }: SectionWrapperProps) {
  const reduced = useReducedMotion()

  return (
    <section
      id={id}
      className={`relative overflow-hidden border-t border-ink pt-[120px] pb-[120px] pl-[160px] pr-10 max-lg:px-6 max-lg:py-20 ${className}`}
    >
      <motion.div
        className="relative z-10"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        transition={reduced ? { duration: 0 } : undefined}
      >
        {children}
      </motion.div>
    </section>
  )
}

'use client'

import { useState, useCallback } from 'react'
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Works from '@/components/Works'
import Skills from '@/components/Skills'
import Experience from '@/components/Experience'
import Education from '@/components/Education'
import Contact from '@/components/Contact'
import ProjectDrawer from '@/components/ProjectDrawer'
import type { Project } from '@/lib/data'

export default function Page() {
  const [selected, setSelected] = useState<Project | null>(null)

  const handleOpen = useCallback((p: Project) => {
    if (selected) {
      setSelected(null)
      setTimeout(() => setSelected(p), 320)
    } else {
      setSelected(p)
    }
  }, [selected])

  const handleClose = useCallback(() => setSelected(null), [])

  return (
    <>
      <Nav drawerOpen={selected !== null} />
      {/* Mobile-only fixed bottom sheet */}
      <ProjectDrawer project={selected} onClose={handleClose} />
      <main>
        <Hero />
        <About />
        <Works onOpen={handleOpen} onClose={handleClose} selected={selected} />
        <Skills />
        <Experience />
        <Education />
        <Contact />
      </main>
    </>
  )
}

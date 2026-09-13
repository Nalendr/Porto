import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Works from '@/components/Works'
import Skills from '@/components/Skills'
import Experience from '@/components/Experience'
import Contact from '@/components/Contact'

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Works />
        <Skills />
        <Experience />
        <Contact />
      </main>
    </>
  )
}

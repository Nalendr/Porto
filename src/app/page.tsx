import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/sections/Hero';
import { KineticHeroBanner } from '@/components/sections/KineticHeroBanner';
import { PinnedStatementSection } from '@/components/sections/PinnedStatementSection';
import { About } from '@/components/sections/About';
import { Projects } from '@/components/sections/Projects';
import { Experience } from '@/components/sections/Experience';
import { Contact } from '@/components/sections/Contact';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16">
        <Hero />
        <KineticHeroBanner />
        <PinnedStatementSection />
        <About />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
'use client';

import { Container, Heading, Text, Button, Badge, TextReveal } from '@/components/ui';
import { ArrowDown } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GlitchMedia } from '@/components/ui/GlitchMedia';

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to('.hero-title-letter', {
        yPercent: -15,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.5,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <Container size="lg">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-[calc(100vh-5rem)]">
          {/* LEFT: Text */}
          <div className="max-w-2xl space-y-6 z-10">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge variant="outline" className="mb-4">Available for work · Software Developer</Badge>
            </motion.div>

            <Heading as="h1" size="display" className="text-balance select-none">
              <TextReveal text="HELLO," delay={0.1} className="hero-title-letter" />
              <br />
              <TextReveal text="I'M" delay={0.3} className="hero-title-letter" />
              <br />
              <span className="text-muted-foreground">
                <TextReveal text="NALENDRA." delay={0.5} className="hero-title-letter" />
              </span>
            </Heading>

            <motion.div
              className="hero-subtitle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Text size="lead" variant="muted" className="max-w-xl">
                Software Developer & Backend Specialist focused on RESTful APIs, system integration, Docker environments, and data-driven web applications.
              </Text>
            </motion.div>

            <motion.div
              className="hero-cta flex gap-4 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              <a href="#projects">
                <Button size="lg">
                  View Projects
                  <ArrowDown className="h-4 w-4" />
                </Button>
              </a>
              <a href="#contact">
                <Button size="lg" variant="outline">Get in Touch</Button>
              </a>
            </motion.div>
          </div>

          {/* RIGHT: Glitch Media */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 1 }}
            className="relative w-full max-w-200 mx-auto lg:mx-0"
          >
            <GlitchMedia mediaSrc="/Porto/video/muri.mp4" mediaType="video" className="w-full aspect-16/10 lg:aspect-16/10" />
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-xs text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
        >
        </motion.div>
      </Container>
    </section>
  );
}
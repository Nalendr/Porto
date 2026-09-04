'use client';

import { Container } from '@/components/ui';
import { motion } from 'motion/react';

export function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <Container size="lg" className="flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-muted-foreground">
        <p className="font-mono text-xs">
          (C) {new Date().getFullYear()} NALENDRA. ALL RIGHTS RESERVED.
        </p>
        <div className="flex items-center gap-6 text-xs font-mono uppercase tracking-wider">
          <a href="#about" className="hover:text-foreground transition-colors">About</a>
          <a href="#projects" className="hover:text-foreground transition-colors">Projects</a>
          <a href="#experience" className="hover:text-foreground transition-colors">Experience</a>
          <a href="#contact" className="hover:text-foreground transition-colors">Contact</a>
        </div>
      </Container>
    </footer>
  );
}
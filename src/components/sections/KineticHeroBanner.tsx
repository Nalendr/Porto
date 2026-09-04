'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function KineticHeroBanner() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!marqueeRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to('.marquee-track-1', {
        xPercent: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: marqueeRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.5,
        },
      });

      gsap.to('.marquee-track-2', {
        xPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: marqueeRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.5,
        },
      });
    }, marqueeRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={marqueeRef} className="py-20 overflow-hidden border-y border-border select-none pointer-events-none">
      <div className="marquee-track-1 flex gap-8 whitespace-nowrap text-7xl md:text-9xl font-black tracking-tightest opacity-15">
        <span>BACKEND ARCHITECTURE</span>
        <span>•</span>
        <span>SYSTEM INTEGRATION</span>
        <span>•</span>
        <span>RESTFUL APIS</span>
        <span>•</span>
        <span>DOCKER WORKFLOWS</span>
        <span>•</span>
      </div>
      <div className="marquee-track-2 flex gap-8 whitespace-nowrap text-7xl md:text-9xl font-black tracking-tightest opacity-15 mt-4">
        <span>GO • LARAVEL • PYTHON</span>
        <span>•</span>
        <span>AGILE DEVELOPMENT</span>
        <span>•</span>
        <span>MONITORING DASHBOARDS</span>
        <span>•</span>
        <span>ROBOTICS & SENSORS</span>
        <span>•</span>
      </div>
    </div>
  );
}
'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function KineticHeroBanner() {
  const containerRef = useRef<HTMLDivElement>(null);
  const track1Ref = useRef<HTMLDivElement>(null);
  const track2Ref = useRef<HTMLDivElement>(null);

  const row1Items = [
    'BACKEND ARCHITECTURE',
    'SYSTEM INTEGRATION',
    'RESTFUL APIS',
    'DOCKER WORKFLOWS',
    'LINUX DEPLOYMENTS',
  ];

  const row2Items = [
    'GO • LARAVEL • PYTHON',
    'AGILE DEVELOPMENT',
    'MONITORING DASHBOARDS',
    'SQL & DATABASES',
  ];

  useEffect(() => {
    if (!containerRef.current || !track1Ref.current || !track2Ref.current) return;

    const track1 = track1Ref.current;
    const track2 = track2Ref.current;

    // Duplicate content for seamless infinite looping
    track1.innerHTML = track1.innerHTML + track1.innerHTML + track1.innerHTML;
    track2.innerHTML = track2.innerHTML + track2.innerHTML + track2.innerHTML;

    const totalWidth1 = track1.scrollWidth / 3;
    const totalWidth2 = track2.scrollWidth / 3;

    // Row 1: Right to Left (slowed down from 35s to 65s)
    const tween1 = gsap.to(track1, {
      x: -totalWidth1,
      duration: 65,
      ease: 'none',
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x) => parseFloat(x) % totalWidth1),
      },
    });

    // Row 2: Left to Right for visual dynamic (slowed down to 75s)
    const tween2 = gsap.fromTo(
      track2,
      { x: -totalWidth2 },
      {
        x: 0,
        duration: 75,
        ease: 'none',
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize((x) => -totalWidth2 + (parseFloat(x) % totalWidth2)),
        },
      }
    );

    // Scroll velocity integration
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = Math.abs(currentScrollY - lastScrollY);
      lastScrollY = currentScrollY;

      // Gentle acceleration multiplier
      const velocityMultiplier = Math.min(2.5, 1 + scrollDelta * 0.08);

      tween1.timeScale(velocityMultiplier);
      tween2.timeScale(velocityMultiplier);

      // Smoothly ease back to baseline speed
      gsap.to([tween1, tween2], {
        timeScale: 1,
        duration: 1.2,
        overwrite: 'auto',
        ease: 'power2.out',
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      tween1.kill();
      tween2.kill();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="py-16 md:py-24 overflow-hidden border-y border-border select-none pointer-events-auto bg-background/50 backdrop-blur-sm space-y-4 md:space-y-6"
    >
      {/* Row 1: Right to Left */}
      <div
        ref={track1Ref}
        className="flex gap-12 md:gap-16 whitespace-nowrap text-5xl md:text-7xl lg:text-8xl font-black tracking-wider uppercase text-foreground/15"
      >
        {row1Items.map((item, idx) => (
          <span key={idx} className="flex items-center gap-12 md:gap-16">
            <span>{item}</span>
            <span>•</span>
          </span>
        ))}
      </div>

      {/* Row 2: Left to Right */}
      <div
        ref={track2Ref}
        className="flex gap-12 md:gap-16 whitespace-nowrap text-5xl md:text-7xl lg:text-8xl font-black tracking-wider uppercase text-foreground/10"
      >
        {row2Items.map((item, idx) => (
          <span key={idx} className="flex items-center gap-12 md:gap-16">
            <span>{item}</span>
            <span>•</span>
          </span>
        ))}
      </div>
    </div>
  );
}
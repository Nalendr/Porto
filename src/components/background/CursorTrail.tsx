'use client';

import { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  opacity: number;
  color: string;
}

export function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const lastMouseRef = useRef({ x: 0, y: 0 });
  const [dpr, setDpr] = useState(1);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const initCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const newDpr = Math.min(window.devicePixelRatio || 1, 2);
    setDpr(newDpr);

    const rect = canvas.parentElement?.getBoundingClientRect();
    const w = rect ? rect.width : window.innerWidth;
    const h = rect ? rect.height : window.innerHeight;

    setWidth(w);
    setHeight(h);

    canvas.width = w * newDpr;
    canvas.height = h * newDpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(newDpr, newDpr);
    }
  };

  useEffect(() => {
    initCanvas();
    window.addEventListener('resize', initCanvas);
    return () => window.removeEventListener('resize', initCanvas);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const spawnParticles = () => {
      const dx = mouseRef.current.x - lastMouseRef.current.x;
      const dy = mouseRef.current.y - lastMouseRef.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > 1) {
        const steps = Math.max(1, Math.floor(distance / 3));
        for (let i = 0; i < steps; i++) {
          const t = i / steps;
          const x = lastMouseRef.current.x + dx * t + (Math.random() - 0.5) * 4;
          const y = lastMouseRef.current.y + dy * t + (Math.random() - 0.5) * 4;

          particlesRef.current.push({
            x,
            y,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4 - 0.08,
            life: 1,
            maxLife: 0.8 + Math.random() * 0.6,
            size: 1 + Math.random() * 1.5,
            opacity: 0.15 + Math.random() * 0.25,
            color: Math.random() > 0.5 ? '#ffffff' : '#aaaaaa',
          });
        }
      }
      lastMouseRef.current = { ...mouseRef.current };
    };

    const updateParticles = () => {
      particlesRef.current = particlesRef.current
        .map((p) => ({
          ...p,
          x: p.x + p.vx,
          y: p.y + p.vy,
          vx: p.vx * 0.985,
          vy: p.vy * 0.985,
          life: p.life - 0.008,
          size: p.size * 0.995,
          opacity: p.opacity * 0.985,
        }))
        .filter((p) => p.life > 0 && p.opacity > 0.01);
    };

    const render = () => {
      if (!ctx) return;

      ctx.clearRect(0, 0, width, height);

      spawnParticles();
      updateParticles();

      particlesRef.current.forEach((p) => {
        const alpha = Math.max(0, Math.min(1, p.life / p.maxLife)) * p.opacity;
        ctx.globalAlpha = alpha;
        ctx.fillStyle = p.color;

        const size = Math.max(0.5, p.size);
        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalAlpha = 1;
      animationRef.current = requestAnimationFrame(render);
    };

    animationRef.current = requestAnimationFrame(render);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [width, height, dpr]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[-1] select-none"
      style={{ touchAction: 'none' }}
    />
  );
}
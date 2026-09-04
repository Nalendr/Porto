'use client';

import { useState, useRef, useEffect } from 'react';

interface GlitchMediaProps {
  mediaSrc: string;
  mediaType?: 'image' | 'video';
  className?: string;
}

interface KeycapTrail {
  id: number;
  char: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  scale: number;
  opacity: number;
}

const KEYS = ['W', 'A', 'S', 'D', '0', '1', 'F', 'E', 'Q', 'R', 'SHIFT', 'CTRL', 'ESC', 'TAB', 'SPACE', 'ALT'];

export function GlitchMedia({ mediaSrc, mediaType = 'video', className = '' }: GlitchMediaProps) {
  const [hasError, setHasError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [trails, setTrails] = useState<KeycapTrail[]>([]);
  const targetPos = useRef({ x: 0, y: 0 });
  const mouseInside = useRef(false);
  const lastSpawnTime = useRef(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    targetPos.current = { x, y };

    const now = Date.now();
    // Throttle spawn rate to ~45ms for dynamic density
    if (now - lastSpawnTime.current > 45) {
      lastSpawnTime.current = now;
      const newKey: KeycapTrail = {
        id: Math.random(),
        char: KEYS[Math.floor(Math.random() * KEYS.length)],
        x: x + (Math.random() - 0.5) * 24,
        y: y + (Math.random() - 0.5) * 24,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5 - 0.5,
        rotation: (Math.random() - 0.5) * 45,
        scale: 0.8 + Math.random() * 0.4,
        opacity: 1,
      };

      setTrails((prev) => [...prev.slice(-18), newKey]);
    }
  };

  const handleMouseEnter = () => {
    mouseInside.current = true;
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    mouseInside.current = false;
    setIsHovered(false);
  };

  useEffect(() => {
    let animId: number;

    const updateTrails = () => {
      setTrails((prev) =>
        prev
          .map((item) => ({
            ...item,
            x: item.x + item.vx,
            y: item.y + item.vy,
            opacity: item.opacity - 0.025,
            scale: item.scale * 0.985,
          }))
          .filter((item) => item.opacity > 0)
      );

      animId = requestAnimationFrame(updateTrails);
    };

    animId = requestAnimationFrame(updateTrails);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden rounded-2xl border border-border bg-muted/20 w-full h-full group select-none cursor-crosshair ${className}`}
    >
      {/* Glitch Overlay Layers */}
      <div className="absolute inset-0 pointer-events-none z-10 opacity-30 mix-blend-screen transition-opacity duration-300 group-hover:opacity-70">
        <div className="absolute inset-0 bg-red-500/10 translate-x-0.5 animate-pulse" />
        <div className="absolute inset-0 bg-cyan-500/10  translate-x-0.5 animate-pulse" />
      </div>

      {/* Scanline pattern */}
      <div className="absolute inset-0 z-20 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-size-[100%_4px] opacity-40" />

      {/* Keystroke Trail Overlay (Constrained to container) */}
      <div className="absolute inset-0 z-30 pointer-events-none overflow-hidden">
        {trails.map((k) => (
          <div
            key={k.id}
            className="absolute flex items-center justify-center font-mono font-bold uppercase rounded border transition-transform shadow-md"
            style={{
              left: `${k.x}px`,
              top: `${k.y}px`,
              transform: `translate(-50%, -50%) rotate(${k.rotation}deg) scale(${k.scale})`,
              opacity: k.opacity,
              backgroundColor: '#0a0a0a',
              borderColor: '#27272a',
              color: '#fafafa',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
              padding: k.char.length > 2 ? '2px 6px' : '4px 8px',
              fontSize: k.char.length > 2 ? '9px' : '11px',
              letterSpacing: '-0.05em',
            }}
          >
            {k.char}
          </div>
        ))}
      </div>

      {/* Fallback visual if muri.mp4 does not exist in /public */}
      {hasError ? (
        <div className="w-full h-full min-h-95 flex flex-col items-center justify-center bg-zinc-900 border border-border p-6 text-center">
          <div className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-2">[ MEDIA PLACEHOLDER ]</div>
          <div className="text-5xl md:text-9xl font-extrabold tracking-tighter text-foreground mb-4">MURI.MP4</div>
          <p className="text-xs text-muted-foreground max-w-xs font-mono">
            Place your video/image at <span className="text-foreground">/public/muri.mp4</span> to view custom media.
          </p>
        </div>
      ) : mediaType === 'video' ? (
        <video
          src={mediaSrc}
          autoPlay
          loop
          muted
          playsInline
          onError={() => setHasError(true)}
          className="w-full h-full object-cover grayscale contrast-125 brightness-90 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700 pointer-events-none"
        />
      ) : (
        <img
          src={mediaSrc}
          alt="Glitch Media"
          onError={() => setHasError(true)}
          className="w-full h-full object-cover grayscale contrast-125 brightness-90 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700 pointer-events-none"
        />
      )}
    </div>
  );
}
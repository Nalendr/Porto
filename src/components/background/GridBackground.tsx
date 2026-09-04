'use client';

import { useEffect, useRef } from 'react';

export function GridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    let charsGrid: { char: string; size: number }[][] = [];

    const cellSize = 25;
    const radius = 250;
    const symbols = ['=', '.', '-', '+', '0', 'O', 'x', ':', '•', '||'];

    const initGrid = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;

      const cols = Math.ceil(width / cellSize);
      const rows = Math.ceil(height / cellSize);
      charsGrid = [];

      for (let i = 0; i < rows; i++) {
        const row: { char: string; size: number }[] = [];
        for (let j = 0; j < cols; j++) {
          row.push({
            char: symbols[Math.floor(Math.random() * symbols.length)],
            size: Math.floor(Math.random() * 14) + 10,
          });
        }
        charsGrid.push(row);
      }
    };

    initGrid();

    const mouse = { x: width / 2, y: height / 2 };
    const targetMouse = { x: width / 2, y: height / 2 };

    const handleMouseMove = (e: MouseEvent) => {
      targetMouse.x = e.clientX;
      targetMouse.y = e.clientY;
    };

    window.addEventListener('resize', initGrid);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const render = () => {
      mouse.x += (targetMouse.x - mouse.x) * 0.15;
      mouse.y += (targetMouse.y - mouse.y) * 0.15;

      ctx.clearRect(0, 0, width, height);
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const cols = charsGrid[0]?.length || 0;
      const rows = charsGrid.length;

      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          const x = j * cellSize + cellSize / 2;
          const y = i * cellSize + cellSize / 2;

          const dx = x - mouse.x;
          const dy = y - mouse.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < radius) {
            const opacity = 1 - distance / radius;
            const cell = charsGrid[i][j];

            ctx.font = `${cell.size}px monospace`;
            ctx.fillStyle = `rgba(161, 161, 170, ${opacity * 0.7})`;
            ctx.fillText(cell.char, x, y);
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', initGrid);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[-5] pointer-events-none"
    />
  );
}
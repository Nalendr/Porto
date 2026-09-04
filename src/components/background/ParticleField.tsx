'use client';

import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const PARTICLE_COUNT = 1200;

export function ParticleField({ mouse }: { mouse: React.RefObject<{ x: number; y: number }> }) {
  const pointsRef = useRef<THREE.Points>(null);
  const { size } = useThree();

  const { positions, originalPositions } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const originalPositions = new Float32Array(PARTICLE_COUNT * 3);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const x = (Math.random() - 0.5) * 20;
      const y = (Math.random() - 0.5) * 20;
      const z = (Math.random() - 0.5) * 8;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      originalPositions[i * 3] = x;
      originalPositions[i * 3 + 1] = y;
      originalPositions[i * 3 + 2] = z;
    }

    return { positions, originalPositions };
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;

    const time = state.clock.elapsedTime;
    const pos = pointsRef.current.geometry.attributes.position.array as Float32Array;

    const mx = mouse.current ? (mouse.current.x / size.width) * 2 - 1 : 0;
    const my = mouse.current ? -(mouse.current.y / size.height) * 2 + 1 : 0;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      const ox = originalPositions[i3];
      const oy = originalPositions[i3 + 1];
      const oz = originalPositions[i3 + 2];

      // Gentle wave motion
      pos[i3] = ox + Math.sin(time * 0.3 + oy * 0.5) * 0.15;
      pos[i3 + 1] = oy + Math.cos(time * 0.2 + ox * 0.5) * 0.15;
      pos[i3 + 2] = oz + Math.sin(time * 0.1 + ox * oy) * 0.08;

      // Mouse repulsion
      const dx = pos[i3] - mx * 8;
      const dy = pos[i3 + 1] - my * 8;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const repulseRadius = 3;

      if (dist < repulseRadius) {
        const force = (repulseRadius - dist) / repulseRadius;
        pos[i3] += (dx / dist) * force * 0.6;
        pos[i3 + 1] += (dy / dist) * force * 0.6;
      }
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    // Slow rotation
    pointsRef.current.rotation.y = time * 0.02;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#888888"
        transparent
        opacity={0.5}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}
'use client';

import { useEffect, useRef } from 'react';

const VERTEX_SHADER_SOURCE = `
attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER_SOURCE = `
precision highp float;

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform float u_is_touch;

// Simplex-inspired compact 2D noise
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

float snoise(vec2 v) {
  const vec4 C = vec4(
    0.211324865405187,
    0.366025403784439,
    -0.577350269189626,
    0.024390243902439
  );
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
  vec2 fragCoord = gl_FragCoord.xy;
  vec2 uv = fragCoord / u_resolution;

  // Background deep near-black (#08090a)
  vec3 bg = vec3(0.031, 0.035, 0.039);

  // Responsive grid spacing
  float isMobile = step(u_resolution.x, 768.0);
  float spacing = mix(14.0, 18.0, isMobile);

  // Distort uv gently with time-varying organic field
  float t = u_time * 0.12;
  vec2 nCoord = (fragCoord / u_resolution.y) * 1.8;
  float n1 = snoise(nCoord + vec2(t * 0.25, -t * 0.2));
  float n2 = snoise(nCoord * 1.6 - vec2(t * 0.15, t * 0.18));

  vec2 flow = vec2(n1, n2) * (spacing * 0.45);

  // Mouse disturbance in screen space
  vec2 mouseDelta = fragCoord - u_mouse;
  float dist = length(mouseDelta);
  float radius = mix(180.0, 110.0, isMobile);
  float mouseEffect = 0.0;

  if (u_is_touch < 0.5 && dist < radius) {
    float strength = 1.0 - smoothstep(0.0, radius, dist);
    // Smooth radial push
    vec2 pushDir = normalize(mouseDelta + vec2(0.0001));
    flow += pushDir * strength * (spacing * 0.85);
    mouseEffect = strength;
  }

  vec2 distortedPos = fragCoord + flow;

  // Grid cell coordinates
  vec2 cellId = floor(distortedPos / spacing);
  vec2 cellUv = fract(distortedPos / spacing) - 0.5;

  // Dot intensity variance across surface
  float densityNoise = snoise(cellId * 0.04 + vec2(t * 0.08, t * 0.06));
  float baseBrightness = smoothstep(-0.6, 0.8, densityNoise) * 0.45 + 0.18;

  // Subtle wave brightness ripple
  float wave = sin(cellId.x * 0.12 + cellId.y * 0.08 + t * 1.4) * 0.1;
  baseBrightness = clamp(baseBrightness + wave, 0.08, 0.75);

  // Brighten near cursor
  baseBrightness = mix(baseBrightness, min(0.95, baseBrightness + 0.35), mouseEffect);

  // Render sharp antialiased dot
  float distToCenter = length(cellUv);
  float dotRadius = mix(0.075, 0.11, baseBrightness);
  dotRadius = mix(dotRadius, dotRadius * 1.35, mouseEffect);

  float pixelUnit = 1.0 / spacing;
  float dotMask = 1.0 - smoothstep(dotRadius - pixelUnit * 1.1, dotRadius + pixelUnit * 1.1, distToCenter);

  // Off-white / light-grey monochrome tone
  vec3 dotColor = mix(vec3(0.68, 0.71, 0.75), vec3(0.94, 0.95, 0.96), mouseEffect * 0.7);

  vec3 finalColor = mix(bg, dotColor, dotMask * baseBrightness);

  gl_FragColor = vec4(finalColor, 1.0);
}
`;

export function DotMatrixShader() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Detect reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const gl = canvas.getContext('webgl', {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: 'high-performance',
      preserveDrawingBuffer: false,
    });

    if (!gl) return;

    // Helper: compile shader
    const compileShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vert = compileShader(gl.VERTEX_SHADER, VERTEX_SHADER_SOURCE);
    const frag = compileShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER_SOURCE);
    if (!vert || !frag) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vert);
    gl.attachShader(program, frag);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      gl.deleteProgram(program);
      return;
    }

    gl.useProgram(program);

    // Full-screen quad
    const quadBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const posAttr = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(posAttr);
    gl.vertexAttribPointer(posAttr, 2, gl.FLOAT, false, 0, 0);

    const uResolution = gl.getUniformLocation(program, 'u_resolution');
    const uMouse = gl.getUniformLocation(program, 'u_mouse');
    const uTime = gl.getUniformLocation(program, 'u_time');
    const uIsTouch = gl.getUniformLocation(program, 'u_is_touch');

    const mouseCurrent = { x: -9999, y: -9999 };
    const mouseTarget = { x: -9999, y: -9999 };
    let isTouch = false;
    let isVisible = true;
    const startTime = performance.now();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uResolution, canvas.width, canvas.height);
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });

    const handleMouseMove = (e: MouseEvent) => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      mouseTarget.x = e.clientX * dpr;
      // WebGL Y inverted
      mouseTarget.y = (window.innerHeight - e.clientY) * dpr;
      isTouch = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!e.touches[0]) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      mouseTarget.x = e.touches[0].clientX * dpr;
      mouseTarget.y = (window.innerHeight - e.touches[0].clientY) * dpr;
      isTouch = true;
    };

    const handleMouseLeave = () => {
      mouseTarget.x = -9999;
      mouseTarget.y = -9999;
    };

    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const render = (now: number) => {
      if (isVisible) {
        // Smooth cursor interpolation
        mouseCurrent.x += (mouseTarget.x - mouseCurrent.x) * 0.12;
        mouseCurrent.y += (mouseTarget.y - mouseCurrent.y) * 0.12;

        const elapsedSeconds = prefersReducedMotion ? 0 : (now - startTime) * 0.001;

        gl.uniform2f(uMouse, mouseCurrent.x, mouseCurrent.y);
        gl.uniform1f(uTime, elapsedSeconds);
        gl.uniform1f(uIsTouch, isTouch ? 1.0 : 0.0);

        gl.drawArrays(gl.TRIANGLES, 0, 6);
      }
      animationFrameRef.current = requestAnimationFrame(render);
    };

    animationFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('visibilitychange', handleVisibilityChange);

      gl.deleteBuffer(quadBuffer);
      gl.deleteProgram(program);
      gl.deleteShader(vert);
      gl.deleteShader(frag);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none select-none"
      style={{ touchAction: 'none' }}
    />
  );
}
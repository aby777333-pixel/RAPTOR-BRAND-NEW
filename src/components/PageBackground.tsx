'use client';

import { useEffect, useRef } from 'react';

type Star = {
  x: number;
  y: number;
  z: number;
  base: number;
  warm: boolean;
};

const TARGET_DENSITY = 11000;
const Z_SPEED = 0.0019;

export default function PageBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    let stars: Star[] = [];
    let width = 0;
    let height = 0;
    let raf = 0;
    let visible = true;

    const make = (zStart?: number): Star => ({
      x: (Math.random() - 0.5) * 2,
      y: (Math.random() - 0.5) * 2,
      z: zStart ?? Math.random() * 0.95 + 0.05,
      base: 0.18 + Math.random() * 0.55,
      warm: Math.random() < 0.1
    });

    const seed = () => {
      const target = Math.max(
        80,
        Math.min(280, Math.floor((width * height) / TARGET_DENSITY))
      );
      stars = Array.from({ length: target }, () => make());
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    const tick = () => {
      if (!visible) {
        raf = requestAnimationFrame(tick);
        return;
      }
      ctx.clearRect(0, 0, width, height);
      const cx = width / 2;
      const cy = height / 2;
      const focal = Math.min(width, height) * 0.65;

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        s.z -= Z_SPEED;
        if (s.z <= 0.04) {
          stars[i] = make(1);
          continue;
        }
        const sx = (s.x * focal) / s.z + cx;
        const sy = (s.y * focal) / s.z + cy;
        if (sx < -20 || sx > width + 20 || sy < -20 || sy > height + 20) {
          stars[i] = make(1);
          continue;
        }
        const depth = 1 - s.z;
        const size = Math.max(0.4, depth * 1.7);
        const alpha = s.base * depth * 0.55;
        ctx.fillStyle = s.warm
          ? `rgba(240,201,90,${alpha})`
          : `rgba(150,215,250,${alpha})`;
        ctx.beginPath();
        ctx.arc(sx, sy, size, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(tick);
    };

    resize();
    if (reduceMotion) {
      tick();
      cancelAnimationFrame(raf);
    } else {
      raf = requestAnimationFrame(tick);
    }

    const onResize = () => resize();
    const onVisibility = () => {
      visible = document.visibilityState === 'visible';
    };
    window.addEventListener('resize', onResize);
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10"
      style={{ width: '100vw', height: '100vh' }}
    />
  );
}

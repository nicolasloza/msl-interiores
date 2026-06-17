'use client';

import { useState, useLayoutEffect } from 'react';

const MIN_MS = 5000;
const FADE_MS = 700;

function lockScroll() {
  document.documentElement.style.overflow = 'hidden';
  document.body.style.overflow = 'hidden';
}

function unlockScroll() {
  document.documentElement.style.overflow = '';
  document.body.style.overflow = '';
}

export default function SplashScreen() {
  const [phase, setPhase] = useState<'visible' | 'fading' | 'gone'>('visible');

  useLayoutEffect(() => {
    lockScroll();

    const navStart = Number(sessionStorage.getItem('msl-nav-start') || Date.now());
    const elapsed = Date.now() - navStart;
    const remaining = Math.max(0, MIN_MS - elapsed);

    const fadeTimer = setTimeout(() => setPhase('fading'), remaining);
    const goneTimer = setTimeout(() => {
      setPhase('gone');
      unlockScroll();
    }, remaining + FADE_MS);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(goneTimer);
      unlockScroll();
    };
  }, []);

  if (phase === 'gone') return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        background: '#FDFAF5',
        zIndex: 9998,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '28px',
        opacity: phase === 'fading' ? 0 : 1,
        transition: `opacity ${FADE_MS}ms cubic-bezier(0.4,0,0.2,1)`,
        pointerEvents: phase === 'fading' ? 'none' : 'auto',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-playfair), "Playfair Display", serif',
          fontSize: 'clamp(22px, 4vw, 32px)',
          fontWeight: 400,
          letterSpacing: '0.04em',
          color: '#2C2420',
        }}
      >
        MSL Interiores
      </span>

      <div
        style={{
          width: '48px',
          height: '1px',
          background: '#EDE8E0',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '40%',
            background: '#8B6F47',
            animation: 'msl-slide 1.6s cubic-bezier(0.4,0,0.6,1) infinite',
          }}
        />
      </div>

      <style>{`
        @keyframes msl-slide {
          0%   { transform: translateX(-160%); }
          60%  { transform: translateX(360%); }
          100% { transform: translateX(360%); }
        }
      `}</style>
    </div>
  );
}

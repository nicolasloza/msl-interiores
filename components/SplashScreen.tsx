'use client';

import { useState, useLayoutEffect } from 'react';
import LoaderVisual from './LoaderVisual';

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
      sessionStorage.setItem('msl-splash-done', '1');
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
        background: '#FDF4E9',
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
      <LoaderVisual />
    </div>
  );
}

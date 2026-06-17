'use client';

import { useEffect } from 'react';

export default function HomeLoading() {
  useEffect(() => {
    sessionStorage.setItem('msl-nav-start', String(Date.now()));
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: '#FDFAF5',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '28px',
        zIndex: 9999,
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

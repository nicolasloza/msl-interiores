export default function LoaderVisual() {
  return (
    <>
      <img
        src="/logo.png"
        alt="MSL Interiores"
        style={{ width: 'clamp(200px, 35vw, 320px)', height: 'auto' }}
      />

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
    </>
  );
}

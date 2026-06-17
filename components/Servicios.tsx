import type { ReactNode } from 'react';
import FadeIn from '@/components/FadeIn';
import type { ServiceIconId, Service } from '@/data/content';

type Props = { label: string; title: string; items: Service[] };

const SERVICE_ICONS: Record<ServiceIconId, ReactNode> = {
  'proyecto-integral': (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      style={{ width: '32px', height: '32px' }}
    >
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  'direccion-obra': (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      style={{ width: '32px', height: '32px' }}
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
    </svg>
  ),
};

export default function Servicios({ label, title, items }: Props) {

  return (
    <section id="servicios" className="section-pad" style={{ background: '#F0EBE1' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <FadeIn>
          <p
            style={{
              fontSize: '11px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#8B6F47',
              marginBottom: '16px',
              textAlign: 'center',
            }}
          >
            {label}
          </p>
          <h2
            className="serif"
            style={{
              fontSize: 'clamp(28px, 3.5vw, 42px)',
              fontWeight: 400,
              textAlign: 'center',
              marginBottom: '64px',
            }}
          >
            {title}
          </h2>
        </FadeIn>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '32px',
          }}
        >
          {items.map((s, i) => (
            <FadeIn key={s.title} delay={i * 120}>
              <div
                style={{
                  background: '#FDFAF5',
                  padding: '48px 40px',
                  transition: 'transform 0.3s',
                }}
              >
                <div style={{ color: '#8B6F47', marginBottom: '24px' }}>
                  {SERVICE_ICONS[s.iconId as ServiceIconId]}
                </div>
                <h3 className="serif" style={{ fontSize: '22px', fontWeight: 400, marginBottom: '16px' }}>
                  {s.title}
                </h3>
                <p style={{ fontSize: '14px', lineHeight: 1.8, color: '#5C4A42', fontWeight: 300 }}>
                  {s.desc}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

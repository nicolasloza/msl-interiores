import FadeIn from '@/components/FadeIn';
import { getSiteSection } from '@/lib/data-access';

export default async function Proceso() {
  const { label, title, steps } = await getSiteSection('proceso');

  return (
    <section id="proceso" style={{ background: '#2C2420', padding: '100px 48px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <FadeIn>
          <p
            style={{
              fontSize: '11px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#D4C5A9',
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
              color: '#FDFAF5',
              textAlign: 'center',
              marginBottom: '72px',
            }}
          >
            {title}
          </h2>
        </FadeIn>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '48px',
            position: 'relative',
          }}
        >
          {steps.map((step, i) => (
            <FadeIn key={step.num} delay={i * 100}>
              <div>
                <p
                  className="serif"
                  style={{
                    fontSize: '48px',
                    color: 'rgba(212,197,169,0.2)',
                    fontWeight: 400,
                    lineHeight: 1,
                    marginBottom: '20px',
                  }}
                >
                  {step.num}
                </p>
                <h3
                  style={{
                    fontSize: '14px',
                    fontWeight: 500,
                    color: '#FDFAF5',
                    letterSpacing: '0.05em',
                    marginBottom: '12px',
                  }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    fontSize: '13px',
                    lineHeight: 1.8,
                    color: 'rgba(253,250,245,0.55)',
                    fontWeight: 300,
                  }}
                >
                  {step.desc}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

import { getSiteSection } from '@/lib/data-access';

export default async function Footer() {
  const { brand, copyright } = await getSiteSection('footer');

  return (
    <footer
      style={{
        background: '#2C2420',
        padding: '24px 48px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '12px',
      }}
    >
      <span className="serif" style={{ color: 'rgba(253,250,245,0.4)', fontSize: '14px' }}>
        {brand}
      </span>
      <span style={{ color: 'rgba(253,250,245,0.3)', fontSize: '12px', letterSpacing: '0.05em' }}>
        {copyright}
      </span>
    </footer>
  );
}

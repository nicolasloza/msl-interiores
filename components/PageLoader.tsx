import LoaderVisual from './LoaderVisual';

export default function PageLoader() {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: '#FDF4E9',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '28px',
        zIndex: 9999,
      }}
    >
      <LoaderVisual />
    </div>
  );
}

import ProjectForm from '@/components/admin/ProjectForm';

export default function NuevoProyectoPage() {
  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <p style={{ fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#8B6F47', marginBottom: '8px' }}>
          Nuevo proyecto
        </p>
        <h1 style={{ fontFamily: 'var(--font-playfair), "Playfair Display", serif', fontSize: '28px', fontWeight: 400, color: '#2C2420', margin: 0 }}>
          Crear proyecto
        </h1>
      </div>

      <div style={{ background: '#FDFAF5', border: '1px solid #EDE8E0', padding: '32px' }}>
        <ProjectForm mode="create" />
      </div>
    </div>
  );
}

import AdminThemeProvider from '@/components/admin/AdminThemeProvider';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminSidebar from '@/components/admin/AdminSidebar';

export const metadata = {
  title: 'Admin · MSL Interiores',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminThemeProvider>
      <div
        style={{
          display: 'flex',
          minHeight: '100vh',
          background: '#F7F3ED',
          fontFamily: 'var(--font-inter), Inter, sans-serif',
        }}
      >
        {/* Sidebar desktop — el Header lo inyecta en mobile */}
        <div
          style={{ flexShrink: 0 }}
          className="admin-sidebar-desktop-wrapper"
        >
          <AdminSidebar />
        </div>

        {/* Main column */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          <AdminHeader />

          {/* Contenido — offset del header fijo (72px) */}
          <main
            style={{
              flex: 1,
              marginTop: '72px',
              padding: '32px',
              maxWidth: '1200px',
              width: '100%',
            }}
          >
            {children}
          </main>
        </div>
      </div>

      <style>{`
        @media (max-width: 899px) {
          .admin-sidebar-desktop-wrapper { display: none; }
          .admin-sidebar-desktop { display: none; }
        }
      `}</style>
    </AdminThemeProvider>
  );
}

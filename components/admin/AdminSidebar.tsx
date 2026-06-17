'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import GridViewIcon from '@mui/icons-material/GridView';
import ImageIcon from '@mui/icons-material/Image';
import EditNoteIcon from '@mui/icons-material/EditNote';
import LogoutIcon from '@mui/icons-material/Logout';
import CloseIcon from '@mui/icons-material/Close';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { signOut } from 'next-auth/react';

const SIDEBAR_WIDTH = 240;

const navItems = [
  { label: 'Dashboard', href: '/admin', icon: <GridViewIcon sx={{ fontSize: 18 }} />, exact: true },
  { label: 'Proyectos', href: '/admin/proyectos', icon: <ImageIcon sx={{ fontSize: 18 }} /> },
  { label: 'Contenido', href: '/admin/contenido', icon: <EditNoteIcon sx={{ fontSize: 18 }} /> },
  { label: 'Perfil', href: '/admin/perfil', icon: <PersonOutlineIcon sx={{ fontSize: 18 }} /> },
];

type Props = {
  mobileOpen?: boolean;
  onMobileClose?: () => void;
};

function SidebarContent({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();

  function isActive(href: string, exact?: boolean) {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  }

  return (
    <div
      style={{
        width: SIDEBAR_WIDTH,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: '#FDFAF5',
        borderRight: '1px solid #EDE8E0',
      }}
    >
      {/* Logo */}
      <div
        style={{
          height: '72px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px',
          borderBottom: '1px solid #EDE8E0',
          flexShrink: 0,
        }}
      >
        <Link href="/admin" style={{ textDecoration: 'none' }}>
          <span
            style={{
              fontFamily: 'var(--font-playfair), "Playfair Display", serif',
              fontSize: '18px',
              fontWeight: 500,
              color: '#2C2420',
              letterSpacing: '0.03em',
            }}
          >
            MSL Admin
          </span>
        </Link>
        {onClose && (
          <IconButton onClick={onClose} size="small" sx={{ color: '#8B6F47' }}>
            <CloseIcon sx={{ fontSize: 18 }} />
          </IconButton>
        )}
      </div>

      {/* Etiqueta sección */}
      <div style={{ padding: '24px 24px 8px' }}>
        <p
          style={{
            fontSize: '10px',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: '#8B6F47',
            margin: 0,
          }}
        >
          Panel
        </p>
      </div>

      {/* Navegación */}
      <List disablePadding sx={{ flex: 1, px: 1 }}>
        {navItems.map((item) => (
          <ListItemButton
            key={item.href}
            component={Link}
            href={item.href}
            selected={isActive(item.href, item.exact)}
            onClick={onClose}
            sx={{
              py: 1.25,
              px: 2,
              mb: 0.5,
              gap: 1.5,
            }}
          >
            <ListItemIcon sx={{ minWidth: 'auto', color: isActive(item.href, item.exact) ? '#8B6F47' : '#5C4A42' }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.label}
              primaryTypographyProps={{
                fontSize: '13px',
                letterSpacing: '0.04em',
                color: isActive(item.href, item.exact) ? '#2C2420' : '#5C4A42',
                fontWeight: isActive(item.href, item.exact) ? 500 : 400,
              }}
            />
          </ListItemButton>
        ))}
      </List>

      <Divider />

      {/* Footer sidebar */}
      <div style={{ padding: '12px 8px' }}>
        <ListItemButton
          onClick={() => signOut({ callbackUrl: '/' })}
          sx={{ py: 1.25, px: 2, gap: 1.5 }}
        >
          <ListItemIcon sx={{ minWidth: 'auto', color: '#5C4A42' }}>
            <LogoutIcon sx={{ fontSize: 18 }} />
          </ListItemIcon>
          <ListItemText
            primary="Cerrar sesión"
            primaryTypographyProps={{ fontSize: '13px', letterSpacing: '0.04em', color: '#5C4A42' }}
          />
        </ListItemButton>
        <div style={{ padding: '8px 16px 4px' }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <p style={{ fontSize: '11px', color: '#8B6F47', letterSpacing: '0.05em', margin: 0 }}>
              ← Ver sitio público
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function AdminSidebar({ mobileOpen, onMobileClose }: Props) {
  return (
    <>
      {/* Desktop */}
      <div
        style={{ width: SIDEBAR_WIDTH, flexShrink: 0 }}
        className="admin-sidebar-desktop"
      >
        <div
          style={{
            position: 'fixed',
            width: SIDEBAR_WIDTH,
            height: '100vh',
            top: 0,
            left: 0,
            zIndex: 10,
          }}
        >
          <SidebarContent />
        </div>
      </div>

      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onMobileClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          '& .MuiDrawer-paper': { width: SIDEBAR_WIDTH },
        }}
      >
        <SidebarContent onClose={onMobileClose} />
      </Drawer>
    </>
  );
}

export { SIDEBAR_WIDTH };

'use client';

import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AdminSidebar from './AdminSidebar';
import AdminBreadcrumbs from './AdminBreadcrumbs';

export default function AdminHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          zIndex: 11,
          borderBottom: '1px solid #EDE8E0',
          background: '#FDFAF5',
          color: '#2C2420',
        }}
      >
        <Toolbar
          sx={{
            minHeight: '72px !important',
            px: { xs: 2, md: 4 },
            gap: 2,
          }}
        >
          <IconButton
            edge="start"
            onClick={() => setMobileOpen(true)}
            sx={{
              display: { xs: 'flex', md: 'none' },
              color: '#2C2420',
              borderRadius: 0,
            }}
          >
            <MenuIcon />
          </IconButton>

          <AdminBreadcrumbs />
        </Toolbar>
      </AppBar>

      <AdminSidebar
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />
    </>
  );
}

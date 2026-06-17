'use client';

import { ThemeProvider } from '@mui/material/styles';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { mslTheme } from '@/lib/mui-theme';

export default function AdminThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={mslTheme}>{children}</ThemeProvider>
    </AppRouterCacheProvider>
  );
}

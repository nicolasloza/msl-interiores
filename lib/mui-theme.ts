import { createTheme } from '@mui/material/styles';

export const mslTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#8B6F47',
      dark: '#7a5f3a',
      light: '#a08060',
      contrastText: '#FDFAF5',
    },
    secondary: {
      main: '#2C2420',
      dark: '#1a1512',
      light: '#3D2E28',
      contrastText: '#FDFAF5',
    },
    background: {
      default: '#FDFAF5',
      paper: '#FDFAF5',
    },
    text: {
      primary: '#2C2420',
      secondary: '#5C4A42',
      disabled: 'rgba(44,36,32,0.4)',
    },
    divider: '#EDE8E0',
    error: {
      main: '#b5451b',
      light: '#d4623a',
    },
    success: {
      main: '#4a7c59',
    },
    warning: {
      main: '#b08d2e',
    },
    grey: {
      50: '#FDFAF5',
      100: '#F7F3ED',
      200: '#F0EBE1',
      300: '#EDE8E0',
      400: '#D4C5A9',
      500: '#B8A890',
      600: '#8B6F47',
      700: '#5C4A42',
      800: '#3D2E28',
      900: '#2C2420',
    },
  },

  typography: {
    fontFamily: 'var(--font-inter), Inter, -apple-system, sans-serif',
    h1: {
      fontFamily: 'var(--font-playfair), "Playfair Display", serif',
      fontWeight: 400,
    },
    h2: {
      fontFamily: 'var(--font-playfair), "Playfair Display", serif',
      fontWeight: 400,
    },
    h3: {
      fontFamily: 'var(--font-playfair), "Playfair Display", serif',
      fontWeight: 400,
    },
    h4: {
      fontFamily: 'var(--font-playfair), "Playfair Display", serif',
      fontWeight: 400,
    },
    h5: {
      fontFamily: 'var(--font-inter), Inter, sans-serif',
      fontWeight: 500,
      letterSpacing: '0.04em',
    },
    h6: {
      fontFamily: 'var(--font-inter), Inter, sans-serif',
      fontWeight: 500,
      letterSpacing: '0.04em',
    },
    subtitle1: {
      fontSize: '13px',
      letterSpacing: '0.08em',
      textTransform: 'uppercase' as const,
      color: '#8B6F47',
    },
    subtitle2: {
      fontSize: '11px',
      letterSpacing: '0.12em',
      textTransform: 'uppercase' as const,
    },
    body1: {
      fontSize: '15px',
      lineHeight: 1.75,
      fontWeight: 300,
    },
    body2: {
      fontSize: '13px',
      lineHeight: 1.6,
    },
    caption: {
      fontSize: '11px',
      letterSpacing: '0.08em',
      color: '#8B6F47',
    },
    overline: {
      fontSize: '10px',
      letterSpacing: '0.15em',
      textTransform: 'uppercase' as const,
      color: '#8B6F47',
    },
    button: {
      fontSize: '12px',
      fontWeight: 400,
      letterSpacing: '0.12em',
      textTransform: 'uppercase' as const,
    },
  },

  shape: {
    borderRadius: 0,
  },

  shadows: [
    'none',
    '0 1px 4px rgba(44,36,32,0.08)',
    '0 2px 8px rgba(44,36,32,0.10)',
    '0 4px 16px rgba(44,36,32,0.10)',
    '0 4px 16px rgba(44,36,32,0.12)',
    '0 8px 24px rgba(44,36,32,0.12)',
    '0 8px 24px rgba(44,36,32,0.14)',
    '0 12px 32px rgba(44,36,32,0.14)',
    '0 12px 32px rgba(44,36,32,0.16)',
    '0 16px 40px rgba(44,36,32,0.16)',
    '0 16px 40px rgba(44,36,32,0.18)',
    '0 20px 48px rgba(44,36,32,0.18)',
    '0 20px 48px rgba(44,36,32,0.20)',
    '0 24px 56px rgba(44,36,32,0.20)',
    '0 24px 56px rgba(44,36,32,0.22)',
    '0 28px 64px rgba(44,36,32,0.22)',
    '0 28px 64px rgba(44,36,32,0.24)',
    '0 32px 72px rgba(44,36,32,0.24)',
    '0 32px 72px rgba(44,36,32,0.26)',
    '0 36px 80px rgba(44,36,32,0.26)',
    '0 36px 80px rgba(44,36,32,0.28)',
    '0 40px 88px rgba(44,36,32,0.28)',
    '0 40px 88px rgba(44,36,32,0.30)',
    '0 44px 96px rgba(44,36,32,0.30)',
    '0 44px 96px rgba(44,36,32,0.32)',
  ],

  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
        disableRipple: false,
      },
      styleOverrides: {
        root: {
          borderRadius: 0,
          padding: '12px 32px',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          fontFamily: 'var(--font-inter), Inter, sans-serif',
          fontSize: '12px',
          fontWeight: 400,
          transition: 'background 0.3s, color 0.3s, border-color 0.3s',
          boxShadow: 'none',
          '&:hover': { boxShadow: 'none' },
        },
        contained: {
          background: '#2C2420',
          color: '#FDFAF5',
          border: '1px solid #2C2420',
          '&:hover': {
            background: '#3D2E28',
            borderColor: '#3D2E28',
          },
        },
        containedPrimary: {
          background: '#8B6F47',
          borderColor: '#8B6F47',
          '&:hover': {
            background: '#7a5f3a',
            borderColor: '#7a5f3a',
          },
        },
        outlined: {
          border: '1px solid #2C2420',
          color: '#2C2420',
          '&:hover': {
            background: '#2C2420',
            color: '#FDFAF5',
          },
        },
        outlinedPrimary: {
          border: '1px solid #8B6F47',
          color: '#8B6F47',
          '&:hover': {
            background: '#8B6F47',
            color: '#FDFAF5',
          },
        },
        text: {
          padding: '8px 16px',
          letterSpacing: '0.08em',
          color: '#5C4A42',
          '&:hover': {
            background: '#F0EBE1',
          },
        },
        sizeSmall: {
          padding: '8px 20px',
          fontSize: '11px',
        },
      },
    },

    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        size: 'small',
      },
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 0,
            fontSize: '14px',
            '& fieldset': {
              borderColor: '#EDE8E0',
              transition: 'border-color 0.2s',
            },
            '&:hover fieldset': {
              borderColor: '#D4C5A9',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#8B6F47',
              borderWidth: '1px',
            },
          },
          '& .MuiInputLabel-root': {
            fontSize: '13px',
            color: '#8B6F47',
            letterSpacing: '0.05em',
            '&.Mui-focused': {
              color: '#8B6F47',
            },
          },
          '& .MuiInputBase-input': {
            color: '#2C2420',
          },
        },
      },
    },

    MuiSelect: {
      styleOverrides: {
        outlined: {
          borderRadius: 0,
          fontSize: '14px',
        },
      },
    },

    MuiCard: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          borderRadius: 0,
          border: '1px solid #EDE8E0',
          background: '#FDFAF5',
          transition: 'border-color 0.2s, box-shadow 0.2s',
        },
      },
    },

    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: '24px',
          '&:last-child': { paddingBottom: '24px' },
        },
      },
    },

    MuiTableHead: {
      styleOverrides: {
        root: {
          '& .MuiTableCell-head': {
            background: '#F0EBE1',
            fontSize: '10px',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#8B6F47',
            fontWeight: 500,
            padding: '14px 16px',
            borderBottom: '1px solid #EDE8E0',
          },
        },
      },
    },

    MuiTableCell: {
      styleOverrides: {
        root: {
          borderColor: '#EDE8E0',
          fontSize: '14px',
          color: '#2C2420',
          padding: '16px',
        },
      },
    },

    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:hover': {
            background: '#F7F3ED',
          },
        },
      },
    },

    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          fontSize: '10px',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          height: '24px',
        },
        colorSuccess: {
          background: 'rgba(74,124,89,0.12)',
          color: '#4a7c59',
          border: '1px solid rgba(74,124,89,0.25)',
        },
        colorError: {
          background: 'rgba(181,69,27,0.1)',
          color: '#b5451b',
          border: '1px solid rgba(181,69,27,0.2)',
        },
        colorWarning: {
          background: 'rgba(176,141,46,0.12)',
          color: '#b08d2e',
          border: '1px solid rgba(176,141,46,0.2)',
        },
      },
    },

    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          fontSize: '13px',
        },
        standardError: {
          background: 'rgba(181,69,27,0.08)',
          color: '#b5451b',
          border: '1px solid rgba(181,69,27,0.2)',
        },
        standardSuccess: {
          background: 'rgba(74,124,89,0.08)',
          color: '#4a7c59',
          border: '1px solid rgba(74,124,89,0.2)',
        },
      },
    },

    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          borderRadius: 0,
          background: '#2C2420',
          fontSize: '11px',
          letterSpacing: '0.05em',
        },
        arrow: {
          color: '#2C2420',
        },
      },
    },

    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRadius: 0,
          background: '#FDFAF5',
        },
      },
    },

    MuiAppBar: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          borderRadius: 0,
          borderBottom: '1px solid #EDE8E0',
          background: '#FDFAF5',
          color: '#2C2420',
        },
      },
    },

    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          transition: 'background 0.2s',
          '&.Mui-selected': {
            background: '#F0EBE1',
            borderRight: '2px solid #8B6F47',
            '&:hover': { background: '#EDE8E0' },
          },
          '&:hover': {
            background: '#F7F3ED',
          },
        },
      },
    },

    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontSize: '14px',
          letterSpacing: '0.04em',
        },
      },
    },

    MuiBreadcrumbs: {
      styleOverrides: {
        root: {
          fontSize: '12px',
          letterSpacing: '0.06em',
          color: '#8B6F47',
        },
      },
    },

    MuiSwitch: {
      styleOverrides: {
        root: {
          '& .MuiSwitch-switchBase.Mui-checked': {
            color: '#8B6F47',
            '& + .MuiSwitch-track': {
              background: '#8B6F47',
            },
          },
        },
      },
    },

    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          transition: 'background 0.2s',
          '&:hover': {
            background: '#F0EBE1',
          },
        },
      },
    },

    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: '#EDE8E0',
        },
      },
    },

    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 0,
          border: '1px solid #EDE8E0',
        },
      },
    },

    MuiDialogTitle: {
      styleOverrides: {
        root: {
          fontFamily: 'var(--font-playfair), "Playfair Display", serif',
          fontWeight: 400,
          fontSize: '22px',
          padding: '24px 32px 16px',
          color: '#2C2420',
        },
      },
    },

    MuiDialogContent: {
      styleOverrides: {
        root: {
          padding: '16px 32px',
          fontSize: '14px',
          color: '#5C4A42',
        },
      },
    },

    MuiDialogActions: {
      styleOverrides: {
        root: {
          padding: '16px 32px 24px',
          gap: '12px',
        },
      },
    },

    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          background: '#EDE8E0',
          height: '2px',
        },
        bar: {
          background: '#8B6F47',
        },
      },
    },

    MuiSnackbar: {
      defaultProps: {
        anchorOrigin: { vertical: 'bottom', horizontal: 'right' },
      },
    },
  },
});

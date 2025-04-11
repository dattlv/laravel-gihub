import { createTheme } from '@mui/material';
import { deepmerge } from '@mui/utils';

// Notoria theme colors - Based on brand colors
export const notoriaPalette = {
  primary: {
    main: '#2563EB', // Xanh dương đậm
    light: '#60A5FA',
    dark: '#1E40AF',
    contrastText: '#FFFFFF',
  },
  secondary: {
    main: '#7C3AED', // Tím
    light: '#A78BFA',
    dark: '#5B21B6',
    contrastText: '#FFFFFF',
  },
  success: {
    main: '#22C55E',
    light: '#86EFAC',
    dark: '#16A34A',
    contrastText: '#FFFFFF',
  },
  warning: {
    main: '#F59E0B',
    light: '#FCD34D',
    dark: '#D97706',
    contrastText: '#FFFFFF',
  },
  error: {
    main: '#EF4444',
    light: '#FCA5A5',
    dark: '#DC2626',
    contrastText: '#FFFFFF',
  },
  info: {
    main: '#3B82F6',
    light: '#93C5FD',
    dark: '#2563EB',
    contrastText: '#FFFFFF',
  },
};

// Light theme configuration
export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    ...notoriaPalette,
    background: {
      default: '#F9FAFB',
      paper: '#FFFFFF',
      subtle: '#F3F4F6',
    },
    text: {
      primary: '#111827',
      secondary: '#6B7280',
      disabled: '#9CA3AF',
    },
    divider: 'rgba(0, 0, 0, 0.12)',
  },
  typography: {
    fontFamily: [
      '"Inter"',
      '-apple-system',
      'system-ui',
      '"Segoe UI"',
      'Roboto',
      'sans-serif',
    ].join(','),
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      lineHeight: 1.2,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.2,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.2,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
      lineHeight: 1.2,
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.5,
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 500,
      lineHeight: 1.5,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 8,
  },
  shadows: [
    'none',
    '0px 1px 2px rgba(0, 0, 0, 0.06), 0px 1px 3px rgba(0, 0, 0, 0.1)',
    '0px 1px 5px rgba(0, 0, 0, 0.05), 0px 1px 8px rgba(0, 0, 0, 0.1)',
    '0px 2px 4px rgba(0, 0, 0, 0.05), 0px 3px 6px rgba(0, 0, 0, 0.08)',
    '0px 3px 5px rgba(0, 0, 0, 0.05), 0px 5px 8px rgba(0, 0, 0, 0.06)',
    '0px 3px 5px rgba(0, 0, 0, 0.04), 0px 6px 10px rgba(0, 0, 0, 0.06)',
    '0px 4px 6px rgba(0, 0, 0, 0.04), 0px 8px 12px rgba(0, 0, 0, 0.06)',
    '0px 5px 8px rgba(0, 0, 0, 0.04), 0px 10px 15px rgba(0, 0, 0, 0.06)',
    '0px 6px 10px rgba(0, 0, 0, 0.04), 0px 12px 18px rgba(0, 0, 0, 0.06)',
    '0px 7px 12px rgba(0, 0, 0, 0.04), 0px 14px 21px rgba(0, 0, 0, 0.06)',
    '0px 8px 14px rgba(0, 0, 0, 0.04), 0px 16px 24px rgba(0, 0, 0, 0.06)',
    '0px 9px 16px rgba(0, 0, 0, 0.04), 0px 18px 27px rgba(0, 0, 0, 0.06)',
    '0px 10px 18px rgba(0, 0, 0, 0.04), 0px 20px 30px rgba(0, 0, 0, 0.06)',
    '0px 11px 20px rgba(0, 0, 0, 0.04), 0px 22px 33px rgba(0, 0, 0, 0.06)',
    '0px 12px 22px rgba(0, 0, 0, 0.04), 0px 24px 36px rgba(0, 0, 0, 0.06)',
    '0px 13px 24px rgba(0, 0, 0, 0.04), 0px 26px 39px rgba(0, 0, 0, 0.06)',
    '0px 14px 26px rgba(0, 0, 0, 0.04), 0px 28px 42px rgba(0, 0, 0, 0.06)',
    '0px 15px 28px rgba(0, 0, 0, 0.04), 0px 30px 45px rgba(0, 0, 0, 0.06)',
    '0px 16px 30px rgba(0, 0, 0, 0.04), 0px 32px 48px rgba(0, 0, 0, 0.06)',
    '0px 17px 32px rgba(0, 0, 0, 0.04), 0px 34px 51px rgba(0, 0, 0, 0.06)',
    '0px 18px 34px rgba(0, 0, 0, 0.04), 0px 36px 54px rgba(0, 0, 0, 0.06)',
    '0px 19px 36px rgba(0, 0, 0, 0.04), 0px 38px 57px rgba(0, 0, 0, 0.06)',
    '0px 20px 38px rgba(0, 0, 0, 0.04), 0px 40px 60px rgba(0, 0, 0, 0.06)',
    '0px 21px 40px rgba(0, 0, 0, 0.04), 0px 42px 63px rgba(0, 0, 0, 0.06)',
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: 'none',
          textTransform: 'none',
          fontWeight: 600,
          padding: '8px 16px',
          '&:hover': {
            boxShadow:
              '0px 2px 4px rgba(0, 0, 0, 0.05), 0px 3px 6px rgba(0, 0, 0, 0.08)',
          },
        },
        contained: {
          '&:hover': {
            boxShadow:
              '0px 2px 4px rgba(0, 0, 0, 0.05), 0px 3px 6px rgba(0, 0, 0, 0.08)',
          },
        },
        containedPrimary: {
          '&:hover': {
            backgroundColor: notoriaPalette.primary.dark,
          },
        },
        containedSecondary: {
          '&:hover': {
            backgroundColor: notoriaPalette.secondary.dark,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
        elevation1: {
          boxShadow:
            '0px 1px 2px rgba(0, 0, 0, 0.06), 0px 1px 3px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          padding: '16px 24px',
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: '24px',
          '&:last-child': {
            paddingBottom: '24px',
          },
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarWidth: 'thin',
          scrollbarColor: '#E5E7EB transparent',
          '&::-webkit-scrollbar': {
            width: '8px',
            height: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#E5E7EB',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: '#D1D5DB',
          },
        },
      },
    },
  },
});

// Dark theme configuration
export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    ...notoriaPalette,
    background: {
      default: '#111827',
      paper: '#1F2937',
      subtle: '#374151',
      primary: '#1565C0',
      success: '#2E7D32',
    },
    text: {
      white: '#FFFFFF',
      primary: '#F9FAFB',
      secondary: '#D1D5DB',
      disabled: '#6B7280',
    },
    divider: 'rgba(255, 255, 255, 0.12)',
  },
  typography: lightTheme.typography,
  shape: lightTheme.shape,
  shadows: [
    'none',
    '0px 1px 2px rgba(0, 0, 0, 0.25), 0px 1px 3px rgba(0, 0, 0, 0.3)',
    '0px 1px 5px rgba(0, 0, 0, 0.25), 0px 1px 8px rgba(0, 0, 0, 0.3)',
    '0px 2px 4px rgba(0, 0, 0, 0.25), 0px 3px 6px rgba(0, 0, 0, 0.3)',
    '0px 3px 5px rgba(0, 0, 0, 0.25), 0px 5px 8px rgba(0, 0, 0, 0.3)',
    '0px 3px 5px rgba(0, 0, 0, 0.25), 0px 6px 10px rgba(0, 0, 0, 0.3)',
    '0px 4px 6px rgba(0, 0, 0, 0.25), 0px 8px 12px rgba(0, 0, 0, 0.3)',
    '0px 5px 8px rgba(0, 0, 0, 0.25), 0px 10px 15px rgba(0, 0, 0, 0.3)',
    '0px 6px 10px rgba(0, 0, 0, 0.25), 0px 12px 18px rgba(0, 0, 0, 0.3)',
    '0px 7px 12px rgba(0, 0, 0, 0.25), 0px 14px 21px rgba(0, 0, 0, 0.3)',
    '0px 8px 14px rgba(0, 0, 0, 0.25), 0px 16px 24px rgba(0, 0, 0, 0.3)',
    '0px 9px 16px rgba(0, 0, 0, 0.25), 0px 18px 27px rgba(0, 0, 0, 0.3)',
    '0px 10px 18px rgba(0, 0, 0, 0.25), 0px 20px 30px rgba(0, 0, 0, 0.3)',
    '0px 11px 20px rgba(0, 0, 0, 0.25), 0px 22px 33px rgba(0, 0, 0, 0.3)',
    '0px 12px 22px rgba(0, 0, 0, 0.25), 0px 24px 36px rgba(0, 0, 0, 0.3)',
    '0px 13px 24px rgba(0, 0, 0, 0.25), 0px 26px 39px rgba(0, 0, 0, 0.3)',
    '0px 14px 26px rgba(0, 0, 0, 0.25), 0px 28px 42px rgba(0, 0, 0, 0.3)',
    '0px 15px 28px rgba(0, 0, 0, 0.25), 0px 30px 45px rgba(0, 0, 0, 0.3)',
    '0px 16px 30px rgba(0, 0, 0, 0.25), 0px 32px 48px rgba(0, 0, 0, 0.3)',
    '0px 17px 32px rgba(0, 0, 0, 0.25), 0px 34px 51px rgba(0, 0, 0, 0.3)',
    '0px 18px 34px rgba(0, 0, 0, 0.25), 0px 36px 54px rgba(0, 0, 0, 0.3)',
    '0px 19px 36px rgba(0, 0, 0, 0.25), 0px 38px 57px rgba(0, 0, 0, 0.3)',
    '0px 20px 38px rgba(0, 0, 0, 0.25), 0px 40px 60px rgba(0, 0, 0, 0.3)',
    '0px 21px 40px rgba(0, 0, 0, 0.25), 0px 42px 63px rgba(0, 0, 0, 0.3)',
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: 'none',
          textTransform: 'none',
          fontWeight: 600,
          padding: '8px 16px',
          '&:hover': {
            boxShadow:
              '0px 2px 4px rgba(0, 0, 0, 0.25), 0px 3px 6px rgba(0, 0, 0, 0.3)',
          },
        },
        contained: {
          '&:hover': {
            boxShadow:
              '0px 2px 4px rgba(0, 0, 0, 0.25), 0px 3px 6px rgba(0, 0, 0, 0.3)',
          },
        },
        containedPrimary: {
          '&:hover': {
            backgroundColor: notoriaPalette.primary.dark,
          },
        },
        containedSecondary: {
          '&:hover': {
            backgroundColor: notoriaPalette.secondary.dark,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
        elevation1: {
          boxShadow:
            '0px 1px 2px rgba(0, 0, 0, 0.25), 0px 1px 3px rgba(0, 0, 0, 0.3)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarWidth: 'thin',
          scrollbarColor: '#4B5563 transparent',
          '&::-webkit-scrollbar': {
            width: '8px',
            height: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#4B5563',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: '#6B7280',
          },
        },
      },
    },
  },
});

// Function to merge theme with custom options
export const createCustomTheme = (options = {}) => {
  const { mode = 'light', ...rest } = options;

  return createTheme(
    deepmerge(mode === 'dark' ? darkTheme : lightTheme, {
      ...rest,
    }),
  );
};

export default createCustomTheme;

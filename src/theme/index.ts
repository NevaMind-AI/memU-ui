import { createTheme } from '@mui/material/styles'
import type { ThemeOptions, PaletteMode } from '@mui/material/styles'
import { blue, purple, red, orange, green, grey } from '@mui/material/colors'

// Using Material-UI built-in color palette
const lightPalette = {
  primary: {
    main: '#2596D1', 
    light: '#4DAEE6',
    dark: '#1E7BB8',
    contrastText: '#FFFFFF',
  },
  secondary: purple,
  error: red,
  warning: orange,
  info: blue,
  success: green,
  background: {
    default: grey[100],
    paper: '#FFFFFF',
  },
}

const darkPalette = {
  primary: {
    main: '#2596D1', 
    light: '#4DAEE6',
    dark: '#1E7BB8',
    contrastText: '#FFFFFF',
  },
  secondary: purple,
  error: red,
  warning: orange,
  info: blue,
  success: green,
  background: {
    default: grey[900],
    paper: "#121415",
  },
}

// Typography Scale (Material Design 3)
const typography = {
  fontFamily: [
    'Raleway',
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
  ].join(','),
  h1: {
    fontSize: '3.5rem',
    fontWeight: 400,
    lineHeight: 1.167,
    letterSpacing: '-0.01562em',
  },
  h2: {
    fontSize: '2.75rem',
    fontWeight: 400,
    lineHeight: 1.2,
    letterSpacing: '-0.00833em',
  },
  h3: {
    fontSize: '2.25rem',
    fontWeight: 400,
    lineHeight: 1.167,
    letterSpacing: '0em',
  },
  h4: {
    fontSize: '1.75rem',
    fontWeight: 400,
    lineHeight: 1.235,
    letterSpacing: '0.00735em',
  },
  h5: {
    fontSize: '1.5rem',
    fontWeight: 400,
    lineHeight: 1.334,
    letterSpacing: '0em',
  },
  h6: {
    fontSize: '1.25rem',
    fontWeight: 500,
    lineHeight: 1.6,
    letterSpacing: '0.0075em',
  },
}

// Component Overrides (Material Design 3)
const components = {
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: 20,
        textTransform: 'none' as const,
        fontWeight: 500,
        padding: '10px 24px',
        boxShadow: 'none',
        '&:focus': {
          outline: 'none',
          boxShadow: 'none',
        },
        '&:focus-visible': {
          outline: '2px solid currentColor',
          outlineOffset: 2,
        },
      },
      contained: {
        '&:hover': {
          boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.3), 0px 1px 3px rgba(0, 0, 0, 0.15)',
        },
      },
    },
  },
  MuiIconButton: {
    styleOverrides: {
      root: {
        '&:focus': {
          outline: 'none',
          boxShadow: 'none',
        },
        '&:focus-visible': {
          outline: '2px solid currentColor',
          outlineOffset: 2,
        },
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      root: ({ theme }: { theme: any }) => ({
        borderRadius: 12,
        border: 'none',
        boxShadow: theme.palette.mode === 'light' 
          ? '0px 1px 3px rgba(0, 0, 0, 0.12), 0px 1px 2px rgba(0, 0, 0, 0.24)'
          : '0px 2px 4px rgba(0, 0, 0, 0.3), 0px 1px 2px rgba(0, 0, 0, 0.4)',
        backgroundColor: theme.palette.mode === 'light' 
          ? '#FFFFFF'
          : theme.palette.background.paper,
        transition: 'box-shadow 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          boxShadow: theme.palette.mode === 'light'
            ? '0px 2px 6px rgba(0, 0, 0, 0.15), 0px 1px 4px rgba(0, 0, 0, 0.3)'
            : '0px 4px 8px rgba(0, 0, 0, 0.4), 0px 2px 4px rgba(0, 0, 0, 0.5)',
        },
      }),
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        borderRadius: 12,
        border: 'none',
      },
    },
  },
  MuiAppBar: {
    styleOverrides: {
      root: {
        boxShadow: 'none',
        border: 'none',
      },
    },
  },
  MuiFab: {
    styleOverrides: {
      root: {
        borderRadius: 16,
        boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)',
        '&:hover': {
          boxShadow: '0px 5px 8px rgba(0, 0, 0, 0.3)',
        },
      },
    },
  },
}

// Create theme function
export const createAppTheme = (mode: PaletteMode = 'light') => {
  const themeOptions: ThemeOptions = {
    palette: {
      mode,
      ...(mode === 'light' ? lightPalette : darkPalette),
    },
    typography,
    components,
    shape: {
      borderRadius: 12,
    },
    spacing: 8,
  }

  return createTheme(themeOptions)
}

// Default themes
export const lightTheme = createAppTheme('light')
export const darkTheme = createAppTheme('dark')

// Theme context types
export interface ThemeContextType {
  mode: PaletteMode
  toggleMode: () => void
}

// No custom color extensions needed - using Material-UI built-in colors 
import React, { createContext, useContext, useState, useEffect } from 'react'
import { ThemeProvider } from '@mui/material/styles'
import { lightTheme, darkTheme } from '../theme'
import type { PaletteMode } from '@mui/material/styles'

interface ThemeContextType {
  mode: PaletteMode
  toggleMode: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

interface ThemeProviderWrapperProps {
  children: React.ReactNode
}

export const ThemeProviderWrapper: React.FC<ThemeProviderWrapperProps> = ({ children }) => {
  const [mode, setMode] = useState<PaletteMode>('light')

  // Load theme preference from localStorage
  useEffect(() => {
    const savedMode = localStorage.getItem('themeMode') as PaletteMode
    if (savedMode && (savedMode === 'light' || savedMode === 'dark')) {
      setMode(savedMode)
    }
  }, [])

  const toggleMode = () => {
    const newMode = mode === 'light' ? 'dark' : 'light'
    setMode(newMode)
    localStorage.setItem('themeMode', newMode)
  }

  const theme = mode === 'light' ? lightTheme : darkTheme

  const contextValue: ThemeContextType = {
    mode,
    toggleMode,
  }

  return (
    <ThemeContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}

export const useThemeContext = (): ThemeContextType => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useThemeContext must be used within a ThemeProviderWrapper')
  }
  return context
} 
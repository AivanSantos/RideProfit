import { createContext, useContext, useEffect, ReactNode } from 'react';
import { useSettings } from './SettingsContext';

interface ThemeContextType {
  isDarkMode: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const { settings } = useSettings();

  useEffect(() => {
    const root = window.document.documentElement;
    if (settings.dark_mode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [settings.dark_mode]);

  return (
    <ThemeContext.Provider value={{ isDarkMode: settings.dark_mode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme deve ser usado dentro de um ThemeProvider');
  }
  return context;
} 
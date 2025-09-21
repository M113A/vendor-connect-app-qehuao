
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { storage, STORAGE_KEYS } from '../utils/storage';
import { colors } from '../styles/commonStyles';

interface ThemeContextType {
  theme: 'light' | 'dark';
  colors: typeof colors;
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const savedSettings = await storage.getItem(STORAGE_KEYS.USER_PREFERENCES);
      if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        if (settings.theme) {
          setThemeState(settings.theme);
        }
      }
    } catch (error) {
      console.log('Error loading theme:', error);
    }
  };

  const setTheme = async (newTheme: 'light' | 'dark') => {
    try {
      setThemeState(newTheme);
      
      // Save to storage
      const savedSettings = await storage.getItem(STORAGE_KEYS.USER_PREFERENCES);
      const settings = savedSettings ? JSON.parse(savedSettings) : {};
      settings.theme = newTheme;
      await storage.setItem(STORAGE_KEYS.USER_PREFERENCES, JSON.stringify(settings));
      
      console.log('Theme updated:', newTheme);
    } catch (error) {
      console.log('Error saving theme:', error);
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  // For now, always return light theme colors
  // In the future, this would switch between light and dark colors
  const currentColors = colors;

  const value: ThemeContextType = {
    theme,
    colors: currentColors,
    toggleTheme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

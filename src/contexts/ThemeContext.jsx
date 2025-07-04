import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for saved theme preference or default to system preference
    const savedTheme = localStorage.getItem('alibix_theme');
    const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    
    const initialTheme = savedTheme || systemPreference;
    setTheme(initialTheme);
    applyTheme(initialTheme);
    setIsLoading(false);

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = (e) => {
      if (!localStorage.getItem('alibix_theme')) {
        const newTheme = e.matches ? 'dark' : 'light';
        setTheme(newTheme);
        applyTheme(newTheme);
      }
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);
    return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
  }, []);

  const applyTheme = (newTheme) => {
    const root = document.documentElement;
    if (newTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    applyTheme(newTheme);
    localStorage.setItem('alibix_theme', newTheme);
  };

  const setLightTheme = () => {
    setTheme('light');
    applyTheme('light');
    localStorage.setItem('alibix_theme', 'light');
  };

  const setDarkTheme = () => {
    setTheme('dark');
    applyTheme('dark');
    localStorage.setItem('alibix_theme', 'dark');
  };

  const setSystemTheme = () => {
    localStorage.removeItem('alibix_theme');
    const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    setTheme(systemPreference);
    applyTheme(systemPreference);
  };

  const value = {
    theme,
    isLoading,
    isDark: theme === 'dark',
    isLight: theme === 'light',
    toggleTheme,
    setLightTheme,
    setDarkTheme,
    setSystemTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
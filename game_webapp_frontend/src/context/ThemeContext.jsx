import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const ThemeContext = createContext({ theme: 'light', setTheme: () => {} });

/**
 * PUBLIC_INTERFACE
 * ThemeProvider
 * Provides theme state and document attribute for theming.
 */
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const value = useMemo(() => ({ theme, setTheme }), [theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

/**
 * PUBLIC_INTERFACE
 * useTheme
 * Hook to access theme context.
 */
export function useTheme() {
  return useContext(ThemeContext);
}

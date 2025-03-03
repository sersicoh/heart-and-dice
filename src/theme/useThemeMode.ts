import { useCallback, useEffect, useState } from 'react';

import { darkTheme, lightTheme } from '@theme/index';

export function useThemeMode() {
  const [mode, setMode] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    const prefersDark =
      window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    setMode(prefersDark ? 'dark' : 'light');
  }, []);

  const toggleMode = useCallback(() => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  const theme = mode === 'light' ? lightTheme : darkTheme;

  return { theme, mode, toggleMode };
}

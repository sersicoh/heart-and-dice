import { StrictMode } from 'react';

import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';

import { GlobalStyles } from '@theme/GlobalStyles.ts';
import { useThemeMode } from '@theme/useThemeMode.ts';

import App from './App.tsx';

function Root() {
  const { theme } = useThemeMode();
  return (
    <StrictMode>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <App />
      </ThemeProvider>
    </StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(<Root />);

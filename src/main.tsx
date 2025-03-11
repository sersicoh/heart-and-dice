import { StrictMode } from 'react';

import { SnackbarProvider } from 'notistack';
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
        <SnackbarProvider>
          <GlobalStyles />
          <App />
        </SnackbarProvider>
      </ThemeProvider>
    </StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(<Root />);

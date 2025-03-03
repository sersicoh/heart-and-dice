import { StrictMode } from 'react';

import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';

import { useThemeMode } from '@theme/useThemeMode.ts';

import App from './App.tsx';

import './index.css';

function Root() {
  const { theme } = useThemeMode();
  return (
    <StrictMode>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(<Root />);

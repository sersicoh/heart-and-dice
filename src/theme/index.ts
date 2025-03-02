// src/theme/index.ts

import { DefaultTheme } from 'styled-components';

import { devices } from './devices';

// Typy – żeby mieć autouzupełnianie w styled-components
export interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  text: string;
}

interface MyTheme extends DefaultTheme {
  mode: 'light' | 'dark';
  colors: ThemeColors;
  devices: typeof devices;
}

export const lightTheme: MyTheme = {
  mode: 'light',
  colors: {
    primary: '#3498db',
    secondary: '#1abc9c',
    background: '#ffffff',
    text: '#333333',
  },
  devices,
};

export const darkTheme: MyTheme = {
  mode: 'dark',
  colors: {
    primary: '#2980b9',
    secondary: '#16a085',
    background: '#333333',
    text: '#ffffff',
  },
  devices,
};

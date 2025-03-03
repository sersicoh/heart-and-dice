import type { DefaultTheme } from 'styled-components';

import { DarkColorsColections, LightColorsColections } from '@theme/colors';

import { devices } from './devices';

export const lightTheme: DefaultTheme = {
  mode: 'light',
  colors: LightColorsColections,
  devices,
};

export const darkTheme: DefaultTheme = {
  mode: 'dark',
  colors: DarkColorsColections,
  devices,
};

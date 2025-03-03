import 'styled-components';

import type { devices } from '@theme/devices';
import type { IColorsCollection } from '@theme/types';

declare module 'styled-components' {
  export interface DefaultTheme {
    mode: 'light' | 'dark';
    colors: IColorsCollection;
    devices: typeof devices;
  }
}

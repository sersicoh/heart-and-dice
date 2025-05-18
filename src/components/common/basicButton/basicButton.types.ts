import type { ReactNode } from 'react';

export type TButtonVariant = 'default' | 'dark' | 'light';
export interface IBasicButton {
  onClick: () => void;
  content: ReactNode | string;
  disabled?: boolean;
  borderRadius?: string;
  padding?: string;
  fontSize?: {
    tablet: string;
    mobile?: string;
  };
  variant?: TButtonVariant;
}

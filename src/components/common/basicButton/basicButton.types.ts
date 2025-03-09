import type { ReactNode } from 'react';

export interface IBasicButton {
  onClick: () => void;
  label: ReactNode | string;
  disabled?: boolean;
  fontSize?: {
    tablet: string;
    mobile?: string;
  };
}

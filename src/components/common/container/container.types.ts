import type { ReactNode } from 'react';

type ContainerVariant = 'base' | 'flex' | 'grid';
interface ResponsiveProps {
  mobile?: Partial<ContainerProps>;
  tablet?: Partial<ContainerProps>;
}

export interface ContainerProps {
  variant?: ContainerVariant;
  backgroundColor?: string;
  padding?: string;
  margin?: string;

  justifyContent?: string;
  alignItems?: string;
  flexDirection?: string;

  gridTemplateColumns?: string;
  gridTemplateRows?: string;
  gap?: string;

  width?: string;
  height?: string;
  maxWidth?: string;
  borderRadius?: string;

  responsive?: ResponsiveProps;

  children?: ReactNode;
}

import type { ReactNode } from 'react';

type ContainerVariant = 'base' | 'flex' | 'grid';
interface ResponsiveProps {
  mobile?: Partial<ContainerProps>;
  tablet?: Partial<ContainerProps>;
}

export interface ContainerProps {
  id?: string;
  variant?: ContainerVariant;
  backgroundColor?: string;
  padding?: string;
  margin?: string;

  justifyContent?: string;
  alignItems?: string;
  flexDirection?: string;

  gridTemplateColumns?: string;
  gridAutoFlow?: string;
  gridTemplateRows?: string;
  gap?: string;

  width?: string;
  height?: string;
  minWidth?: string;
  maxWidth?: string;
  minHeight?: string;
  borderRadius?: string;

  responsive?: ResponsiveProps;

  children?: ReactNode;
}

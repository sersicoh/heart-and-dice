import { useEffect, useState } from 'react';

import { useTheme } from 'styled-components';

import BREAKPOINTS from '@theme/devices';

export function useMyTheme() {
  const theme = useTheme();

  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const isMobile = width <= BREAKPOINTS.mobile;
  const isTablet = width > BREAKPOINTS.mobile && width <= BREAKPOINTS.tablet;
  const isDesktop = width > BREAKPOINTS.tablet;

  return {
    theme,
    isMobile,
    isTablet,
    isDesktop,
  };
}

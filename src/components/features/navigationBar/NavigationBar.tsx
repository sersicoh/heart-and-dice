import React from 'react';

import { useLocation } from 'react-router-dom';

import Container from '@components/common/container/Container';
import { Drawer } from '@components/common/drawer/Drawer';
import { NavButton } from '@components/features/navigationBar/navButton/NavButton';
import type { NavigationBarProps } from '@components/features/navigationBar/navigationBar.types';
import { NavTitle } from '@components/features/navigationBar/navTitle/NavTitle';

import { useMyTheme } from '@hooks/useMyTheme';
import GearIcon from '@assets/svg/gear.svg?react';
import HnDIcon from '@assets/svg/hnd-logo.svg?react';

export const NavigationBar = ({ routes, drawerItems }: NavigationBarProps) => {
  const location = useLocation();
  const { theme, isMobile } = useMyTheme();

  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const isHome = location.pathname === '/';

  return (
    <Container variant='flex' flexDirection='column' margin={isMobile ? '0 0 8px 0' : '0 0 12px 0'}>
      <Container
        variant='flex'
        alignItems='center'
        width='100%'
        justifyContent='space-between'
        padding={isMobile ? '12px 24px 0' : '16px 48px 0'}
      >
        <Container>
          <HnDIcon width={isMobile ? '48px' : '70px'} height={'100%'} color={theme.colors.logo} />
        </Container>
        <NavTitle label='Heart' />
        <GearIcon
          width={isMobile ? '32px' : '48px'}
          height={'100%'}
          color={theme.colors.logo}
          onClick={() => setIsDrawerOpen(true)}
          style={{ cursor: 'pointer' }}
        />
      </Container>
      {!isHome && (
        <Container variant='flex' justifyContent='space-between' alignItems='flex-end'>
          {routes.map((route) => (
            <NavButton key={route.path} title={route.title} to={route.path} />
          ))}
        </Container>
      )}
      {drawerItems && (
        <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} items={drawerItems} />
      )}
    </Container>
  );
};

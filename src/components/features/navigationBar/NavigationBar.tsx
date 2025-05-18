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

  const isHeart = location.pathname.includes('/heart');

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
      }}
    >
      <Container
        variant='flex'
        flexDirection='column'
        margin={isMobile ? '0 0 8px 0' : '0 0 12px 0'}
        backgroundColor={theme.colors.backgroundBase}
      >
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
          <NavTitle label={isHeart ? 'Heart' : 'Dice'} />
          <GearIcon
            width={isMobile ? '48px' : '70px'}
            height={isMobile ? '32px' : '48px'}
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
          <Drawer
            isOpen={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
            items={drawerItems}
          />
        )}
      </Container>
    </div>
  );
};

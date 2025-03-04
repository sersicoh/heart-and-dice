import { useMyTheme } from '@hooks/useMyTheme';

import Container from '@components/common/container/Container';
import { NavButton } from '@components/features/navigationBar/navButton/NavButton';
import { NavTitle } from '@components/features/navigationBar/navTitle/NavTitle';

import GearIcon from '@assets/svg/gear.svg?react';
import HnDIcon from '@assets/svg/hnd-logo.svg?react';

export const NavigationBar = () => {
  const { theme, isMobile } = useMyTheme();

  return (
    <Container variant='flex' flexDirection='column' gap={isMobile ? '12px' : '24px'}>
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
        <NavTitle />
        <GearIcon width={isMobile ? '32px' : '48px'} height={'100%'} color={theme.colors.logo} />
      </Container>
      <Container variant='flex' justifyContent='space-between'>
        <NavButton title='formularz' />
        <NavButton title='wyniki' />
        <NavButton title='zasady' />
      </Container>
    </Container>
  );
};

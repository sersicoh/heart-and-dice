import { NavLink } from 'react-router-dom';

import Container from '@components/common/container/Container';
import { StyledNavButton } from '@components/features/navigationBar/navButton/navButton.styles';
import type { NavButtonProps } from '@components/features/navigationBar/navButton/navButton.types';

export const NavButton = ({ title, to }: NavButtonProps) => {
  return (
    <Container variant='flex' justifyContent='center' width='100%'>
      <NavLink to={to} style={{ width: '100%' }}>
        {({ isActive }) => <StyledNavButton isActive={isActive}>{title}</StyledNavButton>}
      </NavLink>
    </Container>
  );
};

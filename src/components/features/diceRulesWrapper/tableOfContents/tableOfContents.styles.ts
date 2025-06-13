import styled from 'styled-components';

export const ListWrapper = styled.ul`
  list-style: none;
  padding: 20px;

  @media ${({ theme }) => theme.devices.mobile} {
    padding: 8px;
  }
`;

export const NavWrapper = styled.nav`
  list-style: none;
  position: sticky;
  top: 140px;
  align-self: start;
  height: fit-content;
  z-index: 2;

  @media ${({ theme }) => theme.devices.mobile} {
    top: 110px;
  }
`;

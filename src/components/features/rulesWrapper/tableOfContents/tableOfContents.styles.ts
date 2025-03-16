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
  top: 48px;
  align-self: start;
  height: fit-content;

  @media ${({ theme }) => theme.devices.mobile} {
    top: 16px;
  }
`;

import styled from 'styled-components';

export const StyledNavButton = styled.div<{ isActive: boolean }>`
  text-transform: uppercase;
  text-align: center;
  width: 100%;
  font-size: ${({ isActive }) => (isActive ? '2rem' : '1.5rem')};
  font-weight: 600;
  color: ${({ theme, isActive }) => (isActive ? theme.colors.textWhite : theme.colors.textLight)};
  width: 100%;
  line-height: 2.25rem;
  text-shadow: ${({ theme, isActive }) =>
    isActive ? `0px 0px 8px ${theme.colors.textLight}` : 'none'};
  border-bottom: 4px solid
    ${({ theme, isActive }) => (isActive ? theme.colors.textWhite : theme.colors.textLight)};

  @media ${({ theme }) => theme.devices.mobile} {
    font-size: ${({ isActive }) => (isActive ? '1.25rem' : '1rem')};
    line-height: 1.75rem;
  }
`;

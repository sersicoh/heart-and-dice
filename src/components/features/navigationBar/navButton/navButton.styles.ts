import styled from 'styled-components';

export const StyledNavButton = styled.div`
  text-transform: uppercase;
  text-align: center;
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textLight};
  width: 100%;
  border-bottom: 4px solid ${({ theme }) => theme.colors.textLight};

  @media ${({ theme }) => theme.devices.mobile} {
    font-size: 1rem;
  }
`;

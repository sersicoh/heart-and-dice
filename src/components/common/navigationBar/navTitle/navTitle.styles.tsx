import styled from 'styled-components';

export const StyledNavTitle = styled.h1`
  font-size: 3rem;
  text-align: center;

  @media ${({ theme }) => theme.devices.mobile} {
    font-size: 2.5rem;
  }
`;

import styled from 'styled-components';

export const StyledTitle = styled.div`
  font-size: 3rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.mainFormText};

  @media ${({ theme }) => theme.devices.mobile} {
    font-size: 1.5rem;
  }
`;

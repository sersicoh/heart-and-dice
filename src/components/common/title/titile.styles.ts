import styled from 'styled-components';

export const StyledTitle = styled.div<{ lineHeight?: number }>`
  font-size: 3rem;
  font-weight: 600;
  line-height: ${({ lineHeight }) => (lineHeight ? `${lineHeight}rem` : '4.5rem')};
  color: ${({ theme }) => theme.colors.mainFormText};

  @media ${({ theme }) => theme.devices.mobile} {
    font-size: 1.5rem;
  }
`;

import styled from 'styled-components';

import type { INavigationTitle } from '@components/features/navigationBar/navTitle/NavTitle';

export const StyledNavTitle = styled.h1<Pick<INavigationTitle, 'fontSize'>>`
  color: ${({ theme }) => theme.colors.textLight};
  font-size: ${({ fontSize }) => fontSize?.tablet ?? '3rem'};
  text-align: center;

  @media ${({ theme }) => theme.devices.mobile} {
    font-size: ${({ fontSize }) => fontSize?.mobile ?? '2.5rem'};
  }
`;

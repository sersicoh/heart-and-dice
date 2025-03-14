import styled from 'styled-components';

import type { IBasicButton } from '@components/common/basicButton/basicButton.types';

export const StyledBasicButton = styled.button<
  Pick<IBasicButton, 'fontSize' | 'padding' | 'variant'>
>`
  padding: ${({ padding }) => padding ?? '12px'};
  width: 100%;
  color: ${({ theme }) => theme.colors.textLight};
  font-size: ${({ fontSize }) => fontSize?.tablet ?? '2rem'};
  font-weight: 600;
  border: none;
  border-radius: 8px;
  background: ${({ theme, variant }) => {
    switch (variant) {
      case 'dark':
        return theme.colors.backgroundBase;
      case 'light':
        return theme.colors.frameBackground;
      default:
        return theme.colors.buttonBackground;
    }
  }};
  cursor: pointer;
  &:hover {
    background: ${({ theme }) => theme.colors.mainFormField};
    color: ${({ theme }) => theme.colors.textWhite};
  }

  @media ${({ theme }) => theme.devices.mobile} {
    font-size: ${({ fontSize }) => fontSize?.mobile ?? '1rem'};
  }

  &:disabled {
    /* opacity: 0.6; */
    cursor: not-allowed;
    background-color: ${({ theme }) => theme.colors.buttonDisabled};
    color: ${({ theme }) => theme.colors.buttonDisabledText};
  }
`;

import styled, { css } from 'styled-components';

import type { IFieldsType } from '@views/heart/form.types';

const variantStyles = (variant: IFieldsType['variant']) => {
  switch (variant) {
    case 'title':
    case 'resultTitle':
      return css`
        background-color: ${({ theme }) => theme.colors.mainFormField};
        color: ${({ theme }) => theme.colors.secondFormText};
        font-weight: 700;
      `;
    case 'roundType':
      return css`
        background-color: ${({ theme }) => theme.colors.mainFormField};
        color: ${({ theme }) => theme.colors.mainFormText};
        font-weight: 600;
      `;
    case 'activeRoundType':
      return css`
        background-color: ${({ theme }) => theme.colors.secondaryFormField};
        text-shadow: 0px 0px 8px ${({ theme }) => theme.colors.textLight};
        color: ${({ theme }) => theme.colors.thirdFormText};
        font-weight: 700;
      `;
    case 'activeInput':
      return css`
        background-color: ${({ theme }) => theme.colors.lightFormField};
        color: ${({ theme }) => theme.colors.textDark};
        font-weight: 700;
      `;
    case 'name':
      return css`
        background-color: ${({ theme }) => theme.colors.secondaryFormField};
        color: ${({ theme }) => theme.colors.mainFormText};
        font-weight: 600;
        font-size: 2rem;
        line-height: 1.5rem;

        @media ${({ theme }) => theme.devices.mobile} {
          font-size: 1rem;
        }
      `;
    case 'winner':
      return css`
        background-color: ${({ theme }) => theme.colors.winFormField};
        color: ${({ theme }) => theme.colors.textLight};
        font-weight: 600;
      `;
    case 'looser':
      return css`
        background-color: ${({ theme }) => theme.colors.looseFormField};
        color: ${({ theme }) => theme.colors.textLight};
        font-weight: 600;
      `;
    case 'input':
    default:
      return css`
        background-color: ${({ theme }) => theme.colors.secondaryFormField};
        color: ${({ theme }) => theme.colors.textLight};
        font-size: 2rem;
        line-height: 1.2rem;

        @media ${({ theme }) => theme.devices.mobile} {
          font-size: 1rem;
        }
      `;
  }
};

export const StyledFormField = styled.div<{ $variant: IFieldsType['variant'] }>`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  padding: 8px 0;
  @media ${({ theme }) => theme.devices.mobile} {
    font-size: 0.875rem;
    padding: 4px 0;
  }
  ${({ $variant }) => variantStyles($variant)}
`;

export const StyledLabel = styled.div`
  width: 100%;
  text-align: center;
`;

export const StyledInput = styled.input`
  width: 100%;
  text-align: center;
  font-size: 2rem;
  background: transparent;
  border: none;
  outline: none;
  color: ${({ theme }) => theme.colors.secondaryFormField};
  font-weight: 500;
  font-family: 'Gemunu Libre', sans-serif;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  @media ${({ theme }) => theme.devices.mobile} {
    font-size: 1rem;
  }
`;

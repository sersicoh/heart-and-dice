import styled, { css } from 'styled-components';

import type { DiceFieldVariant } from '@views/dice/diceForm.types';

const variantStyles = (variant: DiceFieldVariant) => {
  switch (variant) {
    case 'title':
    case 'resultTitle':
      return css`
        background-color: ${({ theme }) => theme.colors.mainFormField};
        color: ${({ theme }) => theme.colors.secondFormText};
        font-weight: 700;
      `;
    case 'fieldType':
      return css`
        background-color: ${({ theme }) => theme.colors.mainFormField};
        color: ${({ theme }) => theme.colors.mainFormText};
        font-weight: 600;
      `;
    case 'activeFieldsType':
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
    case 'lastInput':
      return css`
        background-color: ${({ theme }) => theme.colors.mainFormText};
        color: ${({ theme }) => theme.colors.textDark};
        font-weight: 700;
      `;
    case 'name':
      return css`
        background-color: ${({ theme }) => theme.colors.secondaryFormField};
        color: ${({ theme }) => theme.colors.mainFormText};
        font-weight: 600;

        @media ${({ theme }) => theme.devices.mobile} {
          font-size: 1rem;
        }
      `;
    case 'activePlayer':
      return css`
        background-color: ${({ theme }) => theme.colors.textLight};
        color: ${({ theme }) => theme.colors.thirdFormText};
        text-shadow: 0px 0px 8px ${({ theme }) => theme.colors.textDark};
        font-weight: 500;
        font-size: 1.8rem;
        line-height: 1.5rem;

        @media ${({ theme }) => theme.devices.mobile} {
          font-size: 1rem;
        }
      `;
    case 'winner':
      return css`
        background-color: ${({ theme }) => theme.colors.winFormField};
        color: ${({ theme }) => theme.colors.secondFormText};
        font-weight: 600;
      `;
    case 'inputPremium':
      return css`
        background-color: ${({ theme }) => theme.colors.inputPremium};
        color: ${({ theme }) => theme.colors.secondFormText};
        font-weight: 600;
      `;
    case 'inputNotPremium':
      return css`
        background-color: ${({ theme }) => theme.colors.inputNotPremium};
        color: ${({ theme }) => theme.colors.secondFormText};
        font-weight: 600;
      `;
    case 'manyWinner':
      return css`
        background-color: ${({ theme }) => theme.colors.manyWinFormField};
        color: ${({ theme }) => theme.colors.secondFormText};
        font-weight: 600;
      `;
    case 'looser':
      return css`
        background-color: ${({ theme }) => theme.colors.looseFormField};
        color: ${({ theme }) => theme.colors.secondFormText};
        font-weight: 600;
      `;
    case 'manyLooser':
      return css`
        background-color: ${({ theme }) => theme.colors.manyLooseFormField};
        color: ${({ theme }) => theme.colors.secondFormText};
        font-weight: 600;
      `;
    case 'inputFilled':
      return css`
        background-color: ${({ theme }) => theme.colors.secondaryFormField};
        color: ${({ theme }) => theme.colors.secondFormText};
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

export const StyledFormField = styled.div<{
  $variant: DiceFieldVariant;
  isClickable?: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  width: 100%;
  border-radius: 8px;
  padding: 12px 0;
  cursor: ${({ isClickable }) => (isClickable ? 'pointer' : 'default')};
  @media ${({ theme }) => theme.devices.mobile} {
    font-size: 0.875rem;
    padding: 6px 0;
    border-radius: 4px;
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

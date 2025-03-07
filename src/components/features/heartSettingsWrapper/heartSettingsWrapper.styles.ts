import styled from 'styled-components';

export const StyledButton = styled.button`
  background-color: ${({ theme }) => theme.colors.buttonBackground};
  width: 100%;
  font-size: 2rem;
  font-weight: 600;
  padding: 24px;
  color: ${({ theme }) => theme.colors.textLight};
  border: none;
  border-radius: 12px;

  @media ${({ theme }) => theme.devices.mobile} {
    font-size: 1.5rem;
    border-radius: 8px;
    padding: 16px;
  }

  &:disabled {
    /* opacity: 0.6; */
    cursor: not-allowed;
    background-color: ${({ theme }) => theme.colors.buttonDisabled};
    color: ${({ theme }) => theme.colors.buttonDisabledText};
  }
`;

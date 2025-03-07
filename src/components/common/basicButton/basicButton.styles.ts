import styled from 'styled-components';

export const StyledBasicButton = styled.button`
  padding: 10px;
  width: 100%;
  color: ${({ theme }) => theme.colors.textLight};
  font-size: 2rem;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.buttonBackground};
  cursor: pointer;
  &:hover {
    background: ${({ theme }) => theme.colors.mainFormField};
    color: ${({ theme }) => theme.colors.textWhite};
  }

  @media ${({ theme }) => theme.devices.mobile} {
    font-size: 1rem;
  }
`;

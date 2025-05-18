import styled from 'styled-components';

export const StyledLabel = styled.label`
  font-size: 2.25rem;
  font-weight: 600;
  min-width: 150px;
  color: ${({ theme }) => theme.colors.textLight};

  @media ${({ theme }) => theme.devices.mobile} {
    min-width: 100px;
    font-size: 1.5rem;
  }
`;

export const StyledInput = styled.input`
  background-color: ${({ theme }) => theme.colors.lightFormField};
  width: 100%;
  font-size: 3rem;
  padding: 8px 8px 8px 12px;
  color: ${({ theme }) => theme.colors.secondaryFormField};
  border: none;
  border-radius: 8px;
  outline: none;
  font-family: 'Gemunu Libre', sans-serif;

  &::-webkit-input-placeholder {
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.frameMainFields};
    position: relative !important;
    transform: translateY(-35%) !important;
  }

  @media ${({ theme }) => theme.devices.mobile} {
    font-size: 1.75rem;

    &::-webkit-input-placeholder {
      font-size: 0.875rem;
    }
  }
`;

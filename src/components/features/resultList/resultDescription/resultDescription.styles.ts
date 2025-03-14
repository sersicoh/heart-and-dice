import styled from 'styled-components';

export const PrimaryDescrition = styled.div`
  font-size: 36px;
  color: white;

  @media ${({ theme }) => theme.devices.mobile} {
    font-size: 20px;
  }
`;

export const NameDescrition = styled.div`
  font-size: 24px;
  font-weight: 600;
  padding-right: 24px;
  color: white;

  @media ${({ theme }) => theme.devices.mobile} {
    font-size: 16px;
  }
`;

export const ScoreDescrition = styled.div`
  font-size: 24px;
  color: white;

  @media ${({ theme }) => theme.devices.mobile} {
    font-size: 16px;
  }
`;

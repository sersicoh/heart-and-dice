import styled from 'styled-components';

export const RuleTitle = styled.h3`
  font-size: 32px;
  padding: 12px 0;
  color: ${({ theme }) => theme.colors.textLight};

  @media ${({ theme }) => theme.devices.mobile} {
    font-size: 20px;
    padding: 8px 0;
  }
`;

export const RuleImageBackground = styled.div`
  position: absolute;
  z-index: 5;
  height: 100%;
  width: 100%;
  left: 0px;
  top: 0px;
  background: radial-gradient(ellipse at center, rgba(255, 255, 255, 0) 45%, #141c29 70%);
`;
export const RuleImage = styled.img`
  position: relative;
  height: 100%;
  width: 100%;
  z-index: 4;
`;

export const RuleDescriptionWrapper = styled.div`
  position: absolute;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  left: 10%;
  top: 75%;
  height: 100%;
  width: 80%;
  z-index: 6;

  @media ${({ theme }) => theme.devices.mobile} {
    left: 10%;
  }
`;

export const RuleDescription = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  font-size: 24px;
  height: 100%;
  width: 100%;

  @media ${({ theme }) => theme.devices.mobile} {
    font-size: 20px;
  }
`;

export const RuleImageWrapper = styled.div`
  position: relative;
  z-index: -1;
  width: 100%;
  height: auto;
`;

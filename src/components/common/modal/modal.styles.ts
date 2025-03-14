import styled from 'styled-components';

export const ModalOverlay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.6);
`;

export const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  position: relative;
  background-color: ${({ theme }) => theme.colors.modalBackground};
  box-shadow: 0 4px 8px ${({ theme }) => theme.colors.backgroundBase};
  border-radius: 16px;
  width: 100%;
  max-width: 700px;
  padding: 8px 24px 24px 24px;
  margin: 0 48px;

  @media ${({ theme }) => theme.devices.mobile} {
    padding: 4px 16px 16px 16px;
    margin: 0 32px;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
`;

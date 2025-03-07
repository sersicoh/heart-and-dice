import styled from 'styled-components';

export const Overlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  justify-content: flex-end;
  align-items: center;
  z-index: 1000;
`;

export const DrawerContainer = styled.div<{ isOpen: boolean }>`
  width: 400px;
  height: 100vh;
  background: ${({ theme }) => theme.colors.backgroundBase};
  box-shadow: -24px 0 24px ${({ theme }) => theme.colors.backgroundBase};
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 20px;
  position: relative;
  transform: ${({ isOpen }) => (isOpen ? 'translateX(0)' : 'translateX(100%)')};
  transition: transform 1.3s ease-in-out;

  @media ${({ theme }) => theme.devices.mobile} {
    width: 100%;
    box-shadow: none;
  }
`;

export const CloseButton = styled.button`
  display: flex;
  justify-content: flex-end;
  background: none;
  border: none;
  cursor: pointer;
`;

export const DrawerButton = styled.button`
  padding: 10px;
  width: 100%;
  color: ${({ theme }) => theme.colors.textLight};
  font-size: 1.5rem;
  border: none;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.buttonBackground};
  cursor: pointer;
  &:hover {
    background: ${({ theme }) => theme.colors.frameBackground};
  }
`;

import type { MouseEvent, ReactNode } from 'react';
import { useRef } from 'react';

import Container from '@components/common/container/Container';
import { CloseButton } from '@components/common/drawer/drawer.styles';
import { ModalContent, ModalOverlay, ModalWrapper } from '@components/common/modal/modal.styles';
import { Title } from '@components/common/title/Title';

import { useMyTheme } from '@hooks/useMyTheme';
import CloseSvg from '@assets/svg/close.svg?react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
  title?: string;
}
export const Modal = ({ isOpen, onClose, children, title }: ModalProps) => {
  const { theme } = useMyTheme();
  const overlayRef = useRef<HTMLDivElement | null>(null);

  if (!isOpen) {
    return null;
  }

  const handleOverlayClick = (event: MouseEvent) => {
    if (event.target === overlayRef.current) {
      onClose();
    }
  };

  return (
    <ModalOverlay ref={overlayRef} onClick={handleOverlayClick}>
      <ModalWrapper>
        <Container
          variant='flex'
          justifyContent={title ? 'space-between' : 'flex-end'}
          alignItems='flex-start'
        >
          {title && <Title label={title} />}
          <CloseButton onClick={onClose}>
            <CloseSvg width={'24px'} height={'24px'} color={theme.colors.textLight} />
          </CloseButton>
        </Container>
        <ModalContent>{children}</ModalContent>
      </ModalWrapper>
    </ModalOverlay>
  );
};

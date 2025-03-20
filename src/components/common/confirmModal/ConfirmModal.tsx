import type { ReactNode } from 'react';

import { BasicButton } from '@components/common/basicButton/BasicButton';
import Container from '@components/common/container/Container';
import { Modal } from '@components/common/modal/Modal';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string | ReactNode;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
}

export const ConfirmModal = ({
  isOpen,
  onClose,
  title,
  content,
  onConfirm,
  confirmText = 'Tak',
  cancelText = 'Nie',
}: ConfirmModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <h4>{content}</h4>
      <Container variant='flex' gap='16px' margin='24px 0 0 0' width='100%'>
        <BasicButton
          onClick={onConfirm}
          content={confirmText}
          variant='dark'
          fontSize={{ tablet: '32px', mobile: '16px' }}
        />
        <BasicButton
          onClick={onClose}
          content={cancelText}
          variant='dark'
          fontSize={{ tablet: '32px', mobile: '16px' }}
        />
      </Container>
    </Modal>
  );
};

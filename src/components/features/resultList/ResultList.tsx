import { useState } from 'react';

import { BasicButton } from '@components/common/basicButton/BasicButton';
import { ConfirmModal } from '@components/common/confirmModal/ConfirmModal';
import Container from '@components/common/container/Container';
import { Modal } from '@components/common/modal/Modal';
import { ResultDescription } from '@components/features/resultList/resultDescription/ResultDescription';

import { useKierkiStore } from '@store/kierkiStore';
import type { IFinishedGame } from '@store/store.types';
import { useCustomSnackbar } from '@hooks/useCustomSnackbar';
import { useMyTheme } from '@hooks/useMyTheme';
import TrashIcon from '@assets/svg/trash.svg?react';

interface ResultListProps {
  finishedGames: IFinishedGame[];
}

export const ResultList = ({ finishedGames }: ResultListProps) => {
  const [selectedGameId, setSelectedGameId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [gameToDeleteId, setGameToDeleteId] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { theme, isMobile } = useMyTheme();
  const { removeFinishedGame } = useKierkiStore();
  const { showSnackbar } = useCustomSnackbar();

  const openModal = (gameId: string) => {
    setSelectedGameId(gameId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedGameId(null);
    setIsModalOpen(false);
  };

  const openDeleteModal = (gameId: string) => {
    setGameToDeleteId(gameId);
    setIsDeleteModalOpen(true);
  };

  // Zamknięcie modala potwierdzenia
  const closeDeleteModal = () => {
    setGameToDeleteId(null);
    setIsDeleteModalOpen(false);
  };

  const handleConfirmDelete = () => {
    if (gameToDeleteId) {
      const game = finishedGames.find((g) => g.id === gameToDeleteId);
      removeFinishedGame(gameToDeleteId);
      showSnackbar({
        message: `Gra "${game?.name}" została usunięta z historii.`,
        variant: 'success',
        closeButton: true,
      });
    }
    closeDeleteModal();
  };

  const selectedGame = selectedGameId
    ? finishedGames.find((game) => game.id === selectedGameId)
    : null;

  return (
    <>
      <Container variant='flex' flexDirection='column' gap={isMobile ? '8px' : '12px'} width='100%'>
        {finishedGames.map((game) => (
          <Container
            variant='grid'
            gridTemplateColumns={isMobile ? '1fr 60px' : '1fr 80px'}
            gap={isMobile ? '8px' : '12px'}
            key={game.id}
          >
            <BasicButton onClick={() => openModal(game.id)} content={game.name} />
            <BasicButton
              padding={isMobile ? '4px' : '8px'}
              onClick={() => openDeleteModal(game.id)}
              content={
                <TrashIcon
                  width={isMobile ? '20px' : '32px'}
                  height={'100%'}
                  color={theme.colors.mainFormText}
                />
              }
            />
          </Container>
        ))}
      </Container>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={selectedGame?.name ?? 'Szczegóły gry'}
      >
        {selectedGame && <ResultDescription selectedGame={selectedGame} />}
      </Modal>
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        title='Potwierdź usunięcie'
        content='Czy na pewno chcesz usunąć tę grę z historii?'
        onConfirm={handleConfirmDelete}
      />
    </>
  );
};

import { useState } from 'react';

import { BasicButton } from '@components/common/basicButton/BasicButton';
import Container from '@components/common/container/Container';
import { Modal } from '@components/common/modal/Modal';
import { ResultDescription } from '@components/features/resultList/resultDescription/ResultDescription';

import type { IFinishedGame } from '@store/kierkiStore.types';

interface ResultListProps {
  finishedGames: IFinishedGame[];
}

export const ResultList = ({ finishedGames }: ResultListProps) => {
  const [selectedGameId, setSelectedGameId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (gameId: string) => {
    setSelectedGameId(gameId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedGameId(null);
    setIsModalOpen(false);
  };

  const selectedGame = selectedGameId
    ? finishedGames.find((game) => game.id === selectedGameId)
    : null;

  return (
    <>
      <Container variant='flex' flexDirection='column' gap='8px' width='100%'>
        {finishedGames.map((game, index) => (
          <BasicButton key={index} onClick={() => openModal(game.id)} label={game.name} />
        ))}
      </Container>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={selectedGame?.name ?? 'Szczegóły gry'}
      >
        {selectedGame && <ResultDescription selectedGame={selectedGame} />}
      </Modal>
    </>
  );
};

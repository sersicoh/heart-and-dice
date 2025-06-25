// src/views/dice/DiceForm.tsx
import React, { useState } from 'react';

import ReactMarkdown from 'react-markdown';
import { useNavigate } from 'react-router-dom';
import remarkGfm from 'remark-gfm';

import Container from '@components/common/container/Container';
import { Modal } from '@components/common/modal/Modal';
import { FormWrapperDice } from '@components/features/diceForm/FormWrapperDice';
import { NavigationBar } from '@components/features/navigationBar/NavigationBar';

import { useDiceStore } from '@store/diceStore';
import { generateDiceSummary } from '@utils/generateDiceSummary';
import { getNavigationItems } from '@utils/getNavigationItems';
import { useDiceFormLogic } from '@hooks/useDiceFormLogic';
import { useMyTheme } from '@hooks/useMyTheme';

export const DiceForm: React.FC = () => {
  const { isMobile } = useMyTheme();
  const navigate = useNavigate();
  const { buildUIRow, nextPlayer, undo, canNext, canUndo, allDone, finishGame, currentPlayerIdx } =
    useDiceFormLogic();
  const { fields } = useDiceStore();
  const [modalOpen, setModalOpen] = useState(false);

  const summaryMd = fields ? generateDiceSummary(fields) : '';

  const drawerItems = [
    { label: 'Ustawienia gry', onClick: () => navigate('/dice/settings') },
    { label: 'Strona główna', onClick: () => navigate('/') },
  ];

  return (
    <>
      <NavigationBar routes={getNavigationItems('dice')} drawerItems={drawerItems} />

      <Container
        variant='flex'
        flexDirection='column'
        padding='0 8px'
        margin={isMobile ? '112px auto 0' : '145px auto 0'}
        gap={isMobile ? '4px' : '8px'}
      >
        <FormWrapperDice
          buildUIRow={buildUIRow}
          currentPlayerIdx={currentPlayerIdx}
          onUndo={undo}
          onNext={nextPlayer}
          onFinish={() => {
            finishGame();
            setModalOpen(true);
          }}
          canUndo={canUndo}
          canNext={canNext}
          allDone={allDone}
        />
        <Modal isOpen={modalOpen} title='Podsumowanie' onClose={() => setModalOpen(false)}>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{summaryMd}</ReactMarkdown>
        </Modal>
      </Container>
    </>
  );
};

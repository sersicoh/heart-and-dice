import { useState } from 'react';

// import ReactMarkdown from 'react-markdown';
import { useNavigate } from 'react-router-dom';

// import remarkGfm from 'remark-gfm';

import { BasicButton } from '@components/common/basicButton/BasicButton';
import Container from '@components/common/container/Container';
import type { IDrawerItems } from '@components/common/drawer/drawer.types';
// import { Modal } from '@components/common/modal/Modal';
import { FormWrapperDice } from '@components/features/diceForm/FormWrapperDice';
import { NavigationBar } from '@components/features/navigationBar/NavigationBar';

import { useDiceStore } from '@store/diceStore';
// import { generateGameSummary } from '@utils/generateGameSummary';
import { getNavigationItems } from '@utils/getNavigationItems';
import { useDiceFormLogic } from '@hooks/useDiceForm';
import { useMyTheme } from '@hooks/useMyTheme';

export const DiceForm = () => {
  const { theme, isMobile } = useMyTheme();

  const navigate = useNavigate();
  const [finished, setFinished] = useState(false);
  // const [modalOpen, setModalOpen] = useState(false);

  const drawerItems: IDrawerItems['items'] = [
    { label: 'Ustawieia gry', onClick: () => navigate(`/dice/settings`) },
    { label: 'Strona główna', onClick: () => navigate('/') },
  ];

  const { endGame } = useDiceStore();

  const {
    fields,
    players,
    finishGame,
    setInputValue,
    goToNextPlayer,
    undoLastEntry,
    canUndo,
    isPlayerColumnComplete,
  } = useDiceFormLogic();

  const finishAll = () => {
    const success = finishGame();
    if (!success) {
      return;
    }
    endGame();
    setFinished(true);
  };

  const goBack = () => {
    undoLastEntry();
    setFinished(false);
  };

  const allDone = players.every((_, idx) => isPlayerColumnComplete(fields, idx));

  // const summaryMarkdown = generateGameSummary(fields);

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
        <FormWrapperDice diceFields={fields} onInputValueChange={setInputValue} players={players} />
        <Container
          variant='flex'
          gap={isMobile ? '12px' : '24px'}
          padding={isMobile ? '4px' : '12px'}
          backgroundColor={theme.colors.frameBackground}
        >
          <BasicButton onClick={goBack} content={'Cofnij'} disabled={!canUndo || finished} />
          <BasicButton onClick={goToNextPlayer} content={'Następna gracz'} disabled={allDone} />
          <BasicButton
            onClick={
              finished
                ? () => {
                    // setModalOpen(true);
                    console.log('Game finished, show summary or navigate to results');
                  }
                : finishAll
            }
            content={finished ? 'Podmusowanie' : 'Zakończ grę'}
            disabled={!allDone}
          />
        </Container>
      </Container>
      {/* <Modal isOpen={modalOpen} title='Podsumowanie' onClose={() => setModalOpen(false)}>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{summaryMarkdown}</ReactMarkdown>
      </Modal> */}
    </>
  );
};

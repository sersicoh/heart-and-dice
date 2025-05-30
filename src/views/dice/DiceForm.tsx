// @views/heart/HeartForm.tsx
import { useState } from 'react';

import ReactMarkdown from 'react-markdown';
import { useNavigate } from 'react-router-dom';
import remarkGfm from 'remark-gfm';

import { BasicButton } from '@components/common/basicButton/BasicButton';
import Container from '@components/common/container/Container';
import type { IDrawerItems } from '@components/common/drawer/drawer.types';
import { Modal } from '@components/common/modal/Modal';
import { FormWrapper } from '@components/features/form/FormWrapper';
import { NavigationBar } from '@components/features/navigationBar/NavigationBar';

import { useKierkiStore } from '@store/kierkiStore';
import { generateGameSummary } from '@utils/generateGameSummary';
import { getNavigationItems } from '@utils/getNavigationItems';
import { useHeartFormLogic } from '@hooks/useHeartForm';
import { useMyTheme } from '@hooks/useMyTheme';

export const DiceForm = () => {
  const { theme, isMobile } = useMyTheme();

  const navigate = useNavigate();
  const [finished, setFinished] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const drawerItems: IDrawerItems['items'] = [
    { label: 'Ustawieia gry', onClick: () => navigate(`/dice/settings`) },
    { label: 'Strona główna', onClick: () => navigate('/') },
  ];

  const { endGame } = useKierkiStore();

  const {
    fields,
    goToNextRow,
    finishGame,
    undoLastRow,
    setInputValue,
    activableRows,
    activeIndex,
  } = useHeartFormLogic();

  const finishAll = () => {
    const success = finishGame();
    if (!success) {
      return;
    }
    endGame();
    setFinished(true);
  };

  const goBack = () => {
    undoLastRow();
    setFinished(false);
  };

  const summaryMarkdown = generateGameSummary(fields);

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
        <FormWrapper heartsFields={fields} onInputValueChange={setInputValue} />
        <Container
          variant='flex'
          gap={isMobile ? '12px' : '24px'}
          padding={isMobile ? '4px' : '12px'}
          backgroundColor={theme.colors.frameBackground}
        >
          <BasicButton
            onClick={goBack}
            content={'Cofnij'}
            disabled={activeIndex === 0 || finished}
          />
          <BasicButton
            onClick={goToNextRow}
            content={'Następna runda'}
            disabled={activeIndex == activableRows.length - 1}
          />
          <BasicButton
            onClick={
              finished
                ? () => {
                    setModalOpen(true);
                  }
                : finishAll
            }
            content={finished ? 'Podmusowanie' : 'Zakończ grę'}
            disabled={activeIndex !== activableRows.length - 1}
          />
        </Container>
      </Container>
      <Modal isOpen={modalOpen} title='Podsumowanie' onClose={() => setModalOpen(false)}>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{summaryMarkdown}</ReactMarkdown>
      </Modal>
    </>
  );
};

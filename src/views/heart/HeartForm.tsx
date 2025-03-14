// @views/heart/HeartForm.tsx
import { useState } from 'react';

import ReactMarkdown from 'react-markdown';
import { useNavigate } from 'react-router-dom';
import remarkGfm from 'remark-gfm';

import { BasicButton } from '@components/common/basicButton/BasicButton';
import Container from '@components/common/container/Container';
import type { IDrawerItems } from '@components/common/drawer/drawer.types';
import { FormWrapper } from '@components/common/form/FormWrapper';
import { Modal } from '@components/common/modal/Modal';
import { NavigationBar } from '@components/features/navigationBar/NavigationBar';

import { useKierkiStore } from '@store/kierkiStore';
import { generateGameSummary } from '@utils/generateGameSummary';
import { getNavigationItemsKierki } from '@utils/getNavigationItemsKierki';
import { useHeartFormLogic } from '@hooks/useHeartForm';
import { useMyTheme } from '@hooks/useMyTheme';

export const HeartForm = () => {
  const { theme, isMobile } = useMyTheme();
  const navigate = useNavigate();
  const [finished, setFinished] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const drawerItems: IDrawerItems['items'] = [
    { label: 'Ustawieia gry', onClick: () => navigate('/heart/settings') },
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
      <NavigationBar routes={getNavigationItemsKierki()} drawerItems={drawerItems} />
      <Container
        variant='flex'
        flexDirection='column'
        padding='0 8px'
        gap={isMobile ? '4px' : '8px'}
      >
        <FormWrapper heartsFields={fields} onInputValueChange={setInputValue} />
        <Container
          variant='flex'
          gap={isMobile ? '12px' : '24px'}
          padding={isMobile ? '4px' : '12px'}
          backgroundColor={theme.colors.frameBackground}
        >
          <BasicButton onClick={goBack} label={'Cofnij'} disabled={activeIndex === 0 || finished} />
          <BasicButton
            onClick={goToNextRow}
            label={'Następna runda'}
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
            label={finished ? 'Podmusowanie' : 'Zakończ grę'}
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

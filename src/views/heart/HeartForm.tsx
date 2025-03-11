// @views/heart/HeartForm.tsx
import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { BasicButton } from '@components/common/basicButton/BasicButton';
import Container from '@components/common/container/Container';
import type { IDrawerItems } from '@components/common/drawer/drawer.types';
import { FormWrapper } from '@components/common/form/FormWrapper';
import { NavigationBar } from '@components/features/navigationBar/NavigationBar';

import { getNavigationItemsKierki } from '@utils/getNavigationItemsKierki';
import { useHeartFormLogic } from '@hooks/useHeartForm';
import { useMyTheme } from '@hooks/useMyTheme';

export const HeartForm = () => {
  const { theme, isMobile } = useMyTheme();
  const navigate = useNavigate();
  const [finished, setFinished] = useState(false);

  const finishAll = () => {
    finishGame();
    setFinished(true);
  };

  const goBack = () => {
    undoLastRow();
    setFinished(false);
  };

  const drawerItems: IDrawerItems['items'] = [
    { label: 'Ustawieia gry', onClick: () => navigate('/heart/settings') },
    { label: 'Strona główna', onClick: () => navigate('/') },
    { label: 'Zakończ grę', onClick: () => console.log('Zakończ grę') },
  ];

  const {
    fields,
    goToNextRow,
    finishGame,
    undoLastRow,
    setInputValue,
    activableRows,
    activeIndex,
  } = useHeartFormLogic();

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
          <BasicButton onClick={goBack} label={'Cofnij'} disabled={activeIndex === 0} />
          <BasicButton
            onClick={activeIndex < activableRows.length - 1 ? goToNextRow : finishAll}
            label={activeIndex < activableRows.length - 1 ? 'Następna runda' : 'Zakończ grę'}
            disabled={finished}
          />
          <BasicButton onClick={goBack} label={'Zapisz grę'} />
        </Container>
      </Container>
    </>
  );
};

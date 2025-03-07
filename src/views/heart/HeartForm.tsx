// @views/heart/HeartForm.tsx
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
  const drawerItems: IDrawerItems['items'] = [
    { label: 'Przejdź do ustawień gry', onClick: () => navigate('/heart/settings') },
    { label: 'Przejdź do strony głównej', onClick: () => navigate('/') },
    { label: 'Zakończ grę', onClick: () => console.log('Zakończ grę') },
  ];

  const { fields, goToNextRow, undoLastRow, setInputValue } = useHeartFormLogic();

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
          <BasicButton onClick={goToNextRow} label={'Następna runda'} />
          <BasicButton onClick={undoLastRow} label={'Cofnij'} />
          <BasicButton onClick={undoLastRow} label={'Zapisz grę'} />
        </Container>
      </Container>
    </>
  );
};

import { useNavigate } from 'react-router-dom';

import Container from '@components/common/container/Container';
import type { IDrawerItems } from '@components/common/drawer/drawer.types';
import { Title } from '@components/common/title/Title';
import { HeartSettingsWrapper } from '@components/features/heartSettingsWrapper/HeartSettingsWrapper';
import { NavigationBar } from '@components/features/navigationBar/NavigationBar';

import { getNavigationItemsKierki } from '@utils/getNavigationItemsKierki';
import { useMyTheme } from '@hooks/useMyTheme';

export const HeartSettings = () => {
  const { isMobile } = useMyTheme();

  const navigate = useNavigate();

  const drawerItems: IDrawerItems['items'] = [
    { label: 'Wróć do formularza', onClick: () => navigate('/heart/form') },
    { label: 'Strona główna', onClick: () => navigate('/') },
  ];
  return (
    <>
      <NavigationBar routes={getNavigationItemsKierki()} drawerItems={drawerItems} />
      <Container
        variant='flex'
        flexDirection='column'
        justifyContent='flex-start'
        alignItems='center'
      >
        <Container
          variant='flex'
          justifyContent='center'
          alignItems='center'
          padding={isMobile ? '16px' : '24px'}
        >
          <Title label='Ustawienia - Kierki' />
        </Container>
        <Container variant='flex' flexDirection='column'>
          <HeartSettingsWrapper />
        </Container>
      </Container>
    </>
  );
};

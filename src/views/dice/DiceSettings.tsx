import { useNavigate } from 'react-router-dom';

import Container from '@components/common/container/Container';
import type { IDrawerItems } from '@components/common/drawer/drawer.types';
import { Title } from '@components/common/title/Title';
import { NavigationBar } from '@components/features/navigationBar/NavigationBar';

import { getNavigationItemsKierki } from '@utils/heart/getNavigationItemsKierki';
import { useMyTheme } from '@hooks/useMyTheme';

export const DiceSettings = () => {
  const { isMobile } = useMyTheme();

  const navigate = useNavigate();

  const drawerItems: IDrawerItems['items'] = [
    { label: 'Wróć do formularza', onClick: () => navigate('/dice/form') },
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
        margin={isMobile ? '112px auto 0' : '145px auto 0'}
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
          <div>dupa</div>
          {/* <DiceSettingsWrapper /> */}
        </Container>
      </Container>
    </>
  );
};

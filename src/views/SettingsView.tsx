import { useNavigate, useParams } from 'react-router-dom';

import Container from '@components/common/container/Container';
import type { IDrawerItems } from '@components/common/drawer/drawer.types';
import { Title } from '@components/common/title/Title';
import { DiceSettingsWrapper } from '@components/features/diceSettingsWrapper/DiceSettingsWrapper';
import { HeartSettingsWrapper } from '@components/features/heartSettingsWrapper/HeartSettingsWrapper';
import { NavigationBar } from '@components/features/navigationBar/NavigationBar';

import { getNavigationItems } from '@utils/getNavigationItems';
import { useMyTheme } from '@hooks/useMyTheme';

export const SettingsView = () => {
  const { isMobile } = useMyTheme();

  const { game } = useParams();
  const isKierki = game === 'heart';
  const navigate = useNavigate();

  const drawerItems: IDrawerItems['items'] = [
    { label: 'Wróć do formularza', onClick: () => navigate(`/${game}/form`) },
    { label: 'Strona główna', onClick: () => navigate('/') },
  ];

  return (
    <>
      <NavigationBar routes={getNavigationItems(game)} drawerItems={drawerItems} />
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
          <Title label='Ustawienia' />
        </Container>
        <Container variant='flex' flexDirection='column'>
          {isKierki ? <HeartSettingsWrapper /> : <DiceSettingsWrapper />}
        </Container>
      </Container>
    </>
  );
};

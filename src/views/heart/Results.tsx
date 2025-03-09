import { useNavigate } from 'react-router-dom';

import Container from '@components/common/container/Container';
import type { IDrawerItems } from '@components/common/drawer/drawer.types';
import { NavigationBar } from '@components/features/navigationBar/NavigationBar';

import { getNavigationItemsKierki } from '@utils/getNavigationItemsKierki';

export const Results = () => {
  const navigate = useNavigate();

  const drawerItems: IDrawerItems['items'] = [
    { label: 'Ustawienia gry', onClick: () => navigate('/heart/settings') },
    { label: 'Strona główna', onClick: () => navigate('/') },
    { label: 'Zakończ grę', onClick: () => console.log('Zakończ grę') },
  ];
  return (
    <>
      <NavigationBar routes={getNavigationItemsKierki()} drawerItems={drawerItems} />
      <Container>Results</Container>
    </>
  );
};

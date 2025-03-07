import { useNavigate } from 'react-router-dom';

import Container from '@components/common/container/Container';
import type { IDrawerItems } from '@components/common/drawer/drawer.types';
import { NavigationBar } from '@components/features/navigationBar/NavigationBar';

import { getNavigationItemsKierki } from '@utils/getNavigationItemsKierki';

export const Rules = () => {
  const navigate = useNavigate();

  const drawerItems: IDrawerItems['items'] = [
    { label: 'Przejdź do ustawień', onClick: () => navigate('/heart/settings') },
    { label: 'Przejdź do strony głównej', onClick: () => navigate('/') },
    { label: 'Zakończ grę', onClick: () => console.log('Zakończ grę') },
  ];
  return (
    <>
      <NavigationBar routes={getNavigationItemsKierki()} drawerItems={drawerItems} />
      <Container>Rules</Container>
    </>
  );
};

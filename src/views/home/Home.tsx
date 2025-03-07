import { useNavigate } from 'react-router-dom';

import Container from '@components/common/container/Container';
import type { IDrawerItems } from '@components/common/drawer/drawer.types';
import { NavigationBar } from '@components/features/navigationBar/NavigationBar';

import { getNavigationItemsKierki } from '@utils/getNavigationItemsKierki';

export const Home = () => {
  const navigate = useNavigate();

  const drawerItems: IDrawerItems['items'] = [
    { label: 'Polski', onClick: () => console.log('Polski') },
    { label: 'English', onClick: () => console.log('English') },
  ];

  return (
    <>
      <NavigationBar routes={getNavigationItemsKierki()} drawerItems={drawerItems} />
      <Container>
        <h1>Wybierz grę</h1>
        <button onClick={() => navigate('/heart/settings')}>Kierki</button>
        <button onClick={() => navigate('/dice/settings')}>Kości</button>
      </Container>
    </>
  );
};

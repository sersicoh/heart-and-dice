import { useNavigate } from 'react-router-dom';

import type { IDrawerItems } from '@components/common/drawer/drawer.types';
import { NavigationBar } from '@components/features/navigationBar/NavigationBar';
import { RulesWrapper } from '@components/features/rulesWrapper/RulesWrapper';

import { getNavigationItemsKierki } from '@utils/getNavigationItems';

export const Rules = () => {
  const navigate = useNavigate();

  const drawerItems: IDrawerItems['items'] = [
    { label: 'Ustawieia gry', onClick: () => navigate('/heart/settings') },
    { label: 'Strona główna', onClick: () => navigate('/') },
  ];
  return (
    <>
      <NavigationBar routes={getNavigationItemsKierki()} drawerItems={drawerItems} />
      <RulesWrapper />
    </>
  );
};

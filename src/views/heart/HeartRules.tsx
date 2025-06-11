import { useNavigate } from 'react-router-dom';

import type { IDrawerItems } from '@components/common/drawer/drawer.types';
import { RulesWrapper } from '@components/features/heart/heartRulesWrapper/RulesWrapper';
import { NavigationBar } from '@components/features/navigationBar/NavigationBar';

import { getNavigationItemsKierki } from '@utils/heart/getNavigationItemsKierki';

export const HeartRules = () => {
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

import { useNavigate, useParams } from 'react-router-dom';

import type { IDrawerItems } from '@components/common/drawer/drawer.types';
import { DiceRulesWrapper } from '@components/features/diceRulesWrapper/DiceRulesWrapper';
import { HeartRulesWrapper } from '@components/features/heartRulesWrapper/HeartRulesWrapper';
import { NavigationBar } from '@components/features/navigationBar/NavigationBar';

import { getNavigationItems } from '@utils/getNavigationItems';

export const Rules = () => {
  const { game } = useParams();
  const isKierki = game === 'kierki';
  const navigate = useNavigate();

  const drawerItems: IDrawerItems['items'] = [
    { label: 'Wróć do formularza', onClick: () => navigate(`/${game}/settings`) },
    { label: 'Strona główna', onClick: () => navigate('/') },
  ];
  return (
    <>
      <NavigationBar routes={getNavigationItems(game)} drawerItems={drawerItems} />
      {isKierki ? <HeartRulesWrapper /> : <DiceRulesWrapper />}
    </>
  );
};

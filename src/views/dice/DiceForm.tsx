import { useNavigate } from 'react-router-dom';

import Container from '@components/common/container/Container';
import type { IDrawerItems } from '@components/common/drawer/drawer.types';
import { FormWrapperDice } from '@components/features/diceForm/FormWrapperDice';
import { NavigationBar } from '@components/features/navigationBar/NavigationBar';

import { getNavigationItems } from '@utils/getNavigationItems';
import { useMyTheme } from '@hooks/useMyTheme';

export const DiceForm = () => {
  const { isMobile } = useMyTheme();

  const navigate = useNavigate();

  const drawerItems: IDrawerItems['items'] = [
    { label: 'Ustawieia gry', onClick: () => navigate(`/dice/settings`) },
    { label: 'Strona główna', onClick: () => navigate('/') },
  ];

  return (
    <>
      <NavigationBar routes={getNavigationItems('dice')} drawerItems={drawerItems} />
      <Container
        variant='flex'
        flexDirection='column'
        padding='0 8px'
        margin={isMobile ? '112px auto 0' : '145px auto 0'}
        gap={isMobile ? '4px' : '8px'}
      >
        <FormWrapperDice />
      </Container>
    </>
  );
};

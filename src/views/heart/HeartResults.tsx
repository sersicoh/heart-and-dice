// @views/results/Results.tsx

import { useNavigate, useParams } from 'react-router-dom';

import { BasicButton } from '@components/common/basicButton/BasicButton';
import Container from '@components/common/container/Container';
import type { IDrawerItems } from '@components/common/drawer/drawer.types';
import { Title } from '@components/common/title/Title';
import { NavigationBar } from '@components/features/navigationBar/NavigationBar';
import { ResultList } from '@components/features/resultList/ResultList';

// import { useDiceStore } from '@store/diceStore';
import { useKierkiStore } from '@store/kierkiStore';
import { getNavigationItems } from '@utils/getNavigationItems';
import { useMyTheme } from '@hooks/useMyTheme';

export const Results = () => {
  const navigate = useNavigate();
  const { game } = useParams();
  const { isMobile } = useMyTheme();

  // const store = game === 'kierki' ? useKierkiStore : useDiceStore;

  const { finishedGames } = useKierkiStore();
  // const { finishedGames } = store();

  const drawerItems: IDrawerItems['items'] = [
    { label: 'Ustawienia gry', onClick: () => navigate(`/${game}/settings`) },
    { label: 'Strona główna', onClick: () => navigate('/') },
  ];

  return (
    <>
      <NavigationBar routes={getNavigationItems(game)} drawerItems={drawerItems} />
      <Container
        variant='flex'
        flexDirection='column'
        padding={isMobile ? '16px' : '24px'}
        gap='16px'
        justifyContent='center'
        alignItems='center'
        width='90%'
        margin={isMobile ? '112px auto 0' : '145px auto 0'}
      >
        {finishedGames.length === 0 ? (
          <>
            <Title label='Trochę tu pusto' />
            <BasicButton
              content='Zagraj'
              onClick={() => navigate(`/${game}/settings`)}
              fontSize={{ tablet: '48px', mobile: '24px' }}
            />
          </>
        ) : (
          <>
            <Title label='Zakończone gry' />
            <ResultList finishedGames={finishedGames} />
          </>
        )}
      </Container>
    </>
  );
};

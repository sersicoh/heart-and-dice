import Container from '@components/common/container/Container';
import {
  NameDescrition,
  PrimaryDescrition,
  ScoreDescrition,
} from '@components/features/resultList/resultDescription/resultDescription.styles';

import type { IFinishedGame } from '@store/kierkiStore.types';
import { useMyTheme } from '@hooks/useMyTheme';

const calculateGameDuration = (startTimestamp: number, endTimestamp?: number) => {
  if (!endTimestamp) return null;

  const durationMs = new Date(endTimestamp).getTime() - new Date(startTimestamp).getTime();
  const totalSeconds = Math.floor(durationMs / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}m ${seconds}s`;
  } else if (minutes > 0) {
    return `${minutes}m ${seconds}s`;
  } else {
    return `${seconds}s`;
  }
};

export const ResultDescription = ({ selectedGame }: { selectedGame: IFinishedGame }) => {
  const gameDuration = calculateGameDuration(
    selectedGame.startTimestamp,
    selectedGame.endTimestamp
  );

  const { isMobile } = useMyTheme();

  return (
    <Container
      variant='grid'
      gridTemplateColumns='1fr'
      gap='24px'
      width='100%'
      padding={isMobile ? '0 0 0 8px' : '24px 0 0 12px'}
    >
      <Container
        variant='flex'
        flexDirection='column'
        justifyContent='center'
        alignItems='flex-start'
      >
        <PrimaryDescrition>
          Start gry: {new Date(selectedGame.startTimestamp).toLocaleString()}
        </PrimaryDescrition>
        {selectedGame.endTimestamp && (
          <>
            <PrimaryDescrition>
              Koniec gry: {new Date(selectedGame.endTimestamp).toLocaleString()}
            </PrimaryDescrition>
            <PrimaryDescrition>Czas trwania: {gameDuration}</PrimaryDescrition>
          </>
        )}
      </Container>
      <Container variant='flex' flexDirection='column' gap='16px'>
        <PrimaryDescrition>Wyniki końcowe:</PrimaryDescrition>
        <Container
          variant='grid'
          gridTemplateColumns='1fr 1fr'
          gap={isMobile ? '4px' : '8px'}
          width='max-content'
        >
          <NameDescrition>{selectedGame.playersSnapshot[0]?.name || 'Gracz 1'}:</NameDescrition>
          <ScoreDescrition>
            {selectedGame.fieldsSnapshot?.resultSection?.result?.computedPoints?.p1 ?? 0}
          </ScoreDescrition>
          <NameDescrition>{selectedGame.playersSnapshot[1]?.name || 'Gracz 2'}:</NameDescrition>
          <ScoreDescrition>
            {selectedGame.fieldsSnapshot?.resultSection?.result?.computedPoints?.p2 ?? 0}
          </ScoreDescrition>
          <NameDescrition>{selectedGame.playersSnapshot[2]?.name || 'Gracz 3'}:</NameDescrition>
          <ScoreDescrition>
            {selectedGame.fieldsSnapshot?.resultSection?.result?.computedPoints?.p3 ?? 0}
          </ScoreDescrition>
          {/* Jeśli była czwórka graczy: */}
          {selectedGame.playersSnapshot[3] && (
            <>
              <NameDescrition>{selectedGame.playersSnapshot[3]?.name || 'Gracz 4'}:</NameDescrition>
              <ScoreDescrition>
                {selectedGame.fieldsSnapshot?.resultSection?.result?.computedPoints?.p4 ?? 0}
              </ScoreDescrition>
            </>
          )}
        </Container>
      </Container>
    </Container>
  );
};

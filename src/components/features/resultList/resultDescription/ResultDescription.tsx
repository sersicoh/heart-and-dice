import Container from '@components/common/container/Container';
import {
  NameDescrition,
  PrimaryDescrition,
  ScoreDescrition,
  SecondaryDescrition,
} from '@components/features/resultList/resultDescription/resultDescription.styles';

import type { IFinishedHeartGame } from '@store/store.types';
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

export const ResultDescription = ({ selectedGame }: { selectedGame: IFinishedHeartGame }) => {
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
        <Container variant='flex' gap={isMobile ? '12px' : '24px'} alignItems='center'>
          <PrimaryDescrition>Start gry: </PrimaryDescrition>
          <SecondaryDescrition>
            {new Date(selectedGame.startTimestamp).toLocaleString()}
          </SecondaryDescrition>
        </Container>
        {selectedGame.endTimestamp && (
          <>
            <Container variant='flex' gap={isMobile ? '12px' : '24px'} alignItems='center'>
              <PrimaryDescrition>Koniec gry: </PrimaryDescrition>
              <SecondaryDescrition>
                {new Date(selectedGame.endTimestamp).toLocaleString()}
              </SecondaryDescrition>
            </Container>
            <Container variant='flex' gap={isMobile ? '12px' : '24px'} alignItems='center'>
              <PrimaryDescrition>Czas trwania: </PrimaryDescrition>
              <SecondaryDescrition> {gameDuration} </SecondaryDescrition>
            </Container>
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
          {selectedGame.playersSnapshot.map((player, index) => {
            const playerKey =
              `p${index + 1}` as keyof typeof selectedGame.fieldsSnapshot.resultSection.result.computedPoints;
            return (
              <>
                <NameDescrition>{player?.name || `Gracz${index + 1}`}:</NameDescrition>
                <ScoreDescrition key={player?.name}>
                  {selectedGame.fieldsSnapshot?.resultSection?.result?.computedPoints?.[
                    playerKey
                  ] ?? 0}
                </ScoreDescrition>
              </>
            );
          })}
        </Container>
      </Container>
    </Container>
  );
};

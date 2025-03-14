import { BasicButton } from '@components/common/basicButton/BasicButton';
import Container from '@components/common/container/Container';
import { PlayerInuptTile } from '@components/features/heartSettingsWrapper/playerInuptTile/PlayerInuptTile';

import { useHeartSettingsLogic } from '@hooks/useHeartSettings';
import { useMyTheme } from '@hooks/useMyTheme';

export const HeartSettingsWrapper = () => {
  const { isMobile } = useMyTheme();

  const {
    isGameInProgress,
    validPlayersCount,
    startGame,
    returnToGame,
    resetAll,
    tempPlayers,
    changeName,
  } = useHeartSettingsLogic();
  return (
    <Container
      variant='flex'
      flexDirection='column'
      width='100%'
      padding={isMobile ? '8px' : '36px'}
      justifyContent='center'
      alignItems='center'
      height='100%'
      gap={isMobile ? '16px' : '24px'}
    >
      {tempPlayers.map((playerName, idx) => (
        <PlayerInuptTile
          key={idx}
          idx={idx}
          label={`Gracz ${idx + 1}:`}
          placeholder={idx === 3 ? 'pozostaw puste jeśli gracie w trójkę' : ''}
          value={playerName}
          onChange={changeName}
        />
      ))}
      <Container
        variant='flex'
        flexDirection='column'
        gap={isMobile ? '16px' : '36px'}
        width='100%'
        padding='36px'
      >
        {isGameInProgress ? (
          <BasicButton
            onClick={returnToGame}
            disabled={validPlayersCount < 3}
            content='Wróć do formularza'
            fontSize={{ tablet: '48px', mobile: '24px' }}
          />
        ) : (
          <BasicButton
            onClick={startGame}
            disabled={validPlayersCount < 3}
            content='Start'
            fontSize={{ tablet: '48px', mobile: '24px' }}
          />
        )}
        <BasicButton
          onClick={resetAll}
          content='Rozpocznij nową grę'
          fontSize={{ tablet: '48px', mobile: '24px' }}
        />
      </Container>
    </Container>
  );
};

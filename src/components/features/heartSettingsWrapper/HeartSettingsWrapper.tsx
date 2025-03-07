import Container from '@components/common/container/Container';
import { StyledButton } from '@components/features/heartSettingsWrapper/heartSettingsWrapper.styles';
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
        gap={isMobile ? '16px' : '24px'}
        padding={isMobile ? '16px' : '36px'}
        width='100%'
      >
        {isGameInProgress ? (
          <StyledButton onClick={returnToGame} disabled={validPlayersCount < 3}>
            Wróć do gry
          </StyledButton>
        ) : (
          <StyledButton onClick={startGame} disabled={validPlayersCount < 3}>
            Start
          </StyledButton>
        )}

        <StyledButton onClick={resetAll}>Rozpocznij nową grę</StyledButton>
      </Container>
    </Container>
  );
};

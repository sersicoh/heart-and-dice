// @views/heart/HeartSettings.tsx
import Container from '@components/common/container/Container';

import { useHeartSettingsLogic } from '@hooks/useHeartSettings';

export const HeartSettings = () => {
  const {
    tempPlayers,
    isGameInProgress,
    validPlayersCount,
    changeName,
    startGame,
    returnToGame,
    resetAll,
  } = useHeartSettingsLogic();

  return (
    <Container>
      <h2>Ustawienia gry w Kierki</h2>

      {tempPlayers.map((playerName, idx) => (
        <div key={playerName}>
          <label>Gracz {idx + 1}</label>
          <input type='text' value={playerName} onChange={(e) => changeName(idx, e.target.value)} />
        </div>
      ))}

      <br />

      {isGameInProgress ? (
        <button onClick={returnToGame} disabled={validPlayersCount < 3}>
          Wróć do gry
        </button>
      ) : (
        <button onClick={startGame} disabled={validPlayersCount < 3}>
          Start
        </button>
      )}

      <br />

      <button onClick={resetAll}>Reset</button>
    </Container>
  );
};

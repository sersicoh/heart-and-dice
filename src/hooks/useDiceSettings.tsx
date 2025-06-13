import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { useDiceStore } from '@store/diceStore';
import { useCustomSnackbar } from '@hooks/useCustomSnackbar';

function initTempPlayers(playersFromStore: { name: string }[]): string[] {
  const arr = playersFromStore.map((p) => p.name);
  while (arr.length < 2) arr.push(''); // minimalnie 2 pola
  return arr.slice(0, 10); // maksymalnie 10 pól
}

function syncPlayers(tempPlayers: string[]) {
  return tempPlayers.filter((n) => n.trim().length > 0).map((name) => ({ name }));
}

export function useDiceSettingsLogic() {
  const navigate = useNavigate();
  const {
    players,
    isGameInProgress,
    setPlayers,
    setGameInProgress,
    resetGame,
    initialPlayersCount,
    setInitialPlayersCount,
    setGameNameAndStart,
  } = useDiceStore();

  const [tempPlayers, setTempPlayers] = useState<string[]>(() =>
    players.length > 0 ? initTempPlayers(players) : ['', '']
  );
  const { showSnackbar } = useCustomSnackbar();

  /* ---------- synchronizacja store ↔ lokalny stan ---------- */
  useEffect(() => {
    setTempPlayers(players.length === 0 ? ['', ''] : initTempPlayers(players));
  }, [players]);

  /* -------------------- akcje -------------------- */
  const changeName = (index: number, newName: string) => {
    setTempPlayers((prev) => {
      const arr = [...prev];
      arr[index] = newName;
      setPlayers(syncPlayers(arr));
      return arr;
    });
  };

  const addPlayerField = () => {
    setTempPlayers((prev) => (prev.length < 10 ? [...prev, ''] : prev));
  };

  const startGame = () => {
    const valid = syncPlayers(tempPlayers);
    setInitialPlayersCount(valid.length);
    setGameInProgress(true);
    setGameNameAndStart();
    navigate('/dice/form');
    showSnackbar({
      message: `Gra rozpoczęta, zaczyna ${valid[0].name.toUpperCase()}, powodzenia!`,
      variant: 'success',
      autoHideDuration: 3000,
      closeButton: true,
    });
  };

  const returnToGame = () => {
    const countNow = syncPlayers(tempPlayers).length;
    if (isGameInProgress && initialPlayersCount !== null && countNow !== initialPlayersCount) {
      const message = `W aktualniej grze formularz był przygotowany na ${initialPlayersCount} graczy, uzupełnij dotychczasowe pola z imionami lub rozpocznij nową grę`;

      showSnackbar({
        message,
        variant: 'warning',
        autoHideDuration: 10000,
        closeButton: true,
      });

      return;
    }
    navigate('/dice/form');
  };

  const startNewGame = () => {
    const valid = syncPlayers(tempPlayers);
    if (valid.length < 2) {
      showSnackbar({
        message: 'Aby rozpocząć nową grę, wpisz przynajmniej 2 imiona.',
        variant: 'error',
        autoHideDuration: 5000,
        closeButton: true,
      });
      return;
    }
    resetGame();
    setPlayers(valid);
    setInitialPlayersCount(valid.length);
    setGameInProgress(true);
    setGameNameAndStart();
    navigate('/dice/form');
    showSnackbar({
      message: `Następna gra rozpoczęta, zaczyna ${valid[0].name.toUpperCase()}, powodzenia!`,
      variant: 'success',
      autoHideDuration: 3000,
      closeButton: true,
    });
  };

  const resetAll = () => {
    resetGame();
    setTempPlayers(['', '']);
  };

  /* ----------------- walidacja ----------------- */
  const areAllFieldsFilled = tempPlayers.every((n) => n.trim().length > 0);
  const validPlayersCount = tempPlayers.filter((n) => n.trim().length > 0).length;
  const canStart = validPlayersCount >= 2 && areAllFieldsFilled;

  return {
    tempPlayers,
    isGameInProgress,
    canStart,
    validPlayersCount,
    changeName,
    addPlayerField,
    startGame,
    startNewGame,
    returnToGame,
    resetAll,
  };
}

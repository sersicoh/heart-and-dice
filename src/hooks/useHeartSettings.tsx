import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { useKierkiStore } from '@store/kierkiStore';
import { useCustomSnackbar } from '@hooks/useCustomSnackbar';

function initTempPlayers(playersFromStore: { name: string }[]): string[] {
  const arr = playersFromStore.map((p) => p.name);
  while (arr.length < 4) {
    arr.push('');
  }
  return arr.slice(0, 4);
}

function syncPlayers(tempPlayers: string[]) {
  return tempPlayers.filter((n) => n.trim().length > 0).map((name) => ({ name }));
}

export function useHeartSettingsLogic() {
  const navigate = useNavigate();
  const {
    players,
    isGameInProgress,
    setPlayers,
    setGameInProgress,
    resetGame,
    initialPlayersCount,
    setInitialPlayersCount,
  } = useKierkiStore();

  const [tempPlayers, setTempPlayers] = useState<string[]>(() =>
    players.length > 0 ? initTempPlayers(players) : ['', '', '', '']
  );

  const { showSnackbar } = useCustomSnackbar();

  useEffect(() => {
    if (players.length === 0) {
      setTempPlayers(['', '', '', '']);
    } else {
      setTempPlayers(initTempPlayers(players));
    }
  }, [players]);

  const changeName = (index: number, newName: string) => {
    setTempPlayers((prev) => {
      const arr = [...prev];
      arr[index] = newName;

      setPlayers(syncPlayers(arr));
      return arr;
    });
  };

  const startGame = () => {
    const count = syncPlayers(tempPlayers).length;
    setInitialPlayersCount(count);
    setGameInProgress(true);
    navigate('/heart/form');
  };

  const returnToGame = () => {
    const countNow = syncPlayers(tempPlayers).length;
    if (isGameInProgress && initialPlayersCount !== null && countNow !== initialPlayersCount) {
      const message = `W aktualniej grze formularz był przygotowany na ${initialPlayersCount} osoby, uzupełnij dotychczasowe pola z imionami lub rozpocznij nową grę`;

      showSnackbar({
        message,
        variant: 'info',
        autoHideDuration: 10000,
        closeButton: true,
      });

      return;
    }
    navigate('/heart/form');
  };

  const resetAll = () => {
    resetGame();
    setTempPlayers(['', '', '', '']);
  };

  const validPlayersCount = tempPlayers.filter((n) => n.trim().length > 0).length;

  return {
    tempPlayers,
    isGameInProgress,
    validPlayersCount,
    changeName,
    startGame,
    returnToGame,
    resetAll,
  };
}

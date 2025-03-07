import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { useKierkiStore } from '@store/kierkiStore';

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
  const { players, isGameInProgress, setPlayers, setGameInProgress, resetGame } = useKierkiStore();

  const [tempPlayers, setTempPlayers] = useState<string[]>(() =>
    players.length > 0 ? initTempPlayers(players) : ['', '', '', '']
  );

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
    setPlayers(syncPlayers(tempPlayers));
    setGameInProgress(true);
    navigate('/heart/form');
  };

  const returnToGame = () => {
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

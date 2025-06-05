import type { IHeartFormSections } from '@views/heart/heartForm.types';

export interface Player {
  name: string;
}

export interface IFinishedGame {
  id: string; // generowane np. przez Date.now() albo nanoid
  name: string;
  startTimestamp: number;
  endTimestamp?: number;
  playersSnapshot: Player[];
  fieldsSnapshot: IHeartFormSections;
}

export interface KierkiState {
  players: Player[];
  isGameInProgress: boolean;
  initialPlayersCount: number | null;
  fields: IHeartFormSections | null;
  currentGameName: string | null;
  currentGameStartTime: number | null;
  finishedGames: IFinishedGame[];
  setPlayers: (players: Player[]) => void;
  setGameInProgress: (inProgress: boolean) => void;
  setInitialPlayersCount: (count: number) => void;
  setFields: (newFields: IHeartFormSections) => void;
  resetGame: () => void;
  setGameNameAndStart: () => void;
  endGame: () => void;
  removeFinishedGame: (gameId: string) => void;
}

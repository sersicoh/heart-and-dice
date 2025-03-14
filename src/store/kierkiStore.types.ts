import type { IFormSections } from '@views/heart/form.types';

export interface Player {
  name: string;
}

export interface IFinishedGame {
  id: string; // generowane np. przez Date.now() albo nanoid
  name: string;
  startTimestamp: number;
  endTimestamp?: number;
  playersSnapshot: Player[];
  fieldsSnapshot: IFormSections;
}

export interface KierkiState {
  players: Player[];
  isGameInProgress: boolean;
  initialPlayersCount: number | null;
  fields: IFormSections | null;
  currentGameName: string | null;
  currentGameStartTime: number | null;
  finishedGames: IFinishedGame[];
  setPlayers: (players: Player[]) => void;
  setGameInProgress: (inProgress: boolean) => void;
  setInitialPlayersCount: (count: number) => void;
  setFields: (newFields: IFormSections) => void;
  resetGame: () => void;
  setGameNameAndStart: () => void;
  endGame: () => void;
}

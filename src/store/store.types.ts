import type { IDiceFormSections } from '@views/dice/diceForm.types';
import type { IHeartFormSections } from '@views/heart/heartForm.types';

export interface Player {
  name: string;
}

export interface IFinishedHeartGame {
  id: string;
  name: string;
  startTimestamp: number;
  endTimestamp?: number;
  playersSnapshot: Player[];
  fieldsSnapshot: IHeartFormSections;
}
export interface IFinishedDiceGame {
  id: string;
  name: string;
  startTimestamp: number;
  endTimestamp?: number;
  playersSnapshot: Player[];
  fieldsSnapshot: IDiceFormSections;
}

export interface KierkiState {
  players: Player[];
  isGameInProgress: boolean;
  initialPlayersCount: number | null;
  fields: IHeartFormSections | null;
  currentGameName: string | null;
  currentGameStartTime: number | null;
  finishedGames: IFinishedHeartGame[];
  setPlayers: (players: Player[]) => void;
  setGameInProgress: (inProgress: boolean) => void;
  setInitialPlayersCount: (count: number) => void;
  setFields: (newFields: IHeartFormSections) => void;
  resetGame: () => void;
  setGameNameAndStart: () => void;
  endGame: () => void;
  removeFinishedGame: (gameId: string) => void;
}

export interface DiceState {
  players: Player[];
  isGameInProgress: boolean;
  initialPlayersCount: number | null;
  fields: IDiceFormSections | null;
  currentGameName: string | null;
  currentGameStartTime: number | null;
  finishedGames: IFinishedDiceGame[];
  setPlayers: (players: Player[]) => void;
  setGameInProgress: (inProgress: boolean) => void;
  setInitialPlayersCount: (count: number) => void;
  setFields: (newFields: IDiceFormSections) => void;
  resetGame: () => void;
  setGameNameAndStart: () => void;
  endGame: () => void;
  removeFinishedGame: (gameId: string) => void;
}

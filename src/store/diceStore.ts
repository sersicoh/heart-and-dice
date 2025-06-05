// @store/diceStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { IDiceFormSections } from '@views/dice/diceForm.types';

import type { Player } from '@store/store.types';
import { getDiceFields } from '@utils/getDiceFields';

export interface DiceState {
  players: Player[];
  isGameInProgress: boolean;
  initialPlayersCount: number | null;
  fields: IDiceFormSections | null;
  currentGameName: string | null;
  currentGameStartTime: number | null;
  setPlayers: (players: Player[]) => void;
  setGameInProgress: (inProgress: boolean) => void;
  setInitialPlayersCount: (count: number) => void;
  setFields: (newFields: IDiceFormSections) => void;
  resetGame: () => void;
  setGameNameAndStart: () => void;
}

export const useDiceStore = create(
  persist<DiceState>(
    (set) => ({
      players: [],
      isGameInProgress: false,
      initialPlayersCount: null,
      fields: getDiceFields([]),
      currentGameName: null,
      currentGameStartTime: null,
      finishedGames: [],
      setPlayers: (newPlayers) =>
        set(() => ({
          players: newPlayers,
          fields: getDiceFields(newPlayers),
        })),

      setGameNameAndStart: () => {
        const now = Date.now();
        set({
          currentGameName: `Kości – ${new Date(now).toLocaleString()}`,
          currentGameStartTime: now,
        });
      },

      setGameInProgress: (inProgress) => set({ isGameInProgress: inProgress }),
      setInitialPlayersCount: (count) => set({ initialPlayersCount: count }),
      setFields: (newFields) => set({ fields: newFields }),

      resetGame: () =>
        set({
          players: [],
          isGameInProgress: false,
          initialPlayersCount: null,
          fields: getDiceFields([]),
          currentGameName: null,
          currentGameStartTime: null,
        }),
    }),
    { name: 'dice-game-storage' }
  )
);

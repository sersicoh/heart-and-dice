// @store/diceStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { IDiceFormSections } from '@views/dice/diceForm.types';

import type { DiceState, IFinishedDiceGame, Player } from '@store/store.types';
import { getDiceFields } from '@utils/getDiceFields';

export const useDiceStore = create(
  persist<DiceState>(
    (set, get) => ({
      players: [],
      isGameInProgress: false,
      initialPlayersCount: null,
      fields: getDiceFields([]),
      currentGameName: null,
      currentGameStartTime: null,
      finishedGames: [],

      setPlayers: (newPlayers: Player[]) => {
        set({
          players: newPlayers,
          fields: getDiceFields(newPlayers),
        });
      },

      setGameNameAndStart: () => {
        const now = Date.now();
        const newName = `Kości - ${new Date(now).toLocaleString()}`;
        set({
          currentGameName: newName,
          currentGameStartTime: now,
        });
      },

      endGame: () => {
        const state = get();
        if (!state.isGameInProgress) {
          return;
        }
        const now = Date.now();
        const newId = String(now);

        const finishedGame: IFinishedDiceGame = {
          id: newId,
          name: state.currentGameName ?? 'Kości (bez nazwy)',
          startTimestamp: state.currentGameStartTime ?? now,
          endTimestamp: now,
          playersSnapshot: state.players,
          fieldsSnapshot: state.fields!,
        };

        set({
          finishedGames: [...state.finishedGames, finishedGame],
        });
      },

      setGameInProgress: (inProgress) => set({ isGameInProgress: inProgress }),
      setInitialPlayersCount: (count) => set({ initialPlayersCount: count }),
      setFields: (newFields: IDiceFormSections<number>) => set({ fields: newFields }),
      resetGame: () =>
        set({
          players: [],
          isGameInProgress: false,
          initialPlayersCount: null,
          fields: getDiceFields([]),
          currentGameName: null,
          currentGameStartTime: null,
        }),
      removeFinishedGame: (gameId: string) =>
        set((state) => ({
          finishedGames: state.finishedGames.filter((g) => g.id !== gameId),
        })),
    }),
    {
      name: 'dice-game-storage',
    }
  )
);

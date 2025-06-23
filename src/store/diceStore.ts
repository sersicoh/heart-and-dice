// @store/diceStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { IDiceFormSections } from '@views/dice/diceForm.types';

import type { DiceState, IFinishedDiceGame, Player } from '@store/store.types';
import { calcRow } from '@utils/diceCalculator';
import { getDiceFields } from '@utils/getDiceFields';

export const useDiceStore = create(
  persist<DiceState>(
    (set, get) => ({
      players: [],
      isGameInProgress: false,
      initialPlayersCount: null,
      currentPlayerIdx: 0,
      fields: getDiceFields([]),
      currentGameName: null,
      currentGameStartTime: null,
      finishedGames: [],

      setPlayers: (players: Player[]) => {
        set({
          players,
          fields: getDiceFields(players),
          isGameInProgress: false,
        });
      },

      updatePlayerName: (index: number, newName: string) =>
        set((state) => {
          const players = state.players.map((p, i) => (i === index ? { ...p, name: newName } : p));

          const fields: IDiceFormSections<number> = {
            ...state.fields!,
            mountainSection: { ...state.fields!.mountainSection },
            pokerSection: { ...state.fields!.pokerSection },
            statsSection: state.fields!.statsSection
              ? { list: { ...state.fields!.statsSection.list } }
              : undefined,
          };

          fields.namesSection = {
            current: {
              title: state.fields!.namesSection.current.title,
              player: {
                ...state.fields!.namesSection.current.player,
                label: players[0]?.name ?? '',
              },
            },
          };

          return { players, fields };
        }),

      setGameNameAndStart: () => {
        const now = Date.now();
        const newName = `Kości - ${new Date(now).toLocaleString()}`;
        set({
          currentGameName: newName,
          currentGameStartTime: now,
          currentPlayerIdx: 0,
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
      setFields: (newFields: IDiceFormSections<number>) => {
        const mountain = Object.entries(newFields.mountainSection).map(([, row]) => calcRow(row));
        const poker = Object.entries(newFields.pokerSection).map(([, row]) => calcRow(row));

        Object.values(newFields.mountainSection).forEach((row, idx) => {
          row.computedPoints = mountain[idx];
        });
        Object.values(newFields.pokerSection).forEach((row, idx) => {
          row.computedPoints = poker[idx];
        });

        set({ fields: newFields });
      },
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
      setCurrentPlayerIdx: (idx) => set({ currentPlayerIdx: idx }),
    }),
    {
      name: 'dice-game-storage',
    }
  )
);

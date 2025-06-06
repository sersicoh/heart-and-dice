// @store/diceStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type {
  IDiceFieldsType,
  IDiceFormPokerSection,
  IDiceFormResultSection,
  IDiceMountainSection,
} from '@views/dice/diceForm.types';

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
        set((state) => {
          const playerCount = newPlayers.length;
          const oldFields = state.fields;
          if (!oldFields) {
            return {
              players: newPlayers,
              fields: getDiceFields(newPlayers),
            };
          }

          const updated = structuredClone(oldFields);

          const namesRow = updated.namesSection.names as any;
          // ‣ Ustawiamy albo nadpisujemy label w player1…playerN, a potem usuwamy klucze > N
          newPlayers.forEach((pl, idx) => {
            const key = `player${idx + 1}` as `player${number}`;
            // Jeśli dany klucz nie istniał (np. kiedy dodajemy piątego gracza), stworzymy go:
            if (!namesRow[key]) {
              namesRow[key] = { label: '', variant: 'name' as const, placeholder: '' };
            }
            // Nadpisujemy label i variant: pierwszy gracz → 'activePlayer', pozostali → 'name'
            namesRow[key].label = pl.name || `Gracz ${idx + 1}`;
            namesRow[key].variant = idx === 0 ? 'activePlayer' : 'name';
          });
          // Usuńmy nadmiarowe klucze, jeżeli poprzednio było np. 5 graczy, a teraz jest ich 3
          Object.keys(namesRow).forEach((k) => {
            if (k === 'gameTitle') return;
            // k ma formę "playerX"
            const match = /^player(\d+)$/.exec(k);
            if (match) {
              const idx = Number(match[1]) - 1;
              if (idx < 0 || idx >= playerCount) {
                delete namesRow[k as `player${number}`];
              }
            }
          });

          (Object.keys(updated.mountainSection) as Array<keyof IDiceMountainSection>).forEach(
            (rowKey) => {
              const rowData = updated.mountainSection[rowKey];

              Object.keys(rowData).forEach((k) => {
                const match = /^p(\d+)Input$/.exec(k);
                if (match) {
                  const idx = Number(match[1]) - 1;
                  if (idx < 0 || idx >= playerCount) {
                    delete (rowData as any)[k];
                  }
                }
              });

              for (let idx = 0; idx < playerCount; idx++) {
                const key = `p${idx + 1}Input` as `p${number}Input`;
                if (!(key in rowData)) {
                  (rowData as any)[key] = {
                    value: null,
                    variant: 'input' as IDiceFieldsType['variant'],
                    placeholder: '',
                  };
                }
              }
            }
          );

          (Object.keys(updated.pokerSection) as Array<keyof IDiceFormPokerSection>).forEach(
            (rowKey) => {
              const rowData = updated.pokerSection[rowKey];
              // Usuń nadmiarowe kolumny:
              Object.keys(rowData).forEach((k) => {
                const match = /^p(\d+)Input$/.exec(k);
                if (match) {
                  const idx = Number(match[1]) - 1;
                  if (idx < 0 || idx >= playerCount) {
                    delete (rowData as any)[k];
                  }
                }
              });
              for (let idx = 0; idx < playerCount; idx++) {
                const key = `p${idx + 1}Input` as `p${number}Input`;
                if (!(key in rowData)) {
                  (rowData as any)[key] = {
                    value: null,
                    variant: 'input' as IDiceFieldsType['variant'],
                    placeholder: '',
                  };
                }
              }
            }
          );

          (Object.keys(updated.resultSection) as Array<keyof IDiceFormResultSection>).forEach(
            (rowKey) => {
              const rowData = updated.resultSection[rowKey];
              Object.keys(rowData).forEach((k) => {
                const match = /^p(\d+)Input$/.exec(k);
                if (match) {
                  const idx = Number(match[1]) - 1;
                  if (idx < 0 || idx >= playerCount) {
                    delete (rowData as any)[k];
                  }
                }
              });
              for (let idx = 0; idx < playerCount; idx++) {
                const key = `p${idx + 1}Input` as `p${number}Input`;
                if (!(key in rowData)) {
                  (rowData as any)[key] = {
                    value: null,
                    variant: 'input' as IDiceFieldsType['variant'],
                    placeholder: '',
                  };
                }
              }
            }
          );

          return {
            players: newPlayers,
            fields: updated,
          };
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

// @store/kierkiStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type {
  IFormHeartSection,
  IFormRaceSection,
  IFormResultSection,
  IFormSections,
} from '@views/heart/form.types';

import { getHeartsFields } from '@utils/getHeartsFields';

export interface Player {
  name: string;
}

interface KierkiState {
  players: Player[];
  isGameInProgress: boolean;
  initialPlayersCount: number | null;
  fields: IFormSections | null;
  setPlayers: (players: Player[]) => void;
  setGameInProgress: (inProgress: boolean) => void;
  setInitialPlayersCount: (count: number) => void;
  setFields: (newFields: IFormSections) => void;
  resetGame: () => void;
}

export const useKierkiStore = create(
  persist<KierkiState>(
    (set) => ({
      players: [],
      isGameInProgress: false,
      initialPlayersCount: null,
      fields: getHeartsFields([]),
      setPlayers: (newPlayers) => {
        set((state) => {
          const oldFields = state.fields;
          if (!oldFields) {
            return {
              players: newPlayers,
              fields: getHeartsFields(newPlayers),
            };
          }
          const updated = structuredClone(oldFields);

          if (
            'namesSection' in updated &&
            'names' in updated.namesSection &&
            updated.namesSection.names.player1
          ) {
            const namesRow = updated.namesSection.names;
            namesRow.player1.label = newPlayers[0]?.name ?? '';
            namesRow.player2.label = newPlayers[1]?.name ?? '';
            namesRow.player3.label = newPlayers[2]?.name ?? '';
            if (newPlayers.length === 4 && newPlayers[3].name.trim()) {
              if (!namesRow.player4) {
                namesRow.player4 = { label: '', variant: 'name' };
              }
              namesRow.player4.label = newPlayers[3].name;
            } else {
              delete namesRow.player4;
            }
          }

          if ('heartSection' in updated) {
            (Object.keys(updated.heartSection) as Array<keyof IFormHeartSection>).forEach(
              (rowKey) => {
                const rowData = updated.heartSection[rowKey];
                if (!rowData.roundType) return;
                if (newPlayers.length === 4 && newPlayers[3].name.trim()) {
                  if (!rowData.p4Input) {
                    rowData.p4Input = {
                      value: null,
                      variant: rowData.p1Input ? rowData.p1Input.variant : 'input',
                    };
                  }
                } else {
                  delete rowData.p4Input;
                }
              }
            );
          }

          // AKTUALIZACJA RACE SECTION
          if ('raceSection' in updated) {
            (Object.keys(updated.raceSection) as Array<keyof IFormRaceSection>).forEach(
              (rowKey) => {
                const rowData = updated.raceSection[rowKey];
                if (!rowData.roundType) return;
                if (newPlayers.length === 4 && newPlayers[3].name.trim()) {
                  if (!rowData.p4Input) {
                    rowData.p4Input = {
                      value: null,
                      variant: rowData.p1Input ? rowData.p1Input.variant : 'input',
                    };
                  }
                } else {
                  delete rowData.p4Input;
                }
              }
            );
          }
          if ('resultSection' in updated) {
            (Object.keys(updated.resultSection) as Array<keyof IFormResultSection>).forEach(
              (rowKey) => {
                const rowData = updated.resultSection[rowKey];
                if (!rowData.roundType) return;
                if (newPlayers.length === 4 && newPlayers[3].name.trim()) {
                  if (!rowData.p4Input) {
                    rowData.p4Input = {
                      value: null,
                      variant: rowData.p1Input ? rowData.p1Input.variant : 'input',
                    };
                  }
                } else {
                  delete rowData.p4Input;
                }
              }
            );
          }

          return {
            players: newPlayers,
            fields: updated,
          };
        });
      },
      setGameInProgress: (inProgress) => {
        set({ isGameInProgress: inProgress });
      },
      setInitialPlayersCount: (count: number) => {
        set({ initialPlayersCount: count });
      },
      setFields: (newFields) => {
        set({ fields: newFields });
      },
      resetGame: () => {
        set({
          players: [],
          isGameInProgress: false,
          initialPlayersCount: null,
          fields: getHeartsFields([]),
        });
      },
    }),
    {
      name: 'kierki-game-storage',
    }
  )
);

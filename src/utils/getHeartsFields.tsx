import type { IHeartFormSections } from '@views/heart/heartForm.types';

import type { Player } from '@store/store.types';

export const getHeartsFields = (players: Player[]): IHeartFormSections => {
  const fourthNotEmpty = players[3] && players[3].name.trim().length > 0;
  const withPlayer4 = players.length === 4 && fourthNotEmpty;

  return {
    namesSection: {
      names: {
        gameTitle: { label: 'Heart', variant: 'title', placeholder: 'undefined' },
        player1: { label: players[0]?.name ?? '', variant: 'name' },
        player2: { label: players[1]?.name ?? '', variant: 'name' },
        player3: { label: players[2]?.name ?? '', variant: 'name' },
        ...(withPlayer4 && {
          player4: { label: players[3]?.name, variant: 'name' },
        }),
      },
    },
    heartSection: {
      noLions: {
        roundType: {
          id: 'noLions',
          label: 'Bez lew',
          variant: 'activeRoundType',
          rowId: 'noLions',
          placeholder: undefined,
        },
        p1Input: { value: null, variant: 'activeInput' },
        p2Input: { value: null, variant: 'activeInput' },
        p3Input: { value: null, variant: 'activeInput' },
        ...(withPlayer4 && {
          p4Input: { value: null, variant: 'activeInput' },
        }),
      },
      noMadam: {
        roundType: {
          label: 'Bez Pań',
          variant: 'roundType',
          rowId: 'noMadam',
          id: 'noMadam',
          placeholder: undefined,
        },
        p1Input: { value: null },
        p2Input: { value: null },
        p3Input: { value: null },
        ...(withPlayer4 && {
          p4Input: { value: null },
        }),
      },
      noGentlemen: {
        roundType: {
          label: 'Bez Panów',
          variant: 'roundType',
          rowId: 'noGentlemen',
          id: 'noGentlemen',
          placeholder: undefined,
        },
        p1Input: { value: null },
        p2Input: { value: null },
        p3Input: { value: null },
        ...(withPlayer4 && {
          p4Input: { value: null },
        }),
      },
      sevenAndLast: {
        roundType: {
          label: '7 / 13',
          variant: 'roundType',
          rowId: 'sevenAndLast',
          id: 'sevenAndLast',
          placeholder: undefined,
        },
        p1Input: { value: null },
        p2Input: { value: null },
        p3Input: { value: null },
        ...(withPlayer4 && {
          p4Input: { value: null },
        }),
      },
      hearts: {
        roundType: {
          label: 'Kierki',
          variant: 'roundType',
          rowId: 'hearts',
          id: 'hearts',
          placeholder: undefined,
        },
        p1Input: { value: null },
        p2Input: { value: null },
        p3Input: { value: null },
        ...(withPlayer4 && {
          p4Input: { value: null },
        }),
      },
      heartKing: {
        roundType: {
          label: 'Król Kier',
          variant: 'roundType',
          rowId: 'heartKing',
          id: 'heartKing',
          placeholder: undefined,
        },
        p1Input: { value: null },
        p2Input: { value: null },
        p3Input: { value: null },
        ...(withPlayer4 && {
          p4Input: { value: null },
        }),
      },
      robber: {
        roundType: {
          label: 'Rozbójnik',
          variant: 'roundType',
          rowId: 'robber',
          id: 'robber',
          placeholder: undefined,
        },
        p1Input: { value: null },
        p2Input: { value: null },
        p3Input: { value: null },
        ...(withPlayer4 && {
          p4Input: { value: null },
        }),
      },
      result: {
        roundType: {
          label: 'Wynik',
          variant: 'resultTitle',
          rowId: 'heartResult',
          placeholder: undefined,
        },
        p1Input: { value: null },
        p2Input: { value: null },
        p3Input: { value: null },
        ...(withPlayer4 && {
          p4Input: { value: null },
        }),
      },
    },
    raceSection: {
      first: {
        roundType: {
          label: 'I',
          variant: 'roundType',
          rowId: 'raceRound',
          id: 'raceRound',
          placeholder: undefined,
        },
        p1Input: { value: null },
        p2Input: { value: null },
        p3Input: { value: null },
        ...(withPlayer4 && {
          p4Input: { value: null },
        }),
      },
      second: {
        roundType: {
          label: 'II',
          variant: 'roundType',
          rowId: 'raceRound',
          id: 'raceRound',
          placeholder: undefined,
        },
        p1Input: { value: null },
        p2Input: { value: null },
        p3Input: { value: null },
        ...(withPlayer4 && {
          p4Input: { value: null },
        }),
      },
      third: {
        roundType: {
          label: 'III',
          variant: 'roundType',
          rowId: 'raceRound',
          id: 'raceRound',
          placeholder: undefined,
        },
        p1Input: { value: null },
        p2Input: { value: null },
        p3Input: { value: null },
        ...(withPlayer4 && {
          p4Input: { value: null },
        }),
      },
      fourth: {
        roundType: {
          label: 'IV',
          variant: 'roundType',
          rowId: 'raceRound',
          id: 'raceRound',
          placeholder: undefined,
        },
        p1Input: { value: null },
        p2Input: { value: null },
        p3Input: { value: null },
        ...(withPlayer4 && {
          p4Input: { value: null },
        }),
      },
      result: {
        roundType: {
          label: 'Wynik',
          variant: 'resultTitle',
          rowId: 'raceResult',
          placeholder: undefined,
        },
        p1Input: { value: null },
        p2Input: { value: null },
        p3Input: { value: null },
        ...(withPlayer4 && {
          p4Input: { value: null },
        }),
      },
    },
    resultSection: {
      result: {
        roundType: {
          label: 'Ogólnie',
          variant: 'resultTitle',
          rowId: 'finalResult',
          placeholder: undefined,
        },
        p1Input: { value: null },
        p2Input: { value: null },
        p3Input: { value: null },
        ...(withPlayer4 && {
          p4Input: { value: null },
        }),
      },
    },
  };
};

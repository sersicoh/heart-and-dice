import type { IFormSections } from '@views/heart/form.types';

import type { Player } from '@store/kierkiStore';

export const getHeartsFields = (players: Player[]): IFormSections => {
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
        roundType: { label: 'Bez lew', variant: 'activeRoundType', placeholder: undefined },
        player1Input: { value: null, variant: 'activeInput' },
        player2Input: { value: null, variant: 'activeInput' },
        player3Input: { value: null, variant: 'activeInput' },
        ...(withPlayer4 && {
          player4Input: { value: null, variant: 'activeInput' },
        }),
      },
      noMadam: {
        roundType: { label: 'Bez Pań', variant: 'roundType', placeholder: undefined },
        player1Input: { value: null },
        player2Input: { value: null },
        player3Input: { value: null },
        ...(withPlayer4 && {
          player4Input: { value: null },
        }),
      },
      noGentlemen: {
        roundType: { label: 'Bez Panów', variant: 'roundType', placeholder: undefined },
        player1Input: { value: null },
        player2Input: { value: null },
        player3Input: { value: null },
        ...(withPlayer4 && {
          player4Input: { value: null },
        }),
      },
      sevenAndLast: {
        roundType: { label: '7 / 13', variant: 'roundType', placeholder: undefined },
        player1Input: { value: null },
        player2Input: { value: null },
        player3Input: { value: null },
        ...(withPlayer4 && {
          player4Input: { value: null },
        }),
      },
      hearts: {
        roundType: { label: 'Kierki', variant: 'roundType', placeholder: undefined },
        player1Input: { value: null },
        player2Input: { value: null },
        player3Input: { value: null },
        ...(withPlayer4 && {
          player4Input: { value: null },
        }),
      },
      heartKing: {
        roundType: { label: 'Król Kier', variant: 'roundType', placeholder: undefined },
        player1Input: { value: null },
        player2Input: { value: null },
        player3Input: { value: null },
        ...(withPlayer4 && {
          player4Input: { value: null },
        }),
      },
      robber: {
        roundType: { label: 'Rozbójnik', variant: 'roundType', placeholder: undefined },
        player1Input: { value: null },
        player2Input: { value: null },
        player3Input: { value: null },
        ...(withPlayer4 && {
          player4Input: { value: null },
        }),
      },
      result: {
        roundType: { label: 'Wynik', variant: 'resultTitle', placeholder: undefined },
        player1Input: { value: null },
        player2Input: { value: null, variant: 'winner' },
        player3Input: { value: null },
        ...(withPlayer4 && {
          player4Input: { value: null },
        }),
      },
    },
    raceSection: {
      first: {
        roundType: { label: 'I', variant: 'roundType', placeholder: undefined },
        player1Input: { value: null },
        player2Input: { value: null },
        player3Input: { value: null },
        ...(withPlayer4 && {
          player4Input: { value: null },
        }),
      },
      second: {
        roundType: { label: 'II', variant: 'roundType', placeholder: undefined },
        player1Input: { value: null },
        player2Input: { value: null },
        player3Input: { value: null },
        ...(withPlayer4 && {
          player4Input: { value: null },
        }),
      },
      third: {
        roundType: { label: 'III', variant: 'roundType', placeholder: undefined },
        player1Input: { value: null },
        player2Input: { value: null },
        player3Input: { value: null },
        ...(withPlayer4 && {
          player4Input: { value: null },
        }),
      },
      fourth: {
        roundType: { label: 'IV', variant: 'roundType', placeholder: undefined },
        player1Input: { value: null },
        player2Input: { value: null },
        player3Input: { value: null },
        ...(withPlayer4 && {
          player4Input: { value: null },
        }),
      },
      result: {
        roundType: { label: 'Wynik', variant: 'resultTitle', placeholder: undefined },
        player1Input: { value: null, variant: 'winner' },
        player2Input: { value: null },
        player3Input: { value: null },
        ...(withPlayer4 && {
          player4Input: { value: null },
        }),
      },
    },
    resultSection: {
      result: {
        roundType: { label: 'Razem', variant: 'resultTitle', placeholder: undefined },
        player1Input: { value: null, variant: 'winner' },
        player2Input: { value: null },
        player3Input: { value: null },
        ...(withPlayer4 && {
          player4Input: { value: null },
        }),
      },
    },
  };
};

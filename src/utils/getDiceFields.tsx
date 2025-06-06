import type {
  IDiceFieldsType,
  IDiceFormRow,
  IDiceFormSections,
  IDiceNamesFormRow,
} from '@views/dice/diceForm.types';

import type { Player } from '@store/store.types';

export function getDiceFields(players: Player[]): IDiceFormSections {
  const playerCount = players.length;
  const inputKeys = Array.from({ length: playerCount }, (_, i) => `p${i + 1}Input` as const);
  const nameKeys = Array.from({ length: playerCount }, (_, i) => `player${i + 1}` as const);

  const namesSection: { names: IDiceNamesFormRow } = {
    names: {
      gameTitle: {
        label: 'Kości',
        variant: 'title',
        placeholder: 'undefined',
      },
      ...Object.fromEntries(
        nameKeys.map((key, idx) => [
          key,
          {
            label: players[idx]?.name || `Gracz ${idx + 1}`,
            variant: idx === 0 ? 'activePlayer' : 'name',
            placeholder: '',
          },
        ])
      ),
    },
  };

  const createRow = ({ id, label, variant, placeholder, rowId }: IDiceFormRow['fieldType']) => {
    return {
      fieldType: {
        id,
        label,
        variant,
        placeholder: placeholder ?? undefined,
        rowId,
      },
      ...Object.fromEntries(
        inputKeys.map((key) => [
          key,
          {
            value: null,
            placeholder: '',
            variant: 'input' as IDiceFieldsType['variant'],
          },
        ])
      ),
    };
  };

  const mountainSection: IDiceFormSections['mountainSection'] = {
    ones: createRow({
      id: 'ones',
      label: 'I',
      variant: 'activeFieldsType',
      rowId: 'ones',
    }),
    twos: createRow({
      id: 'ones',
      label: 'II',
      variant: 'activeFieldsType',
      rowId: 'twos',
    }),
    threes: createRow({
      id: 'threes',
      label: 'III',
      variant: 'activeFieldsType',
      rowId: 'threes',
    }),
    fours: createRow({
      id: 'fours',
      label: 'IV',
      variant: 'activeFieldsType',
      rowId: 'fours',
    }),
    fives: createRow({
      id: 'fives',
      label: 'V',
      variant: 'activeFieldsType',
      rowId: 'fives',
    }),
    sixes: createRow({
      id: 'sixes',
      label: 'VI',
      variant: 'activeFieldsType',
      rowId: 'sixes',
    }),
    result: createRow({
      id: 'result',
      label: 'Wynik',
      variant: 'resultTitle',
      rowId: 'mountainResult',
    }),
  };

  const pokerSection: IDiceFormSections['pokerSection'] = {
    pair: createRow({
      id: 'pair',
      label: 'I',
      variant: 'activeFieldsType',
      rowId: 'pair',
    }),
    twoPairs: createRow({
      id: 'twoPairs',
      label: 'I',
      variant: 'activeFieldsType',
      rowId: 'pair',
    }),
    smallStraight: createRow({
      id: 'smallStraight',
      label: 'I',
      variant: 'activeFieldsType',
      rowId: 'pair',
    }),
    largeStraight: createRow({
      id: 'largeStraight',
      label: 'I',
      variant: 'activeFieldsType',
      rowId: 'pair',
    }),
    threeOf: createRow({
      id: 'threeOf',
      label: 'I',
      variant: 'activeFieldsType',
      rowId: 'pair',
    }),
    fourOf: createRow({
      id: 'fourOf',
      label: 'I',
      variant: 'activeFieldsType',
      rowId: 'pair',
    }),
    fullHouse: createRow({
      id: 'fullHouse',
      label: 'I',
      variant: 'activeFieldsType',
      rowId: 'pair',
    }),
    full: createRow({
      id: 'full',
      label: 'I',
      variant: 'activeFieldsType',
      rowId: 'pair',
    }),
    even: createRow({
      id: 'even',
      label: 'I',
      variant: 'activeFieldsType',
      rowId: 'pair',
    }),
    odd: createRow({
      id: 'odd',
      label: 'I',
      variant: 'activeFieldsType',
      rowId: 'pair',
    }),
    chance: createRow({
      id: 'chance',
      label: 'I',
      variant: 'activeFieldsType',
      rowId: 'pair',
    }),
  };

  const resultSection: IDiceFormSections['resultSection'] = {
    result: createRow({
      id: 'result',
      label: 'Wynik końcowy',
      variant: 'resultTitle',
      rowId: 'finalResult',
    }),
  };

  return {
    namesSection,
    mountainSection,
    pokerSection,
    resultSection,
  } as IDiceFormSections;
}

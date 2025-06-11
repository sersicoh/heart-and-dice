import type {
  DiceFieldVariant,
  IDiceFormSections,
  InputKey,
  PlayerKey,
  RowId,
} from '@views/dice/diceForm.types';

import type { Player } from '@store/store.types';

const inputCell = (): { value: null; variant: DiceFieldVariant } => ({
  value: null,
  variant: 'input',
});

type Row<N extends number> = IDiceFormSections<N>['mountainSection']['ones'];

function makeRow<N extends number>(label: string, rowId: RowId, playerCount: N): Row<N> {
  const inputs = Object.fromEntries(
    Array.from({ length: playerCount }, (_, i) => [`p${i + 1}Input`, inputCell()])
  ) as Record<InputKey<N>, ReturnType<typeof inputCell>>;

  return {
    fieldType: { label, variant: 'activeFieldsType', rowId },
    ...inputs,
  };
}

export function getDiceFields<N extends number>(players: Player[]): IDiceFormSections<N> {
  const playerCount = players.length as N;

  /* --- nagłówki --- */
  const namesRow = {
    gameTitle: { label: 'Kości', variant: 'title' } as const,
    ...Object.fromEntries(
      players.map((p, idx) => [
        `player${idx + 1}`,
        { label: p.name, variant: idx === 0 ? 'activePlayer' : 'name' },
      ])
    ),
  } as Record<PlayerKey<N> | 'gameTitle', { label: string; variant: DiceFieldVariant }>;

  /* --- sekcje --- */
  const mountainSection = {
    ones: makeRow('I', 'ones', playerCount),
    twos: makeRow('II', 'twos', playerCount),
    threes: makeRow('III', 'threes', playerCount),
    fours: makeRow('IV', 'fours', playerCount),
    fives: makeRow('V', 'fives', playerCount),
    sixes: makeRow('VI', 'sixes', playerCount),
    result: makeRow('Wynik', 'mountainResult', playerCount),
  } as IDiceFormSections<N>['mountainSection'];

  const pokerSection = {
    pair: makeRow('Para', 'pair', playerCount),
    twoPairs: makeRow('Dwie pary', 'twoPairs', playerCount),
    smallStraight: makeRow('Mały strit', 'smallStraight', playerCount),
    largeStraight: makeRow('Duży strit', 'largeStraight', playerCount),
    threeOf: makeRow('Trójka', 'threeOf', playerCount),
    fourOf: makeRow('Czwórka', 'fourOf', playerCount),
    fullHouse: makeRow('Full House', 'fullHouse', playerCount),
    full: makeRow('Full', 'full', playerCount),
    even: makeRow('Parzyste', 'even', playerCount),
    odd: makeRow('Nieparzyste', 'odd', playerCount),
    chance: makeRow('Szansa', 'chance', playerCount),
  } as IDiceFormSections<N>['pokerSection'];

  const resultSection = {
    result: makeRow('Wynik końcowy', 'finalResult', playerCount),
  } as IDiceFormSections<N>['resultSection'];

  return {
    namesSection: { names: namesRow },
    mountainSection,
    pokerSection,
    resultSection,
  } as IDiceFormSections<N>;
}

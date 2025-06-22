// @utils/getDiceFields.ts
import type {
  DiceFieldVariant,
  IDiceFormRow,
  IDiceFormSections,
  IDiceInputCell,
  InputKey,
  PlayerKey,
  RowId,
} from '@views/dice/diceForm.types';

import type { Player } from '@store/store.types';

/* ---------- pomocnik: pojedyncza komórka ---------- */
const makeInput = (variant: DiceFieldVariant = 'input'): IDiceInputCell => ({
  value: null,
  variant,
});

/* ---------- pomocnik: jeden wiersz ---------- */
function makeRow<N extends number>(
  label: string,
  rowId: RowId,
  pc: N,
  summary = false
): IDiceFormRow<N> {
  const inputs = {} as Record<InputKey<N>, IDiceInputCell>;

  for (let i = 0; i < pc; i++) {
    inputs[`p${i + 1}Input` as InputKey<N>] = {
      ...makeInput(i === 0 && !summary ? 'activeInput' : 'input'),
      isEditable: i === 0 && !summary,
    };
  }

  return {
    fieldType: {
      label,
      rowId,
      variant: summary ? 'resultTitle' : 'activeFieldsType',
    },
    inputs,
  };
}

/* =========================================================
 *  API
 * ======================================================= */
export function getDiceFields<N extends number>(players: Player[]): IDiceFormSections<N> {
  const pc = players.length as N;

  /* ---------- 1. nagłówek z bieżącym graczem ---------- */
  /** Używamy `satisfies` + `as const`, żeby literały się NIE rozszerzyły. */
  const namesSection = {
    current: {
      title: { label: 'Aktualny gracz', variant: 'title' },
      player: { label: players[0]?.name ?? '', variant: 'activeFieldsType' },
    },
  } as const satisfies IDiceFormSections<N>['namesSection'];

  /* ---------- 2. lista imion do statystyk ---------- */
  const statsList = {} as Record<PlayerKey<N>, { label: string; variant: DiceFieldVariant }>;
  players.forEach((p, i) => {
    statsList[`player${i + 1}` as PlayerKey<N>] = {
      label: p.name,
      variant: i === 0 ? 'activePlayer' : 'name',
    };
  });

  /* ---------- 3. sekcja „górka” ---------- */
  const mountainSection = {
    ones: makeRow('I', 'ones', pc),
    twos: makeRow('II', 'twos', pc),
    threes: makeRow('III', 'threes', pc),
    fours: makeRow('IV', 'fours', pc),
    fives: makeRow('V', 'fives', pc),
    sixes: makeRow('VI', 'sixes', pc),
    result: makeRow('Wynik', 'mountainResult', pc, true),
  };

  /* ---------- 4. sekcja „poker” + wynik ogólny ---------- */
  const pokerSection = {
    pair: makeRow('Para', 'pair', pc),
    twoPairs: makeRow('Dwie pary', 'twoPairs', pc),
    smallStraight: makeRow('Mały strit', 'smallStraight', pc),
    largeStraight: makeRow('Duży strit', 'largeStraight', pc),
    threeOf: makeRow('Trójka', 'threeOf', pc),
    fourOf: makeRow('Czwórka', 'fourOf', pc),
    fullHouse: makeRow('Full House', 'fullHouse', pc),
    full: makeRow('Full', 'full', pc),
    even: makeRow('Parzyste', 'even', pc),
    odd: makeRow('Nieparzyste', 'odd', pc),
    chance: makeRow('Szansa', 'chance', pc),
    chance2: makeRow('Szansa 2', 'chance2', pc),
    result: makeRow('Wynik ogólny', 'finalResult', pc, true),
  };

  /* ---------- 5. łączymy i zwracamy ---------- */
  return {
    namesSection,
    mountainSection,
    pokerSection,
    statsSection: { list: statsList },
  };
}

import type {
  DiceFieldVariant,
  IDiceFormSections,
  InputKey,
  PlayerKey,
  RowId,
} from '@views/dice/diceForm.types';

import type { Player } from '@store/store.types';

/* =========================================================
 *  Helpers
 * ======================================================= */
// ✏️ parametryzowany wariant – domyślnie 'input'
const inputCell = (variant: DiceFieldVariant = 'input') => ({
  value: null,
  variant,
});

// Jedna linia-klucz w tabeli
type Row<N extends number, V extends DiceFieldVariant = 'activeFieldsType'> = {
  fieldType: { label: string; variant: V; rowId: RowId };
} & Record<InputKey<N>, ReturnType<typeof inputCell>>;

// generator wiersza
function makeRow<N extends number, V extends DiceFieldVariant = 'activeFieldsType'>(
  label: string,
  rowId: RowId,
  playerCount: N,
  variant: V = 'activeFieldsType' as V
) {
  const inputs = Object.fromEntries(
    Array.from({ length: playerCount }, (_, i) => [
      `p${i + 1}Input`,
      inputCell(i === 0 && variant !== 'resultTitle' ? 'activeInput' : 'input'),
    ])
  ) as Record<InputKey<N>, ReturnType<typeof inputCell>>;

  return {
    fieldType: { label, variant, rowId },
    ...inputs,
  } satisfies Row<N, V>;
}

/* =========================================================
 *  API – eksportowane pole
 * ======================================================= */
export function getDiceFields<N extends number>(players: Player[]): IDiceFormSections<N> {
  const playerCount = players.length as N;

  /* ---------- nagłówki ---------- */
  const namesRow = {
    gameTitle: { label: 'Kości', variant: 'title' } as const,
    ...Object.fromEntries(
      players.map((p, idx) => [
        `player${idx + 1}`,
        // 👇 pierwszy gracz = 'activePlayer'
        { label: p.name, variant: idx === 0 ? 'activePlayer' : 'name' },
      ])
    ),
  } as Record<PlayerKey<N> | 'gameTitle', { label: string; variant: DiceFieldVariant }>;

  /* ---------- sekcje ---------- */
  const mountainSection = {
    ones: makeRow('I', 'ones', playerCount),
    twos: makeRow('II', 'twos', playerCount),
    threes: makeRow('III', 'threes', playerCount),
    fours: makeRow('IV', 'fours', playerCount),
    fives: makeRow('V', 'fives', playerCount),
    sixes: makeRow('VI', 'sixes', playerCount),
    result: makeRow('Wynik', 'mountainResult', playerCount, 'resultTitle'),
  } satisfies IDiceFormSections<N>['mountainSection'];

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
  } satisfies IDiceFormSections<N>['pokerSection'];

  const resultSection = {
    result: makeRow('Wynik końcowy', 'finalResult', playerCount, 'resultTitle'),
  } satisfies IDiceFormSections<N>['resultSection'];

  return {
    namesSection: { names: namesRow },
    mountainSection,
    pokerSection,
    resultSection,
  } as IDiceFormSections<N>;
}

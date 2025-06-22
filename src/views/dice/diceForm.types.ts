/* =========================================================
 *  Typy formularza „Kości i Kości”
 * ======================================================= */

/* ---------- aliasy indeksów / kluczy ---------- */
export type PlayerKey<N extends number = number> = `player${N}`;
export type InputKey<N extends number = number> = `p${N}Input`;

/* ---------- warianty komórek ---------- */
export type DiceFieldVariant =
  | 'title'
  | 'name'
  | 'activePlayer'
  | 'fieldType'
  | 'activeFieldsType'
  | 'input'
  | 'activeInput'
  | 'inputFilled'
  | 'lastInput'
  | 'winner'
  | 'manyWinner'
  | 'looser'
  | 'manyLooser'
  | 'resultTitle'
  | 'gameFinished';

interface IDiceCellBase {
  variant: DiceFieldVariant;
}

export interface IDiceNameCell extends IDiceCellBase {
  label: string;
}

export interface IDiceInputCell {
  value: number | null;
  variant: DiceFieldVariant;
  isEditable?: boolean;
  onChangeValue?: (v: number | null) => void;
}

export type RowId =
  | 'ones'
  | 'twos'
  | 'threes'
  | 'fours'
  | 'fives'
  | 'sixes'
  | 'mountainResult'
  | 'pair'
  | 'twoPairs'
  | 'smallStraight'
  | 'largeStraight'
  | 'threeOf'
  | 'fourOf'
  | 'fullHouse'
  | 'full'
  | 'even'
  | 'odd'
  | 'chance'
  | 'chance2'
  | 'finalResult';

/* ---------- pełny wiersz formularza ---------- */
export interface IDiceFormRow<N extends number = number> {
  fieldType: {
    label: string;
    rowId: RowId;
    variant: DiceFieldVariant;
  };
  inputs: Record<InputKey<N>, IDiceInputCell>;

  computedPoints?: Partial<Record<PlayerKey<N>, number>>;
}

/* =========================================================
 *  Struktura całego formularza
 * ======================================================= */
export interface IDiceCurrentPlayerRow {
  title: { label: string; variant: 'title' };
  player: { label: string; variant: 'activeFieldsType' };
}

export type IDiceStatsListRow<N extends number> = Record<
  PlayerKey<N>,
  { label: string; variant: DiceFieldVariant }
>;

export interface IDiceFormSections<N extends number = number> {
  namesSection: { current: IDiceCurrentPlayerRow };

  mountainSection: Record<
    'ones' | 'twos' | 'threes' | 'fours' | 'fives' | 'sixes' | 'result',
    IDiceFormRow<N>
  >;

  pokerSection: Record<
    | 'pair'
    | 'twoPairs'
    | 'smallStraight'
    | 'largeStraight'
    | 'threeOf'
    | 'fourOf'
    | 'fullHouse'
    | 'full'
    | 'even'
    | 'odd'
    | 'chance'
    | 'chance2'
    | 'result',
    IDiceFormRow<N>
  >;

  statsSection?: { list: IDiceStatsListRow<N> };
}

export type TDicePlayerScores<N extends number = number> = Partial<Record<PlayerKey<N>, number>>;

export type TDiceCalcResult<N extends number = number> = TDicePlayerScores<N> & {
  valid: boolean;
  errorMessage?: string;
};

export type TDiceCalcFunction<N extends number = number> = (
  playerValues: Array<number | null>
) => TDiceCalcResult<N>;

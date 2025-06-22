/* =========================================================
 *  Typy formularza „Kości i Kości”
 * ======================================================= */

/* ---------- aliasy indeksów / kluczy ---------- */
export type PlayerKey<N extends number = number> = `player${N}`; // nagłówek / statystyki
export type InputKey<N extends number = number> = `p${N}Input`; // komórki wiersza

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
    variant: DiceFieldVariant; // 'fieldType' | 'activeFieldsType' | 'resultTitle'
  };
  inputs: Record<InputKey<N>, IDiceInputCell>;

  /** wypełniane po obliczeniu */
  computedPoints?: Partial<Record<PlayerKey<N>, number>>;
}

/* =========================================================
 *  Struktura całego formularza
 * ======================================================= */

/* --- bieżący gracz (wyświetlany w DiceFormInput) --- */
export interface IDiceCurrentPlayerRow {
  title: { label: string; variant: 'title' };
  player: { label: string; variant: 'activeFieldsType' };
}

/* --- lista imion do DiceFormStats --- */
export type IDiceStatsListRow<N extends number> = Record<
  PlayerKey<N>,
  { label: string; variant: DiceFieldVariant } // 'name' | 'activePlayer' | 'winner' | …
>;

/* --- główny typ sekcji --- */
export interface IDiceFormSections<N extends number = number> {
  /* 1. nagłówek z aktualnym graczem */
  namesSection: { current: IDiceCurrentPlayerRow };

  /* 2. sekcja „górka” */
  mountainSection: Record<
    'ones' | 'twos' | 'threes' | 'fours' | 'fives' | 'sixes' | 'result',
    IDiceFormRow<N>
  >;

  /* 3. sekcja „poker” + wynik ogólny */
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

  /* 4. statystyki / lista imion (używane w DiceFormStats) */
  statsSection?: { list: IDiceStatsListRow<N> };
}

export type MountainKey = keyof IDiceFormSections<number>['mountainSection'];
export type PokerKey = keyof IDiceFormSections<number>['pokerSection'];
export type AnyRowKey = MountainKey | PokerKey;
export type SectionName = 'mountainSection' | 'pokerSection';

export type RowKey<S extends SectionName> = S extends 'mountainSection' ? MountainKey : PokerKey;

/* =========================================================
 *  Typy pomocnicze do kalkulacji
 * ======================================================= */

export type TDicePlayerScores<N extends number = number> = Partial<Record<PlayerKey<N>, number>>;

export type TDiceCalcResult<N extends number = number> = TDicePlayerScores<N> & {
  valid: boolean;
  errorMessage?: string;
};

export type TDiceCalcFunction<N extends number = number> = (
  playerValues: Array<number | null>
) => TDiceCalcResult<N>;

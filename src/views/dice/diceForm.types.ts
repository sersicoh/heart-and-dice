import type { CalcRegistryDice } from '@utils/calcFunctionsDice';

export type PlayerKey<N extends number = number> = `player${N}`;
export type InputKey<N extends number = number> = `p${N}Input`;

export type DiceFieldVariant =
  | 'title'
  | 'name'
  | 'activePlayer'
  | 'fieldType'
  | 'activeFieldsType'
  | 'input'
  | 'inputFilled'
  | 'activeInput'
  | 'lastInput'
  | 'winner'
  | 'manyWinner'
  | 'looser'
  | 'manyLooser'
  | 'resultTitle'
  | 'gameFinished';

export interface IDiceFieldBase {
  placeholder?: string;
  variant?: DiceFieldVariant;
}

export type TDicePlayerScores<N extends number = number> = Partial<Record<PlayerKey<N>, number>>;

export type TDiceCalcResult<N extends number = number> = TDicePlayerScores<N> & {
  valid: boolean;
  errorMessage?: string;
};

export type TDiceCalcFunction<N extends number = number> = (
  playerValues: Array<number | null>
) => TDiceCalcResult<N>;

export type IDiceNamesFormRow<N extends number = number> = {
  gameTitle: { label: string } & IDiceFieldBase;
} & { [P in PlayerKey<N>]: { label: string } & IDiceFieldBase };

export type RowId = keyof CalcRegistryDice;

export type IDiceFormRow<N extends number = number> = {
  fieldType: { id?: string; label: string; rowId?: RowId } & IDiceFieldBase;
} & { [P in InputKey<N>]: { value: number | null } & IDiceFieldBase } & {
  computedPoints?: Partial<Record<PlayerKey<N>, number>>;
};

export interface IDiceFormSections<N extends number = number> {
  namesSection: { names: IDiceNamesFormRow<N> };

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
    | 'chance',
    IDiceFormRow<N>
  >;

  resultSection: { result: IDiceFormRow<N> };
}

export type IDiceFormInputChange<N extends number = number> = (
  sectionName: keyof IDiceFormSections<N>,
  rowKey: string,
  playerInputKey: InputKey<N>,
  newValue: number | null
) => void;

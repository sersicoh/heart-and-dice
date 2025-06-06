import type { calcRegistryDice } from '@utils/calcFunctionsDice';

export interface IDiceFieldsType {
  tileDescription: string;
  inputField: number | null;
  placeholder: string;
  variant:
    | 'title'
    | 'name'
    | 'activePlayer'
    | 'fieldType'
    | 'activeFieldsType'
    | 'input'
    | 'inputFilled'
    | 'inputToFilled'
    | 'lastInput'
    | 'winner'
    | 'manyWinner'
    | 'looser'
    | 'manyLooser'
    | 'resultTitle'
    | 'gameFinished';
}
export interface IDiceNamesFormRow {
  gameTitle: {
    label: IDiceFieldsType['tileDescription'];
    variant?: IDiceFieldsType['variant'];
    placeholder?: IDiceFieldsType['placeholder'];
  };

  [playerKey: `player${number}`]: {
    label: IDiceFieldsType['tileDescription'];
    variant?: IDiceFieldsType['variant'];
    placeholder?: IDiceFieldsType['placeholder'];
  };
}

export type TDicePlayerScores = {
  [P in `p${number}`]?: number;
};
export type TDiceCalcResult = TDicePlayerScores & {
  valid: boolean;
  errorMessage?: string;
};

export type TDiceCalcFunction = (playerValues: Array<number | null>) => TDiceCalcResult;

export interface IDiceFormRow {
  fieldType: {
    id?: string;
    label: IDiceFieldsType['tileDescription'];
    variant?: IDiceFieldsType['variant'];
    placeholder?: IDiceFieldsType['placeholder'];
    rowId?: keyof typeof calcRegistryDice;
  };

  [inputKey: `p${number}Input`]: {
    variant?: IDiceFieldsType['variant'];
    placeholder?: IDiceFieldsType['placeholder'];
    value: IDiceFieldsType['inputField'];
  };

  computedPoints?: {
    [playerKey in `p${number}`]?: number;
  };
}

export interface IDiceFromNamesSection {
  names: IDiceNamesFormRow;
}
export interface IDiceMountainSection {
  ones: IDiceFormRow;
  twos: IDiceFormRow;
  threes: IDiceFormRow;
  fours: IDiceFormRow;
  fives: IDiceFormRow;
  sixes: IDiceFormRow;
  result: IDiceFormRow;
}

export interface IDiceFormPokerSection {
  pair: IDiceFormRow;
  twoPairs: IDiceFormRow;
  smallStraight: IDiceFormRow;
  largeStraight: IDiceFormRow;
  threeOf: IDiceFormRow;
  fourOf: IDiceFormRow;
  fullHouse: IDiceFormRow;
  full: IDiceFormRow;
  even: IDiceFormRow;
  odd: IDiceFormRow;
  chance: IDiceFormRow;
}

export interface IDiceFormResultSection {
  result: IDiceFormRow;
}
export interface IDiceFormSections {
  namesSection: IDiceFromNamesSection;
  mountainSection: IDiceMountainSection;
  pokerSection: IDiceFormPokerSection;
  resultSection: IDiceFormResultSection;
}

export type IDiceFormInputChange = (
  sectionName: keyof IDiceFormSections,
  rowKey: string,
  playerInputKey: `p${number}Input`,
  newValue: number | null
) => void;

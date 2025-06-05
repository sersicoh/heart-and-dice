import type { calcRegistry } from '@utils/calcFunctions';

export interface IDiceFieldsType {
  tileDescription: string;
  inputField: number | null;
  placeholder: string;
  variant:
    | 'title'
    | 'name'
    | 'roundType'
    | 'activeRoundType'
    | 'input'
    | 'activeInput'
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

type TDicePlayerScores = {
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
    rowId?: keyof typeof calcRegistry;
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
  threeOf: IDiceFormRow;
  fourOf: IDiceFormRow;
  poker: IDiceFormRow;
  full: IDiceFormRow;
  even: IDiceFormRow;
  odd: IDiceFormRow;
  chance: IDiceFormRow;
}

export interface IDiceFormResultSection {
  result: IDiceFormRow;
}
export interface IDiceFormSections {
  namesSection: {
    names: IDiceNamesFormRow;
  };
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

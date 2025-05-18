import type { calcRegistry } from '@utils/calcFunctions';

export interface IFieldsType {
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

export interface INamesFormRow {
  gameTitle: {
    label: IFieldsType['tileDescription'];
    variant?: IFieldsType['variant'];
    placeholder?: IFieldsType['placeholder'];
  };
  player1: {
    label: IFieldsType['tileDescription'];
    variant?: IFieldsType['variant'];
    placeholder?: IFieldsType['placeholder'];
  };
  player2: {
    label: IFieldsType['tileDescription'];
    variant?: IFieldsType['variant'];
    placeholder?: IFieldsType['placeholder'];
  };
  player3: {
    label: IFieldsType['tileDescription'];
    variant?: IFieldsType['variant'];
    placeholder?: IFieldsType['placeholder'];
  };
  player4?: {
    label: IFieldsType['tileDescription'];
    variant?: IFieldsType['variant'];
    placeholder?: IFieldsType['placeholder'];
  };
}

export type TCalcResult = {
  p1?: number;
  p2?: number;
  p3?: number;
  p4?: number;
  valid: boolean;
  errorMessage?: string;
};

export type TCalcFunction = (playerValues: Array<number | null>) => TCalcResult;

export interface IFormRow {
  roundType: {
    id?: string;
    label: IFieldsType['tileDescription'];
    variant?: IFieldsType['variant'];
    placeholder?: IFieldsType['placeholder'];
    rowId?: keyof typeof calcRegistry;
  };
  p1Input: {
    variant?: IFieldsType['variant'];
    placeholder?: IFieldsType['placeholder'];
    value: IFieldsType['inputField'];
  };
  p2Input: {
    variant?: IFieldsType['variant'];
    placeholder?: IFieldsType['placeholder'];
    value: IFieldsType['inputField'];
  };
  p3Input: {
    variant?: IFieldsType['variant'];
    placeholder?: IFieldsType['placeholder'];
    value: IFieldsType['inputField'];
  };
  p4Input?: {
    variant?: IFieldsType['variant'];
    placeholder?: IFieldsType['placeholder'];
    value: IFieldsType['inputField'];
  };

  computedPoints?: {
    p1?: number;
    p2?: number;
    p3?: number;
    p4?: number;
  };
}

export interface IFromNamesSection {
  names: INamesFormRow;
}

export interface IFormHeartSection {
  noLions: IFormRow;
  noMadam: IFormRow;
  noGentlemen: IFormRow;
  sevenAndLast: IFormRow;
  hearts: IFormRow;
  heartKing: IFormRow;
  robber: IFormRow;
  result: IFormRow;
}

export interface IFormRaceSection {
  first: IFormRow;
  second: IFormRow;
  third: IFormRow;
  fourth: IFormRow;
  result: IFormRow;
}
export interface IFormResultSection {
  result: IFormRow;
}

export interface IFormSectionsDice {
  namesSection: IFromNamesSection;
  heartSection: IFormHeartSection;
  raceSection: IFormRaceSection;
  resultSection: IFormResultSection;
}

export type IFormInputChange = (
  sectionName: keyof IFormSectionsDice,
  rowKey: string,
  playerInputKey: 'p1Input' | 'p2Input' | 'p3Input' | 'p4Input',
  newValue: number | null
) => void;

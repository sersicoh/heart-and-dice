import type { calcRegistry } from '@utils/calcFunctions';

export interface IHeartFieldsType {
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

export interface IHeartNamesFormRow {
  gameTitle: {
    label: IHeartFieldsType['tileDescription'];
    variant?: IHeartFieldsType['variant'];
    placeholder?: IHeartFieldsType['placeholder'];
  };
  player1: {
    label: IHeartFieldsType['tileDescription'];
    variant?: IHeartFieldsType['variant'];
    placeholder?: IHeartFieldsType['placeholder'];
  };
  player2: {
    label: IHeartFieldsType['tileDescription'];
    variant?: IHeartFieldsType['variant'];
    placeholder?: IHeartFieldsType['placeholder'];
  };
  player3: {
    label: IHeartFieldsType['tileDescription'];
    variant?: IHeartFieldsType['variant'];
    placeholder?: IHeartFieldsType['placeholder'];
  };
  player4?: {
    label: IHeartFieldsType['tileDescription'];
    variant?: IHeartFieldsType['variant'];
    placeholder?: IHeartFieldsType['placeholder'];
  };
}

export type THeartCalcResult = {
  p1?: number;
  p2?: number;
  p3?: number;
  p4?: number;
  valid: boolean;
  errorMessage?: string;
};

export type THeartCalcFunction = (playerValues: Array<number | null>) => THeartCalcResult;

export interface IHeartFormRow {
  roundType: {
    id?: string;
    label: IHeartFieldsType['tileDescription'];
    variant?: IHeartFieldsType['variant'];
    placeholder?: IHeartFieldsType['placeholder'];
    rowId?: keyof typeof calcRegistry;
  };
  p1Input: {
    variant?: IHeartFieldsType['variant'];
    placeholder?: IHeartFieldsType['placeholder'];
    value: IHeartFieldsType['inputField'];
  };
  p2Input: {
    variant?: IHeartFieldsType['variant'];
    placeholder?: IHeartFieldsType['placeholder'];
    value: IHeartFieldsType['inputField'];
  };
  p3Input: {
    variant?: IHeartFieldsType['variant'];
    placeholder?: IHeartFieldsType['placeholder'];
    value: IHeartFieldsType['inputField'];
  };
  p4Input?: {
    variant?: IHeartFieldsType['variant'];
    placeholder?: IHeartFieldsType['placeholder'];
    value: IHeartFieldsType['inputField'];
  };

  computedPoints?: {
    p1?: number;
    p2?: number;
    p3?: number;
    p4?: number;
  };
}

export interface IHeartFromNamesSection {
  names: IHeartNamesFormRow;
}

export interface IHeartFormSection {
  noLions: IHeartFormRow;
  noMadam: IHeartFormRow;
  noGentlemen: IHeartFormRow;
  sevenAndLast: IHeartFormRow;
  hearts: IHeartFormRow;
  heartKing: IHeartFormRow;
  robber: IHeartFormRow;
  result: IHeartFormRow;
}

export interface IHeartFormRaceSection {
  first: IHeartFormRow;
  second: IHeartFormRow;
  third: IHeartFormRow;
  fourth: IHeartFormRow;
  result: IHeartFormRow;
}
export interface IHeartFormResultSection {
  result: IHeartFormRow;
}

export interface IHeartFormSections {
  namesSection: IHeartFromNamesSection;
  heartSection: IHeartFormSection;
  raceSection: IHeartFormRaceSection;
  resultSection: IHeartFormResultSection;
}

export type IHeartFormInputChange = (
  sectionName: keyof IHeartFormSections,
  rowKey: string,
  playerInputKey: 'p1Input' | 'p2Input' | 'p3Input' | 'p4Input',
  newValue: number | null
) => void;

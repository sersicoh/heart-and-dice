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
    | 'looser'
    | 'resultTitle';
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

export interface IFormRow {
  roundType: {
    label: IFieldsType['tileDescription'];
    variant?: IFieldsType['variant'];
    placeholder?: IFieldsType['placeholder'];
  };
  player1Input: {
    variant?: IFieldsType['variant'];
    placeholder?: IFieldsType['placeholder'];
    value: IFieldsType['inputField'];
  };
  player2Input: {
    variant?: IFieldsType['variant'];
    placeholder?: IFieldsType['placeholder'];
    value: IFieldsType['inputField'];
  };
  player3Input: {
    variant?: IFieldsType['variant'];
    placeholder?: IFieldsType['placeholder'];
    value: IFieldsType['inputField'];
  };
  player4Input?: {
    variant?: IFieldsType['variant'];
    placeholder?: IFieldsType['placeholder'];
    value: IFieldsType['inputField'];
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

export interface IFormSections {
  namesSection: IFromNamesSection;
  heartSection: IFormHeartSection;
  raceSection: IFormRaceSection;
  resultSection: IFormResultSection;
}

export type IFormInputChange = (
  sectionName: keyof IFormSections,
  rowKey: string,
  playerInputKey: 'player1Input' | 'player2Input' | 'player3Input' | 'player4Input',
  newValue: number | null
) => void;

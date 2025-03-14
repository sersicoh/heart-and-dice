import type { IColorsCollection, IPrimitiveColors } from '@theme/types';

export const primitiveColors: IPrimitiveColors = {
  ebonyClay: '#242f42',
  poloBlue: '#8ca7d4',
  shuttleGray: '#63799e',
  white: '#ffffff',
  malibu: '#7ba9ff',
  alto: '#cfcfcf',
  oxfordBlue: '#303a4a',
  greenPea: '#185b3c',
  greenPeaLight: '#0a281a',
  bullShot: '#8b4a20',
  bullShotLight: '#572e14',
  mirage: '#141c29',
  blueBayoux: '#4c5d7b',
  indochine: '#b86800',
  redBerry: '#991200',
};

export const LightColorsColections: IColorsCollection = {
  backgroundBase: primitiveColors.mirage,
  textLight: primitiveColors.poloBlue,
  textDark: primitiveColors.mirage,
  frameBackground: primitiveColors.blueBayoux,
  textWhite: primitiveColors.white,
  mainFormText: primitiveColors.blueBayoux,
  secondFormText: primitiveColors.alto,
  mainFormField: primitiveColors.oxfordBlue,
  secondaryFormField: primitiveColors.ebonyClay,
  looseFormField: primitiveColors.bullShot,
  manyLooseFormField: primitiveColors.bullShotLight,
  winFormField: primitiveColors.greenPea,
  manyWinFormField: primitiveColors.greenPeaLight,
  buttonBackground: primitiveColors.ebonyClay,
  frameMainFields: primitiveColors.blueBayoux,
  logo: primitiveColors.poloBlue,
  thirdFormText: primitiveColors.white,
  lightFormField: primitiveColors.poloBlue,
  buttonDisabled: primitiveColors.oxfordBlue,
  buttonDisabledText: primitiveColors.blueBayoux,
  errorMessageBackground: primitiveColors.ebonyClay,
  errorMessageText: primitiveColors.white,
  warningMessageBackground: primitiveColors.ebonyClay,
  warningMessageText: primitiveColors.white,
  successMessageBackground: primitiveColors.greenPea,
  successMessageText: primitiveColors.white,
  infoMessageBackground: primitiveColors.malibu,
  infoMessageText: primitiveColors.white,
  defaultMessageBackground: primitiveColors.alto,
  defaultMessageText: primitiveColors.white,
  modalBackground: primitiveColors.ebonyClay,
};

export const DarkColorsColections: IColorsCollection = {
  backgroundBase: primitiveColors.mirage,
  textDark: primitiveColors.mirage,
  textLight: primitiveColors.poloBlue,
  frameBackground: primitiveColors.blueBayoux,
  textWhite: primitiveColors.white,
  mainFormText: primitiveColors.malibu,
  secondFormText: primitiveColors.alto,
  mainFormField: primitiveColors.oxfordBlue,
  secondaryFormField: primitiveColors.ebonyClay,
  looseFormField: primitiveColors.bullShot,
  manyLooseFormField: primitiveColors.bullShotLight,
  winFormField: primitiveColors.greenPea,
  manyWinFormField: primitiveColors.greenPeaLight,
  buttonBackground: primitiveColors.ebonyClay,
  frameMainFields: primitiveColors.blueBayoux,
  logo: primitiveColors.poloBlue,
  thirdFormText: primitiveColors.white,
  lightFormField: primitiveColors.poloBlue,
  buttonDisabled: primitiveColors.oxfordBlue,
  buttonDisabledText: primitiveColors.blueBayoux,
  errorMessageBackground: primitiveColors.redBerry,
  errorMessageText: primitiveColors.alto,
  warningMessageBackground: primitiveColors.indochine,
  warningMessageText: primitiveColors.alto,
  successMessageBackground: primitiveColors.greenPea,
  successMessageText: primitiveColors.alto,
  infoMessageBackground: primitiveColors.ebonyClay,
  infoMessageText: primitiveColors.alto,
  defaultMessageBackground: primitiveColors.oxfordBlue,
  defaultMessageText: primitiveColors.alto,
  modalBackground: primitiveColors.ebonyClay,
};

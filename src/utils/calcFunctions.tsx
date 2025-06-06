import type { THeartCalcFunction } from '@views/heart/heartForm.types';

import { validateAllowedValues, validateMultiplesOf, validateSumIs } from '@utils/validations';

const heartSum = 260;
const raceSum = 780;

export const calcNoLions: THeartCalcFunction = (playerValues) => {
  const p1 = playerValues[0] ?? 0;
  const p2 = playerValues[1] ?? 0;
  const p3 = playerValues[2] ?? 0;
  const p4 = playerValues[3] ?? 0;

  const err1 = validateMultiplesOf(p1, p2, p3, p4, 20);
  if (err1) {
    return { p1, p2, p3, p4, valid: false, errorMessage: err1 };
  }

  const err2 = validateSumIs(p1, p2, p3, p4, heartSum);
  if (err2) {
    return { p1, p2, p3, p4, valid: false, errorMessage: err2 };
  }

  return { p1, p2, p3, p4, valid: true };
};

export const calcNoMadam: THeartCalcFunction = (playerValues) => {
  const p1 = playerValues[0] ?? 0;
  const p2 = playerValues[1] ?? 0;
  const p3 = playerValues[2] ?? 0;
  const p4 = playerValues[3] ?? 0;

  const err1 = validateMultiplesOf(p1, p2, p3, p4, 65);
  if (err1) {
    return { p1, p2, p3, p4, valid: false, errorMessage: err1 };
  }

  const err2 = validateSumIs(p1, p2, p3, p4, heartSum);
  if (err2) {
    return { p1, p2, p3, p4, valid: false, errorMessage: err2 };
  }

  return { p1, p2, p3, p4, valid: true };
};

export const calcNoGentlemen: THeartCalcFunction = (playerValues) => {
  const p1 = playerValues[0] ?? 0;
  const p2 = playerValues[1] ?? 0;
  const p3 = playerValues[2] ?? 0;
  const p4 = playerValues[3] ?? 0;

  const err2 = validateSumIs(p1, p2, p3, p4, heartSum);
  if (err2) {
    return { p1, p2, p3, p4, valid: false, errorMessage: err2 };
  }

  return { p1, p2, p3, p4, valid: true };
};

export const calcSevenAndLast: THeartCalcFunction = (playerValues) => {
  const p1 = playerValues[0] ?? 0;
  const p2 = playerValues[1] ?? 0;
  const p3 = playerValues[2] ?? 0;
  const p4 = playerValues[3] ?? 0;

  const err1 = validateAllowedValues(p1, p2, p3, p4, [0, 130, 260]);
  if (err1) {
    return { p1, p2, p3, p4, valid: false, errorMessage: err1 };
  }
  const err2 = validateSumIs(p1, p2, p3, p4, heartSum);
  if (err2) {
    return { p1, p2, p3, p4, valid: false, errorMessage: err2 };
  }

  return { p1, p2, p3, p4, valid: true };
};

export const calcHearts: THeartCalcFunction = (playerValues) => {
  const p1 = playerValues[0] ?? 0;
  const p2 = playerValues[1] ?? 0;
  const p3 = playerValues[2] ?? 0;
  const p4 = playerValues[3] ?? 0;

  const err1 = validateMultiplesOf(p1, p2, p3, p4, 20);
  if (err1) {
    return { p1, p2, p3, p4, valid: false, errorMessage: err1 };
  }

  const err2 = validateSumIs(p1, p2, p3, p4, heartSum);
  if (err2) {
    return { p1, p2, p3, p4, valid: false, errorMessage: err2 };
  }

  return { p1, p2, p3, p4, valid: true };
};

export const calcHeartKing: THeartCalcFunction = (playerValues) => {
  const p1 = playerValues[0] ?? 0;
  const p2 = playerValues[1] ?? 0;
  const p3 = playerValues[2] ?? 0;
  const p4 = playerValues[3] ?? 0;

  const err1 = validateAllowedValues(p1, p2, p3, p4, [0, 260]);
  if (err1) {
    return { p1, p2, p3, p4, valid: false, errorMessage: err1 };
  }

  const err2 = validateSumIs(p1, p2, p3, p4, heartSum);
  if (err2) {
    return { p1, p2, p3, p4, valid: false, errorMessage: err2 };
  }

  return { p1, p2, p3, p4, valid: true };
};

export const calcRobber: THeartCalcFunction = (playerValues) => {
  const p1 = playerValues[0] ?? 0;
  const p2 = playerValues[1] ?? 0;
  const p3 = playerValues[2] ?? 0;
  const p4 = playerValues[3] ?? 0;

  const robberSum = heartSum * 6;
  const err2 = validateSumIs(p1, p2, p3, p4, robberSum);
  if (err2) {
    return { p1, p2, p3, p4, valid: false, errorMessage: err2 };
  }

  return { p1, p2, p3, p4, valid: true };
};

export const calcHeartResult: THeartCalcFunction = (playerValues) => {
  const p1 = playerValues[0] ?? 0;
  const p2 = playerValues[1] ?? 0;
  const p3 = playerValues[2] ?? 0;
  const p4 = playerValues[3] ?? 0;

  return { p1, p2, p3, p4, valid: true };
};

export const calcRaceRound: THeartCalcFunction = (playerValues) => {
  const p1 = playerValues[0] ?? 0;
  const p2 = playerValues[1] ?? 0;
  const p3 = playerValues[2] ?? 0;
  const p4 = playerValues[3] ?? 0;

  const err1 = validateAllowedValues(p1, p2, p3, p4, [0, 130, 250, 400]);
  if (err1) {
    return { p1, p2, p3, p4, valid: false, errorMessage: err1 };
  }

  const err2 = validateSumIs(p1, p2, p3, p4, raceSum);
  if (err2) {
    return { p1, p2, p3, p4, valid: false, errorMessage: err2 };
  }

  return { p1, p2, p3, p4, valid: true };
};

export const calcRaceResult: THeartCalcFunction = (playerValues) => {
  const p1 = playerValues[0] ?? 0;
  const p2 = playerValues[1] ?? 0;
  const p3 = playerValues[2] ?? 0;
  const p4 = playerValues[3] ?? 0;

  return { p1, p2, p3, p4, valid: true };
};
export const calcFinalResult: THeartCalcFunction = (playerValues) => {
  const p1 = playerValues[0] ?? 0;
  const p2 = playerValues[1] ?? 0;
  const p3 = playerValues[2] ?? 0;
  const p4 = playerValues[3] ?? 0;

  return { p1, p2, p3, p4, valid: true };
};

export const calcRegistry = {
  noLions: calcNoLions,
  noMadam: calcNoMadam,
  noGentlemen: calcNoGentlemen,
  sevenAndLast: calcSevenAndLast,
  hearts: calcHearts,
  heartKing: calcHeartKing,
  robber: calcRobber,
  heartResult: calcHeartResult,
  raceRound: calcRaceRound,
  raceResult: calcRaceResult,
  finalResult: calcFinalResult,
} as const;

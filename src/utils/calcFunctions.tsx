import { validateAllowedValues, validateMultiplesOf, validateSumIs } from '@utils/validations';

import type { TCalcFunction } from '@/views/heart/form.types';

const heartSum = 260;
const raceSum = 780;

export const calcNoLions: TCalcFunction = (playerValues) => {
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

export const calcNoMadam: TCalcFunction = (playerValues) => {
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

export const calcNoGentlemen: TCalcFunction = (playerValues) => {
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

export const calcSevenAndLast: TCalcFunction = (playerValues) => {
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

export const calcHearts: TCalcFunction = (playerValues) => {
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

export const calcHeartKing: TCalcFunction = (playerValues) => {
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

export const calcRobber: TCalcFunction = (playerValues) => {
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

export const calcHeartResult: TCalcFunction = (playerValues) => {
  const p1 = playerValues[0] ?? 0;
  const p2 = playerValues[1] ?? 0;
  const p3 = playerValues[2] ?? 0;
  const p4 = playerValues[3] ?? 0;

  return { p1, p2, p3, p4, valid: true };
};

export const calcRaceRound: TCalcFunction = (playerValues) => {
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

export const calcRaceResult: TCalcFunction = (playerValues) => {
  const p1 = playerValues[0] ?? 0;
  const p2 = playerValues[1] ?? 0;
  const p3 = playerValues[2] ?? 0;
  const p4 = playerValues[3] ?? 0;

  return { p1, p2, p3, p4, valid: true };
};
export const calcFinalResult: TCalcFunction = (playerValues) => {
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

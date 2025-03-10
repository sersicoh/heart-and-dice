import type { TCalcFunction } from '@/views/heart/form.types';

export const calcNoLions: TCalcFunction = (playerValues) => {
  // const p1 = playerValues[0] ?? 0;
  // const p2 = playerValues[1] ?? 0;
  // const p3 = playerValues[2] ?? 0;
  // const p4 = playerValues[3] ?? 0;

  // const total = p1 + p2 + p3 + p4;
  // if (total !== 260) {
  //   alert('Suma musi wynosić 260!');
  // }

  return {
    p1: playerValues[0] ?? 0,
    p2: playerValues[1] ?? 0,
    p3: playerValues[2] ?? 0,
    p4: playerValues[3] !== undefined ? (playerValues[3] ?? undefined) : undefined,
  };
};

export const calcNoMadam: TCalcFunction = (playerValues) => {
  return {
    p1: playerValues[0] ?? 0,
    p2: playerValues[1] ?? 0,
    p3: playerValues[2] ?? 0,
    p4: playerValues[3] !== undefined ? (playerValues[3] ?? undefined) : undefined,
  };
};

export const calcNoGentlemen: TCalcFunction = (playerValues) => {
  return {
    p1: playerValues[0] ?? 0,
    p2: playerValues[1] ?? 0,
    p3: playerValues[2] ?? 0,
    p4: playerValues[3] !== undefined ? (playerValues[3] ?? undefined) : undefined,
  };
};

export const calcSevenAndLast: TCalcFunction = (playerValues) => {
  return {
    p1: playerValues[0] ?? 0,
    p2: playerValues[1] ?? 0,
    p3: playerValues[2] ?? 0,
    p4: playerValues[3] !== undefined ? (playerValues[3] ?? undefined) : undefined,
  };
};

export const calcHearts: TCalcFunction = (playerValues) => {
  return {
    p1: playerValues[0] ?? 0,
    p2: playerValues[1] ?? 0,
    p3: playerValues[2] ?? 0,
    p4: playerValues[3] !== undefined ? (playerValues[3] ?? undefined) : undefined,
  };
};

export const calcHeartKing: TCalcFunction = (playerValues) => {
  return {
    p1: playerValues[0] ?? 0,
    p2: playerValues[1] ?? 0,
    p3: playerValues[2] ?? 0,
    p4: playerValues[3] !== undefined ? (playerValues[3] ?? undefined) : undefined,
  };
};

export const calcRobber: TCalcFunction = (playerValues) => {
  return {
    p1: playerValues[0] ?? 0,
    p2: playerValues[1] ?? 0,
    p3: playerValues[2] ?? 0,
    p4: playerValues[3] !== undefined ? (playerValues[3] ?? undefined) : undefined,
  };
};

export const calcHeartResult: TCalcFunction = (playerValues) => {
  return {
    p1: playerValues[0] ?? 0,
    p2: playerValues[1] ?? 0,
    p3: playerValues[2] ?? 0,
    p4: playerValues[3] !== undefined ? (playerValues[3] ?? 0) : undefined,
  };
};

export const calcRaceRound: TCalcFunction = (playerValues) => {
  return {
    p1: playerValues[0] ?? 0,
    p2: playerValues[1] ?? 0,
    p3: playerValues[2] ?? 0,
    p4: playerValues[3] !== undefined ? (playerValues[3] ?? undefined) : undefined,
  };
};

export const calcRaceResult: TCalcFunction = (playerValues) => {
  return {
    p1: playerValues[0] ?? 0,
    p2: playerValues[1] ?? 0,
    p3: playerValues[2] ?? 0,
    p4: playerValues[3] !== undefined ? (playerValues[3] ?? 0) : undefined,
  };
};
export const calcFinalResult: TCalcFunction = (playerValues) => {
  return {
    p1: playerValues[0] ?? 0,
    p2: playerValues[1] ?? 0,
    p3: playerValues[2] ?? 0,
    p4: playerValues[3] !== undefined ? (playerValues[3] ?? 0) : undefined,
  };
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

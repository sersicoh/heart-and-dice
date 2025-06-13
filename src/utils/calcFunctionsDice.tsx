import type { TDiceCalcFunction, TDicePlayerScores } from '@views/dice/diceForm.types';

import { validateIntegerNonNegative, validateMultiples } from './validationsDice';

/* pomocnik */
function buildScores(vals: (number | null)[]): TDicePlayerScores {
  const out: TDicePlayerScores = {};
  vals.forEach((v, i) => {
    out[`player${i + 1}`] = v ?? 0;
  });
  return out;
}

/* -------- sekcja Mountain -------- */
function makeNumberRow(face: number): TDiceCalcFunction {
  return (vals) => {
    const err = validateMultiples(face, ...vals.map((v) => v ?? 0));
    return err
      ? { ...buildScores(vals), valid: false, errorMessage: err }
      : { ...buildScores(vals), valid: true };
  };
}

export const calcOnes = makeNumberRow(1);
export const calcTwos = makeNumberRow(2);
export const calcThrees = makeNumberRow(3);
export const calcFours = makeNumberRow(4);
export const calcFives = makeNumberRow(5);
export const calcSixes = makeNumberRow(6);

/* suma + premia/kara */
export const calcMountainResult: TDiceCalcFunction = (vals) => {
  const base = vals.map((v) => v ?? 0);
  const scores: TDicePlayerScores = {};
  base.forEach((sum, i) => {
    let sc = sum;
    if (sum < 0)
      sc -= 50; // kara
    else if (sum >= 15) sc += 50; // premia
    scores[`player${i + 1}`] = sc;
  });
  return { ...scores, valid: true };
};

/* -------- sekcja Poker -------- */
function positiveRow(vals: (number | null)[]): ReturnType<TDiceCalcFunction> {
  const err = validateIntegerNonNegative(...vals.map((v) => v ?? 0));
  return err
    ? { ...buildScores(vals), valid: false, errorMessage: err }
    : { ...buildScores(vals), valid: true };
}

export const calcPair = positiveRow;
export const calcTwoPairs = positiveRow;
export const calcSmallStraight = positiveRow;
export const calcLargeStraight = positiveRow;
export const calcThreeOf = positiveRow;
export const calcFourOf = positiveRow;
export const calcFullHouse: TDiceCalcFunction = (vals) => {
  const r = positiveRow(vals);
  if (!r.valid) return r;
  (Object.keys(r) as (keyof TDicePlayerScores)[]).forEach((k) => {
    const val = r[k] ?? 0;
    r[k] = val > 0 ? val + 50 : val;
  });
  return r;
};
export const calcFull = positiveRow;
export const calcEven = positiveRow;
export const calcOdd = positiveRow;
export const calcChance = positiveRow;

/* ---------- wynik końcowy ---------- */
export const calcFinalResult: TDiceCalcFunction = (vals) => ({
  ...buildScores(vals),
  valid: true,
});

/* ---------- registry ---------- */
export const calcRegistryDice = {
  ones: calcOnes,
  twos: calcTwos,
  threes: calcThrees,
  fours: calcFours,
  fives: calcFives,
  sixes: calcSixes,
  mountainResult: calcMountainResult,
  pair: calcPair,
  twoPairs: calcTwoPairs,
  smallStraight: calcSmallStraight,
  largeStraight: calcLargeStraight,
  threeOf: calcThreeOf,
  fourOf: calcFourOf,
  fullHouse: calcFullHouse,
  full: calcFull,
  even: calcEven,
  odd: calcOdd,
  chance: calcChance,
  finalResult: calcFinalResult,
} as const;

export type CalcRegistryDice = typeof calcRegistryDice;

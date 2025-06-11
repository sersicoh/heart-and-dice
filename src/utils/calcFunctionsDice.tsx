// calcFunctionsDice.ts

import type { TDiceCalcFunction, TDicePlayerScores } from '@views/dice/diceForm.types';

/**
 * Pomoc: zwraca obiekt { p1: x, p2: y, … } na podstawie tablicy playerValues.
 * Jeśli tablica ma długość N, to dostajemy p1…pN (każde z wartością albo 0).
 */
function buildScores(playerValues: Array<number | null>): TDicePlayerScores {
  const scores: TDicePlayerScores = {};
  playerValues.forEach((val, idx) => {
    const key = `p${idx + 1}` as `player${number}`;
    scores[key] = val ?? 0;
  });
  return scores;
}

/**
 * Przykładowa implementacja „górki”: dla każdej kolumny pX wpisujemy dokładnie przekazaną wartość.
 * Możesz w przyszłości dodać np. walidację sumy lub wielokrotności (ale tu załóżmy stub).
 */
export const calcOnes: TDiceCalcFunction = (playerValues) => {
  return { ...buildScores(playerValues), valid: true };
};
export const calcTwos: TDiceCalcFunction = (playerValues) => {
  return { ...buildScores(playerValues), valid: true };
};
export const calcThrees: TDiceCalcFunction = (playerValues) => {
  return { ...buildScores(playerValues), valid: true };
};
export const calcFours: TDiceCalcFunction = (playerValues) => {
  return { ...buildScores(playerValues), valid: true };
};
export const calcFives: TDiceCalcFunction = (playerValues) => {
  return { ...buildScores(playerValues), valid: true };
};
export const calcSixes: TDiceCalcFunction = (playerValues) => {
  return { ...buildScores(playerValues), valid: true };
};

/**
 * Kalkulator wyniku górnej części (sumuje wszystkie ones…sixes).
 * W praktyce:
 *   wynik gracza i = suma wartości we wszystkich wierszach górki (ones…sixes).
 * Tu na razie tylko stub – przekazujemy 0, ale sam buildScores utworzy p1..pN=0.
 */
export const calcMountainResult: TDiceCalcFunction = (playerValues) => {
  // Jeżeli naprawdę chcesz obliczać:
  //   const sum = playerValues.reduce((a, b) => a + (b ?? 0), 0);
  //   scores[`p${idx+1}`] = sum (ale tu na razie pusta implementacja)
  return { ...buildScores(playerValues), valid: true };
};

/**
 * Para (pair) – analogicznie: wolisz pobrać elementy i policzyć parę?
 * Na razie stub: zwracamy po prostu to, co przyszło.
 */
export const calcPair: TDiceCalcFunction = (playerValues) => {
  return { ...buildScores(playerValues), valid: true };
};

/**
 * Dwie pary (twoPairs)
 */
export const calcTwoPairs: TDiceCalcFunction = (playerValues) => {
  return { ...buildScores(playerValues), valid: true };
};

/**
 * Mały strit (smallStraight)
 */
export const calcSmallStraight: TDiceCalcFunction = (playerValues) => {
  return { ...buildScores(playerValues), valid: true };
};

/**
 * Duży strit (largeStraight)
 */
export const calcLargeStraight: TDiceCalcFunction = (playerValues) => {
  return { ...buildScores(playerValues), valid: true };
};

/**
 * Trójka (threeOf)
 */
export const calcThreeOf: TDiceCalcFunction = (playerValues) => {
  return { ...buildScores(playerValues), valid: true };
};

/**
 * Czwórka (fourOf)
 */
export const calcFourOf: TDiceCalcFunction = (playerValues) => {
  return { ...buildScores(playerValues), valid: true };
};

/**
 * Full House (fullHouse)
 */
export const calcFullHouse: TDiceCalcFunction = (playerValues) => {
  return { ...buildScores(playerValues), valid: true };
};

/**
 * Full (tutaj rozumiem, że to drugie „full” – być może poza fullHouse?
 * Jeśli nie używasz dodatkowo, można wyrzucić albo nadpisać to samo, co fullHouse).
 */
export const calcFull: TDiceCalcFunction = (playerValues) => {
  return { ...buildScores(playerValues), valid: true };
};

/**
 * Liczba oczek parzystych (even)
 */
export const calcEven: TDiceCalcFunction = (playerValues) => {
  return { ...buildScores(playerValues), valid: true };
};

/**
 * Liczba oczek nieparzystych (odd)
 */
export const calcOdd: TDiceCalcFunction = (playerValues) => {
  return { ...buildScores(playerValues), valid: true };
};

/**
 * Szansa (chance)
 */
export const calcChance: TDiceCalcFunction = (playerValues) => {
  return { ...buildScores(playerValues), valid: true };
};

/**
 * Kasowanie (yahtzee / kareta) – w Twoim typie to prawdopodobnie 'yahtzee' albo 'fourOfKind' (w zależności od reguły).
 * Jeśli tego nie używasz, możesz usunąć z sekcji getDiceFields
 */
export const calcYahtzee: TDiceCalcFunction = (playerValues) => {
  return { ...buildScores(playerValues), valid: true };
};

/**
 * Wynik końcowy – podsumowuje górę i dół:
 * Na razie również stub: buildScores(...) i valid: true
 */
export const calcFinalResult: TDiceCalcFunction = (playerValues) => {
  return { ...buildScores(playerValues), valid: true };
};

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

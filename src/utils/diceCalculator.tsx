import type { IDiceFormRow, TDicePlayerScores } from '@views/dice/diceForm.types';

/** helper – policz wystąpienia każdej ścianki */
function counts(dice: number[]): Record<number, number> {
  return dice.reduce(
    (acc, d) => {
      acc[d] = (acc[d] || 0) + 1;
      return acc;
    },
    {} as Record<number, number>
  );
}

// poszczególne kategorie
export function scoreOnesToSixes(face: 1 | 2 | 3 | 4 | 5 | 6, dice: number[]): number {
  return dice.filter((d) => d === face).length * face;
}

export function scorePair(dice: number[]): number {
  const c = counts(dice);
  const pairs = Object.entries(c)
    .filter(([, ct]) => ct >= 2)
    .map(([face]) => Number(face) * 2);
  return pairs.length ? Math.max(...pairs) : 0;
}

export function scoreTwoPairs(dice: number[]): number {
  const c = counts(dice);
  const pairs = Object.entries(c)
    .filter(([, ct]) => ct >= 2)
    .map(([face]) => Number(face) * 2)
    .sort((a, b) => b - a);
  return pairs.length >= 2 ? pairs[0] + pairs[1] : 0;
}

export function scoreThreeOf(dice: number[]): number {
  return Object.values(counts(dice)).some((ct) => ct >= 3) ? dice.reduce((a, b) => a + b, 0) : 0;
}

export function scoreFourOf(dice: number[]): number {
  return Object.values(counts(dice)).some((ct) => ct >= 4) ? dice.reduce((a, b) => a + b, 0) : 0;
}

export function scoreFullHouse(dice: number[]): number {
  const vals = Object.values(counts(dice));
  return vals.includes(3) && vals.includes(2) ? 25 : 0;
}

export function scoreYahtzee(dice: number[]): number {
  return Object.values(counts(dice)).some((ct) => ct === 5) ? 50 : 0;
}

export function scoreSmallStraight(dice: number[]): number {
  const s = new Set(dice);
  return [1, 2, 3, 4].every((n) => s.has(n)) ? 15 : 0;
}

export function scoreLargeStraight(dice: number[]): number {
  const s = new Set(dice);
  return [2, 3, 4, 5, 6].every((n) => s.has(n)) ? 20 : 0;
}

export function scoreEven(dice: number[]): number {
  return dice.filter((d) => d % 2 === 0).reduce((a, b) => a + b, 0);
}

export function scoreOdd(dice: number[]): number {
  return dice.filter((d) => d % 2 !== 0).reduce((a, b) => a + b, 0);
}

export function scoreChance(dice: number[]): number {
  return dice.reduce((a, b) => a + b, 0);
}

// jeśli masz drugą szansę inaczej niż powyżej – dopisz tutaj:
export function scoreChance2(dice: number[]): number {
  return scoreChance(dice);
}

/**
 * Główna funkcja: dla jednego wiersza weź
 * tylko wartość z isEditable (lub null→0) i policz po swojemu.
 */
export function calcRow(row: IDiceFormRow<number>): TDicePlayerScores<number> {
  // tu przyjmujemy, że row.inputs zawiera dokładnie JEDNO isEditable = true
  const inputs = Object.values(row.inputs);
  const diceVal = inputs.find((i) => i.isEditable)?.value ?? 0;
  // bo to input (jedna wartość), więc traktujemy jako jednokostkowe?
  // ALE: jeśli chcesz liczysz z 5 rzutów, zmodyfikuj tę część, by zebrać array.
  // Dla uproszczenia: traktujemy input jako suma 🔢
  const d = [diceVal];

  switch (row.fieldType.rowId) {
    case 'ones':
      return { player1: scoreOnesToSixes(1, d) };
    case 'twos':
      return { player1: scoreOnesToSixes(2, d) };
    case 'threes':
      return { player1: scoreOnesToSixes(3, d) };
    case 'fours':
      return { player1: scoreOnesToSixes(4, d) };
    case 'fives':
      return { player1: scoreOnesToSixes(5, d) };
    case 'sixes':
      return { player1: scoreOnesToSixes(6, d) };

    case 'pair':
      return { player1: scorePair(d) };
    case 'twoPairs':
      return { player1: scoreTwoPairs(d) };
    case 'threeOf':
      return { player1: scoreThreeOf(d) };
    case 'fourOf':
      return { player1: scoreFourOf(d) };
    case 'fullHouse':
      return { player1: scoreFullHouse(d) };
    case 'full':
      return { player1: scoreYahtzee(d) };
    case 'smallStraight':
      return { player1: scoreSmallStraight(d) };
    case 'largeStraight':
      return { player1: scoreLargeStraight(d) };
    case 'even':
      return { player1: scoreEven(d) };
    case 'odd':
      return { player1: scoreOdd(d) };
    case 'chance':
      return { player1: scoreChance(d) };
    case 'chance2':
      return { player1: scoreChance2(d) };

    case 'mountainResult':
      // suma od ones do sixes – jeśli masz computedPoints, zintegruj je tutaj
      return {
        player1:
          scoreOnesToSixes(1, d) +
          scoreOnesToSixes(2, d) +
          scoreOnesToSixes(3, d) +
          scoreOnesToSixes(4, d) +
          scoreOnesToSixes(5, d) +
          scoreOnesToSixes(6, d),
      };

    case 'finalResult':
      // analogicznie – zsumuj wszystkie kategorie z pokerSection + wynik góry
      // tu zrób po swojemu, bazując na computedPoints w state
      return { player1: 0 };

    default:
      return { player1: 0 };
  }
}

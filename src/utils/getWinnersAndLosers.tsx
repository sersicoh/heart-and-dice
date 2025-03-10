import type { IFormRow } from '@views/heart/form.types';

/**
 * Oblicza i ustawia variant: 'winner' / 'looser' / 'manyWinners' / 'manyLoosers' / 'resultTitle'.
 */
export const getWinnersAndLosers = (
  row: IFormRow,
  points: Record<string, number>,
  mode: 'heart' | 'race' | 'finalResult'
) => {
  // Klonujemy obiekt punktów
  const effectivePoints = { ...points };

  // Jeśli nie ma p4, usuwamy p4 z obliczeń
  if (!row.p4Input) {
    delete effectivePoints.p4;
  }

  const valuesArray = Object.values(effectivePoints);
  const minScore = Math.min(...valuesArray);
  const maxScore = Math.max(...valuesArray);

  // zliczamy liczbę wystąpień min i max
  const countMin = valuesArray.filter((val) => val === minScore).length;
  const countMax = valuesArray.filter((val) => val === maxScore).length;

  // 1. Sprawdzamy, czy wszyscy mają to samo
  //    (wtedy minScore === maxScore)
  if (minScore === maxScore) {
    // wszyscy dostają variant = 'resultTitle'
    Object.entries(effectivePoints).forEach(([player, value]) => {
      const inputKey = (player + 'Input') as 'p1Input' | 'p2Input' | 'p3Input' | 'p4Input';
      if (!row[inputKey]) return;
      row[inputKey].variant = 'resultTitle';
      row[inputKey].value = value;
    });
    return;
  }

  // 2. Dla sekcji hearts (winner = min, looser = max)
  //    Dla race/final (winner = max, looser = min)

  // Helper: sprawdza czy to jest hearts
  const isHearts = mode === 'heart';

  Object.entries(effectivePoints).forEach(([player, value]) => {
    const inputKey = (player + 'Input') as 'p1Input' | 'p2Input' | 'p3Input' | 'p4Input';
    if (!row[inputKey]) return;

    if (isHearts) {
      // hearts => min = winner, max = looser
      if (value === minScore) {
        // czy mamy wielu winnerów?
        row[inputKey].variant = countMin > 1 ? 'manyWinner' : 'winner';
        row[inputKey].value = value;
      } else if (value === maxScore) {
        // czy mamy wielu looserów?
        row[inputKey].variant = countMax > 1 ? 'manyLooser' : 'looser';
        row[inputKey].value = value;
      } else {
        row[inputKey].variant = 'resultTitle';
        row[inputKey].value = value;
      }
    } else {
      // race/final => max = winner, min = looser
      if (value === maxScore) {
        row[inputKey].variant = countMax > 1 ? 'manyWinner' : 'winner';
        row[inputKey].value = value;
      } else if (value === minScore) {
        row[inputKey].variant = countMin > 1 ? 'manyLooser' : 'looser';
        row[inputKey].value = value;
      } else {
        row[inputKey].variant = 'resultTitle';
        row[inputKey].value = value;
      }
    }
  });
};

import type { IFormRow } from '@views/heart/form.types';

export const getWinnersAndLosers = (
  row: IFormRow,
  points: Record<string, number>,
  mode: 'heart' | 'race' | 'finalResult'
) => {
  const effectivePoints = { ...points };

  if (!row.p4Input) {
    delete effectivePoints.p4;
  }

  const valuesArray = Object.values(effectivePoints);
  const minScore = Math.min(...valuesArray);
  const maxScore = Math.max(...valuesArray);

  const countMin = valuesArray.filter((val) => val === minScore).length;
  const countMax = valuesArray.filter((val) => val === maxScore).length;

  if (minScore === maxScore) {
    Object.entries(effectivePoints).forEach(([player, value]) => {
      const inputKey = (player + 'Input') as 'p1Input' | 'p2Input' | 'p3Input' | 'p4Input';
      if (!row[inputKey]) return;
      row[inputKey].variant = 'resultTitle';
      row[inputKey].value = value;
    });
    return;
  }
  const isHearts = mode === 'heart';

  Object.entries(effectivePoints).forEach(([player, value]) => {
    const inputKey = (player + 'Input') as 'p1Input' | 'p2Input' | 'p3Input' | 'p4Input';
    if (!row[inputKey]) return;

    if (isHearts) {
      if (value === minScore) {
        row[inputKey].variant = countMin > 1 ? 'manyWinner' : 'winner';
        row[inputKey].value = value;
      } else if (value === maxScore) {
        row[inputKey].variant = countMax > 1 ? 'manyLooser' : 'looser';
        row[inputKey].value = value;
      } else {
        row[inputKey].variant = 'resultTitle';
        row[inputKey].value = value;
      }
    } else {
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

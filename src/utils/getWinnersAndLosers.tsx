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

  Object.entries(effectivePoints).forEach(([player, value]) => {
    const inputKey = (player + 'Input') as 'p1Input' | 'p2Input' | 'p3Input' | 'p4Input';

    if (!row[inputKey]) return;

    if (mode === 'heart') {
      if (value === minScore) {
        row[inputKey].variant = 'winner';
        row[inputKey].value = value;
      } else if (value === maxScore) {
        row[inputKey].variant = 'looser';
        row[inputKey].value = value;
      } else {
        row[inputKey].variant = 'resultTitle';
        row[inputKey].value = value;
      }
    } else {
      if (value === maxScore) {
        row[inputKey].variant = 'winner';
        row[inputKey].value = value;
      } else if (value === minScore) {
        row[inputKey].variant = 'looser';
        row[inputKey].value = value;
      } else {
        row[inputKey].variant = 'resultTitle';
        row[inputKey].value = value;
      }
    }
  });
};

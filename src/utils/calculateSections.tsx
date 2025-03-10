import type {
  IFormHeartSection,
  IFormRaceSection,
  IFormRow,
  IFormSections,
} from '@views/heart/form.types';

import { calcRegistry } from '@utils/calcFunctions';
import { getWinnersAndLosers } from '@utils/getWinnersAndLosers';

export const calculateHearts = (cloned: IFormSections) => {
  const heartSum = { p1: 0, p2: 0, p3: 0, p4: 0 };
  for (const rowKey of Object.keys(cloned.heartSection)) {
    const row = cloned.heartSection[rowKey as keyof IFormHeartSection];
    if (rowKey === 'result') continue;
    const rowId = row.roundType.rowId;
    if (!rowId) continue;
    const fn = calcRegistry[rowId];
    if (!fn) continue;

    const values: Array<number | null> = [row.p1Input.value, row.p2Input.value, row.p3Input.value];
    if (row.p4Input) {
      values.push(row.p4Input.value);
    }
    const result = fn(values);
    row.computedPoints = {
      p1: result.p1,
      p2: result.p2,
      p3: result.p3,
      p4: row.p4Input ? result.p4 : undefined,
    };

    heartSum.p1 += result.p1 ?? 0;
    heartSum.p2 += result.p2 ?? 0;
    heartSum.p3 += result.p3 ?? 0;

    if (row.p4Input) {
      heartSum.p4 += result.p4 ?? 0;
    }
  }

  const heartResultRow = cloned.heartSection.result;

  if (heartResultRow?.roundType?.rowId) {
    const heartResultFn = calcRegistry[heartResultRow.roundType.rowId];
    if (heartResultFn) {
      const sumValues: Array<number> = [heartSum.p1, heartSum.p2, heartSum.p3];
      if (heartResultRow.p4Input) {
        sumValues.push(heartSum.p4);
      }
      const result = heartResultFn(sumValues);

      heartResultRow.computedPoints = {
        p1: result.p1,
        p2: result.p2,
        p3: result.p3,
        p4: heartResultRow.p4Input ? result.p4 : undefined,
      };
      getWinnersAndLosers(heartResultRow, heartSum, 'heart');
    }
  }
};
export const calculateRace = (cloned: IFormSections) => {
  const raceSum = { p1: 0, p2: 0, p3: 0, p4: 0 };
  for (const rowKey of Object.keys(cloned.raceSection)) {
    const row = cloned.raceSection[rowKey as keyof IFormRaceSection];
    if (rowKey === 'result') continue;
    const rowId = row.roundType.rowId;
    if (!rowId) continue;
    const fn = calcRegistry[rowId];
    if (!fn) continue;

    const values: Array<number | null> = [row.p1Input.value, row.p2Input.value, row.p3Input.value];
    if (row.p4Input) {
      values.push(row.p4Input.value);
    }
    const result = fn(values);
    row.computedPoints = {
      p1: result.p1,
      p2: result.p2,
      p3: result.p3,
      p4: row.p4Input ? result.p4 : undefined,
    };

    raceSum.p1 += result.p1 ?? 0;
    raceSum.p2 += result.p2 ?? 0;
    raceSum.p3 += result.p3 ?? 0;
    if (row.p4Input) {
      raceSum.p4 += result.p4 ?? 0;
    }
  }

  const raceResultRow = cloned.raceSection.result;

  if (raceResultRow?.roundType?.rowId) {
    const raceResultFn = calcRegistry[raceResultRow.roundType.rowId];
    if (raceResultFn) {
      const sumValues: number[] = [raceSum.p1, raceSum.p2, raceSum.p3];
      if (raceResultRow.p4Input) {
        sumValues.push(raceSum.p4);
      }
      const result = raceResultFn(sumValues);

      raceResultRow.computedPoints = {
        p1: result.p1,
        p2: result.p2,
        p3: result.p3,
        p4: raceResultRow.p4Input ? result.p4 : undefined,
      };
      getWinnersAndLosers(raceResultRow, raceSum, 'race');
    }
  }
};

function safePoints(
  points: IFormRow['computedPoints'] | undefined
): Required<NonNullable<IFormRow['computedPoints']>> {
  return {
    p1: points?.p1 ?? 0,
    p2: points?.p2 ?? 0,
    p3: points?.p3 ?? 0,
    p4: points?.p4 ?? 0,
  };
}

export const calculateFinal = (cloned: IFormSections) => {
  const heartSum = safePoints(cloned.heartSection.result.computedPoints);
  const raceSum = safePoints(cloned.raceSection.result.computedPoints);

  const finalPoints = {
    p1: raceSum.p1 - heartSum.p1,
    p2: raceSum.p2 - heartSum.p2,
    p3: raceSum.p3 - heartSum.p3,
    p4: raceSum.p4 - heartSum.p4,
  };

  // Wstawiamy do wiersza "resultSection.result"
  const finalRow = cloned.resultSection.result;
  if (finalRow.roundType.rowId) {
    const finalCalcFn = calcRegistry[finalRow.roundType.rowId];
    if (finalCalcFn) {
      const values: number[] = [finalPoints.p1, finalPoints.p2, finalPoints.p3];
      if (finalRow.p4Input) {
        values.push(finalPoints.p4);
      }
      const result = finalCalcFn(values);

      finalRow.computedPoints = {
        p1: result.p1,
        p2: result.p2,
        p3: result.p3,
        p4: finalRow.p4Input ? result.p4 : undefined,
      };

      getWinnersAndLosers(finalRow, finalPoints, 'finalResult');
    }
  }
};

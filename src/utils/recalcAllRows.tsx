import { calculateFinal, calculateHearts, calculateRace } from '@utils/calculateSections';

import type { IFormRaceSection, IFormSections } from '@/views/heart/form.types';

export function recalcAllRows(fields: IFormSections): IFormSections {
  const cloned = structuredClone(fields);

  const raceStarted = checkIfRaceStarted(cloned.raceSection);

  calculateHearts(cloned);

  if (raceStarted) {
    calculateRace(cloned);
  } else {
    const raceResult = cloned.raceSection.result;
    if (raceResult.computedPoints) {
      raceResult.computedPoints = { p1: 0, p2: 0, p3: 0, p4: raceResult.p4Input ? 0 : undefined };
    }
  }

  calculateFinal(cloned);

  function checkIfRaceStarted(raceSection: IFormRaceSection): boolean {
    for (const key of Object.keys(raceSection)) {
      if (key === 'result') continue;
      const row = raceSection[key as keyof IFormRaceSection];
      if (row.p1Input.value !== null) return true;
      if (row.p2Input.value !== null) return true;
      if (row.p3Input.value !== null) return true;
      if (row.p4Input?.value !== null) return true;
    }
    return false;
  }

  return cloned;
}

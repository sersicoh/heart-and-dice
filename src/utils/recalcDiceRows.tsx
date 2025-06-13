import type { IDiceFormSections } from '@views/dice/diceForm.types';

import {
  calculateDiceFinal,
  calculateMountain,
  calculatePoker,
} from '@utils/calculateDiceSections';

export function recalcDiceRows<F extends IDiceFormSections<number>>(f: F): F {
  const cloned = structuredClone(f);

  calculateMountain(cloned);

  const pokerBonus = calculatePoker(cloned);
  calculateDiceFinal(cloned, pokerBonus);

  return cloned;
}

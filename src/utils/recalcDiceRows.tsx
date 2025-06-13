import type { IDiceFormSections } from '@views/dice/diceForm.types';

import {
  calculateDiceFinal,
  calculateMountain,
  calculatePoker,
} from '@utils/calculateDiceSections';

export function recalcDiceRows<F extends IDiceFormSections<number>>(f: F): F {
  const cloned = structuredClone(f);

  /* 1. górka */
  calculateMountain(cloned);

  /* 2. poker */
  const everyPos = calculatePoker(cloned);

  /* 3. wynik końcowy */
  calculateDiceFinal(cloned, everyPos);

  return cloned;
}

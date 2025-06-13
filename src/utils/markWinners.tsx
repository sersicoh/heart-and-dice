import type { IDiceFormRow } from '@views/dice/diceForm.types';

import { playerKeyToInputKey } from '@utils/keyMapping';

export function markWinners(row: IDiceFormRow<number>) {
  const pts = row.computedPoints ?? {};
  const values = Object.values(pts) as number[];

  /* ---------- najpierw zerujemy stare kolory ---------- */
  (Object.keys(pts) as (keyof typeof pts)[]).forEach((pKey) => {
    const key = playerKeyToInputKey(pKey as `player${number}`);
    const cell = row[key];
    if (cell) cell.variant = 'resultTitle';
  });

  /* jeśli wszyscy mają tyle samo – koniec */
  const min = Math.min(...values);
  const max = Math.max(...values);

  console.log(min, max, values);

  if (min === max) return;

  /* policzmy remisy */
  const cntMax = values.filter((v) => v === max).length;
  const cntMin = values.filter((v) => v === min).length;

  /* właściwe kolory */
  (Object.keys(pts) as (keyof typeof pts)[]).forEach((pKey) => {
    const key = playerKeyToInputKey(pKey as `player${number}`);
    const cell = row[key];
    if (!cell) return;

    if (pts[pKey] === max) {
      cell.variant = cntMax > 1 ? 'manyWinner' : 'winner';
    } else if (pts[pKey] === min) {
      cell.variant = cntMin > 1 ? 'manyLooser' : 'looser';
    }
  });
}

import type { IDiceFormRow, PlayerKey } from '@views/dice/diceForm.types';

import { playerKeyToInputKey } from '@utils/keyMapping';

export function markWinners(row: IDiceFormRow<number>) {
  const pts = row.computedPoints ?? {};

  /* ---------- bierzemy TYLKO klucze playerX ---------- */
  const playerKeys = (Object.keys(pts) as string[]).filter((k): k is PlayerKey =>
    k.startsWith('player')
  );

  const values = playerKeys.map((k) => pts[k] as number);

  /* ---------- zerujemy stare kolory ---------- */
  playerKeys.forEach((pKey) => {
    const cell = row[playerKeyToInputKey(pKey)];
    if (cell) cell.variant = 'resultTitle';
  });

  /* remis → nic nie kolorujemy */
  const min = Math.min(...values);
  const max = Math.max(...values);
  if (min === max) return;

  const cntMax = values.filter((v) => v === max).length;
  const cntMin = values.filter((v) => v === min).length;

  /* ---------- ustawiamy zwycięzców / przegranych ---------- */
  playerKeys.forEach((pKey) => {
    const cell = row[playerKeyToInputKey(pKey)];
    if (!cell) return;

    const val = pts[pKey] as number;

    if (val === max) {
      cell.variant = cntMax > 1 ? 'manyWinner' : 'winner';
    } else if (val === min) {
      cell.variant = cntMin > 1 ? 'manyLooser' : 'looser';
    }
  });
}

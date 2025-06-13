import type { IDiceFormRow, IDiceFormSections } from '@views/dice/diceForm.types';

import { playerKeyToInputKey } from '@utils/keyMapping';
import { markWinners } from '@utils/markWinners';

import { calcRegistryDice } from './calcFunctionsDice';

export function calculateMountain(sections: IDiceFormSections<number>) {
  const { mountainSection } = sections;

  // 1. wiersze I-VI
  Object.entries(mountainSection).forEach(([key, row]) => {
    if (key === 'result') return;
    computeRow(row, key as keyof typeof calcRegistryDice);
  });

  // 2. wynik sekcji
  const resRow = mountainSection.result;
  resRow.computedPoints = calcRegistryDice.mountainResult(collect(mountainSection, 'result'));
  copyToInputs(resRow);
  markWinners(resRow);
}

type InputCell = { value: number | null; variant?: string; label?: string };

function isInputCell(cell: unknown): cell is InputCell {
  return !!cell && typeof cell === 'object' && 'value' in cell;
}
/* ---------- helpers ---------- */
function rowIsComplete(r: IDiceFormRow<number>): boolean {
  let idx = 1;
  while (true) {
    const k = `p${idx}Input` as keyof IDiceFormRow<number>;
    if (!(k in r)) break; // koniec kolumn
    const cell = r[k];
    if (isInputCell(cell) && cell.value === null)
      // pusty? → jeszcze nie licz
      return false;
    idx++;
  }
  return true;
}

function computeRow(row: IDiceFormRow<number>, fnKey: keyof typeof calcRegistryDice) {
  if (!rowIsComplete(row)) return; // ⬅️ puste komórki → STOP

  const fn = calcRegistryDice[fnKey];
  const vals = extract(row);
  row.computedPoints = fn(vals);
  copyToInputs(row);
}

/* kopiuje computedPoints → pXInput.value / label / variant */
function copyToInputs(row: IDiceFormRow<number>) {
  const pts = row.computedPoints ?? {};
  const isSummaryRow = row.fieldType.variant === 'resultTitle';

  (Object.keys(pts) as (keyof typeof pts)[]).forEach((pKey) => {
    const inKey = playerKeyToInputKey(pKey as `player${number}`);
    const cell = row[inKey];
    if (!isInputCell(cell)) return;

    const v = pts[pKey] ?? 0;

    if (isSummaryRow) {
      cell.value = v;
      cell.variant = 'resultTitle';
    } else {
      if (cell.value !== null && cell.variant === 'input') cell.variant = 'inputFilled';
    }
  });
}

function extract(row: IDiceFormRow<number>): number[] {
  const out: number[] = [];
  let idx = 1;

  while (true) {
    const k = `p${idx}Input` as keyof IDiceFormRow<number>;
    if (!(k in row)) break;

    const cell = row[k];
    out.push(isInputCell(cell) ? (cell.value ?? 0) : 0);
    idx++;
  }
  return out;
}

function collect(sec: Record<string, IDiceFormRow<number>>, skip: string): number[] {
  const sums: number[] = [];
  Object.entries(sec).forEach(([k, row]) => {
    if (k === skip) return;
    extract(row).forEach((v, idx) => (sums[idx] = (sums[idx] ?? 0) + v));
  });
  return sums;
}

export function calculatePoker(sections: IDiceFormSections<number>): boolean[] {
  const { pokerSection } = sections;

  const playerOk: boolean[] = [];

  const sampleRow = pokerSection.pair;
  let idx = 1;
  while (`p${idx}Input` in sampleRow) {
    playerOk.push(true);
    idx++;
  }

  Object.entries(pokerSection).forEach(([k, row]) => {
    const fn = calcRegistryDice[k as keyof typeof calcRegistryDice];
    row.computedPoints = fn(extract(row));
    copyToInputs(row);

    playerOk.forEach((_, i) => {
      const pKey = `player${i + 1}` as const;
      const zero = (row.computedPoints ?? {})[pKey] === 0;
      if (zero) playerOk[i] = false;
    });
  });

  return playerOk;
}

export function calculateDiceFinal(sections: IDiceFormSections<number>, pokerBonus: boolean[]) {
  const resM = sections.mountainSection.result.computedPoints ?? {};
  const players = Object.keys(resM) as (keyof typeof resM)[];

  const finalRow = sections.resultSection.result;

  const vals: number[] = players.map((p, idx) => {
    const mount = resM[p] ?? 0;
    const poker = Object.values(sections.pokerSection).reduce(
      (a, r) => a + ((r.computedPoints ?? {})[p] ?? 0),
      0
    );
    const bonus = pokerBonus[idx] ? 100 : 0;
    return mount + poker + bonus;
  });

  finalRow.computedPoints = calcRegistryDice.finalResult(vals);
  copyToInputs(finalRow);
  markWinners(finalRow);
}

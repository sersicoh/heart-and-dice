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

  (Object.keys(pts) as (keyof typeof pts)[]).forEach((pKey) => {
    const inKey = playerKeyToInputKey(pKey as `player${number}`);
    const cell = row[inKey];
    if (!isInputCell(cell)) return;

    const v = pts[pKey] ?? 0;
    const isSummaryRow = row.fieldType.variant === 'resultTitle';

    if (isSummaryRow || cell.value !== null) {
      cell.value = v;
      if (!isSummaryRow && cell.variant !== 'activeInput' && cell.variant !== 'lastInput') {
        cell.variant = 'inputFilled';
      }
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

export function calculatePoker(sections: IDiceFormSections<number>): boolean {
  const { pokerSection } = sections;
  let allNonZero = true;

  Object.entries(pokerSection).forEach(([k, row]) => {
    const fn = calcRegistryDice[k as keyof typeof calcRegistryDice];
    row.computedPoints = fn(extract(row));
    copyToInputs(row);

    const hasZero = Object.values(row.computedPoints ?? {}).some((v) => v === 0);
    if (hasZero) allNonZero = false;
  });

  return allNonZero;
}

export function calculateDiceFinal(sections: IDiceFormSections<number>, pokerBonus: boolean) {
  const resM = sections.mountainSection.result.computedPoints ?? {};
  const players = Object.keys(resM) as (keyof typeof resM)[];

  const finalRow = sections.resultSection.result;
  const vals: number[] = players.map((p) => {
    const mount = resM[p] ?? 0;
    const poker = Object.values(sections.pokerSection).reduce(
      (a, r) => a + (r.computedPoints?.[p] ?? 0),
      0
    );
    return mount + poker + (pokerBonus ? 100 : 0);
  });

  finalRow.computedPoints = calcRegistryDice.finalResult(vals);
  copyToInputs(finalRow);

  const comp = finalRow.computedPoints;
  if (comp) {
    // liczymy ilu graczy faktycznie jest w formularzu
    const playerCount = Object.keys(sections.namesSection.names).filter(
      (k): k is `player${number}` => k.startsWith('player')
    ).length;

    (Object.keys(comp) as (keyof typeof comp)[]).forEach((pKey) => {
      const idx = Number((pKey as string).replace('player', ''));
      if (idx > playerCount) {
        delete comp[pKey];
      }
    });
  }

  markWinners(finalRow);

  console.log(finalRow.computedPoints);
}

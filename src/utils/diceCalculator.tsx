// src/utils/diceCalculator.ts
import type {
  IDiceFormRow,
  IDiceFormSections,
  IDiceInputCell,
  InputKey,
  PlayerKey,
  TDicePlayerScores,
} from '@views/dice/diceForm.types';

export function calcRowBasic<N extends number>(row: IDiceFormRow<N>): TDicePlayerScores<N> {
  const res: TDicePlayerScores<N> = {};

  (Object.keys(row.inputs) as InputKey<N>[]).forEach((key) => {
    const cell: IDiceInputCell = row.inputs[key];
    const idx = Number(key.slice(1, key.length - 5));
    const pk = `player${idx}` as PlayerKey<N>;
    res[pk] = cell.value ?? 0;
  });

  return res;
}

export function computeAll<N extends number>(
  fields: IDiceFormSections<N>,
  playerCount: number
): IDiceFormSections<N> {
  const mountainRows = Object.values(fields.mountainSection).filter(
    (r) => r.fieldType.rowId !== 'mountainResult'
  );
  const mountainBasic = mountainRows.map((r) => calcRowBasic(r));
  mountainRows.forEach((r, i) => {
    r.computedPoints = mountainBasic[i];
  });
  const mountainTotal: TDicePlayerScores<N> = {};
  for (let pi = 1; pi <= playerCount; pi++) {
    const pk = `player${pi}` as PlayerKey<N>;
    const base = mountainBasic.map((b) => b[pk] ?? 0).reduce((a, b) => a + b, 0);
    const bonus = base < 0 ? -50 : base >= 15 ? 50 : 0;
    mountainTotal[pk] = base + bonus;
  }
  fields.mountainSection.result.computedPoints = mountainTotal;

  const pokerRows = Object.values(fields.pokerSection).filter(
    (r) => r.fieldType.rowId !== 'finalResult'
  );
  const pokerBasic = pokerRows.map((r) => calcRowBasic(r));
  pokerRows.forEach((r, i) => {
    r.computedPoints = pokerBasic[i];
  });

  const finalTotal: TDicePlayerScores<N> = {};
  for (let pi = 1; pi <= playerCount; pi++) {
    const pk = `player${pi}` as PlayerKey<N>;
    const pokerSum = pokerBasic.map((b) => b[pk] ?? 0).reduce((a, b) => a + b, 0);
    const fhPoints = fields.pokerSection.fullHouse.computedPoints?.[pk] ?? 0;
    const fhBonus = fhPoints > 0 ? 50 : 0;
    const completeBonus = pokerBasic.every((b) => (b[pk] ?? 0) > 0) ? 100 : 0;

    finalTotal[pk] = (mountainTotal[pk] ?? 0) + pokerSum + fhBonus + completeBonus;
  }
  fields.pokerSection.result.computedPoints = finalTotal;

  return fields;
}

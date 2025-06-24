// src/utils/generateDiceSummary.ts
import type { IDiceFormSections, PlayerKey } from '@views/dice/diceForm.types';

export function generateDiceSummary(fields: IDiceFormSections<number>): string {
  const list = fields.statsSection?.list ?? {};
  const playerKeys = Object.keys(list) as PlayerKey<number>[];

  // 1) Wyciągamy dane dla górki
  const mountainRows = Object.values(fields.mountainSection).filter(
    (r) => r.fieldType.variant !== 'resultTitle'
  );

  const mountainResult = fields.mountainSection.result.computedPoints ?? {};

  const pokerRows = Object.values(fields.pokerSection).filter(
    (r) => r.fieldType.variant !== 'resultTitle'
  );
  const finalResult = fields.pokerSection.result.computedPoints ?? {};

  // 3) Obliczamy sumy bazowe i premie dla górki
  const mountainBase: Record<string, number> = {};
  const mountainBonus: Record<string, number> = {};
  playerKeys.forEach((pk) => {
    const base = mountainRows.reduce((sum, r) => sum + (r.computedPoints?.[pk] ?? 0), 0);
    const total = mountainResult[pk] ?? 0;
    mountainBase[pk] = base;
    mountainBonus[pk] = total - base;
  });

  // 4) Obliczamy sumę bazową pokera
  const pokerBase: Record<string, number> = {};
  playerKeys.forEach((pk) => {
    pokerBase[pk] = pokerRows.reduce((sum, r) => sum + (r.computedPoints?.[pk] ?? 0), 0);
  });

  // 5) Premia za fullHouse (+50 jeśli >0)
  const fullHouseBonus: Record<string, number> = {};
  playerKeys.forEach((pk) => {
    const fh = fields.pokerSection.fullHouse.computedPoints?.[pk] ?? 0;
    fullHouseBonus[pk] = fh > 0 ? 50 : 0;
  });

  // 6) Premia 100 pkt jeśli żaden pokerowy wiersz nie jest zerem
  const pokerCompleteBonus: Record<string, number> = {};
  playerKeys.forEach((pk) => {
    const ok = pokerRows.every((r) => (r.computedPoints?.[pk] ?? 0) > 0);
    pokerCompleteBonus[pk] = ok ? 100 : 0;
  });

  // 7) Sortujemy graczy po wyniku końcowym
  const finalList = playerKeys.map((pk) => ({
    pk,
    label: list[pk].label,
    score: finalResult[pk] ?? 0,
  }));
  finalList.sort((a, b) => b.score - a.score);

  // 8) Wyłaniamy zwycięzców i przegranych
  const best = finalList[0]?.score ?? 0;
  const worst = finalList[finalList.length - 1]?.score ?? 0;
  const winners = finalList.filter((p) => p.score === best).map((p) => p.label);
  const losers = finalList.filter((p) => p.score === worst).map((p) => p.label);

  // 9) Budujemy markdown
  const md = `## Podsumowanie rozgrywki

**Zwycięzc${winners.length > 1 ? 'y' : 'a'}:** ${winners.join(', ')}

**Przegran${losers.length > 1 ? 'i' : 'y'}:** ${losers.join(', ')}

### Wyniki ogólne

|  |  |  |
| --- | --- | --- |
${finalList.map((p, i) => `| ${i + 1} | ${p.label} | ${p.score} |`).join('\n')}

#### Premie
${playerKeys
  .map((pk) => {
    const name = list[pk].label;
    const bonus = mountainBonus[pk];
    const fhB = fullHouseBonus[pk];
    const pcB = pokerCompleteBonus[pk];
    return (
      `- **${name}**: ` +
      ' > ' +
      (bonus > 0 ? 'górka + ' + bonus : '') +
      (fhB > 0 ? ' Poker + 50,' : '') +
      (pcB > 0 ? ' komplet + 100' : '') +
      (fhB <= 0 && pcB <= 0 ? ' brak' : '')
    );
  })
  .join('\n')}
`;
  return md;
}

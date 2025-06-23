import type { IDiceFormSections } from '@views/dice/diceForm.types';

export function generateDiceSummary(fields: IDiceFormSections<number>): string {
  let md = '# Podsumowanie rozgrywki\n\n';

  // np. góra
  md += '## Górka\n';
  Object.values(fields.mountainSection).forEach((r) => {
    const rowLabel = r.fieldType.label;
    Object.entries(r.computedPoints ?? {}).forEach(([playerKey, pts]) => {
      md += `- ${rowLabel} – ${playerKey}: ${pts}\n`;
    });
  });

  // poker
  md += '\n## Poker\n';
  Object.values(fields.pokerSection).forEach((r) => {
    const rowLabel = r.fieldType.label;
    Object.entries(r.computedPoints ?? {}).forEach(([playerKey, pts]) => {
      md += `- ${rowLabel} – ${playerKey}: ${pts}\n`;
    });
  });

  // finałowy wynik
  const final = fields.pokerSection.result.computedPoints ?? {};
  md += '\n## Wynik ogólny\n';
  Object.entries(final).forEach(([playerKey, pts]) => {
    md += `- ${playerKey}: **${pts}**\n`;
  });

  return md;
}

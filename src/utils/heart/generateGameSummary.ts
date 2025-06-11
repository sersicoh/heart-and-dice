// utils/generateGameSummary.ts

import type { IFormRow, IFormSections, IFromNamesSection } from '@views/heart/heartForm.types';

function getPlayersAndScores(
  names: IFromNamesSection['names'],
  computedPoints: IFormRow['computedPoints']
): { name: string; score: number }[] {
  const mapping = [
    { nameField: 'player1' as const, scoreField: 'p1' as const },
    { nameField: 'player2' as const, scoreField: 'p2' as const },
    { nameField: 'player3' as const, scoreField: 'p3' as const },
    { nameField: 'player4' as const, scoreField: 'p4' as const },
  ];

  const players: { name: string; score: number }[] = [];

  for (const { nameField, scoreField } of mapping) {
    const label = names[nameField]?.label;
    if (label) {
      players.push({
        name: label,
        score: computedPoints?.[scoreField] ?? 0,
      });
    }
  }

  return players;
}

function sortPlayers(players: { name: string; score: number }[], ascending = false) {
  return players.sort((a, b) => (ascending ? a.score - b.score : b.score - a.score));
}

function getWinners(sortedPlayers: { name: string; score: number }[]) {
  if (!sortedPlayers.length) return [];
  const bestScore = sortedPlayers[0].score; // Pierwszy po sortowaniu to "najlepszy"
  return sortedPlayers.filter((p) => p.score === bestScore).map((p) => p.name);
}

function buildTableRows(players: { name: string; score: number }[]) {
  return players
    .map((player, index) => `| ${index + 1}. | ${player.name} | ${player.score} |`)
    .join('\n');
}

export function generateGameSummary(fields: IFormSections): string {
  const finalResultRow = fields.resultSection?.result;
  if (!finalResultRow) {
    return 'Brak wyników końcowych.';
  }

  const finalPlayers = getPlayersAndScores(
    fields.namesSection.names,
    finalResultRow.computedPoints
  );
  const finalSorted = sortPlayers(finalPlayers, false);
  const finalWinners = getWinners(finalSorted);

  let mainTitle: string;
  if (finalWinners.length === 1) {
    mainTitle = `Zwycięzcą gry zostaje **${finalWinners[0]}**, gratulacje!`;
  } else if (finalWinners.length > 1) {
    const formattedWinners = finalWinners.map((w) => `**${w}**`).join(', ');
    mainTitle = `Mamy remis! Zwycięzcami zostają: ${formattedWinners}`;
  } else {
    mainTitle = 'Nie udało się ustalić zwycięzcy...'; // teoretycznie sytuacja niemożliwa
  }

  const overallTable = `
| | | |
| --- | --- | --- |
${buildTableRows(finalSorted)}
`.trim();

  let heartTable = '';
  const heartResultRow = fields.heartSection?.result;
  if (heartResultRow) {
    const heartPlayers = getPlayersAndScores(
      fields.namesSection.names,
      heartResultRow.computedPoints
    );
    // Rosnąco
    const heartSorted = sortPlayers(heartPlayers, true);
    heartTable = `
#### Przebieg rozgrywki kierki (punkty karne)

| | | |
| --- | --- | --- |
${buildTableRows(heartSorted)}
`.trim();
  }

  let raceTable = '';
  const raceResultRow = fields.raceSection?.result;
  if (raceResultRow) {
    const racePlayers = getPlayersAndScores(
      fields.namesSection.names,
      raceResultRow.computedPoints
    );
    const raceSorted = sortPlayers(racePlayers, false);
    raceTable = `
#### Przebieg rozgrywki wyścig

| | | |
| --- | --- | --- |
${buildTableRows(raceSorted)}
`.trim();
  }

  const markdown = `
### ${mainTitle}

#### Wyniki ogólne

${overallTable}

${heartTable ? '\n\n' + heartTable + '\n' : ''}

${raceTable ? '\n\n' + raceTable + '\n' : ''}
`.trim();

  return markdown;
}

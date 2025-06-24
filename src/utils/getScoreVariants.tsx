// src/utils/getScoreVariants.ts
import type { DiceFieldVariant, PlayerKey, TDicePlayerScores } from '@views/dice/diceForm.types';

type ScoreVariant = Extract<DiceFieldVariant, 'winner' | 'manyWinner' | 'looser' | 'manyLooser'>;

export function getScoreVariants<N extends number>(
  scores: TDicePlayerScores<N>
): Partial<Record<PlayerKey<N>, ScoreVariant>> {
  const entries = Object.entries(scores) as [PlayerKey<N>, number][];

  if (entries.length === 0) {
    return {};
  }

  const vals = entries.map(([, pts]) => pts);
  const max = Math.max(...vals);
  const min = Math.min(...vals);

  const winners = entries.filter(([, pts]) => pts === max).map(([k]) => k);
  const losers = entries.filter(([, pts]) => pts === min).map(([k]) => k);

  const out: Partial<Record<PlayerKey<N>, ScoreVariant>> = {};

  winners.forEach((k) => {
    out[k] = winners.length > 1 ? 'manyWinner' : 'winner';
  });
  losers.forEach((k) => {
    out[k] = losers.length > 1 ? 'manyLooser' : 'looser';
  });

  return out;
}

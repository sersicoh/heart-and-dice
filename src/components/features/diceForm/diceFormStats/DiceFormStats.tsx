// src/components/features/diceForm/diceFormStats/DiceFormStats.tsx
import React from 'react';

import Container from '@components/common/container/Container';
import { DiceFieldsRow } from '@components/common/diceFieldsRow/DiceFieldsRow';
import type { DiceFieldVariant, PlayerKey } from '@views/dice/diceForm.types';

import { useDiceStore } from '@store/diceStore';
import { getScoreVariants } from '@utils/getScoreVariants';
import { useMyTheme } from '@hooks/useMyTheme';

type UICell = { variant: DiceFieldVariant; value: string | number | null };
type UIRow = { cells: UICell[] };

const oneCellRow = (text: string, v: DiceFieldVariant): UIRow => ({
  cells: [{ variant: v, value: text }],
});
const makeCells = (
  name: string,
  nameVar: DiceFieldVariant,
  pts: number,
  ptsVar: DiceFieldVariant
): UIRow => ({
  cells: [
    { variant: nameVar, value: name },
    { variant: ptsVar, value: pts },
  ],
});

interface Props {
  /** który gracz jest aktywny (0-based) */
  currentPlayerIdx: number;
}

export const DiceFormStats: React.FC<Props> = ({ currentPlayerIdx }) => {
  const { theme } = useMyTheme();
  const { players, fields } = useDiceStore();
  if (!fields) return null;

  const scores = fields.pokerSection.result.computedPoints ?? {};

  const header: UIRow[] = [oneCellRow('Wyniki ogólne', 'title')];

  const variants = getScoreVariants(scores);

  const statsRows = players.map((p, idx) => {
    const key = `player${idx + 1}` as PlayerKey<number>;
    const pts = scores[key] ?? 0;

    const nameVar: DiceFieldVariant = idx === currentPlayerIdx ? 'activePlayer' : 'name';

    const ptsVar: DiceFieldVariant = variants[key] ?? 'inputFilled';

    return makeCells(p.name, nameVar, pts, ptsVar);
  });

  const renderSection = (rows: UIRow[], padding = '8px') => (
    <Container
      variant='flex'
      flexDirection='column'
      gap='8px'
      borderRadius='8px'
      backgroundColor={theme.colors.frameBackground}
      padding={padding}
    >
      {rows.map((r, i) => (
        <Container key={i}>
          <DiceFieldsRow row={r} />
        </Container>
      ))}
    </Container>
  );

  return (
    <Container variant='flex' flexDirection='column' gap='16px' width='100%'>
      {renderSection(header, '20px')}
      {renderSection(statsRows, '8px')}
    </Container>
  );
};

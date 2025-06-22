import Container from '@components/common/container/Container';
import { DiceFieldsRow } from '@components/common/diceFieldsRow/DiceFieldsRow';
import type { DiceFieldVariant } from '@views/dice/diceForm.types';

import { useDiceStore } from '@store/diceStore';
import { useMyTheme } from '@hooks/useMyTheme';

type UICell = { variant: DiceFieldVariant; value: string | number | null };
type UIRow = { cells: UICell[] };

const oneCellRow = (text: string, v: DiceFieldVariant): UIRow => ({
  cells: [{ variant: v, value: text }],
});

const makeCells = (
  name: string,
  nameV: DiceFieldVariant,
  pts: number,
  ptsV: DiceFieldVariant
): UIRow => ({
  cells: [
    { variant: nameV, value: name },
    { variant: ptsV, value: pts },
  ],
});

const renderSection = (
  rows: UIRow[],
  colors: { frameBackground: string },
  padding: string = '8px'
) => (
  <Container
    variant='flex'
    flexDirection='column'
    gap='8px'
    backgroundColor={colors.frameBackground}
    padding={padding}
  >
    {rows.map((r, i) => (
      <Container key={i}>
        <DiceFieldsRow row={r} />
      </Container>
    ))}
  </Container>
);

export const DiceFormStats = () => {
  const { theme } = useMyTheme();
  const { fields } = useDiceStore();
  if (!fields) return null;

  const list = fields.statsSection?.list;
  if (!list) return null;

  const scoresRow = fields.pokerSection.result.computedPoints ?? {};

  const headerRows: UIRow[] = [oneCellRow('Wyniki ogólne', 'title')];

  const playerKeys = Object.keys(list) as (keyof typeof list)[];
  const statsRows: UIRow[] = playerKeys.map((k) => {
    const cell = list[k];
    const points = scoresRow[k] ?? 0;

    let ptsVar: DiceFieldVariant;
    if (cell.variant === 'winner') {
      ptsVar = 'winner';
    } else if (cell.variant === 'manyWinner') {
      ptsVar = 'manyWinner';
    } else if (cell.variant === 'looser') {
      ptsVar = 'looser';
    } else if (cell.variant === 'manyLooser') {
      ptsVar = 'manyLooser';
    } else {
      ptsVar = 'inputFilled';
    }

    return makeCells(cell.label, cell.variant, points, ptsVar);
  });

  /* ---------- render ---------- */
  return (
    <Container variant='flex' flexDirection='column' gap='8px' width='100%'>
      {renderSection(headerRows, theme.colors, '20px')} {/* padding 20px */}
      {renderSection(statsRows, theme.colors)} {/* padding 8px */}
    </Container>
  );
};

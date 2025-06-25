// src/components/features/diceForm/diceFormStats/DiceFormStats.tsx
import React from 'react';

import { BasicButton } from '@components/common/basicButton/BasicButton';
import Container from '@components/common/container/Container';
import { DiceFieldsRow } from '@components/common/diceFieldsRow/DiceFieldsRow';
import type { DiceFieldVariant, PlayerKey } from '@views/dice/diceForm.types';

import { useDiceStore } from '@store/diceStore';
import { getScoreVariants } from '@utils/getScoreVariants';
import { useMyTheme } from '@hooks/useMyTheme';

type UICell = { variant: DiceFieldVariant; value: string | number | null };
export type UIRow = { cells: UICell[] };

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
  onUndo: () => void;
  onNext: () => void;
  onFinish: () => void;
  canUndo: boolean;
  canNext: boolean;
  allDone: boolean;
}

export const DiceFormStats: React.FC<Props> = ({
  currentPlayerIdx,
  onUndo,
  onNext,
  onFinish,
  canUndo,
  canNext,
  allDone,
}) => {
  const { theme, isMobile } = useMyTheme();
  const { players, fields } = useDiceStore();
  if (!fields) return null;

  const scores = fields.pokerSection.result.computedPoints ?? {};
  // pojedynczy wiersz nagłówka
  const header: UIRow = oneCellRow('Wyniki ogólne', 'title');
  const variants = getScoreVariants(scores);

  const statsRows: UIRow[] = players.map((p, idx) => {
    const key = `player${idx + 1}` as PlayerKey<number>;
    const pts = scores[key] ?? 0;

    const nameVar: DiceFieldVariant = idx === currentPlayerIdx ? 'activePlayer' : 'name';
    const ptsVar: DiceFieldVariant = variants[key] ?? 'inputFilled';

    return makeCells(p.name, nameVar, pts, ptsVar);
  });

  const renderSection = (
    content: Array<UIRow | React.ReactNode>,
    padding = isMobile ? '4px' : '8px'
  ) => {
    const children = content.map((item, idx) => {
      const isHeader =
        idx === 0 &&
        typeof item === 'object' &&
        item !== null &&
        'cells' in item &&
        Array.isArray((item as UIRow).cells) &&
        (item as UIRow).cells.length === 1 &&
        (item as UIRow).cells[0].variant === 'title';

      if (
        typeof item === 'object' &&
        item !== null &&
        'cells' in item &&
        Array.isArray((item as UIRow).cells)
      ) {
        return (
          <Container
            key={idx}
            padding={isHeader ? (isMobile ? '0 0 4px 0' : '0 0 8px 0') : undefined}
          >
            <DiceFieldsRow row={item as UIRow} />
          </Container>
        );
      }
      return <Container key={idx}>{item as React.ReactNode}</Container>;
    });

    return (
      <Container
        variant='flex'
        flexDirection='column'
        gap={isMobile ? '4px' : '8px'}
        borderRadius={isMobile ? '4px' : '8px'}
        backgroundColor={theme.colors.frameBackground}
        padding={padding}
      >
        {children}
      </Container>
    );
  };

  return (
    <Container variant='flex' flexDirection='column' gap={isMobile ? '4px' : '12px'} width='100%'>
      {renderSection(
        [
          <BasicButton key='undo' onClick={onUndo} content='Cofnij' disabled={!canUndo} />,
          <BasicButton
            key='next'
            onClick={allDone ? onFinish : onNext}
            content={allDone ? 'Podsumowanie' : 'Następny'}
            disabled={!canNext && !allDone}
          />,
        ],
        isMobile ? '4px' : '8px'
      )}

      {/* Jedna sekcja: najpierw header, potem wszystkie statsRows */}
      {renderSection([header, ...statsRows])}
    </Container>
  );
};

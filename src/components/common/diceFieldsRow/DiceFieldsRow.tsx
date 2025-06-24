import React from 'react';

import Container from '@components/common/container/Container';
import { DiceFormField } from '@components/common/diceFormField/DiceFormField';
import type {
  DiceFieldVariant,
  IDiceCurrentPlayerRow,
  IDiceFormRow,
  InputKey,
} from '@views/dice/diceForm.types';

import { useMyTheme } from '@hooks/useMyTheme';

export type UICell = {
  variant: DiceFieldVariant;
  value: string | number | null;
  isEditable?: boolean;
  onChangeValue?: (v: number | null) => void;
};
export type UIRow = { cells: UICell[] };

/* ---------- type-guards ---------- */
const isFormRow = (x: unknown): x is IDiceFormRow<number> =>
  !!x && typeof x === 'object' && 'inputs' in x && 'fieldType' in x;

const isCurrentRow = (x: unknown): x is IDiceCurrentPlayerRow =>
  !!x && typeof x === 'object' && 'title' in x && 'player' in x;

const isUIRow = (x: unknown): x is UIRow => !!x && typeof x === 'object' && 'cells' in x;

/* ---------- komponent ---------- */
interface Props {
  row: IDiceFormRow<number> | IDiceCurrentPlayerRow | UIRow;
}

export const DiceFieldsRow: React.FC<Props> = ({ row }) => {
  const { isMobile } = useMyTheme();
  if (!row) return null;

  let cells: UICell[] = [];

  if (isFormRow(row)) {
    cells.push({ variant: row.fieldType.variant, value: row.fieldType.label });

    (Object.keys(row.inputs) as InputKey<number>[]).forEach((k) => {
      const c = row.inputs[k];
      cells.push({
        variant: c.variant,
        value: c.value,
        isEditable: c.isEditable,
        onChangeValue: c.onChangeValue,
      });
    });
  } else if (isCurrentRow(row)) {
    cells = [
      { variant: row.title.variant, value: row.title.label },
      { variant: row.player.variant, value: row.player.label },
    ];
  } else if (isUIRow(row)) {
    cells = row.cells;
  } else {
    cells = Object.values(row as Record<string, UICell[]>).flat();
  }

  return (
    <Container variant='flex' gap={isMobile ? '4px' : '8px'} width='100%'>
      {cells.map((c, idx) => (
        <DiceFormField
          key={idx}
          variant={c.variant}
          value={c.value}
          isEditable={c.isEditable}
          onChangeValue={c.onChangeValue}
        />
      ))}
    </Container>
  );
};

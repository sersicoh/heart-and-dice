import Container from '@components/common/container/Container';
import type { UIRow } from '@components/common/diceFieldsRow/DiceFieldsRow';
import { DiceFieldsRow } from '@components/common/diceFieldsRow/DiceFieldsRow';
import type { IDiceCurrentPlayerRow, IDiceFormRow } from '@views/dice/diceForm.types';

import { useDiceStore } from '@store/diceStore';
import { useMyTheme } from '@hooks/useMyTheme';

type DiceFormInputProps = {
  buildUIRow: (r: IDiceFormRow<number>) => UIRow;
  currentPlayerIdx: number;
};

export const DiceFormInput = ({ buildUIRow, currentPlayerIdx }: DiceFormInputProps) => {
  const { theme } = useMyTheme();
  const { players, fields } = useDiceStore();

  if (!fields) return null;

  const { mountainSection, pokerSection } = fields;

  const nameRow: IDiceCurrentPlayerRow = {
    title: { label: 'Aktualny gracz', variant: 'title' },
    player: { label: players[currentPlayerIdx]?.name ?? '', variant: 'activeFieldsType' },
  };

  const renderSection = (
    rows: IDiceFormRow<number>[],
    bgColor: string,
    padding: string = '8px'
  ) => {
    const normalRows = rows.filter((r) => r.fieldType.variant !== 'resultTitle');
    const summaryRow = rows.find((r) => r.fieldType.variant === 'resultTitle');

    return (
      <Container
        variant='flex'
        flexDirection='column'
        gap='8px'
        backgroundColor={bgColor}
        padding={padding}
        borderRadius='8px'
      >
        <Container variant='grid' gridTemplateColumns='1fr 1fr' gap='8px'>
          {normalRows.map((r) => (
            <DiceFieldsRow key={r.fieldType.rowId} row={buildUIRow(r)} />
          ))}
        </Container>
        {summaryRow && <DiceFieldsRow row={buildUIRow(summaryRow)} />}
      </Container>
    );
  };

  return (
    <Container variant='flex' flexDirection='column' gap='16px' width='100%'>
      <Container
        variant='flex'
        backgroundColor={theme.colors.frameBackground}
        padding='20px'
        borderRadius='8px'
      >
        <DiceFieldsRow row={nameRow} />
      </Container>

      {renderSection(Object.values(mountainSection), theme.colors.frameBackground)}
      {renderSection(Object.values(pokerSection), theme.colors.frameBackground)}
    </Container>
  );
};

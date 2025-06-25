import Container from '@components/common/container/Container';
import type { UIRow } from '@components/common/diceFieldsRow/DiceFieldsRow';
import { DiceFieldsRow } from '@components/common/diceFieldsRow/DiceFieldsRow';
import type { IDiceFormRow } from '@views/dice/diceForm.types';

import { useDiceStore } from '@store/diceStore';
import { useMyTheme } from '@hooks/useMyTheme';

type DiceFormInputProps = {
  buildUIRow: (r: IDiceFormRow<number>) => UIRow;
};

export const DiceFormInput = ({ buildUIRow }: DiceFormInputProps) => {
  const { theme, isMobile } = useMyTheme();
  const { fields } = useDiceStore();

  if (!fields) return null;

  const { mountainSection, pokerSection } = fields;

  const renderSection = (
    rows: IDiceFormRow<number>[],
    bgColor: string,
    padding: string = isMobile ? '4px' : '8px'
  ) => {
    const normalRows = rows.filter((r) => r.fieldType.variant !== 'resultTitle');
    const summaryRow = rows.find((r) => r.fieldType.variant === 'resultTitle');

    return (
      <Container
        variant='flex'
        flexDirection='column'
        gap={isMobile ? '8px' : '16px'}
        backgroundColor={bgColor}
        padding={padding}
        borderRadius={isMobile ? '4px' : '8px'}
      >
        <Container variant='grid' gridTemplateColumns='1fr 1fr' gap={isMobile ? '4px' : '8px'}>
          {normalRows.map((r) => (
            <DiceFieldsRow key={r.fieldType.rowId} row={buildUIRow(r)} />
          ))}
        </Container>
        {summaryRow && <DiceFieldsRow row={buildUIRow(summaryRow)} />}
      </Container>
    );
  };

  return (
    <Container variant='flex' flexDirection='column' gap={isMobile ? '4px' : '12px'} width='100%'>
      {renderSection(Object.values(mountainSection), theme.colors.frameBackground)}
      {renderSection(Object.values(pokerSection), theme.colors.frameBackground)}
    </Container>
  );
};

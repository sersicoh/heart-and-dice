import Container from '@components/common/container/Container';
import { DiceFormRow } from '@components/common/diceFormRow/DiceFormRow';
import { HeartFormField } from '@components/common/formField/HeartFormField';
import type { IDiceFormInputChange, IDiceFormSections } from '@views/dice/diceForm.types';

import { useMyTheme } from '@hooks/useMyTheme';

interface Props {
  sectionName: keyof IDiceFormSections;
  section: IDiceFormSections;
  onInputValueChange?: IDiceFormInputChange;
  players: { name: string }[];
  activePlayerIndex: number;
}

export const FormSectionDice = ({
  sectionName,
  section,
  onInputValueChange,
  players,
  activePlayerIndex,
}: Props) => {
  const { isMobile, theme } = useMyTheme();

  return (
    <Container
      variant='flex'
      flexDirection='column'
      gap={'4px'}
      width='100%'
      backgroundColor={theme.colors.frameBackground}
      padding={isMobile ? '4px' : '12px'}
    >
      {Object.entries(section).map(([rowKey, rowValue]) => {
        return (
          <DiceFormRow
            key={rowKey}
            rowKey={rowKey}
            rowData={rowValue}
            players={players}
            sectionName={sectionName}
            onInputValueChange={onInputValueChange}
          />
        );
      })}
    </Container>
  );
};

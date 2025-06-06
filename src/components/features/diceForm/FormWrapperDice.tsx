import Container from '@components/common/container/Container';
import { FormSectionDice } from '@components/features/diceForm/diceFormSection/FormSectionDice';
import type { IDiceFormInputChange, IDiceFormSections } from '@views/dice/diceForm.types';

import { useMyTheme } from '@hooks/useMyTheme';

interface Props {
  diceFields: IDiceFormSections;
  onInputValueChange?: IDiceFormInputChange;
  players: { name: string }[];
  activePlayerIndex: number;
}

export const FormWrapperDice = ({
  diceFields,
  onInputValueChange,
  players,
  activePlayerIndex,
}: Props) => {
  const { isMobile } = useMyTheme();

  return (
    <Container variant='flex' flexDirection='column' gap={isMobile ? '4px' : '8px'}>
      {Object.entries(diceFields).map(([sectionName, sectionValue]) => (
        <FormSectionDice
          key={sectionName}
          sectionName={sectionName as keyof IDiceFormSections}
          section={sectionValue as any}
          onInputValueChange={onInputValueChange}
          players={players}
          activePlayerIndex={activePlayerIndex}
        />
      ))}
    </Container>
  );
};

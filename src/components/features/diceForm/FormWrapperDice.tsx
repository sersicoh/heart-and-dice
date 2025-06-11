import Container from '@components/common/container/Container';
import { FormSectionDice } from '@components/features/diceForm/diceFormSection/FormSectionDice';
import type { IDiceFormInputChange, IDiceFormSections } from '@views/dice/diceForm.types';

import type { Player } from '@store/store.types';
import { useMyTheme } from '@hooks/useMyTheme';

interface Props {
  diceFields: IDiceFormSections;
  onInputValueChange?: IDiceFormInputChange;
  players: Player[];
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
          section={sectionValue}
          onInputValueChange={onInputValueChange}
          players={players}
          activePlayerIndex={activePlayerIndex}
        />
      ))}
    </Container>
  );
};

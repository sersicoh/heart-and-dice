import Container from '@components/common/container/Container';
import { DiceFormInput } from '@components/features/diceForm/diceFormInput/DiceFormInput';
import { DiceFormStats } from '@components/features/diceForm/diceFormStats/DiceFormStats';

import { useMyTheme } from '@hooks/useMyTheme';

export const FormWrapperDice = () => {
  const { isMobile } = useMyTheme();

  return (
    <Container variant='grid' gridTemplateColumns='2fr 1fr' gap={isMobile ? '4px' : '12px'}>
      <Container variant='flex' gap={isMobile ? '2px' : '8px'}>
        <DiceFormInput />
      </Container>
      <Container variant='flex' gap={isMobile ? '2px' : '8px'}>
        <DiceFormStats />
      </Container>
    </Container>
  );
};

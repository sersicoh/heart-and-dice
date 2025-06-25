import Container from '@components/common/container/Container';
import type { UIRow } from '@components/common/diceFieldsRow/DiceFieldsRow';
import { DiceFormInput } from '@components/features/diceForm/diceFormInput/DiceFormInput';
import { DiceFormStats } from '@components/features/diceForm/diceFormStats/DiceFormStats';
import type { IDiceFormRow } from '@views/dice/diceForm.types';

import { useMyTheme } from '@hooks/useMyTheme';

type FormWrapperProps = {
  buildUIRow: (r: IDiceFormRow<number>) => UIRow;
  currentPlayerIdx: number;
  onUndo: () => void;
  onNext: () => void;
  onFinish: () => void;
  canUndo: boolean;
  canNext: boolean;
  allDone: boolean;
};

export const FormWrapperDice = ({
  buildUIRow,
  currentPlayerIdx,
  onUndo,
  onNext,
  onFinish,
  canUndo,
  canNext,
  allDone,
}: FormWrapperProps) => {
  const { isMobile } = useMyTheme();

  return (
    <Container variant='grid' gridTemplateColumns='2fr 1fr' gap={isMobile ? '4px' : '12px'}>
      <Container variant='flex' gap={isMobile ? '2px' : '8px'}>
        <DiceFormInput buildUIRow={buildUIRow} />
      </Container>
      <Container variant='flex' gap={isMobile ? '2px' : '8px'}>
        <DiceFormStats
          currentPlayerIdx={currentPlayerIdx}
          onUndo={onUndo}
          onNext={onNext}
          onFinish={onFinish}
          canUndo={canUndo}
          canNext={canNext}
          allDone={allDone}
        />
      </Container>
    </Container>
  );
};

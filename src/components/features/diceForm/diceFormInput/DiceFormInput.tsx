import Container from '@components/common/container/Container';

import { useDiceStore } from '@store/diceStore';

export const DiceFormInput = () => {
  const { fields } = useDiceStore();
  if (!fields) return null;

  /* -------- JSX -------- */
  return (
    <Container variant='flex' flexDirection='column' gap='8px' width='100%'>
      dupa
    </Container>
  );
};

// @views/heart/HeartForm.tsx
import Container from '@components/common/container/Container';
import { FormWrapper } from '@components/common/form/FormWrapper';

import { useHeartFormLogic } from '@hooks/useHeartForm';

export const HeartForm = () => {
  const { fields, goToNextRow, undoLastRow, setInputValue } = useHeartFormLogic();

  return (
    <Container padding='0 8px'>
      <FormWrapper heartsFields={fields} onInputValueChange={setInputValue} />
      <button onClick={goToNextRow}>Następny wiersz</button>
      <button onClick={undoLastRow}>Cofnij</button>
    </Container>
  );
};

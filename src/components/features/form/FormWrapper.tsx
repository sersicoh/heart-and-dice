import Container from '@components/common/container/Container';
import { FormSection } from '@components/features/form/formSection/FormSection';
import type { IFormInputChange, IFormSections } from '@views/heart/form.types';

import { useMyTheme } from '@hooks/useMyTheme';

export const FormWrapper = ({
  heartsFields,
  onInputValueChange,
}: {
  heartsFields: IFormSections;
  onInputValueChange?: IFormInputChange;
}) => {
  const { isMobile } = useMyTheme();

  return (
    <Container variant='flex' flexDirection='column' gap={isMobile ? '4px' : '8px'}>
      {Object.entries(heartsFields).map(([sectionName, sectionValue]) => {
        return (
          <FormSection
            key={sectionName}
            sectionName={sectionName as keyof IFormSections}
            section={sectionValue}
            onInputValueChange={onInputValueChange}
          />
        );
      })}
    </Container>
  );
};

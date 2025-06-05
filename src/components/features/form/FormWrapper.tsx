import Container from '@components/common/container/Container';
import { FormSection } from '@components/features/form/formSection/FormSection';
import type { IHeartFormInputChange, IHeartFormSections } from '@views/heart/heartForm.types';

import { useMyTheme } from '@hooks/useMyTheme';

export const FormWrapper = ({
  heartsFields,
  onInputValueChange,
}: {
  heartsFields: IHeartFormSections;
  onInputValueChange?: IHeartFormInputChange;
}) => {
  const { isMobile } = useMyTheme();

  return (
    <Container variant='flex' flexDirection='column' gap={isMobile ? '4px' : '8px'}>
      {Object.entries(heartsFields).map(([sectionName, sectionValue]) => {
        return (
          <FormSection
            key={sectionName}
            sectionName={sectionName as keyof IHeartFormSections}
            section={sectionValue}
            onInputValueChange={onInputValueChange}
          />
        );
      })}
    </Container>
  );
};

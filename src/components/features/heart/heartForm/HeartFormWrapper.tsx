import Container from '@components/common/container/Container';
import { HeartFormSection } from '@components/features/heart/heartForm/heartFormSection/HeartFormSection';
import type { IFormInputChange, IFormSections } from '@views/heart/heartForm.types';

import { useMyTheme } from '@hooks/useMyTheme';

export const HeartFormWrapper = ({
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
          <HeartFormSection
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

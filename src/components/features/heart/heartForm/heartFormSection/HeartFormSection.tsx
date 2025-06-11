import Container from '@components/common/container/Container';
import { FormRow } from '@components/common/formRow/FormRow';
import type { IFormInputChange, IFormSections } from '@views/heart/heartForm.types';

import { useMyTheme } from '@hooks/useMyTheme';

interface Props {
  section: IFormSections;
  sectionName: keyof IFormSections;
  onInputValueChange?: IFormInputChange;
}
export const HeartFormSection = ({ section, sectionName, onInputValueChange }: Props) => {
  const { theme, isMobile } = useMyTheme();
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
          <FormRow
            key={rowKey}
            rowKey={rowKey}
            rowData={rowValue}
            sectionName={sectionName}
            onInputValueChange={onInputValueChange}
          />
        );
      })}
    </Container>
  );
};

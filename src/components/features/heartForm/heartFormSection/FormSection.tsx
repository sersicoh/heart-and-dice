import Container from '@components/common/container/Container';
import { HeartFormRow } from '@components/common/heartFormRow/HeartFormRow';
import type { IHeartFormInputChange, IHeartFormSections } from '@views/heart/heartForm.types';

import { useMyTheme } from '@hooks/useMyTheme';

interface Props {
  section: IHeartFormSections;
  sectionName: keyof IHeartFormSections;
  onInputValueChange?: IHeartFormInputChange;
}
export const FormSection = ({ section, sectionName, onInputValueChange }: Props) => {
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
          <HeartFormRow
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

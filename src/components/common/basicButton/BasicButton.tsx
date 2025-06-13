import { StyledBasicButton } from '@components/common/basicButton/basicButton.styles';
import type { IBasicButton } from '@components/common/basicButton/basicButton.types';

export const BasicButton = ({
  onClick,
  content: label,
  disabled,
  borderRadius,
  fontSize,
  padding,
  variant = 'default',
}: IBasicButton) => {
  return (
    <StyledBasicButton
      variant={variant}
      fontSize={fontSize}
      disabled={disabled}
      padding={padding}
      borderRadius={borderRadius}
      onClick={onClick}
    >
      {label}
    </StyledBasicButton>
  );
};

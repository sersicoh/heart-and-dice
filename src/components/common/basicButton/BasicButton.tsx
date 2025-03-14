import { StyledBasicButton } from '@components/common/basicButton/basicButton.styles';
import type { IBasicButton } from '@components/common/basicButton/basicButton.types';

export const BasicButton = ({
  onClick,
  content: label,
  disabled,
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
      onClick={onClick}
    >
      {label}
    </StyledBasicButton>
  );
};

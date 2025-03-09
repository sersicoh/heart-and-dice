import { StyledBasicButton } from '@components/common/basicButton/basicButton.styles';
import type { IBasicButton } from '@components/common/basicButton/basicButton.types';

export const BasicButton = ({ onClick, label, disabled, fontSize }: IBasicButton) => {
  return (
    <StyledBasicButton fontSize={fontSize} disabled={disabled} onClick={onClick}>
      {label}
    </StyledBasicButton>
  );
};

import type { ReactNode } from 'react';

import { StyledBasicButton } from '@components/common/basicButton/basicButton.styles';

export const BasicButton = ({
  onClick,
  label,
}: {
  onClick: () => void;
  label: ReactNode | string;
}) => {
  return <StyledBasicButton onClick={onClick}>{label}</StyledBasicButton>;
};

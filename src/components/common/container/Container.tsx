import type { FC } from 'react';

import { StyledContainer } from '@components/common/container/container.styles';
import type { ContainerProps } from '@components/common/container/container.types';

const Container: FC<ContainerProps> = ({ children, variant = 'base', ...rest }) => {
  return (
    <StyledContainer variant={variant} {...rest}>
      {children}
    </StyledContainer>
  );
};

export default Container;

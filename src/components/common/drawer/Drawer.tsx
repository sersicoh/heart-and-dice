import {
  CloseButton,
  DrawerButton,
  DrawerContainer,
  Overlay,
} from '@components/common/drawer/drawer.styles';
import type { IDrawerItems } from '@components/common/drawer/drawer.types';

import { useMyTheme } from '@hooks/useMyTheme';
import CloseSvg from '@assets/svg/close.svg?react';

export const Drawer = ({ isOpen, onClose, items }: IDrawerItems) => {
  const { theme } = useMyTheme();
  return (
    <Overlay isOpen={isOpen} onClick={onClose}>
      <DrawerContainer isOpen={isOpen} onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>
          <CloseSvg width={'40px'} height={'40px'} color={theme.colors.textLight} />
        </CloseButton>
        {items.map((item, index) => (
          <DrawerButton key={index} onClick={item.onClick}>
            {item.label}
          </DrawerButton>
        ))}
      </DrawerContainer>
    </Overlay>
  );
};

import { useMyTheme } from '@hooks/useMyTheme';

import { NavTitle } from '@components/common/navigationBar/navTitle/NavTitle';

import HnDIcon from '@assets/svg/hnd-logo.svg?react';

export const NavigationBar = () => {
  const { theme } = useMyTheme();

  return (
    <>
      <div>
        <HnDIcon width={'100px'} height={'100%'} color={theme.colors.logo} />
      </div>
      <NavTitle />
    </>
  );
};

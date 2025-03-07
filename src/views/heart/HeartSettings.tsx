// @views/heart/HeartSettings.tsx
import Container from '@components/common/container/Container';
import { Title } from '@components/common/title/Title';
import { HeartSettingsWrapper } from '@components/features/heartSettingsWrapper/HeartSettingsWrapper';

import { useMyTheme } from '@hooks/useMyTheme';

export const HeartSettings = () => {
  const { isMobile } = useMyTheme();
  return (
    <Container
      variant='flex'
      flexDirection='column'
      justifyContent='flex-start'
      alignItems='center'
      height='100%'
    >
      <Container
        variant='flex'
        justifyContent='center'
        alignItems='center'
        padding={isMobile ? '16px' : '24px'}
      >
        <Title label='Ustawienia - Kierki' />
      </Container>
      <Container variant='flex' flexDirection='column'>
        <HeartSettingsWrapper />
      </Container>
    </Container>
  );
};

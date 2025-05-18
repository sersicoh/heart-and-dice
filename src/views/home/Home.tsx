import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { BasicButton } from '@components/common/basicButton/BasicButton';
import Container from '@components/common/container/Container';
import { Title } from '@components/common/title/Title';
import { NavTitle } from '@components/features/navigationBar/navTitle/NavTitle';

import { useCustomSnackbar } from '@hooks/useCustomSnackbar';
import { useMyTheme } from '@hooks/useMyTheme';
import HnDIcon from '@assets/svg/hnd-logo.svg?react';

export const Home = () => {
  const navigate = useNavigate();
  const { showSnackbar } = useCustomSnackbar();
  const { theme, isMobile } = useMyTheme();
  // const [diceDisabled, setDiceDisabled] = useState(false);
  const [englishDisabled, setEnglishDisabled] = useState(false);
  return (
    <Container
      variant='grid'
      gap='24px'
      gridTemplateRows='1fr 1fr 1fr'
      margin='0 auto'
      padding={isMobile ? '24px' : '36px'}
      height='100%'
      maxWidth={isMobile ? undefined : '600px'}
    >
      <Container
        variant='flex'
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
        width='100%'
      >
        <HnDIcon
          width={isMobile ? '150px' : '200px'}
          height={isMobile ? '150px' : '200px'}
          color={theme.colors.logo}
        />
        <NavTitle label='Heart and Dice' fontSize={{ tablet: '6rem', mobile: '3.5rem' }} />
      </Container>
      <Container
        variant='flex'
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
        width='100%'
      >
        <Container variant='flex' gap={isMobile ? '16px' : '36px'} width='100%' minHeight='40%'>
          <BasicButton
            onClick={() => navigate('/heart/settings')}
            content={'Kierki'}
            fontSize={{ tablet: '4rem', mobile: '2rem' }}
          />
          <BasicButton
            // onClick={() => {
            //   showSnackbar({
            //     message: `Spokojnie przed Przebrodzinem będą gotowe`,
            //     variant: 'info',
            //   });
            //   setDiceDisabled(true);
            // }}
            onClick={() => navigate('/dice/settings')}
            content={'Kości'}
            // disabled={diceDisabled}
            fontSize={{ tablet: '4rem', mobile: '2rem' }}
          />
        </Container>
      </Container>
      <Container
        variant='flex'
        flexDirection='column'
        alignItems='center'
        justifyContent='flex-end'
        width='100%'
        gap={isMobile ? '16px' : '36px'}
      >
        <Title label='Język / Language' />
        <Container variant='flex' gap={isMobile ? '16px' : '36px'} width='100%'>
          <BasicButton onClick={() => console.log('Polski')} content={'Polski'} />
          <BasicButton
            onClick={() => {
              showSnackbar({ message: `Sorry, it's not ready yet`, variant: 'info' });
              setEnglishDisabled(true);
            }}
            disabled={englishDisabled}
            content={'English'}
          />
        </Container>
      </Container>
    </Container>
  );
};

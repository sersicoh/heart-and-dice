import { useState } from 'react';

import { BasicButton } from '@components/common/basicButton/BasicButton';
import { ConfirmModal } from '@components/common/confirmModal/ConfirmModal';
import Container from '@components/common/container/Container';
import { PlayerInuptTile } from '@components/common/playerInuptTile/PlayerInuptTile';

import { useDiceSettingsLogic } from '@hooks/useDiceSettings';
import { useMyTheme } from '@hooks/useMyTheme';
import PlusIcon from '@assets/svg/plus.svg?react';

export const DiceSettingsWrapper = () => {
  const { isMobile } = useMyTheme();

  const {
    isGameInProgress,
    canStart,
    startGame,
    returnToGame,
    resetAll,
    tempPlayers,
    changeName,
    addPlayerField,
  } = useDiceSettingsLogic();

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  return (
    <Container
      variant='flex'
      flexDirection='column'
      width='100%'
      padding={isMobile ? '8px' : '36px'}
      justifyContent='center'
      alignItems='center'
      height='100%'
      gap={isMobile ? '16px' : '24px'}
    >
      {/* ---------- pola imion ---------- */}
      {tempPlayers.map((playerName, idx) => (
        <PlayerInuptTile
          key={idx}
          idx={idx}
          label={`Gracz ${idx + 1}:`}
          value={playerName}
          placeholder='wpisz imię'
          onChange={changeName}
        />
      ))}

      {/* ---------- przycisk Dodaj gracza ---------- */}
      {tempPlayers.length < 10 && (
        <BasicButton
          padding={isMobile ? '12px' : '16px'}
          onClick={addPlayerField}
          borderRadius={isMobile ? '12px' : '8px'}
          content={
            <PlusIcon width={isMobile ? '40px' : '48px'} height={isMobile ? '40px' : '48px'} />
          }
          aria-label='Dodaj gracza'
        />
      )}

      {/* ---------- przyciski Start / Wróć / Reset ---------- */}
      <Container
        variant='flex'
        flexDirection='column'
        gap={isMobile ? '16px' : '36px'}
        width='100%'
        padding='36px'
      >
        {isGameInProgress ? (
          <BasicButton
            onClick={returnToGame}
            disabled={!canStart}
            content='Wróć do formularza'
            fontSize={{ tablet: '48px', mobile: '24px' }}
          />
        ) : (
          <BasicButton
            onClick={startGame}
            disabled={!canStart}
            content='Start'
            fontSize={{ tablet: '48px', mobile: '24px' }}
          />
        )}

        <BasicButton
          onClick={() => setIsConfirmModalOpen(true)}
          content='Rozpocznij nową grę'
          fontSize={{ tablet: '48px', mobile: '24px' }}
        />

        <ConfirmModal
          isOpen={isConfirmModalOpen}
          onClose={() => setIsConfirmModalOpen(false)}
          title='Rozpocznij nową grę'
          content='Czy na pewno chcesz rozpocząć nową grę? Obecna rozgrywka zostanie zresetowana.'
          onConfirm={() => {
            resetAll();
            setIsConfirmModalOpen(false);
          }}
          confirmText='Tak, resetuj'
          cancelText='Nie'
        />
      </Container>
    </Container>
  );
};

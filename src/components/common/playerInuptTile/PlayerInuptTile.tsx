import type { ChangeEvent } from 'react';

import Container from '@components/common/container/Container';
import {
  StyledInput,
  StyledLabel,
} from '@components/common/playerInuptTile/playerInuptTile.styles';

import { useMyTheme } from '@hooks/useMyTheme';

interface PlayerInuptTile {
  idx: number;
  label: string;
  value: string;
  placeholder: string;
  onChange: (idx: number, newName: string) => void;
}

export const PlayerInuptTile = ({ idx, label, value, onChange, placeholder }: PlayerInuptTile) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(idx, e.target.value);
    }
  };

  const { theme, isMobile, isTablet } = useMyTheme();
  return (
    <Container
      variant='flex'
      width='100%'
      flexDirection='row'
      justifyContent='center'
      alignItems='center'
      backgroundColor={theme.colors.secondaryFormField}
      padding={isMobile ? '12px 12px 12px 24px' : '16px 16px 16px 36px'}
      borderRadius={isTablet ? '8px' : '12px'}
    >
      <StyledLabel>{label}</StyledLabel>
      <StyledInput type='text' value={value} onChange={handleChange} placeholder={placeholder} />
    </Container>
  );
};

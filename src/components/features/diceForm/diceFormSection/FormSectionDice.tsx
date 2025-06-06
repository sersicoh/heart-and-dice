// FormSectionDice.tsx

import React from 'react';

import Container from '@components/common/container/Container';
import { FormField } from '@components/common/formField/FormField';
import type {
  IDiceFormRow,
  IDiceFormSections,
  IDiceNamesFormRow,
} from '@views/dice/diceForm.types';

import { useMyTheme } from '@hooks/useMyTheme';

interface Props {
  sectionName: keyof IDiceFormSections; // 'namesSection' | 'mountainSection' | 'pokerSection' | 'resultSection'
  section: any; // IDiceNamesFormRow for 'namesSection', otherwise Record<string, IDiceFormRow>
  onInputValueChange?: (
    sectionName: keyof IDiceFormSections,
    rowKey: string,
    playerInputKey: `p${number}Input`,
    newValue: number | null
  ) => void;
  players: { name: string }[];
  activePlayerIndex: number;
}

export const FormSectionDice = ({
  sectionName,
  section,
  onInputValueChange,
  players,
  activePlayerIndex,
}: Props) => {
  const { isMobile } = useMyTheme();
  const playerCount = players.length;

  // Jeżeli to sekcja 'namesSection', rysujemy pojedynczy wiersz z nazwami:
  if (sectionName === 'namesSection') {
    const namesRow = (section as { names: IDiceNamesFormRow }).names;

    return (
      <Container
        variant='grid'
        gridTemplateColumns={`repeat(${playerCount + 1}, 1fr)`}
        gap={isMobile ? '2px' : '8px'}
        width='100%'
      >
        {/* Lewa komórka: etykieta gry */}
        <FormField variant={namesRow.gameTitle.variant} label={namesRow.gameTitle.label} />
        {/* Każdy gracz */}
        {players.map((_, idx) => {
          const key = `player${idx + 1}` as `player${number}`;
          const cell = (namesRow as any)[key] as { label: string; variant?: string };
          return <FormField key={key} variant={cell.variant as any} label={cell.label} />;
        })}
      </Container>
    );
  }

  // W przeciwnym razie (mountainSection, pokerSection, resultSection):
  // Rysujemy tabelę: pierwsza kolumna to etykiety wierszy (fieldType.label),
  // kolejne kolumny to komórki dla każdego gracza.

  // Kolejność wierszy:
  const rowEntries = Object.entries(section as Record<string, IDiceFormRow>) as [
    string,
    IDiceFormRow,
  ][];

  return (
    <Container
      variant='grid'
      gridTemplateColumns={`1fr repeat(${playerCount}, 1fr)`}
      gap={isMobile ? '2px' : '8px'}
      width='100%'
    >
      {/* Pierwsza kolumna: etykiety wierszy */}
      {rowEntries.map(([rowKey, rowData]) => (
        <FormField
          key={`label-${rowKey}`}
          variant={rowData.fieldType.variant as any}
          label={rowData.fieldType.label}
        />
      ))}

      {/* Następnie jedna kolumna na każdego gracza */}
      {players.map((_, pIdx) =>
        rowEntries.map(([rowKey, rowData]) => {
          const inputKey = `p${pIdx + 1}Input` as `p${number}Input`;
          const cell = rowData[inputKey];
          if (!cell) {
            // W razie braku pola (np. mniejsza liczba graczy) – pusta komórka:
            return <FormField key={`${rowKey}-p${pIdx + 1}`} variant='input' label='' />;
          }
          return (
            <FormField
              key={`${rowKey}-p${pIdx + 1}`}
              variant={cell.variant as any}
              label={cell.value !== null ? cell.value.toString() : ''}
              value={cell.value}
              isEditable={cell.variant === 'inputToFilled'}
              onChangeValue={(newValue) =>
                onInputValueChange?.(sectionName, rowKey, inputKey, newValue)
              }
            />
          );
        })
      )}
    </Container>
  );
};

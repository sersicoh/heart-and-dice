import Container from '@components/common/container/Container';
import { FormField } from '@components/common/form/formField/FormField';
import type {
  IFormInputChange,
  IFormRow,
  IFormSections,
  INamesFormRow,
} from '@views/heart/form.types';

import { useMyTheme } from '@hooks/useMyTheme';

interface FormRowProps {
  rowKey: string;
  rowData: INamesFormRow | IFormRow;
  sectionName: keyof IFormSections;
  onInputValueChange?: IFormInputChange;
}

export const FormRow = ({ rowKey, rowData, sectionName, onInputValueChange }: FormRowProps) => {
  const { isMobile } = useMyTheme();

  function isNamesFormRow(row: INamesFormRow | IFormRow): row is INamesFormRow {
    return (row as INamesFormRow).gameTitle !== undefined;
  }

  const renderNamesRow = (row: INamesFormRow) => {
    return (
      <>
        <FormField variant={row.gameTitle.variant} label={row.gameTitle.label} />
        <FormField variant={row.player1.variant} label={row.player1.label} />
        <FormField variant={row.player2.variant} label={row.player2.label} />
        <FormField variant={row.player3.variant} label={row.player3.label} />
        {row.player4 && <FormField variant={row.player4.variant} label={row.player4.label ?? ''} />}
      </>
    );
  };

  const renderPointsRow = (row: IFormRow) => {
    return (
      <>
        <FormField variant={row.roundType.variant} label={row.roundType.label} />
        <FormField
          variant={row.p1Input.variant}
          label={row.p1Input.value?.toString() ?? ''}
          value={row.p1Input.value}
          onChangeValue={(newValue) =>
            onInputValueChange?.(sectionName, rowKey, 'p1Input', newValue)
          }
          isEditable={row.p1Input.variant === 'activeInput'}
        />
        <FormField
          variant={row.p2Input.variant}
          label={row.p2Input.value?.toString() ?? ''}
          value={row.p2Input.value}
          onChangeValue={(newValue) =>
            onInputValueChange?.(sectionName, rowKey, 'p2Input', newValue)
          }
          isEditable={row.p2Input.variant === 'activeInput'}
        />
        <FormField
          variant={row.p3Input.variant}
          label={row.p3Input.value?.toString() ?? ''}
          value={row.p3Input.value}
          onChangeValue={(newValue) =>
            onInputValueChange?.(sectionName, rowKey, 'p3Input', newValue)
          }
          isEditable={row.p3Input.variant === 'activeInput'}
        />
        {row.p4Input && (
          <FormField
            variant={row.p4Input.variant}
            label={row.p4Input.value?.toString() ?? ''}
            value={row.p4Input.value}
            onChangeValue={(newValue) =>
              onInputValueChange?.(sectionName, rowKey, 'p4Input', newValue)
            }
            isEditable={row.p4Input.variant === 'activeInput'}
          />
        )}
      </>
    );
  };
  const getNumberOfPlayers = (row: INamesFormRow | IFormRow) => {
    if (isNamesFormRow(row)) {
      const possible = ['player1', 'player2', 'player3', 'player4'] as const;
      return possible.filter((p) => row[p] !== undefined).length;
    } else {
      const possible = ['p1Input', 'p2Input', 'p3Input', 'p4Input'] as const;
      return possible.filter((p) => row[p] !== undefined).length;
    }
  };

  const nPlayers = getNumberOfPlayers(rowData);
  const numCols = 1 + nPlayers;

  return (
    <Container
      variant='grid'
      gridTemplateColumns={`repeat(${numCols}, 1fr)`}
      gap={isMobile ? '2px' : '8px'}
      width='100%'
    >
      {isNamesFormRow(rowData) ? renderNamesRow(rowData) : renderPointsRow(rowData)}
    </Container>
  );
};

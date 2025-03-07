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
          variant={row.player1Input.variant}
          label={row.player1Input.value?.toString() ?? ''}
          value={row.player1Input.value}
          onChangeValue={(newValue) =>
            onInputValueChange?.(sectionName, rowKey, 'player1Input', newValue)
          }
          isEditable={row.player1Input.variant === 'activeInput'}
        />
        <FormField
          variant={row.player2Input.variant}
          label={row.player2Input.value?.toString() ?? ''}
          value={row.player2Input.value}
          onChangeValue={(newValue) =>
            onInputValueChange?.(sectionName, rowKey, 'player2Input', newValue)
          }
          isEditable={row.player2Input.variant === 'activeInput'}
        />
        <FormField
          variant={row.player3Input.variant}
          label={row.player3Input.value?.toString() ?? ''}
          value={row.player3Input.value}
          onChangeValue={(newValue) =>
            onInputValueChange?.(sectionName, rowKey, 'player3Input', newValue)
          }
          isEditable={row.player3Input.variant === 'activeInput'}
        />
        {row.player4Input && (
          <FormField
            variant={row.player4Input.variant}
            label={row.player4Input.value?.toString() ?? ''}
            value={row.player4Input.value}
            onChangeValue={(newValue) =>
              onInputValueChange?.(sectionName, rowKey, 'player4Input', newValue)
            }
            isEditable={row.player4Input.variant === 'activeInput'}
          />
        )}
      </>
    );
  };
  console.log(rowData);
  const getNumberOfPlayers = (row: INamesFormRow | IFormRow) => {
    console.log(row);

    if (isNamesFormRow(row)) {
      const possible = ['player1', 'player2', 'player3', 'player4'] as const;
      return possible.filter((p) => row[p] !== undefined).length;
    } else {
      const possible = ['player1Input', 'player2Input', 'player3Input', 'player4Input'] as const;
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

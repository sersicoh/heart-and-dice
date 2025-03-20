import { useState } from 'react';

import ReactMarkdown from 'react-markdown';

import Container from '@components/common/container/Container';
import { FormField } from '@components/common/formField/FormField';
import { Modal } from '@components/common/modal/Modal';
import type {
  IFormInputChange,
  IFormRow,
  IFormSections,
  INamesFormRow,
} from '@views/heart/form.types';

import { useMyTheme } from '@hooks/useMyTheme';
import HeartRules from '@docs/HeartRule.json';

interface FormRowProps {
  rowKey: string;
  rowData: INamesFormRow | IFormRow;
  sectionName: keyof IFormSections;
  onInputValueChange?: IFormInputChange;
}

export const FormRow = ({ rowKey, rowData, sectionName, onInputValueChange }: FormRowProps) => {
  const { isMobile } = useMyTheme();

  const [isRulesModalOpen, setIsRulesModalOpen] = useState(false);
  const [selectedRules, setSelectedRules] = useState<{ title: string; content: string[] } | null>(
    null
  );

  const handleOpenRulesModal = (ruleId: string) => {
    const foundRule = HeartRules.find((rule) => rule.id === ruleId);
    if (foundRule) {
      setSelectedRules({
        title: foundRule.title,
        content: foundRule.content,
      });
      setIsRulesModalOpen(true);
    }
  };

  const handleCloseRulesModal = () => {
    setSelectedRules(null);
    setIsRulesModalOpen(false);
  };

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
    const onRoundTypeClick = () => {
      if (row.roundType.rowId) {
        handleOpenRulesModal(row.roundType.rowId);
      }
    };
    return (
      <>
        <FormField
          variant={row.roundType.variant}
          label={row.roundType.label}
          onTitleClick={onRoundTypeClick}
          isClickable={Boolean(row.roundType.id)}
        />
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
    <>
      <Container
        variant='grid'
        gridTemplateColumns={`repeat(${numCols}, 1fr)`}
        gap={isMobile ? '2px' : '8px'}
        width='100%'
      >
        {isNamesFormRow(rowData) ? renderNamesRow(rowData) : renderPointsRow(rowData)}
      </Container>
      <Modal isOpen={isRulesModalOpen} onClose={handleCloseRulesModal} title={selectedRules?.title}>
        {selectedRules?.content && (
          <Container>
            <ReactMarkdown>{selectedRules.content.join('\n\n')}</ReactMarkdown>
          </Container>
        )}
      </Modal>
    </>
  );
};

import { useState } from 'react';

import ReactMarkdown from 'react-markdown';

import Container from '@components/common/container/Container';
import { HeartFormField } from '@components/common/heartFormField/HeartFormField';
import { Modal } from '@components/common/modal/Modal';
import type {
  IHeartFormInputChange,
  IHeartFormRow,
  IHeartFormSections,
  IHeartNamesFormRow,
} from '@views/heart/heartForm.types';

import { useMyTheme } from '@hooks/useMyTheme';
import HeartRules from '@docs/HeartRule.json';

interface FormRowProps {
  rowKey: string;
  rowData: IHeartNamesFormRow | IHeartFormRow;
  sectionName: keyof IHeartFormSections;
  onInputValueChange?: IHeartFormInputChange;
}

export const HeartFormRow = ({
  rowKey,
  rowData,
  sectionName,
  onInputValueChange,
}: FormRowProps) => {
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

  function isNamesFormRow(row: IHeartNamesFormRow | IHeartFormRow): row is IHeartNamesFormRow {
    return (row as IHeartNamesFormRow).gameTitle !== undefined;
  }

  const renderNamesRow = (row: IHeartNamesFormRow) => {
    return (
      <>
        <HeartFormField variant={row.gameTitle.variant} label={row.gameTitle.label} />
        <HeartFormField variant={row.player1.variant} label={row.player1.label} />
        <HeartFormField variant={row.player2.variant} label={row.player2.label} />
        <HeartFormField variant={row.player3.variant} label={row.player3.label} />
        {row.player4 && (
          <HeartFormField variant={row.player4.variant} label={row.player4.label ?? ''} />
        )}
      </>
    );
  };

  const renderPointsRow = (row: IHeartFormRow) => {
    const onRoundTypeClick = () => {
      if (row.roundType.rowId) {
        handleOpenRulesModal(row.roundType.rowId);
      }
    };
    return (
      <>
        <HeartFormField
          variant={row.roundType.variant}
          label={row.roundType.label}
          onTitleClick={onRoundTypeClick}
          isClickable={Boolean(row.roundType.id)}
        />
        <HeartFormField
          variant={row.p1Input.variant}
          label={row.p1Input.value?.toString() ?? ''}
          value={row.p1Input.value}
          onChangeValue={(newValue) =>
            onInputValueChange?.(sectionName, rowKey, 'p1Input', newValue)
          }
          isEditable={row.p1Input.variant === 'activeInput'}
        />
        <HeartFormField
          variant={row.p2Input.variant}
          label={row.p2Input.value?.toString() ?? ''}
          value={row.p2Input.value}
          onChangeValue={(newValue) =>
            onInputValueChange?.(sectionName, rowKey, 'p2Input', newValue)
          }
          isEditable={row.p2Input.variant === 'activeInput'}
        />
        <HeartFormField
          variant={row.p3Input.variant}
          label={row.p3Input.value?.toString() ?? ''}
          value={row.p3Input.value}
          onChangeValue={(newValue) =>
            onInputValueChange?.(sectionName, rowKey, 'p3Input', newValue)
          }
          isEditable={row.p3Input.variant === 'activeInput'}
        />
        {row.p4Input && (
          <HeartFormField
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

  const getNumberOfPlayers = (row: IHeartNamesFormRow | IHeartFormRow) => {
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

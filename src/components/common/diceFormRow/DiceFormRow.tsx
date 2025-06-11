import { useState } from 'react';

import ReactMarkdown from 'react-markdown';

import Container from '@components/common/container/Container';
import { DiceFormField } from '@components/common/diceFormField/DiceFormField';
import { Modal } from '@components/common/modal/Modal';
import type {
  IDiceFormInputChange,
  IDiceFormRow,
  IDiceFormSections,
  IDiceNamesFormRow,
  InputKey,
  PlayerKey,
} from '@views/dice/diceForm.types';

import type { Player } from '@store/store.types';
import { useMyTheme } from '@hooks/useMyTheme';
import HeartRules from '@docs/HeartRule.json';

interface FormRowProps {
  rowKey: string;
  rowData: IDiceNamesFormRow | IDiceFormRow;
  sectionName: keyof IDiceFormSections;
  onInputValueChange?: IDiceFormInputChange;
  players: Player[];
}

export const DiceFormRow = ({
  rowKey,
  rowData,
  sectionName,
  players,
  onInputValueChange,
}: FormRowProps) => {
  const { isMobile } = useMyTheme();

  const [isRulesModalOpen, setIsRulesModalOpen] = useState(false);
  const [selectedRules, setSelectedRules] = useState<{ title: string; content: string[] } | null>(
    null
  );

  function isNamesFormRow(row: IDiceNamesFormRow | IDiceFormRow): row is IDiceNamesFormRow {
    return (row as IDiceNamesFormRow).gameTitle !== undefined;
  }

  const playerKey = (idx: number) => `player${idx + 1}` as PlayerKey;
  const inputKey = (idx: number) => `p${idx + 1}Input` as InputKey;

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

  const renderNamesRow = (row: IDiceNamesFormRow) => (
    <>
      <DiceFormField variant={row.gameTitle.variant} label={row.gameTitle.label} />
      {players.map((player, idx) => {
        const pk = playerKey(idx);
        const field = row[pk];
        return (
          <DiceFormField
            key={pk}
            variant={field.variant}
            label={player.name}
            value={(field as { value?: string | number }).value ?? ''}
            onChangeValue={(newVal) =>
              onInputValueChange?.(sectionName, rowKey, inputKey(idx), newVal)
            }
            isEditable={field.variant === 'activeInput' || field.variant === 'lastInput'}
          />
        );
      })}
    </>
  );

  const renderPointsRow = (row: IDiceFormRow) => {
    const onRoundTypeClick = () => {
      if (row.fieldType.rowId) {
        handleOpenRulesModal(row.fieldType.rowId);
      }
    };

    return (
      <>
        <DiceFormField
          variant={row.fieldType.variant}
          label={row.fieldType.label}
          onTitleClick={onRoundTypeClick}
          isClickable={Boolean(row.fieldType.rowId)}
        />
        {players.map((_player, idx) => {
          const ik = inputKey(idx);
          const field = row[ik as keyof typeof row] as (typeof row)[InputKey];
          return (
            <DiceFormField
              key={`${ik}-${rowKey}`}
              variant={field?.variant}
              label={field?.value?.toString() ?? ''}
              value={field?.value}
              onChangeValue={(newVal) => onInputValueChange?.(sectionName, rowKey, ik, newVal)}
              isEditable={field?.variant === 'activeInput' || field?.variant === 'lastInput'}
            />
          );
        })}
      </>
    );
  };

  const numCols = 1 + players.length;

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

      {/* —— Rules modal —— */}
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

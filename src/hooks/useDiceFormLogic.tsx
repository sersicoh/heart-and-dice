// src/hooks/useDiceFormLogic.ts
import { useCallback, useState } from 'react';

import type { UICell, UIRow } from '@components/common/diceFieldsRow/DiceFieldsRow';
import type {
  DiceFieldVariant,
  IDiceFormRow,
  IDiceFormSections,
  PlayerKey,
} from '@views/dice/diceForm.types';

import { useDiceStore } from '@store/diceStore';

type EditRecord = { rowId: string; playerIdx: number };

export function useDiceFormLogic() {
  const { players, fields, setFields, endGame, currentPlayerIdx, setCurrentPlayerIdx } =
    useDiceStore();
  if (!fields) throw new Error('Fields not initialized');

  const allRows: IDiceFormRow<number>[] = [
    ...Object.values(fields.mountainSection),
    ...Object.values(fields.pokerSection),
  ].filter((r) => r.fieldType.variant !== 'resultTitle');

  const [history, setHistory] = useState<EditRecord[]>(() => {
    const init: EditRecord[] = [];
    allRows.forEach((r) =>
      players.forEach((_, pi) => {
        const key = `p${pi + 1}Input` as keyof typeof r.inputs;
        if (r.inputs[key].value != null) {
          init.push({ rowId: r.fieldType.rowId, playerIdx: pi });
        }
      })
    );
    return init;
  });

  const [lastUndo, setLastUndo] = useState<EditRecord | null>(null);
  const [editingRowId, setEditingRowId] = useState<string | null>(null);

  const allDone = players.every((_, pi) =>
    allRows.every((r) => r.inputs[`p${pi + 1}Input`].value != null)
  );
  const canUndo = history.length > 0;
  const canNext = players.length > 0;

  const updateValue = useCallback(
    (rowId: string, val: number | null) => {
      const next: IDiceFormSections<number> = {
        ...fields,
        mountainSection: { ...fields.mountainSection },
        pokerSection: { ...fields.pokerSection },
      };
      const row = allRows.find((r) => r.fieldType.rowId === rowId)!;
      const key = `p${currentPlayerIdx + 1}Input` as keyof typeof row.inputs;
      row.inputs[key].value = val;
      setFields(next);
    },
    [fields, allRows, currentPlayerIdx, setFields]
  );

  const nextPlayer = useCallback(() => {
    if (editingRowId) {
      setHistory((h) => [...h, { rowId: editingRowId, playerIdx: currentPlayerIdx }]);
      setEditingRowId(null);
      setLastUndo(null);
    }
    allRows.forEach((r) => {
      const key = `p${currentPlayerIdx + 1}Input` as keyof typeof r.inputs;
      if (
        r.inputs[key].value != null &&
        !history.some((h) => h.playerIdx === currentPlayerIdx && h.rowId === r.fieldType.rowId)
      ) {
        setHistory((h) => [...h, { rowId: r.fieldType.rowId, playerIdx: currentPlayerIdx }]);
      }
    });
    setCurrentPlayerIdx((currentPlayerIdx + 1) % players.length);
  }, [allRows, currentPlayerIdx, editingRowId, history, players.length, setCurrentPlayerIdx]);

  const undo = useCallback(() => {
    const last = history[history.length - 1];
    if (!last) return;
    updateValue(last.rowId, null);
    setHistory((h) => h.slice(0, -1));
    setLastUndo(last);
    setEditingRowId(last.rowId);
    setCurrentPlayerIdx(last.playerIdx);
  }, [history, setCurrentPlayerIdx, updateValue]);

  const finishGame = useCallback(() => endGame(), [endGame]);

  const buildUIRow = useCallback(
    (r: IDiceFormRow<number>): UIRow => {
      const cells: UICell[] = [];

      if (r.fieldType.variant === 'resultTitle') {
        // labelka zawsze resultTitle
        cells.push({ variant: 'resultTitle', value: r.fieldType.label });

        const pk = `player${currentPlayerIdx + 1}` as PlayerKey<number>;
        const pts = r.computedPoints?.[pk] ?? 0;

        let valueVariant: DiceFieldVariant = 'resultTitle';
        if (r.fieldType.rowId === 'mountainResult') {
          if (pts >= 15) valueVariant = 'inputPremium';
          else if (pts < 0) valueVariant = 'inputNotPremium';
        }

        cells.push({ variant: valueVariant, value: pts });
        return { cells };
      }

      const key = `p${currentPlayerIdx + 1}Input` as keyof typeof r.inputs;
      const cell = r.inputs[key];
      const done = history.some(
        (h) => h.playerIdx === currentPlayerIdx && h.rowId === r.fieldType.rowId
      );

      let inputVariant: DiceFieldVariant = 'input';
      let isEditable = false;
      let onChangeValue: ((v: number | null) => void) | undefined;

      if (lastUndo?.playerIdx === currentPlayerIdx) {
        isEditable = true;
        inputVariant = lastUndo.rowId === r.fieldType.rowId ? 'lastInput' : 'activeInput';
        onChangeValue = (v) => {
          setLastUndo(null);
          setEditingRowId(r.fieldType.rowId);
          updateValue(r.fieldType.rowId, v);
        };
      } else if (!done && !allDone) {
        isEditable = true;
        inputVariant = 'activeInput';
        onChangeValue = (v) => {
          if (!editingRowId) setEditingRowId(r.fieldType.rowId);
          updateValue(r.fieldType.rowId, v);
        };
      } else if (done) {
        inputVariant = 'inputFilled';
      }

      if (r.fieldType.rowId === 'fullHouse' && cell.value != null && cell.value > 0) {
        inputVariant = 'inputPremium';
        isEditable = false;
        onChangeValue = undefined;
      }

      const labelVar: DiceFieldVariant =
        inputVariant === 'activeInput' ? 'activeFieldsType' : 'fieldType';

      cells.push(
        { variant: labelVar, value: r.fieldType.label },
        {
          variant: inputVariant,
          value: cell.value,
          isEditable,
          onChangeValue,
        }
      );
      return { cells };
    },
    [
      allDone,
      currentPlayerIdx,
      editingRowId,
      history,
      lastUndo,
      setEditingRowId,
      setLastUndo,
      updateValue,
    ]
  );

  return {
    buildUIRow,
    nextPlayer,
    undo,
    finishGame,
    canNext,
    canUndo,
    allDone,
    currentPlayerIdx,
  };
}

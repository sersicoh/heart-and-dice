// src/hooks/useDiceFormLogic.ts
import { useCallback, useState } from 'react';

import type { UICell, UIRow } from '@components/common/diceFieldsRow/DiceFieldsRow';
import type { DiceFieldVariant, IDiceFormRow, IDiceFormSections } from '@views/dice/diceForm.types';

import { useDiceStore } from '@store/diceStore';

type EditRecord = { rowId: string; playerIdx: number };

export function useDiceFormLogic() {
  const { players, fields, setFields, endGame, currentPlayerIdx, setCurrentPlayerIdx } =
    useDiceStore();
  if (!fields) throw new Error('Fields not initialized');

  // 1) wszystkie wiersze do wypełnienia
  const allRows: IDiceFormRow<number>[] = [
    ...Object.values(fields.mountainSection),
    ...Object.values(fields.pokerSection),
  ].filter((r) => r.fieldType.variant !== 'resultTitle');

  // 2) historia na start (wszystkie już wypełnione pola)
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

  // 3) czy wszyscy mają wszystkie pola?
  const allDone = players.every((_, pi) =>
    allRows.every((r) => r.inputs[`p${pi + 1}Input`].value != null)
  );

  const canUndo = history.length > 0;
  const canNext = players.length > 0;

  // 4) zapis wartości w store
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

  // 5) przejście do następnego gracza
  const nextPlayer = useCallback(() => {
    if (editingRowId) {
      setHistory((h) => [...h, { rowId: editingRowId, playerIdx: currentPlayerIdx }]);
      setEditingRowId(null);
      setLastUndo(null);
    }
    // dopisz wszystkie inne już wypełnione pola
    allRows.forEach((r) => {
      const key = `p${currentPlayerIdx + 1}Input` as keyof typeof r.inputs;
      if (
        r.inputs[key].value != null &&
        !history.some((h) => h.playerIdx === currentPlayerIdx && h.rowId === r.fieldType.rowId)
      ) {
        setHistory((h) => [...h, { rowId: r.fieldType.rowId, playerIdx: currentPlayerIdx }]);
      }
    });
    // i zmień gracza w store (persisted!)
    setCurrentPlayerIdx((currentPlayerIdx + 1) % players.length);
  }, [editingRowId, currentPlayerIdx, history, allRows, players.length, setCurrentPlayerIdx]);

  // 6) cofnięcie ostatniego ruchu
  const undo = useCallback(() => {
    const last = history[history.length - 1];
    if (!last) return;
    updateValue(last.rowId, null);
    setHistory((h) => h.slice(0, -1));
    setLastUndo(last);
    setEditingRowId(last.rowId);
    setCurrentPlayerIdx(last.playerIdx);
  }, [history, updateValue, setCurrentPlayerIdx]);

  // 7) zakończ grę
  const finishGame = useCallback(() => endGame(), [endGame]);

  // 8) budowa wiersza do renderu
  const buildUIRow = useCallback(
    (r: IDiceFormRow<number>): UIRow => {
      const cells: UICell[] = [];

      // summary row?
      if (r.fieldType.variant === 'resultTitle') {
        const key = `player${currentPlayerIdx + 1}` as keyof typeof r.computedPoints;
        const pts = r.computedPoints?.[key] ?? null;
        cells.push(
          { variant: 'resultTitle', value: r.fieldType.label },
          { variant: 'resultTitle', value: pts }
        );
        return { cells };
      }

      // input tej komórki
      const key = `p${currentPlayerIdx + 1}Input` as keyof typeof r.inputs;
      const cell = r.inputs[key];
      const done = history.some(
        (h) => h.playerIdx === currentPlayerIdx && h.rowId === r.fieldType.rowId
      );

      // domyślnie
      let inputVariant: DiceFieldVariant = 'input';
      let isEditable = false;
      let onChangeValue: ((v: number | null) => void) | undefined;

      // tryb po undo → wszystkie pola edytowalne
      if (lastUndo?.playerIdx === currentPlayerIdx) {
        isEditable = true;
        inputVariant = lastUndo.rowId === r.fieldType.rowId ? 'lastInput' : 'activeInput';
        onChangeValue = (v) => {
          setLastUndo(null);
          setEditingRowId(r.fieldType.rowId);
          updateValue(r.fieldType.rowId, v);
        };
      }
      // normalny: niezatwierdzone jeszcze i gra w toku
      else if (!done && !allDone) {
        isEditable = true;
        inputVariant = 'activeInput';
        onChangeValue = (v) => {
          if (!editingRowId) setEditingRowId(r.fieldType.rowId);
          updateValue(r.fieldType.rowId, v);
        };
      }
      // zatwierdzone
      else if (done) {
        inputVariant = 'inputFilled';
      }

      // wybór wariantu labelki
      const labelVar: DiceFieldVariant =
        inputVariant === 'activeInput' ? 'activeFieldsType' : 'fieldType';

      cells.push(
        { variant: labelVar, value: r.fieldType.label },
        { variant: inputVariant, value: cell.value, isEditable, onChangeValue }
      );
      return { cells };
    },
    [currentPlayerIdx, history, lastUndo, allDone, editingRowId, updateValue]
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

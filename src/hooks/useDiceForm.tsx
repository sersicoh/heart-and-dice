import { useEffect, useRef, useState } from 'react';

import type {
  DiceFieldVariant,
  IDiceFormRow,
  IDiceFormSections,
  InputKey,
  PlayerKey,
} from '@views/dice/diceForm.types';

import { useDiceStore } from '@store/diceStore';
import { calcRegistryDice } from '@utils/calcFunctionsDice';
import { getDiceFields } from '@utils/getDiceFields';
import { recalcDiceRows } from '@utils/recalcDiceRows';
import { useCustomSnackbar } from '@hooks/useCustomSnackbar';

/* ────────── aliasy ────────── */
type Sections = IDiceFormSections<number>;
type SectionName = keyof IDiceFormSections<number>;

interface LastFilled {
  sectionName: SectionName;
  rowKey: string;
  playerIndex: number;
}

export function useDiceFormLogic() {
  /* ---------- store & snackbar ---------- */
  const { players, fields, setFields } = useDiceStore();
  const { showSnackbar } = useCustomSnackbar();

  /* ---------- lokalny stan pól ---------- */
  const [localFields, setLocalFields] = useState<Sections>(fields ?? getDiceFields(players));

  /* ---------- aktywny gracz ---------- */
  const [activePlayerIndex, setActivePlayerIndex] = useState<number>(() => {
    const names = fields?.namesSection.names;
    if (!names) return 0;
    return players.findIndex(
      (_, idx) => names[`player${idx + 1}` as PlayerKey].variant === 'activePlayer'
    );
  });

  const lastStackRef = useRef<LastFilled[]>([]);

  const [undoCount, setUndoCount] = useState(0);

  /* ---------- synchronizacja z store ---------- */
  useEffect(() => {
    if (fields) setLocalFields(fields);
  }, [fields]);

  useEffect(() => {
    setFields(localFields);
  }, [localFields, setFields]);

  /* ---------- pomoc: klucze inputów ---------- */
  const playerCnt = players.length;
  const inputKeys = Array.from({ length: playerCnt }, (_, i) => `p${i + 1}Input` as InputKey);

  /* ---------- helper: dostęp do wiersza ---------- */
  function getRow(obj: Sections, section: SectionName, rowKey: string): IDiceFormRow<number> {
    return (obj[section] as Record<string, IDiceFormRow<number>>)[rowKey];
  }

  function isCell(o: unknown): o is { variant: DiceFieldVariant } {
    return !!o && typeof o === 'object' && 'variant' in o;
  }

  function refreshRowVariant(row: IDiceFormRow<number>) {
    if (row.fieldType.variant === 'resultTitle') return; // zostaw sumy

    const hasActive = Object.values(row).some(
      (cell) => isCell(cell) && (cell.variant === 'activeInput' || cell.variant === 'lastInput')
    );

    row.fieldType.variant = hasActive ? 'activeFieldsType' : 'fieldType';
  }

  /* helpers ------------------------------------------------- */
  function markPlayerCells(obj: Sections, pIdx: number, variantIfNull: DiceFieldVariant) {
    const key = `p${pIdx + 1}Input` as InputKey;
    const mark = (row: IDiceFormRow<number>) => {
      if (row.fieldType.variant === 'resultTitle') return;
      if (row[key].value === null) {
        row[key].variant = variantIfNull;
      } else if (row[key].variant !== 'lastInput') {
        row[key].variant = 'inputFilled';
      }
      refreshRowVariant(row);
    };
    [
      ...Object.values(obj.mountainSection),
      ...Object.values(obj.pokerSection),
      ...Object.values(obj.resultSection),
    ].forEach(mark);
  }

  function isPlayerColumnComplete(obj: Sections, pIdx: number): boolean {
    const key = `p${pIdx + 1}Input` as InputKey;

    const rowsAreFull = (sec: Record<string, IDiceFormRow<number>>) =>
      Object.entries(sec)
        .filter(([rowName]) => rowName !== 'result') // pomijamy sumę
        .every(([, row]) => row[key]?.value !== null);

    return rowsAreFull(obj.mountainSection) && rowsAreFull(obj.pokerSection);
  }

  /* =========================================================
   *  goToNextPlayer
   * ======================================================= */
  function goToNextPlayer() {
    if (playerCnt === 0) return;

    setLocalFields((prev) => {
      const cloned = structuredClone(prev);

      const normalizeLastInputs = (row: IDiceFormRow<number>) => {
        (Object.keys(row) as Array<keyof IDiceFormRow<number>>).forEach((k) => {
          const cell = row[k];
          if (
            cell &&
            typeof cell === 'object' &&
            'variant' in cell &&
            cell.variant === 'lastInput'
          ) {
            cell.variant = 'inputFilled';
          }
        });
      };

      [
        ...Object.values(cloned.mountainSection),
        ...Object.values(cloned.pokerSection),
        ...Object.values(cloned.resultSection),
      ].forEach(normalizeLastInputs);

      const prevIdx = activePlayerIndex;
      let nextIdx = (prevIdx + 1) % playerCnt;

      /* 1. ostatnia edytowana komórka → inputFilled */
      if (lastStackRef.current.length) {
        const { sectionName, rowKey, playerIndex } =
          lastStackRef.current[lastStackRef.current.length - 1];

        const row = getRow(cloned, sectionName, rowKey);

        const cell = row[`p${playerIndex + 1}Input` as InputKey];

        if (row.fieldType.variant !== 'resultTitle') {
          cell.variant = 'inputFilled';
        }
        refreshRowVariant(row);

        if (row.fieldType.rowId) {
          const fn = calcRegistryDice[row.fieldType.rowId as keyof typeof calcRegistryDice];
          const vals = inputKeys.map((k) => (row as IDiceFormRow<number>)[k]?.value ?? 0);
          row.computedPoints = fn(vals);
        }
      }

      for (let step = 1; step <= playerCnt; step++) {
        const cand = (prevIdx + step) % playerCnt;
        if (!isPlayerColumnComplete(cloned, cand)) {
          nextIdx = cand;
          break;
        }
      }
      const names = cloned.namesSection.names;
      names[`player${prevIdx + 1}` as PlayerKey].variant = 'name';
      names[`player${nextIdx + 1}` as PlayerKey].variant = 'activePlayer';

      /* 3. kolumny */
      markPlayerCells(cloned, prevIdx, 'input');
      markPlayerCells(cloned, nextIdx, 'activeInput');

      setActivePlayerIndex(nextIdx);
      const updated = recalcDiceRows(cloned);

      (() => {
        const row = updated.resultSection.result;
        console.groupCollapsed('[NextPlayer] finalRow variants');
        Object.entries(row).filter(([k]) => k.endsWith('Input'));
      })();

      const comp = updated.resultSection.result.computedPoints;
      if (comp) {
        Object.keys(comp).forEach((pKey) => {
          const idx = Number(pKey.replace('player', ''));
          if (idx > players.length) {
            delete (comp as typeof comp)[pKey as keyof typeof comp];
          }
        });
      }

      return updated;
    });
  }

  /* =========================================================
   *  undoLastEntry
   * ======================================================= */
  function undoLastEntry() {
    const last = lastStackRef.current.pop();
    setUndoCount(lastStackRef.current.length);
    if (!last) return;

    setLocalFields((prev) => {
      const cloned = structuredClone(prev);
      const { sectionName, rowKey, playerIndex } = last;
      const cellKey = `p${playerIndex + 1}Input` as InputKey;

      /* 1. komórka, z której cofamy → lastInput (wartość zostaje) */
      const row = getRow(cloned, sectionName, rowKey);
      row[cellKey].variant = 'lastInput';
      refreshRowVariant(row);

      /* 2. nagłówki */
      const names = cloned.namesSection.names;
      names[`player${activePlayerIndex + 1}` as PlayerKey].variant = 'name';
      names[`player${playerIndex + 1}` as PlayerKey].variant = 'activePlayer';

      markPlayerCells(cloned, activePlayerIndex, 'input');

      const activateWholeColumn = (r: IDiceFormRow<number>) => {
        if (r.fieldType.variant === 'resultTitle') return;
        const key = `p${playerIndex + 1}Input` as InputKey;
        if (r[key].variant !== 'lastInput') r[key].variant = 'activeInput';
      };
      [
        ...Object.values(cloned.mountainSection),
        ...Object.values(cloned.pokerSection),
        ...Object.values(cloned.resultSection),
      ].forEach(activateWholeColumn);

      setActivePlayerIndex(playerIndex);
      return cloned;
    });
  }

  function setInputValue(
    sectionName: SectionName,
    rowKey: string,
    playerInputKey: InputKey,
    newValue: number | null
  ) {
    setLocalFields((prev) => {
      const cloned = structuredClone(prev);
      getRow(cloned, sectionName, rowKey)[playerInputKey].value = newValue;
      refreshRowVariant(getRow(cloned, sectionName, rowKey));

      lastStackRef.current.push({
        sectionName,
        rowKey,
        playerIndex: Number(playerInputKey.slice(1, -5)) - 1,
      });
      setUndoCount(lastStackRef.current.length);
      return cloned;
    });
  }

  /* ========== 4. finishGame ========== */
  function finishGame(): boolean {
    const isRowComplete = (row: IDiceFormRow<number>) =>
      inputKeys.every((k) => row[k]?.value !== null);

    const sectionComplete = (sec: Record<string, IDiceFormRow<number>>) =>
      Object.entries(sec)
        .filter(([k]) => k !== 'result')
        .every(([, row]) => isRowComplete(row));

    if (
      !sectionComplete(localFields.mountainSection) ||
      !sectionComplete(localFields.pokerSection)
    ) {
      showSnackbar({
        message: 'Wszystkie pola muszą być wypełnione przed zakończeniem gry.',
        variant: 'error',
        autoHideDuration: 5000,
      });
      return false;
    }

    setLocalFields((prev) => {
      const cloned = structuredClone(prev);

      const runCalc = (row: IDiceFormRow<number>) => {
        if (!row.fieldType.rowId) return;
        const calcFn = calcRegistryDice[row.fieldType.rowId as keyof typeof calcRegistryDice];
        const vals = inputKeys.map((k) => {
          const cell = row[k as keyof IDiceFormRow<number>];
          return cell && typeof cell === 'object' && 'value' in cell
            ? (cell as { value: number | null }).value
            : null;
        });
        const { ...scores } = calcFn(vals);
        row.computedPoints = scores;
      };

      Object.values(cloned.mountainSection).forEach(runCalc);
      Object.values(cloned.pokerSection).forEach(runCalc);
      Object.values(cloned.resultSection).forEach(runCalc);

      return recalcDiceRows(cloned);
    });

    return true;
  }

  /* ---------- API hooka ---------- */
  return {
    fields: localFields,
    players,
    activePlayerIndex,
    setInputValue,
    goToNextPlayer,
    undoLastEntry,
    finishGame,
    isPlayerColumnComplete,
    canUndo: undoCount > 0,
  };
}

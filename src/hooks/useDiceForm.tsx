import { useEffect, useRef, useState } from 'react';

import type {
  IDiceFormRow,
  IDiceFormSections,
  InputKey,
  PlayerKey,
} from '@views/dice/diceForm.types';

import { useDiceStore } from '@store/diceStore';
import { calcRegistryDice } from '@utils/calcFunctionsDice';
import { getDiceFields } from '@utils/getDiceFields';
import { useCustomSnackbar } from '@hooks/useCustomSnackbar';

/* ────────── aliasy ────────── */
type Sections = IDiceFormSections<number>;
type SectionName = keyof Sections; // 'namesSection' | …
type GameSection = Exclude<SectionName, 'namesSection'>;

interface LastFilled {
  section: GameSection;
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

  /* ---------- ostatnia wypełniona komórka ---------- */
  const lastFilledRef = useRef<LastFilled | null>(null);

  /* ---------- synchronizacja z store ---------- */
  useEffect(() => {
    if (fields) setLocalFields(fields);
  }, [fields]);

  useEffect(() => {
    setFields(localFields);
  }, [localFields, setFields]);

  /* ---------- pomoc: klucze inputów ---------- */
  const playerCnt = players.length;
  const inputKeys: InputKey[] = Array.from(
    { length: playerCnt },
    (_, i) => `p${i + 1}Input` as InputKey
  );

  /* ---------- helper: dostęp do wiersza ---------- */
  function getRow(obj: Sections, section: GameSection, rowKey: string): IDiceFormRow<number> {
    return (obj[section] as Record<string, IDiceFormRow<number>>)[rowKey];
  }

  /* ========== 1. setInputValue ========== */
  function setInputValue(
    sectionName: GameSection,
    rowKey: keyof Sections[typeof sectionName],
    playerInputKey: InputKey,
    newValue: number | null
  ) {
    setLocalFields((prev) => {
      const cloned = structuredClone(prev);
      const row = getRow(cloned, sectionName, rowKey as string);

      row[playerInputKey].value = newValue;
      if (row[playerInputKey].variant !== 'inputFilled') {
        row[playerInputKey].variant = 'inputToFilled';
      }

      const idx = Number(playerInputKey.slice(1, -5)) - 1;
      lastFilledRef.current = { section: sectionName, rowKey: rowKey as string, playerIndex: idx };

      return cloned;
    });
  }

  /* ---------- wspólny marker komórek dla gracza ---------- */
  function markPlayerCells(obj: Sections, pIdx: number, variantIfNull: 'input' | 'inputToFilled') {
    const mark = (row: IDiceFormRow<number>) => {
      const key = `p${pIdx + 1}Input` as InputKey;
      row[key].variant = row[key].value === null ? variantIfNull : 'inputFilled';
    };
    Object.values(obj.mountainSection).forEach(mark);
    Object.values(obj.pokerSection).forEach(mark);
    Object.values(obj.resultSection).forEach(mark);
  }

  /* ========== 2. goToNextPlayer ========== */
  function goToNextPlayer() {
    if (playerCnt === 0) return;

    setLocalFields((prev) => {
      const cloned = structuredClone(prev);

      /* 2.1 ostatnia komórka -> inputFilled */
      const ref = lastFilledRef.current;
      if (ref) {
        const { section, rowKey, playerIndex } = ref;
        const row = getRow(cloned, section, rowKey);
        row[`p${playerIndex + 1}Input` as InputKey].variant = 'inputFilled';
      }

      /* 2.2 nagłówek gracza */
      const names = cloned.namesSection.names;
      names[`player${activePlayerIndex + 1}` as PlayerKey].variant = 'name';

      const nextIdx = (activePlayerIndex + 1) % playerCnt;
      names[`player${nextIdx + 1}` as PlayerKey].variant = 'activePlayer';
      setActivePlayerIndex(nextIdx);

      /* 2.3 ustaw warianty komórek nowego gracza */
      markPlayerCells(cloned, nextIdx, 'inputToFilled');

      lastFilledRef.current = null;
      return cloned;
    });
  }

  /* ========== 3. undoLastEntry ========== */
  function undoLastEntry() {
    if (!lastFilledRef.current) return;

    setLocalFields((prev) => {
      const cloned = structuredClone(prev);
      const { section, rowKey, playerIndex } = lastFilledRef.current!;

      const row = getRow(cloned, section, rowKey);
      const cellKey = `p${playerIndex + 1}Input` as InputKey;
      row[cellKey].value = null;
      row[cellKey].variant = 'lastInput';

      /* nagłówek */
      const names = cloned.namesSection.names;
      names[`player${activePlayerIndex + 1}` as PlayerKey].variant = 'name';
      names[`player${playerIndex + 1}` as PlayerKey].variant = 'activePlayer';
      setActivePlayerIndex(playerIndex);

      /* odśwież warianty kolumny */
      markPlayerCells(cloned, playerIndex, 'input');

      lastFilledRef.current = null;
      return cloned;
    });
  }

  /* ========== 4. finishGame ========== */
  function finishGame(): boolean {
    const isRowComplete = (row: IDiceFormRow<number>) =>
      inputKeys.every((k) => row[k as keyof IDiceFormRow<number>].value !== null);

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
        const calcFn = calcRegistryDice[row.fieldType.rowId];
        const vals = inputKeys.map((k) => row[k as keyof IDiceFormRow<number>].value);
        const { valid: _v, errorMessage: _e, ...scores } = calcFn(vals);
        row.computedPoints = scores;
      };

      Object.values(cloned.mountainSection).forEach(runCalc);
      Object.values(cloned.pokerSection).forEach(runCalc);
      Object.values(cloned.resultSection).forEach(runCalc);

      return cloned;
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
  };
}

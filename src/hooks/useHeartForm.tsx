import { useEffect, useState } from 'react';

import type {
  IFormHeartSection,
  IFormRaceSection,
  IFormRow,
  IFormSections,
} from '@views/heart/form.types';

import { useKierkiStore } from '@store/kierkiStore';
import { calcRegistry } from '@utils/calcFunctions';
import { getHeartsFields } from '@utils/getHeartsFields';
import { recalcAllRows } from '@utils/recalcAllRows';
import { useCustomSnackbar } from '@hooks/useCustomSnackbar';

type THeartRowKey = Exclude<keyof IFormHeartSection, 'result'>;
type TRaceRowKey = Exclude<keyof IFormRaceSection, 'result'>;
type THeartPair = ['heartSection', THeartRowKey];
type TRacePair = ['raceSection', TRaceRowKey];
type TActivableRow = THeartPair | TRacePair;

function skipResultRowsHeart(section: IFormHeartSection): THeartRowKey[] {
  const all = Object.keys(section) as (keyof IFormHeartSection)[];
  return all.filter((k) => k !== 'result') as THeartRowKey[];
}

function skipResultRowsRace(section: IFormRaceSection): TRaceRowKey[] {
  const all = Object.keys(section) as (keyof IFormRaceSection)[];
  return all.filter((k) => k !== 'result') as TRaceRowKey[];
}

export function useHeartFormLogic() {
  const { players, fields, setFields } = useKierkiStore();
  const [localFields, setLocalFields] = useState<IFormSections>(fields || getHeartsFields(players));

  const heartActivable = skipResultRowsHeart(localFields.heartSection);
  const raceActivable = skipResultRowsRace(localFields.raceSection);

  const heartPairs: THeartPair[] = heartActivable.map((key) => ['heartSection', key]);
  const racePairs: TRacePair[] = raceActivable.map((key) => ['raceSection', key]);

  const activableRows: TActivableRow[] = [...heartPairs, ...racePairs];

  const [activeIndex, setActiveIndex] = useState<number>(() => {
    const idx = activableRows.findIndex(([sec, row]) => {
      if (sec === 'heartSection') {
        return localFields.heartSection[row].roundType.variant === 'activeRoundType';
      } else {
        return localFields.raceSection[row].roundType.variant === 'activeRoundType';
      }
    });
    return idx >= 0 ? idx : 0;
  });

  const { showSnackbar } = useCustomSnackbar();

  useEffect(() => {
    if (fields) {
      setLocalFields(fields);
    }
  }, [fields]);

  useEffect(() => {
    setFields(localFields);
  }, [localFields, setFields]);

  function setInputValue(
    sectionName: keyof IFormSections,
    rowKey: string,
    playerInputKey: 'p1Input' | 'p2Input' | 'p3Input' | 'p4Input',
    newValue: number | null
  ) {
    setLocalFields((prev) => {
      const cloned = structuredClone(prev);
      if (sectionName === 'heartSection') {
        if (rowKey in cloned.heartSection) {
          const rowData = cloned.heartSection[rowKey as keyof IFormHeartSection];
          if (rowData[playerInputKey]) {
            rowData[playerInputKey].value = newValue;
          }
        }
      } else if (sectionName === 'raceSection') {
        if (rowKey in cloned.raceSection) {
          const rowData = cloned.raceSection[rowKey as keyof IFormRaceSection];
          if (rowData[playerInputKey]) {
            rowData[playerInputKey].value = newValue;
          }
        }
      }
      return cloned;
    });
  }

  function goToNextRow() {
    if (activeIndex >= activableRows.length - 1) {
      return;
    }

    const [cSec, cRow] = activableRows[activeIndex];
    let currentRow: IFormRow;
    if (cSec === 'heartSection') {
      currentRow = localFields.heartSection[cRow];
    } else {
      currentRow = localFields.raceSection[cRow];
    }
    const rowId = currentRow.roundType.rowId;
    const calcFn = rowId ? calcRegistry[rowId] : undefined;
    if (!calcFn) {
      setActiveIndex((p) => p + 1);
      return;
    }

    const values = [
      currentRow.p1Input.value ?? 0,
      currentRow.p2Input.value ?? 0,
      currentRow.p3Input.value ?? 0,
    ];
    if (currentRow.p4Input) {
      values.push(currentRow.p4Input.value ?? 0);
    }

    const result = calcFn(values);
    if (!result.valid) {
      showSnackbar({
        message: result.errorMessage ?? '',
        variant: 'error',
        hideIconVariant: false,
        autoHideDuration: 5000,
      });
      return;
    }

    setLocalFields((prev) => {
      const cloned = structuredClone(prev);

      let cur: IFormRow;
      if (cSec === 'heartSection') {
        cur = cloned.heartSection[cRow];
      } else {
        cur = cloned.raceSection[cRow];
      }

      cur.computedPoints = {
        p1: result.p1,
        p2: result.p2,
        p3: result.p3,
        p4: cur.p4Input ? result.p4 : undefined,
      };

      cur.roundType.variant = 'roundType';
      cur.p1Input.variant = 'input';
      cur.p2Input.variant = 'input';
      cur.p3Input.variant = 'input';
      if (cur.p4Input) {
        cur.p4Input.variant = 'input';
      }

      const [nSec, nRow] = activableRows[activeIndex + 1];
      let nxt: IFormRow;
      if (nSec === 'heartSection') {
        nxt = cloned.heartSection[nRow];
      } else {
        nxt = cloned.raceSection[nRow];
      }

      nxt.roundType.variant = 'activeRoundType';
      nxt.p1Input.variant = 'activeInput';
      nxt.p2Input.variant = 'activeInput';
      nxt.p3Input.variant = 'activeInput';
      if (nxt.p4Input) {
        nxt.p4Input.variant = 'activeInput';
      }

      const recalculated = recalcAllRows(cloned);
      return recalculated;
    });

    setActiveIndex((p) => p + 1);
  }

  function finishGame() {
    const [cSec, cRow] = activableRows[activeIndex];
    let currentRow: IFormRow;
    if (cSec === 'heartSection') {
      currentRow = localFields.heartSection[cRow];
    } else {
      currentRow = localFields.raceSection[cRow];
    }
    const rowId = currentRow.roundType.rowId;
    const calcFn = rowId ? calcRegistry[rowId] : undefined;
    if (calcFn) {
      const values = [
        currentRow.p1Input.value ?? 0,
        currentRow.p2Input.value ?? 0,
        currentRow.p3Input.value ?? 0,
      ];
      if (currentRow.p4Input) {
        values.push(currentRow.p4Input.value ?? 0);
      }
      const result = calcFn(values);
      if (!result.valid) {
        showSnackbar({
          message: result.errorMessage ?? '',
          variant: 'error',
          autoHideDuration: 5000,
        });
        return false;
      }
    }

    setLocalFields((prev) => {
      const cloned = structuredClone(prev);

      let row: IFormRow;
      if (cSec === 'heartSection') {
        row = cloned.heartSection[cRow];
      } else {
        row = cloned.raceSection[cRow];
      }

      row.roundType.variant = 'roundType';
      row.p1Input.variant = 'input';
      row.p2Input.variant = 'input';
      row.p3Input.variant = 'input';
      if (row.p4Input) {
        row.p4Input.variant = 'input';
      }

      return recalcAllRows(cloned);
    });
    return true;
  }

  function undoLastRow() {
    if (activeIndex === 0) return;
    const [cSec, cRow] = activableRows[activeIndex];
    const [pSec, pRow] = activableRows[activeIndex - 1];
    setLocalFields((prev) => {
      const cloned = structuredClone(prev);
      let currentRow: IFormRow, prevRow: IFormRow;
      if (cSec === 'heartSection') {
        currentRow = cloned.heartSection[cRow];
      } else {
        currentRow = cloned.raceSection[cRow];
      }
      currentRow.roundType.variant = 'roundType';
      if (currentRow.p1Input) currentRow.p1Input.variant = 'input';
      if (currentRow.p2Input) currentRow.p2Input.variant = 'input';
      if (currentRow.p3Input) currentRow.p3Input.variant = 'input';
      if (currentRow.p4Input) currentRow.p4Input.variant = 'input';

      if (pSec === 'heartSection') {
        prevRow = cloned.heartSection[pRow];
      } else {
        prevRow = cloned.raceSection[pRow];
      }
      prevRow.roundType.variant = 'activeRoundType';
      if (prevRow.p1Input) prevRow.p1Input.variant = 'activeInput';
      if (prevRow.p2Input) prevRow.p2Input.variant = 'activeInput';
      if (prevRow.p3Input) prevRow.p3Input.variant = 'activeInput';
      if (prevRow.p4Input) prevRow.p4Input.variant = 'activeInput';

      return cloned;
    });
    setActiveIndex((p) => p - 1);
  }

  return {
    fields: localFields,
    activeIndex,
    activableRows,
    setInputValue,
    goToNextRow,
    finishGame,
    undoLastRow,
  };
}

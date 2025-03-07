import { useEffect, useState } from 'react';

import type {
  IFormHeartSection,
  IFormRaceSection,
  IFormRow,
  IFormSections,
} from '@views/heart/form.types';

import { useKierkiStore } from '@store/kierkiStore';
import { getHeartsFields } from '@utils/getHeartsFields';

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
    playerInputKey: 'player1Input' | 'player2Input' | 'player3Input' | 'player4Input',
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
    if (activeIndex >= activableRows.length - 1) return;
    const [cSec, cRow] = activableRows[activeIndex];
    const [nSec, nRow] = activableRows[activeIndex + 1];
    setLocalFields((prev) => {
      const cloned = structuredClone(prev);
      let currentRow: IFormRow, nextRow: IFormRow;
      if (cSec === 'heartSection') {
        currentRow = cloned.heartSection[cRow];
      } else {
        currentRow = cloned.raceSection[cRow];
      }
      currentRow.roundType.variant = 'roundType';
      if (currentRow.player1Input) currentRow.player1Input.variant = 'input';
      if (currentRow.player2Input) currentRow.player2Input.variant = 'input';
      if (currentRow.player3Input) currentRow.player3Input.variant = 'input';
      if (currentRow.player4Input) currentRow.player4Input.variant = 'input';

      if (nSec === 'heartSection') {
        nextRow = cloned.heartSection[nRow];
      } else {
        nextRow = cloned.raceSection[nRow];
      }
      nextRow.roundType.variant = 'activeRoundType';
      if (nextRow.player1Input) nextRow.player1Input.variant = 'activeInput';
      if (nextRow.player2Input) nextRow.player2Input.variant = 'activeInput';
      if (nextRow.player3Input) nextRow.player3Input.variant = 'activeInput';
      if (nextRow.player4Input) nextRow.player4Input.variant = 'activeInput';

      return cloned;
    });
    setActiveIndex((p) => p + 1);
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
      if (currentRow.player1Input) currentRow.player1Input.variant = 'input';
      if (currentRow.player2Input) currentRow.player2Input.variant = 'input';
      if (currentRow.player3Input) currentRow.player3Input.variant = 'input';
      if (currentRow.player4Input) currentRow.player4Input.variant = 'input';

      if (pSec === 'heartSection') {
        prevRow = cloned.heartSection[pRow];
      } else {
        prevRow = cloned.raceSection[pRow];
      }
      prevRow.roundType.variant = 'activeRoundType';
      if (prevRow.player1Input) prevRow.player1Input.variant = 'activeInput';
      if (prevRow.player2Input) prevRow.player2Input.variant = 'activeInput';
      if (prevRow.player3Input) prevRow.player3Input.variant = 'activeInput';
      if (prevRow.player4Input) prevRow.player4Input.variant = 'activeInput';

      return cloned;
    });
    setActiveIndex((p) => p - 1);
  }

  return {
    fields: localFields,
    activeIndex,
    setInputValue,
    goToNextRow,
    undoLastRow,
  };
}

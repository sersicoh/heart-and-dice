// useDiceForm.ts

import { useEffect, useRef, useState } from 'react';

import type { IDiceFormRow, IDiceFormSections } from '@views/dice/diceForm.types';

import { useDiceStore } from '@store/diceStore';
import { calcRegistryDice } from '@utils/calcFunctionsDice';
import { getDiceFields } from '@utils/getDiceFields';
import { useCustomSnackbar } from '@hooks/useCustomSnackbar';

type SectionName = keyof IDiceFormSections; // 'namesSection' | 'mountainSection' | 'pokerSection' | 'resultSection'

interface ILastFilledCell {
  section: SectionName;
  rowKey: string;
  playerIndex: number; // zero‐based index
}

export function useDiceFormLogic() {
  const { players, fields, setFields } = useDiceStore();
  const { showSnackbar } = useCustomSnackbar();

  // lokalny stan pól formularza (zachowujemy go tu, by reactować na zmiany)
  const [localFields, setLocalFields] = useState<IDiceFormSections>(
    fields || getDiceFields(players)
  );

  // Ref do ostatnio wypełnionej komórki (aby móc poprawnie oznaczyć ją 'inputFilled' i ewentualnie cofnąć)
  const lastFilledRef = useRef<ILastFilledCell | null>(null);

  // Aktywny gracz (zero‐based index w tablicy players)
  const [activePlayerIndex, setActivePlayerIndex] = useState<number>(() => {
    // Spróbujmy odczytać z istniejącego pola:
    if (fields) {
      const names = fields.namesSection.names as any;
      for (let i = 0; i < players.length; i++) {
        const key = `player${i + 1}` as `player${number}`;
        if (names[key]?.variant === 'activePlayer') {
          return i;
        }
      }
    }
    return 0;
  });

  // Przy zmianie store.fields – synchronizujemy localFields
  useEffect(() => {
    if (fields) {
      setLocalFields(fields);
    }
  }, [fields]);

  // Przy zmianie localFields – pushujemy do store
  useEffect(() => {
    setFields(localFields);
  }, [localFields, setFields]);

  //
  // Helper: nazwy kluczy „player1”, „player2”, …; oraz „p1Input”, „p2Input”, …
  //
  const playerCount = players.length;
  const nameKeys = Array.from({ length: playerCount }, (_, i) => `player${i + 1}` as const);
  const inputKeys = Array.from({ length: playerCount }, (_, i) => `p${i + 1}Input` as const);

  /**
   * Zmienia wartość w konkretnej komórce:
   *  sectionName: 'mountainSection' | 'pokerSection' | 'resultSection'
   *  rowKey: np. 'ones', 'pair', 'result'
   *  playerInputKey: 'p1Input' | 'p2Input' | … | 'pNInput'
   *  newValue: liczba lub null
   *
   * Po wstawieniu wartości: oznaczamy tę komórkę jako „ostatnio wypełnioną” (żeby później przy goToNextPlayer wiedzieć, którą zmienić na inputFilled)
   */
  function setInputValue(
    sectionName: Exclude<SectionName, 'namesSection'>,
    rowKey: string,
    playerInputKey: `p${number}Input`,
    newValue: number | null
  ) {
    setLocalFields((prev) => {
      const cloned = structuredClone(prev);

      let rowData: IDiceFormRow | undefined;
      if (sectionName === 'mountainSection') {
        rowData = (cloned.mountainSection as any)[rowKey] as IDiceFormRow;
      } else if (sectionName === 'pokerSection') {
        rowData = (cloned.pokerSection as any)[rowKey] as IDiceFormRow;
      } else {
        // 'resultSection'
        rowData = (cloned.resultSection as any)[rowKey] as IDiceFormRow;
      }

      if (rowData && rowData[playerInputKey]) {
        rowData[playerInputKey].value = newValue;
        // Oznacz tę komórkę jako możliwą do zatwierdzenia (jeśli jeszcze nie 'inputToFilled') – to ustawia UI, że gracz w tym miejscu wpisał wartość.
        if (rowData[playerInputKey].variant !== 'inputFilled') {
          rowData[playerInputKey].variant = 'inputToFilled';
        }
        // Zapiszemy lokalizację tej komórki w refie:
        const idx = Number(playerInputKey.slice(1, -5)) - 1; // 'p3Input' → 2
        lastFilledRef.current = { section: sectionName, rowKey, playerIndex: idx };
      }

      return cloned;
    });
  }

  /**
   * Przechodzimy do następnego gracza:
   *  - Zamieniamy w lastFilledRef komórkę z 'inputToFilled' na 'inputFilled'.
   *  - Zmieniamy nagłówek gracza w namesSection: poprzedni 'activePlayer' → 'name', nowy 'name' → 'activePlayer'.
   *  - W kolumnie nowego gracza: dla wszystkich wierszy, w których jego wartość jest null, ustawiamy 'inputToFilled'.
   *    Jeśli wiersz ma już wartość (inputField != null) → 'inputFilled'.
   *  - Czyścimy lastFilledRef (bo teraz jeszcze nic nie wypełniono dla nowego gracza).
   */
  function goToNextPlayer() {
    if (playerCount === 0) return;

    setLocalFields((prev) => {
      const cloned = structuredClone(prev);

      // 1) Zamień ostatnio wypełnioną komórkę na 'inputFilled'
      if (lastFilledRef.current) {
        const { section, rowKey, playerIndex } = lastFilledRef.current;
        const playerInputKey = `p${playerIndex + 1}Input` as `p${number}Input`;

        let targetRow: IDiceFormRow | undefined;
        if (section === 'mountainSection') {
          targetRow = cloned.mountainSection[rowKey as keyof IDiceFormRow];
        } else if (section === 'pokerSection') {
          targetRow = (cloned.pokerSection as any)[rowKey] as IDiceFormRow;
        } else {
          targetRow = cloned.resultSection[rowKey];
        }
        if (targetRow && targetRow[playerInputKey]) {
          targetRow[playerInputKey].variant = 'inputFilled';
        }
      }

      // 2) Zamień w nagłówku nazwę poprzedniego gracza z 'activePlayer' → 'name'
      const prevIndex = activePlayerIndex;
      const prevNameKey = `player${prevIndex + 1}` as `player${number}`;
      const namesRow = cloned.namesSection.names as any;
      if (namesRow[prevNameKey]) {
        namesRow[prevNameKey].variant = 'name';
      }

      // 3) Oblicz nowy aktywny indeks
      const nextIndex = (prevIndex + 1) % playerCount;
      setActivePlayerIndex(nextIndex);

      // 4) Ustaw w nagłówku nextIndex na 'activePlayer'
      const nextNameKey = `player${nextIndex + 1}` as `player${number}`;
      if (namesRow[nextNameKey]) {
        namesRow[nextNameKey].variant = 'activePlayer';
      }

      // 5) Dla nowego gracza – ustaw w każdej sekcji (mountain, poker, result):
      //    jeśli jego wartość w danym wierszu jest null → 'inputToFilled'
      //    w przeciwnym razie → 'inputFilled'
      const markPlayerCells = (sectionObj: Record<string, IDiceFormRow>) => {
        Object.entries(sectionObj).forEach(([rKey, rData]) => {
          const inputKey = `p${nextIndex + 1}Input` as `p${number}Input`;
          if (rData[inputKey]) {
            if (rData[inputKey].value === null) {
              rData[inputKey].variant = 'inputToFilled';
            } else {
              rData[inputKey].variant = 'inputFilled';
            }
          }
        });
      };

      markPlayerCells(cloned.mountainSection as any);
      markPlayerCells(cloned.pokerSection as any);
      markPlayerCells(cloned.resultSection as any);

      // 6) Wyczyść lastFilledRef – bo dopiero nowy gracz będzie wypełniał
      lastFilledRef.current = null;

      return cloned;
    });
  }

  /**
   * Cofnięcie ostatniego ruchu (undo):
   *  - Jeśli lastFilledRef jest null → nic nie robimy.
   *  - Inaczej:
   *      ♦ Zamień ostatnio wypełnioną komórkę (która była 'inputFilled') na 'lastInput' i wyczyść jej wartość (na null).
   *      ♦ Zmieniamy activePlayerIndex na tamtego gracza (bo cofamy go do wpisu ponownie).
   *      ♦ W nagłówku namesSection: ustawiamy aktualnie cofniętego gracza na 'activePlayer'; poprzedniego gracza na 'name'.
   *      ♦ Dla wszystkich jego innych wierszy – jeśli mają wartość nie‐null, to 'inputFilled'; jeśli null – 'input'.
   *      ♦ Czyścimy lastFilledRef.
   */
  function undoLastEntry() {
    if (!lastFilledRef.current) return;

    setLocalFields((prev) => {
      const cloned = structuredClone(prev);

      const { section, rowKey, playerIndex } = lastFilledRef.current!;
      const playerInputKey = `p${playerIndex + 1}Input` as `p${number}Input`;

      // 1) Cofnij wartość w tej komórce: ustaw value = null i variant = 'lastInput'
      let targetRow: IDiceFormRow | undefined;
      if (section === 'mountainSection') {
        targetRow = (cloned.mountainSection as any)[rowKey] as IDiceFormRow;
      } else if (section === 'pokerSection') {
        targetRow = (cloned.pokerSection as any)[rowKey] as IDiceFormRow;
      } else {
        targetRow = (cloned.resultSection as any)[rowKey] as IDiceFormRow;
      }
      if (targetRow && targetRow[playerInputKey]) {
        targetRow[playerInputKey].value = null;
        targetRow[playerInputKey].variant = 'lastInput';
      }

      // 2) Ustaw activePlayerIndex = playerIndex
      const prevActive = activePlayerIndex;
      setActivePlayerIndex(playerIndex);

      // 3) W nagłówku: cofnięty gracz → 'activePlayer';
      //    w razie potrzeby poprzedniego gracza (który był aktywny) → 'name'
      const namesRow = cloned.namesSection.names as any;
      // poprzedni active gracz → 'name'
      const prevNameKey = `player${prevActive + 1}` as `player${number}`;
      if (namesRow[prevNameKey]) {
        namesRow[prevNameKey].variant = 'name';
      }
      // cofnięty gracz → 'activePlayer'
      const undoneNameKey = `player${playerIndex + 1}` as `player${number}`;
      if (namesRow[undoneNameKey]) {
        namesRow[undoneNameKey].variant = 'activePlayer';
      }

      // 4) Dla cofniętego gracza, we wszystkich wierszach:
      //    – jeśli wartość != null → 'inputFilled'
      //    – jeśli wartość == null → 'input'
      const normalizePlayerCells = (sectionObj: Record<string, IDiceFormRow>) => {
        Object.entries(sectionObj).forEach(([rKey, rData]) => {
          const key = `p${playerIndex + 1}Input` as `p${number}Input`;
          if (rData[key]) {
            if (rData[key].value === null) {
              rData[key].variant = 'input';
            } else {
              rData[key].variant = 'inputFilled';
            }
          }
        });
      };
      normalizePlayerCells(cloned.mountainSection as any);
      normalizePlayerCells(cloned.pokerSection as any);
      normalizePlayerCells(cloned.resultSection as any);

      // 5) Wyczyszczenie lastFilledRef
      lastFilledRef.current = null;

      return cloned;
    });
  }

  /**
   * Na koniec: skończ grę:
   * – Sprawdzamy, czy w każdej kolumnie (dla każdego gracza) wszystkie wiersze (poza nagłówkami) mają nie‐null value.
   *   Jeśli nie, pokazujemy błąd przez snackbar i przerywamy.
   * – Jeśli tak, to wywołujemy calcRegistryDice dla każdej sekcji:
   *     • górna część (mountainSection) – wiersze ones…sixes → suma górna,
   *     • dolna część (pokerSection)   – wiersze pair…chance → suma dolna,
   *     • wiersz resultSection → suma całości.
   * – Zapisujemy wszystkie obliczenia w computedPoints (jeśli potrzebne).
   * – Zwracamy true, by np. hook widział, że można zakończyć grę i ewentualnie pokazać podsumowanie.
   */
  function finishGame(): boolean {
    // 1. Sprawdźmy, czy wszystkie pola (poza resultRow) są wypełnione:
    let incomplete = false;

    // Helper do sprawdzenia sekcji:
    const checkSectionFilled = (sectionObj: Record<string, IDiceFormRow>) => {
      Object.entries(sectionObj).forEach(([rKey, rData]) => {
        // Pomińmy wiersz, który jest 'result' (bo on jest później liczbą sumaryczną).
        if (rKey === 'result') return;
        inputKeys.forEach((inpKey) => {
          if (rData[inpKey]?.value === null) {
            incomplete = true;
          }
        });
      });
    };

    checkSectionFilled(localFields.mountainSection as any);
    checkSectionFilled(localFields.pokerSection as any);

    if (incomplete) {
      showSnackbar({
        message: 'Wszystkie pola muszą być wypełnione przed zakończeniem gry.',
        variant: 'error',
        hideIconVariant: false,
        autoHideDuration: 5000,
      });
      return false;
    }

    // 2. Obliczamy wyniki:
    setLocalFields((prev) => {
      const cloned = structuredClone(prev);

      /**
       * Dla każdej kolumny i każdej części: zrób tablicę wartości [p1, p2, …],
       * wywołaj odpowiednie calcRegistryDice, a otrzymane sumy wpisz do computedPoints w odpowiednim wierszu.
       *
       * Przykład: górna część (ones…sixes):
       *   const onesVals = [ones.p1Input.value, ones.p2Input.value, …];
       *   const onesRes  = calcRegistryDice.ones(onesVals);
       *   cloned.mountainSection.ones.computedPoints = onesRes;  // { p1: x, p2: y, … }
       *   … to samo dla twos, …, sixes
       *   // mountainResult → suma górna:
       *   const mountainVals = [mountainSection.result.p1Input.value, …];
       *   const mountainRes = calcRegistryDice.mountainResult(mountainVals);
       *   cloned.mountainSection.result.computedPoints = mountainRes;
       *
       * Dla pokerSection podobnie, a potem finalResult.
       */

      // === 2a. Górna część ===
      (Object.entries(cloned.mountainSection) as Array<[string, IDiceFormRow]>).forEach(
        ([rKey, rData]) => {
          if (!rData.fieldType.rowId) return;
          const calcFn = calcRegistryDice[rData.fieldType.rowId];
          if (!calcFn) return;

          // Zbierz wartości z rData.p1Input.value, rData.p2Input.value, …
          const vals: Array<number | null> = inputKeys.map((inpKey) => rData[inpKey]?.value ?? 0);
          const result = calcFn(vals);

          rData.computedPoints = { ...result };
        }
      );

      // === 2b. Dolna część (pokerSection) ===
      (Object.entries(cloned.pokerSection) as Array<[string, IDiceFormRow]>).forEach(
        ([rKey, rData]) => {
          if (!rData.fieldType.rowId) return;
          const calcFn = calcRegistryDice[rData.fieldType.rowId];
          if (!calcFn) return;

          const vals: Array<number | null> = inputKeys.map((inpKey) => rData[inpKey]?.value ?? 0);
          const result = calcFn(vals);
          rData.computedPoints = { ...result };
        }
      );

      // === 2c. Wiersz wynikowy (resultSection) ===
      (Object.entries(cloned.resultSection) as Array<[string, IDiceFormRow]>).forEach(
        ([rKey, rData]) => {
          if (!rData.fieldType.rowId) return;
          const calcFn = calcRegistryDice[rData.fieldType.rowId];
          if (!calcFn) return;

          const vals: Array<number | null> = inputKeys.map((inpKey) => rData[inpKey]?.value ?? 0);
          const result = calcFn(vals);
          rData.computedPoints = { ...result };
        }
      );

      return cloned;
    });

    return true;
  }

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

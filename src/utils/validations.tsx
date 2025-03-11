export function validateSumIs(
  p1: number,
  p2: number,
  p3: number,
  p4: number,
  expectedSum: number
): string | null {
  const total = p1 + p2 + p3 + p4;
  if (total !== expectedSum) {
    return `Suma w rundzie musi wynosić ${expectedSum}`;
  }
  return null;
}

export function validateMultiplesOf(
  p1: number,
  p2: number,
  p3: number,
  p4: number,
  multiple: number
): string | null {
  const arr = [p1, p2, p3, p4];
  for (const value of arr) {
    if (value % multiple !== 0) {
      return `Wartości w tej rundzie muszą być wielokrotnością ${multiple}`;
    }
  }
  return null;
}
export function validateAllowedValues(
  p1: number,
  p2: number,
  p3: number,
  p4: number,
  allowed: number[]
): string | null {
  const arr = [p1, p2, p3, p4];
  for (const val of arr) {
    if (!allowed.includes(val)) {
      return `Wartości w tej rundzie muszą należeć do zbioru: [${allowed.join(', ')}].`;
    }
  }
  return null;
}

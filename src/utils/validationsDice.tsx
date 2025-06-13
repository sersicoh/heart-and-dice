export function validateIntegerNonNegative(...values: number[]): string | null {
  return values.some((v) => !Number.isInteger(v) || v < 0)
    ? 'Wartości muszą być nieujemnymi liczbami całkowitymi'
    : null;
}

export function validateMultiples(multiple: number, ...values: number[]): string | null {
  return values.some((v) => v % multiple !== 0)
    ? `Wartości muszą być wielokrotnością ${multiple}`
    : null;
}

export function ConverterPrice(cents: number): string {
  const result = cents / 100;

  return result.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
}

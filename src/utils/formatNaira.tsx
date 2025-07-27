// formatNaira.js
export function formatNaira(amount = 0) {
  if (isNaN(amount)) {
    return "-";
  }
  const numAmount = Number(amount);
  return `${numAmount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;
}


export const CurrencyFormatter = (amount: number): string => formatNaira(amount);

/**
 * Extracts the whole (integer) part of a number based on the specified decimal precision.
 * @param amount - The numeric amount to extract the whole part from.
 * @param decimals - The number of decimal places used in the amount representation.
 * @returns The whole part of the amount as a string.
 */
export const getWholePart = (amount: number, decimals: number): string => {
  const divisor = Math.pow(10, decimals);
  return Math.floor(amount / divisor).toString();
};

/**
 * Extracts the fractional part of a number based on the specified decimal precision.
 * @param amount - The numeric amount to extract the fractional part from.
 * @param decimals - The number of decimal places used in the amount representation.
 * @returns The fractional part of the amount as a zero-padded string matching the decimal precision.
 */
export const getFractionalPart = (amount: number, decimals: number): string => {
  const divisor = Math.pow(10, decimals);
  return (amount % divisor).toString().padStart(decimals, '0');
};

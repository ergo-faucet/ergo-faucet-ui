import Decimal from 'decimal.js';

/**
 * Returns the whole (integer) part of a fixed-point value using Decimal.js for precise arithmetic.
 *
 * Examples:
 * - amount=123456n, decimals=3 → "123"
 * - amount=-123456n, decimals=3 → "-123"
 *
 * Edge cases:
 * - If `decimals` is 0, returns the full amount as a string (sign preserved)
 * - If |amount| < 10^decimals, returns "0" (or "-0" if the amount is negative)
 *
 * @param amount - The integer amount in base units (e.g., smallest token units).
 * @param decimals - The number of fractional decimal places used by `amount`.
 * @returns The whole part as a string. For negative inputs with magnitude < 10^decimals, returns "-0".
 * @throws RangeError - If `decimals` is not an integer, is negative, or is greater than 100_000.
 */
export const getWholePart = (amount: bigint, decimals: number): string => {
  const MAX_DECIMALS = 100_000;
  if (!Number.isInteger(decimals)) {
    throw new RangeError('decimals must be an integer number');
  }
  if (decimals < 0) {
    throw new RangeError('decimals must be a non-negative integer');
  }
  if (decimals > MAX_DECIMALS) {
    throw new RangeError(`decimals must be <= ${MAX_DECIMALS} to avoid excessive memory usage`);
  }

  const isNegative = amount < 0n;
  const absAmountStr = (isNegative ? -amount : amount).toString();

  if (decimals === 0) {
    return isNegative ? `-${absAmountStr}` : absAmountStr;
  }

  const absValue = new Decimal(absAmountStr);
  const scale = new Decimal(10).pow(decimals);

  if (absValue.lessThan(scale)) {
    return isNegative ? '-0' : '0';
  }

  const whole = absValue.div(scale).trunc().toString();
  return isNegative ? `-${whole}` : whole;
};

/**
 * Returns the fractional part (zero-padded) of a fixed-point value using Decimal.js for precise arithmetic.
 *
 * @param amount - The integer amount in base units (e.g., smallest token units).
 * @param decimals - The number of fractional decimal places used by `amount`.
 * @returns The fractional digits as a zero-padded string with length exactly `decimals`.
 * @throws RangeError - If `decimals` is not an integer, is negative, or is greater than 100_000.
 */
export const getFractionalPart = (amount: bigint, decimals: number): string => {
  const MAX_DECIMALS = 100_000;
  if (!Number.isInteger(decimals)) {
    throw new RangeError('decimals must be an integer number');
  }
  if (decimals < 0) {
    throw new RangeError('decimals must be a non-negative integer');
  }
  if (decimals > MAX_DECIMALS) {
    throw new RangeError(`decimals must be <= ${MAX_DECIMALS} to avoid excessive memory usage`);
  }

  if (decimals === 0) {
    return '0';
  }

  const isNegative = amount < 0n;
  const absAmountStr = (isNegative ? -amount : amount).toString();
  const absValue = new Decimal(absAmountStr);
  const scale = new Decimal(10).pow(decimals);

  if (absValue.lessThan(scale)) {
    return absAmountStr.padStart(decimals, '0');
  }

  const fractional = absValue.mod(scale);
  const fractionalStr = fractional.toFixed(0);
  return fractionalStr.padStart(decimals, '0');
};

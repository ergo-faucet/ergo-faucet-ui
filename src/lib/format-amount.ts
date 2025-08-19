import Decimal from 'decimal.js';

/**
 * Returns the whole (integer) part of a fixed-point value using Decimal.js for precise arithmetic.
 * @param amount - The integer amount in base units
 * @param decimals - The number of fractional decimal places used by `amount`.
 * @returns The whole part as a string
 * @throws RangeError - If decimals or amount are not integers
 */
export const getWholePart = (amount: bigint, decimals: number): string => {
  if (!Number.isInteger(decimals)) {
    throw new RangeError('decimals must be an integer number');
  }
  if (decimals < 0 || amount < 0) {
    throw new RangeError('values must be non-negative integers');
  }

  const base = new Decimal(10).pow(decimals); // 10^decimals
  const value = new Decimal(amount.toString()); // convert bigint → Decimal
  const whole = value.dividedToIntegerBy(base); // integer division

  return whole.toFixed(0); // ensure plain integer string
};

/**
 * Returns the fractional part (zero-padded) of a fixed-point value using Decimal.js for precise arithmetic.
 * @param amount - The integer amount in base units
 * @param decimals - The number of fractional decimal places used by `amount`.
 * @returns The fractional digits as a zero-padded string with length exactly `decimals`.
 * @throws RangeError - If decimals or amount are not integers
 */
export const getFractionalPart = (amount: bigint, decimals: number): string => {
  if (!Number.isInteger(decimals)) {
    throw new RangeError('decimals must be an integer number');
  }
  if (decimals < 0 || amount < 0) {
    throw new RangeError('values must be non-negative integers');
  }

  const base = new Decimal(10).pow(decimals);
  const value = new Decimal(amount.toString());

  // remainder = amount % base
  const fractional = value.mod(base);

  // pad with leading zeros to always match `decimals` length
  return fractional.toFixed(0).padStart(decimals, '0');
};

export const formatAmount = (amount: number, decimals: number): string => {
  const divisor = Math.pow(10, decimals);
  const whole = Math.floor(amount / divisor);
  const fractional = (amount % divisor).toString().padStart(decimals, '0');
  return `${whole}.${fractional}`;
};

export const getWholePart = (amount: number, decimals: number): string => {
  const divisor = Math.pow(10, decimals);
  return Math.floor(amount / divisor).toString();
};

export const getFractionalPart = (amount: number, decimals: number): string => {
  const divisor = Math.pow(10, decimals);
  return (amount % divisor).toString().padStart(decimals, '0');
};

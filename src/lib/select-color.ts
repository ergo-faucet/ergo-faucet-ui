const avatarColors = ['bg-green-1000 dark:bg-green-500', 'bg-green-700 dark:bg-green-200'];

export const getAssetColors = (assetName: string): string => {
  const length = assetName.length;
  const paletteSize = avatarColors.length;

  const remainder = length % paletteSize;

  if (remainder) return avatarColors[0];
  else return avatarColors[1];
};

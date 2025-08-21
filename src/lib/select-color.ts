const avatarColors = ['bg-green-1000 dark:bg-green-500', 'bg-green-700 dark:bg-green-200'];

/**
 * Selects a background color class for an asset based on its name length.
 * @param assetName - The name of the asset used to determine the color.
 * @returns The Tailwind CSS class string representing the chosen background color.
 */
export const getAssetColors = (assetName: string): string => {
  const length = assetName.length;
  const paletteSize = avatarColors.length;

  const remainder = length % paletteSize;

  if (remainder) return avatarColors[0];
  else return avatarColors[1];
};

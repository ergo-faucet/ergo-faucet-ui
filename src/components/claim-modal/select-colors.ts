const avatarColors = [
  ['#002700', '#4B9448'],
  ['#006501', '#99D395'],
];

export const getAssetColors = (assetName: string): string[] => {
  const length = assetName.length;
  const paletteSize = avatarColors.length;

  const remainder = length % paletteSize;

  if (remainder) return avatarColors[0];
  else return avatarColors[1];
};

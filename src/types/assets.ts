export type AssetType = 'bitcoin' | 'tether';
export interface Asset {
  assetType: AssetType;
  amount: number;
}

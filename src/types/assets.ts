export type AssetType = 'bitcoin' | 'tether' | 'ethereum';
export interface Asset {
  assetType: AssetType;
  amount: number;
}

export interface AuthenticationBody {
  address: string;
  challenge: string;
  proof: string;
  captchaToken: string;
}

export type AuthenticationResponse = {
  success: boolean;
  payload: {
    userId: number;
    address: string;
    name?: string;
  };
  accessToken: string;
};

export interface RefreshTokenResponse {
  success: boolean;
  newToken: string;
}

export interface ChallengeBody {
  changedAddress: string;
  addresses: string[];
}

export interface ChallengeResponse {
  challenge: string;
}

export interface PackageAssetDto {
  tokenId: string;
  assetName: string;
  amount: string;
  decimals: number;
  usageDescription: string;
}

export interface PackageAuthMethodDto {
  id: number;
  name: string;
  status?: string;
}

export type LastRequestStatusType = 'paid' | 'failed' | 'pending' | 'submitted';

export interface PackageType {
  id: number;
  name: string;
  description: string;
  type: string;
  openAt: number;
  closeAt: number;
  delay: string;
  numberEachUser: number;
  assets: PackageAssetDto[];
  authMethods: PackageAuthMethodDto[];
  totalRequestCount: number;
  lastRequestStatus: LastRequestStatusType;
  lastRequestTime: number;
}

export interface GetPackagesResponse {
  total: number;
  packages: PackageType[];
}

export interface AuthLoginResponse {
  redirectURL: string;
}

export interface ClaimPackageResponse {
  requestId: number;
}

export interface ClaimPackageRequestBody {
  packageId: number;
  destAddress: string;
  captchaToken: string;
}

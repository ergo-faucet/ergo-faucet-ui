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
  id: number;
  tokenId: string;
  amount: string;
  usageDescription: string;
}

export interface PackageAuthMethodDto {
  id: number;
  name: string;
  status?: string;
}

export interface GetPackagesResponse {
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
}

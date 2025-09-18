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

export interface AuthenticationBody {
  address: string;
  challenge: string;
  proof: string;
  captchaToken: string;
}

export interface AuthenticationResponse200 {
  success: boolean;
  payload: {
    userId: number;
    address: string;
    name?: string;
  };
  accessToken: string;
}

export interface AuthenticationResponseError {
  error: string;
  code: string;
}

export interface RefreshTokenResponse200 {
  success: boolean;
  newToken: string;
}

export interface RefreshTokenResponse401 {
  error: string;
}

export interface ChallengeBody {
  address: string;
}

export interface ChallengeResponse200 {
  challenge: string;
}

export interface ChallengeErrorResponse {
  error: string;
  code?: string;
}

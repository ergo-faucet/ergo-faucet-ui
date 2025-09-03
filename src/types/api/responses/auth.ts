export interface ChallengeResponse {
  challenge: string;
}

export interface ErgoAuthResponse {
  accessToken: string;
}

export interface RefreshTokenResponse {
  success: boolean;
  newToken: string;
}

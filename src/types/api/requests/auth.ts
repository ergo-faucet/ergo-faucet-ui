export interface ErgoAuthRequest {
  address: string;
  challenge: string;
  proof: string;
  captchaToken: string;
}

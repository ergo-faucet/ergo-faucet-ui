export interface TokenDetailsTypes {
  type: 'bitcoin' | 'tether';
  amount: number;
  contractAddress: string;
  href: string;
}

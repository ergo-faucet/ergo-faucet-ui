/**
 * Base interface for all wallet connectors.
 */
export interface WalletConnector {
  name: string;

  connect(): Promise<boolean>;
  getAddress(): Promise<string>;
  signMessage(address: string, message: string): Promise<string>;
}

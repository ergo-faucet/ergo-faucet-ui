import { WalletConnector } from './wallet-connector';

/**
 * Placeholder ErgoPay connector.
 * Should be extended with deep-linking logic.
 */
export class ErgoPayConnector implements WalletConnector {
  name = 'ergopay';

  async connect(): Promise<boolean> {
    return true; // ErgoPay flow usually does not have a persistent connection
  }

  async getAddress(): Promise<string> {
    throw new Error('❌ ErgoPay getAddress not implemented');
  }

  async signMessage(address: string, message: string): Promise<string> {
    void address;
    void message;
    throw new Error('❌ ErgoPay signMessage not implemented');
  }
}

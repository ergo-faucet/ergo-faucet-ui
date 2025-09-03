import { WalletConnector } from './wallet-connector';

/**
 * ErgoPayConnector
 *
 * This class implements the WalletConnector interface as a placeholder for the ErgoPay wallet.
 *
 * @example
 * import { WalletManager } from '@/lib/wallets';
 * import { ErgoPayConnector } from '@/lib/wallets/ergopay-connector';
 *
 * const wallet = new WalletManager(new ErgoPayConnector());
 * await wallet.connect();
 */
export class ErgoPayConnector implements WalletConnector {
  /** Name of the wallet connector */
  name = 'ergopay';

  /**
   * Connects to the wallet.
   *
   * For ErgoPay, this is a stub that always returns true. Actual connection
   * is typically handled by generating a deep link.
   *
   * @returns {Promise<boolean>} Always resolves to `false` as a placeholder.
   */
  async connect(): Promise<boolean> {
    return false;
  }

  /**
   * Returns the connected wallet's address.
   *
   * ErgoPay requires an external flow to return the address, so this method
   * is not implemented here.
   *
   * @throws {Error} Throws an error indicating the method is not implemented.
   * @returns {Promise<string>} Never resolves successfully in this stub.
   */
  async getAddress(): Promise<string> {
    throw new Error('ErgoPay getAddress not implemented');
  }

  /**
   * Signs an arbitrary message with the wallet.
   *
   * In ErgoPay, signing is usually done via a deep-link request to the mobile wallet.
   * This stub does not implement the functionality.
   *
   * @param {string} _address - The wallet address to sign from (unused in stub).
   * @param {string} _message - The message to sign (unused in stub).
   * @throws {Error} Always throws to indicate the method is not implemented.
   * @returns {Promise<string>} Never resolves successfully in this stub.
   */
  async signMessage(_address: string, _message: string): Promise<string> {
    void _address;
    void _message;
    throw new Error('ErgoPay signMessage not implemented');
  }
}

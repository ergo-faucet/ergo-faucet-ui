/**
 * WalletConnector
 *
 * Base interface for all wallet connectors.
 *
 * Any wallet implementation must implement this interface.
 * This ensures a consistent API for connecting, fetching addresses, and signing messages.
 *
 * @example
 * import { WalletConnector } from '@/lib/wallets/wallet-connector';
 *
 * class MyWallet implements WalletConnector {
 *   name = 'my-wallet';
 *
 *   async connect(): Promise<boolean> { return true; }
 *   async getAddress(): Promise<string> { return 'address'; }
 *   async signMessage(address: string, message: string): Promise<string> { return 'signed'; }
 * }
 */
export interface WalletConnector {
  /** Name of the wallet connector */
  name: string;

  /**
   * Connects to the wallet.
   *
   * @returns {Promise<boolean>} Resolves to true if the wallet connection succeeds.
   * @throws {Error} Implementation-specific errors if the connection fails.
   */
  connect(): Promise<boolean>;

  /**
   * Returns the wallet's primary address.
   *
   * @returns {Promise<string>} Resolves with the wallet address.
   * @throws {Error} Implementation-specific errors if the address cannot be retrieved.
   */
  getAddress(): Promise<string>;

  /**
   * Returns all relevant wallet addresses for auth (used + unused)
   */
  getAddresses?(): Promise<string[]>;

  /**
   * Returns the wallet's change address (explicitly)
   */
  getChangeAddress?(): Promise<string>;

  /**
   * Signs an arbitrary message with the wallet.
   *
   * @param {string} address - The wallet address to sign from.
   * @param {string} message - The message to sign.
   * @returns {Promise<string>} Resolves with the signed message/proof.
   * @throws {Error} Implementation-specific errors if signing fails.
   */
  signMessage(address: string, message: string): Promise<string>;
}

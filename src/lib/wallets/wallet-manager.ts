import { WalletConnector } from './wallet-connector';

/**
 * WalletManager
 *
 * A wrapper class that manages a wallet connector.
 * Provides a unified interface for connecting, fetching addresses, and signing messages,
 * regardless of the underlying wallet implementation.
 *
 * Supports switching connectors dynamically at runtime.
 *
 * @example
 * import { WalletManager, NautilusConnector, ErgoPayConnector } from '@/lib/wallets';
 *
 * // Using Nautilus
 * const wallet = new WalletManager(new NautilusConnector());
 * await wallet.connect();
 * const address = await wallet.getAddress();
 * const signature = await wallet.signMessage(address, "Hello world");
 *
 * // Switching to ErgoPay
 * wallet.setConnector(new ErgoPayConnector());
 * await wallet.connect();
 */
export class WalletManager {
  /** The active wallet connector */
  private connector: WalletConnector;

  /**
   * Creates a new WalletManager instance.
   *
   * @param {WalletConnector} connector - The initial wallet connector.
   */
  constructor(connector: WalletConnector) {
    this.connector = connector;
  }

  /**
   * Connects to the current wallet connector.
   *
   * @returns {Promise<boolean>} Resolves to true if connection succeeds.
   * @throws {Error} Throws if the underlying connector fails to connect.
   */
  async connect(): Promise<boolean> {
    return this.connector.connect();
  }

  /**
   * Retrieves the wallet address from the current connector.
   *
   * @returns {Promise<string>} Resolves with the wallet address.
   * @throws {Error} Throws if the underlying connector fails to retrieve the address.
   */
  async getAddress(): Promise<string> {
    return this.connector.getAddress();
  }

  /**
   * Retrieves all wallet addresses if supported by the connector.
   * Falls back to a single address array.
   */
  async getAddresses(): Promise<string[]> {
    if (this.connector.getAddresses) {
      return this.connector.getAddresses();
    }
    const single = await this.connector.getAddress();
    return [single];
  }

  /**
   * Retrieves the change address if supported; falls back to primary address.
   */
  async getChangeAddress(): Promise<string> {
    if (this.connector.getChangeAddress) {
      return this.connector.getChangeAddress();
    }
    return this.connector.getAddress();
  }

  /**
   * Signs a message using the current wallet connector.
   *
   * @param {string} addr - The wallet address to sign from.
   * @param {string} msg - The message to sign.
   * @returns {Promise<string>} Resolves with the signed message/proof.
   * @throws {Error} Throws if signing fails in the underlying connector.
   */
  async signMessage(addr: string, msg: string): Promise<string> {
    return this.connector.signMessage(addr, msg);
  }

  /**
   * Switches the wallet connector at runtime.
   *
   * @param {WalletConnector} connector - The new wallet connector to use.
   */
  setConnector(connector: WalletConnector): void {
    this.connector = connector;
  }

  /**
   * Returns the name of the current wallet connector.
   *
   * @returns {string} The connector's name.
   */
  getConnectorName(): string {
    return this.connector.name;
  }
}

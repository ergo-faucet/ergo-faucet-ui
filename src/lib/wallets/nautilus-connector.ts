import { WalletConnector } from './wallet-connector';

/**
 * NautilusConnector
 *
 * This class implements the WalletConnector interface for the Nautilus wallet.
 * Nautilus is a browser extension wallet for Ergo that allows connecting,
 * fetching addresses, and signing messages or transactions directly from the browser.
 *
 * @example
 * import { WalletManager } from '@/lib/wallets';
 * import { NautilusConnector } from '@/lib/wallets/nautilus-connector';
 *
 * const wallet = new WalletManager(new NautilusConnector());
 * await wallet.connect();
 * const address = await wallet.getAddress();
 * const signature = await wallet.signMessage(address, "Hello world");
 */
export class NautilusConnector implements WalletConnector {
  /** Name of the wallet connector */
  name = 'nautilus';

  /**
   * Connects to the Nautilus wallet.
   *
   * Checks if the Nautilus extension is available and requests a connection.
   *
   * @throws {Error} Throws if Nautilus extension is not found.
   * @returns {Promise<boolean>} Resolves to true if the user accepts the connection.
   */
  async connect(): Promise<boolean> {
    if (!window.ergoConnector?.nautilus) {
      throw new Error('Nautilus not found');
    }
    return window.ergoConnector.nautilus.connect();
  }

  /**
   * Returns the wallet's primary address.
   *
   * @throws {Error} Throws if the Nautilus context is unavailable.
   * @returns {Promise<string>} Resolves with the wallet's change address.
   */
  async getAddress(): Promise<string> {
    const ctx = await window.ergoConnector?.nautilus?.getContext();
    if (!ctx) throw new Error('Nautilus context unavailable');
    return ctx.get_change_address();
  }

  /**
   * Aggregates used and unused addresses
   */
  async getAddresses(): Promise<string[]> {
    const ctx = await window.ergoConnector?.nautilus?.getContext();
    if (!ctx) throw new Error('Nautilus context unavailable');
    const used = await ctx.get_used_addresses();
    const unused = await ctx.get_unused_addresses();
    return [...used, ...unused];
  }

  async getChangeAddress(): Promise<string> {
    const ctx = await window.ergoConnector?.nautilus?.getContext();
    if (!ctx) throw new Error('Nautilus context unavailable');
    return ctx.get_change_address();
  }

  /**
   * Signs an arbitrary message with the wallet.
   *
   * @param {string} address - The address to sign the message from.
   * @param {string} message - The message to sign.
   * @throws {Error} Throws if the Nautilus context is unavailable.
   * @returns {Promise<string>} Resolves with the signed message/proof.
   */
  async signMessage(address: string, message: string): Promise<string> {
    const ctx = await window.ergoConnector?.nautilus?.getContext();
    if (!ctx) throw new Error('Nautilus context unavailable');
    return ctx.sign_data(address, message);
  }
}

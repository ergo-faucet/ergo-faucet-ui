import { WalletConnector } from './wallet-connector';

export class NautilusConnector implements WalletConnector {
  name = 'nautilus';

  async connect(): Promise<boolean> {
    if (!window.ergoConnector?.nautilus) {
      throw new Error('❌ Nautilus not found');
    }
    return window.ergoConnector.nautilus.connect();
  }

  async getAddress(): Promise<string> {
    const ctx = await window.ergoConnector?.nautilus?.getContext();
    if (!ctx) throw new Error('❌ Nautilus context unavailable');
    return ctx.get_change_address();
  }

  async signMessage(address: string, message: string): Promise<string> {
    const ctx = await window.ergoConnector?.nautilus?.getContext();
    if (!ctx) throw new Error('❌ Nautilus context unavailable');
    return ctx.sign_data(address, message);
  }
}

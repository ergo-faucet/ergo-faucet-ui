import { WalletConnector } from './wallet-connector';

export class WalletManager {
  private connector: WalletConnector;

  constructor(connector: WalletConnector) {
    this.connector = connector;
  }

  async connect() {
    return this.connector.connect();
  }

  async getAddress() {
    return this.connector.getAddress();
  }

  async signMessage(addr: string, msg: string) {
    return this.connector.signMessage(addr, msg);
  }

  setConnector(connector: WalletConnector) {
    this.connector = connector;
  }

  getConnectorName() {
    return this.connector.name;
  }
}

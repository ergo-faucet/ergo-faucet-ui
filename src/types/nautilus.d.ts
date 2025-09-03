/** Nautilus Wallet API Types */
export interface NautilusWalletContext {
  sign_data: (rootAddress: string, message: string) => Promise<string>;
  get_change_address: () => Promise<string>;
}

export interface NautilusWallet {
  connect: () => Promise<boolean>;
  getContext: () => Promise<NautilusWalletContext>;
}

export interface ErgoConnector {
  nautilus?: NautilusWallet;
}

declare global {
  interface Window {
    ergoConnector?: ErgoConnector;
  }
}

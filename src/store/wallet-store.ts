import { create } from 'zustand';

interface WalletState {
  address: string;
  connected: boolean;
  setAddress: (address: string) => void;
  disconnect: () => void;
}

export const useWalletStore = create<WalletState>()((set) => ({
  address: '',
  connected: false,
  setAddress: (address) => set({ address, connected: Boolean(address) }),
  disconnect: () => set({ address: '', connected: false }),
}));

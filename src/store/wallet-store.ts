import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WalletState {
  address: string;
  connected: boolean;
  setAddress: (address: string) => void;
  disconnect: () => void;
}

export const useWalletStore = create<WalletState>()(
  persist(
    (set) => ({
      address: '',
      connected: false,
      setAddress: (address) => set({ address, connected: Boolean(address) }),
      disconnect: () => set({ address: '', connected: false }),
    }),
    { name: 'wallet-storage' }, // in localStorage
  ),
);

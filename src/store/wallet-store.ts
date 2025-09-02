import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WalletState {
  address: string | null;
  connected: boolean;
  setAddress: (address: string | null) => void;
  disconnect: () => void;
}

export const useWalletStore = create<WalletState>()(
  persist(
    (set) => ({
      address: null,
      connected: false,
      setAddress: (address) => set({ address, connected: Boolean(address) }),
      disconnect: () => set({ address: null, connected: false }),
    }),
    { name: 'wallet-storage' }, // in localStorage
  ),
);

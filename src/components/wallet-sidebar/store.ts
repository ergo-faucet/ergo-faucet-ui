import { create } from 'zustand';

type ViewState = 'selection' | 'login';

interface ViewStore {
  state: ViewState;
  setState: (newState: ViewState) => void;
  walletAddress: string;
  setWalletAddress: (address: string) => void;
  proof: string;
  setProof: (proof: string) => void;
  challenge: string;
  setChallenge: (challenge: string) => void;
}

export const useViewStore = create<ViewStore>((set) => ({
  state: 'login',
  setState: (newState) => set({ state: newState }),

  walletAddress: '',
  setWalletAddress: (address) => set({ walletAddress: address }),

  proof: '',
  setProof: (proof) => set({ proof }),

  challenge: '',
  setChallenge: (challenge) => set({ challenge }),
}));

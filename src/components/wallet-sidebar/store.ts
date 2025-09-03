import { create } from 'zustand';

type ViewState = 'selection' | 'login';

interface ViewStore {
  state: ViewState;
  setState: (newState: ViewState) => void;
}

export const useViewStore = create<ViewStore>((set) => ({
  state: 'selection',
  setState: (newState) => set({ state: newState }),
}));

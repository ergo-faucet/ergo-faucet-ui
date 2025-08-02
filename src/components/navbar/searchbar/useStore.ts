import { create } from 'zustand';

type SearchbarFiltersStore = {
  isAuthActivated: boolean;
  isAssetActivated: boolean;
  isCreatorActivated: boolean;

  setIsAuthActivated: (state: boolean) => void;
  setIsAssetActivated: (state: boolean) => void;
  setIsCreatorActivated: (state: boolean) => void;
};

export const useSearchbarFilters = create<SearchbarFiltersStore>((set) => ({
  isAuthActivated: false,
  isAssetActivated: false,
  isCreatorActivated: false,

  setIsAuthActivated: (state: boolean) => set({ isAuthActivated: state }),
  setIsAssetActivated: (state: boolean) => set({ isAssetActivated: state }),
  setIsCreatorActivated: (state: boolean) => set({ isCreatorActivated: state }),
}));

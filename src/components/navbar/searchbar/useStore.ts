import { JSX } from 'react';

import { create } from 'zustand';

import { SearchbarFilterType } from './types';

export enum Step {
  first,
  second,
  third,
}

type SearchbarFiltersStore = {
  isAuthActivated: boolean;
  isAssetActivated: boolean;
  isCreatorActivated: boolean;
  step: Step;
  filterComponents: JSX.Element[];
  lastFilterComponent: SearchbarFilterType | null;
  history: string[];
  searchQuery: string;

  setIsAuthActivated: (state: boolean) => void;
  setIsAssetActivated: (state: boolean) => void;
  setIsCreatorActivated: (state: boolean) => void;
  setFilterComponents: (components: JSX.Element[], last: SearchbarFilterType | null) => void;
  addFilterComponent: (component: JSX.Element, meta?: SearchbarFilterType) => void;
  removeFilterComponent: () => void;
  nextStep: () => void;
  addHistory: (his: string) => void;
  clearHistory: () => void;
  setSearchQuery: (query: string) => void;

  _filterMetadata: SearchbarFilterType[];
};

export const useSearchbar = create<SearchbarFiltersStore>((set, get) => ({
  isAuthActivated: false,
  isAssetActivated: false,
  isCreatorActivated: false,
  step: Step.first,
  filterComponents: [],
  lastFilterComponent: null,
  _filterMetadata: [],
  history: [],
  searchQuery: '',

  setIsAuthActivated: (state) => set({ isAuthActivated: state }),
  setIsAssetActivated: (state) => set({ isAssetActivated: state }),
  setIsCreatorActivated: (state) => set({ isCreatorActivated: state }),

  setFilterComponents: (components, last) => {
    set({
      filterComponents: components,
      lastFilterComponent: last,
    });
  },

  addFilterComponent: (component, meta?) => {
    const state = get();

    const newComponents = [...state.filterComponents, component];
    const newMetas = meta ? [...state._filterMetadata, meta] : [...state._filterMetadata];

    set({
      filterComponents: newComponents,
      _filterMetadata: newMetas,
      lastFilterComponent: meta ?? state.lastFilterComponent,
      isAuthActivated: meta === 'authMethod' ? true : state.isAuthActivated,
      isAssetActivated: meta === 'asset' ? true : state.isAssetActivated,
      isCreatorActivated: meta === 'creator' ? true : state.isCreatorActivated,
    });
  },

  removeFilterComponent: () => {
    const state = get();

    state.filterComponents.splice(state.filterComponents.length - 1, 1);
    state._filterMetadata.splice(state._filterMetadata.length - 1, 1);

    const stillHas = (name: SearchbarFilterType) => state._filterMetadata.some((m) => m === name);

    set({
      lastFilterComponent: state._filterMetadata.length > 0 ? state._filterMetadata.at(-1) : null,
      isAuthActivated: stillHas('authMethod'),
      isAssetActivated: stillHas('asset'),
      isCreatorActivated: stillHas('creator'),
    });
  },

  nextStep: () =>
    set((state) => ({
      step: state.step === Step.third ? Step.first : state.step + 1,
    })),
  addHistory: (his) => {
    if (!his) return;
    const { history } = get();
    set({ history: [...history, his] });
  },

  clearHistory: () => {
    set({ history: [] });
  },
  setSearchQuery: (query) => {
    set({ searchQuery: query });
  },
}));

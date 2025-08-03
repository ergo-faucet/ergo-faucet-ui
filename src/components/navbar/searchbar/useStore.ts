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
  removeFilterComponent: (index: number) => void;
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

  removeFilterComponent: (index) => {
    const state = get();

    const updatedComponents = [...state.filterComponents];
    const updatedMetas = [...state._filterMetadata];

    updatedComponents.splice(index, 1);

    const stillHas = (name: string) => updatedMetas.some((m) => m === name);

    set({
      filterComponents: updatedComponents,
      _filterMetadata: updatedMetas,
      lastFilterComponent: updatedMetas.length > 0 ? updatedMetas.at(-1)! : null,
      isAuthActivated: stillHas('auth'),
      isAssetActivated: stillHas('asset'),
      isCreatorActivated: stillHas('creator'),
    });
  },

  nextStep: () =>
    set((state) => ({
      step: state.step === Step.third ? Step.first : state.step + 1,
    })),
  addHistory: (his) => {
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

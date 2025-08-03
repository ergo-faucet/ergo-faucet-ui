import { JSX } from 'react';

import { create } from 'zustand';

import { SearchbarFilterType } from './types';

export enum Step {
  first,
  second,
  third,
}

type FilterComponentItem = {
  id: string; // stable unique ID, nanoid
  element: JSX.Element;
  meta: SearchbarFilterType | null;
};

type SearchbarFiltersStore = {
  isAuthActivated: boolean;
  isAssetActivated: boolean;
  isCreatorActivated: boolean;
  step: Step;
  filterComponents: FilterComponentItem[];
  lastFilterComponent: SearchbarFilterType | null;
  history: string[];
  searchQuery: string;

  setIsAuthActivated: (state: boolean) => void;
  setIsAssetActivated: (state: boolean) => void;
  setIsCreatorActivated: (state: boolean) => void;
  setFilterComponents: (components: FilterComponentItem[], last: SearchbarFilterType | null) => void;
  addFilterComponent: (id: string, component: JSX.Element, meta?: SearchbarFilterType) => void;
  removeFilterComponent: (id: string) => void;
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

  setFilterComponents: (components: FilterComponentItem[], last: SearchbarFilterType | null) => {
    set({
      filterComponents: components,
      lastFilterComponent: last,
      isAuthActivated: components.some((f) => f.meta === 'authMethod'),
      isAssetActivated: components.some((f) => f.meta === 'asset'),
      isCreatorActivated: components.some((f) => f.meta === 'creator'),
    });
  },

  addFilterComponent: (id: string, component: JSX.Element, meta?: SearchbarFilterType) => {
    const state = get();

    const newItem: FilterComponentItem = {
      id: id,
      element: component,
      meta: meta || null,
    };

    const filters = [...get().filterComponents, newItem];

    set({
      filterComponents: filters,
      lastFilterComponent: meta ? meta : state.lastFilterComponent,
      isAuthActivated: filters.some((f) => f.meta === 'authMethod'),
      isAssetActivated: filters.some((f) => f.meta === 'asset'),
      isCreatorActivated: filters.some((f) => f.meta === 'creator'),
    });
  },

  removeFilterComponent: (id: string) => {
    const state = get();

    let index = state.filterComponents.findIndex((filterComponent) => {
      return filterComponent.id === id;
    });
    if (index === -1) return; // if for any reason it does not exist !

    // each 3 badges are a search filter
    for (let i = 0; i < 3; i++) {
      state.filterComponents.splice(index, 1);
      if (state.filterComponents[index].meta !== null)
        state._filterMetadata.splice(state._filterMetadata.length - 1, 1);
      index--;
    }

    set({
      lastFilterComponent: state._filterMetadata.length > 0 ? state.lastFilterComponent : null,
      isAuthActivated: state.filterComponents.some((f) => f.meta === 'authMethod'),
      isAssetActivated: state.filterComponents.some((f) => f.meta === 'asset'),
      isCreatorActivated: state.filterComponents.some((f) => f.meta === 'creator'),
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

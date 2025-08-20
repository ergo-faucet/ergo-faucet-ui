import { JSX } from 'react';

import { create } from 'zustand';

import { SearchbarFilterType } from './types';

export enum Step {
  first,
  second,
  third,
}

type FilterComponentItem = {
  id: string; // can be a stable unique ID, nanoid
  element: JSX.Element;
  meta: SearchbarFilterType | null; // some badges are the filter type itself, they are the main step of each filter
};

type SearchbarFiltersStore = {
  // activated filters
  isAuthActivated: boolean;
  isAssetActivated: boolean;
  isCreatorActivated: boolean;
  // which state of each filter we are in
  step: Step;
  // all filter components to render them correctly and in order
  filterComponents: FilterComponentItem[];
  // tracking last filter component to show the corresponding components in each step
  lastFilterComponent: SearchbarFilterType | null;
  // history of searches
  history: string[];
  // input string of searchbar
  searchQuery: string;
  // keep track of main filters in order
  mainFilters: SearchbarFilterType[];

  // functions to manipulate states
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
};

export const useSearchbar = create<SearchbarFiltersStore>((set, get) => ({
  isAuthActivated: false,
  isAssetActivated: false,
  isCreatorActivated: false,
  step: Step.first,
  filterComponents: [],
  lastFilterComponent: null,
  mainFilters: [],
  history: [],
  searchQuery: '',

  setIsAuthActivated: (state) => set({ isAuthActivated: state }),
  setIsAssetActivated: (state) => set({ isAssetActivated: state }),
  setIsCreatorActivated: (state) => set({ isCreatorActivated: state }),

  setFilterComponents: (components: FilterComponentItem[]) => {
    const lastMeta = [...components].reverse().find((f) => f.meta !== null)?.meta;
    set({
      filterComponents: components,
      lastFilterComponent: lastMeta,
      isAuthActivated: components.some((f) => f.meta === 'authMethod'),
      isAssetActivated: components.some((f) => f.meta === 'asset'),
      isCreatorActivated: components.some((f) => f.meta === 'creator'),
    });
  },

  addFilterComponent: (id: string, component: JSX.Element, meta?: SearchbarFilterType) => {
    const state = get();

    const newItem: FilterComponentItem = {
      id,
      element: component,
      meta: meta ?? null,
    };

    const nextFilterComponents = [...state.filterComponents, newItem];

    // Rebuild main filters and last meta from components to avoid drift
    const nextMainFilters = nextFilterComponents
      .filter((f) => f.meta !== null)
      .map((f) => f.meta!) as SearchbarFilterType[];

    const lastMeta = [...nextFilterComponents].reverse().find((f) => f.meta !== null)?.meta ?? null;

    set({
      filterComponents: nextFilterComponents,
      mainFilters: nextMainFilters,
      lastFilterComponent: lastMeta,
      isAuthActivated: nextFilterComponents.some((f) => f.meta === 'authMethod'),
      isAssetActivated: nextFilterComponents.some((f) => f.meta === 'asset'),
      isCreatorActivated: nextFilterComponents.some((f) => f.meta === 'creator'),
    });
  },

  removeFilterComponent: (id: string) => {
    const state = get();
    const { filterComponents } = state;

    const index = filterComponents.findIndex((f) => f.id === id);
    if (index === -1) return;

    // Find group start: nearest item with meta !== null within [-2, +2]
    const len = filterComponents.length;

    const findMetaIndex = (): number => {
      // search left up to 2
      for (let i = index; i >= Math.max(0, index - 2); i--) {
        if (filterComponents[i]?.meta !== null) return i;
      }
      // fallback: search right up to 2 (handles unexpected ordering)
      for (let i = index + 1; i <= Math.min(len - 1, index + 2); i++) {
        if (filterComponents[i]?.meta !== null) return i;
      }
      // ultimate fallback: assume group aligned to multiples of 3
      return Math.max(0, index - (index % 3));
    };

    const groupStart = findMetaIndex();
    const groupEnd = Math.min(groupStart + 2, len - 1);

    const nextFilterComponents = filterComponents.filter((_item, i) => i < groupStart || i > groupEnd);

    // Rebuild main filters & last meta from remaining components
    const nextMainFilters = nextFilterComponents
      .filter((f) => f.meta !== null)
      .map((f) => f.meta!) as SearchbarFilterType[];

    const lastMeta = [...nextFilterComponents].reverse().find((f) => f.meta !== null)?.meta ?? null;

    set({
      filterComponents: nextFilterComponents,
      mainFilters: nextMainFilters,
      lastFilterComponent: lastMeta,
      isAuthActivated: nextFilterComponents.some((f) => f.meta === 'authMethod'),
      isAssetActivated: nextFilterComponents.some((f) => f.meta === 'asset'),
      isCreatorActivated: nextFilterComponents.some((f) => f.meta === 'creator'),
    });
  },

  nextStep: () =>
    set((state) => ({
      step: state.step === Step.third ? Step.first : state.step + 1,
    })),
  addHistory: (his) => {
    if (!his) return;
    const { history } = get();
    set({ history: [his, ...history] });
  },

  clearHistory: () => {
    set({ history: [] });
  },
  setSearchQuery: (query) => {
    set({ searchQuery: query });
  },
}));

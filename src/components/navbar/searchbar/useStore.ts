import { JSX } from 'react';

import { create } from 'zustand';

import { SearchbarFilterType } from './types';

// Enum to represent which step of a filter we are on
export enum Step {
  first,
  second,
  third,
}

type FilterComponentItem = {
  id: string; // stable unique ID (e.g., nanoid)
  element: JSX.Element;
  meta: SearchbarFilterType | null; // null for regular components
};

// Zustand store type definition
type SearchbarFiltersStore = {
  // Flags for which main filters are activated
  isAuthActivated: boolean;
  isAssetActivated: boolean;
  isCreatorActivated: boolean;

  // current step in the filter sequence
  step: Step;
  // all filter components to render
  filterComponents: FilterComponentItem[];
  // last main filter added (to show next steps)
  lastFilterComponent: SearchbarFilterType | null;
  // main filters in order (to not include them anymore)
  mainFilters: SearchbarFilterType[];
  // search history
  history: string[];
  // current search input
  searchQuery: string;

  // State update functions
  setIsAuthActivated: (state: boolean) => void;
  setIsAssetActivated: (state: boolean) => void;
  setIsCreatorActivated: (state: boolean) => void;
  setFilterComponents: (components: FilterComponentItem[]) => void;
  addFilterComponent: (id: string, component: JSX.Element, meta?: SearchbarFilterType) => void;
  removeFilterComponent: (id: string) => void;
  nextStep: () => void;
  addHistory: (his: string) => void;
  clearHistory: () => void;
  setSearchQuery: (query: string) => void;
};

// Helper to load search history from localStorage on initialization
const getInitialHistory = () => {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem('searchHistory');
  return stored ? JSON.parse(stored) : [];
};

// Zustand store implementation
export const useSearchbar = create<SearchbarFiltersStore>((set, get) => ({
  isAuthActivated: false,
  isAssetActivated: false,
  isCreatorActivated: false,
  step: Step.first,
  filterComponents: [],
  lastFilterComponent: null,
  mainFilters: [],
  history: getInitialHistory(),
  searchQuery: '',

  // Activate/deactivate main filters
  setIsAuthActivated: (state) => set({ isAuthActivated: state }),
  setIsAssetActivated: (state) => set({ isAssetActivated: state }),
  setIsCreatorActivated: (state) => set({ isCreatorActivated: state }),

  // Replace all filter components at once
  setFilterComponents: (components: FilterComponentItem[]) => {
    const lastMeta = [...components].reverse().find((f) => f.meta !== null)?.meta ?? null;
    set({
      filterComponents: components,
      lastFilterComponent: lastMeta,
      isAuthActivated: components.some((f) => f.meta === 'authMethod'),
      isAssetActivated: components.some((f) => f.meta === 'asset'),
      isCreatorActivated: components.some((f) => f.meta === 'creator'),
    });
  },

  // Add a single filter component
  addFilterComponent: (id, component, meta) => {
    const state = get();
    const newItem: FilterComponentItem = { id, element: component, meta: meta ?? null };
    const nextFilterComponents = [...state.filterComponents, newItem];

    // Rebuild main filters array and last main filter
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

  // Remove a filter component and its group of related steps
  removeFilterComponent: (id) => {
    const state = get();
    const { filterComponents } = state;

    const index = filterComponents.findIndex((f) => f.id === id);
    if (index === -1) return;

    const len = filterComponents.length;

    // Determine the start of the group of 3 steps related to the main filter
    const findMetaIndex = (): number => {
      // Search left up to 2 positions (assuming that remove button is on the rightmost component)
      for (let i = index; i >= Math.max(0, index - 2); i--) {
        if (filterComponents[i]?.meta !== null) return i;
      }
      return Math.max(0, index - (index % 3));
    };

    const groupStart = findMetaIndex();
    const groupEnd = Math.min(groupStart + 2, len - 1);

    const nextFilterComponents = filterComponents.filter((_item, i) => i < groupStart || i > groupEnd);

    // Rebuild main filters and last main filter
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

  // Move to the next step (cycles from third back to first)
  nextStep: () =>
    set((state) => ({
      step: state.step === Step.third ? Step.first : state.step + 1,
    })),

  // Add a search term to history
  addHistory: (his) => {
    if (!his) return;
    const { history } = get();
    const nextHistory = [his, ...history].slice(0, 6);

    set({ history: nextHistory });

    // Persist history in localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('searchHistory', JSON.stringify(nextHistory));
    }
  },

  // Clear history both in state and localStorage
  clearHistory: () => {
    set({ history: [] });
    if (typeof window !== 'undefined') {
      localStorage.removeItem('searchHistory');
    }
  },

  // Update the current search input
  setSearchQuery: (query) => {
    set({ searchQuery: query });
  },
}));

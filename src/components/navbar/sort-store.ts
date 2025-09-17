import { create } from 'zustand';

export type SortField = 'name' | 'releaseDate';
export type SortOrder = 'asc' | 'desc';

interface SortState {
  field: SortField;
  order: SortOrder;
  setField: (field: SortField) => void;
  setOrder: (order: SortOrder) => void;
  toggleOrder: () => void;
}

export const useSortStore = create<SortState>((set, get) => ({
  field: 'releaseDate',
  order: 'desc',
  setField: (field) => set({ field }),
  setOrder: (order) => set({ order }),
  toggleOrder: () => set({ order: get().order === 'asc' ? 'desc' : 'asc' }),
}));

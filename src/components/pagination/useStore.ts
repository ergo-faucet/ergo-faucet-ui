import { create } from 'zustand';

interface PaginationState {
  currentPage: number;
  currentFirstIndex: number;
  entriesPerPage: number;
  totalPages: number;
  totalEntries: number;

  // Basic setters
  setCurrentPage: (page: number) => void;
  setCurrentFirstIndex: (index: number) => void;
  setEntriesPerPage: (value: number) => void;
  setTotalPages: (total: number) => void;
  setTotalEntries: (total: number) => void;

  // Actions
  increaseCurrentPage: () => void;
  decreaseCurrentPage: () => void;
}

export const usePaginationStore = create<PaginationState>((set, get) => ({
  // Initial state
  currentPage: 1,
  currentFirstIndex: 1,
  entriesPerPage: 9,
  totalPages: 26,
  totalEntries: 233,

  // Basic setters
  setCurrentPage: (page) => {
    const { entriesPerPage } = get();
    set({
      currentPage: page,
      currentFirstIndex: (page - 1) * entriesPerPage + 1,
    });
  },
  setCurrentFirstIndex: (index) => set({ currentFirstIndex: index }),
  setEntriesPerPage: (value) => {
    const { totalEntries, setTotalPages, setCurrentPage, setCurrentFirstIndex } = get();
    set({ entriesPerPage: value });
    setTotalPages(Math.ceil(totalEntries / value));
    setCurrentPage(1);
    setCurrentFirstIndex(1);
  },
  setTotalPages: (total) => set({ totalPages: total }),
  setTotalEntries: (total) => set({ totalEntries: total }),

  // Increase and decrease with boundary checks
  increaseCurrentPage: () => {
    const { currentPage, totalPages, entriesPerPage } = get();
    if (currentPage < totalPages) {
      set({
        currentPage: currentPage + 1,
        currentFirstIndex: currentPage * entriesPerPage + 1,
      });
    }
  },

  decreaseCurrentPage: () => {
    const { currentPage, entriesPerPage } = get();
    if (currentPage > 1) {
      set({
        currentPage: currentPage - 1,
        currentFirstIndex: (currentPage - 2) * entriesPerPage + 1,
      });
    }
  },
}));

/*
 Derived selectors 
*/
export const useCurrentLastIndex = () =>
  usePaginationStore((state) => Math.min(state.currentFirstIndex + state.entriesPerPage - 1, state.totalEntries));

export const useHasNextPage = () => usePaginationStore((state) => state.currentPage < state.totalPages);

export const useHasPreviousPage = () => usePaginationStore((state) => state.currentPage > 1);

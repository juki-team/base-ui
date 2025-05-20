import { create } from 'zustand';

interface UseLazyLoadingStore {
  loadingCount: number;
  startLoading: () => void;
  stopLoading: () => void;
  isLoading: boolean;
}

export const useLazyLoadingStore = create<UseLazyLoadingStore>((set, get) => ({
  loadingCount: 0,
  startLoading: () => set(state => ({ loadingCount: state.loadingCount + 1 })),
  stopLoading: () => set(state => ({ loadingCount: Math.max(state.loadingCount - 1, 0) })),
  get isLoading() {
    return get().loadingCount > 0;
  },
}));

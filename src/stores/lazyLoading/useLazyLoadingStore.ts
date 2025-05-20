import { create } from 'zustand';

interface LazyLoadingStore {
  loadingIds: Set<string>;
  loadingCount: number;
  startLoading: (id: string) => void;
  stopLoading: (id: string) => void;
}

export const useLazyLoadingStore = create<LazyLoadingStore>((set, get) => ({
  loadingIds: new Set(),
  loadingCount: 0,
  startLoading: (id) => {
    const ids = new Set(get().loadingIds);
    if (!ids.has(id)) {
      ids.add(id);
      set({
        loadingIds: ids,
        loadingCount: ids.size,
      });
    }
  },
  stopLoading: (id) => {
    const ids = new Set(get().loadingIds);
    if (ids.has(id)) {
      ids.delete(id);
      set({
        loadingIds: ids,
        loadingCount: ids.size,
      });
    }
  },
}));

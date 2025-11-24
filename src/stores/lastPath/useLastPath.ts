import { create } from 'zustand';
import { LastPathType } from '../../providers/JukiLastPathInitializer/types';

interface LastPathState {
  lastPath: LastPathType,
  pushPath: (props: { key: string, pathname: string, searchParams: URLSearchParams }) => void,
  setInitialLastPath: (lastPath: LastPathType) => void,
}

export const useLastPathStore = create<LastPathState>()((set, get) => ({
    lastPath: {},
    pushPath: ({ key, pathname, searchParams }) => {
      const newLastPath = {
        ...get().lastPath,
        [key]: { pathname, searchParams },
      };
      set({ lastPath: newLastPath });
    },
    setInitialLastPath: (lastPath) => {
      set({ lastPath });
    },
  }),
);

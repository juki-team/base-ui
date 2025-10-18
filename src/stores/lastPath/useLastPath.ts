import { create } from 'zustand';
import { LastPathType } from '../../contexts/JukiLastPathProvider/types';

interface LastPathState {
  lastPath: LastPathType,
  pushPath: (props: { key: string, pathname: string, searchParams: URLSearchParams }) => void,
  setInitialLastPath: (lastPath: LastPathType, nicknameUpdated: boolean) => void,
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
    setInitialLastPath: (lastPath, nicknameUpdated) => {
      if (Object.keys(get().lastPath).length === 0 || nicknameUpdated) {
        set({ lastPath });
      }
    },
  }),
);

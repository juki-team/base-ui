import { create } from 'zustand/index';
import { LastPathType } from '../../contexts/JukiLastPathProvider/types';

interface LastPathState {
  pushPath: (props: { key: string, pathname: string, searchParams: URLSearchParams }) => void,
  lastPath: LastPathType,
  setLastPath: (lastPath: LastPathType) => void,
}

export const useLastPathStore = create<LastPathState>((set) => ({
  pushPath: ({ key, pathname, searchParams }) => set(state => ({
    lastPath: {
      ...state.lastPath,
      [key]: { pathname, searchParams },
    },
  })),
  lastPath: {},
  setLastPath: (lastPath: LastPathType) => set({ lastPath }),
}));

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { LastPathType } from '../../contexts/JukiLastPathProvider/types';

interface LastPathState {
  lastPath: LastPathType,
  pushPath: (props: { key: string, pathname: string, searchParams: URLSearchParams }) => void,
  setInitialLastPath: (lastPath: LastPathType, nicknameUpdated: boolean) => void,
}

export const useLastPathStore = create<LastPathState>()(
  persist((set, get) => ({
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
    {
      name: 'jk-last-path-store',
      storage: createJSONStorage(() => sessionStorage, {
        replacer: (_, value) => {
          if (value instanceof URLSearchParams) {
            return { __urlSearchParams: true, value: value.toString() };
          }
          return value;
        },
        reviver: (_, value) => {
          // @ts-ignore
          if (value && value.__urlSearchParams) {
            // @ts-ignore
            return new URLSearchParams(value.value);
          }
          return value;
        },
      }),
      partialize: (state) => ({ lastPath: state.lastPath }),
    },
  ),
);

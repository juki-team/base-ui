import { getClientId } from '@juki-team/commons';
import { createContext, type PropsWithChildren, useContext, useRef } from 'react';
import { KeyedMutator } from 'swr';
import { v4 } from 'uuid';
import { create, useStore as useZustandStore } from 'zustand';
import { StoreApi } from 'zustand/vanilla';
import { InitUserState, UserState } from '../../providers/JukiUserProvider/types';

const createUserStore = (initState: InitUserState) => create<UserState>()(
  (set, get) => {
    const uiId = v4();
    return {
      uiId,
      clientId: getClientId(initState.user.sessionId, uiId),
      user: initState.user,
      setUser: (user) => {
        const current = get().user;
        const newUser = { ...current, ...user };
        const newClientId = getClientId(newUser.sessionId, uiId);
        if (JSON.stringify(current) !== JSON.stringify(newUser)) {
          set({
            user: newUser,
            isLoading: !newUser.sessionId,
            clientId: newClientId,
          });
        } else if (get().clientId !== newClientId) {
          set({ clientId: newClientId });
        }
      },
      company: initState.company,
      setCompany: (company) => {
        const current = get().company;
        if (JSON.stringify(current) !== JSON.stringify(company)) {
          set({ company });
        }
      },
      isLoading: initState.isLoading,
      mutate: null as unknown as KeyedMutator<any>,
      setMutate: (mutate) => set({ mutate }),
      device: { label: '', isMobile: false, isBrowser: false, type: '', osLabel: '' },
      setDevice: (device) => set({ device }),
    };
  },
  // persis(...,
  //   {
  //     name: 'jk-user-store',
  //     storage: createJSONStorage(() => sessionStorage, {}),
  //     partialize: (state) => ({
  //       user: state.user,
  //       company: state.company,
  //       isLoading: state.isLoading,
  //         device: state.device,
  //     }),
  //   },
  // ),
);

const UserStoreContext = createContext<StoreApi<UserState> | null>(null);

export function UserStoreProvider({
                                    children,
                                    initialUser,
                                  }: PropsWithChildren<{ initialUser: InitUserState }>) {
  const storeRef = useRef<StoreApi<UserState>>(null);
  
  if (!storeRef.current) {
    storeRef.current = createUserStore(initialUser);
  }
  
  return (
    <UserStoreContext.Provider value={storeRef.current}>
      {children}
    </UserStoreContext.Provider>
  );
}

export function useUserStore<T>(selector: (state: UserState) => T): T {
  const store = useContext(UserStoreContext);
  if (!store) {
    throw new Error('useUserStore must be used within UserStoreProvider');
  }
  
  return useZustandStore(store, selector);
}

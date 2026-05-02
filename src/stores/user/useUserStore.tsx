import type { PingResponseDTO } from '@juki-team/commons/dto';
import { getClientId } from '@juki-team/commons/helpers';
import type { ContentResponse } from '@juki-team/commons/types';
import { createContext, type PropsWithChildren, useContext, useRef } from 'react';
import type { KeyedMutator } from 'swr';
import { v4 } from 'uuid';
import { create, useStore as useZustandStore } from 'zustand';
import type { StoreApi } from 'zustand/vanilla';
import type { InitUserState, UserState } from '../../components/providers/JukiUserProvider/types';

const createUserStore = (initState: InitUserState) =>
  create<UserState>()(
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
        organization: initState.organization,
        setOrganization: (organization) => {
          if (!organization) return;
          const current = get().organization;
          if (JSON.stringify(current) !== JSON.stringify(organization)) {
            set({ organization });
          }
        },
        isLoading: initState.isLoading,
        mutate: null as unknown as KeyedMutator<ContentResponse<PingResponseDTO>>,
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
    //       organization: state.organization,
    //       isLoading: state.isLoading,
    //         device: state.device,
    //     }),
    //   },
    // ),
  );

const UserStoreContext = createContext<StoreApi<UserState> | null>(null);

export function UserStoreProvider({ children, initialUser }: PropsWithChildren<{ initialUser: InitUserState }>) {
  const storeRef = useRef<StoreApi<UserState>>(null);

  if (!storeRef.current) {
    storeRef.current = createUserStore(initialUser);
  }

  return <UserStoreContext.Provider value={storeRef.current}>{children}</UserStoreContext.Provider>;
}

export function useUserStore<T>(selector: (state: UserState) => T): T {
  const store = useContext(UserStoreContext);
  if (!store) {
    throw new Error('useUserStore must be used within UserStoreProvider');
  }

  return useZustandStore(store, selector);
}

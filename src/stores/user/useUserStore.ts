import { CompanyPingType, UserPingType } from '@juki-team/commons';
import { KeyedMutator } from 'swr';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { EMPTY_COMPANY, EMPTY_USER } from '../../constants';
import { DeviceType } from './types';

interface UserState {
  user: UserPingType,
  setUser: (user: Partial<UserPingType>) => void,
  company: CompanyPingType,
  setCompany: (company: CompanyPingType) => void,
  isLoading: boolean,
  mutate: KeyedMutator<any>,
  setMutate: (mutate: KeyedMutator<any>) => void,
  device: DeviceType,
  setDevice: (user: DeviceType) => void,
}

export const useUserStore = create<UserState>()(
  persist((set, get) => ({
      user: EMPTY_USER,
      setUser: (user) => {
        const current = get().user;
        const newUser = { ...current, ...user };
        if (JSON.stringify(current) !== JSON.stringify(newUser)) {
          return set({ user: newUser, isLoading: !newUser?.sessionId });
        }
      },
      company: EMPTY_COMPANY,
      setCompany: (company) => {
        const current = get().company;
        if (JSON.stringify(current) !== JSON.stringify(company)) {
          set({ company });
        }
      },
      isLoading: true,
      mutate: null as unknown as KeyedMutator<any>,
      setMutate: (mutate) => set({ mutate }),
      device: { label: '', isMobile: false, isBrowser: false, type: '', osLabel: '' },
      setDevice: (device) => set({ device }),
    }),
    {
      name: 'jk-user-store',
      storage: createJSONStorage(() => sessionStorage, {}),
      partialize: (state) => ({
        user: state.user,
        company: state.company,
        isLoading: state.isLoading,
        device: state.device,
      }),
    },
  ),
);

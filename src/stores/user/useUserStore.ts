import { CompanyPingType, UserPingType } from '@juki-team/commons';
import { KeyedMutator } from 'swr';
import { create } from 'zustand/index';
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

export const useUserStore = create<UserState>((set) => ({
  user: EMPTY_USER,
  setUser: (user) => set(state => {
    const newUser = { ...state.user, ...user };
    if (JSON.stringify(state.user) !== JSON.stringify(newUser)) {
      return { user: newUser, isLoading: !newUser?.sessionId };
    }
    return state;
  }),
  company: EMPTY_COMPANY,
  setCompany: (company) => set({ company }),
  isLoading: true,
  mutate: null as unknown as KeyedMutator<any>,
  setMutate: (mutate) => set({ mutate }),
  device: { label: '', isMobile: false, isBrowser: false, type: '', osLabel: '' },
  setDevice: (device) => set({ device }),
}));

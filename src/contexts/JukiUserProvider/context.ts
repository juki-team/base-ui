import { CompanyPingType, UserPingType } from '@juki-team/commons';
import { createContext, Dispatch, SetStateAction } from 'react';
import { KeyedMutator } from 'swr';
import { EMPTY_COMPANY, EMPTY_USER } from '../../constants';
import { DeviceType } from './types';

export const UserContext = createContext<{
  user: UserPingType,
  company: CompanyPingType,
  setUser: Dispatch<SetStateAction<UserPingType>>,
  isLoading: boolean,
  // isValidating: boolean,
  mutate: KeyedMutator<any>,
  device: DeviceType,
}>({
  user: EMPTY_USER,
  company: EMPTY_COMPANY,
  setUser: () => null,
  isLoading: true,
  // isValidating: true,
  mutate: null as unknown as KeyedMutator<any>,
  device: { label: '', isMobile: false, isBrowser: false, type: '', osLabel: '' },
});

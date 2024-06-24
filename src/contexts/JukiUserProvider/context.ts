import { CompanyPingType, USER_GUEST, UserPingType } from '@juki-team/commons';
import { createContext, Dispatch, SetStateAction } from 'react';
import { KeyedMutator } from 'swr';
import { EMPTY_COMPANY } from '../../constants';
import { SocketIo } from './SocketIo';
import { DeviceType } from './types';

export const UserContext = createContext<{
  user: UserPingType,
  company: CompanyPingType,
  setUser: Dispatch<SetStateAction<UserPingType>>,
  isLoading: boolean,
  // isValidating: boolean,
  mutate: KeyedMutator<any>,
  socket: SocketIo,
  device: DeviceType,
}>({
  user: USER_GUEST,
  company: EMPTY_COMPANY,
  setUser: () => null,
  isLoading: true,
  // isValidating: true,
  mutate: null as unknown as KeyedMutator<any>,
  socket: null as unknown as SocketIo,
  device: { label: '', isMobile: false, isBrowser: false, type: '', osLabel: '' },
});

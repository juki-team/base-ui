import { CompanyPingType, USER_GUEST, UserPingType } from '@juki-team/commons';
import { createContext, Dispatch, SetStateAction } from 'react';
import { KeyedMutator } from 'swr';
import { SocketIo } from '../../services';
import { DeviceType } from './types';

export const UserContext = createContext<{
  user: UserPingType,
  company: CompanyPingType,
  setUser: Dispatch<SetStateAction<UserPingType>>,
  isLoading: boolean,
  mutate: KeyedMutator<any>,
  socket: SocketIo,
  device: DeviceType,
}>({
  user: USER_GUEST,
  company: { name: '', imageUrl: '', emailContact: '', key: '' },
  setUser: () => null,
  isLoading: true,
  mutate: null as unknown as KeyedMutator<any>,
  socket: null as unknown as SocketIo,
  device: { label: '', isMobile: false, isBrowser: false, type: '', osLabel: '' },
});

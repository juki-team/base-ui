import { ClientIdType, CompanyPingType, UserPingType } from '@juki-team/commons';
import { KeyedMutator } from 'swr';

export type UserDataType = UserPingType;

export interface JukiUserProviderProps {
}

export type DeviceType = { label: string, isMobile: boolean, isBrowser: boolean, type: string, osLabel: string };

export interface UserState {
  uiId: string,
  clientId: ClientIdType,
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

export interface InitUserState {
  user: UserState['user'],
  company: UserState['company'],
  isLoading: UserState['isLoading']
}

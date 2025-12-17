import { ClientIdType, CompanyPingType, DeviceType, UserPingType } from '@juki-team/commons';
import { KeyedMutator } from 'swr';

export interface JukiUserProviderProps {
}

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

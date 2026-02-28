import type { ClientId, CompanyPing, Device, UserPing } from '@juki-team/commons';
import { KeyedMutator } from 'swr';

export interface JukiUserProviderProps {
}

export interface UserState {
  uiId: string,
  clientId: ClientId,
  user: UserPing,
  setUser: (user: Partial<UserPing>) => void,
  company: CompanyPing,
  setCompany: (company: CompanyPing) => void,
  isLoading: boolean,
  mutate: KeyedMutator<any>,
  setMutate: (mutate: KeyedMutator<any>) => void,
  device: Device,
  setDevice: (user: Device) => void,
}

export interface InitUserState {
  user: UserState['user'],
  company: UserState['company'],
  isLoading: UserState['isLoading']
}

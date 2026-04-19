import type { ClientId, CompanyPingResponseDTO, Device, UserPing } from '@juki-team/commons';
import { KeyedMutator } from 'swr';

export interface JukiUserProviderProps {}

export interface UserState {
  uiId: string;
  clientId: ClientId;
  user: UserPing;
  setUser: (user: Partial<UserPing>) => void;
  company: CompanyPingResponseDTO;
  setCompany: (company: CompanyPingResponseDTO) => void;
  isLoading: boolean;
  mutate: KeyedMutator<unknown>;
  setMutate: (mutate: KeyedMutator<unknown>) => void;
  device: Device;
  setDevice: (user: Device) => void;
}

export interface InitUserState {
  user: UserState['user'];
  company: UserState['company'];
  isLoading: UserState['isLoading'];
}

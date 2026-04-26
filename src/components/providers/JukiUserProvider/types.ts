import type { ClientId, CompanyPingResponseDTO, Device, UserPing } from '@juki-team/commons';
import type { KeyedMutator } from 'swr';

export type JukiUserProviderProps = {};

export interface UserState {
  uiId: string;
  clientId: ClientId;
  user: UserPing;
  setUser: (user: Partial<UserPing>) => void;
  company: CompanyPingResponseDTO;
  setCompany: (company: CompanyPingResponseDTO) => void;
  isLoading: boolean;
  mutate: KeyedMutator<string>;
  setMutate: (mutate: KeyedMutator<string>) => void;
  device: Device;
  setDevice: (user: Device) => void;
}

export interface InitUserState {
  user: UserState['user'];
  company: UserState['company'];
  isLoading: UserState['isLoading'];
}

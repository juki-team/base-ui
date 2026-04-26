import type { CompanyPingResponseDTO, PingResponseDTO, UserPing } from '@juki-team/commons/dto';
import type { ClientId, ContentResponse, Device } from '@juki-team/commons/types';
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
  mutate: KeyedMutator<ContentResponse<PingResponseDTO>>;
  setMutate: (mutate: KeyedMutator<ContentResponse<PingResponseDTO>>) => void;
  device: Device;
  setDevice: (user: Device) => void;
}

export interface InitUserState {
  user: UserState['user'];
  company: UserState['company'];
  isLoading: UserState['isLoading'];
}

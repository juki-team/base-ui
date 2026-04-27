import type { OrganizationPingResponseDTO, PingResponseDTO, UserPing } from '@juki-team/commons/dto';
import type { ClientId, ContentResponse, Device } from '@juki-team/commons/types';
import type { KeyedMutator } from 'swr';

export type JukiUserProviderProps = {};

export interface UserState {
  uiId: string;
  clientId: ClientId;
  user: UserPing;
  setUser: (user: Partial<UserPing>) => void;
  organization: OrganizationPingResponseDTO;
  setOrganization: (organization: OrganizationPingResponseDTO) => void;
  isLoading: boolean;
  mutate: KeyedMutator<ContentResponse<PingResponseDTO>>;
  setMutate: (mutate: KeyedMutator<ContentResponse<PingResponseDTO>>) => void;
  device: Device;
  setDevice: (user: Device) => void;
}

export interface InitUserState {
  user: UserState['user'];
  organization: UserState['organization'];
  isLoading: UserState['isLoading'];
}

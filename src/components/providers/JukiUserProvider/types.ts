import type { ClientId, OrganizationPing, Device, UserPing } from '@juki-team/commons';
import { KeyedMutator } from 'swr';

export interface JukiUserProviderProps {}

export interface UserState {
  uiId: string;
  clientId: ClientId;
  user: UserPing;
  setUser: (user: Partial<UserPing>) => void;
  organization: OrganizationPing;
  setOrganization: (organization: OrganizationPing) => void;
  isLoading: boolean;
  mutate: KeyedMutator<string>;
  setMutate: (mutate: KeyedMutator<string>) => void;
  device: Device;
  setDevice: (user: Device) => void;
}

export interface InitUserState {
  user: UserState['user'];
  organization: UserState['organization'];
  isLoading: UserState['isLoading'];
}

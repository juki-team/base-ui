import type { UserProfileResponseDTO } from '@juki-team/commons';
import type { KeyedMutator } from 'swr';
import type { ProfileTab } from '../../../enums';

import type { TabsType } from '../../types';

export interface UserViewLayoutProps {
  user: UserProfileResponseDTO;
  reloadUser: KeyedMutator<UserProfileResponseDTO>;
  extraTabs?: TabsType<ProfileTab>;
}

export type ProfileSubmissionsProps = {};

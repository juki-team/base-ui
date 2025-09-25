import type { UserProfileResponseDTO } from '@juki-team/commons';
import type { KeyedMutator } from 'swr';
import type { ProfileTab } from '../../../enums';

import { TabsType } from '../../types';

export interface UserViewLayoutProps {
  user: UserProfileResponseDTO,
  reloadUser: KeyedMutator<any>,
  extraTabs?: TabsType<ProfileTab>
}

export interface ProfileSubmissionsProps {
}

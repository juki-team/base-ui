import type { UserProfileResponseDTO } from '@juki-team/commons/dto';
import type { KeyedMutator } from 'swr';
import type { ProfileTab } from '../../../enums';

import type { TabsType } from '../../types';

export interface UserViewLayoutProps {
  user: UserProfileResponseDTO;
  reloadUser: KeyedMutator<UserProfileResponseDTO>;
  extraTabs?: TabsType<ProfileTab>;
}

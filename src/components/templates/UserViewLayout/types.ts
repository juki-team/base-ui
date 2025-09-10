import { UserProfileResponseDTO } from '@juki-team/commons';
import { KeyedMutator } from 'swr';
import { ProfileTab } from '../../../types';
import { TabsType } from '../../molecules/Tabs/types';

export interface UserViewLayoutProps {
  user: UserProfileResponseDTO,
  reloadUser: KeyedMutator<any>,
  extraTabs?: TabsType<ProfileTab>
}

export interface ProfileSubmissionsProps {
}

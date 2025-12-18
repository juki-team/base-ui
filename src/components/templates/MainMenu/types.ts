import { MenuViewMode } from '@juki-team/commons';
import { ReactNode } from 'react';
import { MenuType } from '../../organisms/types';
import { OnSeeMyProfileType } from '../../providers/JukiUIProvider/types';

export interface MainMenuProps {
  onSeeMyProfile: OnSeeMyProfileType,
  menu: MenuType[],
  menuViewMode?: MenuViewMode,
  profileSelected?: boolean,
  moreApps?: ReactNode,
  children: ReactNode,
  multiCompanies?: boolean,
  topImageUrl?: string,
  onBack?: () => void,
}

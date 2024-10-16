import { MenuViewMode } from '@juki-team/commons';
import { ReactNode } from 'react';
import { MenuType } from '../../organisms';

export interface MainMenuProps {
  onSeeMyProfile: () => Promise<any> | void,
  menu: MenuType[],
  menuViewMode?: MenuViewMode,
  profileSelected?: boolean,
  moreApps?: ReactNode,
  children: ReactNode,
  multiCompanies?: boolean,
  topImageUrl?: string,
  onBack?: () => void,
}

import type { MenuViewMode } from '@juki-team/commons/enums';
import type { ReactNode } from 'react';
import type { MenuType } from '../../organisms/types';
import type { OnSeeMyProfileType } from '../../providers/JukiUIProvider/types';

export interface MainMenuProps {
  onSeeMyProfile: OnSeeMyProfileType;
  menu: MenuType[];
  menuViewMode?: MenuViewMode;
  profileSelected?: boolean;
  moreApps?: ReactNode;
  children: ReactNode;
  multiOrganizations?: boolean;
  topImageUrl?: string;
  onBack?: () => void;
}

import { MenuViewMode } from '@juki-team/commons';
import { ReactNode } from 'react';
import { MenuType } from '../../organisms/types';

export interface MainMenuProps {
  onSeeMyProfile: (nickname: string) => Promise<void> | void,
  menu: MenuType[],
  menuViewMode?: MenuViewMode,
  profileSelected?: boolean,
  moreApps?: ReactNode,
  children: ReactNode,
  multiCompanies?: boolean,
  topImageUrl?: string,
  onBack?: () => void,
}

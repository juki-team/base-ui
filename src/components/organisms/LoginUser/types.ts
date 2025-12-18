import { OnSeeMyProfileType } from '../../providers/JukiUIProvider/types';

export interface LoginUserProps {
  collapsed: boolean,
  isVertical?: boolean,
  isHorizontal?: boolean,
  onSeeMyProfile: OnSeeMyProfileType,
  profileSelected?: boolean,
}

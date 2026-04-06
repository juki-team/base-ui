import type { Placement } from '@floating-ui/react';
import { OnSeeMyProfileType } from '../../providers/JukiUIProvider/types';

export interface LoginUserProps {
  withLabel?: boolean;
  isVertical?: boolean;
  isHorizontal?: boolean;
  onSeeMyProfile?: OnSeeMyProfileType;
  profileSelected?: boolean;
  className?: string;
  popoverPlacement?: Placement;
}

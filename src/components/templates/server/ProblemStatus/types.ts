import type { IconProps } from '../../../atoms/server/icons/types';

export interface ProblemStatusProps {
  solved: boolean;
  tried: boolean;
  size?: IconProps['size'];
}

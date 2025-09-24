import type { BasicIconProps, RootIconProps } from '../types';
import { renderBasicIcon } from '../utils';

const Icon = ({ color }: RootIconProps) => <path
  d="m12 20-8-8 8-8 1.425 1.4-5.6 5.6H20v2H7.825l5.6 5.6Z"
  fill={color}
/>;

export const ArrowBackIcon = (props: BasicIconProps) => {
  return renderBasicIcon(props, Icon, 'arrow-back');
};

import { BasicIconProps, RootIconProps } from '../types';
import { renderBasicIcon } from '../utils';

const Icon = ({ color }: RootIconProps) => <path d="M10 17V7l5 5Z" fill={color} />;

export const ArrowRightIcon = (props: BasicIconProps) => {
  return renderBasicIcon(props, Icon, 'arrow-right');
};

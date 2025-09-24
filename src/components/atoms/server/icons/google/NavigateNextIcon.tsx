import { BasicIconProps, RootIconProps } from '../types';
import { renderBasicIcon } from '../utils';

const Icon = ({ color }: RootIconProps) => <path d="M9.4 18 8 16.6l4.6-4.6L8 7.4 9.4 6l6 6Z" fill={color} />;

export const NavigateNextIcon = (props: BasicIconProps) => {
  return renderBasicIcon(props, Icon, 'navigate-next');
};

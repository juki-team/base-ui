import { BasicIconProps, RootIconProps } from '../types';
import { renderBasicIcon } from '../utils';

const Icon = ({ color }: RootIconProps) => (
  <path d="M3.4 18 2 16.6l7.4-7.45 4 4L18.6 8H16V6h6v6h-2V9.4L13.4 16l-4-4Z" fill={color} />
);

export const TrendingUpIcon = (props: BasicIconProps) => {
  return renderBasicIcon(props, Icon, 'trending-up');
};

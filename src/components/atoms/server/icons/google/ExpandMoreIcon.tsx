import { BasicIconProps, RootIconProps } from '../types';
import { renderBasicIcon } from '../utils';

const Icon = ({ color }: RootIconProps) => <path d="m12 15.375-6-6 1.4-1.4 4.6 4.6 4.6-4.6 1.4 1.4Z" fill={color} />;

export const ExpandMoreIcon = (props: BasicIconProps) => {
  return renderBasicIcon(props, Icon, 'expand-more');
};

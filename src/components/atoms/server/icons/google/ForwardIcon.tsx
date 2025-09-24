import { BasicIconProps, RootIconProps } from '../types';
import { renderBasicIcon } from '../utils';

const Icon = ({ color }: RootIconProps) => (
  <path
    d="M3 19v-4q0-2.075 1.463-3.538Q5.925 10 8 10h9.2l-3.6-3.6L15 5l6 6-6 6-1.4-1.4 3.6-3.6H8q-1.25 0-2.125.875T5 15v4Z"
    fill={color}
  />
);

export const ForwardIcon = (props: BasicIconProps) => {
  return renderBasicIcon(props, Icon, 'forward');
};

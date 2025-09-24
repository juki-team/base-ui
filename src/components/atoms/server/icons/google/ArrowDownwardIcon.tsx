import { BasicIconProps, RootIconProps } from '../types';
import { renderBasicIcon } from '../utils';

const Icon = ({ color }: RootIconProps) => <path
  d="m12 20-8-8 1.4-1.425 5.6 5.6V4h2v12.175l5.6-5.6L20 12Z"
  fill={color}
/>;

export const ArrowDownwardIcon = (props: BasicIconProps) => {
  return renderBasicIcon(props, Icon, 'arrow-downward');
};

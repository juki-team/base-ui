import type { BasicIconProps, RootIconProps } from '../types';
import { renderBasicIcon } from '../utils';

const Icon = ({ color }: RootIconProps) => <path d="M11 19v-6H5v-2h6V5h2v6h6v2h-6v6Z" fill={color} />;

export const AddIcon = (props: BasicIconProps) => {
  return renderBasicIcon(props, Icon, 'add');
};

import type { BasicIconProps, RootIconProps } from '../types';
import { renderBasicIcon } from '../utils';

const Icon = ({ color }: RootIconProps) => <path d="M10 18v-2h4v2Zm-4-5v-2h12v2ZM3 8V6h18v2Z" fill={color} />;

export const FilterListIcon = (props: BasicIconProps) => {
  return renderBasicIcon(props, Icon, 'filter-list');
};

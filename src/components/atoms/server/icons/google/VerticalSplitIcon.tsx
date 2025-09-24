import type { BasicIconProps, RootIconProps } from '../types';
import { renderBasicIcon } from '../utils';

const Icon = ({ color }: RootIconProps) => (
  <path d="M3 13v2h8v-2Zm0 4v2h8v-2Zm0-8v2h8V9Zm0-4v2h8V5Zm12 2v10Zm-2-2h8v14h-8Zm2 2v10h4V7Z" fill={color} />
);

export const VerticalSplitIcon = (props: BasicIconProps) => {
  return renderBasicIcon(props, Icon, 'vertical-split');
};

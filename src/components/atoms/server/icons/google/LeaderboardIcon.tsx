import type { BasicIconProps, RootIconProps } from '../types';
import { renderBasicIcon } from '../utils';

const Icon = ({ color }: RootIconProps) => (
  <path d="M4 19h4v-8H4Zm6 0h4V5h-4Zm6 0h4v-6h-4ZM2 21V9h6V3h8v8h6v10Z" fill={color} />
);

export const LeaderboardIcon = (props: BasicIconProps) => {
  return renderBasicIcon(props, Icon, 'leaderboard');
};

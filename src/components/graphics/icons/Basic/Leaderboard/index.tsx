import { BasicIconProps } from '../../types';
import { renderBasicIcon } from '../../utils';
import Leaderboard from './Leaderboard';

export const LeaderboardIcon = (props: BasicIconProps) => {
  return renderBasicIcon(props, Leaderboard);
};

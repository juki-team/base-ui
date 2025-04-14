import { BasicIconProps } from '../../../server/icons/types';
import { renderBasicIcon } from '../../../server/icons/utils';
import Leaderboard from './Leaderboard';

export const LeaderboardIcon_ = (props: BasicIconProps) => {
  return renderBasicIcon(props, Leaderboard);
};

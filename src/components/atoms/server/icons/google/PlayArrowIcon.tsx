import { BasicIconProps, RootIconProps } from '../types';
import { renderBasicIcon } from '../utils';

const Icon = ({ color }: RootIconProps) => <path d="M8 19V5l11 7Zm2-7Zm0 3.35L15.25 12 10 8.65Z" fill={color} />;

export const PlayArrowIcon = (props: BasicIconProps) => {
  return renderBasicIcon(props, Icon, 'play-arrow');
};

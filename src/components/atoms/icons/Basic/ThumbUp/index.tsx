import { BasicIconProps } from '../../types';
import { renderBasicIcon } from '../../utils';
import ThumbUp from './ThumbUp';

export const ThumbUpIcon = (props: BasicIconProps) => {
  return renderBasicIcon(props, ThumbUp);
};

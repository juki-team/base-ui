import { BasicIconProps } from '../../../server/icons/types';
import { renderBasicIcon } from '../../../server/icons/utils';
import ThumbUp from './ThumbUp';

export const ThumbUpIcon = (props: BasicIconProps) => {
  return renderBasicIcon(props, ThumbUp);
};

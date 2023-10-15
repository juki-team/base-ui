import { BasicIconProps } from '../../types';
import { renderBasicIcon } from '../../utils';
import Star from './Star';

export const StarIcon = (props: BasicIconProps) => {
  return renderBasicIcon(props, Star);
};

import { BasicIconProps } from '../../../server/icons/types';
import { renderBasicIcon } from '../../../server/icons/utils';
import Star from './Star';

export const StarIcon = (props: BasicIconProps) => {
  return renderBasicIcon(props, Star);
};

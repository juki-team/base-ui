import { BasicIconProps } from '../../../server/icons/types';
import { renderBasicIcon } from '../../../server/icons/utils';
import Gears from './Gears';

export const GearsIcon = (props: BasicIconProps) => {
  return renderBasicIcon(props, Gears);
};

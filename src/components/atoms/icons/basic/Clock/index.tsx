import { BasicIconProps } from '../../../server/icons/types';
import { renderBasicIcon } from '../../../server/icons/utils';
import Clock from './Clock';

export const ClockIcon = (props: BasicIconProps) => {
  return renderBasicIcon(props, Clock);
};

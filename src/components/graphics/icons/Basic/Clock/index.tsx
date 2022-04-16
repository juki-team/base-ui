import { BasicIconProps } from '../../types';
import { renderBasicIcon } from '../../utils';
import Clock from './Clock';

export const ClockIcon = (props: BasicIconProps) => {
  return renderBasicIcon(props, Clock);
};

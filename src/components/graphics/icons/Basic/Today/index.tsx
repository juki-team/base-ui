import { BasicIconProps } from '../../types';
import { renderBasicIcon } from '../../utils';
import Today from './Today';

export const TodayIcon = (props: BasicIconProps) => {
  return renderBasicIcon(props, Today);
};

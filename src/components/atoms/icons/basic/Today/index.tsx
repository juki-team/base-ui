import { BasicIconProps } from '../../../server/icons/types';
import { renderBasicIcon } from '../../../server/icons/utils';
import Today from './Today';

export const TodayIcon = (props: BasicIconProps) => {
  return renderBasicIcon(props, Today);
};

import { BasicIconProps } from '../../../server/icons/types';
import { renderBasicIcon } from '../../../server/icons/utils';
import Reload from './Reload';

export const ReloadIcon = (props: BasicIconProps) => {
  return renderBasicIcon(props, Reload);
};

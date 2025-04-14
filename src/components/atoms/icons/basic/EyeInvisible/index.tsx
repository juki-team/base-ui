import { BasicIconProps } from '../../../server/icons/types';
import { renderBasicIcon } from '../../../server/icons/utils';
import EyeInvisible from './EyeInvisible';

export const EyeInvisibleIcon = (props: BasicIconProps) => {
  return renderBasicIcon(props, EyeInvisible);
};

import { BasicIconProps } from '../../types';
import { renderBasicIcon } from '../../utils';
import Delete from './Delete';

export const DeleteIcon = (props: BasicIconProps) => {
  return renderBasicIcon(props, Delete);
};

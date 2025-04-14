import { BasicIconProps } from '../../../server/icons/types';
import { renderBasicIcon } from '../../../server/icons/utils';
import Delete from './Delete';

export const DeleteIcon_ = (props: BasicIconProps) => {
  return renderBasicIcon(props, Delete);
};

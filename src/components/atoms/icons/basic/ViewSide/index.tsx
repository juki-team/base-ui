import { BasicIconProps } from '../../../server/icons/types';
import { renderBasicIcon } from '../../../server/icons/utils';
import ViewSide from './ViewSide';

export const ViewSideIcon = (props: BasicIconProps) => {
  return renderBasicIcon(props, ViewSide);
};

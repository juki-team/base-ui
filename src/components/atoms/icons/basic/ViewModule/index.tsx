import { BasicIconProps } from '../../../server/icons/types';
import { renderBasicIcon } from '../../../server/icons/utils';
import ViewModule from './ViewModule';

export const ViewModuleIcon = (props: BasicIconProps) => {
  return renderBasicIcon(props, ViewModule);
};

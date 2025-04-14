import { BasicIconProps } from '../../../server/icons/types';
import { renderBasicIcon } from '../../../server/icons/utils';
import Menu from './Menu';

export const MenuIcon = (props: BasicIconProps) => {
  return renderBasicIcon(props, Menu);
};

import { BasicIconProps } from '../../types';
import { renderBasicIcon } from '../../utils';
import Setting from './Setting';

export const SettingIcon = (props: BasicIconProps) => {
  return renderBasicIcon(props, Setting);
};

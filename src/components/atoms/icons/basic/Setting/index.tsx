import { BasicIconProps } from '../../../server/icons/types';
import { renderBasicIcon } from '../../../server/icons/utils';
import Setting from './Setting';

export const SettingIcon_ = (props: BasicIconProps) => {
  return renderBasicIcon(props, Setting);
};

import { BasicIconProps } from '../../../server/icons/types';
import { renderBasicIcon } from '../../../server/icons/utils';
import Mail from './Mail';

export const MailIcon_ = (props: BasicIconProps) => {
  return renderBasicIcon(props, Mail);
};

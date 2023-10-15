import { BasicIconProps } from '../../types';
import { renderBasicIcon } from '../../utils';
import MailOpened from './MailOpened';

export const MailOpenedIcon = (props: BasicIconProps) => {
  return renderBasicIcon(props, MailOpened);
};

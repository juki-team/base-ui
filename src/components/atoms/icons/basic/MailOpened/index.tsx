import { BasicIconProps } from '../../../server/icons/types';
import { renderBasicIcon } from '../../../server/icons/utils';
import MailOpened from './MailOpened';

export const MailOpenedIcon = (props: BasicIconProps) => {
  return renderBasicIcon(props, MailOpened);
};

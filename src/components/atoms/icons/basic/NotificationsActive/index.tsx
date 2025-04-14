import { BasicIconProps } from '../../../server/icons/types';
import { renderBasicIcon } from '../../../server/icons/utils';
import NotificationsActive from './NotificationsActive';

export const NotificationsActiveIcon = (props: BasicIconProps) => renderBasicIcon(props, NotificationsActive);

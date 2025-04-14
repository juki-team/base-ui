import { BasicIconProps } from '../../../server/icons/types';
import { renderBasicIcon } from '../../../server/icons/utils';
import Notifications from './Notifications';

export const NotificationsIcon = (props: BasicIconProps) => renderBasicIcon(props, Notifications);

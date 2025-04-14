import { BasicIconProps } from '../../../server/icons/types';
import { renderBasicIcon } from '../../../server/icons/utils';
import NotificationsPaused from './NotificationsPaused';

export const NotificationsPausedIcon = (props: BasicIconProps) => renderBasicIcon(props, NotificationsPaused);

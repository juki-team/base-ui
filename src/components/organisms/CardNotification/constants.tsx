import { NotificationType } from '../../../enums';
import { CheckIcon, ErrorIcon, InfoIIcon, WarningIcon } from '../../server';

export const LAPS = 200;

export const NOTIFICATION_TIME = {
  [NotificationType.ERROR]: 4000,
  [NotificationType.SUCCESS]: 4000,
  [NotificationType.WARNING]: 4000,
  [NotificationType.INFO]: 4000,
  [NotificationType.QUIET]: 2000,
};

export const NOTIFICATION_ICON = {
  [NotificationType.ERROR]: <ErrorIcon />,
  [NotificationType.SUCCESS]: <CheckIcon circle />,
  [NotificationType.WARNING]: <WarningIcon />,
  [NotificationType.INFO]: <InfoIIcon circle />,
  [NotificationType.QUIET]: null,
};

import { NotificationType } from '@juki-team/commons/enums';
import { CheckIcon } from '../../atoms/server/icons/google/CheckIcon';
import { ErrorIcon } from '../../atoms/server/icons/google/ErrorIcon';
import { InfoIIcon } from '../../atoms/server/icons/google/InfoIIcon';
import { WarningIcon } from '../../atoms/server/icons/google/WarningIcon';

export const NOTIFICATION_ICON = {
  [NotificationType.ERROR]: <ErrorIcon />,
  [NotificationType.SUCCESS]: <CheckIcon circle />,
  [NotificationType.WARNING]: <WarningIcon />,
  [NotificationType.INFO]: <InfoIIcon circle />,
  [NotificationType.QUIET]: null,
};

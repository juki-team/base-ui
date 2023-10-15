import React from 'react';
import { CheckIcon, ErrorIcon, InfoIcon, WarningIcon } from '../../atoms';
import { NotificationType } from './types';

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
  [NotificationType.INFO]: <InfoIcon />,
  [NotificationType.QUIET]: null,
};

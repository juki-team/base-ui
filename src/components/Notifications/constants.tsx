import React from 'react';
import { CheckIcon, CloseIcon, ExclamationIcon } from '../graphics';
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
  [NotificationType.ERROR]: <CloseIcon circle />,
  [NotificationType.SUCCESS]: <CheckIcon circle />,
  [NotificationType.WARNING]: <ExclamationIcon circle />,
  [NotificationType.INFO]: <ExclamationIcon circle rotate={180} />,
  [NotificationType.QUIET]: <CheckIcon circle />,
};

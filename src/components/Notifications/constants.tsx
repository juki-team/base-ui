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
  [NotificationType.ERROR]: <CloseIcon filledCircle="#EB5757" />,
  [NotificationType.SUCCESS]: <CheckIcon filledCircle="#43D787" />,
  [NotificationType.WARNING]: <ExclamationIcon filledCircle="#F2C94C" />,
  [NotificationType.INFO]: <ExclamationIcon filledCircle="#2F86EB" rotate={180} />,
  [NotificationType.QUIET]: <CheckIcon circle />,
};

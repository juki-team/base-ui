import { ReactNode } from 'react';

export enum NotificationAction {
  ADD_NOTIFICATION = 'ADD_NOTIFICATION',
  REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION',
}

export type NewNotificationType = {
  type: NotificationType,
  message: ReactNode,
}

export interface NotificationProps {
  id: string,
  type: NotificationType,
  message: ReactNode,
}

export type AddNotificationActionType = {
  type: NotificationAction.ADD_NOTIFICATION,
  payload: NotificationProps,
};

export type RemoveNotificationActionType = {
  type: NotificationAction.REMOVE_NOTIFICATION,
  notificationId: string,
}

export type NotificationActionsTypes = AddNotificationActionType | RemoveNotificationActionType;

export enum NotificationType {
  SUCCESS = 'success',
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error',
  QUIET = 'quiet'
}

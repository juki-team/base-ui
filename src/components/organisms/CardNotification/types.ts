import { PropsWithChildren, ReactNode } from 'react';
import { NotificationType } from '../../../enums';

export enum NotificationAction {
  ADD_NOTIFICATION = 'ADD_NOTIFICATION',
  REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION',
}

export type NewNotificationType = {
  type: NotificationType,
  message: ReactNode,
  silent?: boolean;
}

export interface CardNotificationProps {
  ids: string[],
  type: NotificationType,
  message: ReactNode,
}

export interface NotificationProps {
  id: string,
  type: NotificationType,
  silent: boolean,
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

export interface NotificationProviderProps extends PropsWithChildren {
}

export interface SoundProviderProps extends PropsWithChildren {
}

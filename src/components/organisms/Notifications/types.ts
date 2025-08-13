import { PropsWithChildren, ReactNode } from 'react';
import { NotificationType, Sound } from '../../../types';

export enum NotificationAction {
  ADD_NOTIFICATION = 'ADD_NOTIFICATION',
  REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION',
}

export type NewNotificationType = {
  type: NotificationType,
  message: ReactNode,
}

export interface CardNotificationProps {
  ids: string[],
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

export type Sounds = { [key in Sound]: HTMLAudioElement };

export interface NotificationProviderProps extends PropsWithChildren {
}

export interface SoundProviderProps extends PropsWithChildren {
}

import React, { PropsWithChildren, Reducer, useReducer } from 'react';
import { useJukiUI, useSound } from '../../../hooks';
import { CardNotification } from './CardNotification';
import { NotificationContext } from './context';
import { NotificationAction, NotificationActionsTypes, NotificationProps, NotificationType } from './types';

export function NotificationProvider({ children }: PropsWithChildren<{}>) {
  
  const sound = useSound();
  const [ state, dispatch ] = useReducer<Reducer<NotificationProps[], NotificationActionsTypes>>((state, action) => {
    switch (action.type) {
      case NotificationAction.ADD_NOTIFICATION:
        if (action.payload.type === NotificationType.SUCCESS) {
          void sound.playSuccess();
        }
        if (action.payload.type === NotificationType.INFO) {
          void sound.playNotification();
        }
        if (action.payload.type === NotificationType.ERROR) {
          void sound.playError();
        }
        if (action.payload.type === NotificationType.WARNING) {
          void sound.playWarning();
        }
        return [ ...state, { ...action.payload } ];
      case NotificationAction.REMOVE_NOTIFICATION:
        return state.filter(notification => notification.id !== action.notificationId);
      default:
        return state;
    }
  }, []);
  
  const { viewPortSize } = useJukiUI();
  
  const notificationsFiltered = state.filter(note => note.type !== NotificationType.QUIET);
  
  const notifications = viewPortSize === 'sm' ? [ ...notificationsFiltered ].reverse() : notificationsFiltered;
  
  
  return (
    <NotificationContext.Provider value={{ dispatch }}>
      <div className="notification-wrapper">
        {notifications.map((note) => (<CardNotification key={note.id} {...note} />))}
      </div>
      <div className="notification-wrapper-quiet">
        {state
          .filter(note => note.type === NotificationType.QUIET)
          .map((note) => (
            <CardNotification key={note.id} {...note} type={NotificationType.QUIET} />
          ))}
      </div>
      {children}
    </NotificationContext.Provider>
  );
}

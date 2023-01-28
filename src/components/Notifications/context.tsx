import React, {
  createContext,
  Dispatch,
  PropsWithChildren,
  ReactNode,
  Reducer,
  useCallback,
  useContext,
  useReducer,
} from 'react';
import { v4 } from 'uuid';
import { useJukiBase } from '../Provider';
import { Notification } from './component';
import {
  NewNotificationType,
  NotificationAction,
  NotificationActionsTypes,
  NotificationProps,
  NotificationType,
} from './types';

const NotificationContext = createContext<{ dispatch: Dispatch<NotificationActionsTypes> }>({
  dispatch: () => {
  },
});

export const NotificationProvider = ({ children }: PropsWithChildren<{}>) => {
  
  const [state, dispatch] = useReducer<Reducer<NotificationProps[], NotificationActionsTypes>>((state, action) => {
    switch (action.type) {
      case NotificationAction.ADD_NOTIFICATION:
        return [...state, { ...action.payload }];
      case NotificationAction.REMOVE_NOTIFICATION:
        return state.filter(notification => notification.id !== action.notificationId);
      default:
        return state;
    }
  }, []);
  const { viewPortSize } = useJukiBase();
  
  const notificationsFiltered = state.filter(note => note.type !== NotificationType.QUIET);
  const notifications = viewPortSize === 'sm' ? [...notificationsFiltered].reverse() : notificationsFiltered;
  
  return (
    <NotificationContext.Provider value={{ dispatch }}>
      <div className="notification-wrapper">
        {notifications.map((note) => (<Notification key={note.id} {...note} />))}
      </div>
      <div className="notification-wrapper-quiet">
        {state
          .filter(note => note.type === NotificationType.QUIET)
          .map((note) => (
            <Notification key={note.id} {...note} type={NotificationType.QUIET} />
          ))}
      </div>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  
  const { dispatch } = useContext(NotificationContext);
  const addNotification = useCallback((props: NewNotificationType) => dispatch({
    type: NotificationAction.ADD_NOTIFICATION,
    payload: {
      id: v4(),
      ...props,
    },
  }), [dispatch]);
  return {
    addNotification,
    addInfoNotification: useCallback((message: ReactNode) => addNotification({
      type: NotificationType.INFO,
      message,
    }), [addNotification]),
    addSuccessNotification: useCallback((message: ReactNode) => addNotification({
      type: NotificationType.SUCCESS,
      message,
    }), [addNotification]),
    addWarningNotification: useCallback((message: ReactNode) => addNotification({
      type: NotificationType.WARNING,
      message,
    }), [addNotification]),
    addErrorNotification: useCallback((message: ReactNode) => addNotification({
      type: NotificationType.ERROR,
      message,
    }), [addNotification]),
    addQuietNotification: useCallback((message: ReactNode) => addNotification({
      type: NotificationType.QUIET,
      message,
    }), [addNotification]),
    removeNotification: useCallback((notificationId: string) => dispatch({
      type: NotificationAction.REMOVE_NOTIFICATION,
      notificationId,
    }), [dispatch]),
  };
};

export const dispatchNotification = () => {

};

import { ContentResponseType, ContentsResponseType, ErrorResponseType, Status } from '@juki-team/commons';
import React, { Children, ReactNode, useCallback, useContext } from 'react';
import { v4 } from 'uuid';
import { T } from '../components/atoms/T';
import { NotificationContext } from '../components/organisms/Notifications/context';
import { NewNotificationType, NotificationAction, NotificationType } from '../components/organisms/Notifications/types';
import { SetStatusType } from '../types';

export const notifyError = (response: ErrorResponseType, addErrorNotification: (message: ReactNode) => void) => {
  addErrorNotification(
    <div className="jk-col stretch" style={{ width: '100%' }}>
      <span className="tt-se"><T>{response.message}</T></span>
      {(response.errors[0]?.message !== response.message || response.errors.length > 1) && (
        <ul>
          {Children.toArray(response.errors.map(error => <li><T className="tt-se">{error.message}</T></li>))}
        </ul>
      )}
    </div>,
  );
};

export const notifySuccess = (response: ContentResponseType<any> | ContentsResponseType<any>, addSuccessNotification: (message: ReactNode) => void) => {
  addSuccessNotification(
    <div className="jk-col stretch" style={{ width: '100%' }}>
      <span className="tt-se"><T>{response.message}</T></span>
    </div>,
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
  }), [ dispatch ]);
  
  const notifyResponse = useCallback(<T, >(
    response: ErrorResponseType | ContentResponseType<T> | ContentsResponseType<T>,
    setStatus?: SetStatusType,
  ): response is ContentResponseType<T> | ContentsResponseType<T> => {
    if (response.success === false) {
      notifyError(response, (message) => addNotification({ type: NotificationType.ERROR, message }));
      setStatus?.(Status.ERROR);
    }
    if (response.success) {
      notifySuccess(response, (message) => addNotification({ type: NotificationType.INFO, message }));
      setStatus?.(Status.SUCCESS);
    }
    return !!response.success;
  }, [ addNotification ]);
  
  return {
    addNotification,
    addInfoNotification: useCallback((message: ReactNode) => addNotification({
      type: NotificationType.INFO,
      message,
    }), [ addNotification ]),
    addSuccessNotification: useCallback((message: ReactNode) => addNotification({
      type: NotificationType.SUCCESS,
      message,
    }), [ addNotification ]),
    addWarningNotification: useCallback((message: ReactNode) => addNotification({
      type: NotificationType.WARNING,
      message,
    }), [ addNotification ]),
    addErrorNotification: useCallback((message: ReactNode) => addNotification({
      type: NotificationType.ERROR,
      message,
    }), [ addNotification ]),
    addQuietNotification: useCallback((message: ReactNode) => addNotification({
      type: NotificationType.QUIET,
      message,
    }), [ addNotification ]),
    removeNotification: useCallback((notificationId: string) => dispatch({
      type: NotificationAction.REMOVE_NOTIFICATION,
      notificationId,
    }), [ dispatch ]),
    notifyResponse,
  };
};

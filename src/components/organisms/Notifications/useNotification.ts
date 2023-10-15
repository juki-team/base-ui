import { ContentResponseType, ContentsResponseType, ErrorResponseType, Status } from '@juki-team/commons';
import { ReactNode, useCallback, useContext } from 'react';
import { v4 } from 'uuid';
import { notifyError, notifySuccess } from '../../../helpers';
import { SetStatusType } from '../../../types';
import { NotificationContext } from './context';
import { NewNotificationType, NotificationAction, NotificationType } from './types';

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
      notifySuccess(response, (message) => addNotification({ type: NotificationType.SUCCESS, message }));
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

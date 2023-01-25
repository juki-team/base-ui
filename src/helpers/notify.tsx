import { ContentResponseType, ContentsResponseType, ErrorResponseType, Status } from '@juki-team/commons';
import React, { Children, ReactNode } from 'react';
import { NewNotificationType, NotificationType, SetLoaderStatusOnClickType, T } from '../components';

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

export const notifyResponse = <T, >(
  response: ErrorResponseType | ContentResponseType<T> | ContentsResponseType<T>,
  addNotification: (props: NewNotificationType) => void,
  setLoaderStatus?: SetLoaderStatusOnClickType,
): response is ContentResponseType<T> | ContentsResponseType<T> => {
  if (response.success === false) {
    notifyError(response, (message) => addNotification({ type: NotificationType.ERROR, message }));
    setLoaderStatus?.(Status.ERROR);
  }
  if (response.success) {
    notifySuccess(response, (message) => addNotification({ type: NotificationType.SUCCESS, message }));
    setLoaderStatus?.(Status.SUCCESS);
  }
  return !!response.success;
};

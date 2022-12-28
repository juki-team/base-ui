import { ContentResponseType, ContentsResponseType, ErrorResponseType } from '@juki-team/commons';
import React, { ReactNode } from 'react';
import { NewNotificationType, NotificationType, T } from '../components';

export const notifyError = (response: ErrorResponseType, addErrorNotification: (message: ReactNode) => void) => {
  addErrorNotification(
    <div className="jk-col stretch" style={{ width: '100%' }}>
      <span className="tt-se"><T>{response.message}</T></span>
      {(response.errors[0]?.message !== response.message || response.errors.length > 1) && (
        <ul>
          {response.errors.map(error => <li><T className="tt-se">{error.message}</T></li>)}
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

export const notifyResponse = (response: ErrorResponseType | ContentResponseType<any> | ContentsResponseType<any>, addNotification: (props: NewNotificationType) => void): response is ContentResponseType<any> => {
  if (response.success === false) {
    notifyError(response, (message) => addNotification({ type: NotificationType.ERROR, message }));
  }
  if (response.success) {
    notifySuccess(response, (message) => addNotification({ type: NotificationType.SUCCESS, message }));
  }
  return !!response.success;
};

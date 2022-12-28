import { NotificationType } from '@juki-team/base-ui';
import { T } from 'components';
import React from 'react';
import { ContentsResponseType, ErrorResponseType } from 'types';
import { ContentResponseType } from '../types';

export const notifyError = (response: ErrorResponseType, addErrorNotification) => {
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

export const notifySuccess = (response: ContentResponseType<any> | ContentsResponseType<any>, addSuccessNotification) => {
  addSuccessNotification(
    <div className="jk-col stretch" style={{ width: '100%' }}>
      <span className="tt-se"><T>{response.message}</T></span>
    </div>,
  );
};

export const notifyResponse = (response: ErrorResponseType | ContentResponseType<any> | ContentsResponseType<any>, addNotification): response is ContentResponseType<any> => {
  if (response.success === false) {
    notifyError(response, (message) => addNotification({ type: NotificationType.ERROR, message }));
  }
  if (response.success) {
    notifySuccess(response, (message) => addNotification({ type: NotificationType.SUCCESS, message }));
  }
  return !!response.success;
};

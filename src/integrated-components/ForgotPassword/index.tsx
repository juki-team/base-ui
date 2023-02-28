import { ContentResponseType, Status } from '@juki-team/commons';
import React from 'react';
import { BasicModalProps, useNotification } from '../../components';
import { settings } from '../../config';
import { authorizedRequest, cleanRequest } from '../../services';
import { ForgotPasswordModalComponent } from './ForgoPasswordModal';
import { OnForgotPasswordType } from './types';

export const ForgotPasswordModal = ({ onClose }: BasicModalProps) => {
  const { notifyResponse } = useNotification();
  const onForgotPassword: OnForgotPasswordType = async (email, setStatus) => {
    setStatus?.(Status.LOADING);
    const { url, ...options } = settings.getAPI().auth.initiateResetPassword({ body: { email } });
    const response = cleanRequest<ContentResponseType<any>>(await authorizedRequest(url, options));
    notifyResponse(response, setStatus);
  };
  
  return (
    <ForgotPasswordModalComponent onForgotPassword={onForgotPassword} onClose={onClose} />
  );
};

export * from './types';
